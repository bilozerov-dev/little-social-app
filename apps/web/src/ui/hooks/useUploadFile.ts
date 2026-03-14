import { PostFilesInput, PostFilesOutput } from "@/app/api/upload/types";
import { useState } from "react";

export default function useUploadFile() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const upload = async () => {
    if (!file) {
      setError("No file selected.");
      return;
    }

    setLoading(true);

    const fileData: PostFilesInput = {
      fileName: file.name,
      fileType: file.type,
    };

    const response = await fetch(
      process.env.NEXT_PUBLIC_BASE_URL + "/api/upload",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(fileData),
      }
    );

    if (!response.ok) {
      setLoading(false);
      setError("Failed to upload file.");
      return;
    }

    const { uploadUrl, error }: PostFilesOutput = await response.json();

    if (error) {
      setLoading(false);
      setError(error);
      return;
    }

    const uploadResponse = await fetch(uploadUrl, {
      method: "PUT",
      headers: {
        "Content-Type": file.type,
      },
      body: file,
    });

    if (!uploadResponse.ok) {
      setLoading(false);
      setError("Failed to upload file.");
    }

    setLoading(false);
  };

  return {
    loading,
    error,
    setFile,
    submit: upload,
  };
}
