import { ArrowRight, ChevronRight } from "lucide-react";

export default function WhatWeDo() {
  return (
    <section className="bg-stone-50 py-16 px-6 lg:px-10">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-start">
          {/* Left text */}
          <div className="flex-1 flex flex-col gap-5">
            <p className="text-mint  text-sm font-medium uppercase tracking-widest font-['Bona_Nova',serif]">
              What we do
            </p>
            <h2 className="text-3xl lg:text-4xl text-stone-900 font-normal leading-snug font-['Geist',sans-serif] max-w-lg">
              At Ethos Clinical Supervision, we&aapos;ve developed something
              different.
            </h2>
            <div className="text-stone-600 text-base leading-relaxed space-y-4">
              <p>
                We partner with organisations and individual practitioners
                working in some of the most complex therapeutic
                environments—out-of-home care, NDIS services, trauma programs,
                and Aboriginal Community Controlled Organisations.
              </p>
              <p>
                We understand the weight your teams carry: life-altering
                decisions made before lunch, families held together while
                navigating broken systems, and the emotional impact of
                clients&apos; pain that often stays long after the workday ends.
              </p>
              <p>
                Too often, supervision models reduce this complexity to a
                checklist.{" "}
                <span className="text-stone-400 italic">
                  Case reviewed. ✓ Documentation updated. ✓ Move on.
                </span>
              </p>
              <p>
                But the work you do is far more than administrative compliance.
                It is clinical, ethical, and deeply human.
              </p>
            </div>

            <div className="pt-2">
              <p className="text-stone-700 text-base mb-3">
                Through our proprietary{" "}
                <strong>S.O. Reflective Practice Framework</strong>, we move
                beyond oversight to create supervision that genuinely
                strengthens practice. We support practitioners to:
              </p>
              <ul className="space-y-3">
                {[
                  "Understand the emotional and physiological realities of their work—not just what they do, but how they experience it",
                  `Identify ethical "stuck points" that contribute to moral injury and decision fatigue`,
                  "Translate reflection and insight into sustained, purposeful practice",
                ].map((item, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-3 text-stone-600 text-sm leading-relaxed"
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

            <button className="mt-2 bg-mint hover:bg-mintl text-white text-sm font-medium px-5 py-3 rounded-md transition-colors self-start flex items-center gap-2">
              Learn more <ArrowRight size={16} />
            </button>
          </div>

          {/* Right image */}
          <div className="flex-1 w-full">
            <div className="rounded-2xl overflow-hidden bg-stone-200 aspect-[4/5] w-full max-w-md mx-auto lg:mx-0 lg:max-w-none">
              <picture>
                {" "}
                <img
                  src="https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=700&q=80"
                  alt="Supervision session"
                  className="w-full h-full object-cover"
                />
              </picture>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
