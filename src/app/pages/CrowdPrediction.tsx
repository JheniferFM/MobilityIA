import { useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Input } from "../components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Users, Clock, MapPin, Calendar, TrendingUp, AlertCircle, CheckCircle, Search } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { motion } from "motion/react";
import { busLinesData } from "../../data/busLines";

export default function CrowdPrediction() {
  const routes = busLinesData;
  const [selectedRoute, setSelectedRoute] = useState(routes[0]?.value ?? "");
  const [selectedTime, setSelectedTime] = useState("18:00");
  const [searchTerm, setSearchTerm] = useState("");

  const visibleRoutes = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();

    if (!term) {
      return routes.slice(0, 4);
    }

    return routes.filter((route) => {
      const searchableText = `${route.value} ${route.line} ${route.label}`.toLowerCase();
      return searchableText.includes(term);
    });
  }, [routes, searchTerm]);

  const currentRoute =
    routes.find((route) => route.value === selectedRoute) ??
    visibleRoutes[0] ??
    { value: "", line: "Linha", label: "Sem dados" };

  const timeSlots = [
    "06:00",
    "08:00",
    "10:00",
    "12:00",
    "14:00",
    "16:00",
    "18:00",
    "20:00",
    "22:00",
  ];

  const hashRoute = (value: string) => {
    let hash = 0;
    for (let i = 0; i < value.length; i += 1) {
      hash = (hash * 31 + value.charCodeAt(i)) >>> 0;
    }
    return hash;
  };

  const hourlyData = useMemo(() => {
    const seed = hashRoute(`${selectedRoute}-${currentRoute.label}`);
    const morningPeakHour = 7 + (seed % 3); // 07h-09h
    const eveningPeakHour = 16 + ((seed >> 2) % 4); // 16h-19h
    const middayValleyHour = 11 + ((seed >> 4) % 3); // 11h-13h

    const baseLoad = 30 + ((seed >> 6) % 16);
    const morningAmplitude = 28 + ((seed >> 8) % 20);
    const eveningAmplitude = 24 + ((seed >> 10) % 18);
    const valleyDepth = 10 + ((seed >> 12) % 10);

    const gaussian = (x: number, center: number, width: number) => {
      const distance = (x - center) / width;
      return Math.exp(-(distance * distance));
    };

    return Array.from({ length: 17 }, (_, index) => {
      const hour = index + 6;
      const morningPeak = morningAmplitude * gaussian(hour, morningPeakHour, 1.4);
      const eveningPeak = eveningAmplitude * gaussian(hour, eveningPeakHour, 1.6);
      const middayValley = valleyDepth * gaussian(hour, middayValleyHour, 1.8);
      const wave = ((seed + hour * 17) % 9) - 4;

      const adjusted = Math.max(
        10,
        Math.min(98, Math.round(baseLoad + morningPeak + eveningPeak - middayValley + wave))
      );

      return {
        hour: `${String(hour).padStart(2, "0")}h`,
        crowd: adjusted,
        label: adjusted >= 70 ? "Alta" : adjusted >= 40 ? "Média" : "Baixa",
      };
    });
  }, [currentRoute.value, selectedRoute]);

  const getLevelKey = (value: number): "low" | "medium" | "high" => {
    if (value >= 70) return "high";
    if (value >= 40) return "medium";
    return "low";
  };

  const getLevelLabel = (value: number) => {
    if (value >= 70) return "Alta Lotação";
    if (value >= 40) return "Média Lotação";
    return "Baixa Lotação";
  };

  const selectedHour = Number.parseInt(selectedTime.split(":")[0], 10);
  const selectedPoint =
    hourlyData.find((item) => Number.parseInt(item.hour, 10) === selectedHour) ?? hourlyData[0];

  const predictions = useMemo(() => {
    const startIndex = Math.max(0, timeSlots.indexOf(selectedTime));
    const horizon = timeSlots.slice(startIndex, Math.min(startIndex + 4, timeSlots.length));

    return horizon.map((time) => {
      const hour = Number.parseInt(time.split(":")[0], 10);
      const point =
        hourlyData.find((item) => Number.parseInt(item.hour, 10) === hour) ??
        hourlyData[hourlyData.length - 1];

      const level = getLevelKey(point.crowd);
      const recommendation =
        level === "high"
          ? "Evite se possível"
          : level === "medium"
          ? "Bom horário para viajar"
          : "Ótima opção para viajar";

      return {
        time,
        level,
        percentage: point.crowd,
        label: getLevelLabel(point.crowd),
        recommendation,
      };
    });
  }, [hourlyData, selectedTime, timeSlots]);

  const factors = [
    {
      icon: Clock,
      title: "Horário de Pico",
      description: "17h-19h é o período mais movimentado",
      impact: "high",
    },
    {
      icon: Calendar,
      title: "Dia da Semana",
      description: "Sextas-feiras têm 20% mais lotação",
      impact: "medium",
    },
    {
      icon: MapPin,
      title: "Eventos Próximos",
      description: "Nenhum evento detectado na região",
      impact: "low",
    },
    {
      icon: TrendingUp,
      title: "Histórico",
      description: "Baseado em 30 dias de dados",
      impact: "high",
    },
  ];

  const getBarColor = (value: number) => {
    if (value >= 70) return "#ef4444"; // red
    if (value >= 40) return "#eab308"; // yellow
    return "#22c55e"; // green
  };

  const getCrowdBadgeColor = (level: string) => {
    switch (level) {
      case "low":
        return "bg-green-100 text-green-700";
      case "medium":
        return "bg-yellow-100 text-yellow-700";
      case "high":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="pt-20 pb-8 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">Previsão de Lotação com IA</h1>
            <p className="text-gray-600">
              Saiba antes de sair qual será a lotação do seu ônibus
            </p>
          </div>

          {/* Filters */}
          <Card className="mb-6">
            <CardContent className="pt-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-semibold mb-2 block">Pesquisar Linha</label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 size-4" />
                    <Input
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      placeholder="Digite o número da linha ou rota"
                      className="pl-9"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-semibold mb-2 block">Horário Desejado</label>
                  <Select value={selectedTime} onValueChange={setSelectedTime}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {timeSlots.map((time) => (
                        <SelectItem key={time} value={time}>
                          {time}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="mt-4">
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-semibold block">Linhas Disponíveis</label>
                  <span className="text-xs text-gray-500">
                    {searchTerm.trim() ? `${visibleRoutes.length} resultado(s)` : `${Math.min(visibleRoutes.length, 4)} exibida(s)`}
                  </span>
                </div>
                <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-3">
                  {visibleRoutes.map((route) => (
                    <button
                      key={route.value}
                      type="button"
                      onClick={() => setSelectedRoute(route.value)}
                      className={`text-left rounded-lg border p-3 transition ${
                        selectedRoute === route.value
                          ? "border-blue-500 bg-blue-50"
                          : "border-gray-200 hover:border-blue-300 hover:bg-gray-50"
                      }`}
                    >
                      <div className="font-semibold text-sm">{route.line}</div>
                      <div className="text-xs text-gray-600 mt-1">{route.label}</div>
                    </button>
                  ))}
                </div>
                {searchTerm.trim() && visibleRoutes.length === 0 && (
                  <div className="text-sm text-gray-500 mt-3">
                    Nenhuma linha encontrada para a busca informada.
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Main Chart */}
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Lotação por Horário - Hoje</CardTitle>
                  <CardDescription>
                    {currentRoute.line} • {currentRoute.label} • Previsão baseada em IA
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={hourlyData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="hour" />
                      <YAxis />
                      <Tooltip
                        content={({ active, payload }) => {
                          if (active && payload && payload.length) {
                            return (
                              <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
                                <p className="font-semibold">{payload[0].payload.hour}</p>
                                <p className="text-sm text-gray-600">
                                  Lotação: {payload[0].value}%
                                </p>
                                <p className="text-sm">
                                  <Badge
                                    className={`mt-1 ${getCrowdBadgeColor(
                                      payload[0].value >= 70
                                        ? "high"
                                        : payload[0].value >= 40
                                        ? "medium"
                                        : "low"
                                    )}`}
                                  >
                                    {payload[0].payload.label}
                                  </Badge>
                                </p>
                              </div>
                            );
                          }
                          return null;
                        }}
                      />
                      <Bar dataKey="crowd" radius={[8, 8, 0, 0]}>
                        {hourlyData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={getBarColor(entry.crowd)} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Predictions Timeline */}
              <Card>
                <CardHeader>
                  <CardTitle>Próximos Horários</CardTitle>
                  <CardDescription>Previsões para os próximos ônibus</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {predictions.map((pred, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1, duration: 0.3 }}
                        className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                      >
                        <div className="flex items-center gap-4">
                          <div className="text-center">
                            <Clock className="size-6 text-gray-400 mx-auto mb-1" />
                            <div className="font-bold text-lg">{pred.time}</div>
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <Badge className={`${getCrowdBadgeColor(pred.level)}`}>
                                {pred.label}
                              </Badge>
                              <span className="text-sm text-gray-600">{pred.percentage}%</span>
                            </div>
                            <p className="text-sm text-gray-600">{pred.recommendation}</p>
                          </div>
                        </div>
                        {pred.level === "medium" && pred.time === "17:30" ? (
                          <CheckCircle className="size-6 text-green-600" />
                        ) : pred.level === "high" ? (
                          <AlertCircle className="size-6 text-red-600" />
                        ) : null}
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Current Prediction */}
              <Card className="bg-gradient-to-br from-blue-500 to-purple-500 text-white">
                <CardContent className="pt-6">
                  <div className="text-center">
                    <Users className="size-16 mx-auto mb-4 opacity-80" />
                    <div className="text-sm opacity-90 mb-2">Lotação Prevista às {selectedTime}</div>
                    <div className="text-sm font-semibold mb-1">{currentRoute.line}</div>
                    <div className="text-5xl font-bold mb-2">{selectedPoint.crowd}%</div>
                    <Badge className="bg-white/20 text-white border-white/30 mb-4">
                      {selectedPoint.crowd >= 70 ? "🔴" : selectedPoint.crowd >= 40 ? "🟡" : "🟢"} {getLevelLabel(selectedPoint.crowd)}
                    </Badge>
                    <p className="text-sm opacity-90">
                      {selectedPoint.crowd >= 70
                        ? "Recomendamos sair 30 minutos antes ou depois"
                        : selectedPoint.crowd >= 40
                        ? "Horário viável com lotação moderada"
                        : "Excelente horário para uma viagem confortável"}
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Factors */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Fatores Considerados</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {factors.map((factor, index) => (
                      <div key={index} className="flex gap-3">
                        <div
                          className={`size-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                            factor.impact === "high"
                              ? "bg-red-100 text-red-600"
                              : factor.impact === "medium"
                              ? "bg-yellow-100 text-yellow-600"
                              : "bg-green-100 text-green-600"
                          }`}
                        >
                          <factor.icon className="size-5" />
                        </div>
                        <div>
                          <div className="font-semibold text-sm">{factor.title}</div>
                          <div className="text-xs text-gray-600">{factor.description}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Tips */}
              <Card className="bg-green-50 border-green-200">
                <CardContent className="pt-6">
                  <div className="flex gap-3">
                    <TrendingUp className="size-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-semibold mb-1 text-sm">Dica da IA</div>
                      <p className="text-xs text-gray-700">
                        {currentRoute.line} tem 40% menos lotação às 17h30. Considere ajustar seu
                        horário para uma viagem mais confortável.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
