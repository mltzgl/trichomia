import BottomNav from "@/components/BottomNav";

export default function ReviewPage() {
  return (
    <main className="min-h-screen bg-zinc-950 text-white px-5 py-6 pb-24">
      <h1 className="text-3xl font-bold">Erfahrung teilen</h1>
      <p className="text-zinc-400 mt-2">
        Bitte keine Heilversprechen oder medizinischen Empfehlungen posten.
      </p>

      <form className="grid gap-4 mt-6">
        <input
          className="rounded-xl bg-zinc-900 border border-zinc-800 p-4"
          placeholder="Sorte"
        />

        <input
          className="rounded-xl bg-zinc-900 border border-zinc-800 p-4"
          placeholder="Bewertung 1–5"
          type="number"
          min="1"
          max="5"
        />

        <textarea
          className="rounded-xl bg-zinc-900 border border-zinc-800 p-4 min-h-32"
          placeholder="Dein Erfahrungsbericht..."
        />

        <button
          type="button"
          className="rounded-xl bg-emerald-600 p-4 font-semibold"
        >
          Bewertung speichern
        </button>
      </form>

      <BottomNav />
    </main>
  );
}