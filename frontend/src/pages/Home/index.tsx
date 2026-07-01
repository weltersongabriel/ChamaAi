import Hero from "@/components/sections/Hero";
import MainLayout from "@/layouts/MainLayout";
import Features from "@/components/sections/Features";

export default function Home() {
  return (
    <MainLayout>
      <Hero />
      <Features />
    </MainLayout>
  );
}