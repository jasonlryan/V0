import React from "react";
import Layout from "../components/ui/layout";
import { Button } from "@/components/ui/button";
import { FaUpload, FaLock } from "react-icons/fa";

const documentCategories = [
  {
    name: "Mortgage Documents",
    icon: "🏠",
    description: "Store your mortgage paperwork securely.",
  },
  {
    name: "Insurance Papers",
    icon: "📄",
    description: "Keep your insurance documents organized.",
  },
  {
    name: "Property Deeds",
    icon: "📜",
    description: "Safely store your property deeds.",
  },
  {
    name: "Home Maintenance",
    icon: "🔧",
    description: "Track your home maintenance records.",
  },
];

export default function DocumentVault() {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Document Vault</h1>
        <div className="mb-8">
          <Button className="flex items-center gap-2">
            <FaUpload className="h-5 w-5" />
            Upload Document
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {documentCategories.map((category) => (
            <div
              key={category.name}
              className="bg-white p-6 rounded-lg shadow-md relative border"
            >
              <div className="text-4xl mb-2">{category.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{category.name}</h3>
              <p className="text-gray-600">{category.description}</p>
              <div className="absolute top-2 right-2">
                <FaLock className="h-5 w-5 text-gray-400" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}
