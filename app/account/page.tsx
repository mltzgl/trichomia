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
      <div className="mx-auto max-w-[1600px]">
        <Logo />

        <section className="mt-5 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-[2rem] border border-leaf/30 bg-gradient-to-br from-forest-deep/70 to-panel p-5 md:p-8">
            <div className="flex items-center gap-4 md:gap-5">
              <div className="flex h-14 w-14 flex-none items-center justify-center rounded-2xl bg-forest md:h-20 md:w-20 md:rounded-3xl">
                <User className="h-6 w-6 md:h-9 md:w-9" />
              </div>

              <div className="min-w-0">
                <h1 className="break-words text-2xl font-bold md:text-4xl">
                  {user.displayName || user.username || "Mein Account"}
                </h1>
                <p className="mt-1 break-all text-sm text-haze">{user.email}</p>
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

            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap md:mt-8">
              <Link
                href="/review"
                className="rounded-full bg-gold px-5 py-3 text-center font-semibold text-forest-deep transition hover:bg-gold-hot"
              >
                Bewertung starten
              </Link>

              <Link
                href="/strains"
                className="rounded-full border border-cream/30 px-5 py-3 text-center font-semibold"
              >
                Sorten ansehen
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3 lg:grid-cols-1 lg:gap-4">
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
            <h2 className="text-2xl font-bold md:text-3xl">Sorte bewerten</h2>
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
    <div className="rounded-2xl border border-cream/10 bg-panel p-4 md:rounded-[2rem] md:p-6">
      <div className="text-gold">{icon}</div>
      <p className="mt-2 text-2xl font-bold md:mt-4 md:text-4xl">{value}</p>
      <p className="mt-1 text-xs text-moss md:text-sm">{label}</p>
    </div>
  );
}