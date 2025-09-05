import type {
  Post as ContentCollectionsPost,
  Project as ContentCollectionsProject,
  PostTag as ContentCollectionsPostTag,
  ProjectTag as ContentCollectionsProjectTag,
  PostCategory as ContentCollectionsPostCategory,
  ProjectCategory as ContentCollectionsProjectCategory,
  Resource as ContentCollectionsResource,
  ResourceTag as ContentCollectionsResourceTag,
} from "content-collections";

export type Post = Omit<ContentCollectionsPost, "_meta">;
export type Project = Omit<ContentCollectionsProject, "_meta">;
export type Resource = Omit<ContentCollectionsResource, "_meta">;

export type PostTag = Omit<ContentCollectionsPostTag, "_meta">;
export type ProjectTag = Omit<ContentCollectionsProjectTag, "_meta">;
export type ResourceTag = Omit<ContentCollectionsResourceTag, "_meta">;

export type PostCategory = Omit<ContentCollectionsPostCategory, "_meta">;
export type ProjectCategory = Omit<ContentCollectionsProjectCategory, "_meta">;



