import { Link } from "react-router";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import {
  Bus,
  Brain,
  Map,
  Shield,
  Users,
  BarChart3,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  TrendingUp,
  Leaf,
} from "lucide-react";

export function LandingPage() {
  const features = [
    {
      icon: Brain,
      title: "Assistente IA de Mobilidade",
      description: "Converse com nossa IA e receba as melhores rotas personalizadas",
      path: "/assistente",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: Bus,
      title: "Previsão de Lotação",
      description: "Saiba a lotação prevista antes de sair de casa",
      path: "/lotacao",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: Map,
      title: "Rotas Inteligentes Inter-RAs",
      description: "Conexões diretas sem passar pela Rodoviária",
      path: "/mapa",
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: Shield,
      title: "Segurança Colaborativa",
      description: "Índice de segurança em tempo real de cada rota",
      path: "/seguranca",
      color: "from-orange-500 to-red-500",
    },
    {
      icon: Users,
      title: "Caronas Inteligentes",
      description: "Compartilhe trajetos e economize",
      path: "/caronas",
      color: "from-indigo-500 to-purple-500",
    },
    {
      icon: BarChart3,
      title: "Dashboard Governamental",
      description: "Gestão inteligente para GDF e concessionárias",
      path: "/dashboard",
      color: "from-slate-600 to-slate-800",
    },
  ];

  const stats = [
    { value: "60%", label: "Redução no tempo de espera" },
    { value: "45%", label: "Menos trajetos ao Plano Piloto" },
    { value: "30%", label: "Aumento na satisfação" },
    { value: "25%", label: "Redução de emissões" },
  ];

  const benefits = [
    "Previsibilidade total de horários e lotação",
    "Rotas alternativas evitando congestionamentos",
    "Informações de segurança em tempo real",
    "Integração inteligente entre todas as RAs",
    "Sugestão de melhor horário para viajar",
    "Economia de tempo e dinheiro",
  ];

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat bg-fixed"
      style={{
        backgroundImage:
          "linear-gradient(rgba(15, 23, 42, 0.62), rgba(15, 23, 42, 0.62)), url('/thumbpq_brasilia.jpg')",
      }}
    >
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDE2YzAtMS4xLjktMiAyLTJzMiAuOSAyIDItLjkgMi0yIDItMi0uOS0yLTJ6bTAgMjBjMC0xLjEuOS0yIDItMnMyIC45IDIgMi0uOSAyLTIgMi0yLS45LTItMnptLTIwIDBjMC0xLjEuOS0yIDItMnMyIC45IDIgMi0uOSAyLTIgMi0yLS45LTItMnoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-30"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24 relative">
          <div className="text-center space-y-8">
            <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight">
              Nexus Mobility AI
            </h1>

            <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto">
              Conectando Brasília de forma inteligente, previsível e sustentável
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
              <Link to="/assistente">
                <Button size="lg" className="gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 text-lg">
                  Começar Agora
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
              <Link to="/mapa">
                <Button
                  size="lg"
                  variant="outline"
                  className="gap-2 bg-transparent px-8 py-6 text-lg border-white/30 text-white hover:bg-white/10 hover:text-white focus-visible:text-white"
                >
                  <Map className="w-5 h-5" />
                  Ver Mapa
                </Button>
              </Link>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20">
            {stats.map((stat, idx) => (
              <Card key={idx} className="p-6 bg-white/10 backdrop-blur-md border-white/20">
                <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
                <div className="text-sm text-blue-100">{stat.label}</div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Funcionalidades Inteligentes</h2>
            <p className="text-xl text-slate-600">
              Uma plataforma completa para revolucionar a mobilidade urbana
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <Link key={idx} to={feature.path}>
                  <Card className="p-6 h-full hover:shadow-xl transition-all duration-300 cursor-pointer group">
                    <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                    <p className="text-slate-600 mb-4">{feature.description}</p>
                    <div className="flex items-center text-blue-600 gap-1">
                      Explorar
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6">Por que usar o Nexus?</h2>
              <div className="space-y-4">
                {benefits.map((benefit, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-lg text-slate-700">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Card className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
                <Leaf className="w-10 h-10 text-green-600 mb-3" />
                <div className="text-2xl font-bold text-green-900 mb-1">ODS 11</div>
                <p className="text-sm text-green-700">Cidades Sustentáveis</p>
              </Card>
              <Card className="p-6 bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200">
                <TrendingUp className="w-10 h-10 text-blue-600 mb-3" />
                <div className="text-2xl font-bold text-blue-900 mb-1">ODS 9</div>
                <p className="text-sm text-blue-700">Inovação</p>
              </Card>
              <Card className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
                <Users className="w-10 h-10 text-purple-600 mb-3" />
                <div className="text-2xl font-bold text-purple-900 mb-1">ODS 10</div>
                <p className="text-sm text-purple-700">Redução de Desigualdades</p>
              </Card>
              <Card className="p-6 bg-gradient-to-br from-orange-50 to-red-50 border-orange-200">
                <Sparkles className="w-10 h-10 text-orange-600 mb-3" />
                <div className="text-2xl font-bold text-orange-900 mb-1">ODS 13</div>
                <p className="text-sm text-orange-700">Ação Climática</p>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-cyan-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Pronto para transformar a mobilidade do DF?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Junte-se a milhares de cidadãos que já usam o Nexus Mobility AI
          </p>
          <Link to="/assistente">
            <Button size="lg" className="gap-2 bg-white text-blue-600 hover:bg-blue-50 px-8 py-6 text-lg">
              <Brain className="w-5 h-5" />
              Falar com a IA
              <ArrowRight className="w-5 h-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-lg flex items-center justify-center">
                <Bus className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-xl">Nexus Mobility AI</span>
            </div>
            <p className="text-sm text-slate-400">
              © 2026 Nexus Mobility AI. Inovação para Brasília.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
