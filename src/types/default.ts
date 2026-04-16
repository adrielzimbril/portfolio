export enum DEFAULT_COLOR_CODE {
  BLUE = "#ade9ff",
  GREEN = "#adffad",
  WHITE_GOLD = "#f9f9f9",
  PURPLE = "#e2e4ff",
  INDIGO = "#b3baf5",
  YELLOW = "#ffe9ad",
  RED = "#ffadad",
  SKY = "#adffff",
  PINK = "#ffadff",
  ORANGE = "#ffd3ad",
  VIOLET = "#8e8eff",
  GREENISH_YELLOW = "#ffeccc",
  TURQUOISE = "#adfbff",
  GOLD = "#ffd700",
  AMBER = "#ffc107",
  TEAL = "#00bfa5",
  CYAN = "#00e5ff",
  LIME = "#c8e6c9",
  PINKISH_PURPLE = "#d8b6ff",
  PINKISH_ORANGE = "#ffab91",
  PINKISH_PINK = "#ff83b0",
  PINKISH_GREEN = "#c5e1a5",
  PINKISH_BLUE = "#b3cde0",
}

export enum DEFAULT_SQUIRCLE_COLOR {
  BLUE = "squircle-[#ade9ff]",
  GREEN = "squircle-[#adffad]",
  WHITE_GOLD = "squircle-[#f9f9f9]",
  PURPLE = "squircle-[#e2e4ff]",
  INDIGO = "squircle-[#b3baf5]",
  YELLOW = "squircle-[#ffe9ad]",
  RED = "squircle-[#ffadad]",
  SKY = "squircle-[#adffff]",
  PINK = "squircle-[#ffadff]",
  ORANGE = "squircle-[#ffd3ad]",
  VIOLET = "squircle-[#8e8eff]",
  GREENISH_YELLOW = "squircle-[#ffeccc]",
  TURQUOISE = "squircle-[#adfbff]",
  GOLD = "squircle-[#ffd700]",
  AMBER = "squircle-[#ffc107]",
  TEAL = "squircle-[#00bfa5]",
  CYAN = "squircle-[#00e5ff]",
  LIME = "squircle-[#c8e6c9]",
  PINKISH_PURPLE = "squircle-[#d8b6ff]",
  PINKISH_ORANGE = "squircle-[#ffab91]",
  PINKISH_PINK = "squircle-[#ff83b0]",
  PINKISH_GREEN = "squircle-[#c5e1a5]",
  PINKISH_BLUE = "squircle-[#b3cde0]",
}

export enum DEFAULT_COLOR_CODE_NAME_TYPE {
  BLUE,
  GREEN,
  WHITE_GOLD,
  PURPLE,
  INDIGO,
  YELLOW,
  RED,
  SKY,
  PINK,
  ORANGE,
  VIOLET,
  GREENISH_YELLOW,
  TURQUOISE,
  GOLD,
  AMBER,
  TEAL,
  CYAN,
  LIME,
  PINKISH_PURPLE,
  PINKISH_ORANGE,
  PINKISH_PINK,
  PINKISH_GREEN,
  PINKISH_BLUE,
}

export type DEFAULT_SQUIRCLE_COLOR_NAME_TYPE =
  keyof typeof DEFAULT_SQUIRCLE_COLOR;
export type DEFAULT_COLOR_CODE_NAME_TYPE = keyof typeof DEFAULT_COLOR_CODE;

export { DEFAULT_SQUIRCLE_COLOR as DEFAULT_TAG_COLOR };

export {
  type DEFAULT_SQUIRCLE_COLOR_NAME_TYPE as DEFAULT_CATEGORY_COLOR_NAME,
  type DEFAULT_COLOR_CODE_NAME_TYPE as DEFAULT_COLOR_CODE_NAME,
};
