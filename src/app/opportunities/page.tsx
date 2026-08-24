import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { EmptyState } from "@/components/empty-state";
import { opportunities } from "@/data/opportunities";
import { site } from "@/lib/site";

export const metadata: Metadata = { title: "Opportunities" };

export default function OpportunitiesPage() {
  return (
    <>
      <PageHeader
        title="Opportunities"
        subtitle="Open positions and student projects in the group."
      />

      <div className="mx-auto max-w-[90rem] px-6 py-16 sm:px-8">
        {opportunities.length === 0 ? (
          <EmptyState message="There are no advertised openings at the moment." />
        ) : (
          <div className="grid gap-6 md:grid-cols-2">
            {opportunities.map((item) => (
              <Card key={item.title} className="flex flex-col">
                <CardHeader>
                  <Badge variant="secondary" className="w-fit">
                    {item.type}
                  </Badge>
                  <CardTitle className="pt-2 text-xl">{item.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-1 flex-col">
                  <p className="flex-1 text-sm text-muted-foreground">
                    {item.description}
                  </p>
                  <p className="mt-6 text-sm text-muted-foreground">
                    Application deadline: {item.deadline}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        <div className="mt-16 rounded-xl border bg-muted/40 p-8">
          <h2 className="text-xl font-medium">Get in touch</h2>
          <p className="mt-3 max-w-2xl text-muted-foreground">
            We are always interested in hearing from strong candidates, also
            outside advertised openings. Send a short description of your
            background and what you would like to work on.
          </p>
          <Button asChild className="mt-6">
            <a href={`mailto:${site.contact.email}`}>Contact us</a>
          </Button>
        </div>
      </div>
    </>
  );
}
