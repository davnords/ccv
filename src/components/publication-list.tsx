"use client";

import * as React from "react";
import { Code2, ExternalLink, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import type { Publication } from "@/data/publications";

export function PublicationList({
  publications,
  years,
}: {
  publications: Publication[];
  years: number[];
}) {
  const [active, setActive] = React.useState<number | "All">("All");

  const shown =
    active === "All"
      ? publications
      : publications.filter((p) => p.year === active);

  const grouped = years
    .map((year) => ({ year, items: shown.filter((p) => p.year === year) }))
    .filter((group) => group.items.length > 0);

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        <Button
          size="sm"
          variant={active === "All" ? "default" : "outline"}
          onClick={() => setActive("All")}
        >
          All
        </Button>
        {years.map((year) => (
          <Button
            key={year}
            size="sm"
            variant={active === year ? "default" : "outline"}
            onClick={() => setActive(year)}
          >
            {year}
          </Button>
        ))}
      </div>

      <div className="mt-12 space-y-12">
        {grouped.map((group) => (
          <section key={group.year}>
            <h2 className="text-2xl font-semibold tracking-tight">
              {group.year}
            </h2>
            <div className="mt-6 space-y-4">
              {group.items.map((pub) => (
                <Card key={pub.title}>
                  <CardContent className="p-6">
                    <div className="flex flex-wrap items-baseline gap-x-3 gap-y-2">
                      <h3 className="text-lg font-medium">{pub.title}</h3>
                      {pub.distinction ? (
                        <Badge className="shrink-0">{pub.distinction}</Badge>
                      ) : null}
                    </div>
                    <p className="mt-2 text-sm text-muted-foreground">
                      <span className="font-medium text-foreground">Venue:</span>{" "}
                      {pub.venue}
                    </p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      <span className="font-medium text-foreground">
                        Authors:
                      </span>{" "}
                      {pub.authors.join(", ")}
                    </p>

                    {pub.links ? (
                      <div className="mt-4 flex flex-wrap gap-2">
                        {pub.links.project ? (
                          <Button asChild size="sm" variant="secondary">
                            <a
                              href={pub.links.project}
                              target="_blank"
                              rel="noreferrer"
                            >
                              Project <ExternalLink className="ml-2 h-3.5 w-3.5" />
                            </a>
                          </Button>
                        ) : null}
                        {pub.links.paper ? (
                          <Button asChild size="sm" variant="secondary">
                            <a
                              href={pub.links.paper}
                              target="_blank"
                              rel="noreferrer"
                            >
                              Paper <FileText className="ml-2 h-3.5 w-3.5" />
                            </a>
                          </Button>
                        ) : null}
                        {pub.links.code ? (
                          <Button asChild size="sm" variant="secondary">
                            <a
                              href={pub.links.code}
                              target="_blank"
                              rel="noreferrer"
                            >
                              Code <Code2 className="ml-2 h-3.5 w-3.5" />
                            </a>
                          </Button>
                        ) : null}
                      </div>
                    ) : null}
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
