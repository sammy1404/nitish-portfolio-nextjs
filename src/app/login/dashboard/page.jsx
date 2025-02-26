"use client"; // Ensures this runs on the client-side

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { UploadButton } from "../../utils/uploadthing";

const LogoutButton = () => {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await fetch("/api/logout", { method: "POST" }); // Call the logout API
      document.cookie = "auth=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;"; // Clear cookie manually
      router.push("/login"); // Redirect to login page
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
<div>
  <main className="flex min-h-screen flex-col items-center justify-between p-24">
    <>
      <UploadButton
        endpoint="imageUploader"
        onClientUploadComplete={(res) => {
          console.log("Files: ", res);
          alert("Upload Completed");
        }}
        onUploadError={(error) => {
          alert(`ERROR! ${error.message}`);
        }}
      />
    </>
  </main>

      {/* <Button onClick={handleLogout} className="bg-accent text-white px-4 py-2 rounded cursor-pointer text-foreground rounded-md font-bold">
        Logout
      </Button> */}
    </div>
  );
};

export default LogoutButton;
