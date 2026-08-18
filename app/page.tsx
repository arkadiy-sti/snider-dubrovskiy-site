import { Navigation } from "@/components/navigation/Navigation";
import { Hero } from "@/components/hero/Hero";
import { TrainingSystem } from "@/components/program/TrainingSystem";
import { HookSection } from "@/components/program/HookSection";
import { Achievements } from "@/components/achievements/Achievements";
import { Coaches } from "@/components/coaches/Coaches";
import { Location } from "@/components/location/Location";
import { RegistrationForm } from "@/components/registration/RegistrationForm";
import { Footer } from "@/components/footer/Footer";

export default function Home() {
  return (
    <>
      <Navigation />
      <main className="flex-1">
        <Hero />
        <TrainingSystem />
        <HookSection />
        <Achievements />
        <Coaches />
        <Location />
        <RegistrationForm />
      </main>
      <Footer />
    </>
  );
}
