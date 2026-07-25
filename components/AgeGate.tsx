"use client";

import { useEffect, useState } from "react";
import { ShieldAlert } from "lucide-react";

const STORAGE_KEY = "trichomia-age-verified";

export default function AgeGate() {
  const [status, setStatus] = useState<"pending" | "open" | "denied" | "ok">(
    "pending"
  );

  useEffect(() => {
    try {
      setStatus(localStorage.getItem(STORAGE_KEY) === "yes" ? "ok" : "open");
    } catch {
      setStatus("open");
    }
  }, []);

  useEffect(() => {
    if (status === "open" || status === "denied") {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "";
      };
    }
  }, [status]);

  function confirm() {
    try {
      localStorage.setItem(STORAGE_KEY, "yes");
    } catch {}
    setStatus("ok");
  }

  if (status === "pending" || status === "ok") return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-night/95 p-5 backdrop-blur-md">
      <div className="w-full max-w-md rounded-[2rem] border border-cream/10 bg-panel p-6 text-center shadow-[0_24px_70px_rgba(0,0,0,0.6)] md:p-8">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-leaf-soft">
          <ShieldAlert size={30} className="text-forest" />
        </div>

        {status === "open" ? (
          <>
            <h2 className="mt-5 text-2xl font-bold md:text-3xl">
              Bist du mindestens 18?
            </h2>
            <p className="mt-3 text-sm text-moss">
              Trichomia enthält Informationen zu Cannabis und richtet sich
              ausschließlich an volljährige Nutzerinnen und Nutzer. Bitte
              bestätige dein Alter.
            </p>

            <div className="mt-6 grid gap-3">
              <button
                onClick={confirm}
                className="rounded-full bg-gold px-6 py-3.5 font-semibold text-forest-deep transition hover:bg-gold-hot"
              >
                Ja, ich bin mindestens 18
              </button>
              <button
                onClick={() => setStatus("denied")}
                className="rounded-full border border-cream/30 px-6 py-3.5 font-semibold text-ivory transition hover:border-gold"
              >
                Nein, ich bin unter 18
              </button>
            </div>

            <p className="mt-5 text-xs text-moss">
              Kein Verkauf. Keine medizinische Beratung. Jugendschutz ist uns
              wichtig.
            </p>
          </>
        ) : (
          <>
            <h2 className="mt-5 text-2xl font-bold md:text-3xl">
              Dieses Angebot ist nichts für dich
            </h2>
            <p className="mt-3 text-sm text-moss">
              Trichomia ist nur für Erwachsene. Cannabis kann die Entwicklung
              des Gehirns beeinträchtigen – je jünger, desto höher das Risiko.
              Gute, neutrale Infos für junge Menschen findest du bei der BZgA:
            </p>
            <a
              href="https://www.drugcom.de"
              className="mt-6 inline-flex rounded-full bg-forest px-6 py-3.5 font-semibold text-ivory"
            >
              drugcom.de besuchen
            </a>
            <p className="mt-4 text-xs text-moss">
              Doch schon 18?{" "}
              <button
                onClick={() => setStatus("open")}
                className="text-gold underline"
              >
                Zurück zur Abfrage
              </button>
            </p>
          </>
        )}
      </div>
    </div>
  );
}
