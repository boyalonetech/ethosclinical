"use client";
import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  Plus,
  Edit,
  Trash2,
  Loader2,
  Calendar,
  User,
  Clock,
  X,
  ListOrdered,
  List,
  Type,
  FileText,
  Layout,
  AlertCircle,
  ArrowLeft,
} from "lucide-react";
import {
  getPosts,
  deletePost,
  createPost,
  updatePost,
  PostRecord,
} from "@/backend/server";

// ─── Types ────────────────────────────────────────────────────────────────────

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
  date: string;
  sections: Section[];
}

// ─── Toast ────────────────────────────────────────────────────────────────────

function Toast({
  message,
  type,
  onClose,
}: {
  message: string;
  type: "success" | "error";
  onClose: () => void;
}) {
  useEffect(() => {
    const t = setTimeout(onClose, 3000);
    return () => clearTimeout(t);
  }, [onClose]);

  return (
    <div
      className={`fixed top-4 right-4 z-50 flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg ${
        type === "success"
          ? "bg-green-50 border border-green-200 text-green-800"
          : "bg-red-50 border border-red-200 text-red-800"
      }`}
    >
      {type === "success" ? (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
            clipRule="evenodd"
          />
        </svg>
      ) : (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
            clipRule="evenodd"
          />
        </svg>
      )}
      <span className="text-sm font-medium">{message}</span>
      <button onClick={onClose} className="ml-2 hover:opacity-70">
        <X size={14} />
      </button>
    </div>
  );
}

// ─── Delete Confirm ───────────────────────────────────────────────────────────

function DeleteConfirmPopup({
  postTitle,
  onConfirm,
  onCancel,
}: {
  postTitle: string;
  onConfirm: () => void;
  onCancel: () => void;
}) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl max-w-md w-full mx-4 p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-red-100 rounded-full">
            <Trash2 size={20} className="text-red-600" />
          </div>
          <h3 className="text-lg font-semibold text-black">Delete Post</h3>
        </div>
        <p className="text-gray-600 mb-6">
          Are you sure you want to delete &apos;
          <span className="font-medium text-black">{postTitle}</span>&apos;?
          This action cannot be undone.
        </p>
        <div className="flex justify-end gap-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors text-black"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Blog Page ────────────────────────────────────────────────────────────────

export default function BlogPage() {
  const router = useRouter();
  const [posts, setPosts] = useState<PostRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingPost, setEditingPost] = useState<PostRecord | null>(null);
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);
  const [deletePopup, setDeletePopup] = useState<{
    postId: string;
    postTitle: string;
  } | null>(null);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    setLoading(true);
    setError(null);
    try {
      // getPosts() already returns records with full image URLs built in
      const data = await getPosts();
      setPosts(data);
    } catch (err) {
      console.error("Error fetching posts:", err);
      setError("Failed to load blog posts");
    } finally {
      setLoading(false);
    }
  };

  const confirmDelete = async () => {
    if (!deletePopup) return;
    try {
      await deletePost(deletePopup.postId);
      await fetchPosts();
      setToast({ message: "Post deleted successfully!", type: "success" });
    } catch (err) {
      console.error("Error deleting post:", err);
      setToast({ message: "Failed to delete post", type: "error" });
    } finally {
      setDeletePopup(null);
    }
  };

  const handleCloseForm = () => {
    setShowCreateForm(false);
    setEditingPost(null);
    fetchPosts();
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <Loader2
            size={48}
            className="animate-spin text-[#8e9867] mx-auto mb-4"
          />
          <p className="text-gray-500">Loading posts...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <p className="text-red-500 mb-4">{error}</p>
          <button
            onClick={fetchPosts}
            className="px-4 py-2 bg-[#8e9867] text-white rounded-lg"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      {deletePopup && (
        <DeleteConfirmPopup
          postTitle={deletePopup.postTitle}
          onConfirm={confirmDelete}
          onCancel={() => setDeletePopup(null)}
        />
      )}

      {/* Header */}
      <div className="sticky top-0 z-50 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-black">Blog Management</h1>
          {!showCreateForm && (
            <button
              onClick={() => {
                setEditingPost(null);
                setShowCreateForm(true);
              }}
              className="px-4 py-2 bg-[#8e9867] hover:bg-[#6b7348] text-white rounded-lg transition-colors flex items-center gap-2"
            >
              <Plus size={18} /> Create New Post
            </button>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {showCreateForm ? (
          <>
            <div className="mb-8">
              <button
                onClick={handleCloseForm}
                className="flex items-center gap-2 text-gray-500 hover:text-black transition-colors mb-6"
              >
                <ArrowLeft size={20} />
                <span className="text-sm">Back to posts</span>
              </button>
              <h2 className="text-xl font-semibold text-black mb-6">
                {editingPost ? "Edit Post" : "Create New Post"}
              </h2>
            </div>
            <CreatePostForm
              postToEdit={editingPost}
              onSuccess={handleCloseForm}
              showToast={setToast}
            />
          </>
        ) : posts.length === 0 ? (
          <div className="text-center py-24 bg-gray-50 rounded-xl">
            <p className="text-gray-400 mb-4">No blog posts yet</p>
            <button
              onClick={() => setShowCreateForm(true)}
              className="px-4 py-2 bg-[#8e9867] text-white rounded-lg inline-flex items-center gap-2"
            >
              <Plus size={18} /> Create Your First Post
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-8">
            {posts.map((post) => (
              <article
                key={post.id}
                className="group bg-white relative rounded-xl shadow-md border border-gray-100 hover:border-gray-200 hover:shadow-lg transition-all overflow-hidden"
              >
                {/* Use plain <img> — avoids Next.js domain whitelist requirement */}
                {post.image && (
                  <div className="relative h-64 overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          "https://placehold.co/1200x800?text=Image+Not+Found";
                      }}
                    />
                  </div>
                )}

                <div className="p-8">
                  <div className="flex items-start justify-between mb-4">
                    <span className="text-xs font-medium text-[#8e9867] bg-[#8e9867]/10 px-3 py-1 rounded-full">
                      {post.category}
                    </span>
                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => {
                          setEditingPost(post);
                          setShowCreateForm(true);
                        }}
                        className="p-2 text-gray-400 hover:text-[#8e9867] transition-colors"
                        title="Edit post"
                      >
                        <Edit size={18} />
                      </button>
                      <button
                        onClick={() =>
                          setDeletePopup({
                            postId: post.id,
                            postTitle: post.title,
                          })
                        }
                        className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                        title="Delete post"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>

                  <h2 className="text-2xl font-bold line-clamp-2 text-black mb-3 hover:text-[#8e9867] transition-colors">
                    {post.title}
                  </h2>
                  {post.subtitle && (
                    <p className="text-gray-600 line-clamp-2 mb-4">
                      {post.subtitle}
                    </p>
                  )}
                  <p className="text-gray-700 mb-6 line-clamp-3">
                    {post.excerpt}
                  </p>
                  <button
                    onClick={() => router.push(`/blog/${post.id}`)}
                    className="text-[#8e9867] absolute bottom-3 font-medium hover:text-[#6b7348] transition-colors inline-flex items-center gap-1"
                  >
                    Read More →
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Create / Edit Form ───────────────────────────────────────────────────────

function CreatePostForm({
  postToEdit,
  onSuccess,
  showToast,
}: {
  postToEdit?: PostRecord | null;
  onSuccess: () => void;
  showToast: (toast: { message: string; type: "success" | "error" }) => void;
}) {
  const [formData, setFormData] = useState<BlogFormData>({
    category: "",
    title: "",
    subtitle: "",
    excerpt: "",
    author: "",
    readTime: "",
    date: new Date().toISOString().split("T")[0],
    sections: [],
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [fetchingPost, setFetchingPost] = useState(false);
  const [activeTab, setActiveTab] = useState<"write" | "preview">("write");
  const [imageFile, setImageFile] = useState<File | null>(null);
  // Holds either a base64 data URL (new file picked) or the full PB URL (existing image)
  const [imagePreview, setImagePreview] = useState<string>("");

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

  // Load the post data into form state for editing
  const loadPostForEdit = useCallback((record: PostRecord) => {
    setFetchingPost(true);
    setError(null);
    try {
      let sections: Section[] = [];
      try {
        const contentData =
          typeof record.content === "string"
            ? JSON.parse(record.content)
            : record.content;

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
        // PocketBase date format: "2026-03-27 00:00:00.000Z" — strip the time part
        date: record.date
          ? record.date.split(" ")[0]
          : new Date().toISOString().split("T")[0],
        sections,
      });

      // record.image is already a full URL (built by normalizeRecord in server.ts)
      if (record.image) {
        setImagePreview(record.image);
      }
    } catch (err) {
      console.error("Error loading post:", err);
      setError("Failed to load post for editing");
    } finally {
      setFetchingPost(false);
    }
  }, []);

  useEffect(() => {
    if (postToEdit) loadPostForEdit(postToEdit);
  }, [postToEdit, loadPostForEdit]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  // ── Section helpers ──────────────────────────────────────────────────────────

  const addSection = (type: Section["type"]) => {
    const s: Section = {
      id: Date.now().toString(),
      type,
      content: "",
      items:
        type === "bulletList" || type === "numberedList" ? [""] : undefined,
    };
    setFormData((prev) => ({ ...prev, sections: [...prev.sections, s] }));
    setActiveSection(s.id);
  };

  const updateSection = (id: string, updates: Partial<Section>) =>
    setFormData((prev) => ({
      ...prev,
      sections: prev.sections.map((s) =>
        s.id === id ? { ...s, ...updates } : s,
      ),
    }));

  const removeSection = (id: string) =>
    setFormData((prev) => ({
      ...prev,
      sections: prev.sections.filter((s) => s.id !== id),
    }));

  const addListItem = (sectionId: string) =>
    setFormData((prev) => ({
      ...prev,
      sections: prev.sections.map((s) =>
        s.id === sectionId &&
        (s.type === "bulletList" || s.type === "numberedList")
          ? { ...s, items: [...(s.items || []), ""] }
          : s,
      ),
    }));

  const updateListItem = (sectionId: string, index: number, value: string) =>
    setFormData((prev) => ({
      ...prev,
      sections: prev.sections.map((s) =>
        s.id === sectionId &&
        (s.type === "bulletList" || s.type === "numberedList")
          ? {
              ...s,
              items: s.items?.map((item, i) => (i === index ? value : item)),
            }
          : s,
      ),
    }));

  const removeListItem = (sectionId: string, index: number) =>
    setFormData((prev) => ({
      ...prev,
      sections: prev.sections.map((s) =>
        s.id === sectionId &&
        (s.type === "bulletList" || s.type === "numberedList")
          ? { ...s, items: s.items?.filter((_, i) => i !== index) }
          : s,
      ),
    }));

  // ── Submit ───────────────────────────────────────────────────────────────────

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const payload = new FormData();
      payload.append("category", formData.category);
      payload.append("title", formData.title);
      payload.append("subtitle", formData.subtitle);
      payload.append("excerpt", formData.excerpt);
      payload.append("author", formData.author);
      payload.append("readTime", formData.readTime);
      payload.append("date", formData.date);
      payload.append("content", JSON.stringify(formData.sections));

      // Only include image if the user picked a new file.
      // PocketBase keeps the existing image if "image" is not in the payload.
      if (imageFile) {
        payload.append("image", imageFile);
      }

      if (postToEdit) {
        await updatePost(postToEdit.id, payload);
        showToast({
          message: "Blog post updated successfully!",
          type: "success",
        });
      } else {
        await createPost(payload);
        showToast({
          message: "Blog post created successfully!",
          type: "success",
        });
      }

      onSuccess();
    } catch (err) {
      console.error("Error saving post:", err);
      setError("Failed to save blog post. Please try again.");
      showToast({ message: "Failed to save blog post", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  // ── Section renderers ────────────────────────────────────────────────────────

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
              className="w-full px-4 py-2 bg-gray-50 border-0 border-b-2 text-black placeholder-gray-500 border-gray-200 focus:border-[#8e9867] focus:outline-none transition-all text-lg font-medium"
              placeholder="Heading title"
            />
            <textarea
              value={section.content}
              onChange={(e) =>
                updateSection(section.id, { content: e.target.value })
              }
              className="w-full px-4 py-3 bg-gray-50 placeholder-gray-500 border-0 rounded-lg text-black focus:ring-1 focus:ring-[#8e9867] focus:outline-none transition-all min-h-[100px]"
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
              className="w-full px-4 py-2 bg-gray-50 border-0 border-b-2 border-gray-200 focus:border-[#8e9867] focus:outline-none transition-all text-black placeholder-gray-500"
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
                    className="flex-1 px-4 py-2 bg-gray-50 border-0 text-black placeholder-gray-500 rounded-lg focus:ring-1 focus:ring-[#8e9867] focus:outline-none transition-all"
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

  const renderPreview = () => (
    <div className="max-w-none">
      {imagePreview && (
        <div className="mb-8 rounded-xl overflow-hidden bg-gray-100 h-96">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={imagePreview}
            alt={formData.title}
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).src =
                "https://placehold.co/1200x800?text=Image+Preview";
            }}
          />
        </div>
      )}

      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold text-black mb-4 leading-tight">
          {formData.title || "Untitled Post"}
        </h1>
        {formData.subtitle && (
          <p className="text-xl text-gray-600 mb-6">{formData.subtitle}</p>
        )}
        <div className="flex items-center justify-center gap-6 text-sm text-gray-500">
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
        <blockquote className="border-l-4 border-[#8e9867] pl-6 py-2 text-gray-600 italic text-lg">
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
                  <p className="text-gray-700 leading-relaxed">
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
                        className="flex items-start gap-3 text-gray-700"
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
                      <li key={idx} className="text-gray-700">
                        {item || "[Empty item]"}
                      </li>
                    ))}
                  </ol>
                </div>
              );
            default:
              return (
                <p key={section.id} className="text-gray-700 leading-relaxed">
                  {section.content || "[Empty paragraph content]"}
                </p>
              );
          }
        })}
      </div>
    </div>
  );

  if (fetchingPost) {
    return (
      <div className="text-center py-12">
        <Loader2
          size={48}
          className="animate-spin text-[#8e9867] mx-auto mb-4"
        />
        <p className="text-gray-500">Loading post...</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 text-red-700">
          <AlertCircle size={20} /> {error}
        </div>
      )}

      {/* Meta Info Grid */}
      <div className="grid md:grid-cols-2 gap-8 pb-12 border-b border-gray-100">
        <div className="space-y-6">
          <div>
            <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">
              Category
            </label>
            <select
              value={formData.category}
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
              }
              className="w-full px-0 py-2 bg-transparent border-0 border-b-2 border-gray-200 focus:border-[#8e9867] focus:outline-none transition-all text-black"
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
            <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">
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
            <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">
              Subtitle
            </label>
            <input
              value={formData.subtitle}
              onChange={(e) =>
                setFormData({ ...formData, subtitle: e.target.value })
              }
              type="text"
              className="w-full px-0 py-2 bg-transparent border-0 border-b-2 border-gray-200 focus:border-[#8e9867] focus:outline-none transition-all text-black"
              placeholder="Enter subtitle (optional)"
            />
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">
              Excerpt
            </label>
            <textarea
              value={formData.excerpt}
              onChange={(e) =>
                setFormData({ ...formData, excerpt: e.target.value })
              }
              className="w-full px-0 py-2 bg-transparent border-0 border-b-2 border-gray-200 focus:border-[#8e9867] focus:outline-none transition-all min-h-[80px] text-black resize-none"
              placeholder="Write a brief description"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">
                Author
              </label>
              <input
                type="text"
                value={formData.author}
                onChange={(e) =>
                  setFormData({ ...formData, author: e.target.value })
                }
                className="w-full px-0 py-2 bg-transparent border-0 border-b-2 border-gray-200 focus:border-[#8e9867] focus:outline-none transition-all text-black"
                placeholder="Author name"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">
                Read Time
              </label>
              <input
                type="text"
                value={formData.readTime}
                onChange={(e) =>
                  setFormData({ ...formData, readTime: e.target.value })
                }
                className="w-full px-0 py-2 bg-transparent border-0 border-b-2 border-gray-200 focus:border-[#8e9867] focus:outline-none transition-all text-black"
                placeholder="e.g., 5 min read"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">
                Date
              </label>
              <input
                type="date"
                value={formData.date}
                onChange={(e) =>
                  setFormData({ ...formData, date: e.target.value })
                }
                className="w-full px-0 py-2 bg-transparent border-0 border-b-2 border-gray-200 focus:border-[#8e9867] focus:outline-none transition-all text-black"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">
                Featured Image
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full px-0 py-2 bg-transparent border-0 border-b-2 border-gray-200 focus:border-[#8e9867] focus:outline-none transition-all text-black file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:bg-[#8e9867] file:text-white hover:file:bg-[#6b7348]"
              />
              {/* Works for both new local files (base64) and existing PB image URLs */}
              {imagePreview && (
                <div className="mt-3">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="h-24 w-24 object-cover rounded-lg border border-gray-200"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = "none";
                    }}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Content Tabs */}
      <div className="mb-8">
        <div className="flex gap-4 border-b border-gray-100">
          {(["write", "preview"] as const).map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={`pb-3 px-2 text-sm font-medium transition-colors relative capitalize ${activeTab === tab ? "text-[#8e9867]" : "text-gray-400 hover:text-gray-600"}`}
            >
              {tab}
              {activeTab === tab && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#8e9867]" />
              )}
            </button>
          ))}
        </div>
      </div>

      {activeTab === "write" ? (
        <div className="space-y-6">
          <div className="flex gap-2 py-4 border-b sticky top-0 z-60 bg-white border-gray-100">
            {(
              [
                {
                  type: "paragraph",
                  label: "Paragraph",
                  icon: <FileText size={16} />,
                },
                { type: "heading", label: "Heading", icon: <Type size={16} /> },
                {
                  type: "bulletList",
                  label: "Bullet List",
                  icon: <List size={16} />,
                },
                {
                  type: "numberedList",
                  label: "Numbered List",
                  icon: <ListOrdered size={16} />,
                },
              ] as {
                type: Section["type"];
                label: string;
                icon: React.ReactNode;
              }[]
            ).map(({ type, label, icon }) => (
              <button
                key={type}
                type="button"
                onClick={() => addSection(type)}
                className="px-4 py-2 text-sm bg-gray-50 hover:bg-gray-100 text-gray-700 rounded-lg transition-colors flex items-center gap-2"
              >
                {icon} {label}
              </button>
            ))}
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
              className={`group relative transition-all ${activeSection === section.id ? "bg-gray-50" : ""}`}
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

      {/* Actions */}
      <div className="sticky bottom-0 bg-white border-t border-gray-100 mt-8 py-4 flex justify-end gap-3">
        <button
          type="button"
          onClick={onSuccess}
          className="px-6 py-2 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors text-black"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-2 bg-[#8e9867] hover:bg-[#6b7348] text-white rounded-lg transition-colors disabled:opacity-50 flex items-center gap-2"
        >
          {loading && <Loader2 size={16} className="animate-spin" />}
          {loading ? "Saving..." : postToEdit ? "Update Post" : "Create Post"}
        </button>
      </div>
    </form>
  );
}
