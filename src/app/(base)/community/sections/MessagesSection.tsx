"use client";
import React, { useEffect, useState } from "react";
import { formatDateDiff } from "@/utils/format-date";
import logger from "@/utils/logger";
import { cn } from "@/utils/utils";
import { CommunityWallCard } from "@/components/shared/pages/community/CommunityWallCard";
import { InfiniteCanvas } from "@/components/shared/pages/community/InfiniteCanvas";

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
    creator_avatar_url: "",
    message:
      "Found this place through a friend and I'm so glad I did. Best community ever!",
    created_at: new Date(Date.now() - 72 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 5,
    creator_name: "David Chen Five",
    creator_avatar_url: "",
    message:
      "Found this place through a friend and I'm so glad I did. Best community ever!",
    created_at: new Date(Date.now() - 72 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 6,
    creator_name: "David Chen Six",
    creator_avatar_url: "",
    message:
      "Found this place through a friend and I'm so glad I did. Best community ever!",
    created_at: new Date(Date.now() - 72 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 7,
    creator_name: "David Chen Seven",
    creator_avatar_url: "",
    message:
      "Found this place through a friend and I'm so glad I did. Best community ever!",
    created_at: new Date(Date.now() - 72 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 8,
    creator_name: "David Chen Eight",
    creator_avatar_url: "",
    message:
      "Found this place through a friend and I'm so glad I did. Best community ever!",
    created_at: new Date(Date.now() - 72 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 9,
    creator_name: "David Chen Nine",
    creator_avatar_url: "",
    message:
      "Found this place through a friend and I'm so glad I did. Best community ever!",
    created_at: new Date(Date.now() - 72 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 10,
    creator_name: "David Chen Ten",
    creator_avatar_url: "",
    message:
      "Found this place through a friend and I'm so glad I did. Best community ever!",
    created_at: new Date(Date.now() - 72 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 11,
    creator_name: "David Chen Eleven",
    creator_avatar_url: "",
    message:
      "Found this place through a friend and I'm so glad I did. Best community ever!",
    created_at: new Date(Date.now() - 72 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 12,
    creator_name: "David Chen Twelve",
    creator_avatar_url: "",
    message:
      "Found this place through a friend and I'm so glad I did. Best community ever!",
    created_at: new Date(Date.now() - 72 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 13,
    creator_name: "David Chen Thirteen",
    creator_avatar_url: "",
    message:
      "Found this place through a friend and I'm so glad I did. Best community ever!",
    created_at: new Date(Date.now() - 72 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 14,
    creator_name: "David Chen Fourteen",
    creator_avatar_url: "",
    message:
      "Found this place through a friend and I'm so glad I did. Best community ever!",
    created_at: new Date(Date.now() - 72 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 15,
    creator_name: "David Chen Fifteen",
    creator_avatar_url: "",
    message:
      "Found this place through a friend and I'm so glad I did. Best community ever!",
    created_at: new Date(Date.now() - 72 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 16,
    creator_name: "David Chen Sixteen",
    creator_avatar_url: "",
    message:
      "Found this place through a friend and I'm so glad I did. Best community ever!",
    created_at: new Date(Date.now() - 72 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 17,
    creator_name: "David Chen Seventeen",
    creator_avatar_url: "",
    message:
      "Found this place through a friend and I'm so glad I did. Best community ever!",
    created_at: new Date(Date.now() - 72 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 18,
    creator_name: "David Chen Eighteen",
    creator_avatar_url: "",
    message:
      "Found this place through a friend and I'm so glad I did. Best community ever!",
    created_at: new Date(Date.now() - 72 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 19,
    creator_name: "David Chen Nineteen",
    creator_avatar_url: "",
    message:
      "Found this place through a friend and I'm so glad I did. Best community ever!",
    created_at: new Date(Date.now() - 72 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 20,
    creator_name: "David Chen Twenty",
    creator_avatar_url: "",
    message:
      "Found this place through a friend and I'm so glad I did. Best community ever!",
    created_at: new Date(Date.now() - 72 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 21,
    creator_name: "David Chen Twenty-One",
    creator_avatar_url: "",
    message:
      "Found this place through a friend and I'm so glad I did. Best community ever!",
    created_at: new Date(Date.now() - 72 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 22,
    creator_name: "David Chen Twenty-Two",
    creator_avatar_url: "",
    message:
      "Found this place through a friend and I'm so glad I did. Best community ever!",
    created_at: new Date(Date.now() - 72 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 23,
    creator_name: "David Chen Twenty-Three",
    creator_avatar_url: "",
    message:
      "Found this place through a friend and I'm so glad I did. Best community ever!",
    created_at: new Date(Date.now() - 72 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 24,
    creator_name: "David Chen Twenty-Four",
    creator_avatar_url: "",
    message:
      "Found this place through a friend and I'm so glad I did. Best community ever!",
    created_at: new Date(Date.now() - 72 * 60 * 60 * 1000).toISOString(),
  },
];

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
