import { Metadata } from 'next';
import css from './GreateNote.module.css';
import NoteForm from '@/components/NoteForm/NoteForm';

export const metadata: Metadata = {
  title: 'Create note | NoteHub',
  description: 'Create a new note in NoteHub',
  openGraph: {
    title: 'Create note | NoteHub',
    description: 'Create a new note in NoteHub',
    url: `${process.env.NEXT_PUBLIC_SITE_URL}/notes/action/create`,
    images: [
      {
        url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
      },
    ],
  },
};

export default function CreateNotePage() {
  return (
    <main className={css.main}>
      <div className={css.container}>
        <h1 className={css.title}>Create note</h1>
        <NoteForm />
      </div>
    </main>
  );
}
