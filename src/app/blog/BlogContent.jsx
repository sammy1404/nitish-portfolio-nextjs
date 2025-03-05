"use client";

import React, { useEffect, useState } from "react";
import supabase from "../login/dashboard/SupabaseClient";
import "./blogContent.css";
import "../../app/globals.css";
import Link from "next/link";
import BlogHeader from "./BlogHeader"; // Import header

const BlogContent = () => {
  const [posts, setPosts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchPosts = async () => {
      const { data, error } = await supabase
        .from("posts")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching posts:", error);
      } else {
        setPosts(data);
      }
    };

    fetchPosts();
  }, []);

  if (posts.length === 0) {
    return <p className="text-center text-gray-500">Loading posts...</p>;
  }

  const processTags = (tags) => {
    if (!tags) return [];
    return tags.replace(/[\[\]"]+/g, "").split(",").map(tag => tag.trim().toLowerCase());
  };

  // 🔍 **Filter posts based on search query**
  const filteredPosts = posts.filter(post => {
    const titleMatch = post.title.toLowerCase().includes(searchQuery);
    const tagMatch = processTags(post.tags).some(tag => tag.includes(searchQuery));
    return titleMatch || tagMatch;
  });

  const [featuredPost, ...remainingPosts] = filteredPosts;

  return (
    <div className="blog-container relative">
      {/* Pass setSearchQuery to BlogHeader */}
      <BlogHeader setSearchQuery={setSearchQuery} />  

      {filteredPosts.length === 0 ? (
        <p className="text-center text-gray-500">No matching posts found.</p>
      ) : (
        <>
          <h2 className="Latest text-foreground font-semibold">FEATURED</h2>
          <Link href={`/post/${featuredPost.id}`}>
            <div className="featured-post">
              <img src={featuredPost.image} alt={featuredPost.title} className="featured-image" />
              <div className="featured-content">
                <h3 className="text-3xl font-bold">{featuredPost.title}</h3>
                <h4 className="author font-semibold text-lg">Written by: {featuredPost.author}</h4>
                <p className="date">{new Date(featuredPost.created_at).toLocaleDateString()}</p>
                <p className="summary">{featuredPost.summary}</p>
                <div className="tags">
                  {processTags(featuredPost.tags).map((tag, index) => (
                    <span key={index} className="tag">{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          </Link>

          <h2 className="Latest text-foreground font-semibold">OTHER READS</h2>
          <div className="posts-grid">
            {remainingPosts.map((post) => (
              <div key={post.id} className="post-card">
                <Link href={`/post/${post.id}`} className="post-card">
                  <img src={post.image} alt={post.title} />
                  <div className="post-content">
                    <h4 className="text-xl">{post.title}</h4>
                    <h4 className="author font-semibold text-sm">Written by: {post.author}</h4>
                    <p className="date">{new Date(post.created_at).toLocaleDateString()}</p>
                    <p className="summary">{post.summary}</p>
                    <div className="tags">
                      {processTags(post.tags).map((tag, index) => (
                        <span key={index} className="tag">{tag}</span>
                      ))}
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default BlogContent;
