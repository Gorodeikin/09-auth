import Link from 'next/link';
import css from './Header.module.css';
import TagsMenu from '../TagsMenu/TagsMenu';
import AuthNavigation from "@/components/AuthNavigation/AuthNavigation";


export const Header = () => (
    <header className={css.header}>
    <Link href="/" aria-label="Home">
      NoteHub
    </Link>
    <nav aria-label="Main Navigation">
      <ul className={css.navigation}>
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <TagsMenu />
        </li>
      </ul>
      <AuthNavigation />
    </nav>
  </header>
);