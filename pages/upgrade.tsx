import React from "react";
import Layout from "@/components/ui/layout";
import { FaCheck, FaLock } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";

const proFeatures = [
  {
    title: "Document Vault Access",
    description: "Securely store and organize all your property documents",
  },
  {
    title: "Unlimited Storage",
    description: "Store as many documents as you need with up to 25MB per file",
  },
  {
    title: "Advanced Organization",
    description: "Custom folders, tags, and advanced search capabilities",
  },
  {
    title: "Document Sharing",
    description: "Securely share documents with trusted partners",
  },
  {
    title: "AI-Powered Features",
    description: "Smart categorization and document analysis",
  },
];

export default function Upgrade() {
  const { user } = useAuth();

  // If already a pro user, show different message
  if (user?.role === "pro") {
    return (
      <Layout>
        <div className="max-w-4xl mx-auto p-6">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-4">You're a Pro User!</h1>
            <p className="text-gray-600">
              You already have access to all premium features including the
              Document Vault.
            </p>
            <Button
              onClick={() => (window.location.href = "/documents")}
              className="mt-4 bg-blue-600 hover:bg-blue-700"
            >
              Go to Document Vault
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
          <h1 className="text-3xl font-bold mb-4">Upgrade to Pro</h1>
          <p className="text-gray-600">
            Get access to the Document Vault and all premium features
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="grid gap-6">
            {proFeatures.map((feature) => (
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
