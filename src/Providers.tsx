// Providers.tsx
import { ReactNode } from "react";
import { SelectedPlanetProvider } from "./contexts/SelectedPlanetContext";
import { SpeedControlProvider } from "./contexts/SpeedControlContext";
import { PlanetPositionsProvider } from "./contexts/PlanetPositionsContext";
import { CameraProvider } from "./contexts/CameraContext";
import { ChatProvider } from "./contexts/ChatContext";
import { NextUIProvider } from "@nextui-org/react";

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <NextUIProvider>
      <SelectedPlanetProvider>
        <SpeedControlProvider>
          <PlanetPositionsProvider>
            <CameraProvider>
              <ChatProvider>{children}</ChatProvider>
            </CameraProvider>
          </PlanetPositionsProvider>
        </SpeedControlProvider>
      </SelectedPlanetProvider>
    </NextUIProvider>
  );
}
