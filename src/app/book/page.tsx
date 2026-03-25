"use client";

import {
  Clock,
  CheckCircle2,
  Star,
  Shield,
  Video,
} from "lucide-react";
import BookingForm from "@/components/BookingPage";
import CTABanner from "@/components/Home/CTA";
import Footer from "@/components/Home/Footer";

/* ─────────────────────────────────────────────
   DATA
───────────────────────────────────────────── */

const TRUST_POINTS = [
  { icon: Shield, text: "Fully accredited clinical supervisor" },
  { icon: Star, text: "50+ practitioners supported" },
  { icon: CheckCircle2, text: "Flexible online & in-person sessions" },
  { icon: Clock, text: "Prompt response within 24 hours" },
];

const STEPS = [
  {
    num: "01",
    title: "Choose your session type",
    desc: "Individual, group, or organisational — select what fits your needs.",
  },
  {
    num: "02",
    title: "Pick a date & time",
    desc: "Browse available slots and choose what works for your schedule.",
  },
  {
    num: "03",
    title: "Complete your details",
    desc: "Tell us a little about yourself and your practice context.",
  },
  {
    num: "04",
    title: "Confirmation & prep",
    desc: "You'll receive a confirmation message with everything you need to prepare.",
  },
];
/* ─────────────────────────────────────────────
   HERO
───────────────────────────────────────────── */
function BookingHero() {
  return (
    <section className="bg-mint-50 hidden pt-16 pb-12 px-6 lg:px-10 bg-white text-black">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12 lg:gap-20 items-center">
        {/* Left */}
        <div className="flex-1 flex flex-col gap-6">
          <span className="text-xs font-semibold uppercase tracking-widest text-mint-500 border border-mint-200 rounded-full px-4 py-1.5 self-start">
            Book a Session
          </span>
          <h1
            className="text-4xl sm:text-5xl lg:text-6xl font-normal text-mint-900 tracking-tight leading-tight"
            style={{ fontFamily: "'Bona Nova', serif" }}
          >
            Take the First Step Toward Supported Practice.
          </h1>
          <p className="text-mint-600 text-base sm:text-lg leading-relaxed max-w-lg">
            Whether you&apos;re an individual practitioner carrying complex
            caseloads, or an organisation looking to strengthen your team —
            we&apos;re here to help you find the right space for reflection.
          </p>

          {/* Trust points */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
            {TRUST_POINTS.map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-mint-100 flex items-center justify-center shrink-0">
                  <Icon size={15} className="text-mint-600" />
                </div>
                <span className="text-mint-700 text-sm">{text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right — counsellor card */}
        <div className="flex-1 w-full max-w-sm mx-auto lg:max-w-none">
          <div className="bg-white rounded-2xl overflow-hidden shadow-md">
            <picture className="aspect-[4/3] bg-mint-100 overflow-hidden">
              <img
                src="https://stephenonyekwere.vercel.app/stephen.jpeg"
                alt="Stephen Onyekwere"
                className="w-full h-full object-cover mb-100 object-top"
              />
            </picture>
            <div className="p-6 flex flex-col gap-3">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="text-mint-900 font-semibold text-lg">
                    Stephen Onyekwere
                  </h3>
                  <p className="text-mint-500 text-sm">Principal Consultant</p>
                </div>
                <div className="flex items-center gap-1 bg-mint-50 border border-mint-200 rounded-full px-3 py-1">
                  <Star size={12} className="fill-mint-500 text-mint-500" />
                  <span className="text-mint-700 text-xs font-semibold">
                    5.0
                  </span>
                </div>
              </div>
              <p className="text-mint-400 text-xs leading-relaxed">
                M.Phil, M.Mental Health | B.Phil, B.Th | Grad.Cert Mental Health
                | Dip. Counselling
              </p>
              <div className="flex flex-wrap gap-2 pt-1">
                {["Trauma-Informed", "Ethical Practice", "NDIS", "OOHC"].map(
                  (tag) => (
                    <span
                      key={tag}
                      className="text-xs bg-mint-50 text-mint-600 border border-mint-200 rounded-full px-3 py-1"
                    >
                      {tag}
                    </span>
                  ),
                )}
              </div>
              <div className="pt-2 border-t border-mint-100 flex items-center text-sm">
                <span className="text-mint-500 flex items-center gap-1.5">
                  <Video size={13} /> Online & In-Person
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   HOW IT WORKS
───────────────────────────────────────────── */
function HowItWorks() {
  return (
    <section className="bg-mint py-14 px-6 lg:px-10">
      <div className="max-w-7xl mx-auto">
        <p className="text-mint-200 text-xs uppercase tracking-widest font-semibold mb-3">
          Process
        </p>
        <h2
          className="text-white text-3xl sm:text-4xl font-normal mb-10 max-w-lg leading-snug"
          style={{ fontFamily: "'Bona Nova', serif" }}
        >
          How booking works
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {STEPS.map(({ num, title, desc }) => (
            <div key={num} className="flex flex-col gap-3">
              <span className="text-5xl font-bold text-mint-400 leading-none">
                {num}
              </span>
              <h3 className="text-white font-semibold text-base">{title}</h3>
              <p className="text-mint-100 text-sm leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   BOOKING FORM
───────────────────────────────────────────── */

/* ─────────────────────────────────────────────
   CTA BANNER
───────────────────────────────────────────── */

/* ─────────────────────────────────────────────
   FOOTER
───────────────────────────────────────────── */

/* ─────────────────────────────────────────────
   PAGE
───────────────────────────────────────────── */
export default function BookCounsellorPage() {
  return (
    <main className="min-h-screen font-['Geist',sans-serif]">
      <BookingHero />
      <HowItWorks />
      <BookingForm />
      <CTABanner />
      <Footer />
    </main>
  );
}
