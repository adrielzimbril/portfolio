"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { LoaderOne, SendOne } from "@aurthle/icons";
import { supabase } from "@/integrations/supabase/client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import logger from "@/utils/logger";

export function GuestbookForm({ user }: { user: any }) {
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    setIsSubmitting(true);
    try {
      const { error } = await supabase.from("community_wall").insert({
        user_id: user.id,
        creator_name: user.user_metadata.full_name || user.email,
        creator_avatar_url: user.user_metadata.avatar_url,
        message: message.trim(),
        patternindex: Math.floor(Math.random() * 10),
        rotation: Math.floor(Math.random() * 360),
      });

      if (error) throw error;

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
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex items-center gap-3 mb-4">
        <img
          src={user.user_metadata.avatar_url}
          alt={user.user_metadata.full_name}
          className="size-8 rounded-full border-2 border-border"
        />
        <span className="text-sm font-medium">
          {user.user_metadata.full_name}
        </span>
      </div>
      <Textarea
        placeholder="Write something nice..."
        className="min-h-[120px] bg-muted border-none focus-visible:ring-1 focus-visible:ring-ring"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        maxLength={500}
      />
      <div className="flex justify-between items-center">
        <p className="text-[10px] text-muted-foreground uppercase tracking-widest">
          {message.length} / 500
        </p>
        <Button type="submit" disabled={isSubmitting || !message.trim()}>
          {isSubmitting ? (
            <LoaderOne className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <SendOne className="mr-2 h-4 w-4" />
          )}
          Post
        </Button>
      </div>
    </form>
  );
}
