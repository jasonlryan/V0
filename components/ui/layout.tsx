import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Button } from "./button";
import {
  FaHome,
  FaFolder,
  FaBookmark,
  FaInfoCircle,
  FaCog,
  FaQuestionCircle,
} from "react-icons/fa";
import { SettingsModal } from "../Settings/SettingsModal";
import { useAuth } from "@/hooks/useAuth";
import { useNavigation } from "@/context/NavigationContext";
import { AccessModal } from "../Documents/AccessModal";
import { useSelector } from "react-redux";
import type { RootState } from "@/store";

type LayoutProps = {
  children: React.ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  const router = useRouter();
  const { isAuthenticated, user, logout } = useAuth();
  const { showAccessModal, setShowAccessModal } = useNavigation();

  // Add state and trigger for settings modal
  const [showSettings, setShowSettings] = useState(false);
  const [modalType, setModalType] = useState<
    "document-vault" | "notes-free" | "notes-limit"
  >("document-vault");
  const notes = useSelector((state: RootState) => state.notes.notes);

  const handleLogout = async () => {
    await logout();
    router.push("/"); // Redirect to home after logout
  };

  const handleDocVaultClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!user) {
      setModalType("document-vault");
      setShowAccessModal(true);
    } else if (user.role !== "pro") {
      router.push("/upgrade");
    } else {
      router.push("/documents");
    }
  };

  const handleNotesClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!user) {
      setModalType("notes-free");
      setShowAccessModal(true);
      return;
    }
    router.push("/notes");
  };

  return (
    <div className="flex h-screen bg-white">
      {/* Sidebar */}
      <div className="w-[250px] border-r flex flex-col">
        <div className="p-4">
          <Link href="/" passHref>
            <Button
              variant="outline"
              className="w-full justify-start gap-2 h-12 text-base font-normal border-2 border-blue-100 text-blue-600"
            >
              <FaHome className="h-5 w-5" />
              Home
            </Button>
          </Link>
        </div>

        <div className="px-4 py-2">
          <h2 className="text-sm font-medium text-gray-500 mb-2">
            MY HOMETRUTH
          </h2>
          <div className="space-y-1">
            <Button
              variant="ghost"
              className="w-full justify-start gap-2 text-gray-600 font-normal"
              onClick={handleDocVaultClick}
            >
              <FaFolder className="h-4 w-4" />
              Document Vault
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start gap-2 text-gray-600 font-normal"
              onClick={handleNotesClick}
            >
              <FaBookmark className="h-4 w-4" />
              My Notes {user?.role === "free" && `(${notes.length}/5)`}
            </Button>
          </div>
        </div>

        <div className="mt-auto border-t">
          <div className="px-4 py-2 space-y-1">
            <Link href="/about" passHref>
              <Button
                variant="ghost"
                className="w-full justify-start gap-2 text-gray-600 font-normal"
              >
                <FaInfoCircle className="h-4 w-4" />
                About HomeTruth
              </Button>
            </Link>
            <Button
              variant="ghost"
              className="w-full justify-start gap-2 text-gray-600 font-normal"
              onClick={() => setShowSettings(true)}
            >
              <FaCog className="h-4 w-4" />
              Settings
            </Button>
            <Link href="/help" passHref>
              <Button
                variant="ghost"
                className="w-full justify-start gap-2 text-gray-600 font-normal"
              >
                <FaQuestionCircle className="h-4 w-4" />
                Help & Support
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        <header className="h-16 border-b flex items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <FaHome className="h-5 w-5 text-blue-600" />
            <span className="text-xl font-semibold">HomeTruth</span>
          </div>

          {/* Auth buttons */}
          <div className="flex items-center gap-4">
            {!isAuthenticated && (
              <>
                <Link href="/login">
                  <Button variant="ghost">Sign in</Button>
                </Link>
                <span className="text-gray-300">|</span>
                <Link href="/signup">
                  <Button variant="ghost">Sign up</Button>
                </Link>
              </>
            )}
            {isAuthenticated && (
              <>
                <span className="text-sm text-gray-600">
                  {user?.name || user?.email}
                </span>
                <span className="px-2 py-1 bg-gray-100 rounded text-sm">
                  {user?.role === "pro" ? "Pro Plan" : "Free Plan"}
                </span>
                <Button variant="ghost" onClick={handleLogout}>
                  Sign out
                </Button>
                {user?.role === "free" && (
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    Upgrade to Pro
                  </Button>
                )}
              </>
            )}
          </div>
        </header>

        <main className="flex-1 overflow-auto">{children}</main>
      </div>

      {/* Add modal to layout */}
      <SettingsModal
        isOpen={showSettings}
        onClose={() => setShowSettings(false)}
      />

      {/* Access Modal */}
      <AccessModal
        isOpen={showAccessModal}
        onClose={() => setShowAccessModal(false)}
        type={modalType}
      />
    </div>
  );
}
