"use client";

import { UploadButton } from "@uploadthing/react";
import { OurFileRouter } from "@/app/api/uploadthing/core";

export default function FileUpload() {
  return (
    <div className="flex justify-center bg-background-color">
    <UploadButton
      className = "border-4 border-foreground w-1/5  bg-accent pb-2 rounded-lg  text-foreground"
      endpoint="mdxUploader"
      onClientUploadComplete={(res) => {
        console.log("Upload complete! File URL: " + res?.[0]?.url);
      }}
      onUploadError={(error) => {
        alert(`Upload failed: ${error.message}`);
      }}
    />
    </div>
  );
}
