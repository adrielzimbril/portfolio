import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/utils/utils";
import {
  InnerStatementCardSkeleton,
  ProjectCardSkeleton,
  QuestCardSkeleton,
  ResourceCardSkeleton,
  TalkCardSkeleton,
  ThoughtCardSkeleton,
} from "./card-skeletons";
import {
  SkeletonButton,
  SkeletonMetaCard,
  SkeletonPreview,
  SkeletonSectionHeader,
  SkeletonStats,
  SkeletonTagRow,
  SkeletonTextBlock,
} from "./shared";

export function HomePageSkeleton() {
  return (
    <>
      <PageHeroSkeleton />
      <HomeSectionSkeleton kind="talks" count={2} />
      <HomeSectionSkeleton kind="quests" count={2} />
      <HomeSectionSkeleton kind="resources" count={2} />
      <ProjectsSectionSkeleton />
      <HomeSectionSkeleton kind="thoughts" count={2} />
    </>
  );
}

export function ListingPageSkeleton({
  kind,
  count = 6,
}: {
  kind: "resources" | "projects" | "quests" | "talks" | "thoughts";
  count?: number;
}) {
  const CardComponent = getCardComponent(kind);

  return (
    <>
      <PageHeroSkeleton compact />
      <section className="relative w-full py-14 md:py-[104px]">
        <div className="flex flex-col items-center justify-center justify-items-center self-center w-full gap-6 md:grid grid-cols-1 md:grid-cols-2 md:max-w-[90%] place-items-center place-self-center">
          {Array.from({ length: count }).map((_, index) => (
            <CardComponent
              key={index}
              {...(kind === "projects" && index === 0 ? { isWide: true } : {})}
            />
          ))}
        </div>
      </section>
    </>
  );
}

export function ResourceDetailPageSkeleton() {
  return (
    <>
      <DetailHeaderSkeleton withStats />
      <ArticleBodySkeleton />
      <MoreCardsSkeleton kind="resources" count={2} />
    </>
  );
}

export function QuestDetailPageSkeleton() {
  return (
    <>
      <DetailHeaderSkeleton withStats />
      <QuestDetailsSkeleton />
      <MoreCardsSkeleton kind="quests" count={2} />
    </>
  );
}

export function ThoughtDetailPageSkeleton() {
  return (
    <>
      <ArticleHeaderSkeleton />
      <ArticleBodySkeleton />
      <MoreCardsSkeleton kind="thoughts" count={2} />
    </>
  );
}

export function ProjectDetailPageSkeleton() {
  return (
    <>
      <DetailHeaderSkeleton withStats />
      <ProjectDetailsSkeleton />
      <MoreCardsSkeleton kind="projects" count={2} />
    </>
  );
}

export function FormPageSkeleton({
  variant = "default",
}: {
  variant?: "default" | "newsletter" | "contact";
}) {
  return (
    <>
      {variant === "default" && <PageHeroSkeleton compact />}
      <section className="relative w-full py-14 md:py-[104px]">
        <div className="w-full max-w-5xl mx-auto px-4 md:px-8">
          <div className="squircle squircle-sh-white squircle-xl md:squircle-3xl squircle-smooth-xl border-0 overflow-hidden min-h-60 py-12">
            <div className="flex flex-col items-center justify-center p-6 md:p-8 space-y-6 gap-6 md:gap-8">
              <div className="flex flex-col items-center text-center gap-3 w-full">
                <Skeleton className="h-9 w-40 rounded-full" />
                <Skeleton className="h-12 w-[min(36rem,90vw)] rounded-2xl" />
                <Skeleton className="h-6 w-[min(30rem,85vw)] rounded-xl" />
                <Skeleton className="h-6 w-[min(20rem,70vw)] rounded-xl" />
                {variant === "newsletter" && (
                  <SkeletonTagRow
                    count={5}
                    centered
                    className="justify-center max-w-2xl"
                    widths={["w-28", "w-24", "w-20", "w-24", "w-16"]}
                  />
                )}
              </div>

              {variant === "contact" ? <CalendarSkeleton /> : <FormSkeleton />}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export function LoadMoreCardsSkeleton({
  kind,
  count = 2,
}: {
  kind: "resources" | "projects" | "quests" | "talks" | "thoughts";
  count?: number;
}) {
  const CardComponent = getCardComponent(kind);

  return (
    <div className="col-span-2 mt-6 space-y-6">
      <div className="flex flex-col items-center justify-center justify-items-center self-center w-full gap-6 md:grid grid-cols-1 md:grid-cols-2 place-items-center place-self-center">
        {Array.from({ length: count }).map((_, index) => (
          <CardComponent
            key={index}
            {...(kind === "projects" && index === 0 ? { isWide: true } : {})}
          />
        ))}
      </div>
      <div className="flex justify-center">
        <SkeletonButton className="w-36 h-11" />
      </div>
    </div>
  );
}

export function DefaultSectionSkeleton({
  count = 2,
}: {
  count?: number;
}) {
  return <HomeSectionSkeleton kind="resources" count={count} />;
}

export function ProjectsSectionSkeleton() {
  return <HomeSectionSkeleton kind="projects" count={3} />;
}

function HomeSectionSkeleton({
  kind,
  count,
}: {
  kind: "resources" | "projects" | "quests" | "talks" | "thoughts";
  count: number;
}) {
  const CardComponent = getCardComponent(kind);

  return (
    <section className="relative w-full py-14 md:py-[104px]">
      <SkeletonSectionHeader />
      <div className="flex flex-col items-center justify-center justify-items-center self-center w-full gap-6 md:grid grid-cols-1 md:grid-cols-2 md:max-w-[90%] place-items-center place-self-center">
        {Array.from({ length: count }).map((_, index) => (
          <CardComponent
            key={index}
            {...(kind === "projects" && index === 0 ? { isWide: true } : {})}
          />
        ))}
      </div>
    </section>
  );
}

function PageHeroSkeleton({ compact = false }: { compact?: boolean }) {
  return (
    <section className="relative w-full py-16 md:py-24">
      <div className="w-full max-w-6xl mx-auto px-4 md:px-8">
        <div className="flex flex-col gap-8 items-start justify-start relative">
          <Skeleton className="h-9 w-28 rounded-full" />
          <div className="w-full grid gap-8 lg:grid-cols-[1.2fr_0.8fr] items-center">
            <div className="flex flex-col gap-5 w-full">
              <Skeleton className="h-14 w-[92%] rounded-3xl" />
              <Skeleton className="h-14 w-[72%] rounded-3xl" />
              <SkeletonTextBlock
                lines={[
                  "w-[88%]",
                  compact ? "w-[70%]" : "w-[76%]",
                  compact ? "w-[54%]" : "w-[62%]",
                ]}
              />
              <SkeletonButton className="h-12 w-36 rounded-full" />
            </div>
            <SkeletonPreview
              className="w-full min-h-72 md:min-h-96"
              innerClassName="h-72 md:h-96"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function DetailHeaderSkeleton({ withStats = false }: { withStats?: boolean }) {
  return (
    <section className="relative w-full py-8 md:py-12">
      <div className="w-full max-w-6xl mx-auto px-4 md:px-8">
        <div className="flex flex-col gap-6 md:gap-8">
          <div className="w-full squircle squircle-sh-white squircle-smooth-xl squircle-4xl md:squircle-6xl overflow-hidden p-2 md:p-5">
            <div className="w-full squircle squircle-b-base squircle-smooth-xl squircle-3xl md:squircle-5xl overflow-hidden flex flex-col justify-center text-center md:px-12 py-16 md:py-20 min-h-[300px] gap-4">
              <Skeleton className="h-16 w-16 rounded-full mx-auto" />
              <Skeleton className="h-12 w-[min(30rem,90vw)] rounded-2xl mx-auto" />
              <Skeleton className="h-6 w-[min(20rem,70vw)] rounded-xl mx-auto" />
            </div>
          </div>

          <Skeleton className="h-14 w-[min(44rem,95vw)] rounded-3xl" />
          <SkeletonTextBlock lines={["w-[96%]", "w-[86%]"]} />
          <SkeletonTagRow count={withStats ? 5 : 4} widths={["w-28", "w-24", "w-20", "w-24", "w-32"]} />
          <SkeletonButton className="h-12 w-full rounded-2xl" />
        </div>
      </div>
    </section>
  );
}

function ArticleHeaderSkeleton() {
  return (
    <section className="relative w-full py-8 md:py-12">
      <div className="w-full max-w-6xl mx-auto px-4 md:px-8">
        <div className="flex flex-col gap-6 md:gap-8">
          <div className="w-full squircle squircle-sh-white squircle-smooth-xl squircle-xl md:squircle-4xl overflow-hidden p-3 md:p-5">
            <div className="w-full squircle squircle-b-base squircle-smooth-xl squircle-xl md:squircle-3xl overflow-hidden flex flex-col justify-center text-center md:px-12 py-16 md:py-20 min-h-[300px] gap-4">
              <Skeleton className="h-16 w-16 rounded-full mx-auto" />
              <Skeleton className="h-12 w-[min(30rem,90vw)] rounded-2xl mx-auto" />
              <Skeleton className="h-6 w-[min(20rem,70vw)] rounded-xl mx-auto" />
            </div>
          </div>

          <Skeleton className="h-12 w-[min(42rem,95vw)] rounded-3xl" />
          <div className="flex flex-wrap items-start gap-1.5 px-1 py-1 w-full overflow-hidden">
            <Skeleton className="h-10 w-40 rounded-full" />
            <Skeleton className="h-10 w-36 rounded-full" />
            <Skeleton className="h-10 w-32 rounded-full" />
          </div>
          <SkeletonTagRow count={4} />
        </div>
      </div>
    </section>
  );
}

function ArticleBodySkeleton() {
  return (
    <section className="relative w-full py-8 md:py-12">
      <div className="relative w-full max-w-3xl mx-auto px-4 md:px-0">
        <div className="flex flex-col w-full max-w-[90%] mx-auto items-start justify-center gap-4 md:gap-8 relative">
          <Skeleton className="h-10 w-48 rounded-2xl" />
          <div className="w-full space-y-4">
            {Array.from({ length: 12 }).map((_, index) => (
              <Skeleton
                key={index}
                className={cn(
                  "h-5 rounded-lg",
                  index % 5 === 0 && "w-[72%]",
                  index % 5 === 1 && "w-full",
                  index % 5 === 2 && "w-[94%]",
                  index % 5 === 3 && "w-[88%]",
                  index % 5 === 4 && "w-[76%]",
                )}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function QuestDetailsSkeleton() {
  return (
    <>
      <section className="relative w-full py-8 md:py-12">
        <div className="w-full max-w-6xl mx-auto px-4 md:px-8">
          <div className="grid gap-4 md:grid-cols-3">
            <SkeletonMetaCard />
            <SkeletonMetaCard />
            <SkeletonMetaCard />
          </div>
        </div>
      </section>
      <ArticleBodySkeleton />
      <section className="relative w-full py-8 md:py-12">
        <div className="w-full max-w-6xl mx-auto px-4 md:px-8">
          <div className="grid gap-4 md:grid-cols-2">
            <InnerStatementCardSkeleton />
            <InnerStatementCardSkeleton />
          </div>
        </div>
      </section>
    </>
  );
}

function ProjectDetailsSkeleton() {
  return (
    <>
      <section className="relative w-full py-8 md:py-12">
        <div className="w-full max-w-6xl mx-auto px-4 md:px-8">
          <div className="grid gap-4 md:grid-cols-3">
            <SkeletonMetaCard />
            <SkeletonMetaCard />
            <SkeletonMetaCard />
          </div>
        </div>
      </section>
      <ArticleBodySkeleton />

      {Array.from({ length: 4 }).map((_, index) => (
        <section key={index} className="relative w-full py-8 md:py-12">
          <div className="w-full max-w-6xl mx-auto px-4 md:px-8">
            <div className="flex flex-col gap-5">
              <Skeleton className="h-10 w-64 rounded-2xl" />
              <SkeletonTextBlock lines={["w-full", "w-[92%]", "w-[76%]"]} />
              <div className="grid gap-4 md:grid-cols-2">
                <InnerStatementCardSkeleton />
                <InnerStatementCardSkeleton />
              </div>
            </div>
          </div>
        </section>
      ))}

      <section className="relative w-full py-8 md:py-12">
        <div className="w-full max-w-6xl mx-auto px-4 md:px-8">
          <SkeletonPreview className="h-72 md:h-[32rem]" innerClassName="h-72 md:h-[32rem]" />
        </div>
      </section>
    </>
  );
}

function FormSkeleton() {
  return (
    <div className="space-y-6 w-full max-w-xl self-center place-self-center">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FieldSkeleton />
        <FieldSkeleton />
      </div>
      <FieldSkeleton />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FieldSkeleton />
        <FieldSkeleton />
      </div>
      <div className="space-y-2">
        <Skeleton className="h-5 w-44 rounded-lg" />
        <Skeleton className="h-32 w-full rounded-2xl" />
      </div>
      <SkeletonButton className="h-12 w-full rounded-2xl" />
    </div>
  );
}

function FieldSkeleton() {
  return (
    <div className="space-y-2">
      <Skeleton className="h-5 w-36 rounded-lg" />
      <Skeleton className="h-11 w-full rounded-xl" />
    </div>
  );
}

function CalendarSkeleton() {
  return (
    <div className="w-full max-w-5xl space-y-6">
      <div className="flex flex-col items-center gap-3">
        <Skeleton className="h-5 w-48 rounded-lg" />
        <Skeleton className="h-5 w-32 rounded-lg" />
      </div>
      <div className="w-full squircle squircle-sh-white squircle-xl md:squircle-3xl squircle-smooth-xl border-0 overflow-hidden p-4">
        <div className="grid grid-cols-7 gap-2 mb-4">
          {Array.from({ length: 7 }).map((_, index) => (
            <Skeleton key={index} className="h-8 rounded-lg" />
          ))}
        </div>
        <div className="grid grid-cols-7 gap-2">
          {Array.from({ length: 35 }).map((_, index) => (
            <Skeleton key={index} className="aspect-square rounded-xl min-h-14" />
          ))}
        </div>
      </div>
    </div>
  );
}

function MoreCardsSkeleton({
  kind,
  count,
}: {
  kind: "resources" | "projects" | "quests" | "talks" | "thoughts";
  count: number;
}) {
  return (
    <section className="relative w-full py-14 md:py-[104px]">
      <SkeletonSectionHeader />
      <div className="flex flex-col items-center justify-center justify-items-center self-center w-full gap-6 md:grid grid-cols-1 md:grid-cols-2 md:max-w-[90%] place-items-center place-self-center">
        {Array.from({ length: count }).map((_, index) => {
          const CardComponent = getCardComponent(kind);
          return (
            <CardComponent
              key={index}
              {...(kind === "projects" && index === 0 ? { isWide: true } : {})}
            />
          );
        })}
      </div>
    </section>
  );
}

function getCardComponent(kind: "resources" | "projects" | "quests" | "talks" | "thoughts") {
  switch (kind) {
    case "projects":
      return ProjectCardSkeleton;
    case "quests":
      return QuestCardSkeleton;
    case "talks":
      return TalkCardSkeleton;
    case "thoughts":
      return ThoughtCardSkeleton;
    case "resources":
    default:
      return ResourceCardSkeleton;
  }
}
