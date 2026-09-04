// Group members, as one flat list. The team page presents everyone in a single
// grid — no ranking by role — with a category filter mirroring the one on the
// research page. Order is by surname, applied automatically at the bottom of
// this file, so new people can be appended anywhere in the list.
//
// TODO: email addresses and Chalmers profile links are only filled in where
// they could be verified. Add the rest.

export const teamCategories = [
  "Senior Researchers",
  "Postdocs",
  "PhD Students",
  "Affiliated",
] as const;

export type TeamCategory = (typeof teamCategories)[number];

export type Person = {
  name: string;
  title: string;
  category: TeamCategory;
  /** External or industrial affiliation only — not the Chalmers division. */
  affiliation?: string;
  email?: string;
  website?: string;
  scholar?: string;
  /** Path under /public, e.g. "/team/jennifer-alven.jpg" */
  image?: string;
  interests?: string;
};

const members: Person[] = [
  {
    name: "Fredrik Kahl",
    title: "Professor, Head of Group",
    category: "Senior Researchers",
    email: "fredrik.kahl@chalmers.se",
    website: "https://fredkahl.github.io/",
    scholar: "https://scholar.google.com/citations?user=P_w6UgMAAAAJ&hl=en",
    image: "/team/fredrik-kahl.jpg",
    interests:
      "Geometric deep learning, 3D scene understanding, visual localization, symmetry and equivariance",
  },
  {
    name: "Ida Häggström",
    title: "Associate Professor",
    category: "Senior Researchers",
    email: "idah@chalmers.se",
    website: "https://www.chalmers.se/en/persons/idah/",
    image: "/team/ida-haggstrom.jpg",
    interests:
      "Medical image analysis using machine learning, in close collaboration with medical doctors on diagnosis and prognosis of disease, mainly cancer. Works primarily with PET, but also CT and MR.",
  },
  {
    name: "Jennifer Alvén",
    title: "Assistant Professor",
    category: "Senior Researchers",
    email: "alven@chalmers.se",
    scholar:
      "https://scholar.google.com/citations?user=QmYcKQQAAAAJ&hl=en&oi=ao",
    website: "https://www.chalmers.se/en/persons/alven/",
    image: "/team/jennifer-alven.jpg",
    interests:
      "Deep learning for medical image analysis, particularly weakly and semi-supervised segmentation and models that exploit anatomical shape and structure. Also works on vision-language models and conditional generative models.",
  },
  {
    name: "Erik Landolsi",
    title: "Adjunct Senior Lecturer",
    category: "Senior Researchers",
    email: "erik.landolsi@chalmers.se",
    website: "https://www.chalmers.se/en/persons/e9erikj/",
    image: "/team/erik-landolsi.jpg",
  },
  {
    name: "Yaroslava Lochman",
    title: "Postdoctoral Researcher",
    category: "Postdocs",
    email: "lochman@chalmers.se",
    website: "https://www.chalmers.se/en/persons/lochman/",
    image: "/team/yaroslava-lochman.jpg",
  },
  { name: "Jorge Lazo", title: "Postdoctoral Researcher", category: "Postdocs" },
  {
    name: "Georg Bökman",
    title: "Postdoc, University of Amsterdam",
    category: "Affiliated",
    website: "https://georg-bn.github.io",
    scholar: "https://scholar.google.com/citations?user=FUE3Wd0AAAAJ",
    image: "/team/georg-bokman.jpg",
    interests:
      "Geometric deep learning and computer vision, in particular making equivariant methods efficient and the tradeoffs between learning known symmetries from data and building them into the model.",
  },
  {
    name: "David Nordström",
    title: "PhD Student",
    category: "PhD Students",
    email: "davnords@chalmers.se",
    website: "https://www.davnords.com/",
    image: "/team/david-nordstrom.jpg",
    interests: "Image matching, self-supervised learning, equivariance",
  },
  {
    name: "Tianyu Wu",
    title: "PhD Student",
    category: "PhD Students",
    affiliation: "Chalmers and Zenseact AB",
    image: "/team/tianyu-wu.jpg",
  },
  {
    name: "Bernardo Taveira",
    title: "PhD Student",
    category: "PhD Students",
    affiliation: "Chalmers and Zenseact AB",
    website: "https://bertaveira.github.io/",
    image: "/team/bernardo-taveira.webp",
    interests: "Neural rendering, GPU geometry, driving simulation",
  },
  {
    name: "Josef Bengtson",
    title: "PhD Student",
    category: "PhD Students",
    email: "bjosef@chalmers.se",
    website: "https://www.chalmers.se/en/persons/bjosef/",
    scholar: "https://scholar.google.com/citations?user=wjNsZRkAAAAJ",
    image: "/team/josef-bengtson.jpg",
  },
  {
    name: "Victor Wåhlstrand",
    title: "PhD Student",
    category: "PhD Students",
    email: "victor.wahlstrand@chalmers.se",
    website: "https://www.chalmers.se/en/persons/vicska/",
    image: "/team/victor-wahlstrand.jpg",
    interests: "Co-supervised by Jennifer Alvén",
  },
  {
    name: "Karl Hammar",
    title: "PhD Student",
    category: "PhD Students",
    affiliation: "Chalmers and SAAB AB",
  },
  {
    name: "Richard Petersen",
    title: "PhD Student",
    category: "PhD Students",
    interests: "Supervised by Jennifer Alvén",
  },
  { name: "Vilgot Jansson", title: "PhD Student", category: "PhD Students" },
  { name: "Lingkai Zhu", title: "PhD Student", category: "PhD Students" },
  {
    name: "Sofie Allgöwer",
    title: "PhD Student",
    category: "PhD Students",
    email: "allgower@chalmers.se",
    website: "https://www.chalmers.se/en/persons/allgower/",
    interests: "Supervised by Jennifer Alvén",
  },
];

/** Surname, for ordering. Swedish collation puts å, ä and ö after z. */
const surname = (name: string) => name.split(" ").pop() ?? name;

export const team: Person[] = [...members].sort((a, b) =>
  surname(a.name).localeCompare(surname(b.name), "sv")
);

// Alumni hidden for now. Note that the shape below predates the flattening:
// restoring it means dropping the group wrapper and giving each person a
// `category`, plus adding that category to `teamCategories` above.
// {
//   id: "alumni",
//   label: "Alumni",
//   members: [
//     { name: "Roman Naeem", title: "PhD 2026" },
//     { name: "Erik Wallin", title: "PhD 2026", affiliation: "SAAB AB" },
//     {
//       name: "Kunal Chelani",
//       title: "PhD 2025",
//       affiliation: "Ericsson Research",
//     },
//     { name: "Georg Bökman", title: "PhD 2024", affiliation: "Postdoc, UvA" },
//     {
//       name: "Lucas Brynte",
//       title: "PhD 2024",
//       affiliation: "Lucid Insights AB",
//     },
//     {
//       name: "José Pedro Lopes Iglesias",
//       title: "PhD 2023",
//       affiliation: "Apple Inc.",
//     },
//     {
//       name: "Fredrik Hellström",
//       title: "PhD 2023",
//       affiliation: "Postdoc, UCL",
//     },
//     { name: "Carl Toft", title: "PhD 2021", affiliation: "Eigenvision AB" },
//     {
//       name: "Måns Larsson",
//       title: "PhD 2020",
//       affiliation: "Eigenvision AB",
//     },
//     {
//       name: "Jennifer Alvén",
//       title: "PhD 2020",
//       affiliation: "Assistant Professor, Chalmers",
//     },
//     {
//       name: "Viktor Larsson",
//       title: "PhD 2018",
//       affiliation: "Assistant Professor, Lund University",
//     },
//     { name: "Erik Bylow", title: "PhD 2018", affiliation: "Qualcomm Inc." },
//     {
//       name: "Johan Fredriksson",
//       title: "PhD 2016",
//       affiliation: "Apple Inc.",
//     },
//     {
//       name: "Matilda Landgren",
//       title: "PhD 2016",
//       affiliation: "Cross Technology Solutions",
//     },
//     { name: "Fangyuan Jiang", title: "PhD 2015", affiliation: "AutoX Inc." },
//     { name: "Linus Svärm", title: "PhD 2015", affiliation: "Kiwaro AB" },
//     {
//       name: "Johannes Ulén",
//       title: "PhD 2014",
//       affiliation: "Eigenvision AB",
//     },
//     {
//       name: "Yubin Kuang",
//       title: "PhD 2014",
//       affiliation: "Co-founder, Mapillary",
//     },
//     {
//       name: "Petter Strandmark",
//       title: "PhD 2013",
//       affiliation: "Apple Inc.",
//     },
//     {
//       name: "Olof Enqvist",
//       title: "PhD 2011",
//       affiliation: "CEO, Eigenvision AB",
//     },
//     { name: "Martin Byröd", title: "PhD 2010", affiliation: "Apple Inc." },
//     { name: "Klas Josephson", title: "PhD 2010", affiliation: "Spiideo AB" },
//     {
//       name: "Carl Olsson",
//       title: "PhD 2009",
//       affiliation: "Professor, Lund University",
//     },
//     {
//       name: "Jan-Erik Solem",
//       title: "PhD 2006",
//       affiliation: "CEO, Mapillary",
//     },
//   ],
// },
