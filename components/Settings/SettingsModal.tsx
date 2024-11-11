import React, { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { UserPreferences, SystemTag } from "@/types";
import { FaCog, FaBell, FaCrown, FaTimes } from "react-icons/fa";

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SettingsModal({ isOpen, onClose }: SettingsModalProps) {
  const [activeTab, setActiveTab] = useState("display");
  const { user } = useAuth();
  const isPro = user?.role === "pro";

  const tabs = [
    { id: "display", label: "Display", icon: FaCog },
    { id: "notifications", label: "Notifications", icon: FaBell },
    { id: "pro", label: "Pro Features", icon: FaCrown },
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-[900px] h-[600px] flex overflow-hidden">
        {/* Sidebar */}
        <div className="w-[250px] border-r bg-gray-50">
          <div className="p-4 border-b">
            <h2 className="text-xl font-semibold">Settings</h2>
          </div>
          <div className="p-2">
            {tabs.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={`w-full flex items-center gap-2 px-4 py-3 text-sm font-medium rounded-lg ${
                  activeTab === id
                    ? "bg-blue-50 text-blue-600"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <Icon className="h-4 w-4" />
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 flex flex-col">
          <div className="p-4 border-b flex justify-between items-center">
            <h3 className="text-lg font-medium">
              {tabs.find((t) => t.id === activeTab)?.label}
            </h3>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <FaTimes className="h-5 w-5 text-gray-500" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-6">
            {activeTab === "display" && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-4">Theme</h3>
                  <div className="grid grid-cols-3 gap-4">
                    {["Light", "Dark", "System"].map((theme) => (
                      <button
                        key={theme}
                        className="p-3 border rounded-lg hover:border-blue-500"
                      >
                        {theme}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-4">Font Size</h3>
                  <div className="grid grid-cols-3 gap-4">
                    {["Small", "Medium", "Large"].map((size) => (
                      <button
                        key={size}
                        className="p-3 border rounded-lg hover:border-blue-500"
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === "notifications" && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-4">
                    Email Notifications
                  </h3>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="form-checkbox" />
                    <span>Receive email notifications</span>
                  </label>
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-4">
                    Notification Frequency
                  </h3>
                  <select className="w-full p-2 border rounded-lg">
                    <option>Daily</option>
                    <option>Weekly</option>
                    <option>Monthly</option>
                  </select>
                </div>
              </div>
            )}

            {activeTab === "pro" && (
              <div className="space-y-6">
                {!isPro ? (
                  <div className="text-center p-6 bg-gray-50 rounded-lg">
                    <FaCrown className="h-12 w-12 text-yellow-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium mb-2">Upgrade to Pro</h3>
                    <p className="text-gray-600 mb-4">
                      Get access to advanced features and more storage
                    </p>
                    <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
                      Upgrade Now
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Pro Features</h3>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium mb-2">Document Storage</h4>
                        <select className="w-full p-2 border rounded-lg">
                          <option>Auto-categorize uploads</option>
                          <option>Manual categorization</option>
                        </select>
                      </div>
                      <div>
                        <h4 className="font-medium mb-2">Privacy Settings</h4>
                        <label className="flex items-center gap-2">
                          <input type="checkbox" className="form-checkbox" />
                          <span>Allow sharing insights</span>
                        </label>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
