import BottomNav from "@/components/BottomNav";

export default function ForumPage() {
  return (
    <main className="min-h-screen bg-night text-ivory px-5 py-6 pb-24">
      <h1 className="text-3xl font-bold">Forum</h1>
      <p className="text-moss mt-2">
        Community-Austausch im legalen Rahmen.
      </p>

      <section className="grid gap-4 mt-6">
        <article className="rounded-2xl bg-panel p-5 border border-cream/10">
          <h2 className="font-semibold">Medizinische Erfahrungen</h2>
          <p className="text-moss mt-2">
            Austausch über Verträglichkeit, Einnahmeformen und persönliche Erfahrungen.
          </p>
        </article>

        <article className="rounded-2xl bg-panel p-5 border border-cream/10">
          <h2 className="font-semibold">Homegrow legal</h2>
          <p className="text-moss mt-2">
            Tipps zu legalem Eigenanbau, Pflege und Setup.
          </p>
        </article>
      </section>

      <BottomNav />
    </main>
  );
}