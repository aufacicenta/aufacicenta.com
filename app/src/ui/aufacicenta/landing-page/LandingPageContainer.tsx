import dynamic from "next/dynamic";

import { LandingPageProps } from "./LandingPage.types";

const LandingPage = dynamic<LandingPageProps>(() => import("./LandingPage").then((mod) => mod.LandingPage), {
  ssr: false,
});

export const LandingPageContainer: React.FC<LandingPageProps> = () => <LandingPage />;
