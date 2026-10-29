function Footer() {
  return (
    <footer className="mt-6 flex flex-col items-center gap-3 pb-4 text-xs text-slate-500 sm:flex-row sm:justify-between">
      <p>
        Rick and Morty Episode Explorer
        <span className="mx-2 text-slate-700">·</span>
        React · TypeScript · Laravel API
      </p>

      <div className="flex items-center gap-3">
        <span>
          Made by <span className="font-medium text-slate-300">Martin Stecenkó</span>
        </span>

        <a
          href="https://github.com/Martin20213"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub profile"
          title="GitHub"
          className="text-slate-400 transition-colors hover:text-white"
        >
          <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden="true">
            <path d="M12 .75a11.25 11.25 0 0 0-3.56 21.92c.56.1.77-.24.77-.54v-2.1c-3.14.68-3.8-1.33-3.8-1.33-.51-1.3-1.25-1.65-1.25-1.65-1.03-.7.08-.69.08-.69 1.14.08 1.74 1.17 1.74 1.17 1.01 1.73 2.65 1.23 3.3.94.1-.73.4-1.23.72-1.52-2.51-.29-5.15-1.26-5.15-5.6 0-1.24.44-2.25 1.17-3.04-.12-.29-.51-1.44.11-3 0 0 .96-.31 3.09 1.16a10.75 10.75 0 0 1 5.63 0c2.13-1.47 3.08-1.16 3.08-1.16.62 1.56.23 2.71.12 3 .72.79 1.16 1.8 1.16 3.04 0 4.35-2.65 5.3-5.17 5.59.41.35.77 1.04.77 2.1v3.1c0 .3.2.65.78.54A11.25 11.25 0 0 0 12 .75Z" />
          </svg>
        </a>

        <a
          href="https://www.linkedin.com/in/martin-stecenk%C3%B3-83b434381/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn profile"
          title="LinkedIn"
          className="text-slate-400 transition-colors hover:text-[#0A66C2]"
        >
          <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden="true">
            <path d="M20.45 2H3.55A1.55 1.55 0 0 0 2 3.55v16.9A1.55 1.55 0 0 0 3.55 22h16.9A1.55 1.55 0 0 0 22 20.45V3.55A1.55 1.55 0 0 0 20.45 2ZM8 19H5V9h3ZM6.5 7.7a1.75 1.75 0 1 1 0-3.5 1.75 1.75 0 0 1 0 3.5ZM19 19h-3v-4.87c0-1.16-.02-2.65-1.62-2.65-1.62 0-1.87 1.26-1.87 2.57V19h-3V9h2.88v1.37h.04a3.16 3.16 0 0 1 2.85-1.57C18.33 8.8 19 10.76 19 13.3Z" />
          </svg>
        </a>
      </div>
    </footer>
  )
}

export default Footer