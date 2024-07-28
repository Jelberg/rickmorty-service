export function mapTypeStat(typeStat: {
  id: number;
  status: { name: string };
}) {
  if (Array.isArray(typeStat)) {
    return typeStat.map((ts) => ({
      id: ts.id,
      statusName: ts.status.name,
    }));
  }

  return typeStat
    ? {
        id: typeStat.id,
        statusName: typeStat.status.name,
      }
    : null;
}

export function mapEpisodes(episodes) {
  if (Array.isArray(episodes)) {
    return episodes.map((e) => ({
      id: e.episodes.id,
      name: e.episodes.name,
      season: e.episodes.season,
      duration: e.episodes.duration,
    }));
  }

  return episodes
    ? {
        id: episodes.id,
        name: episodes.name,
        season: episodes.season,
        duration: episodes.duration,
      }
    : [];
}

export function mapSubCharEpis(
  subcCharEpis: {
    id: number;
    fk_char: number;
    fk_subc: number;
    fk_epis: number;
    subcategories: { name: string; id: number };
  }[],
): { id: number; subcategoryId: number; subcategoryName: string }[] {
  return subcCharEpis.map((sce) => ({
    id: sce.id,
    subcategoryId: sce.subcategories.id,
    subcategoryName: sce.subcategories.name,
  }));
}

export function mapSubcCharEpis(
  subcCharEpis: {
    id: number;
    subcategories: { name: string; categories: { name: string } };
  }[],
): { id: number; subcategoryName: string; categoryName: string }[] {
  return subcCharEpis.map((sce) => ({
    id: sce.id,
    categoryName: sce.subcategories.categories.name,
    subcategoryName: sce.subcategories.name,
  }));
}
