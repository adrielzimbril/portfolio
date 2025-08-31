import { ThoughtCard } from "@/components/shared/pages/thoughts/card";
import { LoadMore } from "@/components/shared/pages/shared/load-more";
import { ThoughtPreview } from "@/types";

export function MyThoughtsSection() {
  return (
    <LoadMore
      dataPath="thoughts"
      subPath="personal"
      renderItem={(item) => (
        <ThoughtCard key={item.id} details={item as ThoughtPreview} />
      )}
    ></LoadMore>
  );
}
