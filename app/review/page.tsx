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
    <main className="min-h-screen bg-night text-ivory px-5 py-6 pb-24">
      <h1 className="text-3xl font-bold">Erfahrung teilen</h1>
      <p className="text-moss mt-2">
        Wähle die Sorte aus, die du bewerten möchtest. Bitte keine
        Heilversprechen oder medizinischen Empfehlungen posten.
      </p>

      <section className="grid gap-4 mt-6">
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

      <BottomNav />
    </main>
  );
}
