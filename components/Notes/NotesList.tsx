import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaTrash } from "react-icons/fa";
import { Button } from "../ui/button";
import { Modal } from "../ui/modal";
import { removeNote, updateNote } from "@/store/slices/notesSlice";
import { api } from "@/lib/api";
import type { RootState } from "@/store";
import type { Note } from "@/types";

// Tag colors mapping
const tagColors = {
  financial: "bg-blue-100 text-blue-800",
  legal: "bg-purple-100 text-purple-800",
  maintenance: "bg-green-100 text-green-800",
  insurance: "bg-yellow-100 text-yellow-800",
  property: "bg-pink-100 text-pink-800",
  tax: "bg-red-100 text-red-800",
  insight: "bg-blue-100 text-blue-800",
};

// Update the component props
interface NotesListProps {
  notes: Note[];
}

// Add insight styling
const getCardStyle = (note: any) => {
  if (note.type === "insight") {
    return {
      backgroundColor: "bg-blue-50",
      border: "border border-blue-200",
    };
  }
  return {
    backgroundColor: "bg-white",
    border: "shadow-md",
  };
};

export function NotesList({ notes }: NotesListProps) {
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);
  const [deleteNoteId, setDeleteNoteId] = useState<string | null>(null);
  const [editingTitle, setEditingTitle] = useState<string | null>(null);
  const [editedTitle, setEditedTitle] = useState<string>("");

  // Delete handling
  const handleDelete = async (id: string) => {
    try {
      await api.notes.delete(id);
      dispatch(removeNote(id));
      setDeleteNoteId(null);
    } catch (error) {
      console.error("Failed to delete note:", error);
    }
  };

  if (notes.length === 0) {
    return (
      <div className="mt-6 text-center text-gray-600">
        <p>No saved notes yet.</p>
        {user?.role === "free" && (
          <p className="text-sm mt-2">
            Free users can save up to 5 notes from AI chat responses.
          </p>
        )}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {notes.map((note) => {
        const style = getCardStyle(note);
        return (
          <div
            key={note.id}
            className={`rounded-lg overflow-hidden flex flex-col ${style.backgroundColor} ${style.border}`}
          >
            <div className="p-4 flex-1 flex flex-col">
              {editingTitle === note.id ? (
                <input
                  type="text"
                  value={editedTitle}
                  className="w-full font-medium p-1 border rounded"
                  onBlur={async () => {
                    try {
                      await api.notes.update(note.id, { title: editedTitle });
                      dispatch(updateNote({ id: note.id, title: editedTitle }));
                    } catch (error) {
                      console.error("Failed to update note title:", error);
                    }
                    setEditingTitle(null);
                  }}
                  onChange={(e) => setEditedTitle(e.target.value)}
                  onClick={(e) => e.stopPropagation()}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") e.currentTarget.blur();
                    if (e.key === "Escape") setEditingTitle(null);
                  }}
                  autoFocus
                />
              ) : (
                <h3
                  className="font-medium text-lg cursor-text mb-2 pb-2 border-b"
                  onClick={() => {
                    setEditingTitle(note.id);
                    setEditedTitle(note.title);
                  }}
                >
                  {note.title}
                </h3>
              )}

              {/* Tags */}
              {note.tags && note.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-3">
                  {note.tags.map((tag) => (
                    <span
                      key={tag}
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        tagColors[tag] || "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              <p className="text-sm text-gray-600 flex-1">{note.content}</p>

              <div className="flex items-center justify-between text-xs text-gray-400 mt-4 pt-4 border-t">
                <span>{new Date(note.createdAt).toLocaleDateString()}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-red-500 hover:text-red-700"
                  onClick={() => setDeleteNoteId(note.id)}
                >
                  <FaTrash className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        );
      })}

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={!!deleteNoteId}
        onClose={() => setDeleteNoteId(null)}
        title="Delete Note"
        description="Are you sure you want to delete this note? This action cannot be undone."
      >
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => setDeleteNoteId(null)}>
            Cancel
          </Button>
          <Button
            onClick={() => deleteNoteId && handleDelete(deleteNoteId)}
            className="bg-red-600 hover:bg-red-700"
          >
            Delete
          </Button>
        </div>
      </Modal>
    </div>
  );
}
