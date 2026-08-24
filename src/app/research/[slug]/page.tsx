import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PlaceholderVisual } from "@/components/placeholder-visual";
import { researchAreas } from "@/data/research";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return researchAreas.map((area) => ({ slug: area.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const area = researchAreas.find((a) => a.slug === slug);
  return { title: area?.title ?? "Research" };
}

export default async function ResearchAreaPage({ params }: Params) {
  const { slug } = await params;
  const area = researchAreas.find((a) => a.slug === slug);
  if (!area) notFound();

  return (
    <article className="mx-auto max-w-[90rem] px-6 py-16 sm:px-8">
      <Button asChild variant="ghost" size="sm" className="-ml-3">
        <Link href="/research">
          <ArrowLeft className="mr-2 h-4 w-4" /> All research areas
        </Link>
      </Button>

      <div className="mt-8 grid gap-12 lg:grid-cols-[1fr_28rem]">
        <div>
          <Badge variant="secondary">{area.category}</Badge>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight">
            {area.title}
          </h1>
          <p className="mt-6 max-w-3xl text-lg text-muted-foreground">
            {area.summary}
          </p>
          <p className="mt-6 max-w-3xl text-muted-foreground">
            {area.description}
          </p>

          {area.links?.length ? (
            <div className="mt-8 flex flex-wrap gap-2">
              {area.links.map((link) => (
                <Button key={link.href} asChild size="sm" variant="secondary">
                  <a href={link.href} target="_blank" rel="noreferrer">
                    {link.label}
                    <ArrowUpRight className="ml-2 h-3.5 w-3.5" />
                  </a>
                </Button>
              ))}
            </div>
          ) : null}
        </div>

        <PlaceholderVisual
          seed={area.slug.length}
          label="Result figure"
          className="aspect-[4/3] w-full"
        />
      </div>
    </article>
  );
}
