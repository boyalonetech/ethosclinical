import ContactSection from "@/components/Contact/ContactPage";
import CTABanner from "@/components/Home/CTA";
import Footer from "@/components/Home/Footer";

export default function Page() {
  return (
    <main className="min-h-screen font-['Geist',sans-serif]">
      <ContactSection />
      <CTABanner />
      <Footer />
    </main>
  );
}
