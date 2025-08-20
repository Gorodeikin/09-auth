"use client";

import { useState, useEffect } from "react";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api";
import type { Note } from "@/types/note";
import SearchBox from "@/components/SearchBox/SearchBox";
import NoteList from "@/components/NoteList/NoteList";
import Pagination from "@/components/Pagination/Pagination";
import styles from "./NotesPage.module.css";
import { useRouter } from "next/navigation";

type NotesData = {
  notes: Note[];
  totalPages: number;
  page: number;
  perPage: number;
};

type Props = {
  initialData: NotesData;
  tag?: string;
};

function useDebounce<T>(value: T, delay: number): T {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const timeout = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timeout);
  }, [value, delay]);
  return debounced;
}

export default function NotesClient({ initialData, tag }: Props) {
  const router = useRouter();
  const [search, setSearch] = useState("");

  const debouncedSearch = useDebounce(search, 300);
  const [page, setPage] = useState(initialData.page);

  useEffect(() => {
      setPage(1);
  }, [tag, debouncedSearch]);

  const { data, isFetching } = useQuery({
    queryKey: ["notes", tag, debouncedSearch, page],
    queryFn: () =>
      fetchNotes({
        tag,
        search: debouncedSearch,
        page,
        perPage: initialData.perPage,
      }),
    initialData,
    placeholderData: keepPreviousData,
    refetchOnWindowFocus: false,
  });

  const notes = data?.notes ?? [];
  const totalPages = data?.totalPages ?? 1;

  return (
      <>
        <header className={styles.toolbar}>
          <SearchBox value={search} onChange={setSearch} />
          <button
            type="button"
            className={styles.button}
            onClick={() => router.push("/notes/action/create")}
            aria-label="Create new note"
          >
            Create note +
          </button>
        </header>

        {isFetching && <div className={styles.loading}>Loading...</div>}

        {notes.length > 0 ? (
          <NoteList notes={notes} />
        ) : (
        <p className={styles.message}>No notes found.</p>
        )}

        {totalPages > 1 && (
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={setPage}
          />
        )}
      </>
  );
}
