<?php

namespace App\Services;

use App\Models\Character;
use App\Models\Episode;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;

class RickAndMortyImporterService
{
    public function importEpisode(array $episodeData): int
    {
        return DB::transaction(function () use ($episodeData): int {
            $episode = $this->saveEpisode($episodeData);
            $characterIds = [];
            $characterCount = 0;

            foreach ($episodeData['characters'] as $characterData) {
                $character = $this->saveCharacter($characterData);

                $characterIds[] = $character->id;
                $characterCount++;
            }

            $episode->characters()->sync($characterIds);

            return $characterCount;
        });
    }

    private function saveEpisode(array $data): Episode
    {
        return Episode::updateOrCreate(
            ['external_id' => (int) $data['id']],
            [
                'name' => $data['name'],
                'air_date' => Carbon::parse(
                    $data['air_date']
                )->toDateString(),
                'episode_code' => $data['episode'],
            ]
        );
    }

    private function saveCharacter(array $data): Character
    {
        return Character::updateOrCreate(
            ['external_id' => (int) $data['id']],
            [
                'name' => $data['name'],
                'status' => $data['status'] ?? null,
                'species' => $data['species'] ?? null,
                'type' => $data['type'] ?? null,
                'gender' => $data['gender'] ?? null,
                'image' => $data['image'] ?? null,
                'origin_name' => $data['origin']['name'] ?? null,
                'location_name' => $data['location']['name'] ?? null,
            ]
        );
    }
}