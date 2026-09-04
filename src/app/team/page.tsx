import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";
import { TeamList } from "@/components/team-list";
import { team, teamCategories } from "@/data/team";

export const metadata: Metadata = { title: "Our Team" };

export default function TeamPage() {
  return (
    <>
      <PageHeader
        title="Our Team"
        subtitle="Faculty, researchers and students in the group."
      />

      <div className="mx-auto max-w-[90rem] px-6 py-16 sm:px-8">
        <TeamList members={team} categories={teamCategories} />
      </div>
    </>
  );
}
