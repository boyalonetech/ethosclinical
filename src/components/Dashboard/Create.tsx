"use client";
import { db } from "@/backend/server";
import React, { useEffect, useState } from "react";

export default function Create() {
  const [category, setCategory] = useState("");
  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [author, setAuthor] = useState("");
  const [readTime, setReadTime] = useState("");
  const [image, setImage] = useState("");
  const [mode, setMode] = useState("create");

  const getBlogPosts = async () => {
    const api = process.env.NEXT_PUBLIC_DATABASE_API!;
    try {
      const response = await fetch(`${api}/api/collections/posts/records`);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      const blog = data.items || data;
      return blog; // Return the actual array
    } catch (error) {
      console.error("Error fetching posts:", error);
      return []; // Return empty array on error
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const blog = await getBlogPosts();
      console.log("Fetched blog posts:", blog);
    };

    fetchData();
  }, []);

  const data = {
    category: category,
    title: title,
    excerpt: excerpt,
    author: author,
    readTime: readTime,
    image: image,
  };

  const updatePost = async (e: React.FormEvent) => {
    e.preventDefault();
    const record = await db.collection("posts").update("ID_OF_RECORD_TO_UPDATE", data);
    console.log("Record updated:", record);
  };

  const deletePost = async (e: React.FormEvent) => {
    const record = await db.collection("posts").delete("ID_OF_RECORD_TO_DELETE");
    console.log("Record deleted:", record);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const record = await db.collection("posts").create(data);
    console.log("Record created:", record);
    // Handle form submission logic hereblog
    alert(
      "Form submitted" + category + title + excerpt + author + readTime + image,
    );
  };

  return (
    <section className="flex flex-col justify-center items-center bg-stone-50 relative inset-0 h-screen">
      <div className="p-6 rounded-lg border-3 w-full max-w-[500px]">
        <h1 className="text-4xl text-center font-bold text-stone-900 mb-4">
          Blog Post
        </h1>
        <form>
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="text-black border-gray-300 py-2 px-3 rounded-lg w-full border-2 placeholder-gray-500 mb-4"
            placeholder="category"
          />
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            className="text-black border-gray-300 py-2 px-3 rounded-lg w-full border-2 placeholder-gray-500 mb-4"
            placeholder="Title"
          />
          <input
            type="text"
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            className="text-black border-gray-300 py-2 px-3 rounded-lg w-full border-2 placeholder-gray-500 mb-4"
            placeholder="Description"
          />
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="text-black border-gray-300 py-2 px-3 rounded-lg w-full border-2 placeholder-gray-500 mb-4"
            placeholder="Author"
          />
          <input
            type="text"
            value={readTime}
            onChange={(e) => setReadTime(e.target.value)}
            className="text-black border-gray-300 py-2 px-3 rounded-lg w-full border-2 placeholder-gray-500 mb-4"
            placeholder="Read"
          />
          <input
            type="text"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            className="text-black border-gray-300 py-2 px-3 rounded-lg w-full border-2 placeholder-gray-500 mb-4"
            placeholder="Image"
          />
          x
          <button
            onClick={handleSubmit}
            className="text-white w-full py-2 px-6 bg-mint rounded-md shadow"
          >
            Submit
          </button>
        </form>
        <form className="mt-16">
          <button
            onClick={deletePost}
            className="text-white w-full py-2 px-6 bg-mint rounded-md shadow"
          >
            Delete
          </button>
        </form>
      </div>
    </section>
  );
}
