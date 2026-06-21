import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { busLinesData } from "../../data/busLines";
import {
  AlertTriangle,
  Bus,
  Clock3,
  MapPinned,
  Route,
  ShieldCheck,
  Sparkles,
  Timer,
  TrafficCone,
} from "lucide-react";
import { useMemo, useState, type FormEvent } from "react";
import { AccessibilityInput } from "./AccessibilityInput";

type CrowdLevel = "low" | "medium" | "high";

interface RouteRecommendation {
  id: string;
  name: string;
  durationMin: number;
  waitMin: number;
  transfers: number;
  traffic: "baixo" | "moderado" | "intenso";
  crowd: CrowdLevel;
  safety: number;
  quality: number;
  departure: string;
  explanation: string;
}

interface AnalysisResult {
  origin: string;
  destination: string;
  departureTime: string;
  recommended: RouteRecommendation;
  alternatives: RouteRecommendation[];
  bestDepartureWindow: string;
  savedMinutes: number;
  occupancyForecast: string;
  aiSummary: string;
}

const CROWD_COLORS: Record<CrowdLevel, string> = {
  low: "bg-emerald-500",
  medium: "bg-amber-500",
  high: "bg-rose-500",
};

const CROWD_LABELS: Record<CrowdLevel, string> = {
  low: "Baixa",
  medium: "Média",
  high: "Alta",
};

const BASE_ROUTES: Array<Omit<RouteRecommendation, "departure" | "durationMin" | "waitMin" | "safety" | "quality">> = [
  {
    id: "smart-main",
    name: "Corredor BRT + Alimentador",
    transfers: 1,
    traffic: "moderado",
    crowd: "medium",
    explanation:
      "Combina corredor exclusivo e baixa variabilidade de espera, com menor risco de atraso em horários de pico.",
  },
  {
    id: "smart-alt-1",
    name: "Linha Direta Metropolitana",
    transfers: 0,
    traffic: "intenso",
    crowd: "high",
    explanation:
      "Menos conexões, porém suscetível a congestionamento e maior lotação em trechos centrais.",
  },
  {
    id: "smart-alt-2",
    name: "Circular + Integração Terminal",
    transfers: 2,
    traffic: "baixo",
    crowd: "low",
    explanation:
      "Rota mais estável e confortável, com maior tempo total devido a duas conexões.",
  },
];

const toMinutes = (time: string) => {
  const [h = "7", m = "30"] = time.split(":");
  return Number(h) * 60 + Number(m);
};

const fromMinutes = (total: number) => {
  const safe = ((total % 1440) + 1440) % 1440;
  const h = Math.floor(safe / 60)
    .toString()
    .padStart(2, "0");
  const m = (safe % 60).toString().padStart(2, "0");
  return `${h}:${m}`;
};

const normalizeText = (text: string) =>
  text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();

const buildLocationSuggestions = () => {
  const fixedStops = [
    "Rodoviaria do Plano Piloto",
    "Ceilandia Centro",
    "Aguas Claras",
    "Taguatinga Centro",
    "Samambaia Sul",
    "Samambaia Norte",
    "Guara",
    "UnB",
    "Asa Norte",
    "Asa Sul",
    "Nucleo Bandeirante",
    "Lago Norte",
    "Lago Sul",
    "Aeroporto",
  ];

  const candidates = busLinesData.flatMap((line) =>
    line.label
      .split("/")
      .map((segment) => segment.replace(/\([^)]*\)/g, "").trim())
      .filter((segment) => segment.length >= 3)
  );

  const uniqueByNormalized = new Map<string, string>();
  [...fixedStops, ...candidates].forEach((value) => {
    const normalized = normalizeText(value);
    if (!normalized) {
      return;
    }
    if (!uniqueByNormalized.has(normalized)) {
      uniqueByNormalized.set(normalized, value);
    }
  });

  return Array.from(uniqueByNormalized.values()).sort((a, b) =>
    a.localeCompare(b, "pt-BR", { sensitivity: "base" })
  );
};

const LOCATION_SUGGESTIONS = buildLocationSuggestions();

const buildAnalysis = (origin: string, destination: string, departureTime: string): AnalysisResult => {
  const minutes = toMinutes(departureTime);
  const isRushHour =
    (minutes >= 6 * 60 + 30 && minutes <= 9 * 60 + 30) ||
    (minutes >= 17 * 60 && minutes <= 20 * 60);
  const isNight = minutes >= 21 * 60 || minutes <= 5 * 60;

  const mainDuration = isRushHour ? 58 : 44;
  const directDuration = isRushHour ? 71 : 52;
  const circularDuration = isRushHour ? 63 : 55;

  const recommended: RouteRecommendation = {
    ...BASE_ROUTES[0],
    durationMin: mainDuration,
    waitMin: isRushHour ? 7 : 4,
    safety: isNight ? 7.1 : 8.6,
    quality: isRushHour ? 8.1 : 8.8,
    departure: departureTime,
  };

  const alternatives: RouteRecommendation[] = [
    {
      ...BASE_ROUTES[1],
      durationMin: directDuration,
      waitMin: isRushHour ? 10 : 6,
      safety: isNight ? 6.5 : 7.5,
      quality: isRushHour ? 6.6 : 7.3,
      departure: fromMinutes(minutes + 6),
    },
    {
      ...BASE_ROUTES[2],
      durationMin: circularDuration,
      waitMin: isRushHour ? 8 : 5,
      safety: isNight ? 7.3 : 8.9,
      quality: isRushHour ? 7.4 : 8.2,
      departure: fromMinutes(minutes + 10),
    },
  ];

  const fastestAlternative = Math.min(...alternatives.map((route) => route.durationMin));
  const savedMinutes = Math.max(0, fastestAlternative - recommended.durationMin + 4);

  return {
    origin,
    destination,
    departureTime,
    recommended,
    alternatives,
    bestDepartureWindow: isRushHour ? "Entre 09:45 e 10:20" : "Entre 15:40 e 16:10",
    savedMinutes,
    occupancyForecast:
      recommended.crowd === "high"
        ? "Lotação alta nos primeiros 20 minutos e melhora após o corredor central."
        : recommended.crowd === "medium"
        ? "Lotação moderada e distribuição equilibrada ao longo do trajeto."
        : "Baixa lotação durante quase toda a viagem.",
    aiSummary: `A IA priorizou a rota ${BASE_ROUTES[0].name} por equilibrar trânsito, tempo de espera e segurança para o trecho entre ${origin} e ${destination}.`,
  };
};

export function MapView() {
  const [origin, setOrigin] = useState("Rodoviária do Plano Piloto");
  const [destination, setDestination] = useState("Ceilândia Centro");
  const [departureTime, setDepartureTime] = useState("07:30");
  const [analysisVersion, setAnalysisVersion] = useState(0);
  const [lastAnalyzedAt, setLastAnalyzedAt] = useState(() => new Date());
  const [showOriginSuggestions, setShowOriginSuggestions] = useState(false);
  const [showDestinationSuggestions, setShowDestinationSuggestions] = useState(false);
  const [analysis, setAnalysis] = useState<AnalysisResult>(() =>
    buildAnalysis("Rodoviária do Plano Piloto", "Ceilândia Centro", "07:30")
  );

  const originSuggestions = useMemo(() => {
    const normalizedOrigin = normalizeText(origin);
    if (!normalizedOrigin) {
      return LOCATION_SUGGESTIONS.slice(0, 8);
    }

    return LOCATION_SUGGESTIONS.filter((option) =>
      normalizeText(option).includes(normalizedOrigin)
    ).slice(0, 8);
  }, [origin]);

  const destinationSuggestions = useMemo(() => {
    const normalizedDestination = normalizeText(destination);
    if (!normalizedDestination) {
      return LOCATION_SUGGESTIONS.slice(0, 8);
    }

    return LOCATION_SUGGESTIONS.filter((option) =>
      normalizeText(option).includes(normalizedDestination)
    ).slice(0, 8);
  }, [destination]);

  const googleMapsDirectionsSrc = useMemo(() => {
    const query = `${analysis.origin} até ${analysis.destination} transporte público`;
    return `https://www.google.com/maps?q=${encodeURIComponent(query)}&output=embed`;
  }, [analysis.destination, analysis.origin]);

  const handleAnalyzeRoute = (event?: FormEvent) => {
    event?.preventDefault();
    const safeOrigin = origin.trim() || "Origem não informada";
    const safeDestination = destination.trim() || "Destino não informado";
    const safeTime = departureTime || "07:30";
    setAnalysis(buildAnalysis(safeOrigin, safeDestination, safeTime));
    setAnalysisVersion((current) => current + 1);
    setLastAnalyzedAt(new Date());
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-4 flex items-center gap-2 text-blue-700">
            <Sparkles className="h-5 w-5" />
            <span className="text-sm font-semibold uppercase tracking-widest">Rotas Inteligentes</span>
          </div>
          <h1 className="mb-2 text-4xl font-bold text-slate-900">Seu trajeto otimizado por IA</h1>
          <p className="text-slate-600">
            Informe origem, destino e horário para receber a melhor rota com base em trânsito,
            lotação, tempo de espera, segurança e conexões disponíveis.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card className="space-y-6 p-6">
              <form className="grid gap-4 sm:grid-cols-2" onSubmit={handleAnalyzeRoute}>
                <div className="relative space-y-2">
                  <Label htmlFor="origem">Origem</Label>
                  <AccessibilityInput
                    id="origem"
                    type="text"
                    value={origin}
                    onChange={(value) => setOrigin(value)}
                    onFocus={() => setShowOriginSuggestions(true)}
                    onBlur={() => {
                      setTimeout(() => setShowOriginSuggestions(false), 120);
                    }}
                    placeholder="Ex.: Águas Claras"
                  />
                  {showOriginSuggestions && originSuggestions.length > 0 && (
                    <div className="absolute z-20 mt-1 max-h-52 w-full overflow-auto rounded-md border border-slate-200 bg-white shadow-lg">
                      {originSuggestions.map((option) => (
                        <button
                          key={`origem-${option}`}
                          type="button"
                          className="w-full border-b border-slate-100 px-3 py-2 text-left text-sm text-slate-700 hover:bg-blue-50 last:border-b-0"
                          onMouseDown={(event) => {
                            event.preventDefault();
                            setOrigin(option);
                            setShowOriginSuggestions(false);
                          }}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                <div className="relative space-y-2">
                  <Label htmlFor="destino">Destino</Label>
                  <AccessibilityInput
                    id="destino"
                    type="text"
                    value={destination}
                    onChange={(value) => setDestination(value)}
                    onFocus={() => setShowDestinationSuggestions(true)}
                    onBlur={() => {
                      setTimeout(() => setShowDestinationSuggestions(false), 120);
                    }}
                    placeholder="Ex.: UnB"
                  />
                  {showDestinationSuggestions && destinationSuggestions.length > 0 && (
                    <div className="absolute z-20 mt-1 max-h-52 w-full overflow-auto rounded-md border border-slate-200 bg-white shadow-lg">
                      {destinationSuggestions.map((option) => (
                        <button
                          key={`destino-${option}`}
                          type="button"
                          className="w-full border-b border-slate-100 px-3 py-2 text-left text-sm text-slate-700 hover:bg-blue-50 last:border-b-0"
                          onMouseDown={(event) => {
                            event.preventDefault();
                            setDestination(option);
                            setShowDestinationSuggestions(false);
                          }}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                <div className="space-y-2 sm:max-w-44">
                  <Label htmlFor="horario">Horário</Label>
                  <AccessibilityInput
                    id="horario"
                    type="time"
                    value={departureTime}
                    onChange={(value) => setDepartureTime(value)}
                  />
                </div>
                <div className="flex items-end">
                  <Button type="submit" className="w-full gap-2 bg-blue-600 text-white hover:bg-blue-700">
                    <Route className="h-4 w-4" />
                    Analisar rota
                  </Button>
                </div>
                <div className="sm:col-span-2 text-xs text-slate-500">
                  Última análise: {lastAnalyzedAt.toLocaleTimeString("pt-BR")}
                </div>
              </form>

              <div className="relative h-[540px] overflow-hidden rounded-xl border border-slate-200">
                <iframe
                  key={`${analysis.origin}-${analysis.destination}-${analysisVersion}`}
                  title="Mapa da rota recomendada"
                  src={googleMapsDirectionsSrc}
                  className="w-full h-full"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />

                <div className="absolute left-4 top-4 max-w-xs rounded-lg bg-white/95 px-4 py-3 shadow-md backdrop-blur-sm">
                  <h3 className="font-semibold text-slate-900">Rota recomendada no mapa</h3>
                  <p className="text-xs text-slate-600">
                    {analysis.recommended.name} • Saída {analysis.recommended.departure}
                  </p>
                </div>

                <div className="absolute right-4 top-4 rounded-lg bg-white/95 p-4 shadow-md backdrop-blur-sm">
                  <p className="mb-2 text-sm font-semibold">Previsão de lotação</p>
                  <Badge className={`${CROWD_COLORS[analysis.recommended.crowd]} text-white`}>
                    {CROWD_LABELS[analysis.recommended.crowd]}
                  </Badge>
                  <p className="mt-2 max-w-48 text-xs text-slate-600">{analysis.occupancyForecast}</p>
                </div>

                <div className="absolute bottom-4 left-4 rounded-lg border border-slate-200 bg-white/95 px-4 py-3 text-slate-900 shadow-md backdrop-blur-sm">
                  <div className="flex items-center gap-2 text-sm">
                    <Timer className="h-4 w-4" />
                    Economia estimada: {analysis.savedMinutes} min
                  </div>
                </div>

                <div className="absolute bottom-4 right-4 rounded-lg border border-blue-100 bg-blue-50/95 px-4 py-3 text-xs text-blue-900 shadow-md backdrop-blur-sm">
                  <div className="flex items-center gap-2">
                    <Clock3 className="h-3.5 w-3.5" />
                    Melhor horário para sair: {analysis.bestDepartureWindow}
                  </div>
                </div>
              </div>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="p-6">
              <div className="mb-4 flex items-center gap-2">
                <MapPinned className="h-5 w-5 text-blue-700" />
                <h3 className="text-xl font-semibold">Recomendação principal</h3>
              </div>
              <div className="space-y-3">
                <div className="rounded-lg border border-blue-100 bg-blue-50 p-3">
                  <p className="font-semibold text-blue-900">{analysis.recommended.name}</p>
                  <p className="text-xs text-blue-800">{analysis.origin} → {analysis.destination}</p>
                </div>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="rounded-md bg-slate-100 p-2">
                    <div className="text-slate-500">Duração</div>
                    <div className="font-semibold">{analysis.recommended.durationMin} min</div>
                  </div>
                  <div className="rounded-md bg-slate-100 p-2">
                    <div className="text-slate-500">Espera</div>
                    <div className="font-semibold">{analysis.recommended.waitMin} min</div>
                  </div>
                  <div className="rounded-md bg-slate-100 p-2">
                    <div className="text-slate-500">Conexões</div>
                    <div className="font-semibold">{analysis.recommended.transfers}</div>
                  </div>
                  <div className="rounded-md bg-slate-100 p-2">
                    <div className="text-slate-500">Trânsito</div>
                    <div className="font-semibold capitalize">{analysis.recommended.traffic}</div>
                  </div>
                </div>
                <div className="rounded-lg bg-slate-100 p-3 text-sm text-slate-700">
                  {analysis.aiSummary}
                </div>
              </div>
              </Card>

            <Card className="p-6">
              <h3 className="mb-4 font-semibold">Rotas alternativas</h3>
              <div className="space-y-3">
                {analysis.alternatives.map((route) => (
                  <div key={route.id} className="rounded-lg border border-slate-200 p-3">
                    <div className="mb-2 flex items-center justify-between gap-2">
                      <p className="font-semibold text-slate-900">{route.name}</p>
                      <Badge className={`${CROWD_COLORS[route.crowd]} text-white`}>
                        Lotação {CROWD_LABELS[route.crowd]}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-3 gap-2 text-xs text-slate-600">
                      <div>Duração: {route.durationMin} min</div>
                      <div>Espera: {route.waitMin} min</div>
                      <div>Conexões: {route.transfers}</div>
                    </div>
                    <p className="mt-2 text-xs text-slate-600">{route.explanation}</p>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="mb-4 font-semibold">Segurança e qualidade do trajeto</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between rounded-lg bg-emerald-50 p-3">
                  <div className="flex items-center gap-2 text-sm text-emerald-700">
                    <ShieldCheck className="h-4 w-4" />
                    Índice de segurança
                  </div>
                  <span className="font-semibold text-emerald-800">
                    {analysis.recommended.safety.toFixed(1)}/10
                  </span>
                </div>

                <div className="flex items-center justify-between rounded-lg bg-blue-50 p-3">
                  <div className="flex items-center gap-2 text-sm text-blue-700">
                    <Bus className="h-4 w-4" />
                    Qualidade do trajeto
                  </div>
                  <span className="font-semibold text-blue-800">
                    {analysis.recommended.quality.toFixed(1)}/10
                  </span>
                </div>

                <div className="rounded-lg bg-amber-50 p-3 text-sm text-amber-800">
                  <div className="mb-1 flex items-center gap-2 font-semibold">
                    <TrafficCone className="h-4 w-4" />
                    Trânsito esperado: {analysis.recommended.traffic}
                  </div>
                  A IA sugere manter janela de saída em {analysis.bestDepartureWindow} para reduzir
                  impacto de pico e evitar atrasos.
                </div>

                <div className="rounded-lg bg-slate-100 p-3 text-sm text-slate-700">
                  <div className="mb-1 flex items-center gap-2 font-semibold">
                    <AlertTriangle className="h-4 w-4" />
                    Explicação da IA
                  </div>
                  {analysis.recommended.explanation}
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
