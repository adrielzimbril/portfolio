import { SectionBase } from "@/components/shared/pages/shared/section-base"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Link } from "@/components/ui/link"

type ChallengeClosedStateProps = {
  badge: string
  title: string
  description: string
  href: string
  actionLabel: string
}

export function ChallengeClosedState({ badge, title, description, href, actionLabel }: ChallengeClosedStateProps) {
  return (
    <SectionBase
      sectionClassName="w-full"
      sectionContentClassName="w-full"
      cardClassName="w-full"
      cardContentClassName="w-full px-4 py-6 md:p-8"
      className="bg-sh-white squircle-xl/100 md:squircle-3xl/100  border-0 overflow-hidden min-h-60 py-12"
    >
      <Card className="w-full bg-sh-white ">
        <CardContent className="flex flex-col items-center justify-center p-6 md:p-8 space-y-6 gap-2 md:gap-4">
          <div className="flex flex-col items-center text-center gap-2">
            <Badge size="lg">{badge}</Badge>
            <h2 className="h3">{title}</h2>
            <p className="text-b-white-invert-sec max-w-2xl">{description}</p>
          </div>
          <Link href={href} likeButton whileTap>
            {actionLabel}
          </Link>
        </CardContent>
      </Card>
    </SectionBase>
  )
}
