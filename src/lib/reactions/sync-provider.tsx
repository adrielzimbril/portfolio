"use client";

import { createContext, useContext, useEffect, useRef } from "react";
import { useUser } from "@/integrations/auth/provider/supabase";
import {
  getAnonymousUserId,
  syncAnonymousReactionsOnLogin,
} from "@/lib/reactions/anonymous-user";

const SyncContext = createContext<{ hasSynced: boolean }>({ hasSynced: false });

export function SyncProvider({ children }: { children: React.ReactNode }) {
  const { user } = useUser();
  const hasSyncedRef = useRef(false);

  useEffect(() => {
    const syncAnonymous = async () => {
      const anonymousId = getAnonymousUserId();
      if (user?.id && anonymousId && !hasSyncedRef.current) {
        hasSyncedRef.current = true;
        await syncAnonymousReactionsOnLogin(anonymousId);
      }
    };
    syncAnonymous();
  }, [user]);

  return (
    <SyncContext.Provider value={{ hasSynced: hasSyncedRef.current }}>
      {children}
    </SyncContext.Provider>
  );
}

export function useSync() {
  return useContext(SyncContext);
}
