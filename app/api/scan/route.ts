import { NextResponse } from "next/server";
import sharp from "sharp";
import jsQR from "jsqr";
import OpenAI from "openai";

async function detectQrCode(buffer: Buffer) {
  try {
    const image = await sharp(buffer)
      .resize({ width: 900, withoutEnlargement: true })
      .ensureAlpha()
      .raw()
      .toBuffer({ resolveWithObject: true });

    const code = jsQR(
      new Uint8ClampedArray(image.data),
      image.info.width,
      image.info.height
    );

    return code?.data || "";
  } catch {
    return "";
  }
}

export async function POST(req: Request) {
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  try {
    const formData = await req.formData();
    const file = formData.get("file");

    if (!file || !(file instanceof File)) {
      return NextResponse.json({ error: "Kein Bild" }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());

    // ⚡ 1. QR sofort prüfen
    const qrUrl = await detectQrCode(buffer);

    // ⚡ 2. Bild verkleinern für KI
    const resized = await sharp(buffer)
      .resize({ width: 1200, withoutEnlargement: true })
      .jpeg({ quality: 80 })
      .toBuffer();

    const base64 = resized.toString("base64");

    // 🤖 3. OpenAI Vision
    const response = await openai.responses.create({
      model: "gpt-4.1-mini",
      input: [
        {
          role: "user",
          content: [
            {
              type: "input_text",
              text: `
Analysiere dieses Cannabis-Etikett.

Extrahiere:
- name (Sortenname)
- manufacturer (Hersteller)
- thc (in %)
- cbd (in %)
- genetics (Indica/Sativa/Hybrid falls erkennbar)

Antworte NUR als JSON:

{
  "name": "",
  "manufacturer": "",
  "thc": "",
  "cbd": "",
  "genetics": ""
}
`,
            },
            {
              type: "input_image",
              image_url: `data:image/jpeg;base64,${base64}`,
              detail: "auto",
            },
          ],
        },
      ],
    });

    let parsed = {};

    try {
      parsed = JSON.parse(response.output_text);
    } catch {
      parsed = {};
    }

    return NextResponse.json({
      ...parsed,
      qrUrl,
    });
  } catch (err) {
    console.error("SCAN ERROR:", err);

    return NextResponse.json(
      { error: "Analyse fehlgeschlagen" },
      { status: 500 }
    );
  }
}