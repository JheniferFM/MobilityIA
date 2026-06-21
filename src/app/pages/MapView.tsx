import { useState } from "react";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { QrCode, MapPin, Clock, Users, AlertCircle, Info } from "lucide-react";
import { motion } from "motion/react";

interface BusStop {
  id: string;
  name: string;
  ra: string;
  position: { top: string; left: string };
  routes: string[];
  nextBus: string;
  crowdLevel: "low" | "medium" | "high";
  safetyScore: number;
}

export default function MapView() {
  const [selectedStop, setSelectedStop] = useState<BusStop | null>(null);

  const busStops: BusStop[] = [
    {
      id: "1",
      name: "Parada Central - Plano Piloto",
      ra: "Plano Piloto",
      position: { top: "50%", left: "50%" },
      routes: ["0.100", "0.101", "0.102"],
      nextBus: "5 min",
      crowdLevel: "high",
      safetyScore: 8.5,
    },
    {
      id: "2",
      name: "Parada Principal - Taguatinga",
      ra: "Taguatinga",
      position: { top: "45%", left: "35%" },
      routes: ["0.200", "0.201", "0.202"],
      nextBus: "3 min",
      crowdLevel: "medium",
      safetyScore: 7.8,
    },
    {
      id: "3",
      name: "Terminal - Ceilândia",
      ra: "Ceilândia",
      position: { top: "40%", left: "25%" },
      routes: ["0.300", "0.301", "0.302"],
      nextBus: "8 min",
      crowdLevel: "high",
      safetyScore: 6.5,
    },
    {
      id: "4",
      name: "Parada Norte - Planaltina",
      ra: "Planaltina",
      position: { top: "20%", left: "65%" },
      routes: ["0.400", "0.401"],
      nextBus: "12 min",
      crowdLevel: "low",
      safetyScore: 7.2,
    },
    {
      id: "5",
      name: "Terminal - Samambaia",
      ra: "Samambaia",
      position: { top: "55%", left: "20%" },
      routes: ["0.500", "0.501", "0.502"],
      nextBus: "6 min",
      crowdLevel: "medium",
      safetyScore: 7.0,
    },
    {
      id: "6",
      name: "Parada Sul - Gama",
      ra: "Gama",
      position: { top: "75%", left: "55%" },
      routes: ["0.600", "0.601"],
      nextBus: "15 min",
      crowdLevel: "low",
      safetyScore: 8.0,
    },
  ];

  const getCrowdColor = (level: string) => {
    switch (level) {
      case "low":
        return "bg-green-500";
      case "medium":
        return "bg-yellow-500";
      case "high":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  const getCrowdLabel = (level: string) => {
    switch (level) {
      case "low":
        return "Baixa Lotação";
      case "medium":
        return "Média Lotação";
      case "high":
        return "Alta Lotação";
      default:
        return "Desconhecido";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="pt-20 pb-8 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">Mapa Interativo do DF</h1>
            <p className="text-gray-600">
              Clique nas paradas para escanear o QR Code e ver informações em tempo real
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Map */}
            <div className="lg:col-span-2">
              <Card className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="relative w-full h-[600px] bg-gradient-to-br from-blue-100 to-green-100">
                    {/* Simplified DF Map Background */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-10">
                      <MapPin className="size-64" />
                    </div>

                    {/* Bus Stops */}
                    {busStops.map((stop) => (
                      <motion.div
                        key={stop.id}
                        className="absolute cursor-pointer"
                        style={{
                          top: stop.position.top,
                          left: stop.position.left,
                          transform: "translate(-50%, -50%)",
                        }}
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setSelectedStop(stop)}
                      >
                        <div className="relative">
                          <div
                            className={`size-6 ${getCrowdColor(
                              stop.crowdLevel
                            )} rounded-full border-4 border-white shadow-lg`}
                          ></div>
                          {selectedStop?.id === stop.id && (
                            <div className="absolute top-8 left-1/2 -translate-x-1/2 whitespace-nowrap">
                              <Badge variant="default">{stop.name}</Badge>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    ))}

                    {/* Legend */}
                    <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm rounded-lg p-4 shadow-lg">
                      <div className="font-semibold mb-2 text-sm">Legenda de Lotação</div>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm">
                          <div className="size-4 bg-green-500 rounded-full"></div>
                          <span>Baixa</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <div className="size-4 bg-yellow-500 rounded-full"></div>
                          <span>Média</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <div className="size-4 bg-red-500 rounded-full"></div>
                          <span>Alta</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Stop Details */}
            <div className="lg:col-span-1">
              {selectedStop ? (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card>
                    <CardContent className="pt-6">
                      <div className="text-center mb-6">
                        <div className="size-32 bg-white border-4 border-gray-200 rounded-lg mx-auto mb-4 flex items-center justify-center">
                          <QrCode className="size-20 text-gray-400" />
                        </div>
                        <p className="text-sm text-gray-500 mb-2">Escaneie o QR Code</p>
                      </div>

                      <h3 className="font-bold text-lg mb-1">{selectedStop.name}</h3>
                      <p className="text-sm text-gray-500 mb-6">{selectedStop.ra}</p>

                      <div className="space-y-4">
                        {/* Next Bus */}
                        <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                          <Clock className="size-5 text-blue-600 mt-0.5" />
                          <div>
                            <div className="font-semibold text-sm">Próximo Ônibus</div>
                            <div className="text-2xl font-bold text-blue-600">
                              {selectedStop.nextBus}
                            </div>
                          </div>
                        </div>

                        {/* Crowd Level */}
                        <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                          <Users className="size-5 text-gray-600 mt-0.5" />
                          <div className="flex-1">
                            <div className="font-semibold text-sm mb-2">Lotação Prevista</div>
                            <Badge
                              className={`${getCrowdColor(selectedStop.crowdLevel)} text-white`}
                            >
                              {getCrowdLabel(selectedStop.crowdLevel)}
                            </Badge>
                          </div>
                        </div>

                        {/* Safety Score */}
                        <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
                          <AlertCircle className="size-5 text-green-600 mt-0.5" />
                          <div>
                            <div className="font-semibold text-sm">Índice de Segurança</div>
                            <div className="text-2xl font-bold text-green-600">
                              {selectedStop.safetyScore}/10
                            </div>
                          </div>
                        </div>

                        {/* Routes */}
                        <div>
                          <div className="font-semibold text-sm mb-2 flex items-center gap-2">
                            <Info className="size-4" />
                            Linhas Disponíveis
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {selectedStop.routes.map((route) => (
                              <Badge key={route} variant="outline">
                                {route}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>

                      <Button className="w-full mt-6">Ver Todas as Informações</Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ) : (
                <Card>
                  <CardContent className="pt-6 text-center text-gray-500">
                    <MapPin className="size-16 mx-auto mb-4 text-gray-300" />
                    <p>Selecione uma parada no mapa para ver mais informações</p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
