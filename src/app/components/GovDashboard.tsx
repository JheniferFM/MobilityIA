import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import {
  BarChart3,
  MapPin,
  AlertCircle,
  CheckCircle2,
  Activity,
  Sparkles,
  Route,
} from "lucide-react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  PieChart,
  Pie,
  Cell,
} from "recharts";

export function GovDashboard() {
  const heatMapData = [
    { region: "Plano Piloto", flow: 96, peak: "07h-09h" },
    { region: "Ceilandia", flow: 88, peak: "17h-19h" },
    { region: "Taguatinga", flow: 84, peak: "07h-09h" },
    { region: "Samambaia", flow: 77, peak: "17h-19h" },
    { region: "Planaltina", flow: 73, peak: "06h-08h" },
    { region: "Gama", flow: 68, peak: "16h-18h" },
  ];

  const lineLoadData = [
    { line: "0.110", occupancy: 92, waitTime: 18 },
    { line: "0.320", occupancy: 86, waitTime: 14 },
    { line: "0.509", occupancy: 81, waitTime: 12 },
    { line: "0.611", occupancy: 74, waitTime: 10 },
    { line: "0.754", occupancy: 69, waitTime: 9 },
    { line: "0.982", occupancy: 64, waitTime: 8 },
  ];

  const bottlenecksData = [
    { axis: "EPIA Norte", impact: 85 },
    { axis: "EPTG", impact: 79 },
    { axis: "W3 Sul", impact: 66 },
    { axis: "Via Estrutural", impact: 72 },
    { axis: "BR-020", impact: 58 },
  ];

  const originDestinationData = [
    { route: "Planaltina -> Taguatinga", trips: 12800 },
    { route: "Ceilandia -> Plano Piloto", trips: 11700 },
    { route: "Samambaia -> Asa Sul", trips: 9600 },
    { route: "Gama -> Plano Piloto", trips: 9100 },
    { route: "Sobradinho -> Taguatinga", trips: 8200 },
  ];

  const demandForecastData = [
    { month: "Jul", current: 1.03, predicted: 1.05 },
    { month: "Ago", current: 1.04, predicted: 1.08 },
    { month: "Set", current: 1.05, predicted: 1.1 },
    { month: "Out", current: 1.06, predicted: 1.12 },
    { month: "Nov", current: 1.08, predicted: 1.14 },
    { month: "Dez", current: 1.09, predicted: 1.16 },
  ];

  const safetyByRegion = [
    { name: "Plano Piloto", value: 84, color: "#10b981" },
    { name: "Taguatinga", value: 78, color: "#3b82f6" },
    { name: "Ceilandia", value: 72, color: "#f59e0b" },
    { name: "Samambaia", value: 69, color: "#f97316" },
    { name: "Planaltina", value: 65, color: "#ef4444" },
  ];

  const performanceData = [
    { metric: "Pontualidade", value: 89 },
    { metric: "Disponibilidade da frota", value: 96 },
    { metric: "Aderencia de rota", value: 91 },
    { metric: "Resolucao de incidentes", value: 82 },
  ];

  const userEvaluationData = [
    { label: "Muito bom", value: 41, color: "#10b981" },
    { label: "Bom", value: 33, color: "#3b82f6" },
    { label: "Regular", value: 18, color: "#f59e0b" },
    { label: "Ruim", value: 8, color: "#ef4444" },
  ];

  const aiInsights = [
    {
      title: "Reforco de frota em corredores criticos",
      detail:
        "A IA recomenda +10% de veiculos na EPTG e EPIA Norte entre 06h-09h e 17h-20h para reduzir espera e lotacao.",
      priority: "Alta",
      tone: "bg-red-50 border-red-200 text-red-700",
    },
    {
      title: "Rebalanceamento inter-RAs",
      detail:
        "Planaltina -> Taguatinga e Ceilandia -> Plano Piloto concentram maior deslocamento. Ajustar partidas em janelas de 15 minutos.",
      priority: "Media",
      tone: "bg-yellow-50 border-yellow-200 text-yellow-700",
    },
    {
      title: "Acao preventiva de seguranca",
      detail:
        "Elevar monitoramento em pontos com indice abaixo de 70 e priorizar patrulhamento no inicio da noite.",
      priority: "Alta",
      tone: "bg-orange-50 border-orange-200 text-orange-700",
    },
    {
      title: "Estrategia de sustentabilidade",
      detail:
        "Ajustar oferta em periodos de vale com microfrota eletrica para manter eficiencia operacional e reduzir emissoes.",
      priority: "Media",
      tone: "bg-emerald-50 border-emerald-200 text-emerald-700",
    },
  ];

  return (
    <div className="min-h-screen py-8 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-gradient-to-br from-slate-700 to-slate-900 rounded-xl flex items-center justify-center">
              <BarChart3 className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-4xl font-bold">Dashboard Governamental</h1>
          </div>
          <p className="text-lg text-slate-600">
            O Dashboard Governamental do Mobility AI oferece uma visao estrategica da mobilidade urbana do DF com dados em tempo real e Inteligencia Artificial.
          </p>
        </div>

        <Card className="p-6 mb-8 border-slate-200 bg-white">
          <div className="flex items-start gap-3">
            <Sparkles className="w-5 h-5 text-blue-600 mt-0.5" />
            <p className="text-sm md:text-base text-slate-700 leading-relaxed">
              O painel integra Mapa de Calor da Mobilidade, lotacao por linha, tempo medio de espera, gargalos de transito, matriz de Origem x Destino,
              previsoes de demanda futura, indice de seguranca por regiao, avaliacao dos usuarios e indicadores de desempenho do sistema.
              A IA gera insights automaticos e recomendacoes estrategicas para apoiar a tomada de decisao e tornar o transporte mais eficiente, acessivel e sustentavel.
            </p>
          </div>
        </Card>

        <Tabs defaultValue="heatmap" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 lg:w-auto lg:inline-grid lg:grid-cols-4">
            <TabsTrigger value="heatmap">Mapa de Calor</TabsTrigger>
            <TabsTrigger value="operations">Operacao</TabsTrigger>
            <TabsTrigger value="od">Origem x Destino</TabsTrigger>
            <TabsTrigger value="insights">Insights IA</TabsTrigger>
          </TabsList>

          <TabsContent value="heatmap" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              <Card className="p-6">
                <h3 className="text-xl font-semibold mb-6">Mapa de Calor da Mobilidade</h3>
                <ResponsiveContainer width="100%" height={320}>
                  <BarChart data={heatMapData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis dataKey="region" stroke="#64748b" />
                    <YAxis stroke="#64748b" />
                    <Tooltip />
                    <Bar dataKey="flow" fill="#2563eb" radius={[8, 8, 0, 0]} name="Fluxo (%)" />
                  </BarChart>
                </ResponsiveContainer>
              </Card>

              <Card className="p-6">
                <h3 className="text-xl font-semibold mb-6">Gargalos de Transito</h3>
                <ResponsiveContainer width="100%" height={320}>
                  <AreaChart data={bottlenecksData}>
                    <defs>
                      <linearGradient id="bottleneckFill" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#f97316" stopOpacity={0.35} />
                        <stop offset="95%" stopColor="#f97316" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis dataKey="axis" stroke="#64748b" />
                    <YAxis stroke="#64748b" />
                    <Tooltip />
                    <Area
                      type="monotone"
                      dataKey="impact"
                      stroke="#f97316"
                      strokeWidth={2}
                      fill="url(#bottleneckFill)"
                      name="Impacto no sistema"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </Card>
            </div>

            <Card className="p-6">
              <h3 className="font-semibold mb-4">Horarios de pico por regiao</h3>
              <div className="grid md:grid-cols-3 gap-4">
                {heatMapData.map((item) => (
                  <div key={item.region} className="p-4 rounded-lg border bg-slate-50">
                    <p className="text-sm text-slate-500 mb-1">{item.region}</p>
                    <p className="text-lg font-semibold">{item.peak}</p>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="operations" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              <Card className="p-6">
                <h3 className="text-xl font-semibold mb-6">Lotacao por linha</h3>
                <ResponsiveContainer width="100%" height={320}>
                  <BarChart data={lineLoadData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis dataKey="line" stroke="#64748b" />
                    <YAxis stroke="#64748b" />
                    <Tooltip />
                    <Bar dataKey="occupancy" fill="#7c3aed" radius={[8, 8, 0, 0]} name="Lotacao (%)" />
                  </BarChart>
                </ResponsiveContainer>
              </Card>

              <Card className="p-6">
                <h3 className="text-xl font-semibold mb-6">Tempo medio de espera</h3>
                <ResponsiveContainer width="100%" height={320}>
                  <LineChart data={lineLoadData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis dataKey="line" stroke="#64748b" />
                    <YAxis stroke="#64748b" />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="waitTime"
                      stroke="#0ea5e9"
                      strokeWidth={3}
                      dot={{ fill: "#0ea5e9", r: 4 }}
                      name="Espera (min)"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </Card>
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
              <Card className="p-6">
                <h3 className="text-xl font-semibold mb-6">Previsao de demanda futura (IA)</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={demandForecastData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis dataKey="month" stroke="#64748b" />
                    <YAxis stroke="#64748b" />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="current" stroke="#64748b" strokeWidth={2} name="Atual (milhoes)" />
                    <Line type="monotone" dataKey="predicted" stroke="#2563eb" strokeWidth={3} name="Previsto (milhoes)" />
                  </LineChart>
                </ResponsiveContainer>
              </Card>

              <Card className="p-6">
                <h3 className="text-xl font-semibold mb-6">Resumo operacional</h3>
                <div className="space-y-4">
                  <div className="p-4 rounded-lg bg-blue-50 border border-blue-200">
                    <div className="flex items-center gap-2 mb-1">
                      <Activity className="w-4 h-4 text-blue-600" />
                      <p className="text-sm font-semibold">Linhas com maior criticidade</p>
                    </div>
                    <p className="text-sm text-slate-700">0.110 e 0.320 concentram maior lotacao e espera acima da meta.</p>
                  </div>
                  <div className="p-4 rounded-lg bg-amber-50 border border-amber-200">
                    <div className="flex items-center gap-2 mb-1">
                      <AlertCircle className="w-4 h-4 text-amber-600" />
                      <p className="text-sm font-semibold">Gargalo de trafego</p>
                    </div>
                    <p className="text-sm text-slate-700">EPIA Norte e EPTG seguem como os principais eixos que impactam a regularidade.</p>
                  </div>
                  <div className="p-4 rounded-lg bg-emerald-50 border border-emerald-200">
                    <div className="flex items-center gap-2 mb-1">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <p className="text-sm font-semibold">Efeito esperado</p>
                    </div>
                    <p className="text-sm text-slate-700">Reforco de frota nos picos pode reduzir espera em ate 14% nas rotas mais demandadas.</p>
                  </div>
                </div>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="od" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              <Card className="p-6">
                <h3 className="text-xl font-semibold mb-6">Origem x Destino (deslocamentos)</h3>
                <ResponsiveContainer width="100%" height={320}>
                  <BarChart data={originDestinationData} layout="vertical" margin={{ left: 30 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis type="number" stroke="#64748b" />
                    <YAxis type="category" dataKey="route" stroke="#64748b" width={150} />
                    <Tooltip />
                    <Bar dataKey="trips" fill="#0ea5e9" radius={[0, 8, 8, 0]} name="Viagens" />
                  </BarChart>
                </ResponsiveContainer>
              </Card>

              <Card className="p-6">
                <h3 className="text-xl font-semibold mb-6">Indice de seguranca por regiao</h3>
                <div className="space-y-4">
                  {safetyByRegion.map((region) => (
                    <div key={region.name} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">{region.name}</span>
                        <span className="text-sm font-semibold">{region.value}/100</span>
                      </div>
                      <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full"
                          style={{ width: `${region.value}%`, backgroundColor: region.color }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
              <Card className="p-6">
                <h3 className="text-xl font-semibold mb-6">Avaliacao dos usuarios</h3>
                <ResponsiveContainer width="100%" height={260}>
                  <PieChart>
                    <Pie
                      data={userEvaluationData}
                      dataKey="value"
                      nameKey="label"
                      cx="50%"
                      cy="50%"
                      outerRadius={88}
                      label
                    >
                      {userEvaluationData.map((entry) => (
                        <Cell key={entry.label} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </Card>

              <Card className="p-6">
                <h3 className="text-xl font-semibold mb-6">Indicadores de desempenho</h3>
                <div className="space-y-4">
                  {performanceData.map((item) => (
                    <div key={item.metric} className="p-4 rounded-lg border bg-slate-50">
                      <div className="flex items-center justify-between">
                        <p className="text-sm text-slate-600">{item.metric}</p>
                        <p className="text-lg font-bold">{item.value}%</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="insights" className="space-y-6">
            <Card className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="w-5 h-5 text-violet-600" />
                <h3 className="text-xl font-semibold">Insights automaticos e recomendacoes estrategicas</h3>
              </div>
              <p className="text-sm text-slate-600 mb-6">
                Recomendacoes geradas pela IA para apoiar gestores na tomada de decisao.
              </p>

              <div className="grid md:grid-cols-2 gap-4">
                {aiInsights.map((insight) => (
                  <div key={insight.title} className={`rounded-lg border p-4 ${insight.tone}`}>
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-sm">{insight.title}</h4>
                      <Badge variant="outline">{insight.priority}</Badge>
                    </div>
                    <p className="text-xs leading-relaxed">{insight.detail}</p>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-6 bg-gradient-to-br from-slate-50 to-blue-50">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div>
                  <h3 className="font-semibold mb-1">Exportar relatorios executivos</h3>
                  <p className="text-sm text-slate-600">Leve os dados para reunioes de planejamento e comites tecnicos.</p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" className="gap-2">
                    <Route className="w-4 h-4" />
                    Exportar PDF
                  </Button>
                  <Button className="gap-2">
                    <BarChart3 className="w-4 h-4" />
                    Exportar Excel
                  </Button>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
