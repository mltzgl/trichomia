import type { Metadata } from "next";
import { Lora, Poppins } from "next/font/google";
import AgeGate from "@/components/AgeGate";
import "./globals.css";

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Trichomia – Cannabis-Erfahrungen & Sorten-Community",
  description:
    "Trichomia ist die Community-Plattform für medizinisches Cannabis: Sortenbewertungen, Erfahrungsberichte und sicherer Austausch.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="de"
      className={`${lora.variable} ${poppins.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <AgeGate />
        {children}
      </body>
    </html>
  );
}
