import Link from "next/link";
import { Plus, Search, Sprout } from "lucide-react";
import { prisma } from "@/lib/prisma";
import BottomNav from "@/components/BottomNav";

export const dynamic = "force-dynamic";

export default async function StrainsPage() {
  const strains = await prisma.strain.findMany({
    orderBy: { createdAt: "desc" },
    include: { reviews: true },
  });

  return (
    <main className="min-h-screen bg-night px-5 py-8 pb-28 text-ivory">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <p className="font-semibold text-gold">Sorten-Datenbank</p>
            <h1 className="mt-4 text-5xl font-bold">Medizinische Sorten</h1>
            <p className="mt-4 max-w-2xl text-moss">
              Neutrale Übersicht zu Sorten, Herstellern und Community-Erfahrungen.
            </p>
          </div>

          <Link
            href="/strains/new"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-forest px-5 py-3 font-semibold"
          >
            <Plus size={18} />
            Sorte erfassen
          </Link>
        </div>

        <div className="mt-8 rounded-[2rem] border border-cream/10 bg-panel p-4">
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