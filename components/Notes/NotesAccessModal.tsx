import React from "react";
import { Modal } from "../ui/modal";
import { Button } from "../ui/button";
import { useRouter } from "next/router";
import { useAuth } from "@/hooks/useAuth";

interface NotesAccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentCount?: number;
}

export function NotesAccessModal({
  isOpen,
  onClose,
  currentCount = 0,
}: NotesAccessModalProps) {
  const router = useRouter();
  const { isAuthenticated } = useAuth();

  const handleAction = () => {
    if (!isAuthenticated) {
      router.push("/login");
    } else {
      router.push("/upgrade");
    }
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isAuthenticated ? "Note Limit Reached" : "Pro Feature"}
      description={
        isAuthenticated
          ? `You've saved ${currentCount} out of 5 available notes`
          : "Save unlimited notes with a Pro account"
      }
    >
      <div className="text-center">
        <p className="mb-6">
          {!isAuthenticated
            ? "Please log in or sign up for a Pro account to save notes"
            : "Upgrade to Pro to save unlimited notes and access advanced features"}
        </p>
        <Button
          onClick={handleAction}
          className="bg-blue-600 hover:bg-blue-700"
        >
          {!isAuthenticated ? "Login / Sign Up" : "Upgrade to Pro"}
        </Button>
      </div>
    </Modal>
  );
}
