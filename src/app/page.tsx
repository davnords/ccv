import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PlaceholderVisual } from "@/components/placeholder-visual";
import { HeroVisual } from "@/components/hero-visual";
import { site } from "@/lib/site";
import { featuredSlugs, researchAreas } from "@/data/research";
import { news } from "@/data/news";
import { publications } from "@/data/publications";

export default function Home() {
  const featured = featuredSlugs
    .map((slug) => researchAreas.find((a) => a.slug === slug))
    .filter((a): a is (typeof researchAreas)[number] => Boolean(a));
  const latestNews = news.slice(0, 4);
  const recentPubs = publications.slice(0, 4);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden border-b">
        <HeroVisual />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-background/45 via-background/10 to-transparent" />
        <div className="relative mx-auto max-w-[90rem] px-6 py-28 sm:px-8 sm:py-36">
          <div className="max-w-2xl rounded-xl border bg-background/80 p-8 backdrop-blur sm:p-10">
            <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
              Welcome to the {site.name} Group
            </h1>
            <p className="mt-6 text-lg text-muted-foreground">
              We are the computer vision group at {site.institution}, working on
              geometric deep learning, 3D scene understanding and medical image
              analysis.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild>
                <Link href="/research">
                  Our research <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/team">Meet the team</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* About */}
      <section className="mx-auto max-w-[90rem] px-6 py-20 sm:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <Image
            src="/photos/group-photo.jpg"
            alt="Group photo of the Chalmers Computer Vision group"
            width={1800}
            height={1200}
            sizes="(min-width: 1024px) 45vw, 100vw"
            className="aspect-[4/3] w-full rounded-lg border object-cover"
          />
          <div>
            <h2 className="text-3xl font-semibold tracking-tight">
              About the group
            </h2>
            <p className="mt-6 text-muted-foreground">
              {site.name} is led by Professor Fredrik Kahl at {site.institution}
              . Our research focuses on geometric deep learning and 3D scene
              understanding, with core problems in 3D reconstruction,
              correspondences and visual localization, and an emphasis on
              symmetry, equivariance and scalable learning.
            </p>
            <p className="mt-4 text-muted-foreground">
              Medical image analysis is a substantial part of the group&apos;s
              work, carried out together with clinical partners, and current
              interests also include generative models. We work closely with
              industry, and several of our doctoral students are co-employed
              with partners such as Zenseact and SAAB.
            </p>
            <Button asChild variant="outline" className="mt-8">
              <Link href="/team">
                Meet the team <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Featured research */}
      <section className="border-y bg-muted/40">
        <div className="mx-auto max-w-[90rem] px-6 py-20 sm:px-8">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 className="text-3xl font-semibold tracking-tight">
              Featured research
            </h2>
            <Button asChild variant="ghost">
              <Link href="/research">
                All research areas <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {featured.map((area, i) => (
              <Card key={area.slug} className="flex flex-col overflow-hidden">
                {area.image ? (
                  <Image
                    src={area.image}
                    alt={area.title}
                    width={1200}
                    height={675}
                    className="aspect-[16/9] w-full border-b object-cover"
                  />
                ) : (
                  <PlaceholderVisual
                    seed={i + 1}
                    className="aspect-[16/9] rounded-none border-0 border-b"
                  />
                )}
                <CardHeader>
                  <Badge variant="secondary" className="w-fit">
                    {area.category}
                  </Badge>
                  <CardTitle className="pt-2">{area.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-1 flex-col">
                  <p className="flex-1 text-sm text-muted-foreground">
                    {area.summary}
                  </p>
                  <Button
                    asChild
                    variant="link"
                    className="mt-4 h-auto w-fit p-0"
                  >
                    <Link href={`/research/${area.slug}`}>
                      Read more <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* News + recent publications */}
      <section className="mx-auto max-w-[90rem] px-6 py-20 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <div className="flex items-end justify-between gap-4">
              <h2 className="text-2xl font-semibold tracking-tight">
                Latest news
              </h2>
              <Button asChild variant="ghost" size="sm">
                <Link href="/news">All news</Link>
              </Button>
            </div>
            <ul className="mt-6 space-y-4">
              {latestNews.map((item) => (
                <li key={item.title} className="rounded-lg border p-5">
                  <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                    <span className="font-medium text-foreground">
                      {item.label}
                    </span>
                    <Badge variant="outline">{item.tag}</Badge>
                  </div>
                  <h3 className="mt-2 font-medium">{item.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {item.summary}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="flex items-end justify-between gap-4">
              <h2 className="text-2xl font-semibold tracking-tight">
                Recent publications
              </h2>
              <Button asChild variant="ghost" size="sm">
                <Link href="/publications">All publications</Link>
              </Button>
            </div>
            <ul className="mt-6 space-y-4">
              {recentPubs.map((pub) => (
                <li key={pub.title} className="rounded-lg border p-5">
                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-2">
                    <h3 className="font-medium">{pub.title}</h3>
                    {pub.distinction ? (
                      <Badge className="shrink-0">{pub.distinction}</Badge>
                    ) : null}
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {pub.venue}, {pub.year}
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {pub.authors.join(", ")}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
