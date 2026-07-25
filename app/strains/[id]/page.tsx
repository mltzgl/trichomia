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

  const numericId = Number(id);
  if (!Number.isInteger(numericId) || numericId < 1) notFound();

  const strain = await prisma.strain.findUnique({
  where: { id: numericId },
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
    <main className="min-h-screen bg-night px-5 py-8 pb-28 text-ivory">
      <div className="mx-auto max-w-6xl">
        <Link href="/strains" className="text-sm text-gold">
          ← Zurück
        </Link>

        <section className="mt-6 rounded-[2rem] border border-leaf/30 bg-panel p-8">
          <p className="font-semibold text-gold">
            {strain.manufacturer || "Hersteller unbekannt"}
          </p>

          <h1 className="mt-3 text-5xl font-bold">{strain.name}</h1>

          <p className="mt-4 text-haze">
            {strain.description || "Noch keine Beschreibung vorhanden."}
          </p>

          <div className="mt-8 grid gap-3 sm:grid-cols-4">
            <InfoCard label="THC" value={strain.thc || "k. A."} />
            <InfoCard label="CBD" value={strain.cbd || "k. A."} />
            <InfoCard label="Genetik" value={strain.genetics || "k. A."} />
            <InfoCard label="Bewertungen" value={String(strain.reviews.length)} />
          </div>

          <div className="mt-8 rounded-2xl bg-night p-5">
            <p className="text-sm text-moss">Terpene</p>
            <p className="mt-2">{strain.terpenes || "Keine Angaben"}</p>
          </div>
        </section>
      </div>

      <section className="mt-10 grid gap-6 lg:grid-cols-2">
  
  {/* LEFT: Bewertung abgeben */}
  <ReviewForm strainId={strain.id} />

  {/* RIGHT: Bewertungen anzeigen */}
  <div className="rounded-[2rem] border border-cream/10 bg-panel p-6">
    <h2 className="text-2xl font-bold">Community-Bewertungen</h2>

    <div className="mt-5 grid gap-4">

      {strain.reviews.map((review) => (
        <div
          key={review.id}
          className="rounded-2xl bg-night p-4"
        >
          <p className="font-bold text-gold">
            Gesamt: {review.rating}/10
          </p>

          <p className="mt-2 text-sm text-moss">
            Wirkung {review.effect ?? "-"} · Geschmack {review.taste ?? "-"} ·
            Stärke {review.strength ?? "-"} · Verträglichkeit{" "}
            {review.tolerance ?? "-"}
          </p>

          {review.comment && (
            <p className="mt-3 text-haze">
              {review.comment}
            </p>
          )}
        </div>
      ))}

      {strain.reviews.length === 0 && (
        <p className="text-moss">
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
      <p className="text-sm text-moss">{label}</p>
      <p className="mt-2 font-bold">{value}</p>
    </div>
  );
}