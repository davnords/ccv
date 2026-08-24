// Publications. Author lists for recent papers are taken verbatim from arXiv;
// older entries follow the selected-publications list on Fredrik Kahl's page.
// This is not yet the group's complete output — extend as needed.

export type Publication = {
  title: string;
  venue: string;
  year: number;
  authors: string[];
  links?: { project?: string; paper?: string; code?: string };
};

export const publications: Publication[] = [
  {
    title: "RoMa v2: Harder Better Faster Denser Feature Matching",
    venue: "European Conference on Computer Vision (ECCV)",
    year: 2026,
    authors: [
      "Johan Edstedt",
      "David Nordström",
      "Yushan Zhang",
      "Georg Bökman",
      "Jonathan Astermark",
      "Viktor Larsson",
      "Anders Heyden",
      "Fredrik Kahl",
      "Mårten Wadenbäck",
      "Michael Felsberg",
    ],
    links: { paper: "https://arxiv.org/abs/2511.15706" },
  },
  {
    title: "LoMa: Local Feature Matching Revisited",
    venue: "European Conference on Computer Vision (ECCV)",
    year: 2026,
    authors: [
      "David Nordström",
      "Johan Edstedt",
      "Georg Bökman",
      "Jonathan Astermark",
      "Anders Heyden",
      "Viktor Larsson",
      "Mårten Wadenbäck",
      "Michael Felsberg",
      "Fredrik Kahl",
    ],
    links: {
      paper: "https://arxiv.org/abs/2604.04931",
      code: "https://github.com/davnords/LoMa",
    },
  },
  {
    title: "Quick ViTs: Speeding up Vision Transformers through Equivariance",
    venue: "European Conference on Computer Vision (ECCV)",
    year: 2026,
    authors: [
      "David Nordström",
      "Johan Edstedt",
      "Fredrik Kahl",
      "Georg Bökman",
    ],
    links: { paper: "https://arxiv.org/abs/2505.15441" },
  },
  {
    title: "MuM: Multi-View Masked Image Modeling for 3D Vision",
    venue: "Conference on Computer Vision and Pattern Recognition (CVPR)",
    year: 2026,
    authors: [
      "David Nordström",
      "Johan Edstedt",
      "Fredrik Kahl",
      "Georg Bökman",
    ],
    links: {
      paper: "https://arxiv.org/abs/2511.17309",
      code: "https://github.com/davnords/mum",
    },
  },
  {
    title: "Scalable GPU Construction of 3D Voronoi and Power Diagrams",
    venue: "ACM SIGGRAPH Conference Papers",
    year: 2026,
    authors: [
      "Bernardo Taveira",
      "Carl Lindström",
      "Maryam Fatemi",
      "Lars Hammarstrand",
      "Fredrik Kahl",
    ],
    links: {
      project: "https://research.zenseact.com/publications/paragram/",
      paper: "https://arxiv.org/abs/2605.06408",
      code: "https://github.com/zenseact/paragram",
    },
  },
  {
    title:
      "A Framework for Reducing the Complexity of Geometric Vision Problems and its Application to Two-View Triangulation with Approximation Bounds",
    venue: "International Conference on 3D Vision (3DV)",
    year: 2026,
    authors: ["Felix Rydell", "Georg Bökman", "Fredrik Kahl", "Kathlén Kohn"],
    links: { paper: "https://arxiv.org/abs/2503.08142" },
  },
  {
    title: "Semi-Supervised Hierarchical Open-Set Classification",
    venue: "Winter Conference on Applications of Computer Vision (WACV)",
    year: 2026,
    authors: ["Erik Wallin", "Fredrik Kahl", "Lars Hammarstrand"],
    links: { paper: "https://arxiv.org/abs/2601.16541" },
  },
  {
    title:
      "R3D2: Realistic 3D Asset Insertion via Diffusion for Autonomous Driving Simulation",
    venue: "CVPR Workshop on Autonomous Driving",
    year: 2026,
    authors: [
      "William Ljungbergh",
      "Bernardo Taveira",
      "Wenzhao Zheng",
      "Adam Tonderski",
      "Chensheng Peng",
      "Fredrik Kahl",
      "Christoffer Petersson",
      "Michael Felsberg",
      "Kurt Keutzer",
      "Masayoshi Tomizuka",
      "Wei Zhan",
    ],
    links: {
      project: "https://research.zenseact.com/publications/R3D2/",
      paper: "https://arxiv.org/abs/2506.07826",
    },
  },
  {
    title: "Uncalibrated Structure from Motion on a Sphere",
    venue: "International Conference on Computer Vision (ICCV), oral",
    year: 2025,
    authors: ["Jonathan Ventura", "Viktor Larsson", "Fredrik Kahl"],
    links: {
      project: "https://jonathanventura.github.io/spherical-sfm/",
      code: "https://github.com/jonathanventura/spherical-sfm",
    },
  },
  {
    title: "Steerers: A framework for rotation equivariant keypoint descriptors",
    venue: "Conference on Computer Vision and Pattern Recognition (CVPR)",
    year: 2024,
    authors: [
      "Georg Bökman",
      "Johan Edstedt",
      "Michael Felsberg",
      "Fredrik Kahl",
    ],
    links: { paper: "https://arxiv.org/abs/2312.02152" },
  },
  {
    title: "Adjustable Visual Appearance for Generalizable Novel View Synthesis",
    venue:
      "International Conference on Pattern Recognition and Artificial Intelligence (ICPRAI), best paper award",
    year: 2024,
    authors: [
      "Josef Bengtson",
      "David Nilsson",
      "Che-Tsung Lin",
      "Marcel Büsching",
      "Fredrik Kahl",
    ],
    links: { paper: "https://arxiv.org/abs/2306.01344" },
  },
  {
    title: "Investigating how ReLU-networks encode symmetries",
    venue: "Neural Information Processing Systems (NeurIPS)",
    year: 2023,
    authors: ["Georg Bökman", "Fredrik Kahl"],
    links: { paper: "https://arxiv.org/abs/2305.17017" },
  },
  {
    title: "Long-Term Visual Localization Revisited",
    venue: "IEEE Transactions on Pattern Analysis and Machine Intelligence",
    year: 2021,
    authors: [
      "Carl Toft",
      "Will Maddern",
      "Akihiko Torii",
      "Lars Hammarstrand",
      "Erik Stenborg",
      "Masatoshi Okutomi",
      "Marc Pollefeys",
      "Josef Sivic",
      "Tomas Pajdla",
      "Fredrik Kahl",
      "Torsten Sattler",
    ],
    links: {
      paper:
        "http://www.maths.lth.se/matematiklth/personal/fredrik/toft_pami_2020.pdf",
    },
  },
  {
    title:
      "Rotation Averaging with the Chordal Distance: Global Minimizers and Strong Duality",
    venue: "IEEE Transactions on Pattern Analysis and Machine Intelligence",
    year: 2021,
    authors: [
      "Anders Eriksson",
      "Carl Olsson",
      "Fredrik Kahl",
      "Tat-Jun Chin",
    ],
    links: {
      paper:
        "http://www.maths.lth.se/matematiklth/personal/calle/papers/eriksson-etal-tpami-2019.pdf",
    },
  },
  {
    title:
      "Monocular 3D Object Detection and Box Fitting Trained End-to-End Using Intersection-over-Union Loss",
    venue: "arXiv preprint",
    year: 2019,
    authors: ["Eskil Jörgensen", "Christopher Zach", "Fredrik Kahl"],
    links: { paper: "https://arxiv.org/abs/1906.08070" },
  },
  {
    title: "Tractable algorithms for robust model estimation",
    venue: "International Journal of Computer Vision (IJCV)",
    year: 2015,
    authors: ["Olof Enqvist", "Erik Ask", "Fredrik Kahl", "Kalle Åström"],
    links: {
      paper:
        "http://www.maths.lth.se/matematiklth/vision/publdb/reports/pdf/enqvist-ask-etal-ijcv-14.pdf",
    },
  },
  {
    title:
      "Real-time camera tracking and 3D reconstruction using signed distance functions",
    venue: "Robotics: Science and Systems (RSS)",
    year: 2013,
    authors: [
      "Erik Bylow",
      "Jürgen Sturm",
      "Christian Kerl",
      "Fredrik Kahl",
      "Daniel Cremers",
    ],
    links: {
      paper:
        "http://www.maths.lth.se/matematiklth/vision/publdb/reports/pdf/bylow_etal_rss2013.pdf",
    },
  },
  {
    title: "Generalized roof duality",
    venue: "Discrete Applied Mathematics",
    year: 2012,
    authors: ["Fredrik Kahl", "Petter Strandmark"],
    links: {
      paper:
        "http://www.maths.lth.se/matematiklth/vision/publdb/reports/pdf/kahl-strandmark-dam-12.pdf",
    },
  },
  {
    title: "Global optimization through rotation space search",
    venue: "International Journal of Computer Vision (IJCV)",
    year: 2009,
    authors: ["Richard Hartley", "Fredrik Kahl"],
    links: {
      paper:
        "http://www.maths.lth.se/matematiklth/vision/publdb/reports/pdf/hartley-kahl-ijcv-09.pdf",
    },
  },
  {
    title: "Multiple-view geometry under the L∞-norm",
    venue: "IEEE Transactions on Pattern Analysis and Machine Intelligence",
    year: 2008,
    authors: ["Fredrik Kahl", "Richard Hartley"],
    links: {
      paper:
        "http://www.maths.lth.se/matematiklth/vision/publdb/reports/pdf/kahl-hartley-pami-07.pdf",
    },
  },
  {
    title:
      "Critical configurations for projective reconstruction from multiple views",
    venue: "International Journal of Computer Vision (IJCV)",
    year: 2007,
    authors: ["Richard Hartley", "Fredrik Kahl"],
    links: {
      paper:
        "http://www.maths.lth.se/matematiklth/vision/publdb/reports/pdf/hartley-kahl-ijcv-07.pdf",
    },
  },
  {
    title:
      "Critical motions for auto-calibration when some intrinsic parameters can vary",
    venue: "Journal of Mathematical Imaging and Vision",
    year: 2000,
    authors: ["Fredrik Kahl", "Bill Triggs", "Kalle Åström"],
    links: {
      paper:
        "http://www.maths.lth.se/matematiklth/vision/publdb/reports/pdf/kahl-triggs-etal-jmiv-00.pdf",
    },
  },
];

export const publicationYears = Array.from(
  new Set(publications.map((p) => p.year))
).sort((a, b) => b - a);
