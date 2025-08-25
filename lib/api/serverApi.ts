"use server";

import { nextServer } from "./api";
import { cookies } from "next/headers";
import type { User } from "@/types/user";
import type { Note } from "@/types/note";
import axios, { AxiosError, AxiosResponse } from "axios";

const withCookie = async () => {
  const cookieStore = await cookies();
  const cookieHeader = cookieStore.getAll().map(c => `${c.name}=${c.value}`).join("; ");
  return { headers: cookieHeader ? { cookie: cookieHeader } : undefined };
};

export const registerServerUser = async (email: string, password: string): Promise<User> => {
  const config = await withCookie();
  const { data } = await nextServer.post<User>("/auth/register", { email, password }, config);
  return data;
};

export const loginServerUser = async (email: string, password: string): Promise<User> => {
  const config = await withCookie();
  const { data } = await nextServer.post<User>("/auth/login", { email, password }, config);
  return data;
};

export const logoutServerUser = async (): Promise<void> => {
  const config = await withCookie();
  await nextServer.post("/auth/logout", {}, config);
};

export const checkSessionServer = async (
  refreshToken: string
): Promise<AxiosResponse<{ accessToken: string; refreshToken: string }>> => {
  return nextServer.post<{ accessToken: string; refreshToken: string }>(
    "/auth/refresh",
    { refreshToken },
    { validateStatus: () => true }
  );
};

export const getServerUser = async (): Promise<User | null> => {
  try {
    const cookieStore = await cookies();
    const cookieHeader = cookieStore.getAll().map(c => `${c.name}=${c.value}`).join("; ");

    const { data } = await nextServer.get<User>("/users/me", {
      headers: { Cookie: cookieHeader },
      withCredentials: true,
    });

    return data;
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      console.error("Axios error in getServerUser:", error.response?.data);
    } else if (error instanceof Error) {
      console.error("Error in getServerUser:", error.message);
    } else {
      console.error("Unknown error in getServerUser:", error);
    }
    return null;
  }
};

export const updateServerProfile = async (user: Partial<User>): Promise<User> => {
  const config = await withCookie();
  const { data } = await nextServer.patch<User>("/users/me", user, config);
  return data;
};

export const createServerNote = async (note: Omit<Note, "id">): Promise<Note> => {
  const config = await withCookie();
  const { data } = await nextServer.post<Note>("/notes", note, config);
  return data;
};

export const deleteServerNote = async (id: string): Promise<Note> => {
  const config = await withCookie();
  const { data } = await nextServer.delete<Note>(`/notes/${id}`, config);
  return data;
};

export const fetchServerNoteById = async (id: string): Promise<Note> => {
  try {
    const config = await withCookie();
    const { data } = await nextServer.get<Note>(`/notes/${id}`, config);
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

export const fetchServerNotes = async ({
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

  const config = await withCookie();
  const { data } = await nextServer.get<Omit<NotesPageData, "page" | "perPage">>(`/notes?${params.toString()}`, config);

  return { ...data, page, perPage };
};

export const updateServerNote = async (id: string, note: Partial<Omit<Note, "id">>): Promise<Note> => {
  const config = await withCookie();
  const { data } = await nextServer.patch<Note>(`/notes/${id}`, note, config);
  return data;
};