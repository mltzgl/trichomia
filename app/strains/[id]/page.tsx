import ReviewForm from "@/components/ReviewForm";
import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import BottomNav from "@/components/BottomNav";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function StrainDetailPage({ params }: Props) {
  const { id } = await params;

  const strain = await prisma.strain.findUnique({
  where: { id: Number(id) },
  include: {
    reviews: {
      orderBy: {
        createdAt: "desc",
      },
    },
  },
});

  if (!strain) notFound();

  return (
    <main className="min-h-screen bg-zinc-950 px-5 py-8 pb-28 text-white">
      <div className="mx-auto max-w-5xl">
        <Link href="/strains" className="text-sm text-emerald-400">
          ← Zurück
        </Link>

        <section className="mt-6 rounded-[2rem] border border-emerald-700/40 bg-zinc-900 p-8">
          <p className="font-semibold text-emerald-400">
            {strain.manufacturer || "Hersteller unbekannt"}
          </p>

          <h1 className="mt-3 text-5xl font-black">{strain.name}</h1>

          <p className="mt-4 text-zinc-300">
            {strain.description || "Noch keine Beschreibung vorhanden."}
          </p>

          <div className="mt-8 grid gap-3 sm:grid-cols-4">
            <InfoCard label="THC" value={strain.thc || "k. A."} />
            <InfoCard label="CBD" value={strain.cbd || "k. A."} />
            <InfoCard label="Genetik" value={strain.genetics || "k. A."} />
            <InfoCard label="Bewertungen" value={String(strain.reviews.length)} />
          </div>

          <div className="mt-8 rounded-2xl bg-zinc-950 p-5">
            <p className="text-sm text-zinc-400">Terpene</p>
            <p className="mt-2">{strain.terpenes || "Keine Angaben"}</p>
          </div>
        </section>
      </div>

      <section className="mt-10 grid gap-6 lg:grid-cols-2">
  
  {/* LEFT: Bewertung abgeben */}
  <ReviewForm strainId={strain.id} />

  {/* RIGHT: Bewertungen anzeigen */}
  <div className="rounded-[2rem] border border-zinc-800 bg-zinc-900 p-6">
    <h2 className="text-2xl font-black">Community-Bewertungen</h2>

    <div className="mt-5 grid gap-4">

      {strain.reviews.map((review) => (
        <div
          key={review.id}
          className="rounded-2xl bg-zinc-950 p-4"
        >
          <p className="font-bold text-emerald-400">
            Gesamt: {review.rating}/10
          </p>

          <p className="mt-2 text-sm text-zinc-400">
            Wirkung {review.effect ?? "-"} · Geschmack {review.taste ?? "-"} ·
            Stärke {review.strength ?? "-"} · Verträglichkeit{" "}
            {review.tolerance ?? "-"}
          </p>

          {review.comment && (
            <p className="mt-3 text-zinc-300">
              {review.comment}
            </p>
          )}
        </div>
      ))}

      {strain.reviews.length === 0 && (
        <p className="text-zinc-400">
          Noch keine Bewertungen vorhanden.
        </p>
      )}
    </div>
  </div>

</section>

      <BottomNav />
    </main>
  );
}

function InfoCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-black/30 p-4">
      <p className="text-sm text-zinc-400">{label}</p>
      <p className="mt-2 font-black">{value}</p>
    </div>
  );
}