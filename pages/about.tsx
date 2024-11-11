import React from "react";
import Layout from "../components/ui/layout";
import { FaBolt, FaShieldAlt, FaClipboardList, FaClock } from "react-icons/fa";

const features = [
  {
    name: "AI-Powered Insights",
    description:
      "Get personalized advice and insights powered by cutting-edge artificial intelligence.",
    icon: FaBolt,
  },
  {
    name: "Secure Document Storage",
    description:
      "Store your important home-related documents with bank-level encryption and security.",
    icon: FaShieldAlt,
  },
  {
    name: "Comprehensive Coverage",
    description:
      "From mortgages to maintenance, we cover all aspects of homeownership to keep you informed.",
    icon: FaClipboardList,
  },
  {
    name: "24/7 Availability",
    description: `Access HomeTruth's AI assistant anytime, day or night, for instant help and advice.`,
    icon: FaClock,
  },
];

export default function About() {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">About HomeTruth</h1>
        <p className="mb-8 text-gray-600">
          HomeTruth is your AI-powered companion for navigating the complexities
          of homeownership. We combine cutting-edge artificial intelligence with
          comprehensive real estate knowledge to provide you with accurate,
          personalized guidance for all your home-related decisions.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature) => (
            <div
              key={feature.name}
              className="bg-white p-6 rounded-lg shadow-md border"
            >
              <div className="flex items-center mb-4">
                <feature.icon className="h-6 w-6 text-blue-500 mr-3" />
                <h3 className="text-xl font-semibold">{feature.name}</h3>
              </div>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}
