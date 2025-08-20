import { fetchNotes, NotesPageData } from "@/lib/api";
import NotesClient from "./Notes.client";
import { Metadata } from "next";


type Props = {
  params: Promise<{ slug?: string[] }>;
};

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const filter = (await params).slug?.[0] || 'All';
  return {
    title: `${filter} Notes | NoteHub`,
    description: `View notes filtered by ${filter} in NoteHub.`,
    openGraph: {
      title: `${filter} Notes | NoteHub`,
      description: `View notes filtered by ${filter} in NoteHub.`,
      url: `${process.env.NEXT_PUBLIC_SITE_URL}/notes/filter/${filter}`,
      images: [
        {
          url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
        },
      ],
    },
  };
}

export default async function FilteredNotesPage({ params }: Props) {
  
  const awaitedParams = await params;
  const { slug = [] } = awaitedParams; 
  const tag = slug[0] ?? "All"; 
  const filterTag = tag === "All" ? undefined : tag;

  const data: NotesPageData = await fetchNotes({ tag: filterTag, page: 1, perPage: 12 });
  
  return <NotesClient initialData={data} tag={filterTag} />

}