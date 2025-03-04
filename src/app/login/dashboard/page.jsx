"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import LogoutButton from "./LogoutButton";
import FileUpload from './FileUpload'
import BlogPreview from "./BlogPreview"
import ThemeButton from "@/app/components/themeButton";

export default function Dashboard() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const res = await fetch("/api/check-auth");
      const data = await res.json();

      if (!data.authenticated) {
        router.push("/login"); // Redirect if not authenticated
      } else {
        setIsAuthenticated(true);
      }

      setLoading(false);
    };

    checkAuth();
  }, [router]);
  
  if (!isAuthenticated) return null; // Prevents flashing of protected content

  if (loading) return <p className=" bg-background-color">Loading...</p>;

  return (
    <div className="flex-col bg-secondary">
      <ThemeButton />
      <div className="flex justify-between w-fulls items-center px-5 pt-5">
        <h1 className="text-foreground text-3xl">Dashboard</h1>
        <LogoutButton />
      </div>
      <div className="mt-5 text-foreground p-5">
        <FileUpload />
      </div>
        <BlogPreview />
    </div>

  );
}
