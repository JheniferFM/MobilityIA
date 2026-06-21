import { useEffect, useMemo, useState } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Pause, Play, Volume2, X } from "lucide-react";

interface LibrasAvatarProps {
  isOpen: boolean;
  onClose: () => void;
  text: string;
  onSpeak?: (text: string) => void;
}

export function LibrasAvatar({ isOpen, onClose, text, onSpeak }: LibrasAvatarProps) {
  const [displayText, setDisplayText] = useState(text);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    setDisplayText(text);
    setCurrentWordIndex(0);
    setIsPlaying(true);
  }, [text]);

  useEffect(() => {
    if (!isOpen) return;
    setCurrentWordIndex(0);
    setIsPlaying(true);
  }, [isOpen]);

  if (!isOpen) return null;

  // Libras translation mapping (simplified)
  const librasTranslations: Record<string, string> = {
    olá: "OLÁ",
    oi: "OI",
    tudo: "TUDO",
    bem: "BEM",
    obrigado: "OBRIGADO",
    por: "POR",
    favor: "FAVOR",
    sim: "SIM",
    não: "NÃO",
    entendi: "ENTENDI",
    pode: "PODE",
    me: "EU",
    ajudar: "AJUDAR",
    mobilidade: "MOBILIDADE",
    transporte: "TRANSPORTE",
    ônibus: "ÔNIBUS",
    rota: "ROTA",
  };

  const translateToLibras = (text: string) => {
    const words = text.toLowerCase().split(" ");
    return words
      .map((word) => {
        // Remove punctuation
        const cleanWord = word.replace(/[.,!?;:]/g, "");
        return librasTranslations[cleanWord] || cleanWord.toUpperCase();
      })
      .join(" ");
  };

  const librasText = translateToLibras(displayText);
  const translatedWords = useMemo(
    () => librasText.split(/\s+/).filter(Boolean),
    [librasText]
  );

  useEffect(() => {
    if (!isOpen || !isPlaying || translatedWords.length <= 1) return;

    const timer = window.setInterval(() => {
      setCurrentWordIndex((previousIndex) => {
        if (previousIndex >= translatedWords.length - 1) {
          return 0;
        }
        return previousIndex + 1;
      });
    }, 950);

    return () => window.clearInterval(timer);
  }, [isOpen, isPlaying, translatedWords.length]);

  const progressPercent =
    translatedWords.length > 0 ? ((currentWordIndex + 1) / translatedWords.length) * 100 : 0;

  const hasContent = displayText.trim().length > 0;

  return (
    <Card className="fixed bottom-20 left-4 z-50 w-[22rem] border-2 border-cyan-200 bg-gradient-to-br from-cyan-50 via-white to-emerald-50 shadow-2xl">
      <div className="p-4">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="font-bold text-cyan-900">Avatar de Libras</h3>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </div>

        <div className="mb-4 rounded-xl border border-cyan-100 bg-gradient-to-b from-cyan-100/60 to-white p-4">
          <div className="relative mx-auto flex h-44 w-full max-w-56 items-center justify-center overflow-hidden rounded-xl bg-cyan-950/95">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(34,211,238,0.24),_transparent_60%)]" />

            <div className="relative flex flex-col items-center justify-center">
              <div className="mb-2 h-12 w-12 rounded-full border-2 border-cyan-200 bg-cyan-100" />
              <div className="relative h-20 w-16 rounded-t-3xl border-2 border-cyan-200 bg-cyan-200/80">
                <div
                  className={`absolute -left-8 top-2 h-10 w-6 rounded-full border border-cyan-100 bg-cyan-300/95 ${
                    isPlaying ? "animate-pulse" : ""
                  }`}
                />
                <div
                  className={`absolute -right-8 top-2 h-10 w-6 rounded-full border border-cyan-100 bg-cyan-300/95 ${
                    isPlaying ? "animate-pulse" : ""
                  }`}
                />
              </div>
            </div>

            <div className="absolute bottom-3 left-3 right-3">
              <div className="mb-1 flex items-center justify-between text-[11px] font-semibold text-cyan-100">
                <span>{isPlaying ? "Sinalizando" : "Pausado"}</span>
                <span>
                  {translatedWords.length > 0 ? currentWordIndex + 1 : 0}/{translatedWords.length}
                </span>
              </div>
              <div className="h-1.5 overflow-hidden rounded-full bg-cyan-100/30">
                <div className="h-full rounded-full bg-emerald-300 transition-all duration-500" style={{ width: `${progressPercent}%` }} />
              </div>
            </div>
          </div>
        </div>

        <div className="mb-3 flex gap-2">
          <Button
            type="button"
            variant="outline"
            className="flex-1 border-cyan-300 text-cyan-900 hover:bg-cyan-100"
            onClick={() => setIsPlaying((previousState) => !previousState)}
            disabled={!hasContent || translatedWords.length <= 1}
          >
            {isPlaying ? <Pause className="mr-2 h-4 w-4" /> : <Play className="mr-2 h-4 w-4" />}
            {isPlaying ? "Pausar" : "Continuar"}
          </Button>

          {onSpeak && (
            <Button
              type="button"
              variant="default"
              className="flex-1 bg-cyan-700 hover:bg-cyan-800"
              onClick={() => onSpeak(displayText)}
              disabled={!hasContent}
            >
              <Volume2 className="mr-2 h-4 w-4" />
              Ouvir
            </Button>
          )}
        </div>

        <div className="mb-3 rounded-lg border border-cyan-200 bg-white p-3">
          <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-cyan-700">Tradução em sinais</p>
          {translatedWords.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {translatedWords.map((word, index) => {
                const isActive = index === currentWordIndex;
                return (
                  <span
                    key={`${word}-${index}`}
                    className={`rounded-md border px-2 py-1 text-sm font-semibold transition-colors ${
                      isActive
                        ? "border-emerald-400 bg-emerald-100 text-emerald-800"
                        : "border-cyan-200 bg-cyan-50 text-cyan-700"
                    }`}
                  >
                    {word}
                  </span>
                );
              })}
            </div>
          ) : (
            <p className="text-sm text-slate-600">Digite ou use voz para gerar a traducao em Libras.</p>
          )}
        </div>

        <div className="rounded-lg border border-slate-200 bg-white p-3">
          <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-slate-600">Texto original</p>
          <p className="text-sm text-slate-700">{hasContent ? displayText : "Nenhum texto recebido."}</p>
        </div>
      </div>
    </Card>
  );
}
