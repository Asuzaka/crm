import React, { useEffect } from "react";
import { useAuthStore } from "../store/authStore";
import { authenticated } from "../../../shared/api/endpoints/authenticated";

export function AutoAuth({ children }: { children: React.ReactNode }) {
  const { setUser, startLoading, finishLoading } = useAuthStore();

  useEffect(() => {
    startLoading();
    authenticated()
      .then((res) => setUser(res.data))
      .catch(() => {
        setUser(null);
        finishLoading();
      });
  }, [setUser, startLoading, finishLoading]);

  return children;
}
