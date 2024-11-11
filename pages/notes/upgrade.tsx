import React from "react";
import Layout from "@/components/ui/layout";
import { FaCheck } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";

const noteFeatures = [
  {
    title: "Save Unlimited Notes",
    description: "No limits on how many AI chat responses you can save",
  },
  {
    title: "Custom Organization",
    description: "Create your own folders and tags to organize your notes",
  },
  {
    title: "Advanced Search",
    description:
      "Search within note content and use filters to find what you need",
  },
  {
    title: "Document Insights",
    description: "Get AI-powered insights from your uploaded documents",
  },
  {
    title: "Note Sharing",
    description: "Share important notes with trusted partners",
  },
];

export default function NotesUpgrade() {
  const { user } = useAuth();

  // If already a pro user, show different message
  if (user?.role === "pro") {
    return (
      <Layout>
        <div className="max-w-4xl mx-auto p-6">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-4">You're a Pro User!</h1>
            <p className="text-gray-600">
              You already have access to unlimited notes and all premium
              features.
            </p>
            <Button
              onClick={() => (window.location.href = "/notes")}
              className="mt-4 bg-blue-600 hover:bg-blue-700"
            >
              View Your Notes
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-4xl mx-auto p-6">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-4">
            Upgrade to Save More Notes
          </h1>
          <p className="text-gray-600">
            Free users can save up to 5 notes. Upgrade to Pro for unlimited
            notes and more features.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="grid gap-6">
            {noteFeatures.map((feature) => (
              <div key={feature.title} className="flex items-start gap-4">
                <div className="flex-shrink-0 mt-1">
                  <FaCheck className="h-5 w-5 text-green-500" />
                </div>
                <div>
                  <h3 className="font-semibold">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <Button className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700">
              Upgrade Now
            </Button>
          </div>
        </div>

        <div className="mt-6 text-center text-sm text-gray-500">
          <p>
            Questions about Pro features?{" "}
            <a href="#" className="text-blue-600 hover:underline">
              Contact us
            </a>
          </p>
        </div>
      </div>
    </Layout>
  );
}
