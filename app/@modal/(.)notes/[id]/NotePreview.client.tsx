"use client";

import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import Modal from "@/components/Modal/Modal";
import { fetchNoteById } from "@/lib/api";
import css from "./NotePreview.module.css";

type Props = {
  id: string;
};

export default function NotePreviewClient({ id }: Props) {
  const router = useRouter();

  const { data, isLoading, error } = useQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
    refetchOnMount: false,
  });

  const closeModal = () => router.back();

  if (isLoading) return <Modal isOpen onClose={closeModal}>Loading...</Modal>;
  if (error || !data) return <Modal isOpen onClose={closeModal}>Note not found</Modal>;

  return (
    <Modal isOpen onClose={closeModal}>
      <div className={css.container}>
        <div className={css.title}>
          <h2>{data.title}</h2>
        </div>
        <section className={css.item}>
          <p className={css.content}>{data.content}</p>
          <p className={css.tag}>{data.tag}</p>
          <p className={css.date}>
            Created at: {new Date(data.createdAt).toLocaleDateString()}
          </p>
        </section>
        <button className={css.closeBtn} onClick={closeModal}>
          Close
        </button>
      </div>
    </Modal>
  );
}

