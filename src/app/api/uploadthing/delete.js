import { utapi } from "uploadthing/server";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method Not Allowed" });

  try {
    const { fileKey } = req.body;
    console.log("Received delete request for:", fileKey); // Debugging log

    if (!fileKey) return res.status(400).json({ error: "File key required" });

    const deleteResponse = await utapi.deleteFiles(fileKey);
    console.log("Delete response:", deleteResponse); // Debugging log

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("Error deleting UploadThing file:", error);
    return res.status(500).json({ error: "Failed to delete file" });
  }
}
