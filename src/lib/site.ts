export const site = {
  name: "Chalmers Computer Vision",
  shortName: "CCV",
  institution: "Chalmers University of Technology",
  description:
    "We are a computer vision research group at Chalmers University of Technology. Our work centres on geometric deep learning, 3D scene understanding and medical image analysis, with core problems in 3D reconstruction, correspondences and visual localization.",
  contact: {
    // General enquiries, and anything about this site.
    email: "davnords@chalmers.se",
    // The group's principal investigator. Prospective students and anyone
    // asking about positions should reach him directly.
    pi: {
      name: "Fredrik Kahl",
      email: "fredrik.kahl@chalmers.se",
    },
    address: "Chalmers University of Technology, 412 96 Gothenburg, Sweden",
  },
  links: {
    scholar: "https://scholar.google.com/citations?user=P_w6UgMAAAAJ&hl=en",
    chalmers: "https://www.chalmers.se/en/persons/kahlf/",
  },
} as const;

export const navLinks = [
  { href: "/team", label: "Our Team" },
  { href: "/research", label: "Research" },
  // Publications hidden for now: keeping the list current was judged too much
  // upkeep. The /publications route and its data are untouched, so restoring
  // this line brings the tab back.
  // { href: "/publications", label: "Publications" },
  { href: "/courses", label: "Courses" },
  { href: "/news", label: "News" },
  { href: "/events", label: "Events" },
  { href: "/opportunities", label: "Opportunities" },
] as const;
