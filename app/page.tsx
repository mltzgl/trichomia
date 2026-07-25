import Image from "next/image";
import Link from "next/link";
import { Star, Sprout, MessageCircle, BookOpen } from "lucide-react";
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

const pillars = [
  {
    icon: Star,
    title: "Sorten bewerten",
    text: "Wirkung, Terpenprofil, Verträglichkeit: strukturierte Bewertungen von echten Nutzerinnen und Nutzern statt Marketing-Texten.",
  },
  {
    icon: Sprout,
    title: "Strains zum Growen",
    text: "Genetik, Blütezeit und Eigenschaften im Überblick – plus Erfahrungen aus der Community zum legalen Eigenanbau.",
  },
  {
    icon: MessageCircle,
    title: "Austausch",
    text: "Stell Fragen, teile Erfahrungen und lerne von Menschen, die denselben Weg gehen – respektvoll und moderiert.",
  },
  {
    icon: BookOpen,
    title: "Wissen",
    text: "Verständlich aufbereitetes Cannabiswissen: von Cannabinoiden und Terpenen bis zu Rechtlichem in Deutschland.",
  },
];

const steps = [
  {
    num: "1",
    title: "Profil anlegen",
    text: "Kostenlos registrieren und angeben, was dich interessiert – medizinische Anwendung, Growing oder beides.",
    href: "/register",
  },
  {
    num: "2",
    title: "Sorten entdecken",
    text: "Durchsuche die Datenbank nach Wirkung, Terpenen oder Genetik und vergleiche Sorten direkt.",
    href: "/strains",
  },
  {
    num: "3",
    title: "Mitmachen",
    text: "Bewerte Sorten, dokumentiere deine Erfahrungen und tausch dich mit der Community aus.",
    href: "/review",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-night text-ivory pb-24">
      {/* Hero */}
      <section className="px-5 pt-8 pb-10">
        <div className="mx-auto max-w-[1600px]">
          <Logo />

          <div className="mt-10 grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-cream/10 bg-panel px-4 py-2 text-sm font-medium">
                <span className="h-2 w-2 rounded-full bg-gold shadow-[0_0_0_4px_rgba(223,161,60,0.22)]" />
                Jetzt live · kostenlos & werbefrei
              </span>

              <h1 className="mt-6 text-5xl md:text-6xl font-bold tracking-tight">
                Sorten verstehen.
                <br />
                <span className="text-gold-hot">Besser entscheiden.</span>
              </h1>

              <p className="mt-6 max-w-xl text-lg text-moss">
                Trichomia ist die Plattform für medizinisches Cannabis in
                Deutschland: ehrliche Sortenbewertungen, Grow-Wissen und eine
                Community, die ihr Wissen teilt.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  href="/strains"
                  className="rounded-full bg-gold px-7 py-3.5 font-semibold text-forest-deep shadow-[0_6px_22px_rgba(223,161,60,0.3)] transition hover:bg-gold-hot"
                >
                  Sorten entdecken
                </Link>
                <Link
                  href="/register"
                  className="rounded-full border border-cream/30 px-7 py-3.5 font-semibold text-ivory transition hover:border-gold hover:text-gold-hot"
                >
                  Kostenlos registrieren
                </Link>
              </div>

              <p className="mt-5 text-sm text-moss">
                Kostenlos · Community-basiert · ab 18 Jahren
              </p>
            </div>

            <div className="relative min-h-[320px] overflow-hidden rounded-[2rem] border border-cream/10 shadow-[0_18px_50px_rgba(0,0,0,0.45)] lg:min-h-[420px]">
              <Image
                src="/hero-1.jpg"
                alt="Cannabis-Blüte in Nahaufnahme"
                fill
                priority
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-night/70 via-transparent to-transparent" />
            </div>
          </div>

          <div className="mt-8 rounded-2xl border border-gold/30 bg-gold/10 p-4">
            <p className="text-sm text-haze">
              Keine medizinische Beratung. Keine Heilversprechen. Alle Inhalte
              basieren auf persönlichen Erfahrungsberichten.
            </p>
          </div>
        </div>
      </section>

      {/* Vier Säulen */}
      <section className="px-5 py-6">
        <div className="mx-auto max-w-[1600px] rounded-[28px] border border-cream/10 bg-panel p-8 md:p-12 shadow-[0_20px_60px_rgba(0,0,0,0.35)]">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-bold uppercase tracking-[0.22em] text-gold">
              Was Trichomia kann
            </p>
            <h2 className="mt-3 text-4xl font-bold">
              Vier Säulen, eine Plattform
            </h2>
            <p className="mt-3 text-moss">
              Alles, was du rund um medizinische Cannabissorten brauchst – an
              einem Ort.
            </p>
          </div>

          <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {pillars.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <div key={pillar.title}>
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-leaf-soft">
                    <Icon size={26} className="text-forest" />
                  </div>
                  <h3 className="mt-4 text-lg font-bold">{pillar.title}</h3>
                  <p className="mt-2 text-sm text-moss">{pillar.text}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Foto-Karten */}
      <section className="px-5 py-6">
        <div className="mx-auto grid max-w-[1600px] gap-5">
          {sections.map((item) => (
            <Link
              key={item.title}
              href={item.href}
              className="group relative min-h-[430px] overflow-hidden rounded-[2rem] border border-cream/10 bg-panel"
            >
              <Image
                src={item.image}
                alt={item.label}
                fill
                className="object-cover opacity-65 transition duration-700 group-hover:scale-105"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-night via-night/45 to-transparent" />

              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                <p className="text-sm font-bold uppercase tracking-[0.18em] text-gold">
                  {item.label}
                </p>

                <h2 className="mt-2 max-w-2xl text-4xl font-bold leading-tight md:text-5xl">
                  {item.title}
                </h2>

                <p className="mt-4 max-w-xl text-haze">{item.text}</p>

                <div className="mt-6 inline-flex rounded-full bg-gold px-6 py-3 font-semibold text-forest-deep transition group-hover:bg-gold-hot">
                  {item.button}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Wissen */}
      <section className="px-5 py-6">
        <div className="mx-auto max-w-[1600px]">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-bold uppercase tracking-[0.22em] text-gold">
              Wissen
            </p>
            <h2 className="mt-3 text-4xl font-bold">Verstehen, was du nutzt</h2>
            <p className="mt-3 text-moss">
              Kurze, fundierte Grundlagen ohne Mythen und Marketing – hier ein
              Einstieg.
            </p>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {[
              {
                tag: "Grundlagen",
                title: "Cannabinoide: THC, CBD & Co.",
                text: "Was die Wirkstoffe unterscheidet und warum der THC-Wert allein wenig aussagt.",
                href: "/wissen#cannabinoide",
              },
              {
                tag: "Grundlagen",
                title: "Terpene: Warum Sorten so unterschiedlich wirken",
                text: "Myrcen, Limonen, Caryophyllen – was hinter den Aromen steckt.",
                href: "/wissen#terpene",
              },
              {
                tag: "Recht",
                title: "Cannabis in Deutschland: Die aktuelle Rechtslage",
                text: "Besitz, Eigenanbau, Anbauvereinigungen und Straßenverkehr – verständlich zusammengefasst.",
                href: "/wissen#rechtslage",
              },
            ].map((card) => (
              <Link
                key={card.title}
                href={card.href}
                className="group flex flex-col rounded-[2rem] bg-cream p-6 shadow-[0_16px_44px_rgba(0,0,0,0.4)] transition hover:-translate-y-1"
              >
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-gold">
                  {card.tag}
                </p>
                <h3 className="mt-2 text-xl font-bold text-forest-deep">
                  {card.title}
                </h3>
                <p className="mt-2 flex-1 text-sm text-[#5c6b5e]">{card.text}</p>
                <p className="mt-4 text-sm font-semibold text-forest group-hover:underline">
                  Weiterlesen →
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Drei Schritte */}
      <section className="px-5 py-6">
        <div className="mx-auto max-w-[1600px] rounded-[28px] bg-gradient-to-br from-gold-hot via-gold to-[#d08f2c] p-8 md:p-12 shadow-[0_24px_70px_rgba(223,161,60,0.22)]">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-bold uppercase tracking-[0.22em] text-forest-deep/80">
              So funktioniert&rsquo;s
            </p>
            <h2 className="mt-3 text-4xl font-bold text-[#241a08]">
              In drei Schritten loslegen
            </h2>
          </div>

          <div className="mt-10 grid gap-8 md:grid-cols-3">
            {steps.map((step) => (
              <Link key={step.num} href={step.href} className="group">
                <p className="font-serif text-5xl font-bold text-forest-deep">
                  {step.num}
                </p>
                <h3 className="mt-3 text-xl font-bold text-[#241a08] group-hover:underline">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm text-[#5d4715]">{step.text}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Vertrauen */}
      <section className="px-5 py-6">
        <div className="mx-auto max-w-[1600px] rounded-[2rem] border border-cream/10 bg-panel p-6 md:p-8">
          <h2 className="text-3xl font-bold">
            Seriös. Community-basiert. Rechtlich bewusst.
          </h2>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl border border-cream/10 bg-night p-5">
              <h3 className="text-base font-bold">Echte Erfahrungen</h3>
              <p className="mt-2 text-sm text-moss">
                Bewertungen von Nutzern statt Werbeversprechen.
              </p>
            </div>

            <div className="rounded-2xl border border-cream/10 bg-night p-5">
              <h3 className="text-base font-bold">Neutrale Sprache</h3>
              <p className="mt-2 text-sm text-moss">
                Keine Heilversprechen oder medizinischen Empfehlungen.
              </p>
            </div>

            <div className="rounded-2xl border border-cream/10 bg-night p-5">
              <h3 className="text-base font-bold">Sicherer Austausch</h3>
              <p className="mt-2 text-sm text-moss">
                Community-Regeln, Moderation und 18+ Ausrichtung.
              </p>
            </div>
          </div>

          <p className="mt-6 border-t border-cream/10 pt-5 text-xs leading-relaxed text-moss">
            Trichomia richtet sich ausschließlich an volljährige Nutzerinnen und
            Nutzer. Alle Inhalte dienen dem Erfahrungsaustausch im legalen
            Rahmen und ersetzen keine ärztliche oder pharmazeutische Beratung.
          </p>
        </div>
      </section>

      <BottomNav />
    </main>
  );
}
