import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Avatar, AvatarFallback } from "../components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../components/ui/dialog";
import {
  Car,
  Users,
  MapPin,
  Clock,
  DollarSign,
  Star,
  Calendar,
  Shield,
  MessageCircle,
  TrendingDown,
  Leaf,
  CheckCircle,
  ArrowRight,
} from "lucide-react";
import { motion } from "motion/react";
import { toast } from "sonner";

interface CarpoolOffer {
  id: string;
  driver: {
    name: string;
    rating: number;
    trips: number;
    verified: boolean;
  };
  from: string;
  to: string;
  departure: string;
  date: string;
  availableSeats: number;
  pricePerPerson: number;
  route: string[];
  carModel: string;
  amenities: string[];
}

const INITIAL_OFFERS: CarpoolOffer[] = [
    {
      id: "1",
      driver: {
        name: "João Silva",
        rating: 4.9,
        trips: 127,
        verified: true,
      },
      from: "Planaltina Centro",
      to: "Taguatinga Shopping",
      departure: "17:30",
      date: "2026-06-18",
      availableSeats: 3,
      pricePerPerson: 8.5,
      route: ["Planaltina Centro", "Sobradinho", "Asa Norte", "Taguatinga Shopping"],
      carModel: "Honda Civic 2022",
      amenities: ["AC", "Música", "Bagagem"],
    },
    {
      id: "2",
      driver: {
        name: "Maria Santos",
        rating: 5.0,
        trips: 203,
        verified: true,
      },
      from: "Planaltina",
      to: "Centro Taguatinga",
      departure: "18:00",
      date: "2026-06-18",
      availableSeats: 2,
      pricePerPerson: 7.0,
      route: ["Planaltina", "Sobradinho II", "Samambaia", "Centro Taguatinga"],
      carModel: "Toyota Corolla 2023",
      amenities: ["AC", "Wi-Fi", "Música"],
    },
    {
      id: "3",
      driver: {
        name: "Pedro Costa",
        rating: 4.7,
        trips: 89,
        verified: true,
      },
      from: "Planaltina Norte",
      to: "Taguatinga Sul",
      departure: "17:45",
      date: "2026-06-18",
      availableSeats: 4,
      pricePerPerson: 6.5,
      route: ["Planaltina Norte", "Planaltina Sul", "Asa Sul", "Taguatinga Sul"],
      carModel: "Hyundai HB20 2021",
      amenities: ["AC", "Bagagem"],
    },
  ];

export default function SmartCarpooling() {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchFrom, setSearchFrom] = useState("Planaltina");
  const [searchTo, setSearchTo] = useState("Taguatinga");
  const [searchDate, setSearchDate] = useState("2026-06-18");
  const [offers, setOffers] = useState<CarpoolOffer[]>(INITIAL_OFFERS);
  const [isOfferDialogOpen, setIsOfferDialogOpen] = useState(false);
  const [offerForm, setOfferForm] = useState({
    driverName: "",
    from: "",
    to: "",
    date: "",
    time: "",
    seats: "3",
    price: "8",
  });

  useEffect(() => {
    if (location.pathname === "/oferecer-caronas") {
      setIsOfferDialogOpen(true);
    }
  }, [location.pathname]);

  const stats = [
    {
      icon: TrendingDown,
      title: "Economia Média",
      value: "45%",
      description: "vs. transporte individual",
    },
    {
      icon: Leaf,
      title: "CO₂ Reduzido",
      value: "2.3 ton",
      description: "Este mês",
    },
    {
      icon: Users,
      title: "Usuários Ativos",
      value: "3.2K",
      description: "No Distrito Federal",
    },
    {
      icon: Car,
      title: "Caronas Realizadas",
      value: "847",
      description: "Última semana",
    },
  ];

  const benefits = [
    "Divisão automática de custos",
    "Motoristas verificados",
    "Rotas otimizadas por IA",
    "Sistema de avaliações",
    "Seguro incluído",
    "Chat integrado",
  ];

  const handleRequestCarpool = (offerId: string) => {
    toast.success("Solicitação enviada! O motorista receberá sua mensagem.");
  };

  const handleOfferFormChange = (field: keyof typeof offerForm, value: string) => {
    setOfferForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleOfferRide = () => {
    const { driverName, from, to, date, time, seats, price } = offerForm;

    if (!driverName || !from || !to || !date || !time) {
      toast.error("Preencha todos os campos obrigatórios para oferecer a carona.");
      return;
    }

    const parsedSeats = Number.parseInt(seats, 10);
    const parsedPrice = Number.parseFloat(price);

    if (!Number.isFinite(parsedSeats) || parsedSeats < 1 || parsedSeats > 6) {
      toast.error("Informe um número de vagas entre 1 e 6.");
      return;
    }

    if (!Number.isFinite(parsedPrice) || parsedPrice <= 0) {
      toast.error("Informe um valor por passageiro válido.");
      return;
    }

    const departureDate = new Date(`${date}T${time}`);
    const departureLabel = `${departureDate.toLocaleDateString("pt-BR")}, ${time}`;

    const newOffer: CarpoolOffer = {
      id: String(Date.now()),
      driver: {
        name: driverName,
        rating: 5.0,
        trips: 0,
        verified: false,
      },
      from,
      to,
      departure: time,
      date,
      availableSeats: parsedSeats,
      pricePerPerson: parsedPrice,
      route: [from, to],
      carModel: "Veículo pessoal",
      amenities: ["AC"],
    };

    setOffers((prev) => [newOffer, ...prev]);
    setIsOfferDialogOpen(false);
    setOfferForm({
      driverName: "",
      from: "",
      to: "",
      date: "",
      time: "",
      seats: "3",
      price: "8",
    });
    toast.success("Carona oferecida com sucesso! Sua oferta já aparece na lista.");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="pt-20 pb-8 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">Caronas Inteligentes</h1>
            <p className="text-gray-600">
              Compartilhe trajetos, economize dinheiro e ajude o meio ambiente
            </p>
          </div>

          {/* Stats */}
          <div className="grid md:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.3 }}
              >
                <Card>
                  <CardContent className="pt-6 text-center">
                    <stat.icon className="size-10 mx-auto mb-3 text-blue-600" />
                    <div className="text-3xl font-bold mb-1">{stat.value}</div>
                    <div className="text-sm font-semibold text-gray-900 mb-1">{stat.title}</div>
                    <div className="text-xs text-gray-600">{stat.description}</div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Search and Results */}
            <div className="lg:col-span-2 space-y-6">
              {/* Search Card */}
              <Card>
                <CardHeader>
                  <CardTitle>Buscar Carona</CardTitle>
                  <CardDescription>Encontre pessoas indo para o mesmo destino</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="from">Saindo de</Label>
                      <Select value={searchFrom} onValueChange={setSearchFrom}>
                        <SelectTrigger id="from">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Planaltina">Planaltina</SelectItem>
                          <SelectItem value="Ceilândia">Ceilândia</SelectItem>
                          <SelectItem value="Taguatinga">Taguatinga</SelectItem>
                          <SelectItem value="Gama">Gama</SelectItem>
                          <SelectItem value="Samambaia">Samambaia</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="to">Indo para</Label>
                      <Select value={searchTo} onValueChange={setSearchTo}>
                        <SelectTrigger id="to">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Taguatinga">Taguatinga</SelectItem>
                          <SelectItem value="Plano Piloto">Plano Piloto</SelectItem>
                          <SelectItem value="Ceilândia">Ceilândia</SelectItem>
                          <SelectItem value="Samambaia">Samambaia</SelectItem>
                          <SelectItem value="Gama">Gama</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="date">Data</Label>
                      <Input
                        id="date"
                        type="date"
                        value={searchDate}
                        onChange={(e) => setSearchDate(e.target.value)}
                      />
                    </div>
                  </div>
                  <Button className="w-full mt-4">Buscar Caronas</Button>
                </CardContent>
              </Card>

              {/* Results */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold">{offers.length} caronas disponíveis</h2>
                  <Badge variant="outline" className="gap-1">
                    <CheckCircle className="size-3" />
                    Todos verificados
                  </Badge>
                </div>

                {offers.map((offer, index) => (
                  <motion.div
                    key={offer.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.3 }}
                  >
                    <Card className="hover:shadow-lg transition-shadow">
                      <CardContent className="pt-6">
                        {/* Driver Info */}
                        <div className="flex items-start justify-between mb-4 pb-4 border-b">
                          <div className="flex items-center gap-3">
                            <Avatar className="size-12">
                              <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-500 text-white font-semibold">
                                {offer.driver.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="font-semibold">{offer.driver.name}</span>
                                {offer.driver.verified && (
                                  <Badge variant="outline" className="text-xs gap-1">
                                    <Shield className="size-3 text-blue-600" />
                                    Verificado
                                  </Badge>
                                )}
                              </div>
                              <div className="flex items-center gap-3 text-xs text-gray-600">
                                <div className="flex items-center gap-1">
                                  <Star className="size-3 text-yellow-500 fill-yellow-500" />
                                  <span className="font-semibold">{offer.driver.rating}</span>
                                </div>
                                <span>•</span>
                                <span>{offer.driver.trips} viagens</span>
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-2xl font-bold text-green-600">
                              R$ {offer.pricePerPerson.toFixed(2)}
                            </div>
                            <div className="text-xs text-gray-500">por pessoa</div>
                          </div>
                        </div>

                        {/* Trip Details */}
                        <div className="grid md:grid-cols-2 gap-4 mb-4">
                          <div className="space-y-3">
                            <div className="flex items-center gap-2 text-sm">
                              <MapPin className="size-4 text-blue-600" />
                              <div>
                                <div className="font-semibold">{offer.from}</div>
                                <ArrowRight className="size-3 inline mx-1 text-gray-400" />
                                <div className="font-semibold inline">{offer.to}</div>
                              </div>
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                              <Clock className="size-4 text-orange-600" />
                              <span>Saída: {offer.departure}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                              <Calendar className="size-4 text-purple-600" />
                              <span>{new Date(offer.date).toLocaleDateString("pt-BR")}</span>
                            </div>
                          </div>

                          <div className="space-y-3">
                            <div className="flex items-center gap-2 text-sm">
                              <Car className="size-4 text-gray-600" />
                              <span>{offer.carModel}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                              <Users className="size-4 text-green-600" />
                              <span>{offer.availableSeats} assento(s) disponível(is)</span>
                            </div>
                            <div className="flex flex-wrap gap-1">
                              {offer.amenities.map((amenity, i) => (
                                <Badge key={i} variant="outline" className="text-xs">
                                  {amenity}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* Route */}
                        <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                          <div className="text-xs font-semibold text-gray-600 mb-2">Rota:</div>
                          <div className="flex items-center gap-2 text-xs">
                            {offer.route.map((stop, i) => (
                              <div key={i} className="flex items-center">
                                <span>{stop}</span>
                                {i < offer.route.length - 1 && (
                                  <ArrowRight className="size-3 mx-2 text-gray-400" />
                                )}
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex gap-2">
                          <Button
                            className="flex-1"
                            onClick={() => handleRequestCarpool(offer.id)}
                          >
                            Solicitar Carona
                          </Button>
                          <Button variant="outline" size="icon">
                            <MessageCircle className="size-5" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Offer Ride */}
              <Card className="bg-gradient-to-br from-green-500 to-blue-500 text-white">
                <CardContent className="pt-6 text-center">
                  <Car className="size-16 mx-auto mb-4 opacity-90" />
                  <h3 className="text-xl font-bold mb-2">Oferece carona?</h3>
                  <p className="text-sm opacity-90 mb-6">
                    Ganhe dinheiro compartilhando seu trajeto diário
                  </p>
                  <Button
                    className="w-full bg-white text-green-600 hover:bg-gray-100"
                    onClick={() => navigate("/oferecer-caronas")}
                  >
                    Oferecer Carona
                  </Button>
                </CardContent>
              </Card>

              {/* Benefits */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Por que usar caronas?</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {benefits.map((benefit, index) => (
                      <div key={index} className="flex items-center gap-2 text-sm">
                        <CheckCircle className="size-4 text-green-600 flex-shrink-0" />
                        <span>{benefit}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Environmental Impact */}
              <Card className="bg-green-50 border-green-200">
                <CardContent className="pt-6">
                  <div className="text-center">
                    <Leaf className="size-12 mx-auto mb-3 text-green-600" />
                    <div className="font-semibold mb-2">Impacto Ambiental</div>
                    <p className="text-sm text-gray-700 mb-4">
                      Cada carona compartilhada economiza em média 2.5kg de CO₂
                    </p>
                    <div className="grid grid-cols-2 gap-3 text-center">
                      <div className="p-3 bg-white rounded-lg">
                        <div className="text-2xl font-bold text-green-600">847</div>
                        <div className="text-xs text-gray-600">Carros a menos</div>
                      </div>
                      <div className="p-3 bg-white rounded-lg">
                        <div className="text-2xl font-bold text-green-600">2.3t</div>
                        <div className="text-xs text-gray-600">CO₂ economizado</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Safety Tips */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Shield className="size-5 text-blue-600" />
                    Dicas de Segurança
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li>• Sempre verifique o perfil do motorista</li>
                    <li>• Compartilhe sua rota com amigos</li>
                    <li>• Prefira motoristas verificados</li>
                    <li>• Use o chat da plataforma</li>
                    <li>• Avalie após cada viagem</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      <Dialog open={isOfferDialogOpen} onOpenChange={setIsOfferDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Oferecer Carona</DialogTitle>
            <DialogDescription>Preencha os detalhes da sua viagem.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div>
              <Label htmlFor="driverName">Seu nome</Label>
              <Input
                id="driverName"
                value={offerForm.driverName}
                onChange={(e) => handleOfferFormChange("driverName", e.target.value)}
                placeholder="Ex: Ana Paula"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="from">Saindo de</Label>
                <Input
                  id="from"
                  value={offerForm.from}
                  onChange={(e) => handleOfferFormChange("from", e.target.value)}
                  placeholder="Ex: Planaltina"
                />
              </div>
              <div>
                <Label htmlFor="to">Indo para</Label>
                <Input
                  id="to"
                  value={offerForm.to}
                  onChange={(e) => handleOfferFormChange("to", e.target.value)}
                  placeholder="Ex: Taguatinga"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="date">Data</Label>
                <Input
                  id="date"
                  type="date"
                  value={offerForm.date}
                  onChange={(e) => handleOfferFormChange("date", e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="time">Hora</Label>
                <Input
                  id="time"
                  type="time"
                  value={offerForm.time}
                  onChange={(e) => handleOfferFormChange("time", e.target.value)}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="seats">Vagas</Label>
                <Input
                  id="seats"
                  type="number"
                  min={1}
                  max={6}
                  value={offerForm.seats}
                  onChange={(e) => handleOfferFormChange("seats", e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="price">Preço por pessoa</Label>
                <Input
                  id="price"
                  type="number"
                  min={0}
                  step="0.5"
                  value={offerForm.price}
                  onChange={(e) => handleOfferFormChange("price", e.target.value)}
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsOfferDialogOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleOfferRide}>Salvar oferta</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
