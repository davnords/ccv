import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";
import { PublicationList } from "@/components/publication-list";
import { publications, publicationYears } from "@/data/publications";

export const metadata: Metadata = { title: "Publications" };

export default function PublicationsPage() {
  return (
    <>
      <PageHeader
        title="Publications"
        subtitle="Peer-reviewed work from the group, most recent first."
      />

      <div className="mx-auto max-w-[90rem] px-6 py-16 sm:px-8">
        <PublicationList
          publications={publications}
          years={[...publicationYears]}
        />
      </div>
    </>
  );
}
