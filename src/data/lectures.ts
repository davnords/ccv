// Courses taught by group members.
// TODO: EEN020 and SSY098 are confirmed — add any remaining courses.

export type Lecture = {
  code: string;
  title: string;
  period: string;
  level: "Bachelor" | "Master" | "PhD";
  credits: string;
  examiner?: string;
  description: string;
  href?: string;
};

export const lectures: Lecture[] = [
  {
    code: "EEN020",
    title: "Computer Vision",
    period: "Block C",
    level: "Master",
    credits: "7.5 hp",
    examiner: "Fredrik Kahl",
    description:
      "An overview of theory and practically useful methods in computer vision, with applications such as seeing systems, non-destructive measurements and augmented reality. Covers projective geometry, camera modelling, feature extraction, stereo vision, 3D modelling, structure from motion, bundle adjustment and surface geometry, and includes a project with a written report.",
    href: "https://www.chalmers.se/en/education/your-studies/find-course-and-programme-syllabi/course-syllabus/EEN020/",
  },
  {
    code: "SSY098",
    title: "Image Analysis",
    period: "Block C",
    level: "Master",
    credits: "7.5 hp",
    examiner: "Jennifer Alvén",
    description:
      "A basic introduction to the algorithms and mathematical methods used in image analysis, to an extent that will allow the student to handle industrial image analysis problems. Covers filtering and scale space representations, feature extraction, image similarity and registration, and machine learning methods for classification and segmentation.",
    href: "https://www.chalmers.se/en/education/your-studies/find-course-and-programme-syllabi/course-syllabus/SSY098/",
  },
];
