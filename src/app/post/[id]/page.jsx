"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import supabase from "../../login/dashboard/SupabaseClient";
import { MDXRemote } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import ThemeButton from "@/app/components/themeButton";


// Custom components for better MDX formatting
const mdxComponents = {
  h1: (props) => <h1 className="text-3xl font-bold my-4" {...props} />,
  h2: (props) => <h2 className="text-2xl font-semibold my-3" {...props} />,
  h3: (props) => <h3 className="text-xl font-medium my-2" {...props} />,
  p: (props) => <p className="text-lg my-2" {...props} />,
  code: (props) => (
    <pre className="bg-gray-800 text-white p-3 rounded-lg overflow-x-auto">
      <code {...props} />
    </pre>
  ),
  img: (props) => <img className="rounded-lg my-4 w-full" {...props} />,
};

const BlogPost = () => {
  const { id } = useParams(); // Get post ID from URL
  const [post, setPost] = useState(null);
  const [mdxContent, setMdxContent] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      const { data, error } = await supabase.from("posts").select("*").eq("id", id).single();
      if (error) {
        console.error("Error fetching post:", error);
        return;
      }

      setPost(data);

      if (data.content) {
        try {
          // Fetch the MDX file as raw text
          const response = await fetch(data.content);
          const mdxText = await response.text();
          const mdxSerialized = await serialize(mdxText); // Serialize MDX
          setMdxContent(mdxSerialized);
        } catch (err) {
          console.error("Error fetching MDX file:", err);
        }
      }
    };

    if (id) fetchPost();
  }, [id]);

  if (!post) return <p className="text-center text-gray-500">Loading...</p>;

  return (
    <div className="bg-primary-color">
        <ThemeButton />
        <div className="p-6 text-foreground max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
        <p className="text-gray-500">By {post.author} - {new Date(post.created_at).toLocaleDateString()}</p>
        <img src={post.image} alt={post.title} className="w-full rounded-lg my-4" />

        {mdxContent ? (
            <MDXRemote {...mdxContent} components={mdxComponents} />
        ) : (
            <p className="text-gray-500">Loading content...</p>
        )}
        </div>
    </div>
  );
};

export default BlogPost;
