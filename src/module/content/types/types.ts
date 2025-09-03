import type {
  Post as ContentCollectionsPost,
  Project as ContentCollectionsProject,
} from "content-collections";

export type Post = Omit<ContentCollectionsPost, "_meta">;
export type Project = Omit<ContentCollectionsProject, "_meta">;
