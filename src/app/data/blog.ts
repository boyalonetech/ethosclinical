import { db } from "@/backend/server";
import { BookOpen, Heart, TrendingUp, Users } from "lucide-react";

export const getBlogPosts = async () => {
  try {
    // ✅ Correct: Use getFullList() to fetch all records
    const records = await db.collection("posts").getFullList({
      sort: "-created", // Sort by creation date, newest first
    });

    // Map the PocketBase records to your component's expected format
    const formattedPosts = records.map((record) => ({
      id: record.id,
      category: record.category,
      title: record.title,
      excerpt: record.excerpt,
      date: record.date,
      readTime: record.readTime,
      image: record.image,
    }));

    return formattedPosts;
  } catch (error) {
    console.error("Error fetching posts:", error);
    return []; // Return empty array on error
  }
};

// export const getBlogPosts = async () => {
//   try {
 // const api = process.env.NEXT_PUBLIC_DATABASE_API!;
//     const response = await fetch(
//       `${api}/api/collections/posts/records`,
//     );

//     if (!response.ok) {
//       throw new Error(`HTTP error! status: ${response.status}`);
//     }

//     const data = await response.json();
//     const blog = data.items || data;
//     return blog; // Return the actual array
//   } catch (error) {
//     console.error("Error fetching posts:", error);
//     return []; // Return empty array on error
//   }
// };
// getPosts();

export const BLOG_POST = await getBlogPosts();
// export const BlogPosts

export const CATEGORIES = [
  { label: "All", count: 12 },
  { label: "Burnout & Wellbeing", count: 4 },
  { label: "Ethical Practice", count: 3 },
  { label: "Leadership", count: 2 },
  { label: "Trauma & Recovery", count: 3 },
];

export const FEATURED_POST = {
  category: "Burnout & Wellbeing",
  title: "The Hidden Cost of Moral Injury: Why Your Best Staff Are Burning Out",
  excerpt:
    "Moral injury isn't weakness—it's what happens when skilled, committed practitioners are repeatedly forced to act against their values. Understanding this distinction could save your organisation's most important people.",
  author: "Stephen Onyekwere",
  authorRole: "Principal Consultant",
  date: "June 12, 2025",
  readTime: "8 min read",
  image:
    "https://images.unsplash.com/photo-1573497161161-c3e73707e25c?w=1200&q=80",
};

// Remove duplicate BLOG_POST array or rename if needed
// Keeping for backward compatibility if used elsewhere
// export const BLOG_POST = blog;

export const STATS = [
  { icon: BookOpen, value: "12+", label: "Articles Published" },
  { icon: Users, value: "50+", label: "Practitioners Supported" },
  { icon: Heart, value: "6", label: "Specialist Topics" },
  { icon: TrendingUp, value: "3+", label: "Years of Practice" },
];

export const CATEGORY_COLORS: Record<string, string> = {
  "Burnout & Wellbeing": "bg-mint/80 text-white",
  "Ethical Practice": "bg-mint/80 text-white",
  Leadership: "bg-mint/80 text-white",
  "Trauma & Recovery": "bg-mint/80 text-white",
};
