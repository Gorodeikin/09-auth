export type NoteTag = "Todo" | "Work" | "Personal" | "Meeting" | "Shopping";

export interface Note {
  createdAt: string | number | Date;
  id: string;
  title: string;
  content: string;
  tag: NoteTag;
}

export interface CreateNoteData {
  title: string;
  content: string;
  tag: NoteTag;
}

export interface UpdateNoteData {
  title?: string;
  content?: string;
  tag?: NoteTag;
}