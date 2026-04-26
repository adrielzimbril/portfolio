import { useCallback } from "react";

interface UseShareOptions {
  share: ShareData;
  onSuccess?: () => void;
  onError?: () => void;
}

/**
 * Hook to check if Web Share API is supported and trigger share
 *
 * @param {UseShareOptions} options - The options for the hook
 * @returns {object} - Object containing isSupported boolean and share function
 *
 * @example
 * const { isSupported, share } = useShare({
 *   share: {
 *     title: "Share",
 *     text: "Share",
 *     url: "https://domain.com",
 *     files: [],
 *   },
 *   onSuccess: () => console.log("Share supported"),
 *   onError: () => console.log("Share not supported"),
 * });
 *
 * // Then call share() when user clicks a button
 * <button onClick={share}>Share</button>
 */
const useShare = ({ share, onSuccess, onError }: UseShareOptions) => {
  const isSupported = "share" in navigator;

  const shareContent = useCallback(async () => {
    if (isSupported) {
      try {
        await navigator.share({
          title: share.title,
          text: share.text,
          url: share.url,
          files: share.files,
        });
        onSuccess?.();
      } catch (error) {
        onError?.();
      }
    } else {
      onError?.();
    }
  }, [isSupported, share, onSuccess, onError]);

  return { isSupported, share: shareContent };
};

export default useShare;
