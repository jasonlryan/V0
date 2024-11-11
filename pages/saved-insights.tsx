import React from "react";
import Layout from "../components/ui/layout";
import { FaStar, FaLock } from "react-icons/fa";

const sampleInsights = [
  {
    id: 1,
    title: "Mortgage Tips",
    description:
      "Essential tips for first-time homebuyers on securing a mortgage.",
  },
  {
    id: 2,
    title: "Home Maintenance Schedule",
    description:
      "A comprehensive guide to maintaining your home throughout the year.",
  },
  {
    id: 3,
    title: "Property Tax Basics",
    description: "Understanding property taxes and how they affect homeowners.",
  },
  {
    id: 4,
    title: "Energy Efficiency Guide",
    description:
      "Tips for making your home more energy-efficient and reducing utility costs.",
  },
];

export default function SavedInsights() {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Saved Insights</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {sampleInsights.map((insight) => (
            <div
              key={insight.id}
              className="bg-white p-6 rounded-lg shadow-md relative border"
            >
              <h3 className="text-xl font-semibold mb-2">{insight.title}</h3>
              <p className="text-gray-600 mb-4">{insight.description}</p>
              <button className="text-blue-500 hover:text-blue-600 focus:outline-none">
                <FaStar className="h-6 w-6" />
              </button>
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
