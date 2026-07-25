import type { Metadata } from "next";
import Link from "next/link";
import {
  FlaskConical,
  Citrus,
  Microscope,
  Scale,
  ShieldAlert,
  ArrowRight,
} from "lucide-react";
import BottomNav from "@/components/BottomNav";
import Logo from "@/components/Logo";

export const metadata: Metadata = {
  title: "Wissen – Trichomia",
  description:
    "Cannabiswissen verständlich erklärt: Cannabinoide, Terpene, Trichome, Safer Use und die Rechtslage in Deutschland.",
};

const cannabinoids = [
  {
    name: "THC (Tetrahydrocannabinol)",
    text: "Das bekannteste Cannabinoid und hauptverantwortlich für die psychoaktive Wirkung. In der Medizin wird es u. a. bei chronischen Schmerzen, Spastik und Appetitlosigkeit eingesetzt. Wirkung und Verträglichkeit sind individuell sehr unterschiedlich.",
  },
  {
    name: "CBD (Cannabidiol)",
    text: "Nicht berauschend. CBD wird eine entspannende, angstlösende und entzündungshemmende Wirkung zugeschrieben und kann die THC-Wirkung abmildern. Die Forschung dazu läuft – viele Werbeversprechen sind wissenschaftlich nicht gedeckt.",
  },
  {
    name: "CBG, CBN & Co.",
    text: "Neben THC und CBD enthält die Pflanze über 100 weitere Cannabinoide in kleinen Mengen. CBG gilt als „Mutter-Cannabinoid“, CBN entsteht beim Abbau von THC. Ihre Wirkung ist bislang deutlich weniger erforscht.",
  },
  {
    name: "Das Endocannabinoid-System",
    text: "Cannabinoide wirken über körpereigene Rezeptoren (CB1 und CB2), die an Schmerzempfinden, Appetit, Schlaf und Stimmung beteiligt sind. Deshalb kann dieselbe Sorte bei verschiedenen Menschen unterschiedlich wirken.",
  },
];

const terpenes = [
  {
    name: "Myrcen",
    aroma: "erdig, moschusartig",
    text: "Häufigstes Terpen in Cannabis; wird mit entspannenden, „körperlichen“ Effekten in Verbindung gebracht.",
  },
  {
    name: "Limonen",
    aroma: "zitrisch, frisch",
    text: "Kommt auch in Zitrusschalen vor; wird eher mit stimmungsaufhellenden Eindrücken assoziiert.",
  },
  {
    name: "Caryophyllen",
    aroma: "pfeffrig, würzig",
    text: "Bindet als einziges bekanntes Terpen direkt an CB2-Rezeptoren; auch in schwarzem Pfeffer enthalten.",
  },
  {
    name: "Pinen",
    aroma: "harzig, nach Kiefer",
    text: "In Nadelhölzern und Kräutern verbreitet; wird mit Klarheit und Fokus in Verbindung gebracht.",
  },
  {
    name: "Linalool",
    aroma: "blumig, Lavendel",
    text: "Bekannt aus Lavendel; wird traditionell mit Beruhigung assoziiert.",
  },
  {
    name: "Terpinolen",
    aroma: "süßlich, kräuterig",
    text: "Seltener dominant; prägt komplexe, frische Aromaprofile vieler moderner Sorten.",
  },
];

const lawFacts = [
  {
    q: "Besitz und Konsum für Erwachsene",
    a: "Seit dem 1. April 2024 (Cannabisgesetz, CanG) dürfen Erwachsene ab 18 Jahren bis zu 25 g Cannabis in der Öffentlichkeit mit sich führen und bis zu 50 g zu Hause besitzen. Konsum ist u. a. in Sichtweite von Schulen, Kitas und Spielplätzen sowie tagsüber in Fußgängerzonen verboten.",
  },
  {
    q: "Eigenanbau",
    a: "Erlaubt sind bis zu drei weibliche blühende Pflanzen pro erwachsener Person am eigenen Wohnsitz. Der Anbau muss vor Kindern, Jugendlichen und Dritten geschützt erfolgen (z. B. abschließbarer Bereich). Die Weitergabe des Ertrags ist verboten.",
  },
  {
    q: "Anbauvereinigungen (Cannabis Social Clubs)",
    a: "Seit dem 1. Juli 2024 können nicht-gewinnorientierte Anbauvereinigungen mit bis zu 500 Mitgliedern gemeinschaftlich anbauen und an Mitglieder abgeben – bis zu 25 g pro Tag und 50 g pro Monat. Für 18- bis 21-Jährige gelten strengere Grenzen (max. 30 g pro Monat, THC-Obergrenze).",
  },
  {
    q: "Medizinisches Cannabis",
    a: "Cannabis ist seit 2017 verschreibungsfähig und seit dem CanG kein Betäubungsmittel mehr (Medizinal-Cannabisgesetz, MedCanG). Es wird per Rezept in der Apotheke abgegeben; die Kosten übernehmen Krankenkassen nur nach Genehmigung in bestimmten Fällen. Verschreibung und Bezug laufen ausschließlich über Ärztinnen, Ärzte und Apotheken.",
  },
  {
    q: "Cannabis im Straßenverkehr",
    a: "Seit August 2024 gilt ein THC-Grenzwert von 3,5 ng/ml Blutserum beim Führen von Kraftfahrzeugen. Für Fahranfänger in der Probezeit, unter 21-Jährige sowie bei Mischkonsum mit Alkohol gilt ein Cannabisverbot am Steuer. Wer medizinisches Cannabis ärztlich verordnet einnimmt, unterliegt Sonderregeln – fahrtüchtig muss man trotzdem sein.",
  },
  {
    q: "Jugendschutz",
    a: "Für Minderjährige bleiben Besitz, Erwerb und Konsum verboten. Weitergabe an Minderjährige ist strafbar. Cannabis kann die Entwicklung des Gehirns beeinträchtigen, das Risiko ist umso höher, je früher konsumiert wird.",
  },
];

const saferUse = [
  "Starte niedrig dosiert – besonders bei unbekannten Sorten oder Produkten mit hohem THC-Gehalt. Nachlegen geht immer, zurücknehmen nicht.",
  "Konsumiere nicht täglich und baue bewusst Pausen ein, um Toleranz- und Abhängigkeitsentwicklung vorzubeugen.",
  "Verzichte auf Mischkonsum mit Alkohol oder anderen Substanzen – Wechselwirkungen sind schwer kalkulierbar.",
  "Bei psychischen Vorerkrankungen (z. B. Psychose-Risiko), in Schwangerschaft und Stillzeit sowie unter 21 Jahren ist besondere Vorsicht geboten bzw. Verzicht die sicherste Wahl.",
  "Vaporisieren gilt als schonender für die Atemwege als Rauchen, insbesondere ohne Tabak.",
  "Sprich offen mit deiner Ärztin oder deinem Arzt über deinen Konsum – auch wegen möglicher Wechselwirkungen mit Medikamenten.",
];

export default function WissenPage() {
  return (
    <main className="min-h-screen bg-night px-5 py-8 pb-28 text-ivory">
      <div className="mx-auto max-w-7xl">
        <Logo />

        <div className="mt-8 max-w-3xl">
          <p className="text-sm font-bold uppercase tracking-[0.22em] text-gold">
            Wissen
          </p>
          <h1 className="mt-3 text-5xl font-bold">Verstehen, was du nutzt.</h1>
          <p className="mt-4 text-lg text-moss">
            Kurze, fundierte Grundlagen ohne Mythen und Marketing – von
            Cannabinoiden über Terpene bis zur aktuellen Rechtslage in
            Deutschland.
          </p>
        </div>

        {/* Cannabinoide */}
        <section id="cannabinoide" className="mt-12 scroll-mt-8">
          <div className="rounded-[28px] border border-cream/10 bg-panel p-6 md:p-10">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-leaf-soft">
                <FlaskConical size={26} className="text-forest" />
              </div>
              <h2 className="text-3xl font-bold">Cannabinoide</h2>
            </div>
            <p className="mt-4 max-w-3xl text-moss">
              Cannabinoide sind die Wirkstoffe der Cannabispflanze. Ihr
              Zusammenspiel – oft „Entourage-Effekt“ genannt – prägt den
              Charakter einer Sorte stärker als der THC-Wert allein.
            </p>
            <div className="mt-8 grid gap-5 md:grid-cols-2">
              {cannabinoids.map((item) => (
                <div
                  key={item.name}
                  className="rounded-2xl border border-cream/10 bg-night p-5"
                >
                  <h3 className="text-lg font-bold">{item.name}</h3>
                  <p className="mt-2 text-sm text-moss">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Terpene */}
        <section id="terpene" className="mt-8 scroll-mt-8">
          <div className="rounded-[28px] border border-cream/10 bg-panel p-6 md:p-10">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-leaf-soft">
                <Citrus size={26} className="text-forest" />
              </div>
              <h2 className="text-3xl font-bold">
                Terpene: Warum Sorten so unterschiedlich wirken
              </h2>
            </div>
            <p className="mt-4 max-w-3xl text-moss">
              Terpene sind Aromastoffe, die auch in vielen anderen Pflanzen
              vorkommen. Sie bestimmen Geruch und Geschmack einer Sorte – und
              beeinflussen nach aktuellem Forschungsstand vermutlich auch das
              Wirkprofil. Die hier genannten Zuordnungen beruhen überwiegend auf
              Erfahrungsberichten und ersten Studien.
            </p>
            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {terpenes.map((terpene) => (
                <div
                  key={terpene.name}
                  className="rounded-2xl border border-cream/10 bg-night p-5"
                >
                  <div className="flex items-baseline justify-between gap-3">
                    <h3 className="text-lg font-bold">{terpene.name}</h3>
                  </div>
                  <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-gold">
                    {terpene.aroma}
                  </p>
                  <p className="mt-2 text-sm text-moss">{terpene.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Trichome */}
        <section id="trichome" className="mt-8 scroll-mt-8">
          <div className="rounded-[28px] border border-cream/10 bg-panel p-6 md:p-10">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-leaf-soft">
                <Microscope size={26} className="text-forest" />
              </div>
              <h2 className="text-3xl font-bold">
                Trichome: Die Namensgeber von Trichomia
              </h2>
            </div>
            <p className="mt-4 max-w-3xl text-moss">
              Trichome sind die winzigen, harzigen Drüsenköpfe auf Blüten und
              Blättern – hier entstehen Cannabinoide und Terpene. Beim Growen
              verraten sie unter der Lupe den Reifegrad:
            </p>
            <div className="mt-8 grid gap-5 md:grid-cols-3">
              <div className="rounded-2xl border border-cream/10 bg-night p-5">
                <div className="h-4 w-4 rounded-full border border-cream/40 bg-transparent" />
                <h3 className="mt-3 text-lg font-bold">Klar</h3>
                <p className="mt-2 text-sm text-moss">
                  Noch unreif – Wirkstoffproduktion läuft, die Wirkung wäre
                  schwächer und eher unruhig.
                </p>
              </div>
              <div className="rounded-2xl border border-cream/10 bg-night p-5">
                <div className="h-4 w-4 rounded-full bg-cream" />
                <h3 className="mt-3 text-lg font-bold">Milchig</h3>
                <p className="mt-2 text-sm text-moss">
                  Höchster THC-Gehalt – für die meisten der ideale
                  Erntezeitpunkt.
                </p>
              </div>
              <div className="rounded-2xl border border-cream/10 bg-night p-5">
                <div className="h-4 w-4 rounded-full bg-gold" />
                <h3 className="mt-3 text-lg font-bold">Bernstein</h3>
                <p className="mt-2 text-sm text-moss">
                  THC baut sich zu CBN ab – die Wirkung wird tendenziell
                  körperlicher und sedierender.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Rechtslage */}
        <section id="rechtslage" className="mt-8 scroll-mt-8">
          <div className="rounded-[28px] border border-cream/10 bg-panel p-6 md:p-10">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-leaf-soft">
                <Scale size={26} className="text-forest" />
              </div>
              <h2 className="text-3xl font-bold">
                Rechtslage in Deutschland
              </h2>
            </div>
            <p className="mt-4 max-w-3xl text-moss">
              Mit dem Cannabisgesetz (CanG) hat sich 2024 vieles geändert. Die
              wichtigsten Regeln im Überblick:
            </p>

            <div className="mt-8 grid gap-4">
              {lawFacts.map((fact) => (
                <details
                  key={fact.q}
                  className="group rounded-2xl border border-cream/10 bg-night p-5"
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-ivory [&::-webkit-details-marker]:hidden">
                    {fact.q}
                    <span className="font-serif text-2xl text-gold transition group-open:rotate-45">
                      +
                    </span>
                  </summary>
                  <p className="mt-3 text-sm leading-relaxed text-moss">
                    {fact.a}
                  </p>
                </details>
              ))}
            </div>

            <p className="mt-6 rounded-2xl border border-gold/30 bg-gold/10 p-4 text-xs leading-relaxed text-haze">
              Wichtig: Diese Übersicht ist keine Rechtsberatung und kann
              veralten – Gesetze und Grenzwerte ändern sich. Verbindliche und
              aktuelle Informationen findest du beim Bundesministerium für
              Gesundheit sowie im Gesetzestext (CanG/MedCanG).
            </p>
          </div>
        </section>

        {/* Safer Use */}
        <section id="saferuse" className="mt-8 scroll-mt-8">
          <div className="rounded-[28px] border border-cream/10 bg-panel p-6 md:p-10">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-leaf-soft">
                <ShieldAlert size={26} className="text-forest" />
              </div>
              <h2 className="text-3xl font-bold">
                Safer Use: Verantwortungsvoller Umgang
              </h2>
            </div>
            <p className="mt-4 max-w-3xl text-moss">
              Legal heißt nicht risikofrei. Wer konsumiert, kann Risiken
              deutlich reduzieren:
            </p>
            <ul className="mt-8 grid gap-4 md:grid-cols-2">
              {saferUse.map((tip) => (
                <li
                  key={tip}
                  className="flex items-start gap-3 rounded-2xl border border-cream/10 bg-night p-5 text-sm text-haze"
                >
                  <span className="mt-1 flex h-5 w-5 flex-none items-center justify-center rounded-full bg-leaf-soft text-xs font-bold text-forest">
                    ✓
                  </span>
                  {tip}
                </li>
              ))}
            </ul>
            <p className="mt-6 text-xs text-moss">
              Bei problematischem Konsum helfen anonyme Beratungsangebote, z. B.
              die Sucht &amp; Drogen Hotline (01806 313031) oder lokale
              Suchtberatungsstellen.
            </p>
          </div>
        </section>

        {/* CTA */}
        <section className="mt-10">
          <div className="rounded-[28px] bg-gradient-to-br from-[#3e7449] via-forest to-forest-deep p-8 text-center md:p-12">
            <h2 className="text-3xl font-bold">
              Wissen in die Praxis umsetzen?
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-leaf-soft">
              Entdecke die Sorten-Datenbank und lies, was die Community zu
              Wirkung und Verträglichkeit berichtet.
            </p>
            <Link
              href="/strains"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-gold px-7 py-3.5 font-semibold text-forest-deep transition hover:bg-gold-hot"
            >
              Sorten entdecken
              <ArrowRight size={18} />
            </Link>
          </div>
        </section>
      </div>

      <BottomNav />
    </main>
  );
}
