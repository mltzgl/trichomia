import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { getSessionUserId } from "@/lib/auth";

export async function POST(request: Request) {
  try {
    const userId = await getSessionUserId();

    if (!userId) {
      return NextResponse.json({ error: "Nicht eingeloggt." }, { status: 401 });
    }

    const body = await request.json();

    const username = String(body.username || "").trim().toLowerCase();
    const displayName = String(body.displayName || "").trim();
    const bio = String(body.bio || "").trim();
    const location = String(body.location || "").trim();

    if (username && username.length < 3) {
      return NextResponse.json(
        { error: "Benutzername muss mindestens 3 Zeichen haben." },
        { status: 400 }
      );
    }

    await prisma.user.update({
      where: { id: userId },
      data: {
        username: username || null,
        displayName: displayName || null,
        bio: bio || null,
        location: location || null,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      return NextResponse.json(
        { error: "Dieser Benutzername ist bereits vergeben." },
        { status: 409 }
      );
    }

    console.error("PROFILE UPDATE ERROR:", error);

    return NextResponse.json(
      { error: "Profil konnte nicht gespeichert werden." },
      { status: 500 }
    );
  }
}