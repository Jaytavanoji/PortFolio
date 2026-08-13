"use client";

import React, { useState, useRef, useEffect } from "react";
import MIcon from "@/components/ui/MIcon";
import FadeUp from "@/components/ui/FadeUp";

interface Message {
  id: string;
  sender: "user" | "assistant";
  text: string;
}

interface ChatPanelProps {
  initialScroll?: "top" | "bottom";
  animateMessagesIn?: boolean;
  className?: string;
}

const seedMessages: Message[] = [
  {
    id: "m1",
    sender: "assistant",
    text: "Welcome to RegiNova AI! I'm Jay Tavanoji's document intelligence assistant powered by FAISS vector search and LLaMA 3.3. What government document or query would you like to analyze?",
  },
  {
    id: "m2",
    sender: "user",
    text: "How does Jay Tavanoji's FAISS vector RAG pipeline perform sub-20ms document searches?",
  },
  {
    id: "m3",
    sender: "assistant",
    text: "RegiNova generates 384-dimensional dense vector embeddings with sentence-transformers, indexes them in FAISS vector clusters, and executes cosine similarity searches in sub-20ms before passing context to Groq LLaMA 3.3!",
  },
];

export default function ChatPanel({
  initialScroll = "top",
  animateMessagesIn = true,
  className = "",
}: ChatPanelProps) {
  const [messages, setMessages] = useState<Message[]>(seedMessages);
  const [inputValue, setInputValue] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      if (initialScroll === "bottom") {
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
      } else {
        scrollRef.current.scrollTop = 0;
      }
    }
  }, [initialScroll]);

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const userMsg: Message = {
      id: `u-${Date.now()}`,
      sender: "user",
      text: inputValue.trim(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputValue("");

    setTimeout(() => {
      const replyMsg: Message = {
        id: `a-${Date.now()}`,
        sender: "assistant",
        text: "RegiNova AI processed your query through Jay Tavanoji's vector pipeline with 1,420 QPS throughput and 99.4% context recall!",
      };
      setMessages((prev) => [...prev, replyMsg]);
    }, 600);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div
      className={`flex flex-col justify-between h-full rounded-2xl border border-white/10 overflow-hidden bg-[#08080a]/60 backdrop-blur-2xl ${className}`}
    >
      {/* Header Row */}
      <div className="flex items-center gap-3 px-4 py-3.5 border-b border-white/10 bg-white/5">
        <div className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center text-white shrink-0">
          <MIcon name="auto_awesome" size={14} />
        </div>
        <div className="flex flex-col min-w-0">
          <span className="text-sm font-medium text-white tracking-tight truncate">
            RegiNova AI Course
          </span>
          <span className="text-[11px] text-white/40 font-runtime truncate">
            Learn AI RAG & Vector Search with Jay Tavanoji
          </span>
        </div>
      </div>

      {/* Messages Scroll Area */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto scrollbar-hide p-4 space-y-4 text-xs font-runtime select-text"
      >
        {messages.map((msg, i) => {
          const isUser = msg.sender === "user";
          const bubbleClass = isUser
            ? "ml-auto bg-white/15 text-white/90 rounded-2xl rounded-tr-sm px-4 py-2.5 max-w-[85%]"
            : "mr-auto bg-white/5 text-white/70 border border-white/5 rounded-2xl rounded-tl-sm px-4 py-2.5 max-w-[85%]";

          if (animateMessagesIn) {
            return (
              <FadeUp key={msg.id} delay={i * 0.12} y={16}>
                <div className={bubbleClass}>{msg.text}</div>
              </FadeUp>
            );
          }

          return (
            <div key={msg.id} className={bubbleClass}>
              {msg.text}
            </div>
          );
        })}
      </div>

      {/* Input Row */}
      <div className="p-3">
        <div className="liquid-glass rounded-2xl p-1.5 flex items-center gap-2">
          <textarea
            rows={1}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask about Jay's RAG pipeline..."
            className="flex-1 bg-transparent text-xs text-white placeholder:text-white/40 focus:outline-none px-3 py-1.5 resize-none scrollbar-hide"
          />
          <button
            type="button"
            onClick={handleSend}
            className="bg-white text-black rounded-xl p-2 hover:bg-white/90 transition-all shrink-0"
            aria-label="Send message"
          >
            <MIcon name="arrow_upward" size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
