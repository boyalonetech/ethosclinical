import BlogPage from "../Blog/AllPost";

export function Blog() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-stone-50 overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
          <div className="text-center max-w-4xl mx-auto">
            {/* Main Heading */}
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-semibold text-black/90 mb-6">
              The Blog
            </h1>
          </div>
        </div>
      </section>

      {/* Blog Content */}
      <div className="bg-white">
        <BlogPage />
      </div>
    </>
  );
}
