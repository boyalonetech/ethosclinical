import { BookOpen, Heart, TrendingUp, Users } from "lucide-react";

// Fixed BLOG_POSTS to match the BlogPost structure
export const BLOG_POSTS = [
  {
    category: "Burnout & Wellbeing",
    title: "The Hidden Cost of Moral Injury: Why Your Best Staff Are Burning Out",
    excerpt: "Moral injury isn't weakness—it's what happens when skilled, committed practitioners are repeatedly forced to act against their values. Understanding this distinction could save your organisation's most important people.",
    author: "Stephen Onyekwere",
    date: "June 2025",
    readTime: "8 min read",
    image: "https://images.unsplash.com/photo-1573497161161-c3e73707e25c?w=700&q=70",
  },
  {
    category: "Ethical Practice",
    title: "Decision Fatigue Isn't About Willpower, It's About Moral Bandwidth",
    excerpt: "When practitioners struggle to make clear decisions by the afternoon, the cause is rarely personal weakness. It's a structural and ethical problem that supervision can address.",
    author: "Stephen Onyekwere",
    date: "May 2025",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=700&q=70",
  },
  {
    category: "Leadership",
    title: "Clinical Supervision and Executive Leadership: Why the Best Leaders Get Supervised Too",
    excerpt: "Leadership in complex human services environments carries unique ethical weight. Reflective supervision isn't just for frontline staff—it's a strategic tool for organisational resilience.",
    author: "Stephen Onyekwere",
    date: "April 2025",
    readTime: "7 min read",
    image: "https://images.unsplash.com/photo-1568992687947-868a62a9f521?w=700&q=70",
  },
  {
    category: "Trauma & Recovery",
    title: "Secondary Trauma and the Practitioners Who Carry It Home",
    excerpt: "The emotional residue of complex trauma work doesn't disappear at 5pm. Here's what organisations and supervisors can do to create genuine containment.",
    author: "Stephen Onyekwere",
    date: "March 2025",
    readTime: "9 min read",
    image: "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=700&q=70",
  },
  {
    category: "Burnout & Wellbeing",
    title: "The S.O. Reflective Practice Framework: Moving Beyond the Checklist",
    excerpt: "Most supervision models treat reflection as a formality. Ethos's proprietary framework treats it as the clinical core—here's what that looks like in practice.",
    author: "Stephen Onyekwere",
    date: "February 2025",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=700&q=70",
  },
  {
    category: "Ethical Practice",
    title: "When Systems Fail Clients: Holding Ethical Integrity Under Pressure",
    excerpt: "Practitioners working in broken systems face impossible choices daily. Reflective supervision provides the space to process these moments without absorbing their damage.",
    author: "Stephen Onyekwere",
    date: "January 2025",
    readTime: "7 min read",
    image: "https://images.unsplash.com/photo-1527525443048-ccf5b3f3d9b7?w=700&q=70",
  },
  {
    category: "Trauma & Recovery",
    title: "Culturally Safe Supervision for Aboriginal and Torres Strait Islander Practitioners",
    excerpt: "Genuine cultural safety requires more than awareness training. It demands supervision models built from the ground up to honour different ways of knowing and being.",
    author: "Stephen Onyekwere",
    date: "December 2024",
    readTime: "10 min read",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=700&q=70",
  },
];

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
export const BLOG_POST = BLOG_POSTS;

export const STATS = [
  { icon: BookOpen, value: "12+", label: "Articles Published" },
  { icon: Users, value: "50+", label: "Practitioners Supported" },
  { icon: Heart, value: "6", label: "Specialist Topics" },
  { icon: TrendingUp, value: "3+", label: "Years of Practice" },
];

export const CATEGORY_COLORS: Record<string, string> = {
  "Burnout & Wellbeing": "bg-amber-100 text-amber-700",
  "Ethical Practice": "bg-blue-100 text-blue-700",
  Leadership: "bg-violet-100 text-violet-700",
  "Trauma & Recovery": "bg-emerald-100 text-emerald-700",
};