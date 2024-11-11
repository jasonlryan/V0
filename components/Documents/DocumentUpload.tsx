import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { useDispatch } from "react-redux";
import { FaCloudUploadAlt } from "react-icons/fa";
import { api } from "@/lib/api";
import { addDocument, setError } from "@/store/slices/documentsSlice";
import type { AppDispatch } from "@/store";

export function DocumentUpload() {
  const dispatch = useDispatch<AppDispatch>();

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      try {
        const file = acceptedFiles[0];
        const uploadedDoc = await api.documents.upload(file);
        dispatch(addDocument(uploadedDoc));
      } catch (err) {
        dispatch(setError("Failed to upload document"));
      }
    },
    [dispatch]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div
      {...getRootProps()}
      className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors
        ${
          isDragActive
            ? "border-blue-500 bg-blue-50"
            : "border-gray-300 hover:border-blue-400"
        }`}
    >
      <input {...getInputProps()} />
      <FaCloudUploadAlt className="mx-auto h-12 w-12 text-gray-400" />
      <p className="mt-2 text-sm text-gray-600">
        {isDragActive
          ? "Drop the file here"
          : "Drag and drop a file here, or click to select a file"}
      </p>
      <p className="text-xs text-gray-500 mt-1">
        Supported files: PDF, DOC, DOCX, JPG, PNG
      </p>
    </div>
  );
}
