export default function Team() {
  const avatarImages = [
    "/stephen.jpeg  ",
    "/elvis.jpeg",
    "https://lh3.googleusercontent.com/p/AF1QipPU82NcntaGuFlqGW8wJoKJdOSkSO5jS1Ojd0-z=s1360-w1360-h1020-rw",
    "/team2.jpg",
    "/team1.jpg",
  ];

  const teamMembers = [
    {
      name: "Stephen C. Onyekwere",
      role: "Clinical Director | THERAPEUTIC SPECIALIST",
      quote: "Every mind deserves compassionate care.",
    },
    {
      name: "Elvis Nwoke",
      role: "IT Specialist",
      quote: "Your story matters, and so does your voice.",
    },

    {
      name: "Divine Timothy",
      role: "Software Developer",
      quote: "Small steps lead to big changes.",
    },
    {
      name: "Emily Rodriguez",
      role: "Wellness Coach",
      quote: "Small steps lead to big changes.",
    },
    {
      name: "Michael Chen",
      role: "Lead Therapist",
      quote: "Healing happens in safe spaces.",
    },
  ];

  // Check if there are more than 4 team members
  const hasMoreThanFourCards = teamMembers.length > 4;

  // Check if scrolling is needed on desktop or mobile
  const needsScrollIndicator = hasMoreThanFourCards;

  return (
    <section className="bg-stone-50 py-16 px-6 lg:px-10">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl lg:text-5xl font-normal text-stone-900 text-center mb-12 font-['Bona_Nova',serif] tracking-tight">
          The team that makes things happen.
        </h2>

        {/* Mobile: always horizontal scroll, Desktop: scroll only if > 4 cards */}
        <div
          className={`overflow-x-auto ${
            hasMoreThanFourCards ? "lg:overflow-x-scroll" : "lg:overflow-hidden"
          }`}
        >
          <div
            className={`flex gap-6 items-start ${
              hasMoreThanFourCards
                ? "lg:flex-nowrap"
                : "lg:grid lg:grid-cols-4 xl:grid-cols-4"
            } ${!hasMoreThanFourCards ? "lg:w-full" : ""}`}
          >
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className={`group relative rounded-xl overflow-hidden bg-stone-200 aspect-[3/4] cursor-pointer flex-shrink-0 ${
                  hasMoreThanFourCards
                    ? "w-[280px] sm:w-[320px] lg:w-[280px]"
                    : "w-[280px] sm:w-[320px] lg:w-auto"
                }`}
              >
                {/* Image - visible in normal state */}
                <picture className="absolute inset-0 transition-opacity duration-300 group-hover:opacity-0">
                  <img
                    src={avatarImages[index % avatarImages.length]}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </picture>

                {/* Text overlay - visible on hover */}
                <div className="absolute scale-110 inset-0 bg-brown shadow-lg flex flex-col items-center justify-center p-4 text-center transition-opacity duration-300 opacity-0 group-hover:opacity-100">
                  <h3 className="text-white text-2xl font-semibold mb-2 font-['Bona_Nova',serif]">
                    {member.name}
                  </h3>
                  <p className="text-white/70 text-sm mb-4">{member.role}</p>
                  <p className="text-white text-base leading-relaxed">
                    &apos;{member.quote}&apos;
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll indicator text */}
        {needsScrollIndicator && (
          <div className="mt-8 text-center">
            <p className="text-stone-500 text-sm flex items-center justify-center gap-2 animate-pulse">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
              Scroll to see more team members
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </p>
            {/* Mobile only indicator */}
            <p className="text-stone-400 text-xs mt-1 block lg:hidden">
              Swipe to view all team members
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
