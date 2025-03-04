"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import LogoutButton from "./LogoutButton";

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

  if (loading) return <p className=" bg-foreground">Loading...</p>;

  if (!isAuthenticated) return null; // Prevents flashing of protected content

  return (
    <div className="bg-foreground">
      <h1>Welcome to the Dashboard</h1>
      <LogoutButton />
    </div>
  );
}
