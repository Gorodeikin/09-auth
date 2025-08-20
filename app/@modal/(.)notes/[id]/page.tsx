import { fetchNoteById } from "@/lib/api";
import { QueryClient, dehydrate, HydrationBoundary } from "@tanstack/react-query";
import NotePreviewClient from "./NotePreview.client";

export default async function NoteModalPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } =await  params;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id)
  });

  return (
      <HydrationBoundary state={dehydrate(queryClient)}>
        <NotePreviewClient id={id} />
      </HydrationBoundary>
  );
}