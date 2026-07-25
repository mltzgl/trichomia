"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Logo from "@/components/Logo";

export default function RegisterPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [ageConfirmed, setAgeConfirmed] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function register() {
    if (!birthDate) {
      setMessage("Bitte gib dein Geburtsdatum an.");
      return;
    }

    const birth = new Date(birthDate);
    const now = new Date();
    let age = now.getFullYear() - birth.getFullYear();
    const beforeBirthday =
      now.getMonth() < birth.getMonth() ||
      (now.getMonth() === birth.getMonth() && now.getDate() < birth.getDate());
    if (beforeBirthday) age -= 1;

    if (age < 18) {
      setMessage(
        "Du musst mindestens 18 Jahre alt sein, um Trichomia zu nutzen."
      );
      return;
    }

    setLoading(true);
    setMessage("");

    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, birthDate, ageConfirmed }),
    });

    const data = await res.json();

    if (!res.ok) {
      setMessage(data.error || "Registrierung fehlgeschlagen.");
      setLoading(false);
      return;
    }

    router.push("/account");
    router.refresh();
  }

  return (
    <main className="min-h-screen bg-night px-5 py-10 text-ivory">
      <div className="mx-auto max-w-md">
        <Logo />

        <h1 className="mt-4 text-5xl font-bold leading-tight">
          Account erstellen.
        </h1>

        <p className="mt-4 text-moss">
          Zugang nur für volljährige Nutzer. Keine medizinische Beratung.
        </p>

        <div className="mt-8 rounded-3xl border border-cream/10 bg-panel p-5">
          <div className="grid gap-4">
            <input
              className="rounded-xl border border-cream/10 bg-night p-4"
              placeholder="E-Mail"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              className="rounded-xl border border-cream/10 bg-night p-4"
              placeholder="Passwort, min. 8 Zeichen"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <label className="grid gap-2 rounded-xl border border-cream/10 bg-night p-4 text-sm text-haze">
              Geburtsdatum (nur für die Altersprüfung)
              <input
                type="date"
                value={birthDate}
                max={new Date().toISOString().split("T")[0]}
                onChange={(e) => setBirthDate(e.target.value)}
                className="rounded-lg border border-cream/10 bg-panel p-3 text-ivory [color-scheme:dark]"
              />
            </label>

            <label className="flex gap-3 rounded-xl border border-cream/10 bg-night p-4 text-sm text-haze">
              <input
                type="checkbox"
                checked={ageConfirmed}
                onChange={(e) => setAgeConfirmed(e.target.checked)}
              />
              Ich bestätige, dass ich mindestens 18 Jahre alt bin und meine
              Angaben korrekt sind.
            </label>

            <button
              onClick={register}
              disabled={loading}
              className="rounded-xl bg-forest p-4 font-semibold disabled:opacity-50"
            >
              {loading ? "Account wird erstellt..." : "Registrieren"}
            </button>

            {message && (
              <p className="rounded-xl border border-red-800 bg-red-950/40 p-4 text-sm text-red-200">
                {message}
              </p>
            )}
          </div>
        </div>

        <p className="mt-6 text-center text-sm text-moss">
          Schon registriert?{" "}
          <Link href="/login" className="text-gold">
            Einloggen
          </Link>
        </p>
      </div>
    </main>
  );
}