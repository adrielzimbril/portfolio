import { type ReactElement } from "react";
import { pattern1, gradient1 } from "@/lib/communityWall/pattern-1";
import { pattern2, gradient2 } from "@/lib/communityWall/pattern-2";
import { pattern3, gradient3 } from "@/lib/communityWall/pattern-3";
import { pattern4, gradient4 } from "@/lib/communityWall/pattern-4";
import { pattern5, gradient5 } from "@/lib/communityWall/pattern-5";

export type Pattern = {
  gradient: string;
  svg: ReactElement;
};

export const patterns: Pattern[] = [
  {
    gradient: gradient1,
    svg: pattern1,
  },
  {
    gradient: gradient2,
    svg: pattern2,
  },
  {
    gradient: gradient3,
    svg: pattern3,
  },
  {
    gradient: gradient4,
    svg: pattern4,
  },
  {
    gradient: gradient5,
    svg: pattern5,
  },
];
