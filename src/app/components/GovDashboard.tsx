import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  Bus,
  Users,
  MapPin,
  AlertCircle,
  CheckCircle2,
  Clock,
  DollarSign,
  Target,
  Activity,
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
  const monthlyData = [
    { month: "Jan", passengers: 850000, satisfaction: 72, cost: 2400000 },
    { month: "Fev", passengers: 890000, satisfaction: 75, cost: 2450000 },
    { month: "Mar", passengers: 920000, satisfaction: 78, cost: 2500000 },
    { month: "Abr", passengers: 950000, satisfaction: 81, cost: 2480000 },
    { month: "Mai", passengers: 980000, satisfaction: 84, cost: 2520000 },
    { month: "Jun", passengers: 1020000, satisfaction: 87, cost: 2550000 },
  ];

  const peakHoursData = [
    { hour: "5h", demand: 15 },
    { hour: "6h", demand: 45 },
    { hour: "7h", demand: 85 },
    { hour: "8h", demand: 95 },
    { hour: "9h", demand: 65 },
    { hour: "10h", demand: 40 },
    { hour: "11h", demand: 38 },
    { hour: "12h", demand: 55 },
    { hour: "13h", demand: 50 },
    { hour: "14h", demand: 42 },
    { hour: "15h", demand: 48 },
    { hour: "16h", demand: 60 },
    { hour: "17h", demand: 82 },
    { hour: "18h", demand: 92 },
    { hour: "19h", demand: 75 },
    { hour: "20h", demand: 50 },
    { hour: "21h", demand: 30 },
    { hour: "22h", demand: 20 },
  ];

  const regionData = [
    { name: "Plano Piloto", passengers: 280000, growth: 5.2, color: "#3b82f6" },
    { name: "Ceilândia", passengers: 195000, growth: 8.1, color: "#10b981" },
    { name: "Taguatinga", passengers: 178000, growth: 6.7, color: "#f59e0b" },
    { name: "Samambaia", passengers: 142000, growth: 7.3, color: "#ef4444" },
    { name: "Planaltina", passengers: 125000, growth: 9.2, color: "#8b5cf6" },
    { name: "Gama", passengers: 98000, growth: 4.8, color: "#ec4899" },
  ];

  const issuesData = [
    { type: "Lotação", count: 45, status: "high" },
    { type: "Atraso", count: 32, status: "medium" },
    { type: "Infraestrutura", count: 28, status: "medium" },
    { type: "Segurança", count: 15, status: "low" },
  ];

  const kpis = [
    {
      label: "Passageiros/Mês",
      value: "1.02M",
      change: "+4.1%",
      trend: "up",
      icon: Users,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      label: "Satisfação Média",
      value: "87%",
      change: "+3.2%",
      trend: "up",
      icon: CheckCircle2,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      label: "Custo Operacional",
      value: "R$ 2.55M",
      change: "-2.1%",
      trend: "down",
      icon: DollarSign,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
    {
      label: "Pontualidade",
      value: "89%",
      change: "+1.8%",
      trend: "up",
      icon: Clock,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
    },
  ];

  return (
    <div className="min-h-screen py-8 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-gradient-to-br from-slate-700 to-slate-900 rounded-xl flex items-center justify-center">
              <BarChart3 className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-4xl font-bold">Dashboard Governamental</h1>
          </div>
          <p className="text-lg text-slate-600">
            Visão completa e inteligente da mobilidade urbana do DF
          </p>
        </div>

        {/* KPIs */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {kpis.map((kpi, idx) => {
            const Icon = kpi.icon;
            const TrendIcon = kpi.trend === "up" ? TrendingUp : TrendingDown;
            return (
              <Card key={idx} className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-12 h-12 rounded-lg ${kpi.bgColor} flex items-center justify-center`}>
                    <Icon className={`w-6 h-6 ${kpi.color}`} />
                  </div>
                  <Badge
                    className={`gap-1 ${
                      kpi.trend === "up" ? "bg-green-100 text-green-700" : "bg-blue-100 text-blue-700"
                    }`}
                  >
                    <TrendIcon className="w-3 h-3" />
                    {kpi.change}
                  </Badge>
                </div>
                <div className="text-3xl font-bold mb-1">{kpi.value}</div>
                <div className="text-sm text-slate-600">{kpi.label}</div>
              </Card>
            );
          })}
        </div>

        {/* Main Content */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:inline-grid">
            <TabsTrigger value="overview">Visão Geral</TabsTrigger>
            <TabsTrigger value="demand">Demanda</TabsTrigger>
            <TabsTrigger value="regions">Regiões</TabsTrigger>
            <TabsTrigger value="issues">Problemas</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              <Card className="p-6">
                <h3 className="text-xl font-semibold mb-6">Evolução Mensal</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={monthlyData}>
                    <defs>
                      <linearGradient id="colorPassengers" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis dataKey="month" stroke="#64748b" />
                    <YAxis stroke="#64748b" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "white",
                        border: "1px solid #e2e8f0",
                        borderRadius: "8px",
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="passengers"
                      stroke="#3b82f6"
                      strokeWidth={2}
                      fillOpacity={1}
                      fill="url(#colorPassengers)"
                      name="Passageiros"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </Card>

              <Card className="p-6">
                <h3 className="text-xl font-semibold mb-6">Satisfação vs Custo</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis dataKey="month" stroke="#64748b" />
                    <YAxis yAxisId="left" stroke="#64748b" />
                    <YAxis yAxisId="right" orientation="right" stroke="#64748b" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "white",
                        border: "1px solid #e2e8f0",
                        borderRadius: "8px",
                      }}
                    />
                    <Legend />
                    <Line
                      yAxisId="left"
                      type="monotone"
                      dataKey="satisfaction"
                      stroke="#10b981"
                      strokeWidth={3}
                      name="Satisfação (%)"
                      dot={{ fill: "#10b981", r: 4 }}
                    />
                    <Line
                      yAxisId="right"
                      type="monotone"
                      dataKey="cost"
                      stroke="#f59e0b"
                      strokeWidth={3}
                      name="Custo (R$)"
                      dot={{ fill: "#f59e0b", r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </Card>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="p-6 bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200">
                <div className="flex items-start gap-3">
                  <Activity className="w-8 h-8 text-blue-600" />
                  <div>
                    <div className="text-2xl font-bold mb-1">2,847</div>
                    <p className="text-sm text-slate-600">Ônibus em Operação</p>
                    <Badge className="mt-2 bg-blue-600">98.5% da frota</Badge>
                  </div>
                </div>
              </Card>

              <Card className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
                <div className="flex items-start gap-3">
                  <Target className="w-8 h-8 text-green-600" />
                  <div>
                    <div className="text-2xl font-bold mb-1">312</div>
                    <p className="text-sm text-slate-600">Rotas Ativas</p>
                    <Badge className="mt-2 bg-green-600">+12 novas rotas</Badge>
                  </div>
                </div>
              </Card>

              <Card className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
                <div className="flex items-start gap-3">
                  <MapPin className="w-8 h-8 text-purple-600" />
                  <div>
                    <div className="text-2xl font-bold mb-1">1,248</div>
                    <p className="text-sm text-slate-600">Pontos de Parada</p>
                    <Badge className="mt-2 bg-purple-600">89% com QR Code</Badge>
                  </div>
                </div>
              </Card>
            </div>
          </TabsContent>

          {/* Demand Tab */}
          <TabsContent value="demand" className="space-y-6">
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-6">Demanda por Horário</h3>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={peakHoursData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="hour" stroke="#64748b" />
                  <YAxis stroke="#64748b" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "white",
                      border: "1px solid #e2e8f0",
                      borderRadius: "8px",
                    }}
                  />
                  <Bar dataKey="demand" fill="#3b82f6" radius={[8, 8, 0, 0]} name="Demanda (%)" />
                </BarChart>
              </ResponsiveContainer>

              <div className="mt-6 grid grid-cols-3 gap-4 pt-4 border-t">
                <div className="text-center">
                  <div className="text-2xl font-bold text-red-600">7h-9h</div>
                  <p className="text-sm text-slate-600">Pico Matutino</p>
                  <p className="text-xs text-slate-500 mt-1">Demanda: 90%+</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">10h-16h</div>
                  <p className="text-sm text-slate-600">Período Vale</p>
                  <p className="text-xs text-slate-500 mt-1">Demanda: 40-50%</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-red-600">17h-19h</div>
                  <p className="text-sm text-slate-600">Pico Vespertino</p>
                  <p className="text-xs text-slate-500 mt-1">Demanda: 85%+</p>
                </div>
              </div>
            </Card>

            <div className="grid lg:grid-cols-2 gap-6">
              <Card className="p-6">
                <h3 className="font-semibold mb-4">Insights de Demanda</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg">
                    <TrendingUp className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-semibold mb-1">Crescimento Sustentado</p>
                      <p className="text-xs text-slate-600">
                        Aumento de 12% na demanda nos últimos 6 meses
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-4 bg-yellow-50 rounded-lg">
                    <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-semibold mb-1">Sobrecarga em Picos</p>
                      <p className="text-xs text-slate-600">
                        Necessário aumentar frota em 8% nos horários de pico
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-4 bg-green-50 rounded-lg">
                    <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-semibold mb-1">Oportunidade</p>
                      <p className="text-xs text-slate-600">
                        Redistribuir 15% da frota do vale para picos pode melhorar eficiência
                      </p>
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="font-semibold mb-4">Recomendações da IA</h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-2">
                    <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold flex-shrink-0">
                      1
                    </div>
                    <p className="text-sm text-slate-700">
                      Adicionar 12 ônibus nos horários 7h-9h e 17h-19h
                    </p>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold flex-shrink-0">
                      2
                    </div>
                    <p className="text-sm text-slate-700">
                      Implementar 5 novas rotas inter-RAs para reduzir tráfego no PP
                    </p>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold flex-shrink-0">
                      3
                    </div>
                    <p className="text-sm text-slate-700">
                      Oferecer tarifa reduzida no período 10h-16h para distribuir demanda
                    </p>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold flex-shrink-0">
                      4
                    </div>
                    <p className="text-sm text-slate-700">
                      Otimizar rotas em Planaltina e Ceilândia (maior crescimento)
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </TabsContent>

          {/* Regions Tab */}
          <TabsContent value="regions" className="space-y-6">
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-6">Demanda por Região Administrativa</h3>
              <div className="space-y-4">
                {regionData.map((region, idx) => (
                  <div key={idx} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-3">
                        <div
                          className="w-4 h-4 rounded"
                          style={{ backgroundColor: region.color }}
                        ></div>
                        <span className="font-medium">{region.name}</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <Badge className="bg-green-100 text-green-700 gap-1">
                          <TrendingUp className="w-3 h-3" />
                          +{region.growth}%
                        </Badge>
                        <span className="font-bold">
                          {(region.passengers / 1000).toFixed(0)}k
                        </span>
                      </div>
                    </div>
                    <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all"
                        style={{
                          backgroundColor: region.color,
                          width: `${(region.passengers / 280000) * 100}%`,
                        }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-6 border-t">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-blue-600">6</div>
                    <p className="text-xs text-slate-600">RAs Principais</p>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-green-600">1.02M</div>
                    <p className="text-xs text-slate-600">Total Passageiros</p>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-purple-600">6.8%</div>
                    <p className="text-xs text-slate-600">Crescimento Médio</p>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-orange-600">87%</div>
                    <p className="text-xs text-slate-600">Cobertura Total</p>
                  </div>
                </div>
              </div>
            </Card>

            <div className="grid lg:grid-cols-3 gap-6">
              <Card className="p-6">
                <h3 className="font-semibold mb-4">Maior Crescimento</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Planaltina</span>
                    <Badge className="bg-green-600">+9.2%</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Ceilândia</span>
                    <Badge className="bg-green-600">+8.1%</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Samambaia</span>
                    <Badge className="bg-green-600">+7.3%</Badge>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="font-semibold mb-4">Maior Volume</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Plano Piloto</span>
                    <span className="font-semibold">280k</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Ceilândia</span>
                    <span className="font-semibold">195k</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Taguatinga</span>
                    <span className="font-semibold">178k</span>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="font-semibold mb-4">Prioridade</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Infraestrutura</span>
                    <Badge className="bg-yellow-600">Média</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Expansão Frota</span>
                    <Badge className="bg-red-600">Alta</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Novas Rotas</span>
                    <Badge className="bg-red-600">Alta</Badge>
                  </div>
                </div>
              </Card>
            </div>
          </TabsContent>

          {/* Issues Tab */}
          <TabsContent value="issues" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="p-6">
                <h3 className="text-xl font-semibold mb-6">Problemas Reportados</h3>
                <div className="space-y-4">
                  {issuesData.map((issue, idx) => {
                    const statusColor =
                      issue.status === "high"
                        ? "bg-red-600"
                        : issue.status === "medium"
                        ? "bg-yellow-600"
                        : "bg-green-600";
                    return (
                      <div key={idx} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`w-2 h-2 rounded-full ${statusColor}`}></div>
                          <span className="font-medium">{issue.type}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-sm text-slate-600">{issue.count} casos</span>
                          <Button size="sm" variant="outline">Ver</Button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="text-xl font-semibold mb-6">Taxa de Resolução</h3>
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm text-slate-600">Resolvidos</span>
                      <span className="font-semibold text-green-600">89 casos</span>
                    </div>
                    <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-green-600 rounded-full" style={{ width: "74%" }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm text-slate-600">Em andamento</span>
                      <span className="font-semibold text-yellow-600">28 casos</span>
                    </div>
                    <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-yellow-600 rounded-full" style={{ width: "23%" }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm text-slate-600">Pendentes</span>
                      <span className="font-semibold text-red-600">3 casos</span>
                    </div>
                    <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-red-600 rounded-full" style={{ width: "3%" }}></div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            <Card className="p-6">
              <h3 className="font-semibold mb-4">Ações Recomendadas</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-sm mb-1">Urgente</h4>
                      <p className="text-xs text-slate-700 mb-2">
                        Adicionar 12 ônibus nos horários de pico para reduzir lotação
                      </p>
                      <Button size="sm" variant="destructive">Implementar</Button>
                    </div>
                  </div>
                </div>
                <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                  <div className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-sm mb-1">Importante</h4>
                      <p className="text-xs text-slate-700 mb-2">
                        Melhorar infraestrutura em 28 paradas com problemas reportados
                      </p>
                      <Button size="sm" variant="outline">Agendar</Button>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Export Section */}
        <Card className="p-6 bg-gradient-to-br from-slate-50 to-blue-50">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="font-semibold mb-1">Exportar Relatórios</h3>
              <p className="text-sm text-slate-600">
                Gere relatórios completos em PDF ou Excel
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline">Exportar PDF</Button>
              <Button>Exportar Excel</Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
