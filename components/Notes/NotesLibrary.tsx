import React, { useState } from "react";
import { useSelector } from "react-redux";
import { FaTrash, FaEdit } from "react-icons/fa";
import { Button } from "../ui/button";
import type { RootState } from "@/store";

export function NotesLibrary() {
  const { notes, loading, error } = useSelector(
    (state: RootState) => state.notes
  );
  const { user } = useSelector((state: RootState) => state.auth);

  if (loading) {
    return <div className="mt-6 text-center">Loading notes...</div>;
  }

  if (error) {
    return <div className="mt-6 text-center text-red-600">{error}</div>;
  }

  if (!notes.length) {
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
    <div className="mt-6 space-y-4">
      {notes.map((note) => (
        <div key={note.id} className="p-4 bg-white rounded-lg shadow">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-medium">{note.title}</h3>
              <p className="text-sm text-gray-600 mt-1">{note.content}</p>
              <p className="text-xs text-gray-400 mt-2">
                Saved on {new Date(note.createdAt).toLocaleDateString()}
              </p>
            </div>
            <div className="flex space-x-2">
              <Button variant="ghost" size="icon">
                <FaEdit className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="text-red-500">
                <FaTrash className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
