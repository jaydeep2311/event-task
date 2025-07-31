"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { latestCurrentSessionSession } from "@/utils/auth";

export const useAuthenticationHook = (redirectIfUnauthenticated: boolean = true) => {
  const [loading, setLoading] = useState(true);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [session, setSession] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const current = latestCurrentSessionSession();
    if (!current && redirectIfUnauthenticated) {
      router.push("/login");
    }
    setSession(current);
    setLoading(false);
  }, [redirectIfUnauthenticated, router]);

  return { loading, session };
};
