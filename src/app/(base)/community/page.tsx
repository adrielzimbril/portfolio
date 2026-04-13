import React from "react";
import { getTranslations } from "next-intl/server";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Github, Send, LogOut } from "lucide-react";
import { GuestbookForm } from "./components/GuestbookForm";
import { GuestbookList } from "./components/GuestbookList";

export async function generateMetadata() {
  const t = await getTranslations();
  return {
    title: `Community Wall | ${t("home.title")}`,
    description: "Leave a message on the wall and join the community.",
  };
}

export default async function CommunityPage() {
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

  const { data: { user } } = await supabase.auth.getUser();

  return (
    <div className="py-20 lg:py-32">
      <div className="max-w-2xl mb-12 lg:mb-20">
        <h1 className="text-4xl lg:text-6xl font-bold tracking-tight text-foreground mb-6">
          Community Wall
        </h1>
        <p className="text-xl text-muted-foreground leading-relaxed">
          Leave a message, share a thought, or just say hi. Connect with GitHub to join the wall.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Form Section */}
        <div className="lg:col-span-1">
          <Card className="border-[#f0f0f0] dark:border-[#1a1a1a] bg-white/50 dark:bg-black/50 backdrop-blur-xl sticky top-32">
            <CardHeader>
              <CardTitle className="text-lg">Share your message</CardTitle>
            </CardHeader>
            <CardContent>
              {user ? (
                <GuestbookForm user={user} />
              ) : (
                <div className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    You need to be signed in with GitHub to post a message.
                  </p>
                  <Button asChild className="w-full bg-[#24292F] hover:bg-[#24292F]/90 text-white border-none">
                    {/* We'll implement the login action in a client component or use a direct link */}
                    <a href={`/api/auth/login?provider=github`}>
                      <Github className="mr-2 h-4 w-4" />
                      Sign in with GitHub
                    </a>
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* List Section */}
        <div className="lg:col-span-2">
          <GuestbookList />
        </div>
      </div>
    </div>
  );
}
