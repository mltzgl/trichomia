import Link from "next/link";
import { Camera, PenLine } from "lucide-react";
import BottomNav from "@/components/BottomNav";
import Logo from "@/components/Logo";

export default function NewStrainPage() {
  return (
    <main className="min-h-screen bg-zinc-950 px-5 py-8 pb-28 text-white">
      <div className="mx-auto max-w-5xl">
        <Logo />
        <h1 className="mt-4 text-5xl font-black">Sorte erfassen</h1>
        <p className="mt-4 max-w-2xl text-zinc-400">
          Du kannst ein Etikett scannen oder die Daten manuell eintragen.
        </p>

        <section className="mt-8 grid gap-5 md:grid-cols-2">
          <Link href="/strains/scan" className="rounded-[2rem] border border-emerald-700 bg-emerald-900/30 p-8 hover:bg-emerald-900/50">
            <Camera size={42} className="text-emerald-400" />
            <h2 className="mt-5 text-3xl font-black">Etikett scannen</h2>
            <p className="mt-3 text-zinc-300">
              Foto hochladen, QR/OCR analysieren und Vorschlag prüfen.
            </p>
          </Link>

          <Link href="/strains/manual" className="rounded-[2rem] border border-zinc-800 bg-zinc-900 p-8 hover:border-emerald-700">
            <PenLine size={42} className="text-emerald-400" />
            <h2 className="mt-5 text-3xl font-black">Manuell hinzufügen</h2>
            <p className="mt-3 text-zinc-300">
              Sorte, Hersteller, THC/CBD und Merkmale selbst eintragen.
            </p>
          </Link>
        </section>
      </div>

      <BottomNav />
    </main>
  );
}