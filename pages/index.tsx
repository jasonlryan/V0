import React, { useState, useEffect } from "react";
import Layout from "../components/ui/layout";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { FaPaperPlane, FaShare, FaBookmark } from "react-icons/fa";
import { useAuth } from "@/hooks/useAuth";
import { Modal } from "@/components/ui/modal";
import { SaveNoteButton } from "@/components/Notes/SaveNoteButton";

interface Message {
  id: number;
  text: string;
  sender: "user" | "ai";
  canSave: boolean;
}

export default function Home() {
  const { user } = useAuth();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Welcome to HomeTruth! I'm your trusted AI advisor for all aspects of homeownership. Whether you're buying, selling, or maintaining your home, I'm here to provide accurate, reliable information. How can I assist you today?",
      sender: "ai",
      canSave: false,
    },
  ]);
  const [input, setInput] = useState("");

  // Add chat persistence
  useEffect(() => {
    const savedMessages = localStorage.getItem("chatMessages");
    if (savedMessages) {
      setMessages(JSON.parse(savedMessages));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("chatMessages", JSON.stringify(messages));
  }, [messages]);

  // Mock AI responses based on keywords
  const getMockResponse = (userInput: string) => {
    const input = userInput.toLowerCase();
    if (input.includes("mortgage") || input.includes("loan")) {
      return "I can help you understand mortgages. Would you like to know about different types of mortgages, current rates, or how to qualify?";
    }
    if (input.includes("maintenance") || input.includes("repair")) {
      return "Regular home maintenance is crucial. I can provide you with a seasonal maintenance checklist or help with specific repair concerns.";
    }
    // Default response if no keywords match
    return (
      "I understand you're asking about " +
      userInput +
      ". Could you provide more details about what specific information you're looking for?"
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      // Add user message with canSave: false
      setMessages([
        ...messages,
        {
          id: messages.length + 1,
          text: input,
          sender: "user",
          canSave: false,
        },
      ]);
      setInput("");

      // Add mock AI response
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            id: prev.length + 1,
            text: getMockResponse(input),
            sender: "ai",
            canSave: true,
          },
        ]);
      }, 1000);
    }
  };

  const handleSave = (message: Message) => {
    if (!user) {
      // Show login modal
      return;
    }
    if (user.role === "free") {
      // Check if user has reached 5 note limit
      // Show upgrade modal if limit reached
      return;
    }
    // Save note logic here
  };

  // Update AIMessage component to be more elegant
  const AIMessage = ({ message }: { message: Message }) => (
    <div className="mb-4 text-left">
      <div className="inline-block p-3 rounded-lg max-w-[80%] bg-gray-50 text-gray-900">
        <div>{message.text}</div>
        {message.canSave && (
          <div className="mt-1 flex justify-end">
            <SaveNoteButton text={message.text} />
          </div>
        )}
      </div>
    </div>
  );

  // Add reset function
  const resetChat = () => {
    setMessages([
      {
        id: 1,
        text: "Welcome to HomeTruth! I'm your trusted AI advisor for all aspects of homeownership. Whether you're buying, selling, or maintaining your home, I'm here to provide accurate, reliable information. How can I assist you today?",
        sender: "ai",
        canSave: false,
      },
    ]);
    localStorage.removeItem("chatMessages"); // Clear stored messages
  };

  // Update input placeholder
  return (
    <Layout>
      <div className="flex flex-col h-full">
        <div className="p-4 border-b border-[#B4C9CD] flex justify-end">
          <Button
            onClick={resetChat}
            variant="outline"
            size="sm"
            className="text-gray-600 hover:text-gray-900 border-[#B4C9CD]"
          >
            New Chat
          </Button>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          {messages.map((message) =>
            message.sender === "ai" ? (
              <AIMessage key={message.id} message={message} />
            ) : (
              <div key={message.id} className="mb-4 text-left">
                <div className="inline-block p-3 max-w-[80%] text-gray-900">
                  <span className="font-semibold text-gray-600 mr-2">
                    {user ? `${user.name}:` : "Guest:"}
                  </span>
                  <span>{message.text}</span>
                </div>
              </div>
            )
          )}
        </div>

        <div className="p-4 border-t border-[#B4C9CD]">
          <form onSubmit={handleSubmit} className="flex gap-2">
            <Input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={
                user
                  ? `${user.name}: `
                  : "Ask HomeTruth anything about homeownership..."
              }
              className="flex-1 border-[#B4C9CD] focus:border-[#B4C9CD] focus:ring-[#B4C9CD]"
            />
            <Button
              type="submit"
              size="icon"
              className="bg-[#B4C9CD] hover:bg-[#a3b8bc]"
            >
              <FaPaperPlane className="h-4 w-4" />
            </Button>
          </form>
        </div>
      </div>
    </Layout>
  );
}
