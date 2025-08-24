"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/store/authStore";
import css from "./AuthNavigation.module.css";
import { logoutClientUser } from "@/lib/api/clientApi";
import { useEffect, useState } from "react";

export default function AuthNavigation() {
  const router = useRouter();
  const { user, isAuthenticated, logout } = useAuthStore(); 
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  
  const handleLogout = async () => {
    try {
      await logoutClientUser();
    } catch (err) {
      console.error("Ошибка при выходе:", err);
    } finally {
      logout();
      router.push("/sign-in");
    }
  };

  if (!mounted) return null; 

  return (
    <ul className={css.authContainer}>
      {isAuthenticated ? (
        <>
          <li className={css.navigationItem}>
            <Link href="/profile" prefetch={false} className={css.navigationLink}>
              Profile
            </Link>
          </li>
          <li className={css.navigationItem}>
            <p className={css.userEmail}>{user?.email}</p>
            <button className={css.logoutButton} onClick={handleLogout}>
              Logout
            </button>
          </li>
        </>
      ) : (
        <>
          <li className={css.navigationItem}>
            <Link href="/sign-in" prefetch={false} className={css.navigationLink}>
              Login
            </Link>
          </li>
          <li className={css.navigationItem}>
            <Link href="/sign-up" prefetch={false} className={css.navigationLink}>
              Sign up
            </Link>
          </li>
        </>
      )}
    </ul>
  );
}
