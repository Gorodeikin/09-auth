"use client";

import { ReactNode, useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuthStore } from "@/lib/store/authStore";
import { getClientUser, checkSessionClient } from "@/lib/api/clientApi";

interface Props {
  children: ReactNode;
}

export const AuthProvider = ({ children }: Props) => {
  const { setUser, logout } = useAuthStore();
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    async function verifyAuth() {
      try {
        const sessionValid = await checkSessionClient();

        if (sessionValid) {
          const user = await getClientUser();
          if (user) {
            setUser(user);

            if (pathname.startsWith("/sign-in") || pathname.startsWith("/sign-up")) {
              router.replace("/profile");
            }
          } else {
            logout();
          }
        } else {
          logout();
          if (pathname.startsWith("/profile")) router.replace("/sign-in");
        }
      } catch {
        logout();
        if (pathname.startsWith("/profile")) router.replace("/sign-in");
      } finally {
        setLoading(false);
      }
    }

    verifyAuth();
  }, [pathname, router]);

  if (loading) return <p>Loading...</p>;

  return <>{children}</>;
};

