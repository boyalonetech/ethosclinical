// app/data/blog.ts
import { getPosts, PostRecord } from "@/backend/server";

export interface Section {
  id: string;
  type: "paragraph" | "heading" | "bulletList" | "numberedList";
  title?: string;
  content: string;
  items?: string[];
}

export interface BlogPost {
  id: string;
  category: string;
  title: string;
  subtitle?: string;
  excerpt: string;
  date: string;
  readTime: string;
  image: string;
  author: string;
  sections: Section[];
  created?: string;
  updated?: string;
}

// Define the structure of content from database
interface DatabaseContent {
  type?: "paragraph" | "heading" | "bulletList" | "numberedList";
  title?: string;
  content?: string;
  items?: string[];
  sections?: Section[];
}

// Helper function to convert database content to sections
const convertDatabaseContentToSections = (
  contentArray: DatabaseContent[],
): Section[] => {
  if (!contentArray || !Array.isArray(contentArray)) {
    return [];
  }

  return contentArray.map((item, index) => ({
    id: `section-${Date.now()}-${index}`,
    type: item.type || "paragraph",
    content: item.content || "",
    title: item.title || undefined,
    items: item.items || undefined,
  }));
};

// Fetch blog posts from PocketBase
export const getBlogPosts = async (): Promise<BlogPost[]> => {
  try {
    const records = await getPosts();
    console.log("Raw records from database:", records); // Debug: See raw data

    const formattedPosts: BlogPost[] = records.map((record: PostRecord) => {
      let sections: Section[] = [];

      // Handle different content structures
      if (record.content) {
        try {
          // Try to parse if it's a string
          const parsedContent: DatabaseContent | DatabaseContent[] | string =
            typeof record.content === "string"
              ? JSON.parse(record.content)
              : record.content;

          // Check if it's an array (your database structure)
          if (Array.isArray(parsedContent)) {
            sections = convertDatabaseContentToSections(parsedContent);
          }
          // Check if it's an object with sections property
          else if (
            typeof parsedContent === "object" &&
            parsedContent !== null &&
            "sections" in parsedContent &&
            Array.isArray(parsedContent.sections)
          ) {
            sections = parsedContent.sections;
          }
          // If it's a single object with type and content
          else if (
            typeof parsedContent === "object" &&
            parsedContent !== null &&
            "type" in parsedContent &&
            "content" in parsedContent
          ) {
            sections = convertDatabaseContentToSections([
              parsedContent as DatabaseContent,
            ]);
          }
          // If it's a plain string
          else if (typeof parsedContent === "string") {
            sections = [
              {
                id: `section-${Date.now()}`,
                type: "paragraph",
                content: parsedContent,
              },
            ];
          }
        } catch (e) {
          console.error("Error parsing content for post", record.id, e);
          // If parsing fails, treat as plain text
          sections = [
            {
              id: `section-${Date.now()}`,
              type: "paragraph",
              content: String(record.content),
            },
          ];
        }
      }

      // If no sections were created, create a default one from excerpt
      if (sections.length === 0 && record.excerpt) {
        sections = [
          {
            id: `section-${Date.now()}`,
            type: "paragraph",
            content: record.excerpt,
          },
        ];
      }

      return {
        id: record.id,
        category: record.category || "Uncategorized",
        title: record.title || "Untitled",
        subtitle: record.subtitle || "",
        excerpt: record.excerpt || "",
        date:
          record.date ||
          new Date(record.created).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          }),
        readTime: record.readTime || "5 min read",
        image: record.image || "https://placehold.co/1200x800?text=Blog+Image",
        author: record.author || "Anonymous",
        sections: sections,
        created: record.created,
        updated: record.updated,
      };
    });

    console.log("Formatted posts:", formattedPosts); // Debug: See formatted data
    return formattedPosts;
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    return [];
  }
};

// Categories for filtering
export const CATEGORIES = [
  { label: "All", count: 0 },
  { label: "Moral Injury", count: 0 },
  { label: "Clinical Supervision", count: 0 },
  { label: "Self-Care", count: 0 },
  { label: "Trauma-Informed Care", count: 0 },
  { label: "Ethical Practice", count: 0 },
  { label: "Supervision", count: 0 },
  { label: "Mental Health", count: 0 },
  { label: "Professional Development", count: 0 },
];

// Category colors for UI
export const CATEGORY_COLORS: Record<string, string> = {
  "Moral Injury": "bg-mint text-white",
  "Clinical Supervision": "bg-mint text-white",
  "Self-Care": "bg-mint text-white",
  "Trauma-Informed Care": "bg-mint text-white",
  "Ethical Practice": "bg-mint text-white",
  Supervision: "bg-mint text-white",
  "Mental Health": "bg-mint text-white",
  "Professional Development": "bg-mint text-white",
  Uncategorized: "bg-mint text-white",
};

// Stats for the blog page
export const STATS = [
  { icon: "BookOpen", value: "10", label: "Articles Published" },
  { icon: "Users", value: "25", label: "Practitioners Supported" },
  { icon: "Heart", value: "12", label: "Specialist Topics" },
  { icon: "TrendingUp", value: "30", label: "Years of Practice" },
];
