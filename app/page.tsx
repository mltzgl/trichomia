import Image from "next/image";
import Link from "next/link";
import BottomNav from "@/components/BottomNav";
import Logo from "@/components/Logo";

const sections = [
  {
    label: "Sorten-Datenbank",
    title: "Finde Sorten, über die echte Nutzer berichten.",
    text: "THC/CBD-Werte, Verträglichkeit und Community-Erfahrungen – neutral und ohne Heilversprechen.",
    image: "/hero-1.jpg",
    href: "/strains",
    button: "Sorten entdecken",
  },
  {
    label: "Erfahrungen",
    title: "Teile deine Erfahrung und hilf der Community.",
    text: "Bewerte Wirkung, Geschmack und Verträglichkeit. Persönlich, transparent und verantwortungsvoll.",
    image: "/hero-2.jpg",
    href: "/review",
    button: "Erfahrung teilen",
  },
  {
    label: "Community",
    title: "Tausche dich sicher und respektvoll aus.",
    text: "Forum für medizinische Erfahrungen, Apotheken, Verfügbarkeit und legalen Homegrow.",
    image: "/hero-3.jpg",
    href: "/forum",
    button: "Forum öffnen",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-zinc-950 text-white pb-24">
      <section className="px-5 pt-8 pb-6">
        <Logo />

        <h1 className="text-5xl md:text-7xl font-black leading-none mt-4 tracking-tight">
          Cannabis-
          <span className="text-emerald-400">Erfahrungen</span>
          <br />
          neu gedacht.
        </h1>

        <p className="text-zinc-300 text-lg mt-6 max-w-xl">
          Die Community-Plattform für medizinisches Cannabis, Sortenbewertungen
          und sicheren Austausch.
        </p>

        <div className="mt-6 rounded-2xl border border-amber-500/30 bg-amber-500/10 p-4">
          <p className="text-sm text-amber-200">
            Keine medizinische Beratung. Keine Heilversprechen. Alle Inhalte
            basieren auf persönlichen Erfahrungsberichten.
          </p>
        </div>
      </section>

      <section className="grid gap-5 px-5">
        {sections.map((item) => (
          <Link
            key={item.title}
            href={item.href}
            className="group relative min-h-[430px] overflow-hidden rounded-[2rem] border border-white/10 bg-zinc-900"
          >
            <Image
              src={item.image}
              alt={item.label}
              fill
              priority
              className="object-cover transition duration-700 group-hover:scale-105 opacity-65"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/45 to-transparent" />

            <div className="absolute bottom-0 left-0 right-0 p-6">
              <p className="text-sm font-semibold text-emerald-400">
                {item.label}
              </p>

              <h2 className="text-4xl md:text-5xl font-black leading-tight mt-2">
                {item.title}
              </h2>

              <p className="text-zinc-300 mt-4 max-w-xl">
                {item.text}
              </p>

              <div className="mt-6 inline-flex rounded-xl bg-emerald-600 px-5 py-3 font-semibold">
                {item.button}
              </div>
            </div>
          </Link>
        ))}
      </section>

      <section className="px-5 py-10">
        <div className="rounded-[2rem] border border-zinc-800 bg-zinc-900 p-6">
          <h2 className="text-3xl font-black">
            Seriös. Community-basiert. Rechtlich bewusst.
          </h2>

          <div className="grid gap-4 mt-6 md:grid-cols-3">
            <div className="rounded-2xl bg-zinc-950 p-5 border border-zinc-800">
              <h3 className="font-bold">Echte Erfahrungen</h3>
              <p className="text-zinc-400 mt-2 text-sm">
                Bewertungen von Nutzern statt Werbeversprechen.
              </p>
            </div>

            <div className="rounded-2xl bg-zinc-950 p-5 border border-zinc-800">
              <h3 className="font-bold">Neutrale Sprache</h3>
              <p className="text-zinc-400 mt-2 text-sm">
                Keine Heilversprechen oder medizinischen Empfehlungen.
              </p>
            </div>

            <div className="rounded-2xl bg-zinc-950 p-5 border border-zinc-800">
              <h3 className="font-bold">Sicherer Austausch</h3>
              <p className="text-zinc-400 mt-2 text-sm">
                Community-Regeln, Moderation und 18+ Ausrichtung.
              </p>
            </div>
          </div>
        </div>
      </section>

      <BottomNav />
    </main>
  );
}