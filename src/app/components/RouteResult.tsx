import { useState } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

interface RouteSummary {
  tempo: string;
  economia: string;
  lotacao: "Baixa" | "Media" | "Alta";
  seguranca: "Alta" | "Media";
  integracoes: number;
}

const formatDuration = (minutes: number) => {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  if (h === 0) return `${m}min`;
  return `${h}h${String(m).padStart(2, "0")}min`;
};

const createSeed = (origem: string, destino: string, horario: string) => {
  return `${origem}-${destino}-${horario}`
    .split("")
    .reduce((acc, char, index) => {
      const next = (acc * 31 + char.charCodeAt(0) * (index + 1)) % 1000000007;
      return next;
    }, 7);
};

function RouteResult() {
  const [origem, setOrigem] = useState("Planaltina");
  const [destino, setDestino] = useState("Taguatinga");
  const [horario, setHorario] = useState("18:00");
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(0);
  const [resultado, setResultado] = useState<RouteSummary | null>(null);

  const passos = [
    "Analisando transito...",
    "Calculando lotacao...",
    "Verificando seguranca...",
    "Buscando alternativas...",
  ];

  const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

  const buildResult = (originValue: string, destinationValue: string, timeValue: string): RouteSummary => {
    const seed = createSeed(originValue, destinationValue, timeValue);
    const [hourRaw, minuteRaw] = timeValue.split(":");
    const hour = Number.parseInt(hourRaw ?? "18", 10);
    const minute = Number.parseInt(minuteRaw ?? "0", 10);
    const minuteFactor = Number.isFinite(hour) && Number.isFinite(minute) ? (hour * 60 + minute) % 17 : 9;

    const durationMinutes = 52 + (seed % 38) + minuteFactor;
    const savings = 8 + (seed % 20);
    const lotacaoLevels: RouteSummary["lotacao"][] = ["Baixa", "Media", "Alta"];
    const lotacao = lotacaoLevels[seed % lotacaoLevels.length];
    const seguranca: RouteSummary["seguranca"] = seed % 5 === 0 ? "Media" : "Alta";
    const integracoes = 1 + (seed % 3);

    return {
      tempo: formatDuration(durationMinutes),
      economia: `${savings} minutos`,
      lotacao,
      seguranca,
      integracoes,
    };
  };

  const handleFindRoute = async () => {
    if (!origem.trim() || !destino.trim() || !horario.trim()) return;

    setLoading(true);
    setResultado(null);

    for (let i = 0; i < passos.length; i += 1) {
      setStep(i);
      await wait(650);
    }

    setResultado(buildResult(origem, destino, horario));
    setLoading(false);
  };

  return (
    <div className="min-h-screen py-8">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <Card className="space-y-5 p-6">
          <div>
            <h1 className="mb-2 text-3xl font-bold">Rotas Inteligentes</h1>
            <p className="text-slate-600">
              Informe origem, destino e horario para a IA recomendar a melhor rota.
            </p>
          </div>

          <div className="grid gap-3 md:grid-cols-3">
            <Input
              value={origem}
              onChange={(e) => setOrigem(e.target.value)}
              placeholder="Origem"
            />

            <Input
              value={destino}
              onChange={(e) => setDestino(e.target.value)}
              placeholder="Destino"
            />

            <Input type="time" value={horario} onChange={(e) => setHorario(e.target.value)} />
          </div>

          <Button className="w-full" onClick={handleFindRoute} disabled={loading}>
            {loading ? "Analisando..." : "Encontrar Melhor Rota"}
          </Button>

          {loading ? (
            <div className="space-y-2 rounded-lg border border-blue-200 bg-blue-50 p-4 text-sm text-blue-900">
              {passos.map((item, index) => (
                <p key={item} className={index <= step ? "opacity-100" : "opacity-50"}>
                  {index <= step ? "* " : "- "}
                  {item}
                </p>
              ))}
            </div>
          ) : null}

          {resultado ? (
            <div className="rounded-lg border border-green-200 bg-green-50 p-4">
              <h2 className="mb-3 text-lg font-semibold">Melhor opcao recomendada</h2>
              <div className="grid gap-2 text-sm sm:grid-cols-2">
                <p><strong>Tempo estimado:</strong> {resultado.tempo}</p>
                <p><strong>Economia:</strong> {resultado.economia}</p>
                <p><strong>Lotacao:</strong> {resultado.lotacao}</p>
                <p><strong>Seguranca:</strong> {resultado.seguranca}</p>
                <p><strong>Integracoes:</strong> {resultado.integracoes}</p>
              </div>
            </div>
          ) : null}
        </Card>
      </div>
    </div>
  );
}

export { RouteResult };
export default RouteResult;
