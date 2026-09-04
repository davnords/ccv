import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { EmptyState } from "@/components/empty-state";
import { courses } from "@/data/courses";

export const metadata: Metadata = { title: "Courses" };

export default function CoursesPage() {
  return (
    <>
      <PageHeader
        title="Courses"
        subtitle="Courses taught by members of the group."
      />

      <div className="mx-auto max-w-[90rem] px-6 py-16 sm:px-8">
        {courses.length === 0 ? (
          <EmptyState message="Course listings are being put together." />
        ) : (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {courses.map((course) => (
              <Card key={course.code} className="flex flex-col">
                <CardHeader>
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge variant="secondary">{course.code}</Badge>
                    <Badge variant="outline">{course.level}</Badge>
                  </div>
                  <CardTitle className="pt-2 text-xl">{course.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-1 flex-col">
                  <p className="flex-1 text-sm text-muted-foreground">
                    {course.description}
                  </p>
                  <div className="mt-6 space-y-1 text-sm text-muted-foreground">
                    <p>
                      {course.period} · {course.credits}
                    </p>
                    {course.examiner ? <p>Examiner: {course.examiner}</p> : null}
                    {course.href ? (
                      <a
                        href={course.href}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 pt-1 font-medium text-foreground hover:underline"
                      >
                        Course syllabus <ArrowUpRight className="h-3.5 w-3.5" />
                      </a>
                    ) : null}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
