import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { KnowledgeItem, SystemTag } from "@/types";
import { RootState } from "@/store";
import Link from "next/link";
import { removeNote } from "@/store/slices/notesSlice";
import { FaTrash } from "react-icons/fa";
import { api } from "@/lib/api";

const systemTags = Object.values(SystemTag);

export function InsightsList() {
  const [selectedTags, setSelectedTags] = useState<SystemTag[]>([]);
  const { notes, loading, error } = useSelector(
    (state: RootState) => state.notes
  );
  const insights = notes.filter((item: any) => item.type === 'insight');
  const dispatch = useDispatch();

  const filteredInsights =
    selectedTags.length > 0
      ? insights.filter((item: any) =>
          (item.systemTags || item.tags)?.some((tag: any) => selectedTags.includes(tag))
        )
      : insights;

  const handleDelete = async (id: string) => {
    try {
      await api.notes.delete(id);
      dispatch(removeNote(id));
    } catch (error) {
      // Handle error
    }
  };

  // Show loading state
  if (loading) {
    return (
      <div className="mt-6 text-center">
        <p className="text-gray-600">Loading your knowledge base...</p>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="mt-6 text-center text-red-600">
        <p>Error loading insights: {error}</p>
      </div>
    );
  }

  return (
    <div className="mt-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Your Knowledge Base</h2>
        <div className="flex gap-2">
          {systemTags.map((tag) => (
            <button
              key={tag}
              onClick={() =>
                setSelectedTags((prev) =>
                  prev.includes(tag)
                    ? prev.filter((t) => t !== tag)
                    : [...prev, tag]
                )
              }
              className={`px-3 py-1 rounded-full text-sm ${
                selectedTags.includes(tag)
                  ? "bg-blue-500 text-white"
                  : "bg-gray-100 text-gray-700"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        {filteredInsights.map((item: KnowledgeItem) => (
          <div
            key={item.id}
            className={`p-4 rounded-lg shadow ${
              item.type === "note" ? "bg-white" : "bg-blue-50"
            }`}
          >
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-medium">
                {item.type === "note" ? "Note: " : "Insight: "}
                {item.title}
              </h3>
              <div className="flex gap-1">
                {item.systemTags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-1 bg-gray-100 rounded-full text-xs text-gray-600"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <p className="text-gray-600">{item.content}</p>
            {item.relatedDocuments && item.relatedDocuments.length > 0 && (
              <div className="mt-2">
                <p className="text-sm text-gray-500 mb-1">Related Documents:</p>
                <div className="flex gap-2">
                  {item.relatedDocuments.map((docId) => (
                    <Link
                      key={docId}
                      href={`/documents?highlight=${docId}`}
                      className="text-sm text-blue-500 hover:text-blue-700 underline"
                    >
                      View Document
                    </Link>
                  ))}
                </div>
              </div>
            )}
            <div className="flex gap-2">
              <button
                onClick={() => handleDelete(item.id)}
                className="p-2 text-gray-500 hover:text-red-500"
              >
                <FaTrash />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
