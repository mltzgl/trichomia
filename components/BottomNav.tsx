"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Sprout, Star, MessageCircle, User } from "lucide-react";

const navItems = [
  {
    href: "/",
    label: "Home",
    icon: Home,
  },
  {
    href: "/strains",
    label: "Sorten",
    icon: Sprout,
  },
  {
    href: "/review",
    label: "Bewerten",
    icon: Star,
  },
  {
    href: "/forum",
    label: "Forum",
    icon: MessageCircle,
  },
  {
    href: "/account",
    label: "Profil",
    icon: User,
  },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-cream/10 bg-night/90 px-3 py-2 backdrop-blur-xl">
      <div className="mx-auto flex max-w-md items-center justify-between rounded-2xl border border-cream/10 bg-panel/80 px-2 py-2 shadow-2xl">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active =
            item.href === "/"
              ? pathname === "/"
              : pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex min-w-0 flex-1 flex-col items-center justify-center gap-1 rounded-xl px-2 py-2 text-xs transition ${
                active
                  ? "bg-forest text-ivory"
                  : "text-moss hover:bg-forest-deep/60 hover:text-ivory"
              }`}
            >
              <Icon size={20} strokeWidth={2.2} />
              <span className="truncate">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}