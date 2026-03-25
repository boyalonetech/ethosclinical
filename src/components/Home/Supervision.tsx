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
              className="bg-white group rounded-xl hover:text-white hover:bg-brown p-3 overflow-hidden flex flex-col group shadow hover:shadow-md transition-shadow"
            >
              {/* Image placeholder with icon overlay */}
              <div className="relative rounded-2xl  aspect-[4/3] bg-mint overflow-hidden">
                <picture>
                  {" "}
                  <img
                    src={`${
                      [
                        "/super.jpg",
                        "/super1.jpg",
                        "/super2.jpg",
                        "/super3.jpg",
                        "/super4.jpg",
                        "/super5.jpg",
                        "/super6.jpg",
                      ][i]
                    }`}
                    alt={title}
                    className="w-full h-full rounded-2xl object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </picture>
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-2">
                  <Icon size={20} className="text-stone-700" />
                </div>
              </div>

              <div className="p-2 px-3  flex flex-col gap-3 flex-1">
                <h3 className="text-xl font-normal text-black group-hover:text-white leading-snug font-['Geist',sans-serif]">
                  {title}
                </h3>
                <p className="text-black group-hover:text-white text-sm leading-relaxed flex-1">
                  {desc}
                </p>
                <Link
                  href="#"
                  className="inline-flex items-center text-black group-hover:text-white gap-1.5 text-mint text-sm font-medium font-['Bona_Nova',serif] hover:gap-2.5 transition-all mt-1"
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
