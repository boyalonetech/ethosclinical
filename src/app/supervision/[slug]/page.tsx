// app/supervision/[slug]/page.tsx
"use client";

import { useParams, useRouter } from "next/navigation";
import { SUPERVISION_TYPES, SupervisionType } from "@/app/data/supervision";
import {
  ArrowRight,
  CheckSquare,
} from "lucide-react";
import Link from "next/link";

// Types
interface SupervisionDetails {
  slug: string;
  bullets: string[];
  idealFor: string;
  imagePath: string;
}

type SupervisionDetailsMap = {
  [key: string]: SupervisionDetails;
};

// Image paths matching the ones used in SupervisionTypes component
const imagePaths = [
  "/super.jpg",
  "/super1.jpg",
  "/super2.jpg",
  "/super3.jpg",
  "/super4.jpg",
  "/super5.jpg",
  "/super6.jpg",
];

// Helper function to get image path based on title
const getImagePath = (title: string): string => {
  const index = SUPERVISION_TYPES.findIndex((type) => type.title === title);
  return imagePaths[index] || "/super.jpg";
};

// Detailed data for each supervision type
const SUPERVISION_DETAILS: SupervisionDetailsMap = {
  "individual-clinical-supervision": {
    slug: "individual-clinical-supervision",
    bullets: [
      "Untangle the 'stuck points' in your most challenging cases",
      "Process vicarious trauma before it becomes burnout",
      "Reconnect with your clinical judgment when decision fatigue sets in",
      "Develop the tools to remain present and boundaried in extraordinarily demanding work",
    ],
    idealFor:
      "Therapeutic specialists, support coordinators, senior clinicians, independent practitioners",
    imagePath: "/super.jpg",
  },
  "group-clinical-supervision": {
    slug: "group-clinical-supervision",
    bullets: [
      "Learn from diverse perspectives and collective wisdom",
      "Share resources and strategies with peers",
      "Build a supportive professional network",
      "Reduce isolation through community connection",
    ],
    idealFor:
      "Practitioners seeking collaborative learning, teams wanting to align approaches, community of practice groups",
    imagePath: "/super1.jpg",
  },
  "organisational-supervision": {
    slug: "organisational-supervision",
    bullets: [
      "Strengthen organisational culture and sustainability",
      "Develop consistent supervision practices across teams",
      "Address systemic challenges and team dynamics",
      "Build capacity for reflective practice at all levels",
    ],
    idealFor:
      "Agencies managing 5-8+ therapeutic specialists, team leaders, program managers",
    imagePath: "/super2.jpg",
  },
  "trauma-informed-supervision": {
    slug: "trauma-informed-supervision",
    bullets: [
      "Understand trauma responses in clients and practitioners",
      "Maintain therapeutic presence with complex presentations",
      "Prevent vicarious traumatisation",
      "Integrate neuroscience into case conceptualisation",
    ],
    idealFor:
      "Trauma specialists, crisis workers, mental health clinicians, first responders",
    imagePath: "/super3.jpg",
  },
  "leadership-and-executive-consultation": {
    slug: "leadership-and-executive-consultation",
    bullets: [
      "Navigate ethical complexities in leadership roles",
      "Maintain clinical integrity while managing systems",
      "Process the weight of high-stakes decisions",
      "Develop sustainable leadership practices",
    ],
    idealFor:
      "Clinical directors, program managers, executives in human services",
    imagePath: "/super4.jpg",
  },
  "culturally-informed-supervision": {
    slug: "culturally-informed-supervision",
    bullets: [
      "Deepen cultural responsiveness in practice",
      "Work authentically with Aboriginal and Torres Strait Islander communities",
      "Navigate cultural complexity with confidence",
      "Integrate cultural perspectives into clinical work",
    ],
    idealFor:
      "Practitioners working with Indigenous communities, culturally diverse teams, organisations committed to cultural safety",
    imagePath: "/super5.jpg",
  },
};

// Helper function to convert title to slug
const titleToSlug = (title: string): string => {
  return title.toLowerCase().replace(/&/g, "and").replace(/\s+/g, "-");
};

export default function SupervisionDetailPage() {
  const params = useParams();
  const rawSlug = params.slug as string;
  const normalizedSlug = titleToSlug(decodeURIComponent(rawSlug || ""));

  // Find the supervision type that matches the slug
  const supervisionType = SUPERVISION_TYPES.find(
    (type: SupervisionType) => titleToSlug(type.title) === normalizedSlug,
  );
  const router = useRouter();


  const details = SUPERVISION_DETAILS[normalizedSlug];

  if (!supervisionType || !details) {
    return (
      <div className="min-h-screen bg-stone-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-normal text-stone-900 mb-4">
            Supervision type not found
          </h1>
          <Link
            href="/"
            className="text-stone-600 hover:text-stone-800 underline"
          >
            Return to home
          </Link>
        </div>
      </div>
    );
  }

  const { icon: Icon, title, desc } = supervisionType;


  return (
    <div className="min-h-screen bg-stone-50 font-['Geist',sans-serif]">
      {/* Hero Section */}
      <section className="w-full bg-stone-50 px-6 md:px-16 py-10 md:py-16">
        <div className="max-w-[1300px] mx-auto flex flex-col lg:flex-row items-start gap-10 lg:gap-16">
          {/* Left copy */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 mb-4">
              <Icon size={32} className="text-mintl" />
              <p className="text-black text-xl font-normal font-['Bona_Nova',serif]">
                Supervision
              </p>
            </div>
            <h1 className="text-3xl md:text-4xl font-normal text-black leading-tight mb-6">
              {title}
            </h1>
            <p className="text-base text-black/80 leading-relaxed mb-4">
              {desc}
            </p>

            <ul className="space-y-3 mb-6">
              {details.bullets.map((bullet: string) => (
                <li key={bullet} className="flex items-start gap-2.5">
                  <CheckSquare
                    size={20}
                    className="mt-0.5 shrink-0 text-mintl"
                    strokeWidth={1.8}
                  />
                  <span className="text-base text-black/80 leading-relaxed">
                    {bullet}
                  </span>
                </li>
              ))}
            </ul>

            <p className="text-base text-black/80 leading-relaxed">
              <span className="font-semibold">Ideal for:</span>{" "}
              {details.idealFor}
            </p>

            <button
              type="button"
              onClick={() => router.push("/book")}
              className="mt-8 px-6 py-3 bg-mint hover:bg-brown text-white text-base font-medium rounded-md transition-colors duration-200"
            >
              Book a Session
            </button>
          </div>

          {/* Right image */}
          <div className="w-full lg:w-[500px] shrink-0">
            <div className="relative rounded-2xl overflow-hidden bg-stone-100">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={details.imagePath}
                alt={title}
                className="w-full rounded-2xl object-cover aspect-[550/518]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Other Supervision Types Section */}
      <section className="w-full bg-stone-50 px-6 md:px-16 py-12 md:py-16">
        <div className="max-w-[1300px] mx-auto">
          <h2 className="text-3xl md:text-4xl font-normal font-['Bona_Nova',serif] text-black text-center mb-10 tracking-tight">
            Other types of Supervision
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {SUPERVISION_TYPES.filter(
              (type: SupervisionType) => titleToSlug(type.title) !== normalizedSlug,
            ).map(
              ({
                icon: CardIcon,
                title: cardTitle,
                desc: cardDesc,
              }: SupervisionType) => {
                const cardImagePath = getImagePath(cardTitle);
                return (
                  <Link
                    key={cardTitle}
                    href={`/supervision/${titleToSlug(cardTitle)}`}
                    className="group block"
                  >
                    <div className="bg-white rounded-xl hover:text-white hover:bg-brown p-3 overflow-hidden flex flex-col shadow hover:shadow-md transition-shadow cursor-pointer">
                      {/* Image with icon overlay */}
                      <div className="relative rounded-2xl aspect-[4/3] bg-mint overflow-hidden">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={cardImagePath}
                          alt={cardTitle}
                          className="w-full h-full rounded-2xl object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-2">
                          <CardIcon
                            size={20}
                            className="text-brown transition-colors"
                          />
                        </div>
                      </div>

                      <div className="p-2 px-3 flex flex-col gap-3 flex-1">
                        <h3 className="text-xl font-normal text-black group-hover:text-white leading-snug font-['Geist',sans-serif]">
                          {cardTitle}
                        </h3>
                        <p className="text-black group-hover:text-white text-sm leading-relaxed flex-1">
                          {cardDesc}
                        </p>
                        <div className="inline-flex items-center text-black group-hover:text-white gap-1.5 text-sm font-medium font-['Bona_Nova',serif] hover:gap-2.5 transition-all mt-1">
                          Read more <ArrowRight size={14} />
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              },
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
