import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { createSession } from "@/lib/auth";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const email = String(body.email || "").toLowerCase().trim();
    const password = String(body.password || "");
    const ageConfirmed = Boolean(body.ageConfirmed);

    if (!email || !password) {
      return NextResponse.json(
        { error: "E-Mail und Passwort sind erforderlich." },
        { status: 400 }
      );
    }

    if (password.length < 8) {
      return NextResponse.json(
        { error: "Passwort muss mindestens 8 Zeichen haben." },
        { status: 400 }
      );
    }

    if (!ageConfirmed) {
      return NextResponse.json(
        { error: "Bitte bestätige, dass du mindestens 18 Jahre alt bist." },
        { status: 400 }
      );
    }

    const birthDateRaw = String(body.birthDate || "");
    const birthDate = new Date(birthDateRaw);

    if (!birthDateRaw || isNaN(birthDate.getTime())) {
      return NextResponse.json(
        { error: "Bitte gib ein gültiges Geburtsdatum an." },
        { status: 400 }
      );
    }

    const now = new Date();
    let age = now.getFullYear() - birthDate.getFullYear();
    const beforeBirthday =
      now.getMonth() < birthDate.getMonth() ||
      (now.getMonth() === birthDate.getMonth() &&
        now.getDate() < birthDate.getDate());
    if (beforeBirthday) age -= 1;

    if (age < 18) {
      return NextResponse.json(
        { error: "Du musst mindestens 18 Jahre alt sein." },
        { status: 400 }
      );
    }

    if (age > 120) {
      return NextResponse.json(
        { error: "Bitte gib ein gültiges Geburtsdatum an." },
        { status: 400 }
      );
    }

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "Diese E-Mail ist bereits registriert." },
        { status: 409 }
      );
    }

    const passwordHash = await bcrypt.hash(password, 12);

    const user = await prisma.user.create({
      data: {
        email,
        passwordHash,
        ageConfirmed,
        birthDate,
      },
    });

    await createSession(user.id);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("REGISTER ERROR:", error);

    return NextResponse.json(
      { error: "Serverfehler bei der Registrierung." },
      { status: 500 }
    );
  }
}