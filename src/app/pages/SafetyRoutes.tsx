import { useState } from "react";
import { Navigation } from "../components/Navigation";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Textarea } from "../components/ui/textarea";
import { Label } from "../components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import {
  Shield,
  AlertTriangle,
  MapPin,
  Clock,
  Users,
  LightbulbOff,
  Ban,
  Camera,
  CheckCircle,
  TrendingUp,
  Route,
} from "lucide-react";
import { motion } from "motion/react";
import { toast } from "sonner";

interface Incident {
  id: string;
  type: "assault" | "lighting" | "infrastructure" | "harassment";
  location: string;
  route: string;
  time: string;
  reports: number;
  severity: "low" | "medium" | "high";
}

interface SafetyRoute {
  id: string;
  name: string;
  safetyScore: number;
  incidents: number;
  hasLighting: boolean;
  hasCameras: boolean;
  patrolled: boolean;
}

export default function SafetyRoutes() {
  const [showReportForm, setShowReportForm] = useState(false);
  const [incidentType, setIncidentType] = useState("");
  const [description, setDescription] = useState("");

  const incidents: Incident[] = [
    {
      id: "1",
      type: "lighting",
      location: "Parada Norte - Planaltina",
      route: "0.401",
      time: "Há 2 horas",
      reports: 5,
      severity: "medium",
    },
    {
      id: "2",
      type: "assault",
      location: "Terminal Ceilândia",
      route: "0.300",
      time: "Há 1 dia",
      reports: 12,
      severity: "high",
    },
    {
      id: "3",
      type: "infrastructure",
      location: "Parada Central - Taguatinga",
      route: "0.202",
      time: "Há 3 dias",
      reports: 3,
      severity: "low",
    },
    {
      id: "4",
      type: "harassment",
      location: "Terminal Asa Sul",
      route: "0.100",
      time: "Há 5 horas",
      reports: 8,
      severity: "high",
    },
  ];

  const safetyRoutes: SafetyRoute[] = [
    {
      id: "1",
      name: "Plano Piloto ↔ Taguatinga",
      safetyScore: 8.5,
      incidents: 2,
      hasLighting: true,
      hasCameras: true,
      patrolled: true,
    },
    {
      id: "2",
      name: "Planaltina ↔ Plano Piloto",
      safetyScore: 7.2,
      incidents: 5,
      hasLighting: false,
      hasCameras: true,
      patrolled: false,
    },
    {
      id: "3",
      name: "Ceilândia ↔ Rodoviária",
      safetyScore: 6.5,
      incidents: 12,
      hasLighting: true,
      hasCameras: false,
      patrolled: true,
    },
    {
      id: "4",
      name: "Gama ↔ Plano Piloto",
      safetyScore: 8.0,
      incidents: 3,
      hasLighting: true,
      hasCameras: true,
      patrolled: false,
    },
  ];

  const incidentTypes = [
    { value: "assault", label: "Assalto/Roubo", icon: AlertTriangle },
    { value: "lighting", label: "Falta de Iluminação", icon: LightbulbOff },
    { value: "infrastructure", label: "Infraestrutura Precária", icon: Ban },
    { value: "harassment", label: "Assédio", icon: Users },
  ];

  const getIncidentIcon = (type: string) => {
    const incident = incidentTypes.find((i) => i.value === type);
    return incident ? incident.icon : AlertTriangle;
  };

  const getIncidentLabel = (type: string) => {
    const incident = incidentTypes.find((i) => i.value === type);
    return incident ? incident.label : type;
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "low":
        return "bg-yellow-100 text-yellow-700 border-yellow-200";
      case "medium":
        return "bg-orange-100 text-orange-700 border-orange-200";
      case "high":
        return "bg-red-100 text-red-700 border-red-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const getSafetyColor = (score: number) => {
    if (score >= 8) return "text-green-600";
    if (score >= 6) return "text-yellow-600";
    return "text-red-600";
  };

  const handleSubmitReport = () => {
    if (!incidentType || !description) {
      toast.error("Preencha todos os campos");
      return;
    }

    toast.success("Obrigado! Seu reporte foi enviado às autoridades competentes.");
    setShowReportForm(false);
    setIncidentType("");
    setDescription("");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="pt-20 pb-8 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">Segurança Colaborativa</h1>
            <p className="text-gray-600">
              Veja o índice de segurança das rotas e ajude reportando incidentes
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-6">
              {/* Safety Routes */}
              <Card>
                <CardHeader>
                  <CardTitle>Rotas e Índices de Segurança</CardTitle>
                  <CardDescription>
                    Baseado em reportes da comunidade e dados oficiais
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {safetyRoutes.map((route, index) => (
                      <motion.div
                        key={route.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1, duration: 0.3 }}
                        className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <Route className="size-4 text-gray-500" />
                              <h3 className="font-semibold">{route.name}</h3>
                            </div>
                            <div className="text-sm text-gray-600">
                              {route.incidents} incidente(s) reportado(s)
                            </div>
                          </div>
                          <div className="text-center">
                            <div
                              className={`text-3xl font-bold ${getSafetyColor(
                                route.safetyScore
                              )}`}
                            >
                              {route.safetyScore}
                            </div>
                            <div className="text-xs text-gray-500">Score</div>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-2">
                          {route.hasLighting && (
                            <Badge variant="outline" className="text-xs gap-1">
                              <CheckCircle className="size-3" />
                              Iluminada
                            </Badge>
                          )}
                          {route.hasCameras && (
                            <Badge variant="outline" className="text-xs gap-1">
                              <Camera className="size-3" />
                              Câmeras
                            </Badge>
                          )}
                          {route.patrolled && (
                            <Badge variant="outline" className="text-xs gap-1">
                              <Shield className="size-3" />
                              Patrulhada
                            </Badge>
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Recent Incidents */}
              <Card>
                <CardHeader>
                  <CardTitle>Incidentes Reportados Recentemente</CardTitle>
                  <CardDescription>Últimas ocorrências reportadas pela comunidade</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {incidents.map((incident, index) => {
                      const IncidentIcon = getIncidentIcon(incident.type);
                      return (
                        <motion.div
                          key={incident.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1, duration: 0.3 }}
                          className="flex gap-3 p-3 bg-gray-50 rounded-lg"
                        >
                          <div
                            className={`size-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                              incident.severity === "high"
                                ? "bg-red-100 text-red-600"
                                : incident.severity === "medium"
                                ? "bg-orange-100 text-orange-600"
                                : "bg-yellow-100 text-yellow-600"
                            }`}
                          >
                            <IncidentIcon className="size-5" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-start justify-between mb-1">
                              <div>
                                <div className="font-semibold text-sm">
                                  {getIncidentLabel(incident.type)}
                                </div>
                                <div className="flex items-center gap-2 text-xs text-gray-500">
                                  <MapPin className="size-3" />
                                  {incident.location}
                                </div>
                              </div>
                              <Badge className={`text-xs ${getSeverityColor(incident.severity)}`}>
                                {incident.reports} reportes
                              </Badge>
                            </div>
                            <div className="flex items-center gap-4 text-xs text-gray-500 mt-2">
                              <div className="flex items-center gap-1">
                                <Clock className="size-3" />
                                {incident.time}
                              </div>
                              <div className="flex items-center gap-1">
                                <Route className="size-3" />
                                Linha {incident.route}
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Report Form */}
            <div className="space-y-6">
              {!showReportForm ? (
                <Card className="bg-gradient-to-br from-red-500 to-orange-500 text-white">
                  <CardContent className="pt-6 text-center">
                    <AlertTriangle className="size-16 mx-auto mb-4 opacity-90" />
                    <h3 className="text-xl font-bold mb-2">Viu algo suspeito?</h3>
                    <p className="text-sm opacity-90 mb-6">
                      Reporte incidentes e ajude a tornar o transporte público mais seguro para
                      todos
                    </p>
                    <Button
                      className="w-full bg-white text-red-600 hover:bg-gray-100"
                      onClick={() => setShowReportForm(true)}
                    >
                      Reportar Incidente
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                <Card>
                  <CardHeader>
                    <CardTitle>Reportar Incidente</CardTitle>
                    <CardDescription>
                      Sua contribuição ajuda a melhorar a segurança
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="incident-type">Tipo de Incidente</Label>
                      <Select value={incidentType} onValueChange={setIncidentType}>
                        <SelectTrigger id="incident-type">
                          <SelectValue placeholder="Selecione..." />
                        </SelectTrigger>
                        <SelectContent>
                          {incidentTypes.map((type) => (
                            <SelectItem key={type.value} value={type.value}>
                              {type.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="description">Descrição</Label>
                      <Textarea
                        id="description"
                        placeholder="Descreva o que aconteceu..."
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        rows={4}
                      />
                    </div>

                    <div className="flex gap-2">
                      <Button onClick={handleSubmitReport} className="flex-1">
                        Enviar Reporte
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => setShowReportForm(false)}
                        className="flex-1"
                      >
                        Cancelar
                      </Button>
                    </div>

                    <div className="text-xs text-gray-500 p-3 bg-gray-50 rounded-lg">
                      <Shield className="size-4 inline mr-1" />
                      Seu reporte é anônimo e será enviado às autoridades competentes.
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Stats */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Estatísticas da Comunidade</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Users className="size-5 text-blue-600" />
                      <span className="text-sm">Usuários Ativos</span>
                    </div>
                    <span className="font-bold text-xl">1.2K</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="size-5 text-orange-600" />
                      <span className="text-sm">Reportes este mês</span>
                    </div>
                    <span className="font-bold text-xl">48</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="size-5 text-green-600" />
                      <span className="text-sm">Problemas resolvidos</span>
                    </div>
                    <span className="font-bold text-xl">32</span>
                  </div>
                </CardContent>
              </Card>

              {/* Tips */}
              <Card className="bg-blue-50 border-blue-200">
                <CardContent className="pt-6">
                  <div className="flex gap-3">
                    <TrendingUp className="size-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-semibold mb-1 text-sm">Dica de Segurança</div>
                      <p className="text-xs text-gray-700">
                        Evite usar o celular próximo às janelas e portas. Sempre que possível,
                        escolha rotas com maior índice de segurança.
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
