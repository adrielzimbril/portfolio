import {
  DEFAULT_TAG_COLOR,
  DEFAULT_SQUIRCLE_COLOR_NAME_TYPE,
  DEFAULT_COLOR_CODE,
  DEFAULT_COLOR_CODE_NAME_TYPE,
} from "@/types/default";

/**
 *  Returns a color from the enum DEFAULT_TAG_COLOR
 * @param id - Optional: valid color name or numeric index (0-${Object.values(DEFAULT_TAG_COLOR).length - 1})
 * @returns A color from the enum DEFAULT_TAG_COLOR
 *
 * @example
 * const color = pickRandomColor();
 * logger.info(color); // Output: random color
 *
 * @example
 * const color = pickRandomColor("BLUE");
 * logger.info(color); // Output: squircle-[#ade9ff]
 *
 * @example
 * const color = pickRandomColor(0);
 * logger.info(color); // Output: squircle-[#ade9ff]
 *
 * @example
 * const color = pickRandomColor("WHITE_GOLD");
 * logger.info(color); // Output: squircle-[#f9f9f9]
 */
function pickRandomColorCode(
  id?: DEFAULT_COLOR_CODE_NAME_TYPE | number,
): DEFAULT_COLOR_CODE | undefined {
  const colors = Object.values(DEFAULT_COLOR_CODE);

  if (id !== undefined) {
    // If it's a number
    if (typeof id === "number" && !isNaN(id)) {
      const num = Number(id);
      if (num >= 0 && num < colors.length) {
        return colors[num];
      }
    }

    // If it's a valid color name
    if (typeof id === "string" && id in DEFAULT_COLOR_CODE) {
      return DEFAULT_COLOR_CODE[id];
    }
  }

  // Completely random by default
  const randomIndex = Math.floor(Math.random() * colors.length);
  return colors[randomIndex];
}

/**
 *  Returns a color from the enum DEFAULT_TAG_COLOR
 * @param id - Optional: valid color name or numeric index (0-${Object.values(DEFAULT_TAG_COLOR).length - 1})
 * @returns A color from the enum DEFAULT_TAG_COLOR
 *
 * @example
 * const color = pickRandomColor();
 * logger.info(color); // Output: random color
 *
 * @example
 * const color = pickRandomColor("BLUE");
 * logger.info(color); // Output: squircle-[#ade9ff]
 *
 * @example
 * const color = pickRandomColor(0);
 * logger.info(color); // Output: squircle-[#ade9ff]
 *
 * @example
 * const color = pickRandomColor("WHITE_GOLD");
 * logger.info(color); // Output: squircle-[#f9f9f9]
 */
function pickRandomColor(
  id?: DEFAULT_SQUIRCLE_COLOR_NAME_TYPE | number,
): DEFAULT_TAG_COLOR | undefined {
  const colors = Object.values(DEFAULT_TAG_COLOR);

  if (id !== undefined) {
    // If it's a number
    if (typeof id === "number" && !isNaN(id)) {
      const num = Number(id);
      if (num >= 0 && num < colors.length) {
        return colors[num];
      }
    }

    // If it's a valid color name
    if (typeof id === "string" && id in DEFAULT_TAG_COLOR) {
      return DEFAULT_TAG_COLOR[id];
    }
  }

  // Completely random by default
  const randomIndex = Math.floor(Math.random() * colors.length);
  return colors[randomIndex];
}

/**
 * Returns a random color name
 *
 * @returns A random color name from the enum DEFAULT_TAG_COLOR
 *
 * @example
 * const colorName = pickRandomColorName();
 * logger.info(colorName); // Output: random color name (e.g. BLUE)
 */
function pickRandomColorName(): DEFAULT_SQUIRCLE_COLOR_NAME_TYPE {
  const colors = Object.keys(DEFAULT_TAG_COLOR);
  const randomIndex = Math.floor(Math.random() * colors.length);
  return colors[randomIndex] as DEFAULT_SQUIRCLE_COLOR_NAME_TYPE;
}

/**
 * Returns the index of a color name
 *
 * @param colorName - The color name to get the index of
 * @returns The index of the color name
 *
 * @example
 * const colorIndex = getColorIndex("BLUE");
 * logger.info(colorIndex); // Output: 0
 */
function getColorIndex(colorName: DEFAULT_SQUIRCLE_COLOR_NAME_TYPE): number {
  return Object.keys(DEFAULT_TAG_COLOR).indexOf(colorName);
}

/**
 * Checks if a color name or numeric index is valid
 *
 * @param id - The color name or numeric index to check
 * @returns Whether the color name or numeric index is valid
 *
 * @example
 * const isValid = isValidColorName("BLUE");
 * logger.info(isValid); // Output: true
 *
 * @example
 * const isValid = isValidColorName("INVALID");
 * logger.info(isValid); // Output: false
 *
 * @example
 * const isValid = isValidColorName(0);
 * logger.info(isValid); // Output: true
 *
 * @example
 * const isValid = isValidColorName(100);
 * logger.info(isValid); // Output: false
 */
function isValidColorName(
  id: DEFAULT_SQUIRCLE_COLOR_NAME_TYPE | number,
): boolean {
  return (
    Object.keys(DEFAULT_TAG_COLOR).includes(String(id)) ||
    (!isNaN(Number(id)) &&
      Number(id) >= 0 &&
      Number(id) < Object.values(DEFAULT_TAG_COLOR).length)
  );
}

/**
 * Returns the number of available colors
 *
 * @returns The number of available colors
 *
 * @example
 * const colorCount = getColorCount();
 * logger.info(colorCount); // Output: number of available colors
 */
function getColorCount(): number {
  return Object.values(DEFAULT_TAG_COLOR).length;
}

export {
  pickRandomColor,
  pickRandomColorName,
  pickRandomColorCode,
  getColorIndex,
  isValidColorName,
  getColorCount,
};
