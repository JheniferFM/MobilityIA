import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import {
  Users,
  MapPin,
  Clock,
  DollarSign,
  Star,
  Search,
  Plus,
  Navigation,
  CheckCircle2,
  Shield,
  Sparkles,
  TrendingDown,
  Leaf,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface CarpoolOffer {
  id: string;
  driver: {
    name: string;
    rating: number;
    trips: number;
    verified: boolean;
    avatar?: string;
  };
  from: string;
  to: string;
  departure: string;
  seats: number;
  price: number;
  distance: string;
  duration: string;
}

const INITIAL_CARPOOL_OFFERS: CarpoolOffer[] = [
  {
    id: "1",
    driver: {
      name: "Maria Silva",
      rating: 4.9,
      trips: 127,
      verified: true,
      avatar: "",
    },
    from: "Planaltina",
    to: "Taguatinga",
    departure: "Hoje, 18:00",
    seats: 3,
    price: 8.5,
    distance: "42 km",
    duration: "50 min",
  },
  {
    id: "2",
    driver: {
      name: "João Santos",
      rating: 4.8,
      trips: 89,
      verified: true,
      avatar: "",
    },
    from: "Planaltina",
    to: "Taguatinga",
    departure: "Hoje, 18:15",
    seats: 2,
    price: 9.0,
    distance: "42 km",
    duration: "48 min",
  },
  {
    id: "3",
    driver: {
      name: "Ana Costa",
      rating: 5.0,
      trips: 203,
      verified: true,
      avatar: "",
    },
    from: "Planaltina Centro",
    to: "Taguatinga Sul",
    departure: "Hoje, 18:30",
    seats: 4,
    price: 7.5,
    distance: "40 km",
    duration: "52 min",
  },
];

export function CarpoolView() {
  const [searchFrom, setSearchFrom] = useState("");
  const [searchTo, setSearchTo] = useState("");
  const [carpoolOffers, setCarpoolOffers] = useState<CarpoolOffer[]>(INITIAL_CARPOOL_OFFERS);
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

  const handleRequestRide = (offerId: string) => {
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
    const today = new Date();
    const isToday = departureDate.toDateString() === today.toDateString();
    const departureLabel = `${isToday ? "Hoje" : departureDate.toLocaleDateString("pt-BR")}, ${time}`;

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
      departure: departureLabel,
      seats: parsedSeats,
      price: parsedPrice,
      distance: "A definir",
      duration: "A definir",
    };

    setCarpoolOffers((prev) => [newOffer, ...prev]);
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

  const stats = [
    { label: "Economia média", value: "R$ 12", icon: DollarSign, color: "text-green-600" },
    { label: "CO₂ evitado", value: "2.3 kg", icon: Leaf, color: "text-emerald-600" },
    { label: "Tempo médio", value: "45 min", icon: Clock, color: "text-blue-600" },
    { label: "Satisfação", value: "4.8/5", icon: Star, color: "text-yellow-600" },
  ];

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center">
              <Users className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-4xl font-bold">Caronas Inteligentes</h1>
          </div>
          <p className="text-lg text-slate-600">
            Compartilhe trajetos, economize e contribua para um trânsito mais sustentável
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <Card key={idx} className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Icon className={`w-4 h-4 ${stat.color}`} />
                  <span className="text-xs text-slate-600">{stat.label}</span>
                </div>
                <div className={`text-2xl font-bold ${stat.color}`}>{stat.value}</div>
              </Card>
            );
          })}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Search */}
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-4">Buscar Carona</h3>
              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <Input
                    placeholder="De onde?"
                    value={searchFrom}
                    onChange={(e) => setSearchFrom(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <div className="relative">
                  <Navigation className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <Input
                    placeholder="Para onde?"
                    value={searchTo}
                    onChange={(e) => setSearchTo(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <Button className="flex-1 gap-2">
                  <Search className="w-4 h-4" />
                  Buscar Caronas
                </Button>
                <Button
                  variant="outline"
                  className="gap-2"
                  onClick={() => setIsOfferDialogOpen(true)}
                >
                  <Plus className="w-4 h-4" />
                  Oferecer Carona
                </Button>
              </div>
            </Card>

            {/* Results */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold">Caronas Disponíveis</h3>
                <Badge className="bg-blue-600">
                  {carpoolOffers.length} encontradas
                </Badge>
              </div>

              {carpoolOffers.map((offer) => (
                <Card key={offer.id} className="p-6 hover:shadow-lg transition-shadow">
                  <div className="flex flex-col md:flex-row gap-6">
                    {/* Driver Info */}
                    <div className="flex items-start gap-3">
                      <Avatar className="w-14 h-14">
                        <AvatarImage src={offer.driver.avatar} />
                        <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-500 text-white font-semibold">
                          {offer.driver.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-semibold">{offer.driver.name}</h4>
                          {offer.driver.verified && (
                            <CheckCircle2 className="w-4 h-4 text-blue-600" />
                          )}
                        </div>
                        <div className="flex items-center gap-3 text-sm text-slate-600">
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            <span className="font-semibold">{offer.driver.rating}</span>
                          </div>
                          <span>•</span>
                          <span>{offer.driver.trips} viagens</span>
                        </div>
                      </div>
                    </div>

                    {/* Route Info */}
                    <div className="flex-1 space-y-3">
                      <div className="flex items-center gap-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                            <span className="font-semibold text-sm">{offer.from}</span>
                          </div>
                          <div className="ml-4 border-l-2 border-dashed border-slate-200 h-4"></div>
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                            <span className="font-semibold text-sm">{offer.to}</span>
                          </div>
                        </div>

                        <div className="text-right">
                          <div className="flex items-center gap-2 text-sm text-slate-600 mb-1">
                            <Clock className="w-4 h-4" />
                            <span>{offer.departure}</span>
                          </div>
                          <div className="text-xs text-slate-500">
                            {offer.duration} • {offer.distance}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-3 border-t">
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-1 text-sm">
                            <Users className="w-4 h-4 text-slate-500" />
                            <span className="text-slate-600">
                              {offer.seats} {offer.seats === 1 ? "vaga" : "vagas"}
                            </span>
                          </div>
                          <div className="flex items-center gap-1">
                            <DollarSign className="w-4 h-4 text-green-600" />
                            <span className="text-xl font-bold text-green-600">
                              R$ {offer.price.toFixed(2)}
                            </span>
                          </div>
                        </div>

                        <Button onClick={() => handleRequestRide(offer.id)}>
                          Solicitar Carona
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* How it works */}
            <Card className="p-6 bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200">
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="w-5 h-5 text-blue-600" />
                <h3 className="font-semibold">Como Funciona</h3>
              </div>
              <div className="space-y-3 text-sm">
                <div className="flex items-start gap-2">
                  <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold flex-shrink-0">
                    1
                  </div>
                  <p className="text-slate-700">
                    Busque caronas no mesmo trajeto
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold flex-shrink-0">
                    2
                  </div>
                  <p className="text-slate-700">
                    Veja perfil e avaliações do motorista
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold flex-shrink-0">
                    3
                  </div>
                  <p className="text-slate-700">
                    Solicite a carona e combine detalhes
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold flex-shrink-0">
                    4
                  </div>
                  <p className="text-slate-700">
                    Pague diretamente ou divida custos
                  </p>
                </div>
              </div>
            </Card>

            {/* Benefits */}
            <Card className="p-6">
              <h3 className="font-semibold mb-4">Benefícios</h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-start gap-2">
                  <DollarSign className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-semibold mb-0.5">Economia</p>
                    <p className="text-xs text-slate-600">
                      Até 60% mais barato que táxi/app
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Leaf className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-semibold mb-0.5">Sustentabilidade</p>
                    <p className="text-xs text-slate-600">
                      Menos carros, menos poluição
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Users className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-semibold mb-0.5">Comunidade</p>
                    <p className="text-xs text-slate-600">
                      Conecte-se com vizinhos
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <TrendingDown className="w-4 h-4 text-purple-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-semibold mb-0.5">Menos Trânsito</p>
                    <p className="text-xs text-slate-600">
                      Contribua para mobilidade urbana
                    </p>
                  </div>
                </div>
              </div>
            </Card>

            {/* Safety */}
            <Card className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
              <div className="flex items-start gap-3">
                <Shield className="w-6 h-6 text-green-600 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold mb-2">Segurança em Primeiro Lugar</h3>
                  <div className="space-y-2 text-sm text-slate-700">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-600" />
                      <span>Perfis verificados</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-600" />
                      <span>Sistema de avaliações</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-600" />
                      <span>Compartilhe viagem em tempo real</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-600" />
                      <span>Suporte 24/7</span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Stats */}
            <Card className="p-6">
              <h3 className="font-semibold mb-4">Impacto da Comunidade</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-slate-600">Caronas realizadas</span>
                    <span className="font-semibold">12,847</span>
                  </div>
                  <div className="text-xs text-slate-500">Este mês</div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-slate-600">CO₂ economizado</span>
                    <span className="font-semibold text-green-600">28.5 ton</span>
                  </div>
                  <div className="text-xs text-slate-500">Equivalente a 142 árvores</div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-slate-600">Economia total</span>
                    <span className="font-semibold text-blue-600">R$ 154k</span>
                  </div>
                  <div className="text-xs text-slate-500">Economia dos usuários</div>
                </div>
              </div>
            </Card>

            {/* IA Integration */}
            <Card className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
              <div className="flex items-start gap-3">
                <Sparkles className="w-6 h-6 text-purple-600 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold mb-2">IA Inteligente</h3>
                  <p className="text-sm text-slate-700 mb-2">
                    Quando não houver transporte público eficiente, nossa IA 
                    sugere automaticamente caronas compatíveis.
                  </p>
                  <p className="text-xs text-slate-600">
                    Combinamos horários, trajetos e preferências para encontrar 
                    a melhor correspondência.
                  </p>
                </div>
              </div>
            </Card>

            {/* CTA */}
            <Button
              className="w-full gap-2"
              size="lg"
              onClick={() => setIsOfferDialogOpen(true)}
            >
              <Plus className="w-4 h-4" />
              Oferecer Minha Carona
            </Button>
          </div>
        </div>

        <Dialog open={isOfferDialogOpen} onOpenChange={setIsOfferDialogOpen}>
          <DialogContent className="sm:max-w-xl">
            <DialogHeader>
              <DialogTitle>Oferecer Carona</DialogTitle>
              <DialogDescription>
                Preencha os dados abaixo para publicar sua carona para outros passageiros.
              </DialogDescription>
            </DialogHeader>

            <div className="grid gap-4 py-2">
              <div className="grid gap-2">
                <label className="text-sm font-medium" htmlFor="driver-name">
                  Seu nome
                </label>
                <Input
                  id="driver-name"
                  value={offerForm.driverName}
                  onChange={(e) => handleOfferFormChange("driverName", e.target.value)}
                  placeholder="Ex.: Carla Souza"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <label className="text-sm font-medium" htmlFor="from-location">
                    Saída
                  </label>
                  <Input
                    id="from-location"
                    value={offerForm.from}
                    onChange={(e) => handleOfferFormChange("from", e.target.value)}
                    placeholder="Ex.: Asa Norte"
                  />
                </div>
                <div className="grid gap-2">
                  <label className="text-sm font-medium" htmlFor="to-location">
                    Destino
                  </label>
                  <Input
                    id="to-location"
                    value={offerForm.to}
                    onChange={(e) => handleOfferFormChange("to", e.target.value)}
                    placeholder="Ex.: Taguatinga"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <label className="text-sm font-medium" htmlFor="departure-date">
                    Data
                  </label>
                  <Input
                    id="departure-date"
                    type="date"
                    value={offerForm.date}
                    onChange={(e) => handleOfferFormChange("date", e.target.value)}
                  />
                </div>
                <div className="grid gap-2">
                  <label className="text-sm font-medium" htmlFor="departure-time">
                    Horário
                  </label>
                  <Input
                    id="departure-time"
                    type="time"
                    value={offerForm.time}
                    onChange={(e) => handleOfferFormChange("time", e.target.value)}
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <label className="text-sm font-medium" htmlFor="available-seats">
                    Vagas disponíveis
                  </label>
                  <Input
                    id="available-seats"
                    type="number"
                    min={1}
                    max={6}
                    value={offerForm.seats}
                    onChange={(e) => handleOfferFormChange("seats", e.target.value)}
                  />
                </div>
                <div className="grid gap-2">
                  <label className="text-sm font-medium" htmlFor="ride-price">
                    Valor por passageiro (R$)
                  </label>
                  <Input
                    id="ride-price"
                    type="number"
                    min={1}
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
              <Button onClick={handleOfferRide} className="gap-2">
                <Plus className="w-4 h-4" />
                Publicar Carona
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
