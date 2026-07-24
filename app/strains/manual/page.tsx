import BottomNav from "@/components/BottomNav";
import StrainForm from "@/components/StrainForm";

export default function ManualStrainPage() {
  return (
    <main className="min-h-screen bg-zinc-950 px-5 py-8 pb-28 text-white">
      <div className="mx-auto max-w-3xl">
        <p className="font-semibold text-emerald-400">Manuelle Erfassung</p>
        <h1 className="mt-4 text-5xl font-black">Sorte hinzufügen</h1>
        <p className="mt-4 text-zinc-400">
          Trage neutrale Sortendaten ein. Keine medizinischen Versprechen.
        </p>

        <div className="mt-8">
          <StrainForm />
        </div>
      </div>

      <BottomNav />
    </main>
  );
}