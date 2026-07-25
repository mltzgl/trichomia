import Link from "next/link";
import {
  HeartPulse,
  Sprout,
  Building2,
  Scale,
  ShieldCheck,
  MessageCircle,
} from "lucide-react";
import BottomNav from "@/components/BottomNav";
import { ForumIllustration } from "@/components/Illustrations";

const topics = [
  {
    icon: HeartPulse,
    title: "Medizinische Erfahrungen",
    text: "Austausch über Verträglichkeit, Einnahmeformen, Dosierung und persönliche Erfahrungen mit verschiedenen Sorten.",
  },
  {
    icon: Sprout,
    title: "Homegrow legal",
    text: "Tipps zu legalem Eigenanbau (max. 3 Pflanzen): Setup, Pflege, Blüte, Trocknung und Curing.",
  },
  {
    icon: Building2,
    title: "Apotheken & Verfügbarkeit",
    text: "Welche Apotheke führt welche Sorte? Lieferzeiten, Preise und Erfahrungen mit Rezepten.",
  },
  {
    icon: Scale,
    title: "Recht & Alltag",
    text: "CanG in der Praxis: Besitzgrenzen, Straßenverkehr, Anbauvereinigungen und Fragen aus dem Alltag.",
  },
];

const rules = [
  "Respektvoller Umgang – keine Beleidigungen, keine Diskriminierung.",
  "Keine Heilversprechen und keine medizinischen Empfehlungen – nur persönliche Erfahrungen.",
  "Kein Handel, keine Bezugsquellen-Vermittlung außerhalb des legalen Rahmens.",
  "Ausschließlich für volljährige Nutzerinnen und Nutzer (18+).",
];

export default function ForumPage() {
  return (
    <main className="min-h-screen bg-night text-ivory px-5 py-6 pb-24">
      <div className="mx-auto max-w-[1600px]">
        <div className="grid items-center gap-8 lg:grid-cols-[1.4fr_0.6fr]">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.22em] text-gold">
              Community
            </p>
            <h1 className="mt-4 text-4xl font-bold md:text-5xl">Forum</h1>
            <p className="text-moss mt-4 max-w-2xl">
              Community-Austausch im legalen Rahmen: von medizinischen
              Erfahrungen über legalen Eigenanbau bis zu Apotheken und
              Rechtsfragen. Die Diskussionsfunktion befindet sich im Aufbau –
              die Themenbereiche stehen schon fest.
            </p>
          </div>

          <ForumIllustration className="hidden w-full max-w-sm justify-self-end lg:block" />
        </div>

        <section className="mt-8 grid gap-4 md:grid-cols-2">
          {topics.map((topic) => {
            const Icon = topic.icon;
            return (
              <article
                key={topic.title}
                className="rounded-2xl bg-panel p-6 border border-cream/10"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-leaf-soft">
                    <Icon size={22} className="text-forest" />
                  </div>
                  <span className="rounded-full border border-gold/40 bg-gold/10 px-3 py-1 text-xs font-semibold text-gold">
                    Bald verfügbar
                  </span>
                </div>
                <h2 className="mt-4 text-xl font-bold">{topic.title}</h2>
                <p className="text-moss mt-2 text-sm">{topic.text}</p>
              </article>
            );
          })}
        </section>

        <section className="mt-8 grid gap-4 lg:grid-cols-[1fr_1fr]">
          <div className="rounded-2xl border border-cream/10 bg-panel p-6">
            <div className="flex items-center gap-2">
              <ShieldCheck className="text-gold" size={20} />
              <h2 className="text-xl font-bold">Community-Regeln</h2>
            </div>
            <ul className="mt-4 grid gap-3">
              {rules.map((rule) => (
                <li key={rule} className="flex items-start gap-3 text-sm text-haze">
                  <span className="mt-0.5 flex h-5 w-5 flex-none items-center justify-center rounded-full bg-leaf-soft text-xs font-bold text-forest">
                    ✓
                  </span>
                  {rule}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col justify-center rounded-2xl border border-leaf/30 bg-gradient-to-br from-forest-deep/70 to-panel p-6">
            <div className="flex items-center gap-2">
              <MessageCircle className="text-gold" size={20} />
              <h2 className="text-xl font-bold">Sei von Anfang an dabei</h2>
            </div>
            <p className="mt-3 text-sm text-haze">
              Leg dir jetzt ein Profil an – sobald das Forum startet, kannst du
              direkt mitdiskutieren. Bis dahin: Teile deine Erfahrungen über
              die Sortenbewertungen.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link
                href="/register"
                className="rounded-full bg-gold px-6 py-3 font-semibold text-forest-deep transition hover:bg-gold-hot"
              >
                Kostenlos registrieren
              </Link>
              <Link
                href="/review"
                className="rounded-full border border-cream/30 px-6 py-3 font-semibold text-ivory transition hover:border-gold hover:text-gold-hot"
              >
                Sorte bewerten
              </Link>
            </div>
          </div>
        </section>
      </div>

      <BottomNav />
    </main>
  );
}
