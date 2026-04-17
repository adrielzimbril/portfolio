"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Loader, Send } from "@aurthle/icons";
import { apiRoutes } from "@/data/api-routes";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import logger from "@/utils/logger";
import { cn } from "@/utils/utils";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export function GuestbookForm({ user }: { user: any }) {
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    setIsSubmitting(true);
    try {
      const res = await fetch(apiRoutes.community.guestbook.link, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: message.trim(),
          pattern_index: Math.floor(Math.random() * 10),
          rotation: Math.floor(Math.random() * 360),
        }),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || "Failed to post message");
      }

      setMessage("");
      toast.success("Message posted on the wall!");
      router.refresh();
    } catch (error) {
      logger.error(error);
      toast.error("Failed to post message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="flex items-center gap-3 mb-2">
        <div className="relative">
          <div className="relative flex bg-inherit squircle squircle-mask squircle-background squircle-7xl squircle-border-4 size-12 overflow-hidden transition-all duration-300">
            <div className="pointer-events-none flex h-full w-full items-center justify-center">
              <span className="text-lg font-bold text-[#ffd3ad]">
                {user.user_metadata.full_name?.charAt(0).toUpperCase()}
              </span>
            </div>
          </div>
          <div className="absolute -bottom-1 -right-1 h-4 w-4 rounded-full bg-green-500 border-2 border-b-base" />
        </div>
        <div>
          <span className="text-sm font-semibold text-foreground">
            {user.user_metadata.full_name}
          </span>
          <p className="text-xs text-muted-foreground">Leave a message</p>
        </div>
      </div>

      <div className="relative">
        <Textarea
          placeholder="Write something nice..."
          className={cn(
            "min-h-[140px] bg-b-base border-2 focus-visible:ring-0 focus-visible:ring-offset-0 rounded-2xl transition-all duration-300",
            isFocused && "shadow-lg shadow-primary/10",
          )}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          maxLength={500}
        />
      </div>

      <div className="flex justify-between items-center">
        <p
          className={cn(
            "text-[10px] font-semibold uppercase tracking-widest",
            message.length >= 450 && "text-destructive",
          )}
        >
          {message.length} / 500
        </p>
        <Button
          type="submit"
          disabled={isSubmitting || !message.trim()}
          className="rounded-2xl h-11 px-6 font-semibold"
        >
          {isSubmitting ? (
            <Loader size={16} className="mr-2" variant="bulk" />
          ) : (
            <Send size={16} className="mr-2" variant="bulk" />
          )}
          Post
        </Button>
      </div>
    </form>
  );
}
