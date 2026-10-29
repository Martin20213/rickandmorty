import type {
  Episode,
  EpisodeFilters,
  PaginatedResponse,
} from '../types/episode'

export async function getEpisodes(
  filters: EpisodeFilters,
): Promise<PaginatedResponse<Episode>> {
  const params = new URLSearchParams({
    page: String(filters.page),
    per_page: String(filters.per_page),
    sort_by: filters.sort_by,
    sort_direction: filters.sort_direction,
  })

  if (filters.search.trim()) {
    params.set('search', filters.search.trim())
  }

  if (filters.air_date_from) {
    params.set('air_date_from', filters.air_date_from)
  }

  if (filters.air_date_to) {
    params.set('air_date_to', filters.air_date_to)
  }

  const response = await fetch(`/api/episodes?${params.toString()}`)

  if (!response.ok) {
    throw new Error(`API-hiba: ${response.status}`)
  }

  return response.json() as Promise<PaginatedResponse<Episode>>
}
