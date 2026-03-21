import { AllPosts } from "../Blog/AllPost";

export function Blog() {
  return (
    <section className="bg-stone-50 py-16 px-6 lg:px-10">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl lg:text-5xl font-normal text-stone-900 text-center mb-12 font-['Bona_Nova',serif] tracking-tight">
          The Blog
        </h2>

        <AllPosts />
      </div>
    </section>
  );
}
