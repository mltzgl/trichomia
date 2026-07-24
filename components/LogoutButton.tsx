"use client";

import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();

  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/login");
    router.refresh();
  }

  return (
    <button
      onClick={logout}
      className="mt-6 w-full rounded-xl bg-red-600 p-4 font-semibold"
    >
      Ausloggen
    </button>
  );
}