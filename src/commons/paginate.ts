export function paginate(
  page: number = 1,
  pageSize: number = 10,
): { skip: number; take: number } {
  const skip = (page - 1) * pageSize;
  const take = pageSize;

  return {
    skip,
    take,
  };
}
