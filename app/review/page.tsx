import Link from "next/link";
import { Star, Plus } from "lucide-react";
import { prisma } from "@/lib/prisma";
import BottomNav from "@/components/BottomNav";

export const dynamic = "force-dynamic";

export default async function ReviewPage() {
  const strains = await prisma.strain.findMany({
    orderBy: { name: "asc" },
    include: { reviews: true },
  });

  return (
    <main className="min-h-screen bg-zinc-950 text-white px-5 py-6 pb-24">
      <h1 className="text-3xl font-bold">Erfahrung teilen</h1>
      <p className="text-zinc-400 mt-2">
        Wähle die Sorte aus, die du bewerten möchtest. Bitte keine
        Heilversprechen oder medizinischen Empfehlungen posten.
      </p>

      <section className="grid gap-4 mt-6">
        {strains.map((strain) => (
          <Link
            key={strain.id}
            href={`/strains/${strain.id}`}
            className="rounded-2xl bg-zinc-900 p-5 border border-zinc-800 hover:border-emerald-700"
          >
            <div className="flex items-center justify-between gap-4">
              <div>
                <h2 className="font-semibold">{strain.name}</h2>
                <p className="text-sm text-zinc-400 mt-1">
                  {strain.manufacturer || "Hersteller unbekannt"}
                </p>
              </div>

              <div className="flex items-center gap-2 text-emerald-400">
                <Star size={18} />
                <span className="text-sm">{strain.reviews.length}</span>
              </div>
            </div>
          </Link>
        ))}

        {strains.length === 0 && (
          <div className="rounded-2xl bg-zinc-900 p-5 border border-zinc-800">
            <p className="text-zinc-400">
              Es sind noch keine Sorten vorhanden. Lege zuerst eine Sorte an,
              um sie bewerten zu können.
            </p>
            <Link
              href="/strains/new"
              className="mt-4 inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 font-semibold"
            >
              <Plus size={18} />
              Sorte erfassen
            </Link>
          </div>
        )}
      </section>

      <BottomNav />
    </main>
  );
}
