
import type { EpisodeFilters as Filters } from '../types/episode'

interface EpisodeFiltersProps {
  filters: Filters
  updateFilter: <K extends keyof Filters>(
    key: K,
    value: Filters[K],
  ) => void
  resetFilters: () => void
}

export default function EpisodeFilters({
  filters,
  updateFilter,
  resetFilters,
}: EpisodeFiltersProps) {
  return (
    <section className="mb-6 rounded-2xl border border-white/10 bg-white/[0.035] p-4 sm:p-6">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-lg font-semibold">Szűrők</h2>

        <button
          type="button"
          onClick={resetFilters}
          className="cursor-pointer text-sm text-emerald-400 transition hover:text-emerald-300"
        >
          Szűrők visszaállítása
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <label className="block">
          <span className="mb-2 block text-sm text-slate-400">
            Epizód neve
          </span>
          <input
            type="search"
            value={filters.search}
            onChange={(event) =>
              updateFilter('search', event.target.value)
            }
            placeholder="Pl. Pilot..."
            className="w-full rounded-xl border border-white/10 bg-[#0d1322] px-3 py-2.5 outline-none transition placeholder:text-slate-600 focus:border-emerald-400"
          />
        </label>

        <label className="block">
          <span className="mb-2 block text-sm text-slate-400">
            Dátumtól
          </span>
          <input
            type="date"
            value={filters.air_date_from}
            max={filters.air_date_to || undefined}
            onChange={(event) =>
              updateFilter('air_date_from', event.target.value)
            }
            className="w-full cursor-pointer rounded-xl border border-white/10 bg-[#0d1322] px-3 py-2.5 text-slate-200 outline-none transition hover:border-emerald-400/50 focus:border-emerald-400 [&::-webkit-calendar-picker-indicator]:cursor-pointer"
          />
        </label>

        <label className="block">
          <span className="mb-2 block text-sm text-slate-400">
            Dátumig
          </span>
          <input
            type="date"
            value={filters.air_date_to}
            min={filters.air_date_from || undefined}
            onChange={(event) =>
              updateFilter('air_date_to', event.target.value)
            }
            className="w-full cursor-pointer rounded-xl border border-white/10 bg-[#0d1322] px-3 py-2.5 text-slate-200 outline-none transition hover:border-emerald-400/50 focus:border-emerald-400 [&::-webkit-calendar-picker-indicator]:cursor-pointer"
          />
        </label>

        <label className="block">
          <span className="mb-2 block text-sm text-slate-400">
            Sorok oldalanként
          </span>
          <select
            value={filters.per_page}
            onChange={(event) =>
              updateFilter('per_page', Number(event.target.value))
            }
            className="w-full cursor-pointer rounded-xl border border-white/10 bg-[#0d1322] px-3 py-2.5 text-slate-200 outline-none transition hover:border-emerald-400/50 focus:border-emerald-400"
          >
            <option value={10}>10 sor</option>
            <option value={20}>20 sor</option>
            <option value={50}>50 sor</option>
          </select>
        </label>
      </div>
    </section>
  )
}
