
interface PaginationProps {
  page: number
  perPage: number
  total: number
  lastPage: number
  loading: boolean
  onPageChange: (page: number) => void
}

export default function Pagination({
  page,
  perPage,
  total,
  lastPage,
  loading,
  onPageChange,
}: PaginationProps) {
  const firstItem = total === 0 ? 0 : (page - 1) * perPage + 1
  const lastItem = Math.min(page * perPage, total)

  const buttonClass =
    'rounded-lg border border-white/10 px-3 py-2 text-sm transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-30'

  return (
    <div className="flex flex-col gap-4 border-t border-white/10 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
      <p className="text-sm text-slate-400">
        {firstItem}–{lastItem} / {total} találat
      </p>

      <div className="flex items-center gap-2">
        <button
          type="button"
          disabled={page <= 1 || loading}
          onClick={() => onPageChange(page - 1)}
          className={buttonClass}
        >
          ← Előző
        </button>

        <span className="min-w-20 text-center text-sm text-slate-300">
          {page} / {lastPage}
        </span>

        <button
          type="button"
          disabled={page >= lastPage || loading}
          onClick={() => onPageChange(page + 1)}
          className={buttonClass}
        >
          Következő →
        </button>
      </div>
    </div>
  )
}
