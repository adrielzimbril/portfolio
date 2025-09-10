import { Link } from "@/components/ui/link";
import { LinkDiagonalOne } from "@aurthle/icons";
import { AvatarsStats } from "@/components/shared/pages/resources/avatar-stats";
import { Tags } from "@/components/shared/pages/resources/tags";
import { ResourceType } from "@/types";
import { getResourcesUrl } from "@/utils/base-url";

export function CardInfo({
  title,
  slug,
  resourceType,
  tags,
  description,
  features,
  avatars,
  userCount,
}: {
  title: string;
  slug: string;
  resourceType: ResourceType;
  tags: { name: string }[];
  description: string;
  features: string[];
  avatars: string[];
  userCount: number;
}) {
  return (
    <div className="flex flex-col items-start justify-between gap-4 w-full">
      <div className="flex flex-col items-start justify-center gap-4 w-full">
        <Header title={title} />

        <Tags
          primaryTag={
            resourceType === ResourceType.COURSE
              ? "Formation 🎥"
              : resourceType === ResourceType.EBOOK
                ? "E-book 📕"
                : "Masterclass 🎬"
          }
          tags={tags.map((tag) => tag.name)}
        />

        <Description description={description} features={features} />

        <AvatarsStats
          avatars={
            avatars || [
              "image1",
              "image2",
              "image3",
              "image4",
              "image5",
              "image6",
              "image7",
              "image8",
            ]
          }
          userCount={userCount}
          resourceType={resourceType}
        />
      </div>

      <Action slug={slug} resourceType={resourceType} />
    </div>
  );
}

function Header({ title }: { title: string }) {
  return (
    <h3 className="relative h4 capitalize leading-[120%] line-clamp-2">
      {title}
    </h3>
  );
}

function Description({
  description,
  features,
}: {
  description: string;
  features: string[];
}) {
  return (
    <>
      <p className="w-full relative text-xl line-clamp-3 leading-[120%] font-medium text-zinc-600">
        {description}
      </p>

      <p className="w-full relative text-base text-zinc-500 leading-6 whitespace-pre-line">
        {features.slice(0, 4).map((feature) => (
          <span key={feature} className="ml-2 md:ml-4 block">
            - {feature}
          </span>
        ))}
      </p>
    </>
  );
}

function Action({
  slug,
  resourceType,
}: {
  slug: string;
  resourceType: ResourceType;
}) {
  return (
    <Link
      href={getResourcesUrl("hub", slug)}
      likeButton
      whileTap
      size="xs"
      asIcon
    >
      <span className="flex items-center gap-1">
        {resourceType === ResourceType.COURSE
          ? "Enroll Now"
          : resourceType === ResourceType.EBOOK
          ? "Read Now"
          : "Watch Now"}
        <LinkDiagonalOne size={16} />
      </span>
    </Link>
  );
}
