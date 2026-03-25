// app/create/page.tsx
"use client";
import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Plus,
  Trash2,
  Save,
  X,
  ListOrdered,
  List,
  Type,
  Clock,
  User,
  FileText,
  Loader2,
  Calendar,
  ArrowLeft,
  AlertCircle,
  Layout,
} from "lucide-react";
import { createPost, updatePost, getPostById } from "@/backend/server";

interface Section {
  id: string;
  type: "paragraph" | "heading" | "bulletList" | "numberedList";
  title?: string;
  content: string;
  items?: string[];
}

interface BlogFormData {
  category: string;
  title: string;
  subtitle: string;
  excerpt: string;
  author: string;
  readTime: string;
  image: string;
  date: string;
  sections: Section[];
}

// Define the content structure from the database
interface ContentData {
  sections?: Section[];
  [key: string]: unknown;
}

export default function CreatePostPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const editId = searchParams.get("edit");

  const [formData, setFormData] = useState<BlogFormData>({
    category: "",
    title: "",
    subtitle: "",
    excerpt: "",
    author: "",
    readTime: "",
    image: "",
    date: new Date().toISOString().split("T")[0],
    sections: [],
  });

  const [loading, setLoading] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [fetchingPost, setFetchingPost] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"write" | "preview">("write");

  const categories = [
    "Moral Injury",
    "Clinical Supervision",
    "Self-Care",
    "Trauma-Informed Care",
    "Ethical Practice",
    "Supervision",
    "Mental Health",
    "Professional Development",
  ];

  useEffect(() => {
    if (editId) {
      loadPostForEdit(editId);
    }
  }, [editId]);

  const loadPostForEdit = async (id: string) => {
    setFetchingPost(true);
    setError(null);
    try {
      const record = await getPostById(id);
      if (record) {
        let sections: Section[] = [];
        try {
          const contentData =
            typeof record.content === "string"
              ? (JSON.parse(record.content) as ContentData)
              : (record.content as ContentData);

          if (Array.isArray(contentData)) {
            sections = contentData.map(
              (item: Partial<Section>, index: number) => ({
                id: item.id || `section-${Date.now()}-${index}`,
                type: item.type || "paragraph",
                title: item.title,
                content: item.content || "",
                items: item.items,
              }),
            );
          } else if (
            contentData.sections &&
            Array.isArray(contentData.sections)
          ) {
            sections = contentData.sections;
          } else {
            sections = [];
          }
        } catch (e) {
          console.error("Error parsing content:", e);
          sections = [];
        }

        setFormData({
          category: record.category || "",
          title: record.title || "",
          subtitle: record.subtitle || "",
          excerpt: record.excerpt || "",
          author: record.author || "",
          readTime: record.readTime || "",
          image: record.image || "",
          date: record.date || new Date().toISOString().split("T")[0],
          sections: sections,
        });
      } else {
        setError("Post not found");
      }
    } catch (error) {
      console.error("Error fetching post:", error);
      setError("Failed to load post for editing");
    } finally {
      setFetchingPost(false);
    }
  };

  const addSection = (type: Section["type"]) => {
    const newSection: Section = {
      id: Date.now().toString(),
      type: type,
      content: "",
      items:
        type === "bulletList" || type === "numberedList" ? [""] : undefined,
    };
    setFormData((prev) => ({
      ...prev,
      sections: [...prev.sections, newSection],
    }));
    setActiveSection(newSection.id);
  };

  const updateSection = (id: string, updates: Partial<Section>) => {
    setFormData((prev) => ({
      ...prev,
      sections: prev.sections.map((section) =>
        section.id === id ? { ...section, ...updates } : section,
      ),
    }));
  };

  const addListItem = (sectionId: string) => {
    setFormData((prev) => ({
      ...prev,
      sections: prev.sections.map((section) =>
        section.id === sectionId &&
        (section.type === "bulletList" || section.type === "numberedList")
          ? { ...section, items: [...(section.items || []), ""] }
          : section,
      ),
    }));
  };

  const updateListItem = (sectionId: string, index: number, value: string) => {
    setFormData((prev) => ({
      ...prev,
      sections: prev.sections.map((section) =>
        section.id === sectionId &&
        (section.type === "bulletList" || section.type === "numberedList")
          ? {
              ...section,
              items: section.items?.map((item, i) =>
                i === index ? value : item,
              ),
            }
          : section,
      ),
    }));
  };

  const removeListItem = (sectionId: string, index: number) => {
    setFormData((prev) => ({
      ...prev,
      sections: prev.sections.map((section) =>
        section.id === sectionId &&
        (section.type === "bulletList" || section.type === "numberedList")
          ? { ...section, items: section.items?.filter((_, i) => i !== index) }
          : section,
      ),
    }));
  };

  const removeSection = (id: string) => {
    setFormData((prev) => ({
      ...prev,
      sections: prev.sections.filter((section) => section.id !== id),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const data = {
      ...formData,
      content: JSON.stringify(formData.sections),
    };

    try {
      if (editId) {
        await updatePost(editId, data);
        alert("Blog post updated successfully!");
      } else {
        await createPost(data);
        alert("Blog post created successfully!");
      }

      router.push("/blog");
      router.refresh();
    } catch (error) {
      console.error("Error saving post:", error);
      setError("Failed to save blog post. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const renderSectionEditor = (section: Section) => {
    switch (section.type) {
      case "heading":
        return (
          <div className="space-y-3">
            <input
              type="text"
              value={section.title || ""}
              onChange={(e) =>
                updateSection(section.id, { title: e.target.value })
              }
              className="w-full px-4 py-2 bg-gray-50 border-0 border-b-2 text-black placeholder-text-black border-gray-200 focus:border-[#8e9867] focus:outline-none transition-all text-lg font-medium"
              placeholder="Heading title"
            />
            <textarea
              value={section.content}
              onChange={(e) =>
                updateSection(section.id, { content: e.target.value })
              }
              className="w-full px-4 py-3 bg-gray-50 placeholder:text-black border-0 rounded-lg text-black focus:ring-1 focus:ring-[#8e9867] focus:outline-none transition-all min-h-[100px]"
              placeholder="Write your heading content..."
            />
          </div>
        );

      case "bulletList":
      case "numberedList":
        return (
          <div className="space-y-3">
            <input
              type="text"
              value={section.title || ""}
              onChange={(e) =>
                updateSection(section.id, { title: e.target.value })
              }
              className="w-full px-4 py-2 bg-gray-50 border-0 border-b-2 border-gray-200 focus:border-[#8e9867] focus:outline-none transition-all"
              placeholder="Section title (optional)"
            />
            <div className="space-y-2">
              {section.items?.map((item, idx) => (
                <div key={idx} className="flex items-center gap-3 group">
                  <span className="text-[#8e9867] font-mono text-sm min-w-[28px]">
                    {section.type === "numberedList" ? `${idx + 1}.` : "•"}
                  </span>
                  <input
                    type="text"
                    value={item}
                    onChange={(e) =>
                      updateListItem(section.id, idx, e.target.value)
                    }
                    className="flex-1 px-4 py-2 bg-gray-50 border-0 text-black placeholder-text-black rounded-lg focus:ring-1 focus:ring-[#8e9867] focus:outline-none transition-all"
                    placeholder={`List item ${idx + 1}`}
                  />
                  <button
                    type="button"
                    onClick={() => removeListItem(section.id, idx)}
                    className="opacity-0 group-hover:opacity-100 p-1 text-gray-400 hover:text-red-500 transition-all"
                  >
                    <X size={14} />
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => addListItem(section.id)}
                className="text-sm text-[#8e9867] hover:text-[#6b7348] flex items-center gap-1 mt-3 transition-colors"
              >
                <Plus size={14} /> Add item
              </button>
            </div>
          </div>
        );

      default:
        return (
          <textarea
            value={section.content}
            onChange={(e) =>
              updateSection(section.id, { content: e.target.value })
            }
            className="w-full px-4 py-3 bg-gray-50 border-0 rounded-lg text-black placeholder-gray-500 focus:ring-1 focus:ring-[#8e9867] focus:outline-none transition-all min-h-[150px]"
            placeholder="Write your content here..."
          />
        );
    }
  };

  const renderPreview = () => {
    return (
      <div className="max-w-none">
        {formData.image && (
          <div className="relative mb-8 rounded-xl overflow-hidden bg-gray-100">
            <picture>
              <img
                src={formData.image}
                alt={formData.title}
                className="w-full h-96 object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    "https://placehold.co/1200x800?text=Image+Preview";
                }}
              />
            </picture>
          </div>
        )}

        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-black mb-4 leading-tight">
            {formData.title || "Untitled Post"}
          </h1>
          {formData.subtitle && (
            <p className="text-xl text-gray-500 mb-6">{formData.subtitle}</p>
          )}
          <div className="flex items-center justify-center gap-6 text-sm text-gray-400">
            <span className="flex items-center gap-2">
              <User size={14} /> {formData.author || "Author Name"}
            </span>
            <span className="flex items-center gap-2">
              <Calendar size={14} /> {formData.date || "Date"}
            </span>
            <span className="flex items-center gap-2">
              <Clock size={14} /> {formData.readTime || "5 min read"}
            </span>
          </div>
        </div>

        <div className="mb-12">
          <blockquote className="border-l-4 border-[#8e9867] pl-6 py-2 text-gray-500 italic text-lg">
            {formData.excerpt || "No excerpt provided"}
          </blockquote>
        </div>

        {formData.sections.length === 0 && (
          <div className="text-center py-16 bg-gray-50 rounded-xl">
            <p className="text-gray-400">No content added yet</p>
          </div>
        )}

        <div className="space-y-8">
          {formData.sections.map((section) => {
            switch (section.type) {
              case "heading":
                return (
                  <div key={section.id} className="space-y-3">
                    {section.title && (
                      <h2 className="text-3xl font-semibold text-black">
                        {section.title}
                      </h2>
                    )}
                    <p className="text-gray-600 leading-relaxed">
                      {section.content || "[Empty heading content]"}
                    </p>
                  </div>
                );
              case "bulletList":
                return (
                  <div key={section.id} className="space-y-3">
                    {section.title && (
                      <h3 className="text-xl font-medium text-black">
                        {section.title}
                      </h3>
                    )}
                    <ul className="space-y-2">
                      {section.items?.map((item, idx) => (
                        <li
                          key={idx}
                          className="flex items-start gap-3 text-gray-600"
                        >
                          <span className="text-[#8e9867] mt-1">•</span>
                          <span>{item || "[Empty item]"}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              case "numberedList":
                return (
                  <div key={section.id} className="space-y-3">
                    {section.title && (
                      <h3 className="text-xl font-medium text-black">
                        {section.title}
                      </h3>
                    )}
                    <ol className="space-y-2 list-decimal list-inside">
                      {section.items?.map((item, idx) => (
                        <li key={idx} className="text-gray-600">
                          {item || "[Empty item]"}
                        </li>
                      ))}
                    </ol>
                  </div>
                );
              default:
                return (
                  <p key={section.id} className="text-gray-600 leading-relaxed">
                    {section.content || "[Empty paragraph content]"}
                  </p>
                );
            }
          })}
        </div>
      </div>
    );
  };

  if (fetchingPost) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <Loader2
            size={48}
            className="animate-spin text-[#8e9867] mx-auto mb-4"
          />
          <p className="text-gray-500">Loading post...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen  bg-white">
      {/* Top Bar */}
      <div className="sticky top-0 z-50 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => router.back()}
              className="flex items-center gap-2 text-gray-500 hover:text-black transition-colors"
            >
              <ArrowLeft size={20} />
              <span className="text-sm">Back</span>
            </button>

            <div className="flex items-center gap-3">
              <button
                onClick={() => router.push("/create")}
                className="px-4 py-2 text-sm border border-gray-200 rounded-lg hover:border-[#8e9867] hover:text-[#8e9867] transition-all"
              >
                <Plus size={16} className="inline mr-1" />
                New Post
              </button>
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="px-6 py-2 bg-[#8e9867] hover:bg-[#6b7348] text-white rounded-lg transition-colors flex items-center gap-2 text-sm disabled:opacity-50"
              >
                {loading ? (
                  <Loader2 size={16} className="animate-spin" />
                ) : (
                  <Save size={16} />
                )}
                {loading ? "Saving..." : editId ? "Update" : "Publish"}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {error && (
          <div className="mb-8 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 text-red-700">
            <AlertCircle size={20} />
            {error}
          </div>
        )}

        {/* Meta Info Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-12 pb-12 border-b border-gray-100">
          <div className="space-y-6">
            <div>
              <label className="block text-xs font-medium text-gray-400 uppercase tracking-wider mb-2">
                Category
              </label>
              <select
                value={formData.category}
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value })
                }
                className="w-full px-0 py-2 bg-transparent border-0 border-b-2 border-gray-200 focus:border-[#8e9867] focus:outline-none transition-all text-gray-700"
                required
              >
                <option value="">Select a category</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-400 uppercase tracking-wider mb-2">
                Title
              </label>
              <input
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                type="text"
                className="w-full px-0 py-2 bg-transparent border-0 border-b-2 border-gray-200 focus:border-[#8e9867] focus:outline-none transition-all text-2xl font-bold text-black"
                placeholder="Enter blog title"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-400 uppercase tracking-wider mb-2">
                Subtitle
              </label>
              <input
                value={formData.subtitle}
                onChange={(e) =>
                  setFormData({ ...formData, subtitle: e.target.value })
                }
                type="text"
                className="w-full px-0 py-2 bg-transparent border-0 border-b-2 border-gray-200 focus:border-[#8e9867] focus:outline-none transition-all text-gray-600"
                placeholder="Enter subtitle (optional)"
              />
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-xs font-medium text-gray-400 uppercase tracking-wider mb-2">
                Excerpt
              </label>
              <textarea
                value={formData.excerpt}
                onChange={(e) =>
                  setFormData({ ...formData, excerpt: e.target.value })
                }
                className="w-full px-0 py-2 bg-transparent border-0 border-b-2 border-gray-200 focus:border-[#8e9867] focus:outline-none transition-all min-h-[80px] text-gray-600 resize-none"
                placeholder="Write a brief description"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-medium text-gray-400 uppercase tracking-wider mb-2">
                  Author
                </label>
                <input
                  type="text"
                  value={formData.author}
                  onChange={(e) =>
                    setFormData({ ...formData, author: e.target.value })
                  }
                  className="w-full px-0 py-2 bg-transparent border-0 border-b-2 border-gray-200 focus:border-[#8e9867] focus:outline-none transition-all text-gray-700"
                  placeholder="Author name"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-400 uppercase tracking-wider mb-2">
                  Read Time
                </label>
                <input
                  type="text"
                  value={formData.readTime}
                  onChange={(e) =>
                    setFormData({ ...formData, readTime: e.target.value })
                  }
                  className="w-full px-0 py-2 bg-transparent border-0 border-b-2 border-gray-200 focus:border-[#8e9867] focus:outline-none transition-all text-gray-700"
                  placeholder="e.g., 5 min read"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-medium text-gray-400 uppercase tracking-wider mb-2">
                  Date
                </label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) =>
                    setFormData({ ...formData, date: e.target.value })
                  }
                  className="w-full px-0 py-2 bg-transparent border-0 border-b-2 border-gray-200 focus:border-[#8e9867] focus:outline-none transition-all text-gray-700"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-400 uppercase tracking-wider mb-2">
                  Featured Image URL
                </label>
                <input
                  type="text"
                  value={formData.image}
                  onChange={(e) =>
                    setFormData({ ...formData, image: e.target.value })
                  }
                  className="w-full px-0 py-2 bg-transparent border-0 border-b-2 border-gray-200 focus:border-[#8e9867] focus:outline-none transition-all text-gray-700"
                  placeholder="https://example.com/image.jpg"
                  required
                />
              </div>
            </div>
          </div>
        </div>

        {/* Content Editor Tabs */}
        <div className="mb-8">
          <div className="flex gap-4 border-b border-gray-100">
            <button
              onClick={() => setActiveTab("write")}
              className={`pb-3 px-2 text-sm font-medium transition-colors relative ${
                activeTab === "write"
                  ? "text-[#8e9867]"
                  : "text-gray-400 hover:text-gray-600"
              }`}
            >
              Write
              {activeTab === "write" && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#8e9867]" />
              )}
            </button>
            <button
              onClick={() => setActiveTab("preview")}
              className={`pb-3 px-2 text-sm font-medium transition-colors relative ${
                activeTab === "preview"
                  ? "text-[#8e9867]"
                  : "text-gray-400 hover:text-gray-600"
              }`}
            >
              Preview
              {activeTab === "preview" && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#8e9867]" />
              )}
            </button>
          </div>
        </div>

        {activeTab === "write" ? (
          <div className="space-y-6">
            <div className="flex gap-2 pb-4 border-b border-gray-100">
              <button
                type="button"
                onClick={() => addSection("paragraph")}
                className="px-4 py-2 text-sm bg-gray-50 hover:bg-gray-100 text-gray-700 rounded-lg transition-colors flex items-center gap-2"
              >
                <FileText size={16} /> Paragraph
              </button>
              <button
                type="button"
                onClick={() => addSection("heading")}
                className="px-4 py-2 text-sm bg-gray-50 hover:bg-gray-100 text-gray-700 rounded-lg transition-colors flex items-center gap-2"
              >
                <Type size={16} /> Heading
              </button>
              <button
                type="button"
                onClick={() => addSection("bulletList")}
                className="px-4 py-2 text-sm bg-gray-50 hover:bg-gray-100 text-gray-700 rounded-lg transition-colors flex items-center gap-2"
              >
                <List size={16} /> Bullet List
              </button>
              <button
                type="button"
                onClick={() => addSection("numberedList")}
                className="px-4 py-2 text-sm bg-gray-50 hover:bg-gray-100 text-gray-700 rounded-lg transition-colors flex items-center gap-2"
              >
                <ListOrdered size={16} /> Numbered List
              </button>
            </div>

            {formData.sections.length === 0 && (
              <div className="text-center py-24 bg-gray-50 rounded-xl">
                <Layout size={48} className="text-gray-300 mx-auto mb-4" />
                <p className="text-gray-400">
                  Click any button above to start adding content
                </p>
              </div>
            )}

            {formData.sections.map((section) => (
              <div
                key={section.id}
                className={`group relative transition-all ${
                  activeSection === section.id ? "bg-gray-50" : ""
                }`}
                onClick={() => setActiveSection(section.id)}
              >
                <div className="absolute right-2 top-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    type="button"
                    onClick={() => removeSection(section.id)}
                    className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
                <div className="py-4">
                  <div className="mb-2">
                    <span className="text-xs font-mono text-gray-400 uppercase">
                      {section.type === "heading"
                        ? "Heading"
                        : section.type === "bulletList"
                          ? "Bullet List"
                          : section.type === "numberedList"
                            ? "Numbered List"
                            : "Paragraph"}
                    </span>
                  </div>
                  {renderSectionEditor(section)}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl">{renderPreview()}</div>
        )}
      </div>
    </div>
  );
}
