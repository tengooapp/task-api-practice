export interface PageParams {
  skip: number
  take: number
}

export function parsePagination(query: { page?: string; limit?: string }): PageParams {
  const page = Math.max(1, parseInt(query.page || '1', 10) || 1)
  const limit = Math.max(1, parseInt(query.limit || '20', 10) || 20)
  return { skip: (page - 1) * limit, take: limit }
}
