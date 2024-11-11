import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  FaDownload,
  FaTrash,
  FaList,
  FaThLarge,
  FaFolder,
  FaTag,
  FaFilter,
  FaSort,
} from "react-icons/fa";
import { Button } from "../ui/button";
import type { RootState } from "@/store";
import type { Document } from "@/types";
import { formatSize } from "@/types";

interface DocumentLibraryProps {
  documents: Document[];
  defaultView?: "grid" | "list";
}

// Add these helper functions at the top
const getDefaultView = (
  documents: Document[],
  userPreference?: "simple" | "advanced"
) => {
  // User preference takes priority
  if (userPreference) return userPreference;

  // If documents is undefined or empty array, force simple view
  if (!documents || !Array.isArray(documents) || documents.length === 0) {
    return "simple";
  }

  // Only use advanced view when we have more than 10 documents
  return documents.length > 10 ? "advanced" : "simple";
};

interface DocumentFolder {
  id: string;
  name: string;
  documents: string[]; // Document IDs
}

interface DocumentTag {
  id: string;
  name: string;
  color: string;
}

export function DocumentLibrary({
  documents = [],
  defaultView = "list",
}: DocumentLibraryProps) {
  const [displayMode, setDisplayMode] = useState<"grid" | "list">(defaultView);
  const [viewType, setViewType] = useState(() => {
    if (!documents || documents.length === 0) {
      return "simple";
    }
    return documents.length > 10 ? "advanced" : "simple";
  });

  // Update view type when document count changes
  useEffect(() => {
    if (!documents || documents.length === 0) {
      setViewType("simple");
    } else {
      setViewType(documents.length > 10 ? "advanced" : "simple");
    }
  }, [documents.length]);

  const { loading, error, folders, tags } = useSelector(
    (state: RootState) => state.documents
  );
  const [activeFolder, setActiveFolder] = useState<string | null>(null);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [showFolders, setShowFolders] = useState(false);

  // Filter documents based on folder and tags
  const filteredDocuments = documents.filter((doc) => {
    if (activeFolder) {
      const folder = folders.find((f) => f.id === activeFolder);
      if (!folder?.documents.includes(doc.id)) return false;
    }
    // Add tag filtering later
    return true;
  });

  if (loading) {
    return <div className="mt-6 text-center">Loading documents...</div>;
  }

  if (error) {
    return <div className="mt-6 text-center text-red-600">{error}</div>;
  }

  const AdvancedView = () => (
    <div>
      <div className="flex justify-between mb-4">
        <div className="flex space-x-4">
          <div className="relative">
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-2"
              onClick={() => setShowFolders(!showFolders)}
            >
              <FaFolder className="h-4 w-4" />
              Folders ({folders.length})
            </Button>
            {showFolders && (
              <div className="absolute top-full left-0 mt-1 w-48 bg-white rounded-lg shadow-lg border p-2">
                {folders.map((folder) => (
                  <button
                    key={folder.id}
                    className={`w-full text-left px-3 py-2 rounded hover:bg-gray-100 ${
                      activeFolder === folder.id ? "bg-blue-50" : ""
                    }`}
                    onClick={() => setActiveFolder(folder.id)}
                  >
                    {folder.name}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="relative">
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-2"
            >
              <FaTag className="h-4 w-4" />
              Tags ({tags.length})
            </Button>
          </div>

          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-2"
          >
            <FaFilter className="h-4 w-4" />
            Filter
          </Button>

          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-2"
          >
            <FaSort className="h-4 w-4" />
            Sort
          </Button>
        </div>
      </div>

      {displayMode === "grid" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDocuments.map((doc) => (
            <div key={doc.id} className="p-4 bg-white rounded-lg shadow">
              <h3 className="font-medium mb-2">{doc.name}</h3>
              <p className="text-sm text-gray-500 mb-4">
                {formatSize(doc.size)} •{" "}
                {new Date(doc.uploadedAt).toLocaleDateString()}
              </p>
              <div className="flex justify-end space-x-2">
                <Button variant="ghost" size="icon">
                  <FaDownload className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="text-red-500">
                  <FaTrash className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {filteredDocuments.map((doc) => (
            <div
              key={doc.id}
              className="flex items-center justify-between p-4 bg-white rounded-lg shadow"
            >
              <div className="flex-1">
                <h3 className="font-medium">{doc.name}</h3>
                <p className="text-sm text-gray-500">
                  {formatSize(doc.size)} •{" "}
                  {new Date(doc.uploadedAt).toLocaleDateString()}
                </p>
              </div>
              <div className="flex space-x-2">
                <Button variant="ghost" size="icon">
                  <FaDownload className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="text-red-500">
                  <FaTrash className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div className="mt-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Your Documents</h2>
        <div className="flex gap-2">
          <Button
            onClick={() => setDisplayMode("list")}
            variant={displayMode === "list" ? "default" : "outline"}
            size="icon"
          >
            <FaList className="h-4 w-4" />
          </Button>
          <Button
            onClick={() => setDisplayMode("grid")}
            variant={displayMode === "grid" ? "default" : "outline"}
            size="icon"
          >
            <FaThLarge className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {displayMode === "list" ? (
        <div className="space-y-4">
          {filteredDocuments.map((doc) => (
            <div
              key={doc.id}
              className="flex items-center justify-between p-4 bg-white rounded-lg shadow"
            >
              <div className="flex-1">
                <h3 className="font-medium">{doc.name}</h3>
                <p className="text-sm text-gray-500">
                  {formatSize(doc.size)} •{" "}
                  {new Date(doc.uploadedAt).toLocaleDateString()}
                </p>
              </div>
              <div className="flex space-x-2">
                <Button variant="ghost" size="icon">
                  <FaDownload className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="text-red-500">
                  <FaTrash className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDocuments.map((doc) => (
            <div key={doc.id} className="p-4 bg-white rounded-lg shadow">
              <h3 className="font-medium mb-2">{doc.name}</h3>
              <p className="text-sm text-gray-500 mb-4">
                {formatSize(doc.size)} •{" "}
                {new Date(doc.uploadedAt).toLocaleDateString()}
              </p>
              <div className="flex justify-end space-x-2">
                <Button variant="ghost" size="icon">
                  <FaDownload className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="text-red-500">
                  <FaTrash className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
