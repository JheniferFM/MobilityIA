import { Navigation } from "../components/Navigation";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import {
  Users,
  TrendingUp,
  TrendingDown,
  Bus,
  AlertCircle,
  Clock,
  MapPin,
  BarChart3,
  Activity,
  DollarSign,
} from "lucide-react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { motion } from "motion/react";

export default function GovDashboard() {
  const stats = [
    {
      title: "Passageiros/Dia",
      value: "847K",
      change: "+12.5%",
      trend: "up",
      icon: Users,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      title: "Satisfação Média",
      value: "7.8/10",
      change: "+0.5",
      trend: "up",
      icon: TrendingUp,
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      title: "Tempo Médio de Espera",
      value: "18 min",
      change: "-3 min",
      trend: "down",
      icon: Clock,
      color: "text-orange-600",
      bgColor: "bg-orange-100",
    },
    {
      title: "Subsídio Mensal",
      value: "R$ 45M",
      change: "+8.2%",
      trend: "up",
      icon: DollarSign,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
    },
  ];

  const dailyPassengers = [
    { day: "Seg", passengers: 820 },
    { day: "Ter", passengers: 850 },
    { day: "Qua", passengers: 830 },
    { day: "Qui", passengers: 870 },
    { day: "Sex", passengers: 920 },
    { day: "Sáb", passengers: 650 },
    { day: "Dom", passengers: 480 },
  ];

  const hourlyDemand = [
    { hour: "00h", demand: 15 },
    { hour: "03h", demand: 8 },
    { hour: "06h", demand: 85 },
    { hour: "09h", demand: 65 },
    { hour: "12h", demand: 70 },
    { hour: "15h", demand: 60 },
    { hour: "18h", demand: 95 },
    { hour: "21h", demand: 45 },
  ];

  const raDistribution = [
    { name: "Ceilândia", value: 18, color: "#3b82f6" },
    { name: "Taguatinga", value: 15, color: "#8b5cf6" },
    { name: "Plano Piloto", value: 14, color: "#06b6d4" },
    { name: "Planaltina", value: 12, color: "#10b981" },
    { name: "Samambaia", value: 11, color: "#f59e0b" },
    { name: "Gama", value: 10, color: "#ef4444" },
    { name: "Outras", value: 20, color: "#6b7280" },
  ];

  const routePerformance = [
    {
      route: "0.401",
      name: "Planaltina ↔ PP",
      passengers: 45000,
      satisfaction: 7.2,
      onTime: 78,
      issues: 5,
    },
    {
      route: "0.202",
      name: "Taguatinga ↔ PP",
      passengers: 52000,
      satisfaction: 8.1,
      onTime: 85,
      issues: 2,
    },
    {
      route: "0.300",
      name: "Ceilândia ↔ Rod.",
      passengers: 48000,
      satisfaction: 6.8,
      onTime: 72,
      issues: 8,
    },
    {
      route: "0.600",
      name: "Gama ↔ PP",
      passengers: 38000,
      satisfaction: 7.9,
      onTime: 82,
      issues: 3,
    },
  ];

  const alerts = [
    {
      id: "1",
      type: "high",
      title: "Alta demanda reprimida em Planaltina",
      description: "Pico das 18h com 40% dos usuários sem conseguir embarcar",
      time: "Há 2 horas",
    },
    {
      id: "2",
      type: "medium",
      title: "Atraso recorrente na linha 0.300",
      description: "Média de 15 minutos de atraso no período da manhã",
      time: "Há 5 horas",
    },
    {
      id: "3",
      type: "low",
      title: "Satisfação crescente na linha 0.202",
      description: "Aumento de 12% na avaliação positiva dos usuários",
      time: "Há 1 dia",
    },
  ];

  const heatmapData = [
    { ra: "Ceilândia", morning: 95, afternoon: 70, evening: 90 },
    { ra: "Taguatinga", morning: 88, afternoon: 75, evening: 85 },
    { ra: "Planaltina", morning: 92, afternoon: 65, evening: 88 },
    { ra: "Plano Piloto", morning: 70, afternoon: 80, evening: 75 },
    { ra: "Samambaia", morning: 90, afternoon: 68, evening: 87 },
    { ra: "Gama", morning: 78, afternoon: 60, evening: 80 },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="pt-20 pb-8 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="outline" className="gap-1">
                <BarChart3 className="size-3" />
                Acesso Restrito
              </Badge>
            </div>
            <h1 className="text-4xl font-bold mb-2">Dashboard Governamental</h1>
            <p className="text-gray-600">
              Visão completa e inteligente da operação de transporte público do DF
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.3 }}
              >
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className={`size-12 ${stat.bgColor} rounded-lg flex items-center justify-center`}>
                        <stat.icon className={`size-6 ${stat.color}`} />
                      </div>
                      <Badge
                        variant="outline"
                        className={
                          stat.trend === "up"
                            ? "text-green-600 border-green-200"
                            : "text-blue-600 border-blue-200"
                        }
                      >
                        {stat.change}
                      </Badge>
                    </div>
                    <div className="text-3xl font-bold mb-1">{stat.value}</div>
                    <div className="text-sm text-gray-600">{stat.title}</div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList>
              <TabsTrigger value="overview">Visão Geral</TabsTrigger>
              <TabsTrigger value="routes">Rotas</TabsTrigger>
              <TabsTrigger value="heatmap">Mapa de Calor</TabsTrigger>
              <TabsTrigger value="alerts">Alertas</TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-6">
              <div className="grid lg:grid-cols-2 gap-6">
                {/* Daily Passengers */}
                <Card>
                  <CardHeader>
                    <CardTitle>Passageiros por Dia da Semana</CardTitle>
                    <CardDescription>Milhares de passageiros</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={dailyPassengers}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="day" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="passengers" fill="#3b82f6" radius={[8, 8, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                {/* Hourly Demand */}
                <Card>
                  <CardHeader>
                    <CardTitle>Demanda por Horário</CardTitle>
                    <CardDescription>Percentual de ocupação</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <AreaChart data={hourlyDemand}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="hour" />
                        <YAxis />
                        <Tooltip />
                        <Area
                          type="monotone"
                          dataKey="demand"
                          stroke="#8b5cf6"
                          fill="#8b5cf6"
                          fillOpacity={0.6}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                {/* RA Distribution */}
                <Card>
                  <CardHeader>
                    <CardTitle>Distribuição por RA</CardTitle>
                    <CardDescription>Percentual de passageiros</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        <Pie
                          data={raDistribution}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, value }) => `${name} ${value}%`}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {raDistribution.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                {/* Route Performance Table */}
                <Card>
                  <CardHeader>
                    <CardTitle>Performance das Linhas</CardTitle>
                    <CardDescription>Top 4 linhas mais utilizadas</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {routePerformance.map((route, index) => (
                        <div key={index} className="p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <div className="font-semibold">{route.route}</div>
                              <div className="text-xs text-gray-600">{route.name}</div>
                            </div>
                            <Badge variant="outline">{route.passengers.toLocaleString()} pass/dia</Badge>
                          </div>
                          <div className="grid grid-cols-3 gap-2 text-xs">
                            <div>
                              <div className="text-gray-500">Satisfação</div>
                              <div className="font-semibold text-green-600">
                                {route.satisfaction}/10
                              </div>
                            </div>
                            <div>
                              <div className="text-gray-500">Pontualidade</div>
                              <div className="font-semibold text-blue-600">{route.onTime}%</div>
                            </div>
                            <div>
                              <div className="text-gray-500">Problemas</div>
                              <div className="font-semibold text-orange-600">{route.issues}</div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Routes Tab */}
            <TabsContent value="routes">
              <Card>
                <CardHeader>
                  <CardTitle>Análise Detalhada de Rotas</CardTitle>
                  <CardDescription>Performance e métricas por linha</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {routePerformance.map((route, index) => (
                      <div key={index} className="p-4 border border-gray-200 rounded-lg">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <Bus className="size-5 text-blue-600" />
                              <h3 className="font-bold text-lg">Linha {route.route}</h3>
                            </div>
                            <p className="text-gray-600">{route.name}</p>
                          </div>
                          <Badge className="text-lg px-4 py-2">
                            {route.passengers.toLocaleString()} pass/dia
                          </Badge>
                        </div>

                        <div className="grid grid-cols-3 gap-4">
                          <div className="text-center p-3 bg-green-50 rounded-lg">
                            <div className="text-2xl font-bold text-green-600">
                              {route.satisfaction}
                            </div>
                            <div className="text-xs text-gray-600">Satisfação</div>
                          </div>
                          <div className="text-center p-3 bg-blue-50 rounded-lg">
                            <div className="text-2xl font-bold text-blue-600">{route.onTime}%</div>
                            <div className="text-xs text-gray-600">Pontualidade</div>
                          </div>
                          <div className="text-center p-3 bg-orange-50 rounded-lg">
                            <div className="text-2xl font-bold text-orange-600">{route.issues}</div>
                            <div className="text-xs text-gray-600">Problemas/Mês</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Heatmap Tab */}
            <TabsContent value="heatmap">
              <Card>
                <CardHeader>
                  <CardTitle>Mapa de Calor - Congestionamento por RA</CardTitle>
                  <CardDescription>Níveis de lotação em diferentes horários</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left p-3 font-semibold">Região Administrativa</th>
                          <th className="text-center p-3 font-semibold">Manhã (6h-12h)</th>
                          <th className="text-center p-3 font-semibold">Tarde (12h-18h)</th>
                          <th className="text-center p-3 font-semibold">Noite (18h-22h)</th>
                        </tr>
                      </thead>
                      <tbody>
                        {heatmapData.map((row, index) => (
                          <tr key={index} className="border-b">
                            <td className="p-3 font-medium">{row.ra}</td>
                            <td className="p-3">
                              <div
                                className={`text-center py-2 rounded ${
                                  row.morning >= 90
                                    ? "bg-red-500 text-white"
                                    : row.morning >= 75
                                    ? "bg-orange-500 text-white"
                                    : "bg-green-500 text-white"
                                }`}
                              >
                                {row.morning}%
                              </div>
                            </td>
                            <td className="p-3">
                              <div
                                className={`text-center py-2 rounded ${
                                  row.afternoon >= 90
                                    ? "bg-red-500 text-white"
                                    : row.afternoon >= 75
                                    ? "bg-orange-500 text-white"
                                    : "bg-green-500 text-white"
                                }`}
                              >
                                {row.afternoon}%
                              </div>
                            </td>
                            <td className="p-3">
                              <div
                                className={`text-center py-2 rounded ${
                                  row.evening >= 90
                                    ? "bg-red-500 text-white"
                                    : row.evening >= 75
                                    ? "bg-orange-500 text-white"
                                    : "bg-green-500 text-white"
                                }`}
                              >
                                {row.evening}%
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="flex items-center justify-center gap-6 mt-6">
                    <div className="flex items-center gap-2">
                      <div className="size-4 bg-green-500 rounded"></div>
                      <span className="text-sm">Baixo (&lt;75%)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="size-4 bg-orange-500 rounded"></div>
                      <span className="text-sm">Médio (75-89%)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="size-4 bg-red-500 rounded"></div>
                      <span className="text-sm">Alto (≥90%)</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Alerts Tab */}
            <TabsContent value="alerts">
              <div className="grid lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Alertas e Recomendações da IA</CardTitle>
                    <CardDescription>Problemas detectados automaticamente</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {alerts.map((alert) => (
                        <div
                          key={alert.id}
                          className={`p-4 rounded-lg border-l-4 ${
                            alert.type === "high"
                              ? "bg-red-50 border-red-500"
                              : alert.type === "medium"
                              ? "bg-orange-50 border-orange-500"
                              : "bg-blue-50 border-blue-500"
                          }`}
                        >
                          <div className="flex items-start gap-3">
                            <AlertCircle
                              className={`size-5 flex-shrink-0 mt-0.5 ${
                                alert.type === "high"
                                  ? "text-red-600"
                                  : alert.type === "medium"
                                  ? "text-orange-600"
                                  : "text-blue-600"
                              }`}
                            />
                            <div className="flex-1">
                              <div className="font-semibold mb-1">{alert.title}</div>
                              <p className="text-sm text-gray-700 mb-2">{alert.description}</p>
                              <div className="flex items-center gap-2 text-xs text-gray-500">
                                <Clock className="size-3" />
                                {alert.time}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Sugestões de Melhoria</CardTitle>
                    <CardDescription>Recomendações baseadas em dados</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="p-4 bg-blue-50 rounded-lg">
                      <div className="flex gap-3">
                        <Activity className="size-5 text-blue-600 flex-shrink-0" />
                        <div>
                          <div className="font-semibold mb-1">Adicionar Horários de Pico</div>
                          <p className="text-sm text-gray-700">
                            Aumentar frequência da linha 0.401 entre 17h-19h pode reduzir demanda
                            reprimida em 30%.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 bg-green-50 rounded-lg">
                      <div className="flex gap-3">
                        <TrendingUp className="size-5 text-green-600 flex-shrink-0" />
                        <div>
                          <div className="font-semibold mb-1">Rota Expressa Sugerida</div>
                          <p className="text-sm text-gray-700">
                            Criar linha expressa Planaltina-Taguatinga pode economizar R$ 2M/ano em
                            subsídios.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 bg-purple-50 rounded-lg">
                      <div className="flex gap-3">
                        <MapPin className="size-5 text-purple-600 flex-shrink-0" />
                        <div>
                          <div className="font-semibold mb-1">Nova Parada Recomendada</div>
                          <p className="text-sm text-gray-700">
                            Adicionar parada intermediária em Sobradinho pode aumentar satisfação
                            em 15%.
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
