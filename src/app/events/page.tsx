import type { Metadata } from "next";
import { Clock, MapPin } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { EmptyState } from "@/components/empty-state";
import { events } from "@/data/events";
import { formatDate } from "@/lib/format";

export const metadata: Metadata = { title: "Events" };

export default function EventsPage() {
  return (
    <>
      <PageHeader
        title="Events"
        subtitle="Seminars, guest lectures, defences and workshops hosted by the group."
      />

      <div className="mx-auto max-w-[90rem] px-6 py-16 sm:px-8">
        {events.length === 0 ? (
          <EmptyState message="No events are currently scheduled. Check back soon." />
        ) : (
          <div className="space-y-6">
            {events.map((item) => (
              <Card key={item.title}>
                <CardContent className="grid gap-6 p-6 sm:grid-cols-[12rem_1fr]">
                  <time
                    dateTime={item.date}
                    className="text-sm font-medium text-foreground"
                  >
                    {formatDate(item.date)}
                  </time>
                  <div>
                    <h2 className="text-xl font-medium">{item.title}</h2>
                    {item.speaker ? (
                      <p className="mt-1 text-sm text-muted-foreground">
                        {item.speaker}
                      </p>
                    ) : null}
                    <p className="mt-3 max-w-3xl text-muted-foreground">
                      {item.description}
                    </p>
                    <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
                      <span className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        {item.time}
                      </span>
                      <span className="flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        {item.location}
                      </span>
                    </div>
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
