"use client";

import { useState } from "react";
import { UploadButton } from "@uploadthing/react";
import supabase from "./SupabaseClient"; // Ensure this points to your Supabase setup

export default function FileUpload() {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    summary: "",
    contentUrl: "", // Stores MDX file URL
    imageUrl: "",   // Stores Image URL
    tags: "",
  });

  // Handle text input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle UploadThing file uploads
  const handleUploadComplete = (res, fileType) => {
    if (res?.[0]?.url) {
      setFormData((prev) => ({
        ...prev,
        [fileType]: res[0].url, // Save the file URL (MDX or Image)
      }));
      console.log(`${fileType} uploaded: ${res[0].url}`);
    }
  };

  // Submit form and insert data into Supabase
  const addPost = async (e) => {
    e.preventDefault();

    if (!formData.contentUrl || !formData.imageUrl) {
      alert("Please upload both an MDX file and an image.");
      return;
    }

    const newPost = {
      title: formData.title,
      author: formData.author,
      summary: formData.summary,
      content: formData.contentUrl,
      image: formData.imageUrl,
      tags: formData.tags ? formData.tags.split(",").map(tag => tag.trim()) : [],
      created_at: new Date().toISOString(),
    };

    const { data, error } = await supabase.from("posts").insert([newPost]);

    if (error) {
      console.error("Error inserting post:", error);
    } else {
      console.log("Post added successfully:", data);
      alert("Post added!");
      setFormData({ title: "", author: "", summary: "", contentUrl: "", imageUrl: "", tags: "" });
    }
  };

  return (
    <div className="flex flex-col items-center bg-background-color">
      <h2 className="text-xl font-bold mb-4">Upload Blog Post</h2>

      <form onSubmit={addPost} className="w-1/2 flex flex-col gap-4">
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleInputChange}
          required
          className="border p-2 rounded"
        />
        <input
          type="text"
          name="author"
          placeholder="Author"
          value={formData.author}
          onChange={handleInputChange}
          required
          className="border p-2 rounded"
        />
        <textarea
          name="summary"
          placeholder="Summary"
          value={formData.summary}
          onChange={handleInputChange}
          required
          className="border p-2 rounded"
        />

        {/* Upload MDX File */}
        <UploadButton
          className="border p-2 rounded bg-accent text-foreground"
          endpoint="mdxUploader"
          onClientUploadComplete={(res) => handleUploadComplete(res, "contentUrl")}
          onUploadError={(error) => alert(`Upload failed: ${error.message}`)}
        />
        {formData.contentUrl && <p className="text-green-500">MDX uploaded ✅</p>}

        {/* Upload Image */}
        <UploadButton
          className="border p-2 rounded bg-accent text-foreground"
          endpoint="imageUploader"
          onClientUploadComplete={(res) => handleUploadComplete(res, "imageUrl")}
          onUploadError={(error) => alert(`Upload failed: ${error.message}`)}
        />
        {formData.imageUrl && <p className="text-green-500">Image uploaded ✅</p>}

        <input
          type="text"
          name="tags"
          placeholder="Tags (comma-separated)"
          value={formData.tags}
          onChange={handleInputChange}
          className="border p-2 rounded"
        />

        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Add Post →
        </button>
      </form>
    </div>
  );
}
