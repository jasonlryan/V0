import React, { useEffect, useState } from "react";
import Layout from "@/components/ui/layout";
import { NotesList } from "@/components/Notes/NotesList";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { setNotes, setLoading, setError } from "@/store/slices/notesSlice";
import { api } from "@/lib/api";
import { useAuth } from "@/hooks/useAuth";
import { ProtectedRoute } from "@/components/ProtectedRoute";

const tags = [
  { id: "insight", label: "insight" },
  { id: "financial", label: "financial" },
  { id: "legal", label: "legal" },
  { id: "maintenance", label: "maintenance" },
  { id: "insurance", label: "insurance" },
  { id: "property", label: "property" },
  { id: "tax", label: "tax" },
];

export default function Notes() {
  const dispatch = useDispatch();
  const { user } = useAuth();
  const { notes, loading, error } = useSelector(
    (state: RootState) => state.notes
  );
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  useEffect(() => {
    const loadNotes = async () => {
      try {
        dispatch(setLoading(true));
        const notes = await api.notes.list();
        dispatch(setNotes(notes));
      } catch (error) {
        dispatch(setError("Failed to load notes"));
      } finally {
        dispatch(setLoading(false));
      }
    };
    loadNotes();
  }, [dispatch]);

  // Filter notes based on selected tag
  const filteredNotes = selectedTag
    ? notes.filter((note) => note.tags?.includes(selectedTag))
    : notes;

  return (
    <ProtectedRoute>
      <Layout>
        <div className="max-w-4xl mx-auto p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold">My Notes</h1>
            {user?.role === "free" && (
              <p className="text-sm text-gray-600">
                {notes.length} of 5 notes used
              </p>
            )}
          </div>

          {/* Tags section */}
          <div className="mb-6">
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <button
                  key={tag.id}
                  onClick={() =>
                    setSelectedTag(selectedTag === tag.id ? null : tag.id)
                  }
                  className={`px-3 py-1 rounded-full ${
                    selectedTag === tag.id
                      ? "bg-blue-100 text-blue-800"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {tag.label}
                  {selectedTag === tag.id && " ✕"}
                </button>
              ))}
            </div>
          </div>

          <NotesList notes={filteredNotes} />
        </div>
      </Layout>
    </ProtectedRoute>
  );
}
