// Group members. Photos are not wired up yet — add an `image` path per person
// and swap PlaceholderVisual for next/image in src/app/team/page.tsx.
//
// TODO: email addresses and Chalmers profile links are only filled in where
// they could be verified. Add the rest.

export type Person = {
  name: string;
  title: string;
  affiliation?: string;
  email?: string;
  phone?: string;
  website?: string;
  scholar?: string;
  orcid?: string;
  /** Path under /public, e.g. "/team/jennifer-alven.jpg" */
  image?: string;
  interests?: string;
};

export type TeamGroup = {
  id: string;
  label: string;
  members: Person[];
};

export const team: TeamGroup[] = [
  {
    id: "faculty",
    label: "Faculty",
    members: [
      {
        name: "Fredrik Kahl",
        title: "Professor, Head of Group",
        email: "fredrik.kahl@chalmers.se",
        website: "https://fredkahl.github.io/",
        interests:
          "Geometric deep learning, 3D scene understanding, visual localization, symmetry and equivariance",
      },
    ],
  },
  {
    id: "assistant-professors",
    label: "Assistant Professors",
    members: [
      {
        name: "Ida Häggström",
        // Chalmers lists her as Associate Professor — confirm which is current.
        title: "Associate Professor",
        affiliation:
          "Signal Processing and Biomedical Engineering, Electrical Engineering",
        email: "idah@chalmers.se",
        phone: "+46 31 772 22 19",
        orcid: "https://orcid.org/0000-0001-9178-6683",
        website: "https://www.chalmers.se/en/persons/idah/",
        image: "/team/ida-haggstrom.jpg",
        interests:
          "Medical image analysis using machine learning, in close collaboration with medical doctors on projects to diagnose, predict and prognosticate different diseases, mainly cancer. Works mainly with positron emission tomography (PET), but also computed tomography (CT) and magnetic resonance imaging (MR).",
      },
      {
        name: "Jennifer Alvén",
        title: "Assistant Professor",
        affiliation:
          "Signal Processing and Biomedical Engineering, Electrical Engineering",
        email: "alven@chalmers.se",
        phone: "+46 31 772 17 58",
        scholar:
          "https://scholar.google.com/citations?user=QmYcKQQAAAAJ&hl=en&oi=ao",
        orcid: "https://orcid.org/0000-0003-4195-9325",
        website: "https://www.chalmers.se/en/persons/alven/",
        image: "/team/jennifer-alven.jpg",
        interests:
          "Deep learning for medical image analysis, with a particular interest in weakly and semi-supervised segmentation, extraction and analysis of anatomical structures such as centerlines and landmarks, and models that make use of anatomical shape and structural information. Also works on multimodal learning with vision-language models and conditional generative models.",
      },
    ],
  },
  {
    id: "lecturers",
    label: "Lecturers",
    members: [{ name: "Erik Landolsi", title: "Adjunct Senior Lecturer" }],
  },
  {
    id: "postdocs",
    label: "Postdoctoral Researchers",
    members: [
      { name: "Yaroslava Lochman", title: "Postdoctoral Researcher" },
      { name: "Jorge Lazo", title: "Postdoctoral Researcher" },
    ],
  },
  {
    id: "affiliated",
    label: "Affiliated Researchers",
    members: [
      {
        name: "Georg Bökman",
        title: "Postdoctoral Researcher",
        affiliation: "University of Amsterdam",
        interests: "Equivariance, keypoint descriptors, geometric deep learning",
      },
    ],
  },
  {
    id: "phd",
    label: "PhD Students",
    members: [
      {
        name: "David Nordström",
        title: "PhD Student",
        website: "https://www.davnords.com/",
        interests: "Image matching, self-supervised learning, equivariance",
      },
      {
        name: "Tianyu Wu",
        title: "PhD Student",
        affiliation: "Chalmers and Zenseact AB",
      },
      {
        name: "Bernardo Taveira",
        title: "PhD Student",
        affiliation: "Chalmers and Zenseact AB",
        website: "https://bertaveira.github.io/",
        interests: "Neural rendering, GPU geometry, driving simulation",
      },
      { name: "Josef Bengtson", title: "PhD Student" },
      {
        name: "Victor Wåhlstrand",
        title: "PhD Student",
        interests: "Co-supervised by Jennifer Alvén",
      },
      {
        name: "Karl Hammar",
        title: "PhD Student",
        affiliation: "Chalmers and SAAB AB",
      },
      {
        name: "Richard Petersen",
        title: "PhD Student",
        interests: "Supervised by Jennifer Alvén",
      },
      { name: "Vilgot Jansson", title: "PhD Student" },
      { name: "Lingkai Zhu", title: "PhD Student" },
    ],
  },
  {
    id: "alumni",
    label: "Alumni",
    members: [
      { name: "Roman Naeem", title: "PhD 2026" },
      { name: "Erik Wallin", title: "PhD 2026", affiliation: "SAAB AB" },
      { name: "Kunal Chelani", title: "PhD 2025", affiliation: "Ericsson Research" },
      {
        name: "Georg Bökman",
        title: "PhD 2024",
        affiliation: "Postdoc at University of Amsterdam",
      },
      { name: "Lucas Brynte", title: "PhD 2024", affiliation: "Lucid Insights AB" },
      { name: "José Pedro Lopes Iglesias", title: "PhD 2023", affiliation: "Apple Inc." },
      {
        name: "Fredrik Hellström",
        title: "PhD 2023",
        affiliation: "Postdoc at University College London",
      },
      { name: "Carl Toft", title: "PhD 2021", affiliation: "Eigenvision AB" },
      { name: "Måns Larsson", title: "PhD 2020", affiliation: "Eigenvision AB" },
      {
        name: "Jennifer Alvén",
        title: "PhD 2020",
        affiliation: "Assistant Professor at Chalmers",
      },
      {
        name: "Viktor Larsson",
        title: "PhD 2018",
        affiliation: "Assistant Professor at Lund University",
      },
      { name: "Erik Bylow", title: "PhD 2018", affiliation: "Qualcomm Inc." },
      { name: "Johan Fredriksson", title: "PhD 2016", affiliation: "Apple Inc." },
      {
        name: "Matilda Landgren",
        title: "PhD 2016",
        affiliation: "Cross Technology Solutions AB",
      },
      { name: "Fangyuan Jiang", title: "PhD 2015", affiliation: "AutoX Inc." },
      { name: "Linus Svärm", title: "PhD 2015", affiliation: "Kiwaro AB" },
      { name: "Johannes Ulén", title: "PhD 2014", affiliation: "Eigenvision AB" },
      {
        name: "Yubin Kuang",
        title: "PhD 2014",
        affiliation: "Co-founder of Mapillary",
      },
      { name: "Petter Strandmark", title: "PhD 2013", affiliation: "Apple Inc." },
      {
        name: "Olof Enqvist",
        title: "PhD 2011",
        affiliation: "CEO and co-founder of Eigenvision AB",
      },
      { name: "Martin Byröd", title: "PhD 2010", affiliation: "Apple Inc." },
      { name: "Klas Josephson", title: "PhD 2010", affiliation: "Spiideo AB" },
      {
        name: "Carl Olsson",
        title: "PhD 2009",
        affiliation: "Professor at Lund University",
      },
      {
        name: "Jan-Erik Solem",
        title: "PhD 2006",
        affiliation: "CEO and co-founder of Mapillary",
      },
    ],
  },
];
