import css from "./Home.module.css"
import type { Metadata } from 'next';

export const metadata: Metadata ={
  title: 'Page Not Found | NoteHub',
  description: 'The page you are looking for does not exist.',
  openGraph: {
    title: 'Page Not Found | NoteHub',
    description: 'The page you are looking for does not exist.',
    url: `${process.env.NEXT_PUBLIC_SITE_URL}/404`,
    images: [
      {
        url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
      },
    ],
  },
};

export default function NotFound() {
  return (
    <>
      <h1 className={css.title}>404 - Page not found</h1>
      <p className={css.discription}>
        Sorry, the page you are looking for does not exist.
      </p>
    </>
  );
}