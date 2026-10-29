
import { motion } from 'motion/react'

interface PageHeaderProps {
  total: number
}

export default function PageHeader({ total }: PageHeaderProps) {
  return (
    <motion.header
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
    >
      <div>
        <p className="mb-2 text-sm font-semibold uppercase tracking-[0.25em] text-emerald-400">
          Rick and Morty · Explorer
        </p>
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Epizódok
        </h1>
        <p className="mt-2 text-sm text-slate-400">
          Keresés, rendezés és szűrés az elmentett epizódok között.
        </p>
      </div>

      <div className="rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-4">
        <p className="text-sm text-slate-400">Összes találat</p>
        <p className="mt-1 text-2xl font-bold text-emerald-400">
          {total}
        </p>
      </div>
    </motion.header>
  )
}
