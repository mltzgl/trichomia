import path from "path";
import { NextResponse } from "next/server";
import { createWorker, PSM } from "tesseract.js";
import sharp from "sharp";
import jsQR from "jsqr";
import Fuse from "fuse.js";
import { prisma } from "@/lib/prisma";

type ScanBox = {
  x: number;
  y: number;
  w: number;
  h: number;
  displayWidth?: number;
  displayHeight?: number;
};

function timeout<T>(promise: Promise<T>, ms: number): Promise<T> {
  return Promise.race([
    promise,
    new Promise<T>((_, reject) =>
      setTimeout(() => reject(new Error("Analyse-Timeout")), ms)
    ),
  ]);
}

async function detectQr(buffer: Buffer) {
  try {
    const image = await sharp(buffer)
      .resize({ width: 900, withoutEnlargement: true })
      .ensureAlpha()
      .raw()
      .toBuffer({ resolveWithObject: true });

    const qr = jsQR(
      new Uint8ClampedArray(image.data),
      image.info.width,
      image.info.height
    );

    return qr?.data || "";
  } catch {
    return "";
  }
}

async function cropImage(buffer: Buffer, box: ScanBox) {
  const meta = await sharp(buffer).metadata();
  const imageWidth = meta.width || 0;
  const imageHeight = meta.height || 0;

  const scaleX = imageWidth / (box.displayWidth || imageWidth);
  const scaleY = imageHeight / (box.displayHeight || imageHeight);

  const left = Math.max(0, Math.round(box.x * scaleX));
  const top = Math.max(0, Math.round(box.y * scaleY));
  const width = Math.min(imageWidth - left, Math.round(box.w * scaleX));
  const height = Math.min(imageHeight - top, Math.round(box.h * scaleY));

  console.log("CROP REAL:", { left, top, width, height, imageWidth, imageHeight });

  if (width < 30 || height < 30) return buffer;

  return sharp(buffer).extract({ left, top, width, height }).toBuffer();
}

function normalizeText(text: string) {
  return text
    .replace(/\s+/g, " ")
    .replace(/TCH/gi, "THC")
    .replace(/C8D/gi, "CBD")
    .trim();
}

function parseText(text: string) {
  const clean = normalizeText(text);
  const lines = text
    .split(/\r?\n/)
    .map((l) => normalizeText(l))
    .filter(Boolean);

  const thcMatch = clean.match(/THC[:\s]*([<>\d.,]+)\s*%/i);
  const cbdMatch = clean.match(/CBD[:\s]*([<>\d.,]+)\s*%/i);

  const ratioIndex = lines.findIndex((line) => /\b\d{2}\s*\/\s*\d\b/.test(line));

  let manufacturer = "";
  let name = "";
  let productLine = "";

  if (ratioIndex >= 0) {
    productLine = lines[ratioIndex];

    const ratioRegex = /\b\d{2}\s*\/\s*\d\b/;
    const beforeRatio = productLine.split(ratioRegex)[0].trim();
    manufacturer = beforeRatio.split(" ")[0] || "";

    const nextLine = lines[ratioIndex + 1] || "";
    const badLine = /THC|CBD|Hergestellt|Verwendbar|Defektur|Charge|Anwendung|Gebrauch|INHALT|Gramm/i.test(nextLine);

    if (nextLine && !badLine) {
      name = nextLine;
    }
  }

  const knownManufacturers = [
    "remexian",
    "Big Dreams",
    "Sibanax",
    "HUALA",
    "Demecan",
    "Cannamedical",
    "Avaay",
    "Bedrocan",
    "Tilray",
    "Enua",
    "IMC",
    "Aurora",
  ];

  if (!manufacturer) {
    manufacturer =
      knownManufacturers.find((maker) =>
        clean.toLowerCase().includes(maker.toLowerCase())
      ) || "";
  }

  const knownStrains = [
    "Gelonade",
    "Pink Kush",
    "Alien Mints",
    "GMO Zkittlez",
    "Zkittlez",
    "Gorilla Glue",
    "Royal Gorilla",
  ];

  if (!name) {
    name =
      knownStrains.find((strain) =>
        clean.toLowerCase().includes(strain.toLowerCase())
      ) || "";
  }

  return {
    name,
    manufacturer,
    thc: thcMatch ? `${thcMatch[1].replace(",", ".")}%` : "",
    cbd: cbdMatch ? `${cbdMatch[1].replace(",", ".")}%` : "",
    productLine,
  };
}

async function findBestDbMatch(ocrText: string) {
  const strains = await prisma.strain.findMany();

  if (strains.length === 0) return null;

  const fuse = new Fuse(strains, {
    keys: ["name", "manufacturer", "description"],
    threshold: 0.45,
    includeScore: true,
  });

  const result = fuse.search(ocrText);
  return result[0]?.item || null;
}

export async function POST(req: Request) {
  let worker: Awaited<ReturnType<typeof createWorker>> | null = null;
  const startedAt = Date.now();

  try {
    console.log("FREE SCAN START");

    const formData = await req.formData();
    const file = formData.get("file");
    const boxRaw = formData.get("box");

    if (!file || !(file instanceof File)) {
      return NextResponse.json(
        { error: "Kein Bild hochgeladen." },
        { status: 400 }
      );
    }

    const originalBuffer = Buffer.from(await file.arrayBuffer());

    const qrUrl = await timeout(detectQr(originalBuffer), 5000);
    console.log("QR DONE:", qrUrl);

    let scanBuffer: Buffer = originalBuffer;

    if (typeof boxRaw === "string" && boxRaw.length > 0) {
      try {
        scanBuffer = await cropImage(originalBuffer, JSON.parse(boxRaw));
      } catch (error) {
        console.error("CROP ERROR:", error);
        scanBuffer = originalBuffer;
      }
    }

    const imageForOcr = await sharp(scanBuffer)
      .rotate()
      .resize({ width: 1000, withoutEnlargement: true })
      .grayscale()
      .linear(1.5, -20)
      .threshold(120)
      .sharpen()
      .png()
      .toBuffer();

    console.log("OCR START");

    worker = await createWorker("eng", 1, {
      workerPath: path.join(
        process.cwd(),
        "node_modules/tesseract.js/src/worker-script/node/index.js"
      ),
      langPath: path.join(process.cwd(), "tessdata"),
      corePath: path.join(process.cwd(), "node_modules/tesseract.js-core"),
    });

    await worker.setParameters({
      tessedit_pageseg_mode: PSM.SINGLE_BLOCK,
    });

    const result = await timeout(worker.recognize(imageForOcr), 30000);

    console.log("OCR DONE");

    const extractedText = result.data.text || "";
    const parsed = parseText(extractedText);
    const bestMatch = await findBestDbMatch(extractedText);

    await worker.terminate();
    worker = null;

    const finalData = {
      name: parsed.name || bestMatch?.name || "",
      manufacturer: parsed.manufacturer || bestMatch?.manufacturer || "",
      thc: parsed.thc || bestMatch?.thc || "",
      cbd: parsed.cbd || bestMatch?.cbd || "",
    };

    return NextResponse.json({
      ...finalData,
      genetics: bestMatch?.genetics || "",
      terpenes: bestMatch?.terpenes || "",
      description: parsed.productLine
        ? `Produktzeile: ${parsed.productLine}`
        : bestMatch
        ? `Aus Datenbank erkannt: ${bestMatch.name}`
        : "",
      parsed,
      bestMatch,
      matchedStrainId: bestMatch?.id || null,
      qrUrl,
      extractedText,
      confidence: result.data.confidence,
      durationMs: Date.now() - startedAt,
      mode: bestMatch ? "ocr-db-match" : "free-ocr",
    });
  } catch (error) {
    console.error("FREE SCAN ERROR:", error);

    if (worker) {
      try {
        await worker.terminate();
      } catch {}
    }

    return NextResponse.json(
      {
        error:
          "Analyse fehlgeschlagen. Bitte anderen Bildausschnitt testen oder Daten manuell eintragen.",
      },
      { status: 500 }
    );
  }
}