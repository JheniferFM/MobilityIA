import { Navigation } from "../components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import {
  Clock,
  Users,
  MapPin,
  ArrowRight,
  Bus,
  TrendingUp,
  AlertCircle,
  Star,
  Navigation as NavigationIcon,
} from "lucide-react";
import { motion } from "motion/react";
import { Link } from "react-router";

interface RouteOption {
  id: string;
  name: string;
  duration: string;
  transfers: number;
  crowdLevel: "low" | "medium" | "high";
  price: string;
  steps: {
    type: "walk" | "bus";
    line?: string;
    from: string;
    to: string;
    duration: string;
  }[];
  advantages: string[];
  safetyScore: number;
}

export default function RouteResult() {
  const routes: RouteOption[] = [
    {
      id: "1",
      name: "Rota Rápida (Recomendada)",
      duration: "55 min",
      transfers: 1,
      crowdLevel: "medium",
      price: "R$ 5,50",
      safetyScore: 8.5,
      advantages: ["Menos baldeações", "Horário previsível", "Rota direta"],
      steps: [
        { type: "walk", from: "Planaltina Centro", to: "Parada Norte", duration: "5 min" },
        {
          type: "bus",
          line: "0.401",
          from: "Parada Norte - Planaltina",
          to: "Terminal Asa Sul",
          duration: "35 min",
        },
        { type: "walk", from: "Terminal Asa Sul", to: "Parada 10", duration: "3 min" },
        {
          type: "bus",
          line: "0.202",
          from: "Parada 10",
          to: "Terminal Taguatinga",
          duration: "12 min",
        },
      ],
    },
    {
      id: "2",
      name: "Rota Econômica",
      duration: "1h 15min",
      transfers: 2,
      crowdLevel: "low",
      price: "R$ 5,50",
      safetyScore: 7.8,
      advantages: ["Menos lotado", "Mais barato", "Passa por menos áreas"],
      steps: [
        { type: "walk", from: "Planaltina Centro", to: "Parada Leste", duration: "8 min" },
        {
          type: "bus",
          line: "0.403",
          from: "Parada Leste - Planaltina",
          to: "Terminal Asa Norte",
          duration: "40 min",
        },
        { type: "walk", from: "Terminal Asa Norte", to: "Parada 5", duration: "5 min" },
        {
          type: "bus",
          line: "0.201",
          from: "Parada 5",
          to: "Centro Taguatinga",
          duration: "18 min",
        },
        { type: "walk", from: "Centro Taguatinga", to: "Terminal Taguatinga", duration: "4 min" },
      ],
    },
    {
      id: "3",
      name: "Rota Confortável",
      duration: "1h 05min",
      transfers: 1,
      crowdLevel: "low",
      price: "R$ 5,50",
      safetyScore: 9.0,
      advantages: ["Baixa lotação", "Mais segura", "Ônibus novos"],
      steps: [
        { type: "walk", from: "Planaltina Centro", to: "Terminal Planaltina", duration: "10 min" },
        {
          type: "bus",
          line: "0.405 Express",
          from: "Terminal Planaltina",
          to: "Terminal Samambaia",
          duration: "45 min",
        },
        { type: "walk", from: "Terminal Samambaia", to: "Parada Central", duration: "3 min" },
        {
          type: "bus",
          line: "0.200",
          from: "Parada Central",
          to: "Terminal Taguatinga",
          duration: "7 min",
        },
      ],
    },
  ];

  const getCrowdColor = (level: string) => {
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

  const getCrowdLabel = (level: string) => {
    switch (level) {
      case "low":
        return "Baixa";
      case "medium":
        return "Média";
      case "high":
        return "Alta";
      default:
        return "N/A";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="pt-20 pb-8 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <div className="flex items-center gap-2 text-gray-600 mb-2">
              <MapPin className="size-4" />
              <span className="text-sm">Planaltina → Taguatinga</span>
            </div>
            <h1 className="text-4xl font-bold mb-2">Rotas Inteligentes Inter-RAs</h1>
            <p className="text-gray-600">
              Encontramos {routes.length} opções de rota otimizadas para você
            </p>
          </div>

          <div className="grid gap-6">
            {routes.map((route, index) => (
              <motion.div
                key={route.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <Card className={index === 0 ? "border-2 border-blue-500" : ""}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <CardTitle>{route.name}</CardTitle>
                          {index === 0 && (
                            <Badge className="bg-blue-500">
                              <Star className="size-3 mr-1" />
                              Recomendada
                            </Badge>
                          )}
                        </div>
                        <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                          <div className="flex items-center gap-1">
                            <Clock className="size-4" />
                            <span>{route.duration}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <NavigationIcon className="size-4" />
                            <span>{route.transfers} baldeação(ões)</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Users className="size-4" />
                            <Badge className={`text-xs ${getCrowdColor(route.crowdLevel)}`}>
                              {getCrowdLabel(route.crowdLevel)} lotação
                            </Badge>
                          </div>
                          <div className="flex items-center gap-1">
                            <AlertCircle className="size-4" />
                            <span>Segurança: {route.safetyScore}/10</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-blue-600">{route.price}</div>
                        <div className="text-xs text-gray-500">Tarifa única</div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {/* Advantages */}
                    <div className="mb-6">
                      <div className="flex items-center gap-2 mb-2">
                        <TrendingUp className="size-4 text-green-600" />
                        <span className="text-sm font-semibold">Vantagens:</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {route.advantages.map((advantage, i) => (
                          <Badge key={i} variant="outline" className="text-xs">
                            {advantage}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Steps */}
                    <div className="space-y-3 mb-6">
                      {route.steps.map((step, stepIndex) => (
                        <div key={stepIndex} className="flex gap-3">
                          <div className="flex flex-col items-center">
                            <div
                              className={`size-8 rounded-full ${
                                step.type === "bus"
                                  ? "bg-blue-100 text-blue-600"
                                  : "bg-gray-100 text-gray-600"
                              } flex items-center justify-center flex-shrink-0`}
                            >
                              {step.type === "bus" ? (
                                <Bus className="size-4" />
                              ) : (
                                <MapPin className="size-4" />
                              )}
                            </div>
                            {stepIndex < route.steps.length - 1 && (
                              <div className="w-0.5 h-12 bg-gray-200 my-1"></div>
                            )}
                          </div>
                          <div className="flex-1 pb-4">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-semibold text-sm">
                                {step.type === "bus" ? `Linha ${step.line}` : "Caminhada"}
                              </span>
                              <Badge variant="outline" className="text-xs">
                                {step.duration}
                              </Badge>
                            </div>
                            <div className="text-sm text-gray-600">
                              {step.from}
                              <ArrowRight className="size-3 inline mx-1" />
                              {step.to}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3">
                      <Button className="flex-1">Iniciar Navegação</Button>
                      <Link to="/safety" className="flex-1">
                        <Button variant="outline" className="w-full">
                          Ver Segurança
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Additional Info */}
          <Card className="mt-6 bg-blue-50 border-blue-200">
            <CardContent className="pt-6">
              <div className="flex gap-3">
                <AlertCircle className="size-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold mb-1">Dica da IA</div>
                  <p className="text-sm text-gray-700">
                    O melhor horário para sair é às 17h30, evitando o pico das 18h. Você chegará 15
                    minutos mais cedo e encontrará ônibus menos lotados.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
