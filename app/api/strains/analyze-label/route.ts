import { NextResponse } from "next/server";
import OpenAI from "openai";

export async function POST(req: Request) {
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  const formData = await req.formData();
  const file = formData.get("image") as File;

  if (!file) {
    return NextResponse.json({ error: "Kein Bild hochgeladen" }, { status: 400 });
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  const base64 = buffer.toString("base64");

  const response = await openai.responses.create({
    model: "gpt-5.5",
    input: [
      {
        role: "user",
        content: [
          {
            type: "input_text",
            text: `
Analysiere dieses medizinische Cannabis-Etikett.
Gib nur JSON zurück mit:
name, producer, thc, cbd, genetics, type, terpenes, possibleEffects, medicalNotes.
Falls ein Wert nicht sichtbar ist, nutze null.
Keine medizinischen Empfehlungen.
            `,
          },
          {
            type: "input_image",
            image_url: `data:${file.type};base64,${base64}`,
            detail: "auto",
          },
        ],
      },
    ],
  });

  const text = response.output_text;

  return NextResponse.json({
    raw: text,
  });
}