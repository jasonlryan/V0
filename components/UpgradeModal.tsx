import React from "react";
import { Button } from "@/components/ui/button";
import { FaCheck } from "react-icons/fa";

interface UpgradeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const proFeatures = [
  "Unlimited document storage",
  "Advanced AI insights",
  "Personalized home maintenance schedules",
  "Priority customer support",
  "Exclusive webinars and educational content",
];

export default function UpgradeModal({ isOpen, onClose }: UpgradeModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black bg-opacity-50"
        onClick={onClose}
      ></div>
      <div className="bg-white rounded-lg shadow-xl z-10 w-full max-w-md mx-4">
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-4">Upgrade to Pro</h2>
          <p className="text-gray-600 mb-6">
            Unlock premium features and take your homeownership experience to
            the next level.
          </p>
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Pro Features:</h3>
            <ul className="space-y-2">
              {proFeatures.map((feature, index) => (
                <li key={index} className="flex items-center gap-2">
                  <FaCheck className="text-green-500 flex-shrink-0" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col sm:flex-row gap-2">
            <Button
              onClick={onClose}
              variant="outline"
              className="w-full sm:w-auto"
            >
              Maybe Later
            </Button>
            <Button className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700">
              Upgrade Now
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
