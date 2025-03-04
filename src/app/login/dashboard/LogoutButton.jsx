"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

const LogoutButton = () => {
  const handleLogout = async () => {
    await fetch("/api/logout", { method: "POST" });

    // Force a full reload to clear authentication state
    window.location.href = "/login";
  };

  return (
    <Button onClick={handleLogout} className="bg-accent text-white px-4 py-2 rounded">
      Logout
    </Button>
  );
};

export default LogoutButton;
