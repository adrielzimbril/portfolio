import { useEffect } from "react";
import { useLocalStorage } from "@/hooks/useLocalStorage";

export const useFirstVisit = (): boolean => {
  const [firstVisit, setFirstVisit] = useLocalStorage<boolean>(
    "firstVisit",
    false
  );

  useEffect(() => {
    if (firstVisit === false) {
      setFirstVisit(true);
    }
  }, [firstVisit, setFirstVisit]);

  return firstVisit;
};
