import React from "react";
import { Modal } from "../ui/modal";
import { Button } from "../ui/button";
import { useRouter } from "next/router";
import { FaLock } from "react-icons/fa";

interface AccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  type?: "document-vault" | "notes-free" | "notes-limit";
}

export function AccessModal({
  isOpen,
  onClose,
  type = "document-vault",
}: AccessModalProps) {
  const router = useRouter();

  const modalContent = {
    "document-vault": {
      title: "Pro Feature",
      description:
        "Store and organize all your property documents in one secure place.",
      primaryAction: "Sign Up for Pro",
      primaryRoute: "/signup",
      secondaryAction: "Learn More",
      secondaryRoute: "/upgrade",
    },
    "notes-free": {
      title: "Sign Up to Save Notes",
      description:
        "Create a free account to save up to 5 notes from AI chat responses.",
      primaryAction: "Sign Up Free",
      primaryRoute: "/signup",
      secondaryAction: "Log In",
      secondaryRoute: "/login",
    },
    "notes-limit": {
      title: "Note Limit Reached",
      description:
        "You've reached the limit of 5 notes. Upgrade to Pro for unlimited notes.",
      primaryAction: "Upgrade to Pro",
      primaryRoute: "/upgrade",
      secondaryAction: "Learn More",
      secondaryRoute: "/upgrade",
    },
  };

  const content = modalContent[type];

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={content.title}
      description={content.description}
    >
      <div className="space-y-6">
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <div className="bg-blue-100 p-3 rounded-full">
              <FaLock className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <Button
            onClick={() => router.push(content.primaryRoute)}
            className="w-full bg-blue-600 hover:bg-blue-700"
          >
            {content.primaryAction}
          </Button>
          <Button
            onClick={() => router.push(content.secondaryRoute)}
            variant="outline"
            className="w-full"
          >
            {content.secondaryAction}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
