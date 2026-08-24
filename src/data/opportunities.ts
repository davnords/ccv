// TODO: no real openings supplied yet. Add advertised PhD positions, postdocs
// and master's thesis projects here and the Opportunities page will list them.

export type Opportunity = {
  title: string;
  type: "PhD Position" | "Postdoc" | "Master's Thesis" | "Research Engineer";
  deadline: string;
  description: string;
  href?: string;
};

export const opportunities: Opportunity[] = [];
