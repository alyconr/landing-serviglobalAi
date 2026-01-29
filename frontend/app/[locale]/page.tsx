import { Header } from '@/components/shared/Header';
import { FloatingCTA } from '@/components/shared/FloatingCTA';
import { Hero } from '@/components/landing/Hero';
import { WhyUs } from '@/components/landing/WhyUs';
import { UseCases } from '@/components/landing/UseCases';
import { Benefits } from '@/components/landing/Benefits';
import { Process } from '@/components/landing/Process';
import { Integrations } from '@/components/landing/Integrations';
import { VoiceDemo } from '@/components/landing/VoiceDemo';
import { Booking } from '@/components/landing/Booking';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <Header />
      <Hero />
      <UseCases />
      <Benefits />
      <Process />
      <Integrations />
      <WhyUs />
      <VoiceDemo />
      <Booking />
      <FloatingCTA />
    </main>
  );
}
