/**
 * Formats a date string to a relative time
 *
 * @param date - The date string to format
 * @returns A relative time string
 *
 * @example
 * const date = formatDate("2023-01-01");
 * logger.info(date); // Output: Today
 */
export function formatDate(date: string): string {
  const currentDate = new Date().getTime();
  if (!date.includes("T")) {
    date = `${date}T00:00:00`;
  }
  const targetDate = new Date(date).getTime();
  const timeDifference = Math.abs(currentDate - targetDate);
  const daysAgo = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

  const fullDate = new Date(date).toLocaleString("en-us", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  if (daysAgo < 1) {
    return "Today";
  } else if (daysAgo < 7) {
    return `${fullDate} (${daysAgo}d ago)`;
  } else if (daysAgo < 30) {
    const weeksAgo = Math.floor(daysAgo / 7);
    return `${fullDate} (${weeksAgo}w ago)`;
  } else if (daysAgo < 365) {
    const monthsAgo = Math.floor(daysAgo / 30);
    return `${fullDate} (${monthsAgo}mo ago)`;
  } else {
    const yearsAgo = Math.floor(daysAgo / 365);
    return `${fullDate} (${yearsAgo}y ago)`;
  }
}

/**
 * Returns the current date
 *
 * @param date - The date string or Date object to format (default: today)
 * @param lang - The language to use for formatting (default: "en-US")
 * @param iso - If true, returns the ISO date string (default: false)
 *
 * @returns The formatted date string
 *
 * @example
 * const date = getDate("2023-01-01", "en-US");
 * console.log(date); // Output: Jan 1, 2023
 * 
 * @example
 * const date = getDate("2023-01-01", "en-US", true);
 * console.log(date); // Output: 2023-01-01
 * 
 * @example
 * const date = getDate("2023-01-01", "en-US", false);
 * console.log(date); // Output: Jan 1, 2023
 */
export function getDate({
  date,
  lang = "en-US",
  dateStyle = "medium",
  iso = true,
}: {
  date: string | Date;
  lang?: Intl.LocalesArgument;
  dateStyle?: Intl.DateTimeFormatOptions["dateStyle"];
  iso?: boolean;
}): string {
  const d = new Date(date);
  return iso
    ? d.toISOString().split("T")[0]
    : Intl.DateTimeFormat(lang, { dateStyle }).format(d);
}
