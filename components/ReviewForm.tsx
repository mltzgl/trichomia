"use client";

import { useState } from "react";
import { Star, Save } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ReviewForm({ strainId }: { strainId: number }) {
  const router = useRouter();

  const [form, setForm] = useState({
    rating: 5,
    effect: 5,
    taste: 5,
    strength: 5,
    tolerance: 5,
    comment: "",
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  function setField(name: string, value: number | string) {
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function save(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const res = await fetch("/api/reviews", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ strainId, ...form }),
    });

    const data = await res.json();

    if (!res.ok) {
      setMessage(data.error || "Bewertung konnte nicht gespeichert werden.");
      setLoading(false);
      return;
    }

    setMessage("Bewertung gespeichert.");
    setLoading(false);
    router.refresh();
  }

  return (
    <form
      onSubmit={save}
      className="rounded-[2rem] border border-zinc-800 bg-zinc-900 p-6"
    >
      <div className="flex items-center gap-3">
        <Star className="text-emerald-400" size={24} />
        <h2 className="text-2xl font-black">Sorte bewerten</h2>
      </div>

      <div className="mt-6 grid gap-5">
        <Slider label="Gesamtbewertung" value={form.rating} onChange={(v) => setField("rating", v)} />
        <Slider label="Wirkung" value={form.effect} onChange={(v) => setField("effect", v)} />
        <Slider label="Geschmack" value={form.taste} onChange={(v) => setField("taste", v)} />
        <Slider label="Stärke" value={form.strength} onChange={(v) => setField("strength", v)} />
        <Slider label="Verträglichkeit" value={form.tolerance} onChange={(v) => setField("tolerance", v)} />

        <textarea
          value={form.comment}
          onChange={(e) => setField("comment", e.target.value)}
          placeholder="Deine subjektive Erfahrung..."
          className="min-h-32 rounded-xl border border-zinc-800 bg-zinc-950 p-4"
        />

        <button
          disabled={loading}
          className="flex items-center justify-center gap-2 rounded-xl bg-emerald-600 p-4 font-semibold disabled:opacity-50"
        >
          <Save size={18} />
          {loading ? "Speichern..." : "Bewertung speichern"}
        </button>

        {message && (
          <p className="rounded-xl bg-zinc-950 p-4 text-sm text-zinc-300">
            {message}
          </p>
        )}
      </div>
    </form>
  );
}

function Slider({
  label,
  value,
  onChange,
}: {
  label: string;
  value: number;
  onChange: (value: number) => void;
}) {
  return (
    <div>
      <div className="flex justify-between">
        <label className="text-sm text-zinc-400">{label}</label>
        <span className="font-bold text-emerald-400">{value}/10</span>
      </div>
      <input
        type="range"
        min="1"
        max="10"
        step="1"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="mt-3 w-full accent-emerald-500"
      />
    </div>
  );
}