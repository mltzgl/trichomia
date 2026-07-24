"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Logo from "@/components/Logo";

export default function RegisterPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [ageConfirmed, setAgeConfirmed] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function register() {
    setLoading(true);
    setMessage("");

    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, ageConfirmed }),
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
    <main className="min-h-screen bg-zinc-950 px-5 py-10 text-white">
      <div className="mx-auto max-w-md">
        <Logo />

        <h1 className="mt-4 text-5xl font-black leading-tight">
          Account erstellen.
        </h1>

        <p className="mt-4 text-zinc-400">
          Zugang nur für volljährige Nutzer. Keine medizinische Beratung.
        </p>

        <div className="mt-8 rounded-3xl border border-zinc-800 bg-zinc-900 p-5">
          <div className="grid gap-4">
            <input
              className="rounded-xl border border-zinc-800 bg-zinc-950 p-4"
              placeholder="E-Mail"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              className="rounded-xl border border-zinc-800 bg-zinc-950 p-4"
              placeholder="Passwort, min. 8 Zeichen"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <label className="flex gap-3 rounded-xl border border-zinc-800 bg-zinc-950 p-4 text-sm text-zinc-300">
              <input
                type="checkbox"
                checked={ageConfirmed}
                onChange={(e) => setAgeConfirmed(e.target.checked)}
              />
              Ich bestätige, dass ich mindestens 18 Jahre alt bin.
            </label>

            <button
              onClick={register}
              disabled={loading}
              className="rounded-xl bg-emerald-600 p-4 font-semibold disabled:opacity-50"
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

        <p className="mt-6 text-center text-sm text-zinc-400">
          Schon registriert?{" "}
          <Link href="/login" className="text-emerald-400">
            Einloggen
          </Link>
        </p>
      </div>
    </main>
  );
}