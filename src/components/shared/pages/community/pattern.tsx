import { type ReactElement } from "react";

export const pattern1: ReactElement = (
  <div className="absolute inset-0 w-full h-full">
    <div className="absolute top-2 right-2 text-2xl opacity-30">❤️</div>
    <div className="absolute top-8 left-4 text-xl opacity-25">💕</div>
    <div className="absolute bottom-4 right-8 text-3xl opacity-35">💖</div>
    <div className="absolute bottom-12 left-12 text-lg opacity-20">💗</div>
    <div className="absolute top-16 right-16 text-xl opacity-25">💝</div>
    <div className="absolute bottom-20 left-20 text-2xl opacity-30">💓</div>
  </div>
);

export const pattern2: ReactElement = (
  <div className="absolute inset-0 w-full h-full">
    <div className="absolute top-3 right-3 text-2xl opacity-30">⭐</div>
    <div className="absolute top-10 left-6 text-xl opacity-25">🌟</div>
    <div className="absolute bottom-6 right-10 text-3xl opacity-35">✨</div>
    <div className="absolute bottom-14 left-14 text-lg opacity-20">💫</div>
    <div className="absolute top-20 right-20 text-xl opacity-25">🌠</div>
    <div className="absolute bottom-24 left-24 text-2xl opacity-30">⭐</div>
    <div className="absolute top-28 right-28 text-lg opacity-20">✨</div>
  </div>
);

export const pattern3: ReactElement = (
  <div className="absolute inset-0 w-full h-full">
    <div className="absolute top-4 right-4 text-2xl opacity-30">🌸</div>
    <div className="absolute top-12 left-8 text-xl opacity-25">🌺</div>
    <div className="absolute bottom-8 right-12 text-3xl opacity-35">🌻</div>
    <div className="absolute bottom-16 left-16 text-lg opacity-20">🌷</div>
    <div className="absolute top-20 right-20 text-xl opacity-25">🌼</div>
    <div className="absolute bottom-24 left-24 text-2xl opacity-30">🌹</div>
    <div className="absolute top-28 right-28 text-lg opacity-20">🌸</div>
  </div>
);

export const pattern4: ReactElement = (
  <div className="absolute inset-0 w-full h-full">
    <div className="absolute top-2 right-2 text-2xl opacity-30">🎉</div>
    <div className="absolute top-8 left-4 text-xl opacity-25">🎊</div>
    <div className="absolute bottom-4 right-8 text-3xl opacity-35">🎈</div>
    <div className="absolute bottom-12 left-12 text-lg opacity-20">🎁</div>
    <div className="absolute top-16 right-16 text-xl opacity-25">🎀</div>
    <div className="absolute bottom-20 left-20 text-2xl opacity-30">🎇</div>
    <div className="absolute top-24 right-24 text-lg opacity-20">🎆</div>
  </div>
);

export const pattern5: ReactElement = (
  <div className="absolute inset-0 w-full h-full">
    <div className="absolute top-3 right-3 text-2xl opacity-30">🦊</div>
    <div className="absolute top-10 left-6 text-xl opacity-25">🐱</div>
    <div className="absolute bottom-6 right-10 text-3xl opacity-35">🐶</div>
    <div className="absolute bottom-14 left-14 text-lg opacity-20">🐰</div>
    <div className="absolute top-20 right-20 text-xl opacity-25">🐻</div>
    <div className="absolute bottom-24 left-24 text-2xl opacity-30">🐼</div>
    <div className="absolute top-28 right-28 text-lg opacity-20">🦁</div>
  </div>
);

export type Pattern = {
  content: ReactElement;
};

export const patterns: Pattern[] = [
  {
    content: pattern1,
  },
  {
    content: pattern2,
  },
  {
    content: pattern3,
  },
  {
    content: pattern4,
  },
  {
    content: pattern5,
  },
];
