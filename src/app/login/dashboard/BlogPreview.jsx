import { useEffect, useState } from "react";
import supabase from "./SupabaseClient";
import ThemeButton from "@/app/components/themeButton";

const BlogPreview = () => {
  const [posts, setPosts] = useState([]);

  // Fetch posts from Supabase
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

  useEffect(() => {
    fetchPosts();
  }, []);

  // Function to process tags
  const processTags = (tags) => {
    if (!tags) return [];
    return tags.replace(/[\[\]"]+/g, "").split(",").map(tag => tag.trim());
  };

  // Function to delete a post
  const deletePost = async (postId) => {
    const confirmation = prompt("Type 'delete' to confirm deletion:");
    
    if (confirmation === "delete") {
      const { error } = await supabase.from("posts").delete().eq("id", postId);
      
      if (error) {
        console.error("Error deleting post:", error);
      } else {
        alert("Post deleted successfully!");
        fetchPosts(); // Refresh posts after deletion
      }
    } else {
      alert("Deletion cancelled.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <ThemeButton />
      <h1 className="text-xl text-foreground font-bold mb-5">Blog Previews</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
        {posts.map((post) => (
          <div
            key={post.id}
            className="bg-primary shadow-lg rounded-lg p-2 flex flex-col items-center transition-transform transform hover:scale-105"
          >
            {post.image && (
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-40 object-cover rounded-lg mb-2"
                onError={(e) => (e.target.style.display = "none")}
              />
            )}
            <h3 className="text-xl font-semibold text-foreground mb-2">{post.title}</h3>
            <p className="text-foreground font-semibold">
              Author: {post.author} | Date: {new Date(post.created_at).toLocaleDateString()}
            </p>
            <p className="text-foreground text-sm my-2">{post.summary}</p>

            <div className="mt-2 flex flex-wrap gap-2">
              <span className="text-xs text-foreground font-bold py-1 rounded">
                Tags:
              </span>
              {processTags(post.tags).map((tag, index) => (
                <span
                  key={index}
                  className="text-xs bg-accent text-foreground px-2 py-1 rounded-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
            
            <div className="my-3 flex gap-4">
              <a
                href={post.content}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-foreground"
              >
                View Full Post →
              </a>
            </div>
            <button
                onClick={() => deletePost(post.id, post.image, post.content)}
                className="px-3 py-1 bg-red rounded-lg text-foreground text-sm mb-2"
              >
                Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogPreview;
