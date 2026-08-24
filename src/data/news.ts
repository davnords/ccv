// Group news. `label` is used verbatim as the timestamp shown on the card —
// swap to real dates when they are known.

export type NewsItem = {
  label: string;
  title: string;
  summary: string;
  tag: string;
  href?: string;
};

export const news: NewsItem[] = [
  {
    label: "August 2026",
    tag: "Software",
    title: "LoMa is now integrated into COLMAP",
    summary:
      "Our sparse matcher LoMa is available as a built-in feature matcher in COLMAP, so it can be used directly from the standard reconstruction pipeline.",
    href: "https://github.com/colmap/colmap/pull/4524",
  },
  {
    label: "SIGGRAPH 2026",
    tag: "Publication",
    title: "ParaGram accepted to SIGGRAPH 2026",
    summary:
      "Scalable GPU Construction of 3D Voronoi and Power Diagrams has been accepted to SIGGRAPH 2026.",
    href: "https://research.zenseact.com/publications/paragram/",
  },
  {
    label: "ECCV 2026",
    tag: "Publication",
    title: "RoMa v2 accepted to ECCV 2026",
    summary:
      "RoMa v2 sets a new state of the art in dense image matching and is currently the world's best dense matcher. It will be presented in Malmö.",
    href: "https://arxiv.org/abs/2511.15706",
  },
  {
    label: "ECCV 2026",
    tag: "Publication",
    title: "LoMa accepted to ECCV 2026",
    summary:
      "LoMa sets a new state of the art in sparse image matching and is currently the world's best sparse matcher. It will be presented in Malmö.",
    href: "https://arxiv.org/abs/2604.04931",
  },
  {
    label: "ECCV 2026",
    tag: "Publication",
    title: "Quick ViTs accepted to ECCV 2026",
    summary:
      "At large scale, insisting that networks rediscover known symmetries is not just inefficient. Our work on speeding up vision transformers through equivariance will be presented at ECCV.",
    href: "https://arxiv.org/abs/2505.15441",
  },
  {
    label: "SSBA 2026",
    tag: "Award",
    title: "Best Industry Paper at the Swedish Symposium on Image Analysis",
    summary:
      "The group won the Best Industry Paper award in Örebro, 2026, for its work on dense matching.",
    href: "https://arxiv.org/abs/2511.15706",
  },
  {
    label: "CVPR 2026",
    tag: "Publication",
    title: "MuM presented at CVPR 2026",
    summary:
      "A simple self-supervised approach to learning geometric features through multi-view masked image modeling.",
    href: "https://arxiv.org/abs/2511.17309",
  },
  {
    label: "3DV 2026",
    tag: "Publication",
    title: "Reweighting dramatically simplifies geometric vision problems",
    summary:
      "For two-view triangulation the algebraic degree drops from six to two. Joint work with Felix Rydell and Kathlén Kohn, Department of Mathematics, KTH.",
    href: "https://arxiv.org/abs/2503.08142",
  },
  {
    label: "WACV 2026",
    tag: "Publication",
    title: "Semi-Supervised Hierarchical Open-Set Classification at WACV 2026",
    summary:
      "Hierarchical recognition in the presence of unknown classes.",
    href: "https://arxiv.org/abs/2601.16541",
  },
  {
    label: "2026–2028",
    tag: "People",
    title: "Fredrik Kahl appointed Hi!Paris Visiting Chair",
    summary:
      "Fredrik Kahl will be a Hi!Paris Visiting Chair at the IMAGINE research group, Ecole des Ponts ParisTech, during 2026–2028.",
    href: "https://imagine-lab.enpc.fr/",
  },
  {
    label: "October 2025",
    tag: "Talk",
    title: "Two keynote talks",
    summary:
      "Keynotes at the ICCV workshop CALIPOSE in Honolulu and at the French-Swedish AI Workshop at KTH.",
    href: "https://sites.google.com/view/calipose2025/home",
  },
  {
    label: "ICCV 2025",
    tag: "Publication",
    title: "Spherical camera motion makes standard SfM pipelines fail",
    summary:
      "Uncalibrated Structure from Motion on a Sphere, presented as an oral at ICCV 2025 in Honolulu.",
    href: "https://jonathanventura.github.io/spherical-sfm/",
  },
];
