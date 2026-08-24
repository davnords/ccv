import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";
import { ResearchList } from "@/components/research-list";
import { researchAreas, researchCategories } from "@/data/research";

export const metadata: Metadata = { title: "Research" };

export default function ResearchPage() {
  return (
    <>
      <PageHeader
        title="Research"
        subtitle="What we work on, from the geometry of image formation to learned perception systems."
      />

      <div className="mx-auto max-w-[90rem] px-6 py-16 sm:px-8">
        <ResearchList areas={researchAreas} categories={researchCategories} />
      </div>
    </>
  );
}
