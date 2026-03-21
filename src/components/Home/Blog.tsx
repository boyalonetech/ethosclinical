import { BLOG_POSTS } from "@/app/data/blog";
import { ArrowRight } from "lucide-react";

export function Blog() {
  return (
    <section className="bg-stone-50 py-16 px-6 lg:px-10">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl lg:text-5xl font-normal text-stone-900 text-center mb-12 font-['Bona_Nova',serif] tracking-tight">
          The Blog
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {BLOG_POSTS.map(({ title, date }, i) => (
            <div
              key={i}
              className="bg-mint/80 backdrop-blur-2xl rounded-xl overflow-hidden flex flex-col group hover:bg-stone-700 transition-colors"
            >
              <div className="p-6 pb-4">
                <p className="text-stone-300 text-xs font-medium mb-3 uppercase tracking-widest">
                  {date}
                </p>
                <h3 className="text-white text-xl font-normal leading-snug font-['Geist',sans-serif]">
                  {title}
                </h3>
              </div>
              <div className="mx-5 mb-5 rounded-xl overflow-hidden aspect-video bg-stone-500 flex-1">
                <picture>
                  <img
                    src={`https://images.unsplash.com/photo-${
                      [
                        "1573497161161-c3e73707e25c",
                        "1551836022-deb4988cc6c0",
                        "1552664730-d307ca884978",
                      ][i]
                    }?w=500&q=70`}
                    alt={title}
                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-300"
                  />
                </picture>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-10">
          <button className="bg-stone-600 hover:bg-stone-700 text-white text-sm font-medium px-6 py-3.5 rounded-md transition-colors flex items-center gap-2">
            View Blog <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </section>
  );
}
