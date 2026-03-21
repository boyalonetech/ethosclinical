import { SUPERVISION_TYPES } from "@/app/data/supervision";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function SupervisionTypes() {
  return (
    <section className="bg-stone-50 py-16 px-6 lg:px-10">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl lg:text-5xl font-normal text-stone-900 text-center mb-12 font-['Bona_Nova',serif] tracking-tight">
          Types of Supervision
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {SUPERVISION_TYPES.map(({ icon: Icon, title, desc }, i) => (
            <div
              key={i}
              className="bg-white rounded-xl overflow-hidden flex flex-col group shadow hover:shadow-md transition-shadow"
            >
              {/* Image placeholder with icon overlay */}
              <div className="relative aspect-[4/3] bg-mint overflow-hidden">
                <picture>
                  {" "}
                  <img
                    src={`${
                      [
                        "https://images.unsplash.com/photo-1573497161161-c3e73707e25c?w=600&q=70",
                        "https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=600&q=70",
                        "https://images.unsplash.com/photo-1568992687947-868a62a9f521?w=600&q=70",
                        "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=600&q=70",
                        "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&q=70",
                        "https://static.wixstatic.com/media/11062b_2eb5319306854d3eac1c40c7c05402ad~mv2.jpg/v1/fill/w_528,h_352,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/11062b_2eb5319306854d3eac1c40c7c05402ad~mv2.jpg",
                        "https://images.unsplash.com/photo-1527525443048-ccf5b3f3d9b7?w=600&q=70",
                      ][i]
                    }`}
                    alt={title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </picture>
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-2">
                  <Icon size={20} className="text-stone-700" />
                </div>
              </div>

              <div className="p-5 flex flex-col gap-3 flex-1">
                <h3 className="text-xl font-normal text-stone-900 leading-snug font-['Geist',sans-serif]">
                  {title}
                </h3>
                <p className="text-stone-500 text-sm leading-relaxed flex-1">
                  {desc}
                </p>
                <Link
                  href="#"
                  className="inline-flex items-center gap-1.5 text-mint text-sm font-medium font-['Bona_Nova',serif] hover:gap-2.5 transition-all mt-1"
                >
                  Read more <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
