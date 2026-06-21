import { Outlet, Link, useLocation } from "react-router";
import { Button } from "./ui/button";
import { Menu, X, Bus, Brain, Map, BarChart3, Shield, Users, QrCode } from "lucide-react";
import { useState } from "react";
import { AccessibilityPanel } from "./AccessibilityPanel";

export function RootLayout() {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isHome = location.pathname === "/";

  const navItems = [
    { path: "/mapa", label: "Mapa", icon: Map },
    { path: "/assistente", label: "IA", icon: Brain },
    { path: "/qr-code", label: "QR Code", icon: QrCode },
    { path: "/lotacao", label: "Lotação", icon: Bus },
    { path: "/seguranca", label: "Segurança", icon: Shield },
    { path: "/caronas", label: "Caronas", icon: Users },
    { path: "/dashboard", label: "Dashboard", icon: BarChart3 },
  ];

  if (isHome) {
    return <Outlet />;
  }

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-gradient-to-br from-slate-50 to-blue-50">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0 mobility-accent-scanlines opacity-[0.14]"></div>
      <div aria-hidden="true" className="pointer-events-none absolute left-6 top-24 z-0 h-40 w-px bg-[linear-gradient(180deg,transparent,rgba(0,255,0,0.35),transparent)]"></div>
      <div aria-hidden="true" className="pointer-events-none absolute right-6 bottom-24 z-0 h-40 w-px bg-[linear-gradient(180deg,transparent,rgba(0,255,0,0.28),transparent)]"></div>
      {/* Header */}
      <header className="relative z-10 bg-white border-b border-b-[color:var(--mobility-accent-soft)] sticky top-0 shadow-sm overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-px bg-[var(--mobility-accent)]/70"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-24">
            <Link to="/" className="flex items-center gap-2">
              <img
                src="/mobility-ai-logo.png"
                alt="Logo Mobility AI"
                className="w-24 h-24 object-contain"
              />
              <span className="font-bold text-xl bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                Mobility IA
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                return (
                  <Link key={item.path} to={item.path}>
                    <Button
                      variant={isActive ? "default" : "ghost"}
                      size="sm"
                      className="gap-2"
                    >
                      <Icon className="w-4 h-4" />
                      {item.label}
                    </Button>
                  </Link>
                );
              })}
            </nav>

            {/* Mobile Menu Button */}
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden !w-14 !h-14"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? (
                  <X className="!w-10 !h-10" strokeWidth={1.5} />
                ) : (
                  <Menu className="!w-10 !h-10" strokeWidth={1.5} />
                )}
              </Button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <nav className="md:hidden py-4 space-y-1 border-t">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block"
                  >
                    <Button
                      variant={isActive ? "default" : "ghost"}
                      className="w-full justify-start gap-2"
                    >
                      <Icon className="w-4 h-4" />
                      {item.label}
                    </Button>
                  </Link>
                );
              })}
            </nav>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10">
        <Outlet />
      </main>
    </div>
  );
}
