"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { updateClientProfile } from "@/lib/api/clientApi";
import css from "./EditProfilePage.module.css";
import { useAuthStore } from "@/lib/store/authStore";

export default function EditProfilePage() {
  const router = useRouter();
  const {user, setUser} = useAuthStore();
  const [username, setUsernameInput] = useState(user?.username || "");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    try {
      setLoading(true);
      const updatedUser = await updateClientProfile({username});
      setUser(updatedUser);
      router.push("/profile");
    } catch (err) {
      console.error("Failed to update profile:", err);
      alert("Error updating profile");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    router.push("/profile");
  };
  if (!user) return <p>User not found</p>;

  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <h1 className={css.formTitle}>Edit Profile</h1>

        <Image
           src={user?.avatar || "/default-avatar.png"}
           alt="User Avatar"
           width={120}
           height={120}
           className={css.avatar}
        />

        <form onSubmit={handleSubmit} className={css.profileInfo}>
          <div className={css.usernameWrapper}>
            <label htmlFor="username">Username:</label>
            <input
              id="username"
              type="text"
              className={css.input}
              value={username}
              onChange={(e) => setUsernameInput(e.target.value)}
              required
            />
          </div>

          <p>Email: {user.email}</p>

          <div className={css.actions}>
            <button type="submit" className={css.saveButton}>
            {loading ? "Saving..." : "Save"}
            </button>
            <button
              type="button"
              className={css.cancelButton}
              onClick={handleCancel}
              disabled={loading}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}