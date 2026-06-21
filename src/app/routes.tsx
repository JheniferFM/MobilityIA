import { createBrowserRouter } from "react-router";
import { RootLayout } from "./components/RootLayout";
import { LandingPage } from "./components/LandingPage";
import { MapView } from "./components/MapView";
import AIAssistant from "./pages/AIAssistant";
import RouteResultPage from "./pages/RouteResult";
import CrowdPrediction from "./pages/CrowdPrediction";
import { SafetyView } from "./components/SafetyView";
import { GovDashboard } from "./components/GovDashboard";
import SmartCarpooling from "./pages/SmartCarpooling";
import { SmartQRCodeStop } from "./components/SmartQRCodeStop";
import { QRCodeScanner } from "./components/QRCodeScanner";
import { RouteErrorBoundary } from "./components/RouteErrorBoundary";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    ErrorBoundary: RouteErrorBoundary,
    children: [
      { index: true, Component: LandingPage },
      { path: "mapa", Component: MapView },
      { path: "assistente", Component: AIAssistant },
      { path: "rota", Component: RouteResultPage },
      { path: "lotacao", Component: CrowdPrediction },
      { path: "seguranca", Component: SafetyView },
      { path: "safety", Component: SafetyView },
      { path: "dashboard", Component: GovDashboard },
      { path: "caronas", Component: SmartCarpooling },
      { path: "oferecer-caronas", Component: SmartCarpooling },
      { path: "qr-code", Component: QRCodeScanner },
      { path: "parada/:slug", Component: SmartQRCodeStop },
    ],
  },
]);
