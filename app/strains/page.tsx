import Link from "next/link";
import { Plus, Search, Sprout, Star, BookOpen } from "lucide-react";
import { prisma } from "@/lib/prisma";
import BottomNav from "@/components/BottomNav";
import { StrainsIllustration } from "@/components/Illustrations";

export const dynamic = "force-dynamic";

export default async function StrainsPage() {
  const strains = await prisma.strain.findMany({
    orderBy: { createdAt: "desc" },
    include: { reviews: true },
  });

  return (
    <main className="min-h-screen bg-night px-5 py-8 pb-28 text-ivory">
      <div className="mx-auto max-w-[1600px]">
        <div className="grid items-center gap-8 lg:grid-cols-[1.4fr_0.6fr]">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.22em] text-gold">
              Sorten-Datenbank
            </p>
            <h1 className="mt-4 text-4xl font-bold md:text-5xl">
              Medizinische Sorten
            </h1>
            <p className="mt-4 max-w-2xl text-moss">
              Neutrale Übersicht zu Sorten, Herstellern und
              Community-Erfahrungen. Jede Sorte zeigt deklarierte THC- und
              CBD-Werte, Genetik und Terpenprofil – ergänzt um echte
              Bewertungen aus der Community statt Marketing-Texten.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/strains/new"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-gold px-6 py-3 font-semibold text-forest-deep transition hover:bg-gold-hot"
              >
                <Plus size={18} />
                Sorte erfassen
              </Link>
              <Link
                href="/wissen#cannabinoide"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-cream/30 px-6 py-3 font-semibold text-ivory transition hover:border-gold hover:text-gold-hot"
              >
                <BookOpen size={18} />
                Was bedeuten THC &amp; CBD?
              </Link>
            </div>
          </div>

          <StrainsIllustration className="hidden w-full max-w-sm justify-self-end lg:block" />
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-cream/10 bg-panel p-5">
            <div className="flex items-center gap-2 text-gold">
              <Sprout size={18} />
              <p className="text-3xl font-bold text-ivory">{strains.length}</p>
            </div>
            <p className="mt-1 text-sm text-moss">Sorten in der Datenbank</p>
          </div>
          <div className="rounded-2xl border border-cream/10 bg-panel p-5">
            <div className="flex items-center gap-2 text-gold">
              <Star size={18} />
              <p className="text-3xl font-bold text-ivory">
                {strains.reduce((sum, s) => sum + s.reviews.length, 0)}
              </p>
            </div>
            <p className="mt-1 text-sm text-moss">Community-Bewertungen</p>
          </div>
          <Link
            href="/wissen#trichome"
            className="rounded-2xl border border-cream/10 bg-panel p-5 transition hover:border-gold/50"
          >
            <div className="flex items-center gap-2 text-gold">
              <BookOpen size={18} />
              <p className="text-lg font-bold text-ivory">Schon gewusst?</p>
            </div>
            <p className="mt-1 text-sm text-moss">
              Trichome verraten den Reifegrad einer Blüte – mehr im
              Wissensbereich →
            </p>
          </Link>
        </div>

        <div className="mt-6 rounded-[2rem] border border-cream/10 bg-panel p-4">
          <div className="flex items-center gap-3 rounded-xl border border-cream/10 bg-night px-4 py-3 text-moss">
            <Search size={18} />
            <span>Suche kommt als nächstes Feature</span>
          </div>
        </div>

        <section className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {strains.map((strain) => (
            <Link
              key={strain.id}
              href={`/strains/${strain.id}`}
              className="rounded-[2rem] border border-cream/10 bg-panel p-5 transition hover:border-leaf/50"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-bold">{strain.name}</h2>
                  <p className="mt-1 text-sm text-moss">
                    {strain.manufacturer || "Hersteller unbekannt"}
                  </p>
                </div>

                <div className="rounded-2xl bg-forest p-3">
                  <Sprout size={22} />
                </div>
              </div>

              <div className="mt-5 flex flex-wrap gap-2 text-sm">
                {strain.thc && (
                  <span className="rounded-full bg-night px-3 py-1">
                    THC {strain.thc}
                  </span>
                )}
                {strain.cbd && (
                  <span className="rounded-full bg-night px-3 py-1">
                    CBD {strain.cbd}
                  </span>
                )}
                {strain.genetics && (
                  <span className="rounded-full bg-night px-3 py-1">
                    {strain.genetics}
                  </span>
                )}
              </div>

              <p className="mt-5 text-sm text-moss">
                {strain.reviews.length} Community-Bewertungen
              </p>
            </Link>
          ))}

          {strains.length === 0 && (
            <div className="rounded-[2rem] border border-cream/10 bg-panel p-6">
              <h2 className="text-2xl font-bold">Noch keine Sorten vorhanden</h2>
              <p className="mt-3 text-moss">
                Erfasse die erste medizinische Sorte.
              </p>
            </div>
          )}
        </section>
      </div>

      <BottomNav />
    </main>
  );
}