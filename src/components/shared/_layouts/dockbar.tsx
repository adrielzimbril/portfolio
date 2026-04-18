"use client";
import { Dock, DockIcon } from "@/components/aurthle/ui/dock";
import { ModeToggle } from "@/components/shared/_layouts/mode-toggle";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { siteConfig } from "@/data/config";
import { Link } from "@/components/ui/link";
import { cn } from "@/utils/utils";

export function Dockbar({ asFade }: { asFade?: boolean }) {
  return (
    <div
      className={cn(
        "pointer-events-none fixed inset-x-0 bottom-0 z-30 mx-auto mb-4 flex origin-bottom h-full max-h-14",
      )}
    >
      {asFade && (
        <div className="fixed bottom-0 inset-x-0 h-16 w-full bg-background to-transparent backdrop-blur-lg [-webkit-mask-image:linear-gradient(to_top,black,transparent)] dark:bg-background" />
      )}
      <Dock
        className={cn(
          "border-none z-50 pointer-events-auto relative mx-auto flex min-h-full h-full items-center px-2 bg-background [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)] transform-gpu dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset]",
        )}
      >
        {siteConfig.links.navbar.map((item) => (
          <DockIcon key={item.href}>
            <Tooltip>
              <TooltipTrigger>
                <Link
                  href={item.href}
                  likeButton
                  asIcon
                  variant="outline"
                  size="iconSmall"
                >
                  <item.icon variant="duotone" size="18" />
                </Link>
              </TooltipTrigger>
              <TooltipContent>
                <span className="capitalize">{item.label}</span>
              </TooltipContent>
            </Tooltip>
          </DockIcon>
        ))}
        <Separator orientation={"vertical"} className={cn("h-full")} />
        {Object.entries(siteConfig.links.contact.social)
          .filter(([_, social]) => social.navbar && social.available)
          .map(([name, social]) => (
            <DockIcon key={name}>
              <Tooltip>
                <TooltipTrigger>
                  <Link
                    href={social.url}
                    likeButton
                    asIcon
                    variant="outline"
                    size="iconSmall"
                  >
                    {social.icon && <social.icon size="18" />}
                  </Link>
                </TooltipTrigger>
                <TooltipContent>
                  <span className="capitalize">{name}</span>
                </TooltipContent>
              </Tooltip>
            </DockIcon>
          ))}
        <Separator orientation={"vertical"} className={cn("h-full py-2")} />
        <DockIcon>
          <Tooltip>
            <TooltipTrigger>
              <ModeToggle />
            </TooltipTrigger>
            <TooltipContent>
              <span className="capitalize">Theme</span>
            </TooltipContent>
          </Tooltip>
        </DockIcon>
      </Dock>
    </div>
  );
}
