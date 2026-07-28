"use client";

import { useState, useRef, useEffect } from "react";
import { Send, ArrowLeft, MoreVertical, Phone, Video, Check, CheckCheck } from "lucide-react";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { cn } from "@/lib/utils";

const conversations = [
  { id: "1", name: "Rwanda Car Rentals", lastMessage: "Your vehicle is ready for pickup!", time: "10m ago", unread: 2, online: true },
  { id: "2", name: "Safari Adventures", lastMessage: "Thank you for your booking.", time: "1h ago", unread: 0, online: false },
  { id: "3", name: "Kigali Tours", lastMessage: "Would you like to add a driver?", time: "3h ago", unread: 1, online: true },
];

const initialMessages = [
  { id: "1", sender: "them", text: "Hello! Thank you for booking with us.", time: "9:30 AM" },
  { id: "2", sender: "me", text: "Hi! When can I pick up the vehicle?", time: "9:32 AM" },
  { id: "3", sender: "them", text: "You can pick up anytime after 10 AM on your pickup date. Our office is at KG 7 Ave, Kigali Heights.", time: "9:35 AM" },
  { id: "4", sender: "me", text: "Perfect, thank you!", time: "9:36 AM" },
  { id: "5", sender: "them", text: "Your vehicle is ready for pickup! Don't forget to bring your driver's license and booking confirmation.", time: "10:00 AM" },
];

export default function MessagesPage() {
  const [selectedConvo, setSelectedConvo] = useState<string | null>(null);
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState(initialMessages);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    if (!newMessage.trim()) return;
    setMessages((prev) => [...prev, { id: Date.now().toString(), sender: "me", text: newMessage, time: "Now" }]);
    setNewMessage("");
    // Simulate reply
    setTimeout(() => {
      setMessages((prev) => [...prev, { id: (Date.now() + 1).toString(), sender: "them", text: "Thank you for your message. We'll get back to you shortly.", time: "Now" }]);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Messages" }]} />
        <h1 className="mt-4 text-2xl font-bold text-heading">Messages</h1>

        <div className="mt-6 bg-card rounded-[16px] border border-gray-100 shadow-sm overflow-hidden h-[600px] flex">
          {/* Conversations List */}
          <div className={cn("w-full sm:w-80 border-r border-gray-100 flex flex-col", selectedConvo && "hidden sm:flex")}>
            <div className="p-4 border-b border-gray-100">
              <input
                type="text"
                placeholder="Search conversations..."
                className="w-full px-3 py-2 rounded-[10px] border border-gray-200 text-sm focus:border-primary focus:outline-none"
              />
            </div>
            <div className="flex-1 overflow-y-auto">
              {conversations.map((c) => (
                <button
                  key={c.id}
                  onClick={() => setSelectedConvo(c.id)}
                  className={cn(
                    "w-full flex items-center gap-3 p-3 text-left hover:bg-gray-50 transition-colors border-b border-gray-50",
                    selectedConvo === c.id && "bg-primary/5"
                  )}
                >
                  <div className="relative">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-sm font-medium text-primary">
                      {c.name[0]}
                    </div>
                    {c.online && <div className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-success border-2 border-white" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-heading truncate">{c.name}</p>
                      <span className="text-xs text-muted shrink-0">{c.time}</span>
                    </div>
                    <p className="text-xs text-muted truncate">{c.lastMessage}</p>
                  </div>
                  {c.unread > 0 && (
                    <span className="w-5 h-5 rounded-full bg-primary text-white text-xs flex items-center justify-center shrink-0">
                      {c.unread}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Chat Area */}
          {selectedConvo ? (
            <div className="flex-1 flex flex-col">
              {/* Header */}
              <div className="flex items-center gap-3 p-4 border-b border-gray-100">
                <button onClick={() => setSelectedConvo(null)} className="sm:hidden p-1">
                  <ArrowLeft className="w-5 h-5" />
                </button>
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-medium text-primary">
                  R
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-heading">Rwanda Car Rentals</p>
                  <p className="text-xs text-success">Online</p>
                </div>
                <button className="p-2 hover:bg-gray-100 rounded-lg">
                  <Phone className="w-4 h-4 text-muted" />
                </button>
                <button className="p-2 hover:bg-gray-100 rounded-lg">
                  <Video className="w-4 h-4 text-muted" />
                </button>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {messages.map((m) => (
                  <div key={m.id} className={cn("flex", m.sender === "me" ? "justify-end" : "justify-start")}>
                    <div className={cn(
                      "max-w-[75%] rounded-[16px] px-4 py-2",
                      m.sender === "me" ? "bg-primary text-white rounded-br-sm" : "bg-gray-100 text-heading rounded-bl-sm"
                    )}>
                      <p className="text-sm">{m.text}</p>
                      <p className={cn("text-[10px] mt-0.5", m.sender === "me" ? "text-white/60" : "text-muted")}>{m.time}</p>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <div className="p-4 border-t border-gray-100">
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                    placeholder="Type a message..."
                    className="flex-1 px-4 py-2.5 rounded-full border border-gray-200 text-sm focus:border-primary focus:outline-none"
                  />
                  <button
                    onClick={sendMessage}
                    disabled={!newMessage.trim()}
                    className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center hover:bg-primary-dark disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="hidden sm:flex flex-1 items-center justify-center text-center p-8">
              <div>
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                  <Send className="w-7 h-7 text-primary" />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-heading">Your Messages</h3>
                <p className="mt-1 text-sm text-muted">Select a conversation to start chatting</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
