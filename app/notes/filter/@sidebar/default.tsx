import css from "./SidebarNotes.module.css";
import Link from "next/link";
import type { NoteTag } from "@/types/note";

const ALL_NOTES = "All Notes" as const;
type MenuTag = NoteTag | typeof ALL_NOTES;

const TAGS: NoteTag[] = ["Todo", "Work", "Personal", "Meeting", "Shopping"];
const menuTags: MenuTag[] = [ALL_NOTES, ...TAGS];

const getLabel = (tag: MenuTag) => tag === ALL_NOTES ? "All Notes" : tag;

const normalizeActiveTag = (tag?: string): MenuTag => {
    if (!tag) return ALL_NOTES;
    return tag === "All" ? ALL_NOTES : (tag as NoteTag);
  };

  type Props = { params: { slug?: string[] } };

  export default function SidebarNotes({ params }: Props) {
    const activeTagRaw = params?.slug ? params.slug[0] : undefined;
    const normalizedActiveTag = normalizeActiveTag(activeTagRaw);

    return (
        <aside className={css.sidebar}>
            <ul className={css.menuList}>
                {menuTags.map((tag) => {
                    const isActive = normalizedActiveTag === tag;
                    const href = tag === ALL_NOTES ? "/notes/filter/All" : `/notes/filter/${tag}`;

                    return (
                        <li key={tag} className={css.menuItem}>
                            <Link
                                href={href}
                                className={`${css.menuLink} ${isActive ? css.active : ""}`}
                            >
                                 {getLabel(tag)}
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </aside>
    );
}