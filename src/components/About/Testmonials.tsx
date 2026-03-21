import { TESTIMONIALS } from "@/app/data/about";
import { Quote } from "lucide-react";

export default function Testimonials() {
  return (
    <section className="bg-stone-50 py-16 px-6 lg:px-10">
      <div className="max-w-7xl mx-auto">
        <div className="max-w-xl mx-auto text-center mb-12 flex flex-col gap-3">
          <h2 className="text-4xl lg:text-5xl font-normal text-stone-900 font-['Bona_Nova',serif] tracking-tight">
            Don&apos;t just take our word for it.
          </h2>
          <p className="text-stone-500 text-sm leading-relaxed">
            Explore the experiences of practitioners and organisations who have
            benefited from reflective, ethically grounded clinical supervision.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map(({ quote, name, role }, i) => (
            <div
              key={i}
              className="bg-mint rounded-xl p-6 flex flex-col gap-5 hover:bg-mintl transition-colors"
            >
              <Quote size={22} className="text-stone-300" />
              <p className="text-white text-sm leading-relaxed flex-1">
                {quote}
              </p>
              <div className="flex items-center gap-3 pt-2 border-t border-gray-100">
                <div className="w-10 h-10 rounded-full bg-gray-100 overflow-hidden shrink-0">
                  <picture>
                    {" "}
                    <img
                      src={`https://images.unsplash.com/photo-${
                        [
                          "1560250097-0b93528c311a",
                          "1573497161161-c3e73707e25c",
                          "1551836022-deb4988cc6c0",
                        ][i]
                      }?w=100&q=60`}
                      alt={name}
                      className="w-full h-full object-cover"
                    />
                  </picture>
                </div>
                <div>
                  <p className="text-white text-sm font-semibold">{name}</p>
                  <p className="text-stone-300 text-xs">{role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
