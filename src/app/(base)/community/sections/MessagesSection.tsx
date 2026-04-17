"use client";
import React, { useEffect, useState } from "react";
import { formatDateDiff } from "@/utils/format-date";
import logger from "@/utils/logger";
import { cn } from "@/utils/utils";
import { CommunityWallCard } from "@/components/shared/pages/community/CommunityWallCard";
import { InfiniteCanvas } from "@/components/shared/pages/community/InfiniteCanvas";
import { DEMO_MESSAGES } from "./demo-message";

export function MessagesSection() {
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

  // Transform messages to include patternindex and rotation
  const displayMessages = messages.map((msg: any) => ({
    ...msg,
    patternindex: Math.floor(Math.random() * 5), // Random pattern index 0-4
    rotation: Math.floor(Math.random() * 20) - 10, // Random rotation -10 to 10 degrees
  }));

  if (isLoading) {
    return (
      <div className="text-center text-muted-foreground">
        Loading messages...
      </div>
    );
  }

  return (
    <>
      {/* Mobile: Grid layout */}
      <div className="size-full block md:hidden">
        <div className="flex flex-wrap justify-center gap-12 p-6 pb-40">
          {displayMessages.map((msg: any) => (
            <CommunityWallCard
              key={msg.id}
              message={msg.message}
              patternIndex={msg.patternindex}
              author={msg.creator_name}
              profilePicture={msg.creator_avatar_url}
              rotation={msg.rotation}
              className="h-[300px] w-[250px] shadow-[12px_12px_0px_0px_rgba(214,218,222,0.3)]"
            />
          ))}
        </div>
      </div>

      {/* Desktop: Infinite canvas */}
      <div className="size-full hidden md:block">
        <InfiniteCanvas messages={displayMessages} />
      </div>
    </>
  );
}
