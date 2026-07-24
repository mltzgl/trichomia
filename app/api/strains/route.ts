import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSessionUserId } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const userId = await getSessionUserId();

    if (!userId) {
      return NextResponse.json({ error: "Nicht eingeloggt" }, { status: 401 });
    }

    const body = await req.json();

    const strain = await prisma.strain.create({
      data: {
        name: body.name,
        manufacturer: body.manufacturer || null,
        thc: body.thc || null,
        cbd: body.cbd || null,
        genetics: body.genetics || null,
        terpenes: body.terpenes || null,
        description: body.description || null,
      },
    });

    return NextResponse.json(strain);
  } catch (err) {
    console.error("STRAIN CREATE ERROR:", err);
    return NextResponse.json({ error: "Serverfehler" }, { status: 500 });
  }
}