import path from "path";
import { NextResponse } from "next/server";
import { createWorker, PSM } from "tesseract.js";
import sharp from "sharp";
import jsQR from "jsqr";
import Fuse from "fuse.js";
import { prisma } from "@/lib/prisma";
import {
  strainCatalog,
  knownManufacturers,
  type CatalogStrain,
} from "@/data/strainCatalog";

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
    .replace(/T\s?H\s?C/gi, "THC")
    .replace(/C8D/gi, "CBD")
    .replace(/CB0/gi, "CBD")
    .replace(/C\s?B\s?D/gi, "CBD")
    .trim();
}

function findCatalogSuggestions(ocrText: string, parsedName: string) {
  const fuse = new Fuse(strainCatalog, {
    keys: [
      { name: "name", weight: 0.6 },
      { name: "aliases", weight: 0.3 },
      { name: "manufacturer", weight: 0.1 },
    ],
    threshold: 0.38,
    ignoreLocation: true,
    includeScore: true,
  });

  const queries = ocrText
    .split(/\r?\n/)
    .map((line) => normalizeText(line))
    .filter(
      (line) =>
        line.length >= 3 &&
        line.length <= 60 &&
        !/^[\d\s.,:%/-]+$/.test(line) &&
        !/Hergestellt|Verwendbar|Charge|Anwendung|Gebrauch|Inhalt|Apotheke|Lagerung/i.test(
          line
        )
    );

  if (parsedName) queries.push(parsedName);

  // Der nackte Zahlencode (z. B. "22/1") ist wenig spezifisch – er dient nur
  // als Auffangnetz und bekommt deshalb einen Score-Malus.
  const weightedQueries = queries.map((query) => ({ query, penalty: 0 }));
  const ratio = normalizeText(ocrText).match(/\b(\d{1,2})\s*\/\s*(\d{1,2})\b/);
  if (ratio) {
    weightedQueries.push({ query: `${ratio[1]}/${ratio[2]}`, penalty: 0.25 });
  }

  const lowerText = normalizeText(ocrText).toLowerCase();

  const bestByStrain = new Map<
    string,
    { item: CatalogStrain; score: number }
  >();

  for (const { query, penalty } of weightedQueries) {
    for (const result of fuse.search(query)) {
      const key = `${result.item.name}|${result.item.manufacturer}`;
      const score = (result.score ?? 1) + penalty;
      const existing = bestByStrain.get(key);

      if (!existing || score < existing.score) {
        bestByStrain.set(key, { item: result.item, score });
      }
    }
  }

  // Bonus, wenn der Hersteller wörtlich auf dem Etikett steht.
  for (const entry of bestByStrain.values()) {
    if (
      entry.item.manufacturer &&
      lowerText.includes(entry.item.manufacturer.toLowerCase())
    ) {
      entry.score = Math.max(0, entry.score - 0.3);
    }
  }

  return Array.from(bestByStrain.values())
    .sort((a, b) => a.score - b.score)
    .slice(0, 5)
    .map(({ item, score }) => ({
      name: item.name,
      manufacturer: item.manufacturer,
      thc: item.thc,
      cbd: item.cbd,
      genetics: item.genetics,
      score: Math.round((1 - score) * 100),
    }));
}

function parseText(text: string) {
  const clean = normalizeText(text);
  const lines = text
    .split(/\r?\n/)
    .map((l) => normalizeText(l))
    .filter(Boolean);

  const thcMatch =
    clean.match(/(?:Gesamt-?)?THC(?:-Gehalt)?[:\s]*([<>\d.,]+)\s*%/i) ||
    clean.match(/([<>\d.,]+)\s*%\s*THC/i);
  const cbdMatch =
    clean.match(/(?:Gesamt-?)?CBD(?:-Gehalt)?[:\s]*([<>\d.,]+)\s*%/i) ||
    clean.match(/([<>\d.,]+)\s*%\s*CBD/i);

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
    const badLine =
      /THC|CBD|Hergestellt|Verwendbar|Defektur|Charge|Anwendung|Gebrauch|INHALT|Gramm|Cannabisbl|Bl.?ten|Cannabis flos|Apotheke/i.test(
        nextLine
      );

    if (nextLine && !badLine) {
      name = nextLine;
    }
  }

  if (!manufacturer) {
    manufacturer =
      knownManufacturers.find((maker) =>
        clean.toLowerCase().includes(maker.toLowerCase())
      ) || "";
  }

  if (!name) {
    const lowerClean = clean.toLowerCase();
    const isRatioCode = (value: string) => /^\d{1,2}\/\d{1,2}$/.test(value);

    // Zuerst volle Katalognamen, dann aussagekräftige Aliasse –
    // generische Zahlencodes wie "22/1" zählen hier nicht.
    const catalogHit =
      strainCatalog.find((strain) =>
        lowerClean.includes(strain.name.toLowerCase())
      ) ||
      strainCatalog.find((strain) =>
        strain.aliases?.some(
          (alias) =>
            !isRatioCode(alias) &&
            alias.length >= 3 &&
            lowerClean.includes(alias.toLowerCase())
        )
      );
    name = catalogHit?.name || "";
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

    // Sanfte Aufbereitung statt harter Binarisierung: erhält Text auf
    // farbigen und kontrastarmen Etiketten deutlich besser.
    const imageForOcr = await sharp(scanBuffer)
      .rotate()
      .resize({ width: 1400, withoutEnlargement: true })
      .grayscale()
      .normalize()
      .median(1)
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

    // Zwei Durchläufe: Blocktext und verstreuter Text – Etiketten haben oft
    // beides. Das Ergebnis mit der höheren Konfidenz gewinnt.
    await worker.setParameters({
      tessedit_pageseg_mode: PSM.SINGLE_BLOCK,
    });
    const blockResult = await timeout(worker.recognize(imageForOcr), 25000);

    await worker.setParameters({
      tessedit_pageseg_mode: PSM.SPARSE_TEXT,
    });
    let sparseResult: typeof blockResult | null = null;
    try {
      sparseResult = await timeout(worker.recognize(imageForOcr), 25000);
    } catch (error) {
      console.error("SPARSE OCR SKIPPED:", error);
    }

    const result =
      sparseResult &&
      sparseResult.data.confidence > blockResult.data.confidence &&
      (sparseResult.data.text || "").trim().length >=
        (blockResult.data.text || "").trim().length * 0.5
        ? sparseResult
        : blockResult;

    console.log(
      "OCR DONE",
      "block:", blockResult.data.confidence,
      "sparse:", sparseResult?.data.confidence ?? "-"
    );

    const extractedText = result.data.text || "";
    const parsed = parseText(extractedText);
    const bestMatch = await findBestDbMatch(extractedText);
    const suggestions = findCatalogSuggestions(extractedText, parsed.name);

    await worker.terminate();
    worker = null;

    const finalData = {
      name: parsed.name || bestMatch?.name || "",
      manufacturer: parsed.manufacturer || bestMatch?.manufacturer || "",
      thc: parsed.thc || bestMatch?.thc || "",
      cbd: parsed.cbd || bestMatch?.cbd || "",
    };

    const topSuggestion = suggestions[0];

    return NextResponse.json({
      ...finalData,
      name: finalData.name || topSuggestion?.name || "",
      manufacturer: finalData.manufacturer || topSuggestion?.manufacturer || "",
      thc: finalData.thc || topSuggestion?.thc || "",
      cbd: finalData.cbd || topSuggestion?.cbd || "",
      suggestions,
      genetics: bestMatch?.genetics || topSuggestion?.genetics || "",
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