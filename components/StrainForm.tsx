"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Save } from "lucide-react";

const geneticsOptions = ["", "Indica", "Sativa", "Hybrid"];

const terpeneOptions = [
  "Myrcen",
  "Limonen",
  "Caryophyllen",
  "Pinen",
  "Linalool",
  "Humulen",
  "Terpinolen",
  "Ocimen",
  "Bisabolol",
  "Eucalyptol",
  "Geraniol",
  "Nerolidol",
  "Fenchol",
  "Camphen",
  "Borneol",
];

export default function StrainForm({ initialData = {} }: { initialData?: any }) {
  const router = useRouter();

  const [form, setForm] = useState({
    name: initialData.name || "",
    manufacturer: initialData.manufacturer || "",
    thc: parseFloat(String(initialData.thc || "0").replace("%", "")) || 0,
    cbd: parseFloat(String(initialData.cbd || "0").replace("%", "")) || 0,
    genetics: initialData.genetics || "",
    terpenes: initialData.terpenes
      ? String(initialData.terpenes).split(",").map((t) => t.trim())
      : ([] as string[]),
    description: initialData.description || "",
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  function setField(name: string, value: any) {
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function toggleTerpene(terpene: string) {
    setForm((prev) => {
      const exists = prev.terpenes.includes(terpene);
      return {
        ...prev,
        terpenes: exists
          ? prev.terpenes.filter((t) => t !== terpene)
          : [...prev.terpenes, terpene],
      };
    });
  }

  async function save(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const res = await fetch("/api/strains", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        thc: `${form.thc}%`,
        cbd: `${form.cbd}%`,
        terpenes: form.terpenes.join(", "),
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      setMessage(data.error || "Sorte konnte nicht gespeichert werden.");
      setLoading(false);
      return;
    }

    router.push(`/strains/${data.strain?.id || data.id}`);
    router.refresh();
  }

  return (
    <form onSubmit={save} className="rounded-[2rem] border border-zinc-800 bg-zinc-900 p-6">
      <div className="grid gap-5">
        <Input label="Sortenname" value={form.name} onChange={(v) => setField("name", v)} placeholder="z. B. HUALA 25/1 CA ALM" />
        <Input label="Hersteller / Anbieter" value={form.manufacturer} onChange={(v) => setField("manufacturer", v)} placeholder="z. B. HUALA, Sibanax, Demecan" />

        <Slider label="THC" value={form.thc} max={35} onChange={(v) => setField("thc", v)} />
        <Slider label="CBD" value={form.cbd} max={25} step={0.1} onChange={(v) => setField("cbd", v)} />

        <div>
          <label className="text-sm text-zinc-400">Genetik</label>
          <select
            value={form.genetics}
            onChange={(e) => setField("genetics", e.target.value)}
            className="mt-2 w-full rounded-xl border border-zinc-800 bg-zinc-950 p-4"
          >
            <option value="">Nicht angegeben</option>
            {geneticsOptions.filter(Boolean).map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-sm text-zinc-400">Terpene</label>
          <div className="mt-3 flex flex-wrap gap-2">
            {terpeneOptions.map((terpene) => {
              const active = form.terpenes.includes(terpene);
              return (
                <button
                  key={terpene}
                  type="button"
                  onClick={() => toggleTerpene(terpene)}
                  className={`rounded-full px-4 py-2 text-sm ${
                    active ? "bg-emerald-600 text-white" : "bg-zinc-950 text-zinc-400"
                  }`}
                >
                  {terpene}
                </button>
              );
            })}
          </div>
        </div>

        <div>
          <label className="text-sm text-zinc-400">Beschreibung / Merkmale</label>
          <textarea
            value={form.description}
            onChange={(e) => setField("description", e.target.value)}
            placeholder="Neutrale Beschreibung, keine medizinischen Versprechen..."
            className="mt-2 min-h-32 w-full rounded-xl border border-zinc-800 bg-zinc-950 p-4"
          />
        </div>

        <button disabled={loading} className="flex items-center justify-center gap-2 rounded-xl bg-emerald-600 p-4 font-semibold disabled:opacity-50">
          <Save size={18} />
          {loading ? "Speichern..." : "Sorte speichern"}
        </button>

        {message && <p className="rounded-xl bg-zinc-950 p-4 text-sm text-zinc-300">{message}</p>}
      </div>
    </form>
  );
}

function Input({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="text-sm text-zinc-400">{label}</label>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="mt-2 w-full rounded-xl border border-zinc-800 bg-zinc-950 p-4"
      />
    </div>
  );
}

function Slider({
  label,
  value,
  onChange,
  max,
  step = 0.1,
}: {
  label: string;
  value: number;
  onChange: (value: number) => void;
  max: number;
  step?: number;
}) {
  return (
    <div>
      <div className="flex justify-between">
        <label className="text-sm text-zinc-400">{label}</label>
        <span className="font-bold text-emerald-400">{value}%</span>
      </div>
      <input
        type="range"
        min="0"
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="mt-3 w-full accent-emerald-500"
      />
    </div>
  );
}