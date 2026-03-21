import { APPROACHES, DRIVES } from "@/app/data/about";
import { ChevronRight } from "lucide-react";

export function DrivesAndApproach() {
  return (
    <section className="bg-stone-50 py-12 px-6 lg:px-10">
      <div className="max-w-4xl mx-auto flex flex-col gap-12">
        {/* What Drives Stephen */}
        <div className="flex flex-col gap-5">
          <h2 className="text-2xl font-normal text-mint">
            What Drives Stephen&apos;s Work
          </h2>
          <ul className="flex flex-col gap-3">
            {DRIVES.map((item, i) => (
              <li
                key={i}
                className="flex items-start gap-3 text-stone-700 text-base leading-relaxed"
              >
                <ChevronRight
                  size={16}
                  className="text-gray-700 mt-0.5 shrink-0"
                />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="border-t border-stone-200" />

        {/* Stephen's Approach */}
        <div className="flex flex-col gap-5">
          <h2 className="text-2xl font-normal text-mint">
            Stephen&apos;s Approach
          </h2>
          <ul className="flex flex-col gap-3">
            {APPROACHES.map((item, i) => (
              <li
                key={i}
                className="flex items-start gap-3 text-stone-700 text-base leading-relaxed"
              >
                <ChevronRight
                  size={16}
                  className="text-stone-500 mt-0.5 shrink-0"
                />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
