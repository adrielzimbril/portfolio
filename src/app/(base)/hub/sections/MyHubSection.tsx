import { ResourceCard } from "@/components/shared/pages/resources/card";
import { LoadMore } from "@/components/shared/pages/shared/load-more";
import { ResourcePreview } from "@/types";

export function ProjectSection() {
  return (
    <LoadMore
      dataPath="resources"
      subPath="personal"
      renderItem={(item) => (
        <ResourceCard key={item.id} details={item as ResourcePreview} />
      )}
    ></LoadMore>
  );
}
