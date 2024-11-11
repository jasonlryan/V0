import React, { useEffect } from "react";
import Layout from "@/components/ui/layout";
import { DocumentUpload } from "@/components/Documents/DocumentUpload";
import { DocumentLibrary } from "@/components/Documents/DocumentLibrary";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import {
  setDocuments,
  setFolders,
  setTags,
  setLoading,
  setError,
} from "@/store/slices/documentsSlice";
import { api } from "@/lib/api";
import { ProtectedRoute } from "@/components/ProtectedRoute";

export default function Documents() {
  const dispatch = useDispatch();
  const { documents, loading, error } = useSelector(
    (state: RootState) => state.documents
  );

  useEffect(() => {
    const loadDocuments = async () => {
      try {
        dispatch(setLoading(true));
        const [docs, folders, tags] = await Promise.all([
          api.documents.list(),
          api.documents.folders.list(),
          api.documents.tags.list(),
        ]);
        dispatch(setDocuments(docs));
        dispatch(setFolders(folders));
        dispatch(setTags(tags));
      } catch (error) {
        dispatch(setError("Failed to load documents"));
      } finally {
        dispatch(setLoading(false));
      }
    };
    loadDocuments();
  }, [dispatch]);

  return (
    <ProtectedRoute requiresPro>
      <Layout>
        <div className="max-w-4xl mx-auto p-6">
          <h1 className="text-3xl font-bold mb-6">Document Vault</h1>
          <DocumentUpload />
          <DocumentLibrary documents={documents} />
        </div>
      </Layout>
    </ProtectedRoute>
  );
}
