"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Logo from "@/components/Logo";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function login() {
    setLoading(true);
    setMessage("");

    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      setMessage(data.error || "Login fehlgeschlagen.");
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
          Willkommen zurück.
        </h1>

        <p className="mt-4 text-zinc-400">
          Melde dich an, um Bewertungen zu speichern und dein Profil zu verwalten.
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
              placeholder="Passwort"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button
              onClick={login}
              disabled={loading}
              className="rounded-xl bg-emerald-600 p-4 font-semibold disabled:opacity-50"
            >
              {loading ? "Einloggen..." : "Einloggen"}
            </button>

            {message && (
              <p className="rounded-xl border border-red-800 bg-red-950/40 p-4 text-sm text-red-200">
                {message}
              </p>
            )}
          </div>
        </div>

        <p className="mt-6 text-center text-sm text-zinc-400">
          Noch keinen Account?{" "}
          <Link href="/register" className="text-emerald-400">
            Jetzt registrieren
          </Link>
        </p>
      </div>
    </main>
  );
}