# Rick and Morty API — Backend

A Laravel-based REST API that imports and stores Rick and Morty episodes and characters from the official Rick and Morty GraphQL API.

The backend provides a paginated episode listing endpoint with search, air date filtering, and sorting. Data is stored locally in a relational database, so frontend requests do not depend on the external API.

## Tech Stack

- **PHP** / Laravel
- **MySQL** — application database
- **SQLite** — isolated automated tests
- **Eloquent ORM** — database models and relationships
- **Laravel HTTP Client** — external GraphQL requests
- **PHPUnit** — automated tests
- **GitHub Actions** — automated testing on pull requests and pushes to `main`

## Architecture

The backend separates external API communication, synchronization logic, database persistence, and HTTP API handling.

```text
Rick and Morty GraphQL API
          |
          v
RickAndMortyClient
          |
          v
RickAndMortySyncService
          |
          v
RickAndMortyImporter
          |
          v
    MySQL Database
          |
          v
    EpisodeController
          |
          v
    EpisodeResource
          |
          v
      React Frontend
```

Data synchronization is triggered explicitly through an Artisan command. The frontend retrieves stored data through the Laravel REST API.

## Requirements

- PHP version compatible with `composer.json`
- Composer
- MySQL
- Node.js is not required for the backend alone

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/Martin20213/rickandmorty.git
cd rickandmorty
```

### 2. Install dependencies

```bash
composer install
```

### 3. Configure environment variables

Copy the example environment file:

**Windows PowerShell**
```powershell
Copy-Item .env.example .env
```

**Linux / macOS**
```bash
cp .env.example .env
```

Generate the application key:

```bash
php artisan key:generate
```

Configure your database credentials in `.env`:

```dotenv
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=rickandmorty
DB_USERNAME=root
DB_PASSWORD=
```

Configure the external API endpoints:

```dotenv
RICK_AND_MORTY_BASE_URL=https://rickandmortyapi.com/api
RICK_AND_MORTY_GRAPHQL_URL=https://rickandmortyapi.com/graphql
```

Create the database specified in your configuration before running migrations.

### 4. Run migrations

```bash
php artisan migrate
```

### 5. Import episodes and characters

```bash
php artisan rick-and-morty:sync
```

This command fetches the available episode pages and persists episodes, characters, and their relationships. Existing records are updated using their external IDs, allowing the synchronization to be run again.

### 6. Start the development server

```bash
php artisan serve
```

The API will be available at:

`http://127.0.0.1:8000`

## API Reference

### `GET /api/episodes`

Returns a paginated list of locally stored episodes.

#### Query parameters

| Parameter | Type | Description |
|---|---|---|
| `search` | string | Search episode names |
| `air_date_from` | date | Filter by earliest air date (`YYYY-MM-DD`) |
| `air_date_to` | date | Filter by latest air date (`YYYY-MM-DD`) |
| `sort_by` | string | Sort by `name`, `air_date`, or `episode_code` |
| `sort_direction` | string | Sort direction: `asc` or `desc` |
| `per_page` | integer | Results per page, from 1 to 100 |
| `page` | integer | Page number |

Default behavior:
- Sort by `air_date` in ascending order.
- Return 10 episodes per page.
- Include Laravel pagination metadata and navigation links.

#### Examples

Get the first page:

```http
GET /api/episodes
```

Search by episode name:

```http
GET /api/episodes?search=Pilot
```

Filter by air date:

```http
GET /api/episodes?air_date_from=2013-12-01&air_date_to=2013-12-31
```

Sort by name:

```http
GET /api/episodes?sort_by=name&sort_direction=asc
```

Change pagination:

```http
GET /api/episodes?per_page=20&page=2
```

Combine filters and sorting:

```http
GET /api/episodes?search=Rick&air_date_from=2014-01-01&sort_by=name&sort_direction=desc&per_page=20
```

#### Response format

```json
{
  "data": [
    {
      "id": 1,
      "name": "Pilot",
      "air_date": "2013-12-02",
      "episode_code": "S01E01"
    }
  ],
  "links": {
    "first": "http://127.0.0.1:8000/api/episodes?page=1",
    "last": "http://127.0.0.1:8000/api/episodes?page=6",
    "prev": null,
    "next": "http://127.0.0.1:8000/api/episodes?page=2"
  },
  "meta": {
    "current_page": 1,
    "per_page": 10,
    "total": 51
  }
}
```

The example is abbreviated; Laravel includes additional pagination metadata and links in the actual response.

Invalid query parameters return a validation error response.

## Testing

The project includes feature tests for the episode listing endpoint, including pagination, name search, air date filtering, and invalid pagination parameters.

Run the test suite:

```bash
php artisan test
```

Tests use an in-memory SQLite database configured in `phpunit.xml`, keeping test data isolated from the development database.

GitHub Actions automatically runs the test suite for pull requests targeting `main` and pushes to `main`, once the workflow is configured in the repository.

## Project Structure

```text
app/
├── Clients/
│   └── RickAndMortyClient.php
├── Console/
│   └── Commands/
│       └── SyncRickAndMorty.php
├── Http/
│   ├── Controllers/
│   │   └── Api/
│   │       └── EpisodeController.php
│   ├── Requests/
│   │   └── EpisodeIndexRequest.php
│   └── Resources/
│       └── EpisodeResource.php
├── Models/
│   ├── Episode.php
│   └── Character.php
└── Services/
    ├── RickAndMortyImporter.php
    └── RickAndMortySyncService.php
```

## External API

Data source: [Rick and Morty API](https://rickandmortyapi.com/)

- [GraphQL API](https://rickandmortyapi.com/graphql)
- [API Documentation](https://rickandmortyapi.com/documentation)

## License

Created as part of a full-stack developer technical assignment.