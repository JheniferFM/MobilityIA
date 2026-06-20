import { Link, useLocation } from "react-router";
import { Button } from "./ui/button";
import { Home, Map, MessageSquare, Route, Users, Shield, BarChart3, Car, Menu, X } from "lucide-react";
import { useState } from "react";

export function Navigation() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { path: "/", icon: Home, label: "Início" },
    { path: "/map", icon: Map, label: "Mapa" },
    { path: "/assistant", icon: MessageSquare, label: "Assistente IA" },
    { path: "/route-result", icon: Route, label: "Rotas" },
    { path: "/crowd-prediction", icon: Users, label: "Lotação" },
    { path: "/safety", icon: Shield, label: "Segurança" },
    { path: "/dashboard", icon: BarChart3, label: "Dashboard" },
    { path: "/carpooling", icon: Car, label: "Caronas" },
  ];

  return (
    <>
      {/* Mobile Menu Button */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-4 right-4 z-50 md:hidden"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X className="size-6" /> : <Menu className="size-6" />}
      </Button>

      {/* Desktop Navigation */}
      <nav className="hidden md:flex fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-b border-gray-200 z-40 px-6 py-3">
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="size-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <Route className="size-5 text-white" />
            </div>
            <span className="font-bold text-xl">Nexus Mobility AI</span>
          </Link>
          <div className="flex items-center gap-2">
            {navItems.slice(1).map((item) => (
              <Link key={item.path} to={item.path}>
                <Button
                  variant={location.pathname === item.path ? "default" : "ghost"}
                  size="sm"
                  className="gap-2"
                >
                  <item.icon className="size-4" />
                  {item.label}
                </Button>
              </Link>
            ))}
          </div>
        </div>
      </nav>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden fixed inset-0 bg-white z-40 p-6 flex flex-col gap-4">
          <Link to="/" className="flex items-center gap-2 mb-4" onClick={() => setIsOpen(false)}>
            <div className="size-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <Route className="size-6 text-white" />
            </div>
            <span className="font-bold text-xl">Nexus Mobility AI</span>
          </Link>
          {navItems.map((item) => (
            <Link key={item.path} to={item.path} onClick={() => setIsOpen(false)}>
              <Button
                variant={location.pathname === item.path ? "default" : "ghost"}
                className="w-full justify-start gap-3"
                size="lg"
              >
                <item.icon className="size-5" />
                {item.label}
              </Button>
            </Link>
          ))}
        </div>
      )}
    </>
  );
}
