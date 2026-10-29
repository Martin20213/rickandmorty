<?php

namespace App\Clients;

use Illuminate\Support\Facades\Http;

class RickAndMortyClient
{
    private string $graphqlUrl;

    public function __construct()
    {
        $this->graphqlUrl = config('services.rick_and_morty.graphql_url');
    }

    public function query(string $query): array
    {
        $response = Http::acceptJson()
            ->timeout(15)
            ->post($this->graphqlUrl, [
                'query' => $query,
            ]);

        $response->throw();

        $data = $response->json();

        if (isset($data['errors'])) {
            throw new \RuntimeException(
                'Rick and Morty GraphQL query failed.'
            );
        }

        return $data['data'] ?? [];
    }
}