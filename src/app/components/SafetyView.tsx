import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Textarea } from "./ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import {
  Shield,
  AlertTriangle,
  MapPin,
  Users,
  Lightbulb,
  CheckCircle2,
  XCircle,
  Camera,
  Flag,
  TrendingDown,
  TrendingUp,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface Report {
  id: string;
  type: "robbery" | "lighting" | "infrastructure" | "harassment";
  location: string;
  description: string;
  date: string;
  upvotes: number;
  status: "active" | "resolved";
}

export function SafetyView() {
  const [showReportForm, setShowReportForm] = useState(false);
  const [selectedType, setSelectedType] = useState("");
  const [description, setDescription] = useState("");

  const reports: Report[] = [
    {
      id: "1",
      type: "robbery",
      location: "Parada Terminal Ceilândia - Plataforma C",
      description: "Relatos de assaltos no período noturno",
      date: "Há 2 dias",
      upvotes: 23,
      status: "active",
    },
    {
      id: "2",
      type: "lighting",
      location: "Parada QNM 36 - Ceilândia",
      description: "Iluminação precária dificulta visualização",
      date: "Há 1 semana",
      upvotes: 45,
      status: "active",
    },
    {
      id: "3",
      type: "infrastructure",
      location: "Ponto de ônibus W3 Sul Quadra 508",
      description: "Cobertura danificada, expõe passageiros à chuva",
      date: "Há 3 dias",
      upvotes: 18,
      status: "active",
    },
    {
      id: "4",
      type: "lighting",
      location: "Terminal Samambaia - Acesso Norte",
      description: "Lâmpadas queimadas no acesso",
      date: "Há 5 dias",
      upvotes: 31,
      status: "resolved",
    },
  ];

  const routes = [
    { name: "Rota 1: Planaltina → Taguatinga (via Sobradinho)", safetyScore: 85, level: "good" },
    { name: "Rota 2: Planaltina → Taguatinga (via PP)", safetyScore: 72, level: "medium" },
    { name: "Rota 3: Ceilândia → Plano Piloto", safetyScore: 68, level: "medium" },
    { name: "Rota 4: Gama → Asa Sul", safetyScore: 91, level: "good" },
    { name: "Rota 5: Samambaia → Taguatinga", safetyScore: 55, level: "low" },
  ];

  const getTypeInfo = (type: string) => {
    switch (type) {
      case "robbery":
        return { label: "Assalto", icon: AlertTriangle, color: "bg-red-100 text-red-700" };
      case "lighting":
        return { label: "Iluminação", icon: Lightbulb, color: "bg-yellow-100 text-yellow-700" };
      case "infrastructure":
        return { label: "Infraestrutura", icon: Shield, color: "bg-blue-100 text-blue-700" };
      case "harassment":
        return { label: "Assédio", icon: AlertTriangle, color: "bg-purple-100 text-purple-700" };
      default:
        return { label: "Outro", icon: Flag, color: "bg-slate-100 text-slate-700" };
    }
  };

  const getSafetyColor = (level: string) => {
    switch (level) {
      case "good":
        return "text-green-600";
      case "medium":
        return "text-yellow-600";
      case "low":
        return "text-red-600";
      default:
        return "text-slate-600";
    }
  };

  const getSafetyBg = (level: string) => {
    switch (level) {
      case "good":
        return "bg-green-600";
      case "medium":
        return "bg-yellow-600";
      case "low":
        return "bg-red-600";
      default:
        return "bg-slate-600";
    }
  };

  const handleSubmitReport = () => {
    if (!selectedType || !description.trim()) {
      toast.error("Por favor, preencha todos os campos");
      return;
    }

    toast.success("Reporte enviado com sucesso!");
    setShowReportForm(false);
    setSelectedType("");
    setDescription("");
  };

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Segurança Colaborativa</h1>
          <p className="text-lg text-slate-600">
            Ajude a comunidade reportando problemas e consultando índices de segurança
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Safety Scores */}
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-6">Índice de Segurança por Rota</h3>
              <div className="space-y-4">
                {routes.map((route, idx) => (
                  <div key={idx} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">{route.name}</span>
                      <span className={`font-bold ${getSafetyColor(route.level)}`}>
                        {route.safetyScore}/100
                      </span>
                    </div>
                    <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${getSafetyBg(route.level)} rounded-full transition-all`}
                        style={{ width: `${route.safetyScore}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-6 border-t grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <div className="w-3 h-3 bg-green-600 rounded-full"></div>
                    <span className="text-xs text-slate-600">Seguro</span>
                  </div>
                  <div className="font-semibold">85-100</div>
                </div>
                <div>
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <div className="w-3 h-3 bg-yellow-600 rounded-full"></div>
                    <span className="text-xs text-slate-600">Atenção</span>
                  </div>
                  <div className="font-semibold">60-84</div>
                </div>
                <div>
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <div className="w-3 h-3 bg-red-600 rounded-full"></div>
                    <span className="text-xs text-slate-600">Risco</span>
                  </div>
                  <div className="font-semibold">0-59</div>
                </div>
              </div>
            </Card>

            {/* Reports List */}
            <Card className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold">Reportes Recentes</h3>
                <Button onClick={() => setShowReportForm(!showReportForm)} className="gap-2">
                  <Flag className="w-4 h-4" />
                  Novo Reporte
                </Button>
              </div>

              {showReportForm && (
                <Card className="p-4 mb-6 bg-slate-50">
                  <h4 className="font-semibold mb-4">Reportar Problema</h4>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">Tipo de Problema</label>
                      <Select value={selectedType} onValueChange={setSelectedType}>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione..." />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="robbery">Assalto</SelectItem>
                          <SelectItem value="lighting">Falta de Iluminação</SelectItem>
                          <SelectItem value="infrastructure">Infraestrutura</SelectItem>
                          <SelectItem value="harassment">Assédio</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label className="text-sm font-medium mb-2 block">Descrição</label>
                      <Textarea
                        placeholder="Descreva o problema..."
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        rows={4}
                      />
                    </div>

                    <div className="flex gap-2">
                      <Button onClick={handleSubmitReport} className="flex-1">
                        Enviar Reporte
                      </Button>
                      <Button variant="outline" onClick={() => setShowReportForm(false)}>
                        Cancelar
                      </Button>
                    </div>
                  </div>
                </Card>
              )}

              <div className="space-y-4">
                {reports.map((report) => {
                  const typeInfo = getTypeInfo(report.type);
                  const TypeIcon = typeInfo.icon;

                  return (
                    <Card key={report.id} className="p-4">
                      <div className="flex items-start gap-4">
                        <div className={`w-10 h-10 rounded-lg ${typeInfo.color} flex items-center justify-center flex-shrink-0`}>
                          <TypeIcon className="w-5 h-5" />
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2 mb-2">
                            <div className="flex items-center gap-2 flex-wrap">
                              <Badge variant="outline">{typeInfo.label}</Badge>
                              {report.status === "resolved" && (
                                <Badge className="bg-green-600">
                                  <CheckCircle2 className="w-3 h-3 mr-1" />
                                  Resolvido
                                </Badge>
                              )}
                            </div>
                            <span className="text-xs text-slate-500 whitespace-nowrap">{report.date}</span>
                          </div>

                          <div className="flex items-start gap-2 mb-2">
                            <MapPin className="w-4 h-4 text-slate-400 mt-0.5 flex-shrink-0" />
                            <span className="font-semibold text-sm">{report.location}</span>
                          </div>

                          <p className="text-sm text-slate-600 mb-3">{report.description}</p>

                          <div className="flex items-center gap-4">
                            <Button variant="ghost" size="sm" className="gap-2 h-8">
                              <TrendingUp className="w-4 h-4" />
                              <span className="text-xs">{report.upvotes} confirmações</span>
                            </Button>
                            <Button variant="ghost" size="sm" className="gap-2 h-8">
                              <Camera className="w-4 h-4" />
                              <span className="text-xs">Adicionar foto</span>
                            </Button>
                          </div>
                        </div>
                      </div>
                    </Card>
                  );
                })}
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Stats */}
            <Card className="p-6">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <Shield className="w-5 h-5" />
                Estatísticas Gerais
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-600">Reportes ativos</span>
                  <span className="font-semibold">127</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-600">Resolvidos este mês</span>
                  <span className="font-semibold text-green-600">89</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-600">Índice médio DF</span>
                  <span className="font-semibold text-blue-600">76/100</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-600">Participantes</span>
                  <span className="font-semibold">2,847</span>
                </div>
              </div>
            </Card>

            {/* Top Issues */}
            <Card className="p-6">
              <h3 className="font-semibold mb-4">Problemas Mais Reportados</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Lightbulb className="w-4 h-4 text-yellow-600" />
                    <span className="text-sm">Iluminação</span>
                  </div>
                  <span className="text-sm font-semibold">45%</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Shield className="w-4 h-4 text-blue-600" />
                    <span className="text-sm">Infraestrutura</span>
                  </div>
                  <span className="text-sm font-semibold">32%</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-red-600" />
                    <span className="text-sm">Assaltos</span>
                  </div>
                  <span className="text-sm font-semibold">18%</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Flag className="w-4 h-4 text-purple-600" />
                    <span className="text-sm">Outros</span>
                  </div>
                  <span className="text-sm font-semibold">5%</span>
                </div>
              </div>
            </Card>

            {/* Improvement */}
            <Card className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
              <div className="flex items-start gap-3">
                <TrendingDown className="w-6 h-6 text-green-600 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold mb-2">Melhoria Contínua</h3>
                  <p className="text-sm text-slate-700 mb-2">
                    Os reportes diminuíram <strong>23%</strong> nos últimos 3 meses.
                  </p>
                  <p className="text-sm text-slate-700">
                    Sua colaboração faz a diferença!
                  </p>
                </div>
              </div>
            </Card>

            {/* How it works */}
            <Card className="p-6 bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200">
              <h3 className="font-semibold mb-3">Como Funciona</h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span>Reporte problemas de segurança</span>
                </div>
                <div className="flex items-start gap-2">
                  <Users className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span>Comunidade valida reportes</span>
                </div>
                <div className="flex items-start gap-2">
                  <Shield className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span>IA calcula índice de segurança</span>
                </div>
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span>Rotas são ajustadas automaticamente</span>
                </div>
              </div>
            </Card>

            {/* Emergency */}
            <Card className="p-6 bg-gradient-to-br from-red-50 to-orange-50 border-red-200">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-6 h-6 text-red-600 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold mb-2">Emergência?</h3>
                  <p className="text-sm text-slate-700 mb-3">
                    Em caso de emergência, ligue para a polícia: <strong>190</strong>
                  </p>
                  <Button variant="destructive" size="sm" className="w-full">
                    Ligar Agora
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
