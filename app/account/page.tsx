import Link from "next/link";
import { redirect } from "next/navigation";
import { Star, Sprout, User, MessageCircle, PenLine } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { getSessionUserId } from "@/lib/auth";
import BottomNav from "@/components/BottomNav";
import LogoutButton from "@/components/LogoutButton";
import AccountProfileForm from "@/components/AccountProfileForm";
import Logo from "@/components/Logo";

export default async function AccountPage() {
  const userId = await getSessionUserId();

  if (!userId) redirect("/login");

  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: { reviews: true },
  });

  if (!user) redirect("/login");

  return (
    <main className="min-h-screen bg-night px-5 py-8 pb-28 text-ivory">
      <div className="mx-auto max-w-6xl">
        <Logo />

        <section className="mt-5 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-[2rem] border border-leaf/30 bg-gradient-to-br from-forest-deep/70 to-panel p-8">
            <div className="flex items-center gap-5">
              <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-forest">
                <User size={38} />
              </div>

              <div>
                <h1 className="text-4xl font-bold">
                  {user.displayName || user.username || "Mein Account"}
                </h1>
                <p className="mt-1 text-sm text-haze">{user.email}</p>
                {user.location && (
                  <p className="mt-2 text-sm text-leaf">{user.location}</p>
                )}
              </div>
            </div>

            {user.bio && (
              <p className="mt-6 max-w-2xl rounded-2xl bg-black/30 p-4 text-sm text-haze">
                {user.bio}
              </p>
            )}

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/review"
                className="rounded-xl bg-forest px-5 py-3 font-semibold"
              >
                Bewertung starten
              </Link>

              <Link
                href="/strains"
                className="rounded-xl border border-cream/20 px-5 py-3 font-semibold"
              >
                Sorten ansehen
              </Link>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
            <StatCard icon={<Star size={24} />} value={user.reviews.length} label="Bewertungen" />
            <StatCard icon={<Sprout size={24} />} value={0} label="Favoriten" />
            <StatCard icon={<MessageCircle size={24} />} value={0} label="Beiträge" />
          </div>
        </section>

        <section className="mt-6 grid gap-6 lg:grid-cols-3">
          <Link
            href="/review"
            className="rounded-[2rem] border border-leaf/40 bg-forest/25 p-6 lg:col-span-2"
          >
            <h2 className="text-3xl font-bold">Sorte bewerten</h2>
            <p className="mt-3 max-w-xl text-haze">
              Teile deine Erfahrung zu Wirkung, Geschmack und Verträglichkeit.
            </p>
            <div className="mt-6 inline-flex rounded-xl bg-forest px-5 py-3 font-semibold">
              Neue Bewertung
            </div>
          </Link>

          <div className="rounded-[2rem] border border-cream/10 bg-panel p-6">
            <h2 className="text-2xl font-bold">Nächste Features</h2>
            <p className="mt-3 text-sm text-moss">
              Bald: eigene Bewertungen, Favoriten, Sorten-Tracker und Community-Beiträge.
            </p>
          </div>
        </section>

        <details className="mt-6 rounded-[2rem] border border-cream/10 bg-panel p-5">
          <summary className="flex cursor-pointer items-center gap-3 text-xl font-bold">
            <PenLine className="text-gold" size={22} />
            Profil bearbeiten
          </summary>

          <div className="mt-5">
            <AccountProfileForm
              email={user.email}
              username={user.username}
              displayName={user.displayName}
              bio={user.bio}
              location={user.location}
            />
          </div>
        </details>

        <div className="max-w-md">
          <LogoutButton />
        </div>
      </div>

      <BottomNav />
    </main>
  );
}

function StatCard({
  icon,
  value,
  label,
}: {
  icon: React.ReactNode;
  value: number;
  label: string;
}) {
  return (
    <div className="rounded-[2rem] border border-cream/10 bg-panel p-6">
      <div className="text-gold">{icon}</div>
      <p className="mt-4 text-4xl font-bold">{value}</p>
      <p className="mt-1 text-sm text-moss">{label}</p>
    </div>
  );
}