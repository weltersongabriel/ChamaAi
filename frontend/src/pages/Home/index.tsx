import Hero from "@/components/sections/Hero";
import MainLayout from "@/layouts/MainLayout";
import Features from "@/components/sections/Features";
import HowItWorks from "@/components/sections/HowItWorks";

export default function Home() {
  return (
    <MainLayout>
      <Hero />
      <Features />
      <HowItWorks />
    </MainLayout>
  );
}