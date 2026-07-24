import BottomNav from "@/components/BottomNav";
import StrainForm from "@/components/StrainForm";

export default function ManualStrainPage() {
  return (
    <main className="min-h-screen bg-night px-5 py-8 pb-28 text-ivory">
      <div className="mx-auto max-w-3xl">
        <p className="font-semibold text-gold">Manuelle Erfassung</p>
        <h1 className="mt-4 text-5xl font-bold">Sorte hinzufügen</h1>
        <p className="mt-4 text-moss">
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