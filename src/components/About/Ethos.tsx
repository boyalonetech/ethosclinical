import { ETHOS_COMMITMENTS } from "@/app/data/about";
import { Eye, Target } from "lucide-react";

export default function EthosDifference() {
  return (
    <section className="bg-stone-50 py-12 px-6 lg:px-10">
      <div className="max-w-4xl mx-auto flex flex-col gap-8">
        <div className="flex flex-col gap-3">
          <h2 className="text-3xl font-normal text-mint">
            The Ethos Difference
          </h2>
          <p className="text-gray-900 text-base leading-relaxed">
            Ethos Clinical Supervision is not a corporate training firm, and it
            is not a tick-box compliance service. We are practitioners who
            understand that reflective practice is not a luxury. In environments
            where burnout and moral injury are increasingly common, it is a
            clinical necessity. Our commitment includes:
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {ETHOS_COMMITMENTS.map(({ icon: Icon, title, desc }, i) => (
            <div
              key={i}
              className="bg-white rounded-xl p-6 flex flex-col gap-3 border border-stone-100 hover:border-stone-300 transition-colors"
            >
              <div className="w-10 h-10 rounded-lg bg-mint/20 flex items-center justify-center">
                <Icon size={18} className="text-mintl" />
              </div>
              <h3 className="text-stone-900 font-semibold text-base">
                {title}
              </h3>
              <p className="text-gray-700 text-sm leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>

        {/* Mission & Vision cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-2">
          {[
            {
              icon: Target,
              label: "Our Mission",
              text: "To support mental health and human services professionals through rigorous, ethically grounded clinical supervision that bridges the gap between theory and frontline practice—strengthening practitioner resilience while improving outcomes for the people and communities they serve.",
            },
            {
              icon: Eye,
              label: "Our Vision",
              text: "To become a trusted partner for reflective practice across NSW, helping shape a sector where clinical excellence is defined not only by what practitioners do, but by the depth of thought, ethical integrity, and humanity they bring to every therapeutic encounter.",
            },
          ].map(({ icon: Icon, label, text }) => (
            <div
              key={label}
              className="bg-mint hover:bg-brown rounded-xl p-7 flex flex-col gap-4"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-gray-100  transition-colors  duration-200 flex items-center justify-center">
                  <Icon size={16} className="text-mint" />
                </div>
                <h3 className="text-white text-xl font-semibold">{label}</h3>
              </div>
              <p className="text-stone-200 text-sm leading-relaxed">{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
