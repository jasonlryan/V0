import React from "react";
import Layout from "@/components/ui/layout";
import { useAuth } from "@/hooks/useAuth";

export default function ProSettings() {
  const { user } = useAuth();
  const isPro = user?.role === "pro";

  if (!isPro) {
    return (
      <Layout>
        <div className="max-w-4xl mx-auto p-6">
          <h1 className="text-3xl font-bold mb-6">Pro Settings</h1>
          <div className="text-center p-6 bg-gray-50 rounded-lg">
            <h3 className="text-lg font-medium mb-2">Upgrade to Pro</h3>
            <p className="text-gray-600 mb-4">
              Get access to advanced settings and features
            </p>
            <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
              Upgrade Now
            </button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">Pro Settings</h1>
        <div className="space-y-6">{/* Pro settings content */}</div>
      </div>
    </Layout>
  );
}
