import { Blog } from "@/components/Home/Blog";
import CTABanner from "@/components/Home/CTA";
import Footer from "@/components/Home/Footer";
import Hero from "@/components/Home/Hero";
import SupervisionTypes from "@/components/Home/Supervision";
import WhatWeDo from "@/components/Home/WhatWeDo";
import WhoWeAre from "@/components/Home/Who";

export default function Home() {
  return (
    <main className="min-h-screen font-['Geist',sans-serif]">
      <Hero />
      <WhatWeDo />
      <SupervisionTypes />
      <WhoWeAre />
      <Blog />
      <CTABanner />
      <Footer />
    </main>
  );
}
