"use client";
import React, { useCallback, useState, useEffect } from "react";
import { CommunityWallCard } from "@/components/shared/pages/community/CommunityWallCard";
import { InfiniteCanvas } from "@/components/shared/pages/community/InfiniteCanvas";
import { DEMO_MESSAGES } from "@/app/(base)/community/sections/demo-message";
import { apiRoutes } from "@/data/api-routes";
import { useWindowEvent } from "@/hooks/useWindowEvent";

// Helper function to add random pattern and rotation to messages
const transformMessages = (msgs: any[]) =>
  msgs.map((msg: any) => ({
    ...msg,
    patternIndex: msg.pattern_index ?? Math.floor(Math.random() * 5), // Random pattern index 0-4
    rotation: msg.rotation ?? Math.floor(Math.random() * 20) - 10, // Random rotation -10 to 10 degrees
  }));

export function MessagesSection() {
  const [messages, setMessages] = useState(() =>
    transformMessages(DEMO_MESSAGES),
  );
  const [isLoading, setIsLoading] = useState(true);

  const fetchMessages = useCallback(async () => {
    try {
      const response = await fetch(apiRoutes.community.messages.link);
      if (response.ok) {
        const data = await response.json();
        if (data.messages && data.messages.length > 0) {
          setMessages(transformMessages(data.messages));
        }
      }
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    (async () => {
      await fetchMessages();
    })();
  }, []);

  useWindowEvent("community-message-added", () => {
    fetchMessages();
  });

  const displayMessages = messages;

  return (
    <>
      {/* Mobile: Grid layout */}
      <div className="size-full block md:hidden">
        <div className="flex flex-wrap justify-center gap-12 p-6 pb-40">
          {displayMessages.map((msg: any) => (
            <CommunityWallCard
              key={msg.id}
              message={msg.message}
              patternIndex={msg.patternIndex}
              author={msg.creator_name}
              profilePicture={msg.creator_avatar_url}
              rotation={msg.rotation}
              className="h-75 w-63"
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
