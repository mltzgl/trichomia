import Link from "next/link";
import { Camera, PenLine } from "lucide-react";
import BottomNav from "@/components/BottomNav";
import Logo from "@/components/Logo";

export default function NewStrainPage() {
  return (
    <main className="min-h-screen bg-night px-5 py-8 pb-28 text-ivory">
      <div className="mx-auto max-w-6xl">
        <Logo />
        <h1 className="mt-4 text-5xl font-bold">Sorte erfassen</h1>
        <p className="mt-4 max-w-2xl text-moss">
          Du kannst ein Etikett scannen oder die Daten manuell eintragen.
        </p>

        <section className="mt-8 grid gap-5 md:grid-cols-2">
          <Link href="/strains/scan" className="rounded-[2rem] border border-leaf/40 bg-forest/20 p-8 hover:bg-forest/40">
            <Camera size={42} className="text-gold" />
            <h2 className="mt-5 text-3xl font-bold">Etikett scannen</h2>
            <p className="mt-3 text-haze">
              Foto hochladen, QR/OCR analysieren und Vorschlag prüfen.
            </p>
          </Link>

          <Link href="/strains/manual" className="rounded-[2rem] border border-cream/10 bg-panel p-8 hover:border-leaf/50">
            <PenLine size={42} className="text-gold" />
            <h2 className="mt-5 text-3xl font-bold">Manuell hinzufügen</h2>
            <p className="mt-3 text-haze">
              Sorte, Hersteller, THC/CBD und Merkmale selbst eintragen.
            </p>
          </Link>
        </section>
      </div>

      <BottomNav />
    </main>
  );
}