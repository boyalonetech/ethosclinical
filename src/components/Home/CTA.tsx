import { ArrowRight } from "lucide-react";

export default function CTABanner() {
  return (
    <section className="bg-white py-16 px-6 lg:px-10">
      <div className="max-w-7xl mx-auto">
        <div className="relative bg-black backdrop-blur-2xl rounded-2xl overflow-hidden px-8 py-16 sm:py-20 text-center">
          {/* Decorative dots */}
          {[
            "top-5 right-5",
            "top-5 right-12",
            "top-12 right-5",
            "top-12 right-12",
            "bottom-5 left-5",
            "bottom-5 left-12",
            "bottom-12 left-5",
            "bottom-12 left-12",
          ].map((pos, i) => (
            <span
              key={i}
              className={`absolute w-4 h-4 rounded-full bg-zinc-400/60 ${pos}`}
            />
          ))}

          <p className="text-stone-300 text-sm font-normal font-['Bona_Nova',serif] mb-3 tracking-widest uppercase">
            Ethos Clinical Supervision
          </p>
          <h2 className="text-white text-3xl sm:text-4xl font-normal max-w-2xl mx-auto leading-snug mb-8 font-['Geist',sans-serif]">
            An organisation built on a strong commitment to supporting people.
          </h2>
          <button className="bg-mint hover:bg-stone-400 text-white text-sm font-medium px-6 py-3.5 rounded-md transition-colors inline-flex items-center gap-2">
            Book a Counsellor <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </section>
  );
}
