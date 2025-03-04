import { createUploadthing } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";

const f = createUploadthing();

const auth = (req) => ({ id: "fakeId" }); // Fake auth function

export const ourFileRouter = {
  // MDX File Uploader
  mdxUploader: f({
    "text/markdown": {
      maxFileSize: "16MB",
      maxFileCount: 1,
    },
  })
    .middleware(async ({ req }) => {
      const user = await auth(req);
      if (!user) throw new UploadThingError("Unauthorized");
      return { userId: user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Upload complete for userId:", metadata.userId);
      console.log("File URL:", file.url);
      return { uploadedBy: metadata.userId, fileUrl: file.url };
    }),

    imageUploader: f({
      "image/png": ["png"],
      "image/jpeg": ["jpg", "jpeg"],
      "image/webp": ["webp"],
    })
      .middleware(async ({ req }) => {
        const user = await auth(req);
        if (!user) throw new UploadThingError("Unauthorized");
        return { userId: user.id };
      })
      .onUploadComplete(async ({ metadata, file }) => {
        console.log("Image Upload complete for userId:", metadata.userId);
        console.log("Image File URL:", file.url);
        return { uploadedBy: metadata.userId, fileUrl: file.url };
      }),
  };
  
export default ourFileRouter;
