import { ArrowRight } from "lucide-react";

export default function WhoWeAre() {
  return (
    <section className="bg-stone-50 py-16 px-6 lg:px-10">
      <div className="max-w-7xl mx-auto">
        <div className="max-w-4xl mx-auto flex flex-col gap-5">
          <p className="text-mint text-sm font-medium uppercase tracking-widest">
            About Us
          </p>
          <h2 className="text-4xl lg:text-5xl font-normal text-stone-900 font-['Bona_Nova',serif] tracking-tight">
            Who we are
          </h2>

          <div className="rounded-2xl overflow-hidden bg-stone-200 aspect-video">
            <picture>
              <img
                src="/about.jpg"
                alt="Our team"
                className="w-full h-full object-cover"
              />
            </picture>
          </div>

          <div className="text-black text-base leading-relaxed space-y-4 mt-2">
            <p>
              At Ethos Clinical Supervision, we take a different approach. We
              work with organisations and individual practitioners in some of
              the most complex therapeutic environments—out-of-home care, NDIS
              services, trauma programs, and Aboriginal Community Controlled
              Organisations.
            </p>
            <p>
              We understand the weight your teams carry: life-altering decisions
              made daily, families navigating broken systems, and the emotional
              impact of clients&apos; experiences that often stays with you long
              after the workday ends.
            </p>
            <p>
              Too often, supervision reduces this complexity to a checklist.{" "}
              <span className="text-stone-400 italic">
                Case reviewed. ✓ Documentation updated. ✓ Move on.
              </span>
            </p>
            <p>
              But this work is far more than administrative. It is ethical,
              relational, and deeply human—and supervision should reflect that.
            </p>
          </div>

          <a
            href="/about"
            className="inline-flex items-center gap-2 text-mint text-base font-normal font-['Bona_Nova',serif] hover:gap-3 transition-all self-start"
          >
            About Us <ArrowRight size={16} />
          </a>
        </div>
      </div>
    </section>
  );
}
