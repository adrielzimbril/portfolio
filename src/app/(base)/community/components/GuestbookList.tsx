import React from "react";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { Card, CardContent } from "@/components/ui/card";
import { formatDateDiff } from "@/utils/format-date";

export async function GuestbookList() {
  const cookieStore = await cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PRIVATE_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
      },
    }
  );

  const { data: messages, error } = await supabase
    .from("guestbook")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error(error);
    return <div className="text-muted-foreground italic p-8 text-center border border-dashed rounded-3xl">Failed to load messages.</div>;
  }

  if (!messages || messages.length === 0) {
    return (
      <div className="text-muted-foreground italic p-20 text-center border border-dashed rounded-3xl border-border/50">
        No messages yet. Be the first to leave a mark on the wall!
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {messages.map((msg: any) => (
        <Card key={msg.id} className="border-[#f0f0f0] dark:border-[#1a1a1a] bg-white/30 dark:bg-black/30 backdrop-blur-md hover:bg-white/50 dark:hover:bg-black/50 transition-all group overflow-hidden">
          <CardContent className="p-6">
            <div className="flex gap-4">
              <div className="shrink-0">
                <img 
                  src={msg.avatar_url || `https://ui-avatars.com/api/?name=${msg.name}`} 
                  alt={msg.name} 
                  className="size-10 rounded-full border-2 border-background shadow-sm"
                />
              </div>
              <div className="flex-1 space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-base">{msg.name}</h4>
                  <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                    {formatDateDiff(msg.created_at)}
                  </span>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  {msg.message}
                </p>
              </div>
            </div>
          </CardContent>
          <div className="h-1 w-full bg-gradient-to-r from-transparent via-purple-500/10 to-transparent group-hover:via-purple-500/30 transition-all" />
        </Card>
      ))}
    </div>
  );
}
