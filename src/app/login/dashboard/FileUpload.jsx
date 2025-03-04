"use client";

import { UploadButton } from "@uploadthing/react";
import { useState } from "react";

export default function FileUpload() {
  const [fileUrl, setFileUrl] = useState("");

  return (
    <div className="flex flex-col items-center bg-background-color">
      <UploadButton
        className="border-4 border-foreground w-1/5 bg-accent pb-2 rounded-lg text-foreground"
        endpoint="mdxUploader"
        onClientUploadComplete={(res) => {
          if (res?.[0]?.url) {
            setFileUrl(res[0].url);
            console.log("Upload complete! File URL: " + res[0].url);
          }
        }}
        onUploadError={(error) => {
          alert(`Upload failed: ${error.message}`);
        }}
      />
      {fileUrl && (
        <p className="mt-4 text-foreground">
          Uploaded file: <a href={fileUrl} target="_blank">{fileUrl}</a>
        </p>
      )}
    </div>
  );
}
