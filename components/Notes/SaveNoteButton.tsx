import React, { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useDispatch, useSelector } from "react-redux";
import { FaBookmark } from "react-icons/fa";
import { Button } from "../ui/button";
import { addNote } from "@/store/slices/notesSlice";
import { AccessModal } from "../Documents/AccessModal";
import type { RootState } from "@/store";
import { v4 as uuidv4 } from "uuid";

interface SaveNoteButtonProps {
  text: string;
}

export function SaveNoteButton({ text }: SaveNoteButtonProps) {
  const dispatch = useDispatch();
  const { user } = useAuth();
  const [showAccessModal, setShowAccessModal] = useState(false);
  const notes = useSelector((state: RootState) => state.notes.notes);

  const handleClick = () => {
    if (!user) {
      setShowAccessModal(true);
      return;
    }

    if (user.role === "free" && notes.length >= 5) {
      setShowAccessModal(true);
      return;
    }

    // Create and save the note
    const note = {
      id: uuidv4(),
      title: `Note: ${text.slice(0, 50)}...`,
      content: text,
      createdAt: new Date().toISOString(),
      tags: [],
      source: "note" as const,
    };

    dispatch(addNote(note));
  };

  return (
    <>
      <Button
        onClick={handleClick}
        variant="ghost"
        size="sm"
        className="text-[#B4C9CD] hover:text-[#a3b8bc] p-0 h-auto min-h-0"
      >
        Save <FaBookmark className="h-3 w-3 ml-1" />
      </Button>

      <AccessModal
        isOpen={showAccessModal}
        onClose={() => setShowAccessModal(false)}
        type={!user ? "notes-free" : "notes-limit"}
      />
    </>
  );
}
