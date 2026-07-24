"use client";

import { useState } from "react";
import { Save } from "lucide-react";

type Props = {
  email: string;
  username: string | null;
  displayName: string | null;
  bio: string | null;
  location: string | null;
};

export default function AccountProfileForm(props: Props) {
  const [username, setUsername] = useState(props.username ?? "");
  const [displayName, setDisplayName] = useState(props.displayName ?? "");
  const [bio, setBio] = useState(props.bio ?? "");
  const [location, setLocation] = useState(props.location ?? "");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function save() {
    setLoading(true);
    setMessage("");

    const res = await fetch("/api/user/profile", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, displayName, bio, location }),
    });

    const data = await res.json();

    if (!res.ok) {
      setMessage(data.error || "Speichern fehlgeschlagen.");
    } else {
      setMessage("Profil gespeichert.");
    }

    setLoading(false);
  }

  return (
    <section className="rounded-[2rem] border border-cream/10 bg-panel p-5">
      <h2 className="text-2xl font-bold">Profil bearbeiten</h2>

      <div className="mt-5 grid gap-4">
        <input
          disabled
          value={props.email}
          className="rounded-xl border border-cream/10 bg-night p-4 text-moss/70"
        />

        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Benutzername"
          className="rounded-xl border border-cream/10 bg-night p-4"
        />

        <input
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
          placeholder="Anzeigename"
          className="rounded-xl border border-cream/10 bg-night p-4"
        />

        <input
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Region / Stadt"
          className="rounded-xl border border-cream/10 bg-night p-4"
        />

        <textarea
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          placeholder="Kurzer Profiltext..."
          className="min-h-28 rounded-xl border border-cream/10 bg-night p-4"
        />

        <button
          onClick={save}
          disabled={loading}
          className="flex items-center justify-center gap-2 rounded-xl bg-forest p-4 font-semibold disabled:opacity-50"
        >
          <Save size={18} />
          {loading ? "Speichern..." : "Profil speichern"}
        </button>

        {message && (
          <p className="rounded-xl border border-cream/10 bg-night p-4 text-sm text-haze">
            {message}
          </p>
        )}
      </div>
    </section>
  );
}