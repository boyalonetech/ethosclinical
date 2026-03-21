export default function Team() {
  const avatarImages = [
    "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=70",
    "https://images.unsplash.com/photo-1573497161161-c3e73707e25c?w=400&q=70",
    "https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=400&q=70",
    "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&q=70",
  ];

  return (
    <section className="bg-stone-50 py-16 px-6 lg:px-10">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl lg:text-5xl font-normal text-stone-900 text-center mb-12 font-['Bona_Nova',serif] tracking-tight">
          The team that makes things happen.
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-start">
          {[0, 1].map((i) => (
            <div
              key={i}
              className="rounded-xl overflow-hidden bg-stone-200 aspect-[3/4]"
            >
              <picture>
                <img
                  src={avatarImages[i]}
                  alt={`Team member ${i + 1}`}
                  className="w-full h-full object-cover"
                />
              </picture>
            </div>
          ))}

          {/* Quote card */}
          <div className="rounded-xl bg-stone-100 flex  items-center justify-center aspect-[3/4] px-6">
            <p className="text-stone-800 text-xl font-normal text-center leading-snug">
              &quot;Mental health is a journey, not a final destination.&quot;
            </p>
          </div>

          <div className="rounded-xl overflow-hidden bg-stone-200 aspect-[3/4]">
            <picture>
              <img
                src={avatarImages[2]}
                alt="Team member 4"
                className="w-full h-full object-cover"
              />
            </picture>
          </div>
        </div>
      </div>
    </section>
  );
}
