<p align="center">
  <img src="public/trichomia-logo-dark.svg" alt="Trichomia" width="360" />
</p>

# Trichomia

Die Community-Plattform für medizinisches Cannabis: Sortenbewertungen, Erfahrungsberichte und sicherer Austausch – neutral und ohne Heilversprechen.

## Features

- **Sorten-Datenbank** – THC/CBD-Werte, Verträglichkeit und Community-Erfahrungen
- **Etikett-Scan** – QR-Code- und OCR-Analyse von Produktetiketten
- **Erfahrungsberichte** – Bewertungen zu Wirkung, Geschmack und Verträglichkeit
- **Forum** – Austausch zu medizinischen Erfahrungen, Apotheken und legalem Homegrow
- **Accounts** – Profile, eigene Bewertungen und Favoriten

## Tech-Stack

- [Next.js](https://nextjs.org) (App Router) + React + TypeScript
- Tailwind CSS
- Prisma (PostgreSQL / Supabase)
- Tesseract.js (OCR) & jsQR (QR-Codes)

## Entwicklung

```bash
npm install
npm run dev
```

Danach [http://localhost:3000](http://localhost:3000) im Browser öffnen.

Benötigte Umgebungsvariablen (siehe `.env`): Datenbank-URL (Prisma), Supabase-Keys und OpenAI-API-Key.

## Produktion

```bash
npm run build
npm start
```
