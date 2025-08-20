"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import css from "./TagsMenu.module.css";
import type { NoteTag } from "@/types/note";

const TAGS: NoteTag[] = ["Todo", "Work", "Personal", "Meeting", "Shopping"];

export default function TagsMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const currentTag = pathname?.split("/").pop() || "All"

  return (
    <div className={css.menuContainer}>
      <button
        className={css.menuButton}
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        Notes ▾
      </button>
      {isOpen && (
        <ul className={css.menuList}>
          <li className={css.menuItem}>
            <Link
              href="/notes/filter/All"
              className={`${css.menuLink} ${currentTag === "All" ? css.active : ""}`}
              onClick={() => setIsOpen(false)}
            >
              All Notes
            </Link>
          </li>
          {TAGS.map((tag) => {
            const href = `/notes/filter/${tag}`;
            return (
              <li key={tag} className={css.menuItem}>
                <Link
                  href={href}  
                  className={`${css.menuLink} ${currentTag === tag ? css.active : ""}`}
                  onClick={() => setIsOpen(false)}
                >
                  {tag}
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
