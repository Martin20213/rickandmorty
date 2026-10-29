export interface Episode {
  id: number
  name: string
  air_date: string
  episode_code: string
}

export interface PaginatedResponse<T> {
  data: T[]
  links: {
    first: string | null
    last: string | null
    prev: string | null
    next: string | null
  }
  meta: {
    current_page: number
    per_page: number
    total: number
    last_page: number
  }
}

export interface EpisodeFilters {
  search: string
  air_date_from: string
  air_date_to: string
  sort_by: 'name' | 'air_date'
  sort_direction: 'asc' | 'desc'
  page: number
  per_page: number
}
