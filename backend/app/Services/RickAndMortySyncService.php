<?php

namespace App\Services;

use App\Clients\RickAndMortyClient;
use RuntimeException;

class RickAndMortySyncService
{
    public function __construct(
        private RickAndMortyClient $client,
        private RickAndMortyImporterService $importer,
    ) {}

    public function sync(): array
    {
        $page = 1;
        $pages = 1;
        $episodeCount = 0;
        $characterCount = 0;

        while ($page <= $pages) {
            $result = $this->fetchEpisodesPage($page);

            $pages = (int) $result['info']['pages'];

            foreach ($result['results'] as $episodeData) {
                $characterCount += $this->importer
                    ->importEpisode($episodeData);

                $episodeCount++;
            }

            $page++;
        }

        return [
            'episodes' => $episodeCount,
            'characters_processed' => $characterCount,
        ];
    }

    private function fetchEpisodesPage(int $page): array
    {
        $query = <<<GRAPHQL
            query {
                episodes(page: {$page}) {
                    info {
                        pages
                    }
                    results {
                        id
                        name
                        air_date
                        episode
                        characters {
                            id
                            name
                            status
                            species
                            type
                            gender
                            image
                            origin {
                                name
                            }
                            location {
                                name
                            }
                        }
                    }
                }
            }
            GRAPHQL;

        $data = $this->client->query($query);
        $result = $data['episodes'] ?? null;

        if (!is_array($result) || !isset($result['info']['pages'])) {
            throw new RuntimeException(
                'Invalid episode response from Rick and Morty API.'
            );
        }

        return $result;
    }
}