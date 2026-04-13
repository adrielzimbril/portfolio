import type {
  Post as ContentCollectionsPost,
  Project as ContentCollectionsProject,
  Resource as ContentCollectionsResource,
  Talk as ContentCollectionsTalks,
  Quest as ContentCollectionsQuest,
  PostTag as ContentCollectionsPostTag,
  ProjectTag as ContentCollectionsProjectTag,
  ResourceTag as ContentCollectionsResourceTag,
  PostCategory as ContentCollectionsPostCategory,
  ProjectCategory as ContentCollectionsProjectCategory,
} from "content-collections";

/**
 * Types for posts, projects, and resources
 */
export type Post = Omit<ContentCollectionsPost, "_meta">;
export type Project = Omit<ContentCollectionsProject, "_meta">;
export type Resource = Omit<ContentCollectionsResource, "_meta">;
export type Talk = Omit<ContentCollectionsTalks, "_meta">;
export type Quest = Omit<ContentCollectionsQuest, "_meta">;

/**
 * Types for tags, categories, and types
 */
export type PostTag = Omit<ContentCollectionsPostTag, "_meta">;
export type ProjectTag = Omit<ContentCollectionsProjectTag, "_meta">;
export type ResourceTag = Omit<ContentCollectionsResourceTag, "_meta">;

/**
 * Types for categories
 */
export type PostCategory = Omit<ContentCollectionsPostCategory, "_meta">;
export type ProjectCategory = Omit<ContentCollectionsProjectCategory, "_meta">;

/**
 * Types for types
 */
// export type ProjectType = Omit<ContentCollectionsProjectType, "_meta">;



