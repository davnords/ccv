"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PlaceholderVisual } from "@/components/placeholder-visual";
import type { ResearchArea } from "@/data/research";

export function ResearchList({
  areas,
  categories,
}: {
  areas: ResearchArea[];
  categories: readonly string[];
}) {
  const [active, setActive] = React.useState<string>("All");

  const filtered =
    active === "All" ? areas : areas.filter((a) => a.category === active);

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

      <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {filtered.map((area, i) => (
          <Card key={area.slug} className="flex flex-col overflow-hidden">
            <PlaceholderVisual
              seed={i + 2}
              className="aspect-[16/9] rounded-none border-0 border-b"
            />
            <CardHeader>
              <Badge variant="secondary" className="w-fit">
                {area.category}
              </Badge>
              <CardTitle className="pt-2 text-xl">{area.title}</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-1 flex-col">
              <p className="flex-1 text-sm text-muted-foreground">
                {area.summary}
              </p>
              <Button asChild variant="link" className="mt-4 h-auto w-fit p-0">
                <Link href={`/research/${area.slug}`}>
                  Read more <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
