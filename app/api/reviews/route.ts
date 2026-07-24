import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSessionUserId } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const userId = await getSessionUserId();

    if (!userId) {
      return NextResponse.json({ error: "Nicht eingeloggt." }, { status: 401 });
    }

    const body = await req.json();

    const strainId = Number(body.strainId);
    const rating = Number(body.rating);
    const effect = Number(body.effect);
    const taste = Number(body.taste);
    const strength = Number(body.strength);
    const tolerance = Number(body.tolerance);
    const comment = String(body.comment || "").trim();

    if (!strainId || !rating) {
      return NextResponse.json(
        { error: "Sorte und Gesamtbewertung sind erforderlich." },
        { status: 400 }
      );
    }

const lastReview = await prisma.review.findFirst({
  where: {
    userId,
    strainId,
  },
  orderBy: {
    createdAt: "desc",
  },
});

if (lastReview) {
  const sevenDaysMs = 7 * 24 * 60 * 60 * 1000;
  const nextAllowedAt = new Date(lastReview.createdAt.getTime() + sevenDaysMs);

  if (Date.now() < nextAllowedAt.getTime()) {
    return NextResponse.json(
      {
        error: `Du kannst diese Sorte erst wieder ab dem ${nextAllowedAt.toLocaleDateString(
          "de-DE"
        )} bewerten.`,
      },
      { status: 429 }
    );
  }
}

    const review = await prisma.review.create({
      data: {
        userId,
        strainId,
        rating,
        effect: effect || null,
        taste: taste || null,
        strength: strength || null,
        tolerance: tolerance || null,
        comment: comment || null,
      },
    });

    return NextResponse.json({ success: true, review });
  } catch (error) {
    console.error("REVIEW CREATE ERROR:", error);

    return NextResponse.json(
      { error: "Bewertung konnte nicht gespeichert werden." },
      { status: 500 }
    );
  }
}