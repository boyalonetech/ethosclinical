export default function MeetStephen() {
  return (
    <section className="bg-stone-50 pt-16 pb-12 px-6 lg:px-10">
      <div className="max-w-7xl mx-auto">
        {/* Headline */}
        <h1 className="text-4xl sm:text-5xl lg:text-7xl font-semibold font-[Geist] text-stone-900 text-center leading-tight max-w-3xl mx-auto mb-12">
          Finding balance and peace of mind.
        </h1>

        {/* Profile image */}
        <div className="rounded-2xl overflow-hidden bg-stone-200 aspect-video max-w-4xl mx-auto mb-10">
          <picture>
            {" "}
            <img
              src="/about.jpg"
              alt="Stephen Onyekwere"
              className="w-full h-full object-cover"
            />
          </picture>
        </div>

        {/* Bio block */}
        <div className="max-w-4xl mx-auto flex flex-col gap-5">
          <div className="flex flex-col gap-1">
            <p className="text-mint font-medium text-base">
              Meet Stephen Onyekwere
            </p>
            <p className="text-gray-700 text-sm leading-relaxed">
              Principal Consultant | Ethos Clinical Supervision
              <br />
              M.Phil, M.Mental Health | B.Phil, B.Th | Grad.Cert Mental Health
              <br />
              Dip. Mental Health | Dip. Counselling | TAE
            </p>
          </div>

          <div className="text-gray-900 text-base leading-relaxed space-y-4">
            <p>
              Stephen isn&apos;t a consultant who studies frontline complexity
              from an office. He works within it.
            </p>
            <p>
              Currently embedded in the sector as a Therapeutic Specialist with
              Family Spirit, Stephen spends his days alongside practitioners
              navigating some of the most demanding therapeutic environments. He
              has witnessed extraordinary clinical skill, supported teams facing
              impossible ethical decisions, and observed a consistent pattern:
            </p>
            <p className="text-stone-700 font-medium italic border-l-2 border-stone-400 pl-4">
              The most resilient practitioners are not necessarily those with
              the most impressive credentials. They are the ones who have
              protected space to reflect deeply on their work.
            </p>
            <p>
              Stephen&apos;s academic background is unusually interdisciplinary.
              Studies in philosophy (B.Phil), theology (B.Th), mental health
              (M.Mental Health), and philosophical inquiry (M.Phil) have
              converged into something rare: a clinician who engages seriously
              with the ethical, existential, and human dimensions of therapeutic
              practice.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
