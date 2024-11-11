import React from "react";
import { Modal } from "../ui/modal";
import { Button } from "../ui/button";
import { useRouter } from "next/router";

interface UpgradePromptProps {
  isOpen: boolean;
  onClose: () => void;
  currentCount: number;
  maxNotes: number;
}

export function UpgradePrompt({
  isOpen,
  onClose,
  currentCount,
  maxNotes,
}: UpgradePromptProps) {
  const router = useRouter();

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Note Limit Reached"
      description={`You've saved ${currentCount} out of ${maxNotes} available notes`}
    >
      <div className="space-y-4">
        <p className="text-gray-600">
          Upgrade to Pro to save unlimited notes and access advanced features:
        </p>
        <ul className="list-disc list-inside text-gray-600 space-y-2">
          <li>Unlimited notes</li>
          <li>Custom folders</li>
          <li>Advanced organization</li>
          <li>Document insights</li>
        </ul>
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={onClose}>
            Maybe Later
          </Button>
          <Button
            onClick={() => router.push("/upgrade")}
            className="bg-blue-600 hover:bg-blue-700"
          >
            Upgrade to Pro
          </Button>
        </div>
      </div>
    </Modal>
  );
}
