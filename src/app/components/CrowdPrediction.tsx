import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { TrendingUp, Clock, Bus, Users, AlertCircle, CheckCircle2, Calendar } from "lucide-react";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { useState } from "react";
import { busLinesData } from "../../data/busLines";

export function CrowdPrediction() {
  const busLines = busLinesData;
  const [selectedLine, setSelectedLine] = useState(busLines[0]?.value ?? "");
  const [selectedDay, setSelectedDay] = useState("weekday");

  const hourlyData = [
    { hour: "6h", crowd: 85, passengers: 450 },
    { hour: "7h", crowd: 95, passengers: 520 },
    { hour: "8h", crowd: 98, passengers: 580 },
    { hour: "9h", crowd: 75, passengers: 380 },
    { hour: "10h", crowd: 45, passengers: 220 },
    { hour: "11h", crowd: 40, passengers: 190 },
    { hour: "12h", crowd: 60, passengers: 310 },
    { hour: "13h", crowd: 55, passengers: 280 },
    { hour: "14h", crowd: 42, passengers: 210 },
    { hour: "15h", crowd: 48, passengers: 240 },
    { hour: "16h", crowd: 65, passengers: 340 },
    { hour: "17h", crowd: 88, passengers: 470 },
    { hour: "18h", crowd: 92, passengers: 510 },
    { hour: "19h", crowd: 80, passengers: 420 },
    { hour: "20h", crowd: 55, passengers: 280 },
    { hour: "21h", crowd: 38, passengers: 180 },
  ];

  const weeklyData = [
    { day: "Seg", avgCrowd: 82, trips: 145 },
    { day: "Ter", avgCrowd: 85, trips: 148 },
    { day: "Qua", avgCrowd: 83, trips: 146 },
    { day: "Qui", avgCrowd: 86, trips: 150 },
    { day: "Sex", avgCrowd: 88, trips: 152 },
    { day: "Sáb", avgCrowd: 45, trips: 95 },
    { day: "Dom", avgCrowd: 32, trips: 72 },
  ];

  const currentTime = new Date().getHours();
  const currentCrowd = hourlyData.find(d => parseInt(d.hour) === currentTime)?.crowd || 50;

  const getCrowdLevel = (crowd: number) => {
    if (crowd < 50) return { label: "Baixa", color: "bg-green-600", textColor: "text-green-600" };
    if (crowd < 75) return { label: "Média", color: "bg-yellow-600", textColor: "text-yellow-600" };
    return { label: "Alta", color: "bg-red-600", textColor: "text-red-600" };
  };

  const currentLevel = getCrowdLevel(currentCrowd);


  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Previsão de Lotação com IA</h1>
          <p className="text-lg text-slate-600">
            Dados históricos e em tempo real para planejar sua viagem
          </p>
        </div>

        {/* Filters */}
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <Card className="p-4">
            <label className="text-sm font-semibold mb-2 block">Linha</label>
            <Select value={selectedLine} onValueChange={setSelectedLine}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {busLines.map((line) => (
                  <SelectItem key={line.value} value={line.value}>
                    {line.line}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Card>

          <Card className="p-4">
            <label className="text-sm font-semibold mb-2 block">Tipo de Dia</label>
            <Select value={selectedDay} onValueChange={setSelectedDay}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="weekday">Dia de Semana</SelectItem>
                <SelectItem value="weekend">Fim de Semana</SelectItem>
                <SelectItem value="holiday">Feriado</SelectItem>
              </SelectContent>
            </Select>
          </Card>

          <Card className={`p-4 ${currentLevel.color} text-white`}>
            <div className="flex items-center gap-2 mb-1">
              <TrendingUp className="w-5 h-5" />
              <span className="text-sm font-semibold">Lotação Atual</span>
            </div>
            <div className="text-3xl font-bold">{currentCrowd}%</div>
            <div className="text-sm opacity-90">{currentLevel.label}</div>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Chart */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-6">Previsão por Horário</h3>
              <ResponsiveContainer width="100%" height={350}>
                <LineChart data={hourlyData}>
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
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="crowd"
                    stroke="#3b82f6"
                    strokeWidth={3}
                    name="Lotação (%)"
                    dot={{ fill: "#3b82f6", r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>

              <div className="mt-6 grid grid-cols-3 gap-4 pt-4 border-t">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">10h-14h</div>
                  <p className="text-sm text-slate-600">Melhor Período</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-red-600">7h-8h</div>
                  <p className="text-sm text-slate-600">Pico da Manhã</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-red-600">17h-19h</div>
                  <p className="text-sm text-slate-600">Pico da Tarde</p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-6">Lotação Média Semanal</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={weeklyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="day" stroke="#64748b" />
                  <YAxis stroke="#64748b" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "white",
                      border: "1px solid #e2e8f0",
                      borderRadius: "8px",
                    }}
                  />
                  <Legend />
                  <Bar dataKey="avgCrowd" fill="#3b82f6" name="Lotação Média (%)" />
                </BarChart>
              </ResponsiveContainer>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Current Status */}
            <Card className="p-6">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <Bus className="w-5 h-5" />
                Status em Tempo Real
              </h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-slate-600">Ônibus operando</span>
                    <span className="font-semibold">24/28</span>
                  </div>
                  <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-green-600 rounded-full" style={{ width: "86%" }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-slate-600">Ocupação média</span>
                    <span className={`font-semibold ${currentLevel.textColor}`}>{currentCrowd}%</span>
                  </div>
                  <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div className={`h-full ${currentLevel.color} rounded-full`} style={{ width: `${currentCrowd}%` }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-slate-600">Intervalo médio</span>
                    <span className="font-semibold">12 min</span>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-slate-600">Passageiros/hora</span>
                    <span className="font-semibold">~310</span>
                  </div>
                </div>
              </div>
            </Card>

            {/* Recommendations */}
            <Card className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold mb-2">Melhor Horário</h3>
                  <p className="text-sm text-slate-700 mb-3">
                    Para viajar com conforto, prefira sair entre <strong>10h e 14h</strong> 
                    ou após as <strong>20h</strong>.
                  </p>
                  <p className="text-sm text-slate-700">
                    Lotação prevista: <strong className="text-green-700">~40%</strong>
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-200">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-6 h-6 text-orange-600 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold mb-2">Evite os Picos</h3>
                  <p className="text-sm text-slate-700 mb-3">
                    <strong>7h-8h30</strong> e <strong>17h-19h</strong> são os horários 
                    mais lotados, com ocupação superior a 90%.
                  </p>
                  <p className="text-sm text-slate-700">
                    Considere sair 30 min mais cedo ou mais tarde.
                  </p>
                </div>
              </div>
            </Card>

            {/* Quick Stats */}
            <Card className="p-6">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                Estatísticas da Linha
              </h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-600">Viagens/dia</span>
                  <span className="font-semibold">146</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Passageiros/dia</span>
                  <span className="font-semibold">~4,200</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Pontualidade</span>
                  <span className="font-semibold text-green-600">89%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Satisfação</span>
                  <span className="font-semibold text-blue-600">4.2/5.0</span>
                </div>
              </div>
            </Card>

            {/* AI Insights */}
            <Card className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
              <div className="flex items-start gap-3">
                <Users className="w-6 h-6 text-purple-600 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold mb-2">Insight da IA</h3>
                  <p className="text-sm text-slate-700">
                    Baseado em <strong>6 meses de dados</strong>, a lotação 
                    desta linha reduziu 18% após implementação de rotas alternativas.
                  </p>
                </div>
              </div>
            </Card>

            {/* Action Button */}
            <Button className="w-full gap-2">
              <Clock className="w-4 h-4" />
              Receber Alertas de Lotação
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
