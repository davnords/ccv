// Courses taught by group members.
// TODO: EEN020, SSY098 and EEN180 are confirmed — add any remaining courses.

export type Course = {
  code: string;
  title: string;
  period: string;
  level: "Bachelor" | "Master" | "PhD";
  credits: string;
  examiner?: string;
  description: string;
  href?: string;
};

export const courses: Course[] = [
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
  {
    code: "EEN180",
    title: "Medical Imaging Systems",
    period: "Block B",
    level: "Bachelor",
    credits: "7.5 hp",
    examiner: "Ida Häggström",
    description:
      "The physics and engineering behind modern medical imaging: X-ray and CT, nuclear medicine with SPECT and PET, MRI and ultrasound, covering detectors and instrumentation, reconstruction algorithms and the artefacts each modality produces. Students implement reconstruction algorithms in MATLAB or Python. The course includes guest lectures from academia, industry and the clinic, and a study visit to Medical Imaging at Sahlgrenska. Taught in Swedish.",
    href: "https://www.chalmers.se/en/education/your-studies/find-course-and-programme-syllabi/course-syllabus/EEN180/",
  },
];
