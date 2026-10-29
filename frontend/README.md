# Rick and Morty Episode Explorer — Frontend

A responsive web application for browsing, filtering, sorting, and navigating Rick and Morty episodes. Built with React and TypeScript, using a Laravel backend to retrieve episode data.

## Tech Stack

- **React** — component-based user interface
- **TypeScript** — static typing
- **Vite** — development server and build tooling
- **Tailwind CSS v4** — utility-first styling
- **Motion** — UI animations
- **Fetch API** — communication with the backend REST API

## Features

- **Episode listing** — displays episode names, air dates, and episode codes in a table.
- **Search** — filter episodes by name, with a short debounce to avoid unnecessary requests.
- **Date filtering** — filter episodes by an air-date range (from/to).
- **Sorting** — sort episodes by name or air date in ascending or descending order.
- **Pagination** — navigate between pages and select the number of episodes displayed per page.
- **Loading and error states** — provides loading feedback, preserves the current table while refreshing, and allows retrying failed requests.
- **Responsive UI** — adapts the layout to different screen sizes.

## Project Structure

```text
frontend/
├── src/
│   ├── api/
│   │   └── episodes.ts       # Backend API requests
│   ├── components/
│   │   ├── EpisodeFilters.tsx
│   │   ├── EpisodeTable.tsx
│   │   ├── PageHeader.tsx
│   │   └── Pagination.tsx
│   ├── hooks/
│   │   └── useEpisodes.ts    # Data fetching and filter state
│   ├── types/
│   │   └── episode.ts        # TypeScript interfaces
│   ├── App.tsx
│   └── index.css
├── index.html
├── package.json
├── tsconfig.json
└── vite.config.ts
```

## Prerequisites

- Node.js and npm
- The Laravel backend running locally at `http://127.0.0.1:8000`

## Getting Started

### 1. Install dependencies

From the frontend directory:

```bash
npm install
```

### 2. Start the backend

Follow the setup instructions in the backend README and make sure the Laravel API is available at:

```text
http://127.0.0.1:8000
```

### 3. Start the frontend development server

```bash
npm run dev
```

Vite will display the local development URL in the terminal, typically `http://localhost:5173`.

### 4. Build for production

```bash
npm run build
```

The production build is generated in the `dist/` directory.

To preview the production build locally:

```bash
npm run preview
```

## API Integration

The frontend communicates with the Laravel backend through the `/api` path. During development, Vite proxies these requests to `http://127.0.0.1:8000`.

The episode listing uses:

```http
GET /api/episodes
```

Supported query parameters:

| Parameter | Description |
|---|---|
| `page` | Current page number |
| `per_page` | Number of episodes per page |
| `search` | Filter by episode name |
| `air_date_from` | Start of the air-date range |
| `air_date_to` | End of the air-date range |
| `sort_by` | Sorting field: `name` or `air_date` |
| `sort_direction` | Sort direction: `asc` or `desc` |

Example request:

```http
GET /api/episodes?page=1&per_page=10&sort_by=air_date&sort_direction=desc
```

The API returns a paginated response containing the episode data, pagination links, and metadata.

## Development Notes

- API requests and response types are separated from UI components.
- `useEpisodes` manages fetching, filtering, sorting, pagination, loading states, and errors.
- Components are organized by responsibility to keep the application maintainable.
- The backend is responsible for filtering, sorting, and pagination; the frontend sends the corresponding query parameters.

## License

This project was created for development and demonstration purposes. Rick and Morty is owned by its respective rights holders.