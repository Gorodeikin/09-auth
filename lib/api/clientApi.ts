"use client";

import { nextServer } from "./api";
import type { User } from "@/types/user";
import type { CreateNoteData, Note } from "@/types/note";
import axios from "axios";

export const registerClientUser = async (email: string, password: string): Promise<User> => {
  const { data } = await nextServer.post<User>("/auth/register", { email, password });
  return data;
};

export const loginClientUser = async (email: string, password: string): Promise<User> => {
  const { data } = await nextServer.post<User>("/auth/login", { email, password });
  return data;
};

export const logoutClientUser = async (): Promise<void> => {
  await nextServer.post("/auth/logout");
};

export const checkSessionClient = async (): Promise<User | null> => {
  try {
    const { data } = await nextServer.get<User | undefined>("/auth/session");
    return data ?? null;
  } catch {
    return null;
  }
};

export const getClientUser = async (): Promise<User> => {
  const { data } = await nextServer.get<User>("/users/me");
  return data;
};

export const updateClientProfile = async (user: Partial<User>): Promise<User> => {
  const { data } = await nextServer.patch<User>("/users/me", user);
  return data;
};

export const createClientNote = async (note: CreateNoteData): Promise<Note> => {
  const { data } = await nextServer.post<Note>("/notes", note);
  return data;
};

export const deleteClientNote = async (id: string): Promise<Note> => {
  const { data } = await nextServer.delete<Note>(`/notes/${id}`);
  return data;
};

export const fetchClientNoteById = async (id: string): Promise<Note> => {
  try {
    const { data } = await nextServer.get<Note>(`/notes/${id}`);
    return data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 404) {
      throw new Error("Note not found.");
    }
    throw error;
  }
};

export interface FetchNotesParams {
  page?: number;
  perPage?: number;
  search?: string;
  tag?: string;
}

export interface NotesPageData {
  notes: Note[];
  page: number;
  perPage: number;
  totalPages: number;
}

export const fetchClientNotes = async ({
  page = 1,
  perPage = 12,
  search = "",
  tag,
}: FetchNotesParams): Promise<NotesPageData> => {
  const params = new URLSearchParams();
  params.append("page", String(page));
  params.append("perPage", String(perPage));
  if (search.trim()) params.append("search", search.trim());
  if (tag && tag !== "All") params.append("tag", tag);

  const { data } = await nextServer.get<Omit<NotesPageData, "page" | "perPage">>(`/notes?${params.toString()}`);
  return { ...data, page, perPage };
};

export const updateClientNote = async (
  id: string,
  note: Partial<Omit<Note, "id">>
): Promise<Note> => {
  const { data } = await nextServer.patch<Note>(`/notes/${id}`, note);
  return data;
};