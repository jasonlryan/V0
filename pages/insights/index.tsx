import React from "react";
import Layout from "@/components/ui/layout";
import { InsightsList } from "@/components/Insights/InsightsList";

export default function Insights() {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">Saved Insights</h1>
        <InsightsList />
      </div>
    </Layout>
  );
}
