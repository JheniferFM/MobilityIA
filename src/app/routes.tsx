import { createBrowserRouter } from "react-router";
import { RootLayout } from "./components/RootLayout";
import { LandingPage } from "./components/LandingPage";
import { MapView } from "./components/MapView";
import { AIAssistant } from "./components/AIAssistant";
import RouteResult from "./components/RouteResult.tsx";
import CrowdPrediction from "./pages/CrowdPrediction";
import { SafetyView } from "./components/SafetyView";
import { GovDashboard } from "./components/GovDashboard";
import { CarpoolView } from "./components/CarpoolView";
import { SmartQRCodeStop } from "./components/SmartQRCodeStop";
import { QRCodeScanner } from "./components/QRCodeScanner";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      { index: true, Component: LandingPage },
      { path: "mapa", Component: MapView },
      { path: "assistente", Component: AIAssistant },
      { path: "rota", Component: RouteResult },
      { path: "lotacao", Component: CrowdPrediction },
      { path: "seguranca", Component: SafetyView },
      { path: "dashboard", Component: GovDashboard },
      { path: "caronas", Component: CarpoolView },
      { path: "qr-code", Component: QRCodeScanner },
      { path: "parada/:slug", Component: SmartQRCodeStop },
    ],
  },
]);
