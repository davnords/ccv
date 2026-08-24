export const site = {
  name: "Chalmers Computer Vision",
  shortName: "CCV",
  institution: "Chalmers University of Technology",
  description:
    "We are a computer vision research group at Chalmers University of Technology. Our work centres on geometric deep learning and 3D scene understanding, with core problems in 3D reconstruction, correspondences and visual localization.",
  contact: {
    // Group-level contact. Update if a shared group address is set up.
    email: "fredrik.kahl@chalmers.se",
    address: "Chalmers University of Technology, 412 96 Gothenburg, Sweden",
  },
  links: {
    scholar: "https://scholar.google.com/citations?user=P_w6UgMAAAAJ&hl=en",
    chalmers: "https://www.chalmers.se/en/persons/kahlf/",
    visualLocalization: "https://visuallocalization.net/",
  },
} as const;

export const navLinks = [
  { href: "/team", label: "Our Team" },
  { href: "/research", label: "Research" },
  { href: "/publications", label: "Publications" },
  { href: "/lectures", label: "Lectures" },
  { href: "/news", label: "News" },
  { href: "/events", label: "Events" },
  { href: "/opportunities", label: "Opportunities" },
] as const;
