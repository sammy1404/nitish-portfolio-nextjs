"use client"

import React, { useEffect, useState } from "react";
import supabase from "../login/dashboard/SupabaseClient";
import "./blogContent.css";
import "../../app/globals.css";
import Link from "next/link";

const BlogContent = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const { data, error } = await supabase
        .from("posts")
        .select("*")
        .order("created_at", { ascending: false }); // Get latest first

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

  const [featuredPost, ...remainingPosts] = posts;

  const processTags = (tags) => {
    if (!tags) return [];
    return tags.replace(/[\[\]"]+/g, "").split(",").map(tag => tag.trim());
  };

  return (
    <div className="blog-container">
      <h2 className="Latest text-foreground font-semibold">FEATURED</h2>

      <Link href={`/post/${featuredPost.id}`}>
      <div className="featured-post">
        <img src={featuredPost.image} alt={featuredPost.title} className="featured-image"/>
        <div className="featured-content">
          <h3 className=" text-3xl font-bold">{featuredPost.title}</h3>
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

      {/* Scrollable Posts Section */}
      <div className="posts-grid">
        {remainingPosts.map((post) => (
          <div key={post.id} className="post-card">
            <Link href={`/post/${post.id}`} className="post-card">
            <img src={post.image} alt={post.title} />
            <div className="post-content">
              <h4>{post.title}</h4>
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
    </div>
  );
};

export default BlogContent;
