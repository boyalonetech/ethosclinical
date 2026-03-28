export default function Team() {
  const avatarImages = ["/team.jpg", "/team1.jpg", "/team2.jpg", "/team3.jpg"];

  const teamMembers = [
    {
      name: "James Wilson",
      role: "Clinical Director",
      quote: "Every mind deserves compassionate care.",
    },
    {
      name: "Michael Chen",
      role: "Lead Therapist",
      quote: "Healing happens in safe spaces.",
    },
    {
      name: "Emily Rodriguez",
      role: "Wellness Coach",
      quote: "Small steps lead to big changes.",
    },
    {
      name: "Elvis Nwoke",
      role: "IT Specialist",
      quote: "Your story matters, and so does your voice.",
    },
  ];

  
  return (
    <section className="bg-stone-50 py-16 px-6 lg:px-10">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl lg:text-5xl font-normal text-stone-900 text-center mb-12 font-['Bona_Nova',serif] tracking-tight">
          The team that makes things happen.
        </h2>

        {/* Mobile: horizontal scroll, Desktop: grid */}
        <div className="overflow-x-auto lg:overflow-hidden">
          <div className="flex lg:grid lg:grid-cols-4 xl:grid-cols-4 gap-6 items-start w-max lg:w-full">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className="group relative rounded-xl overflow-hidden bg-stone-200 aspect-[3/4] cursor-pointer w-[280px] sm:w-[320px] lg:w-auto flex-shrink-0"
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
                <div className="absolute scale-110 inset-0 bg-brown shadow-lg flex flex-col items-center justify-center p-6 text-center transition-opacity duration-300 opacity-0 group-hover:opacity-100">
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
      </div>
    </section>
  );
}
