// Research areas of the group.

export type ResearchArea = {
  slug: string;
  title: string;
  category: string;
  summary: string;
  description: string;
  /** Path under /public, e.g. "/research/loma.jpg" */
  image?: string;
  links?: { label: string; href: string }[];
};

export const researchCategories = [
  "3D Reconstruction",
  "Geometry",
  "Learning",
  "Generative Models",
  "Medical Imaging",
] as const;

export const researchAreas: ResearchArea[] = [
  {
    slug: "image-matching",
    title: "Image Matching and Correspondences",
    category: "3D Reconstruction",
    summary:
      "Dense and sparse feature matching with the RoMa and LoMa matchers; LoMa ships in COLMAP.",
    description:
      "Correspondence estimation underpins almost everything else in geometric vision. We develop both dense matchers, which produce a warp between two images, and sparse matchers built on detected keypoints. Recent work in this direction includes RoMa v2 and LoMa, and the group received the Best Industry Paper award at the Swedish Symposium on Image Analysis in Örebro, 2026, for its work on dense matching. LoMa ships as a built-in feature matcher in COLMAP.",
    image: "/research/loma.jpg",
    links: [
      { label: "RoMa v2 paper", href: "https://arxiv.org/abs/2511.15706" },
      { label: "LoMa code", href: "https://github.com/davnords/LoMa" },
      {
        label: "LoMa in COLMAP",
        href: "https://github.com/colmap/colmap/pull/4524",
      },
    ],
  },
  {
    slug: "symmetry-and-equivariance",
    title: "Symmetry and Equivariance",
    category: "Learning",
    summary:
      "Building known symmetries into networks instead of forcing them to be relearned from data.",
    description:
      "Much of the structure in visual data is governed by symmetry, and a network that has to rediscover that structure from scratch spends capacity doing so. We study how symmetry can be encoded architecturally, what conventional networks learn about symmetry on their own, and how equivariance can be used to make models faster. This line of work includes Steerers, an analysis of how ReLU networks encode symmetries, and Quick ViTs.",
    image: "/research/flop.png",
    links: [
      { label: "Steerers", href: "https://arxiv.org/abs/2312.02152" },
      { label: "Quick ViTs", href: "https://arxiv.org/abs/2505.15441" },
    ],
  },
  {
    slug: "visual-localization",
    title: "Visual Localization",
    category: "3D Reconstruction",
    summary:
      "Estimating camera pose in a known scene, and benchmarking how well it holds up long term.",
    description:
      "Visual localization asks where a camera is, given a map of the scene. The hard part is robustness over time: appearance changes with season, weather and time of day. The group has a long history in this area, including work on revisiting how long-term localization is evaluated.",
  },
  {
    slug: "3d-scene-understanding",
    title: "3D Scene Perception and Neural Rendering",
    category: "3D Reconstruction",
    summary:
      "Learning geometric representations of scenes, and rendering them from new viewpoints.",
    description:
      "We work on representations that capture the 3D structure of a scene well enough to be rendered, edited and reasoned about. This includes self-supervised pretraining for geometric tasks, such as multi-view masked image modeling, as well as efficient data structures for large scenes. The group leads the WASP-NEST project on 3D scene perception, embeddings and neural rendering, together with co-investigators at KTH.",
    links: [
      { label: "MuM", href: "https://arxiv.org/abs/2511.17309" },
      { label: "WASP-NEST project", href: "https://neural3d.github.io/" },
    ],
  },
  {
    slug: "geometric-optimization",
    title: "Geometry and Optimization",
    category: "Geometry",
    summary:
      "Global optimization, minimal problems and the algebraic structure behind multi-view geometry.",
    description:
      "Many estimation problems in multi-view geometry are non-convex, and a local solver gives no guarantee that its answer is the right one. The group has contributed global optimization methods, L-infinity formulations, rotation averaging with strong duality guarantees, and more recently a framework for reducing the algebraic complexity of geometric vision problems, which for two-view triangulation brings the degree down from six to two.",
    links: [
      {
        label: "Complexity reduction paper",
        href: "https://arxiv.org/abs/2503.08142",
      },
    ],
  },
  {
    slug: "generative-models",
    title: "Generative Models for Simulation and Editing",
    category: "Generative Models",
    summary:
      "Diffusion-based asset insertion and multi-view consistent editing of captured scenes.",
    description:
      "Generative models make it possible to modify captured scenes while keeping them physically and geometrically plausible. R3D2 inserts 3D assets into neural driving scenes using diffusion, which supports scalable and realistic simulation for autonomous driving. Related work looks at multi-view consistent editing when the edit itself changes scene geometry.",
    links: [
      {
        label: "R3D2",
        href: "https://research.zenseact.com/publications/R3D2/",
      },
      { label: "GeM-NR", href: "https://gem-nr.github.io/" },
    ],
  },
  {
    slug: "medical-image-analysis",
    title: "Medical Image Analysis",
    category: "Medical Imaging",
    summary:
      "Applying learning and shape modelling to clinical imaging problems.",
    description:
      "The group applies computer vision and machine learning to medical imaging, combining learned models with shape priors for segmentation and analysis tasks. This work is carried out in collaboration with clinical partners.",
  },
  {
    slug: "autonomous-systems",
    title: "Perception for Autonomous Systems",
    category: "Learning",
    summary:
      "Detection, recognition and open-set robustness for vehicles and other autonomous platforms.",
    description:
      "Several group members work jointly with industry on perception for autonomous systems, including monocular 3D object detection, open-set and hierarchical classification, and simulation for autonomous driving. A number of our PhD students are co-employed with industrial partners such as Zenseact and SAAB.",
  },
];

/** Slugs shown in the Featured research section on the home page, in order. */
export const featuredSlugs = [
  "image-matching",
  "symmetry-and-equivariance",
  "medical-image-analysis",
] as const;
