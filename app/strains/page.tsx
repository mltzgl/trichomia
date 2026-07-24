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
    <main className="min-h-screen bg-zinc-950 px-5 py-8 pb-28 text-white">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <p className="font-semibold text-emerald-400">Sorten-Datenbank</p>
            <h1 className="mt-4 text-5xl font-black">Medizinische Sorten</h1>
            <p className="mt-4 max-w-2xl text-zinc-400">
              Neutrale Übersicht zu Sorten, Herstellern und Community-Erfahrungen.
            </p>
          </div>

          <Link
            href="/strains/new"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 font-semibold"
          >
            <Plus size={18} />
            Sorte erfassen
          </Link>
        </div>

        <div className="mt-8 rounded-[2rem] border border-zinc-800 bg-zinc-900 p-4">
          <div className="flex items-center gap-3 rounded-xl border border-zinc-800 bg-zinc-950 px-4 py-3 text-zinc-400">
            <Search size={18} />
            <span>Suche kommt als nächstes Feature</span>
          </div>
        </div>

        <section className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {strains.map((strain) => (
            <Link
              key={strain.id}
              href={`/strains/${strain.id}`}
              className="rounded-[2rem] border border-zinc-800 bg-zinc-900 p-5 transition hover:border-emerald-700"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-black">{strain.name}</h2>
                  <p className="mt-1 text-sm text-zinc-400">
                    {strain.manufacturer || "Hersteller unbekannt"}
                  </p>
                </div>

                <div className="rounded-2xl bg-emerald-600 p-3">
                  <Sprout size={22} />
                </div>
              </div>

              <div className="mt-5 flex flex-wrap gap-2 text-sm">
                {strain.thc && (
                  <span className="rounded-full bg-zinc-950 px-3 py-1">
                    THC {strain.thc}
                  </span>
                )}
                {strain.cbd && (
                  <span className="rounded-full bg-zinc-950 px-3 py-1">
                    CBD {strain.cbd}
                  </span>
                )}
                {strain.genetics && (
                  <span className="rounded-full bg-zinc-950 px-3 py-1">
                    {strain.genetics}
                  </span>
                )}
              </div>

              <p className="mt-5 text-sm text-zinc-400">
                {strain.reviews.length} Community-Bewertungen
              </p>
            </Link>
          ))}

          {strains.length === 0 && (
            <div className="rounded-[2rem] border border-zinc-800 bg-zinc-900 p-6">
              <h2 className="text-2xl font-black">Noch keine Sorten vorhanden</h2>
              <p className="mt-3 text-zinc-400">
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