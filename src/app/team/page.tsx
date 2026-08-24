import type { Metadata } from "next";
import Image from "next/image";
import { ArrowUpRight, Mail, Phone } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { PlaceholderVisual } from "@/components/placeholder-visual";
import { Card, CardContent } from "@/components/ui/card";
import { team } from "@/data/team";

export const metadata: Metadata = { title: "Our Team" };

export default function TeamPage() {
  return (
    <>
      <PageHeader
        title="Our Team"
        subtitle="Faculty, researchers and students in the group."
      />

      <div className="mx-auto max-w-[90rem] space-y-16 px-6 py-16 sm:px-8">
        {team.map((group) => (
          <section key={group.id} id={group.id}>
            <h2 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
              {group.label}
            </h2>

            {group.id === "alumni" ? (
              <ul className="mt-6 grid gap-x-8 gap-y-3 sm:grid-cols-2 xl:grid-cols-3">
                {group.members.map((person) => (
                  <li key={person.name} className="border-b pb-3 text-sm">
                    <span className="font-medium">{person.name}</span>
                    <span className="text-muted-foreground">
                      {" "}
                      · {person.title}
                      {person.affiliation ? `, ${person.affiliation}` : ""}
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="mt-6 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {group.members.map((person, i) => (
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
                          seed={i + group.label.length}
                          label=""
                          className="h-24 w-20 shrink-0"
                        />
                      )}
                      <div className="min-w-0">
                        <h3 className="font-medium">{person.name}</h3>
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
                          {person.phone ? (
                            <span className="inline-flex items-center gap-2 text-sm text-muted-foreground">
                              <Phone className="h-3.5 w-3.5 shrink-0" />
                              <span className="truncate">{person.phone}</span>
                            </span>
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
                            {person.orcid ? (
                              <a
                                href={person.orcid}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
                              >
                                ORCID <ArrowUpRight className="h-3 w-3" />
                              </a>
                            ) : null}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </section>
        ))}
      </div>
    </>
  );
}
