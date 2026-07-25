"use client";

import { useState } from "react";
import {
  Camera,
  Loader2,
  CheckCircle,
  QrCode,
  FileText,
  Database,
  Crop,
  RotateCcw,
  Sparkles,
} from "lucide-react";
import StrainForm from "@/components/StrainForm";

const steps = [
  "Bild geladen",
  "QR geprüft",
  "Text erkannt",
  "Daten extrahiert",
  "Bereit zum Speichern",
];

type Box = {
  x: number;
  y: number;
  w: number;
  h: number;
};

export default function ScanPage() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);
  const [suggestion, setSuggestion] = useState<any>(null);
  const [chosen, setChosen] = useState<any>(null);
  const [activeStep, setActiveStep] = useState(0);

  const [dragStart, setDragStart] = useState<{ x: number; y: number } | null>(
    null
  );
  const [selectedBox, setSelectedBox] = useState<Box | null>(null);

  function selectFile(e: React.ChangeEvent<HTMLInputElement>) {
    const selected = e.target.files?.[0];
    if (!selected) return;

    setFile(selected);
    setPreview(URL.createObjectURL(selected));
    setSuggestion(null);
    setSelectedBox(null);
    setActiveStep(1);
  }

  function getMousePosition(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();

    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  }

  function startCrop(e: React.MouseEvent<HTMLDivElement>) {
    if (!preview || loading) return;
    const pos = getMousePosition(e);
    setDragStart(pos);
    setSelectedBox({ x: pos.x, y: pos.y, w: 0, h: 0 });
  }

  function moveCrop(e: React.MouseEvent<HTMLDivElement>) {
    if (!dragStart || loading) return;

    const pos = getMousePosition(e);

    setSelectedBox({
      x: Math.min(dragStart.x, pos.x),
      y: Math.min(dragStart.y, pos.y),
      w: Math.abs(pos.x - dragStart.x),
      h: Math.abs(pos.y - dragStart.y),
    });
  }

  function endCrop() {
    setDragStart(null);
  }

  function clearCrop() {
    setSelectedBox(null);
  }

  async function analyze() {
    if (!file) return;

    setLoading(true);
    setSuggestion(null);
    setChosen(null);
    setActiveStep(2);

    const formData = new FormData();
    formData.append("file", file);

    if (selectedBox && selectedBox.w > 20 && selectedBox.h > 20) {
  const img = document.getElementById("scan-preview-image") as HTMLImageElement;

  formData.append(
    "box",
    JSON.stringify({
      ...selectedBox,
      displayWidth: img.clientWidth,
      displayHeight: img.clientHeight,
      naturalWidth: img.naturalWidth,
      naturalHeight: img.naturalHeight,
    })
  );
}

    try {
      setActiveStep(3);

      const res = await fetch("/api/scan/free", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        setSuggestion(data);
        return;
      }

      setSuggestion(data);
      setActiveStep(5);
    } catch {
      setSuggestion({ error: "Analyse fehlgeschlagen." });
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-night px-5 py-8 pb-28 text-ivory">
      <div className="mx-auto max-w-[1600px]">
        <p className="font-semibold text-gold">Trichomia Scan</p>
        <h1 className="mt-4 text-5xl font-bold">Etikett analysieren</h1>

        <p className="mt-4 max-w-2xl text-moss">
          Lade ein Etikett hoch. Du kannst optional den wichtigen Textbereich
          mit der Maus markieren, damit OCR schneller und genauer arbeitet.
        </p>

        <section className="mt-8 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-[2rem] border border-cream/10 bg-panel p-6">
            <label className="flex cursor-pointer flex-col items-center justify-center rounded-2xl border border-dashed border-cream/20 bg-night p-8 text-center">
              <Camera className="text-gold" size={38} />
              <span className="mt-4 text-lg font-bold">Foto auswählen</span>
              <span className="mt-2 text-sm text-moss">
                Etikett scharf, hell und möglichst gerade fotografieren.
              </span>

              <input
                type="file"
                accept="image/*"
                onChange={selectFile}
                className="hidden"
              />
            </label>

            {preview && (
              <div className="mt-5">
                <div className="mb-3 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2 text-sm text-moss">
                    <Crop size={16} />
                    Optional: Bereich markieren
                  </div>

                  {selectedBox && (
                    <button
                      onClick={clearCrop}
                      className="flex items-center gap-2 rounded-xl border border-cream/20 px-3 py-2 text-sm text-haze"
                      type="button"
                    >
                      <RotateCcw size={15} />
                      Auswahl löschen
                    </button>
                  )}
                </div>

                <div
                  className="relative select-none overflow-hidden rounded-2xl border border-cream/10 bg-night"
                  onMouseDown={startCrop}
                  onMouseMove={moveCrop}
                  onMouseUp={endCrop}
                  onMouseLeave={endCrop}
                >
                  <img
                  id="scan-preview-image"
                  src={preview}
                  alt="Etikett Vorschau"
                  className="max-h-[520px] w-full object-contain"
                  draggable={false}
                />

                  {selectedBox && (
                    <div
                      className="pointer-events-none absolute border-2 border-gold bg-gold/20"
                      style={{
                        left: selectedBox.x,
                        top: selectedBox.y,
                        width: selectedBox.w,
                        height: selectedBox.h,
                      }}
                    />
                  )}
                </div>

                {selectedBox && selectedBox.w > 20 && selectedBox.h > 20 && (
                  <p className="mt-3 rounded-xl bg-forest/20 p-3 text-sm text-leaf-soft">
                    Bereich ausgewählt. Es wird nur dieser Ausschnitt analysiert.
                  </p>
                )}
              </div>
            )}

            <button
              onClick={analyze}
              disabled={!file || loading}
              className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-forest p-4 font-semibold disabled:opacity-50"
            >
              {loading ? (
                <Loader2 className="animate-spin" size={18} />
              ) : (
                <FileText size={18} />
              )}
              {loading
                ? "Analyse läuft..."
                : selectedBox
                ? "Markierten Bereich analysieren"
                : "Etikett analysieren"}
            </button>
          </div>

          <div className="rounded-[2rem] border border-cream/10 bg-panel p-6">
            <h2 className="text-2xl font-bold">Analyse-Schritte</h2>

            <div className="mt-5 grid gap-3">
              {steps.map((step, index) => {
                const done = activeStep > index;

                return (
                  <div
                    key={step}
                    className={`flex items-center gap-3 rounded-xl border p-4 ${
                      done
                        ? "border-leaf/40 bg-forest/20"
                        : "border-cream/10 bg-night"
                    }`}
                  >
                    <CheckCircle
                      size={20}
                      className={done ? "text-gold" : "text-moss/50"}
                    />
                    <span className={done ? "text-ivory" : "text-moss"}>
                      {step}
                    </span>
                  </div>
                );
              })}
            </div>

            {suggestion?.error && (
              <p className="mt-5 rounded-xl bg-red-950/40 p-4 text-red-200">
                {suggestion.error}
              </p>
            )}

            {suggestion && !suggestion.error && (
              <section className="mt-6">
                {suggestion.qrUrl && (
                  <div className="mb-5 rounded-xl border border-leaf/40 bg-forest/20 p-4 text-sm">
                    <div className="flex items-center gap-2 font-bold text-leaf">
                      <QrCode size={18} />
                      QR-Code erkannt
                    </div>
                    <p className="mt-2 break-all text-haze">
                      {suggestion.qrUrl}
                    </p>
                  </div>
                )}

                <div className="mb-5 rounded-xl border border-cream/10 bg-night p-4 text-sm text-moss">
                  Modus: {suggestion.mode || "kostenfreies OCR"} · Dauer:{" "}
                  {suggestion.durationMs
                    ? `${Math.round(suggestion.durationMs / 1000)}s`
                    : "k. A."}
                </div>

                {suggestion.matchedStrainId && (
                  <div className="mb-5 rounded-xl border border-leaf/40 bg-forest/20 p-4 text-sm">
                    <p className="font-bold text-leaf">
                      Diese Sorte gibt es schon bei Trichomia
                    </p>
                    <p className="mt-1 text-haze">
                      „{suggestion.bestMatch?.name}“ wurde in der Datenbank
                      gefunden – du kannst sie direkt bewerten statt sie neu
                      anzulegen.
                    </p>
                    <a
                      href={`/strains/${suggestion.matchedStrainId}`}
                      className="mt-3 inline-flex rounded-full bg-forest px-4 py-2 text-sm font-semibold text-ivory"
                    >
                      Zur Sorte
                    </a>
                  </div>
                )}

                {Array.isArray(suggestion.suggestions) &&
                  suggestion.suggestions.length > 0 && (
                    <div className="mb-5 rounded-xl border border-gold/30 bg-night p-4">
                      <div className="flex items-center gap-2 font-bold text-gold">
                        <Sparkles size={18} />
                        Ähnliche Sorten aus dem Katalog
                      </div>
                      <p className="mt-1 text-xs text-moss">
                        Antippen übernimmt Name, Hersteller und typische Werte
                        ins Formular – bitte vor dem Speichern mit dem Etikett
                        abgleichen.
                      </p>

                      <div className="mt-3 grid gap-2">
                        {suggestion.suggestions.map((item: any) => {
                          const active =
                            chosen &&
                            chosen.name === item.name &&
                            chosen.manufacturer === item.manufacturer;

                          return (
                            <button
                              key={`${item.name}|${item.manufacturer}`}
                              type="button"
                              onClick={() => setChosen(item)}
                              className={`flex flex-wrap items-center justify-between gap-2 rounded-xl border p-3 text-left text-sm transition ${
                                active
                                  ? "border-gold bg-gold/15"
                                  : "border-cream/10 bg-panel hover:border-gold/50"
                              }`}
                            >
                              <span>
                                <span className="font-semibold text-ivory">
                                  {item.name}
                                </span>
                                {item.manufacturer && (
                                  <span className="text-moss">
                                    {" "}
                                    · {item.manufacturer}
                                  </span>
                                )}
                              </span>
                              <span className="text-xs text-moss">
                                THC {item.thc} · CBD {item.cbd}
                                {item.genetics ? ` · ${item.genetics}` : ""}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}

                <div className="rounded-[2rem] border border-cream/10 bg-night p-5">
                  <div className="mb-4 flex items-center gap-2">
                    <Database className="text-gold" size={20} />
                    <h3 className="text-xl font-bold">Vorschlag prüfen</h3>
                  </div>

                  <StrainForm
                    key={
                      chosen
                        ? `${chosen.name}|${chosen.manufacturer}`
                        : "ocr-result"
                    }
                    initialData={chosen ? { ...suggestion, ...chosen } : suggestion}
                  />
                </div>

                <details className="mt-5 rounded-xl bg-night p-4 text-sm text-moss">
                  <summary className="cursor-pointer text-haze">
                    Erkannter Rohtext
                  </summary>
                  <pre className="mt-4 whitespace-pre-wrap">
                    {suggestion.extractedText || "Kein Text erkannt."}
                  </pre>
                </details>
              </section>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}