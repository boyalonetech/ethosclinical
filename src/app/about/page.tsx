import { DrivesAndApproach } from "@/components/About/Drive";
import EthosDifference from "@/components/About/Ethos";
import FAQ from "@/components/About/Faqs";
import MeetStephen from "@/components/About/Hero";
import Team from "@/components/About/Team";
import Testimonials from "@/components/About/Testmonials";
import CTABanner from "@/components/Home/CTA";
import Footer from "@/components/Home/Footer";

export default function page() {
  return (
    <main className="min-h-screen font-['Geist',sans-serif]">
      <MeetStephen />
      <DrivesAndApproach />
      <EthosDifference />
      <Team />
      <Testimonials />
      <FAQ />
      <CTABanner />
      <Footer />
    </main>
  );
}
