import Link from "next/link";
import { Star, Plus, Clock, ShieldCheck } from "lucide-react";
import { prisma } from "@/lib/prisma";
import BottomNav from "@/components/BottomNav";
import { ReviewIllustration } from "@/components/Illustrations";

export const dynamic = "force-dynamic";

export default async function ReviewPage() {
  const strains = await prisma.strain.findMany({
    orderBy: { name: "asc" },
    include: { reviews: true },
  });

  return (
    <main className="min-h-screen bg-night text-ivory px-5 py-6 pb-24">
      <div className="mx-auto max-w-[1600px]">
      <div className="grid items-center gap-8 lg:grid-cols-[1.4fr_0.6fr]">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.22em] text-gold">
            Erfahrungen
          </p>
          <h1 className="mt-4 text-4xl font-bold md:text-5xl">
            Erfahrung teilen
          </h1>
          <p className="text-moss mt-4 max-w-2xl">
            Deine Bewertung hilft anderen, die passende Sorte zu finden. Wähle
            unten die Sorte aus, die du bewerten möchtest – bitte keine
            Heilversprechen oder medizinischen Empfehlungen posten.
          </p>
        </div>

        <ReviewIllustration className="hidden w-full max-w-sm justify-self-end lg:block" />
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-cream/10 bg-panel p-5">
          <Star className="text-gold" size={20} />
          <h2 className="mt-3 text-base font-bold">Fünf Dimensionen</h2>
          <p className="mt-1 text-sm text-moss">
            Gesamteindruck, Wirkung, Geschmack, Stärke und Verträglichkeit –
            jeweils auf einer Skala von 1 bis 10.
          </p>
        </div>
        <div className="rounded-2xl border border-cream/10 bg-panel p-5">
          <Clock className="text-gold" size={20} />
          <h2 className="mt-3 text-base font-bold">Eine Bewertung pro Woche</h2>
          <p className="mt-1 text-sm text-moss">
            Jede Sorte kannst du alle 7 Tage neu bewerten – so bleiben die
            Ergebnisse ausgewogen und spamfrei.
          </p>
        </div>
        <div className="rounded-2xl border border-cream/10 bg-panel p-5">
          <ShieldCheck className="text-gold" size={20} />
          <h2 className="mt-3 text-base font-bold">Ehrlich &amp; neutral</h2>
          <p className="mt-1 text-sm text-moss">
            Beschreibe deine persönliche Erfahrung. Keine Heilversprechen,
            keine Konsumaufforderungen – deine Einschätzung zählt.
          </p>
        </div>
      </div>

      <h2 className="mt-10 text-2xl font-bold">Sorte auswählen</h2>

      <section className="grid gap-4 mt-4">
        {strains.map((strain) => (
          <Link
            key={strain.id}
            href={`/strains/${strain.id}`}
            className="rounded-2xl bg-panel p-5 border border-cream/10 hover:border-leaf/50"
          >
            <div className="flex items-center justify-between gap-4">
              <div>
                <h2 className="font-semibold">{strain.name}</h2>
                <p className="text-sm text-moss mt-1">
                  {strain.manufacturer || "Hersteller unbekannt"}
                </p>
              </div>

              <div className="flex items-center gap-2 text-gold">
                <Star size={18} />
                <span className="text-sm">{strain.reviews.length}</span>
              </div>
            </div>
          </Link>
        ))}

        {strains.length === 0 && (
          <div className="rounded-2xl bg-panel p-5 border border-cream/10">
            <p className="text-moss">
              Es sind noch keine Sorten vorhanden. Lege zuerst eine Sorte an,
              um sie bewerten zu können.
            </p>
            <Link
              href="/strains/new"
              className="mt-4 inline-flex items-center gap-2 rounded-xl bg-forest px-5 py-3 font-semibold"
            >
              <Plus size={18} />
              Sorte erfassen
            </Link>
          </div>
        )}
      </section>
      </div>

      <BottomNav />
    </main>
  );
}
