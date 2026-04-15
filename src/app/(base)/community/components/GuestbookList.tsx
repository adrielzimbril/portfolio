"use client";

import React, { useEffect, useState } from "react";
import { formatDateDiff } from "@/utils/format-date";
import logger from "@/utils/logger";
import { cn } from "@/utils/utils";

// Demo data
const DEMO_MESSAGES = [
  {
    id: 1,
    creator_name: "Alice Johnson",
    creator_avatar_url: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alice",
    message: "This community is amazing! Love the design and the people here. ",
    created_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 2,
    creator_name: "Bob Smith",
    creator_avatar_url: "https://api.dicebear.com/7.x/avataaars/svg?seed=Bob",
    message:
      "Just joined and already feeling welcome. Great work on this platform!",
    created_at: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 3,
    creator_name: "Carol Williams",
    creator_avatar_url: "https://api.dicebear.com/7.x/avataaars/svg?seed=Carol",
    message:
      "The attention to detail here is incredible. Keep up the great work! ",
    created_at: new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 4,
    creator_name: "David Chen",
    creator_avatar_url: "https://api.dicebear.com/7.x/avataaars/svg?seed=David",
    message:
      "Found this place through a friend and I'm so glad I did. Best community ever!",
    created_at: new Date(Date.now() - 72 * 60 * 60 * 1000).toISOString(),
  },
];

export function GuestbookList() {
  const [messages, setMessages] = useState(DEMO_MESSAGES);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await fetch("/api/community/messages");
        if (response.ok) {
          const data = await response.json();
          if (data.messages && data.messages.length > 0) {
            setMessages(data.messages);
          }
        }
      } catch (error) {
        logger.error("Failed to fetch messages:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMessages();
  }, []);

  const displayMessages = messages;

  return (
    <div className="space-y-6">
      {displayMessages.map((msg: any) => (
        <div
          key={msg.id}
          className="relative bg-inherit squircle squircle-mask squircle-background squircle-7xl squircle-border-4 squircle-border-b-base-accent group-hover:squircle-border-[#ffd3ad] overflow-hidden transition-all duration-300 p-6"
        >
          <div className="flex gap-4">
            <div className="shrink-0">
              <div className="relative flex bg-inherit squircle squircle-mask squircle-background squircle-7xl squircle-border-4 size-12 overflow-hidden transition-all duration-300">
                <div className="pointer-events-none flex h-full w-full items-center justify-center">
                  <span className="text-lg font-bold text-[#ffd3ad]">
                    {msg.creator_name.charAt(0).toUpperCase()}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex-1 space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-base text-foreground">
                  {msg.creator_name}
                </h4>
                <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest px-2 py-1 rounded-full bg-muted/50">
                  {formatDateDiff(msg.created_at)}
                </span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {msg.message}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
