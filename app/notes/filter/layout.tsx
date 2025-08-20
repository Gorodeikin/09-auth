import styles from "./LayoutNotes.module.css";

type Props = {
  children: React.ReactNode;
  sidebar: React.ReactNode; 
  params: Promise<{ slug?: string[] }>;
};

export default async function NotesLayout({ children, sidebar }: Props) {
  return (
    <section className={styles.container}>
      <aside className={styles.aside}>
        {sidebar}
      </aside>
      <div className={styles.notesWrapper}>{children}</div>
    </section>
  );
}