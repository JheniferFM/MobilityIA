import { Badge } from "./ui/badge";
import { Card } from "./ui/card";
import {
  Brain,
  BusFront,
  Clock3,
  MapPin,
  QrCode,
  Route,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";
import { useMemo } from "react";
import { useParams } from "react-router";

type CrowdLevel = "Baixa" | "Média" | "Alta";

type StopStatus = "Operando normalmente" | "Fluxo intenso" | "Atenção";

interface NextBus {
  line: string;
  destination: string;
  etaMin: number;
  crowdLevel: CrowdLevel;
}

interface SecurityInfo {
  index: number;
  lighting: string;
  recentOccurrences: string;
  recommendations: string[];
}

interface SmartRouteOption {
  title: string;
  details: string;
  etaMin: number;
}

interface StopData {
  slug: string;
  stopName: string;
  region: string;
  location: string;
  status: StopStatus;
  lines: string[];
  usersInRegion: number;
  nextBuses: NextBus[];
  security: SecurityInfo;
  routes: SmartRouteOption[];
}

const STOP_DATA: Record<string, StopData> = {
  "rodoviaria-plano-piloto": {
    slug: "rodoviaria-plano-piloto",
    stopName: "Rodoviária do Plano Piloto",
    region: "Plano Piloto",
    location: "SDS, Plataforma Superior - Brasília/DF",
    status: "Fluxo intenso",
    lines: ["0.110", "0.116", "0.152", "0.300", "0.600"],
    usersInRegion: 2480,
    nextBuses: [
      { line: "0.110", destination: "UnB", etaMin: 4, crowdLevel: "Média" },
      { line: "0.300", destination: "Ceilândia Centro", etaMin: 7, crowdLevel: "Alta" },
      { line: "0.600", destination: "Gama", etaMin: 9, crowdLevel: "Baixa" },
      { line: "0.152", destination: "Cruzeiro", etaMin: 12, crowdLevel: "Baixa" },
    ],
    security: {
      index: 8.2,
      lighting: "Boa - iluminação pública ativa e monitorada",
      recentOccurrences: "Baixa incidência nas últimas 24h",
      recommendations: [
        "Prefira embarque nas plataformas com maior fluxo de pessoas.",
        "Mantenha pertences à frente do corpo em horários de pico.",
      ],
    },
    routes: [
      {
        title: "Melhor rota",
        details: "BRT + Integração curta via eixo central",
        etaMin: 41,
      },
      {
        title: "Rota mais rápida",
        details: "Linha direta 0.300 com trecho expresso",
        etaMin: 36,
      },
      {
        title: "Rota mais confortável",
        details: "Linha 0.600 com menor ocupação média",
        etaMin: 48,
      },
    ],
  },
  "taguatinga-centro": {
    slug: "taguatinga-centro",
    stopName: "Terminal Taguatinga Centro",
    region: "Taguatinga",
    location: "QNB, Estação Central - Taguatinga/DF",
    status: "Operando normalmente",
    lines: ["0.047", "0.053", "0.089", "0.300"],
    usersInRegion: 1320,
    nextBuses: [
      { line: "0.047", destination: "Águas Claras", etaMin: 3, crowdLevel: "Média" },
      { line: "0.089", destination: "Guará", etaMin: 6, crowdLevel: "Baixa" },
      { line: "0.300", destination: "Plano Piloto", etaMin: 8, crowdLevel: "Média" },
      { line: "0.053", destination: "Samambaia Sul", etaMin: 11, crowdLevel: "Baixa" },
    ],
    security: {
      index: 7.6,
      lighting: "Boa - reforço de iluminação nos acessos",
      recentOccurrences: "Ocorrências pontuais sem gravidade",
      recommendations: [
        "Utilize áreas de espera mais iluminadas à noite.",
        "Evite uso ostensivo do celular próximo à via.",
      ],
    },
    routes: [
      {
        title: "Melhor rota",
        details: "Linha 0.300 + conexão curta",
        etaMin: 39,
      },
      {
        title: "Rota mais rápida",
        details: "Linha expressa via corredor exclusivo",
        etaMin: 34,
      },
      {
        title: "Rota mais confortável",
        details: "Linha 0.089 com ocupação moderada",
        etaMin: 45,
      },
    ],
  },
};

const CROWD_STYLES: Record<CrowdLevel, string> = {
  Baixa: "bg-emerald-100 text-emerald-700 border-emerald-200",
  "Média": "bg-amber-100 text-amber-700 border-amber-200",
  Alta: "bg-rose-100 text-rose-700 border-rose-200",
};

const STATUS_STYLES: Record<StopStatus, string> = {
  "Operando normalmente": "bg-emerald-100 text-emerald-800 border-emerald-200",
  "Fluxo intenso": "bg-amber-100 text-amber-800 border-amber-200",
  "Atenção": "bg-rose-100 text-rose-800 border-rose-200",
};

function toTitleCase(value: string) {
  return value
    .split(" ")
    .map((token) => token.charAt(0).toUpperCase() + token.slice(1))
    .join(" ");
}

export function SmartQRCodeStop() {
  const { slug = "rodoviaria-plano-piloto" } = useParams();

  const stop = STOP_DATA[slug] ?? {
    ...STOP_DATA["rodoviaria-plano-piloto"],
    slug,
    stopName: `Parada ${toTitleCase(slug.replace(/-/g, " "))}`,
    status: "Operando normalmente" as StopStatus,
  };

  const consultationTime = useMemo(() => new Date(), []);

  const bestBus = useMemo(() => {
    const score = (bus: NextBus) => {
      const crowdWeight = bus.crowdLevel === "Baixa" ? 0 : bus.crowdLevel === "Média" ? 3 : 7;
      return bus.etaMin + crowdWeight;
    };

    return [...stop.nextBuses].sort((a, b) => score(a) - score(b))[0];
  }, [stop.nextBuses]);

  const idealWaitMessage = useMemo(() => {
    const baseHour = consultationTime.getHours();
    const baseMinute = consultationTime.getMinutes();
    const waitMinutes = stop.status === "Fluxo intenso" ? 10 : 6;
    const improvedCrowd = stop.status === "Fluxo intenso" ? 30 : 18;

    const target = new Date(consultationTime);
    target.setHours(baseHour);
    target.setMinutes(baseMinute + waitMinutes);

    const hh = target.getHours().toString().padStart(2, "0");
    const mm = target.getMinutes().toString().padStart(2, "0");

    return `Se você aguardar até ${hh}:${mm}, a lotação será reduzida em aproximadamente ${improvedCrowd}%.`;
  }, [consultationTime, stop.status]);

  return (
    <div className="min-h-screen py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-6 rounded-2xl border border-blue-100 bg-white p-6 shadow-sm">
          <div className="mb-4 flex items-center gap-2 text-blue-700">
            <QrCode className="h-5 w-5" />
            <span className="text-sm font-semibold uppercase tracking-wider">QR Code Inteligente</span>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div>
              <p className="text-xs uppercase tracking-wide text-slate-500">Nome da parada</p>
              <p className="text-lg font-semibold text-slate-900">{stop.stopName}</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wide text-slate-500">Região administrativa</p>
              <p className="text-lg font-semibold text-slate-900">{stop.region}</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wide text-slate-500">Horário da consulta</p>
              <p className="text-lg font-semibold text-slate-900">
                {consultationTime.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })}
              </p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wide text-slate-500">Status da parada</p>
              <Badge className={`mt-1 border ${STATUS_STYLES[stop.status]}`}>{stop.status}</Badge>
            </div>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <Card className="p-6 lg:col-span-2">
            <div className="mb-4 flex items-center gap-2">
              <MapPin className="h-5 w-5 text-cyan-700" />
              <h2 className="text-xl font-semibold">Informações da Parada</h2>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                <p className="text-sm text-slate-500">Nome da parada</p>
                <p className="font-semibold text-slate-900">{stop.stopName}</p>
              </div>
              <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                <p className="text-sm text-slate-500">Localização</p>
                <p className="font-semibold text-slate-900">{stop.location}</p>
              </div>
              <div className="rounded-lg border border-slate-200 bg-slate-50 p-4 sm:col-span-2">
                <p className="mb-2 text-sm text-slate-500">Linhas disponíveis</p>
                <div className="flex flex-wrap gap-2">
                  {stop.lines.map((line) => (
                    <Badge key={line} variant="outline" className="bg-white">
                      Linha {line}
                    </Badge>
                  ))}
                </div>
              </div>
              <div className="rounded-lg border border-slate-200 bg-slate-50 p-4 sm:col-span-2">
                <div className="flex items-center gap-2 text-slate-700">
                  <Users className="h-4 w-4" />
                  <span className="text-sm">Quantidade de usuários na região</span>
                </div>
                <p className="mt-2 text-2xl font-bold text-slate-900">{stop.usersInRegion.toLocaleString("pt-BR")}</p>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200">
            <div className="mb-3 flex items-center gap-2 text-blue-800">
              <Brain className="h-5 w-5" />
              <h2 className="text-lg font-semibold">Recomendação da IA</h2>
            </div>
            <p className="text-sm leading-relaxed text-slate-700">
              Com base no horário atual, trânsito, lotação e histórico da região, recomendamos embarcar na linha {bestBus.line} em {bestBus.etaMin} minutos para reduzir o tempo de viagem.
            </p>
            <div className="mt-4 rounded-lg border border-blue-200 bg-white/80 p-3 text-sm text-blue-900">
              Projeção de ganho estimado: até 12 minutos em relação à média desta faixa horária.
            </div>
          </Card>

          <Card className="p-6 lg:col-span-3">
            <div className="mb-4 flex items-center gap-2">
              <BusFront className="h-5 w-5 text-blue-700" />
              <h2 className="text-xl font-semibold">Próximos Ônibus</h2>
            </div>
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {stop.nextBuses.map((bus) => (
                <div key={`${bus.line}-${bus.destination}`} className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                  <div className="mb-2 flex items-center justify-between gap-2">
                    <p className="text-lg font-semibold text-slate-900">Linha {bus.line}</p>
                    <Badge className={`border ${CROWD_STYLES[bus.crowdLevel]}`}>{bus.crowdLevel}</Badge>
                  </div>
                  <p className="text-sm text-slate-600">Destino: {bus.destination}</p>
                  <p className="mt-2 flex items-center gap-1 text-sm font-medium text-blue-700">
                    <Clock3 className="h-4 w-4" />
                    Chega em {bus.etaMin} min
                  </p>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6 lg:col-span-2">
            <div className="mb-4 flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-emerald-700" />
              <h2 className="text-xl font-semibold">Segurança</h2>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-lg bg-emerald-50 p-4">
                <p className="text-sm text-emerald-700">Índice de segurança</p>
                <p className="text-2xl font-bold text-emerald-900">{stop.security.index.toFixed(1)}/10</p>
              </div>
              <div className="rounded-lg bg-slate-100 p-4">
                <p className="text-sm text-slate-600">Iluminação da parada</p>
                <p className="font-semibold text-slate-900">{stop.security.lighting}</p>
              </div>
              <div className="rounded-lg bg-amber-50 p-4 sm:col-span-2">
                <p className="text-sm text-amber-700">Ocorrências recentes</p>
                <p className="font-semibold text-amber-900">{stop.security.recentOccurrences}</p>
              </div>
              <div className="rounded-lg border border-slate-200 bg-white p-4 sm:col-span-2">
                <p className="mb-2 text-sm text-slate-500">Recomendações de segurança</p>
                <ul className="space-y-1 text-sm text-slate-700">
                  {stop.security.recommendations.map((tip) => (
                    <li key={tip}>• {tip}</li>
                  ))}
                </ul>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="mb-4 flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-cyan-700" />
              <h2 className="text-lg font-semibold">Melhor Horário para Embarque</h2>
            </div>
            <p className="rounded-lg border border-cyan-200 bg-cyan-50 p-4 text-sm leading-relaxed text-cyan-900">
              {idealWaitMessage}
            </p>
          </Card>

          <Card className="p-6 lg:col-span-3">
            <div className="mb-4 flex items-center gap-2">
              <Route className="h-5 w-5 text-blue-700" />
              <h2 className="text-xl font-semibold">Rotas Inteligentes</h2>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              {stop.routes.map((routeOption) => (
                <div key={routeOption.title} className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                  <p className="text-sm text-slate-500">{routeOption.title}</p>
                  <p className="mt-1 font-semibold text-slate-900">{routeOption.details}</p>
                  <p className="mt-3 text-sm text-blue-700">Tempo estimado: {routeOption.etaMin} min</p>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
