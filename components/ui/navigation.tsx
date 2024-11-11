import { useNavigation } from "@/context/NavigationContext";
import { useAuth } from "@/hooks/useAuth";
import { useSelector } from "react-redux";
import { AccessModal } from "@/components/Documents/AccessModal";
import { useRouter } from "next/router";
import type { RootState } from "@/store";

export function Navigation() {
  const { showAccessModal, setShowAccessModal } = useNavigation();
  const { user } = useAuth();
  const router = useRouter();
  const notes = useSelector((state: RootState) => state.notes.notes);

  const handleDocVaultClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!user) {
      setShowAccessModal(true);
    } else if (user.role !== "pro") {
      router.push("/upgrade");
    } else {
      router.push("/documents");
    }
  };

  return (
    <>
      <nav className="flex items-center space-x-4">
        <a href="/" className="text-gray-600 hover:text-gray-900">
          Home
        </a>
        <a
          href="/documents"
          onClick={handleDocVaultClick}
          className="text-gray-600 hover:text-gray-900"
        >
          Document Vault
        </a>
        <a href="/notes" className="text-gray-600 hover:text-gray-900">
          My Notes {user?.role === "free" && `(${notes.length}/5)`}
        </a>
      </nav>

      {/* Access Modal */}
      <AccessModal
        isOpen={showAccessModal}
        onClose={() => setShowAccessModal(false)}
      />
    </>
  );
}
