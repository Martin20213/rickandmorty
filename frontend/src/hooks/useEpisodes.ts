
import { useCallback, useEffect, useState } from 'react'
import { getEpisodes } from '../api/episodes'
import type {
  Episode,
  EpisodeFilters,
  PaginatedResponse,
} from '../types/episode'

const initialFilters: EpisodeFilters = {
  search: '',
  air_date_from: '',
  air_date_to: '',
  sort_by: 'air_date',
  sort_direction: 'desc',
  page: 1,
  per_page: 10,
}

export function useEpisodes() {
  const [filters, setFilters] = useState<EpisodeFilters>({
    ...initialFilters,
  })
  const [result, setResult] = useState<PaginatedResponse<Episode> | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [hasLoaded, setHasLoaded] = useState(false)
  const [refreshKey, setRefreshKey] = useState(0)

  useEffect(() => {
    let cancelled = false

    async function loadEpisodes() {
      setLoading(true)
      setError(null)

      try {
        const data = await getEpisodes(filters)

        if (!cancelled) {
          setResult(data)
          setHasLoaded(true)
        }
      } catch {
        if (!cancelled) {
          setError(
            'Nem sikerült betölteni az epizódokat. Ellenőrizd, hogy fut-e a Laravel backend.',
          )
        }
      } finally {
        if (!cancelled) {
          setLoading(false)
        }
      }
    }

    const timeout = window.setTimeout(
      loadEpisodes,
      filters.search ? 300 : 0,
    )

    return () => {
      cancelled = true
      window.clearTimeout(timeout)
    }
  }, [filters, refreshKey])

  const updateFilter = useCallback(
    <K extends keyof EpisodeFilters>(
      key: K,
      value: EpisodeFilters[K],
    ) => {
      setFilters((current) => ({
        ...current,
        [key]: value,
        page: 1,
      }))
    },
    [],
  )

  const toggleSort = useCallback(
    (column: 'name' | 'air_date') => {
      setFilters((current) => ({
        ...current,
        sort_by: column,
        sort_direction:
          current.sort_by === column && current.sort_direction === 'asc'
            ? 'desc'
            : 'asc',
        page: 1,
      }))
    },
    [],
  )

  const resetFilters = useCallback(() => {
    setFilters({ ...initialFilters })
  }, [])

  const changePage = useCallback((page: number) => {
    setFilters((current) => ({
      ...current,
      page,
    }))
  }, [])

  const retry = useCallback(() => {
    setRefreshKey((current) => current + 1)
  }, [])

  return {
    filters,
    result,
    loading,
    error,
    hasLoaded,
    updateFilter,
    toggleSort,
    resetFilters,
    changePage,
    retry,
  }
}
