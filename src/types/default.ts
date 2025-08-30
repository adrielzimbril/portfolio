enum DEFAULT_TAG_COLOR {
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

type DEFAULT_CATEGORY_COLOR_NAME = keyof typeof DEFAULT_TAG_COLOR;

export { DEFAULT_TAG_COLOR };

export { type DEFAULT_CATEGORY_COLOR_NAME };
