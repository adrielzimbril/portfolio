import { useEffect, useState } from "react";

interface UseShareOptions {
  share: ShareData;
  onSuccess?: () => void;
  onError?: () => void;
}

/**
 * Open share in device navigator
 *
 * @param {UseShareOptions} options - The options for the hook
 * @returns {boolean} - If share is supported
 *
 * @example
 * const isShareSupported = useShare({
 *   share: {
 *     title: "Share",
 *     text: "Share",
 *     url: "https://shirofolio.com",
 *     files: [],
 *   },
 *   onSuccess: () => console.log("Share supported"),
 *   onError: () => console.log("Share not supported"),
 * });
 */
const useShare = ({ share, onSuccess, onError }: UseShareOptions): boolean => {
  // state for share supports
  const [isShareSupported, setIsShareSupported] = useState(false);

  // checking if that exist or not
  useEffect(() => {
    setIsShareSupported(() => ("share" in navigator ? true : false));
    if (isShareSupported) {
      navigator.share({
        title: share.title,
        text: share.text,
        url: share.url,
        files: share.files,
      });
    }

    if (isShareSupported) {
      onSuccess?.();
    } else {
      onError?.();
    }
  }, []);

  return isShareSupported;
};

export default useShare;
