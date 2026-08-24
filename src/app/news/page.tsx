import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { EmptyState } from "@/components/empty-state";
import { news } from "@/data/news";

export const metadata: Metadata = { title: "News" };

export default function NewsPage() {
  return (
    <>
      <PageHeader
        title="News"
        subtitle="Papers, awards, talks and updates from the group."
      />

      <div className="mx-auto max-w-[90rem] px-6 py-16 sm:px-8">
        {news.length === 0 ? (
          <EmptyState message="No news items yet." />
        ) : (
          <ul className="space-y-4">
            {news.map((item) => (
              <li key={item.title}>
                <Card>
                  <CardContent className="p-6">
                    <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                      <span className="font-medium text-foreground">
                        {item.label}
                      </span>
                      <Badge variant="outline">{item.tag}</Badge>
                    </div>
                    <h2 className="mt-3 text-xl font-medium">{item.title}</h2>
                    <p className="mt-2 max-w-3xl text-muted-foreground">
                      {item.summary}
                    </p>
                    {item.href ? (
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noreferrer"
                        className="mt-4 inline-flex items-center gap-1 text-sm font-medium hover:underline"
                      >
                        Read more <ArrowUpRight className="h-3.5 w-3.5" />
                      </a>
                    ) : null}
                  </CardContent>
                </Card>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}
