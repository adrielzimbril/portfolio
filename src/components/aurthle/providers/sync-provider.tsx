"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useUser } from "@/integrations/auth/provider/supabase";
import {
  getAnonymousUserId,
  syncAnonymousReactionsOnLogin,
} from "@/lib/reactions/anonymous-user";

const SyncContext = createContext<{ hasSynced: boolean }>({ hasSynced: false });

export function SyncProvider({ children }: { children: React.ReactNode }) {
  const { user } = useUser();
  const [hasSynced, setHasSynced] = useState(false);

  useEffect(() => {
    const syncAnonymous = async () => {
      const anonymousId = getAnonymousUserId();
      if (user?.id && anonymousId && !hasSynced) {
        setHasSynced(true);
        await syncAnonymousReactionsOnLogin(anonymousId);
      }
    };
    syncAnonymous();
  }, [user, hasSynced]);

  return (
    <SyncContext.Provider value={{ hasSynced }}>
      {children}
    </SyncContext.Provider>
  );
}

export function useSync() {
  return useContext(SyncContext);
}
