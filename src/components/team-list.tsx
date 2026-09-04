"use client";

import * as React from "react";
import Image from "next/image";
import { ArrowUpRight, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { PlaceholderVisual } from "@/components/placeholder-visual";
import type { Person } from "@/data/team";

export function TeamList({
  members,
  categories,
}: {
  members: Person[];
  categories: readonly string[];
}) {
  const [active, setActive] = React.useState<string>("All");

  const filtered =
    active === "All" ? members : members.filter((p) => p.category === active);

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {["All", ...categories].map((category) => (
          <Button
            key={category}
            size="sm"
            variant={active === category ? "default" : "outline"}
            onClick={() => setActive(category)}
          >
            {category}
          </Button>
        ))}
      </div>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {filtered.map((person, i) => (
          <Card key={person.name}>
            <CardContent className="flex gap-5 p-6">
              {person.image ? (
                <Image
                  src={person.image}
                  alt={person.name}
                  width={160}
                  height={192}
                  className="h-24 w-20 shrink-0 rounded-lg border object-cover"
                />
              ) : (
                <PlaceholderVisual
                  seed={i + 1}
                  label=""
                  className="h-24 w-20 shrink-0"
                />
              )}
              <div className="min-w-0">
                <h2 className="font-medium">{person.name}</h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  {person.title}
                </p>
                {person.affiliation ? (
                  <p className="mt-1 text-sm text-muted-foreground">
                    {person.affiliation}
                  </p>
                ) : null}
                {person.interests ? (
                  <p className="mt-3 text-sm text-muted-foreground">
                    {person.interests}
                  </p>
                ) : null}
                <div className="mt-3 flex flex-col gap-1">
                  {person.email ? (
                    <a
                      href={`mailto:${person.email}`}
                      className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
                    >
                      <Mail className="h-3.5 w-3.5 shrink-0" />
                      <span className="truncate">{person.email}</span>
                    </a>
                  ) : null}
                  <div className="flex flex-wrap gap-x-4">
                    {person.website ? (
                      <a
                        href={person.website}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
                      >
                        Profile <ArrowUpRight className="h-3 w-3" />
                      </a>
                    ) : null}
                    {person.scholar ? (
                      <a
                        href={person.scholar}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
                      >
                        Scholar <ArrowUpRight className="h-3 w-3" />
                      </a>
                    ) : null}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
