
import PageHeader from './components/PageHeader'
import EpisodeFilters from './components/EpisodeFilters'
import EpisodeTable from './components/EpisodeTable'
import Pagination from './components/Pagination'
import { useEpisodes } from './hooks/useEpisodes'

function App() {
  const {
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
  } = useEpisodes()

  const total = result?.meta.total ?? 0
  const currentPage = result?.meta.current_page ?? filters.page
  const lastPage = Math.max(result?.meta.last_page ?? 1, 1)

  return (
    <main className="min-h-screen bg-[#090d18] text-slate-100">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <PageHeader total={total} />

        <EpisodeFilters
          filters={filters}
          updateFilter={updateFilter}
          resetFilters={resetFilters}
        />

        <section
          className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.025]"
          aria-busy={loading}
        >
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 px-4 py-4 sm:px-6">
            <h2 className="font-semibold">Epizódlista</h2>

            <p className="text-sm text-slate-400">
              {loading
                ? 'Frissítés…'
                : total === 0
                  ? 'Nincs találat'
                  : `${total} epizód · ${currentPage}. oldal`}
            </p>
          </div>

          {error && (
            <div
              role="alert"
              className="flex flex-wrap items-center justify-between gap-3 border-b border-rose-400/20 bg-rose-400/5 px-4 py-3 sm:px-6"
            >
              <p className="text-sm text-rose-300">{error}</p>
              <button
                type="button"
                onClick={retry}
                className="cursor-pointer rounded-lg bg-white/10 px-3 py-2 text-sm transition hover:bg-white/15"
              >
                Próbáld újra
              </button>
            </div>
          )}

          <EpisodeTable
            episodes={result?.data ?? []}
            loading={loading}
            hasLoaded={hasLoaded}
            sortBy={filters.sort_by}
            sortDirection={filters.sort_direction}
            onSort={toggleSort}
          />

          <Pagination
            page={currentPage}
            perPage={filters.per_page}
            total={total}
            lastPage={lastPage}
            loading={loading}
            onPageChange={changePage}
          />
        </section>

        <footer className="mt-6 text-center text-xs text-slate-600">
          Rick and Morty Episode Explorer · React · TypeScript · Laravel API
        </footer>
      </div>
    </main>
  )
}

export default App
