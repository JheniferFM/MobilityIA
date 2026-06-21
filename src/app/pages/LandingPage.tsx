import { Link } from "react-router";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import {
  MessageSquare,
  Users,
  Route,
  Shield,
  Car,
  QrCode,
  BarChart3,
  Brain,
  ArrowRight,
  MapPin,
  Clock,
  TrendingDown,
  Zap,
} from "lucide-react";
import { motion } from "motion/react";

export default function LandingPage() {
  const features = [
    {
      icon: MessageSquare,
      title: "Assistente IA de Mobilidade",
      description: "Converse com uma IA que encontra a melhor rota para você em segundos.",
      link: "/assistant",
    },
    {
      icon: Users,
      title: "Previsão de Lotação",
      description: "Saiba antes de sair se seu ônibus estará lotado ou não.",
      link: "/crowd-prediction",
    },
    {
      icon: Route,
      title: "Rotas Inteligentes Inter-RAs",
      description: "Encontre conexões diretas sem precisar passar pela Rodoviária.",
      link: "/route-result",
    },
    {
      icon: Shield,
      title: "Segurança Colaborativa",
      description: "Veja o índice de segurança de cada rota e reporte incidentes.",
      link: "/safety",
    },
    {
      icon: Car,
      title: "Caronas Inteligentes",
      description: "Compartilhe trajetos com pessoas da sua região.",
      link: "/carpooling",
    },
    {
      icon: QrCode,
      title: "QR Code nas Paradas",
      description: "Escaneie e veja todas as informações da parada em tempo real.",
      link: "/map",
    },
    {
      icon: BarChart3,
      title: "Dashboard Governamental",
      description: "Dados e insights para gestores públicos e concessionárias.",
      link: "/dashboard",
    },
  ];

  const stats = [
    { icon: Clock, value: "40%", label: "Redução no tempo de espera" },
    { icon: TrendingDown, value: "60%", label: "Menos ônibus lotados" },
    { icon: MapPin, value: "30+", label: "Regiões Administrativas conectadas" },
    { icon: Zap, value: "100%", label: "Alimentado por IA" },
  ];

  const ods = [
    { number: 11, name: "Cidades e Comunidades Sustentáveis" },
    { number: 9, name: "Inovação e Infraestrutura" },
    { number: 10, name: "Redução das Desigualdades" },
    { number: 13, name: "Ação Contra a Mudança Climática" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-purple-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-32 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <Badge className="mb-6 text-sm px-4 py-2">
              <Brain className="size-4 mr-2" />
              Powered by Artificial Intelligence
            </Badge>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">
              Mobility IA
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-4 max-w-3xl mx-auto">
              Conectando Brasília de forma inteligente, previsível e sustentável.
            </p>
            <p className="text-lg text-gray-500 mb-10 max-w-2xl mx-auto">
              Uma plataforma de mobilidade urbana baseada em IA que conecta cidadãos, operadores e
              governo em um único ecossistema.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/assistant">
                <Button size="lg" className="gap-2">
                  Começar Agora
                  <ArrowRight className="size-5" />
                </Button>
              </Link>
              <Link to="/map">
                <Button size="lg" variant="outline" className="gap-2">
                  <MapPin className="size-5" />
                  Ver Mapa
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-6 bg-white/50">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <Card>
                  <CardContent className="pt-6 text-center">
                    <stat.icon className="size-8 mx-auto mb-3 text-blue-600" />
                    <div className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
                    <div className="text-sm text-gray-600">{stat.label}</div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Módulos da Plataforma</h2>
            <p className="text-xl text-gray-600">
              Uma solução completa para a mobilidade urbana do Distrito Federal
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <Link to={feature.link}>
                  <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer group">
                    <CardHeader>
                      <div className="size-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                        <feature.icon className="size-6 text-white" />
                      </div>
                      <CardTitle>{feature.title}</CardTitle>
                      <CardDescription>{feature.description}</CardDescription>
                    </CardHeader>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ODS Section */}
      <section className="py-20 px-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Alinhado aos Objetivos de Desenvolvimento Sustentável</h2>
            <p className="text-xl text-blue-100">
              Contribuindo para um futuro mais sustentável e inclusivo
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {ods.map((od, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
                  <CardContent className="pt-6 text-center">
                    <div className="text-5xl font-bold mb-3">ODS {od.number}</div>
                    <div className="text-sm">{od.name}</div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Pronto para transformar a mobilidade de Brasília?</h2>
          <p className="text-xl text-gray-600 mb-10">
            Comece a usar o Mobility IA agora e experimente uma nova forma de se locomover pelo DF.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/assistant">
              <Button size="lg" className="gap-2">
                <MessageSquare className="size-5" />
                Falar com o Assistente IA
              </Button>
            </Link>
            <Link to="/dashboard">
              <Button size="lg" variant="outline" className="gap-2">
                <BarChart3 className="size-5" />
                Ver Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
