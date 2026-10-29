
import type { Episode, EpisodeFilters } from '../types/episode'

interface EpisodeTableProps {
  episodes: Episode[]
  loading: boolean
  hasLoaded: boolean
  sortBy: EpisodeFilters['sort_by']
  sortDirection: EpisodeFilters['sort_direction']
  onSort: (column: 'name' | 'air_date') => void
}

export default function EpisodeTable({
  episodes,
  loading,
  hasLoaded,
  sortBy,
  sortDirection,
  onSort,
}: EpisodeTableProps) {
  function sortIndicator(column: 'name' | 'air_date') {
    if (sortBy !== column) return '↕'
    return sortDirection === 'asc' ? '↓' : '↑'
  }

  return (
    <div className="relative overflow-x-auto">
      {loading && hasLoaded && (
        <div className="absolute inset-x-0 top-0 z-10 h-0.5 overflow-hidden bg-white/5">
          <div className="h-full w-1/3 animate-pulse rounded-full bg-emerald-400" />
        </div>
      )}

      <table className="w-full min-w-[600px] border-collapse text-left">
        <thead className="bg-white/[0.035] text-xs tracking-wider text-slate-400">
          <tr>
            <th className="px-4 py-4 font-medium sm:px-6">
              <button
                type="button"
                onClick={() => onSort('name')}
                className="inline-flex cursor-pointer items-center gap-2 hover:text-emerald-400"
              >
                Epizód neve
                <span>{sortIndicator('name')}</span>
              </button>
            </th>

            <th className="px-4 py-4 font-medium sm:px-6">
              Epizódkód
            </th>

            <th className="px-4 py-4 font-medium sm:px-6">
              <button
                type="button"
                onClick={() => onSort('air_date')}
                className="inline-flex cursor-pointer items-center gap-2 hover:text-emerald-400"
              >
                Megjelenés dátuma
                <span>{sortIndicator('air_date')}</span>
              </button>
            </th>
          </tr>
        </thead>

        <tbody className="divide-y divide-white/[0.06]">
          {!hasLoaded && loading ? (
            <tr>
              <td
                colSpan={3}
                className="px-6 py-16 text-center text-slate-400"
              >
                <span className="inline-block animate-spin">◌</span>
                <span className="ml-2">Epizódok betöltése…</span>
              </td>
            </tr>
          ) : episodes.length > 0 ? (
            episodes.map((episode) => (
              <tr
                key={episode.id}
                className="transition hover:bg-emerald-400/[0.04]"
              >
                <td className="px-4 py-4 font-medium sm:px-6">
                  {episode.name}
                </td>
                <td className="px-4 py-4 sm:px-6">
                  <span className="rounded-md border border-emerald-400/20 bg-emerald-400/10 px-2 py-1 text-xs font-semibold text-emerald-300">
                    {episode.episode_code}
                  </span>
                </td>
                <td className="px-4 py-4 text-slate-300 sm:px-6">
                  {episode.air_date}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={3}
                className="px-6 py-16 text-center text-slate-400"
              >
                Nincs a feltételeknek megfelelő epizód.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}
