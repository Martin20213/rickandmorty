<?php
namespace Tests\Feature\Api;

use App\Models\Episode;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class EpisodeIndexTest extends TestCase
{
    use RefreshDatabase;

    public function test_episodes_are_returned_with_pagination(): void
    {
        Episode::create([
            'external_id' => 1,
            'name' => 'Pilot',
            'air_date' => '2013-12-02',
            'episode_code' => 'S01E01',
        ]);

        $response = $this->getJson('/api/episodes');

        $response
            ->assertOk()
            ->assertJsonPath('data.0.name', 'Pilot')
            ->assertJsonPath('data.0.air_date', '2013-12-02')
            ->assertJsonPath('meta.total', 1)
            ->assertJsonPath('meta.per_page', 10);
    }

    public function test_episodes_can_be_searched_by_name(): void
    {
        Episode::create([
            'external_id' => 1,
            'name' => 'Pilot',
            'air_date' => '2013-12-02',
            'episode_code' => 'S01E01',
        ]);

        Episode::create([
            'external_id' => 2,
            'name' => 'Lawnmower Dog',
            'air_date' => '2013-12-09',
            'episode_code' => 'S01E02',
        ]);

        $response = $this->getJson('/api/episodes?search=Pilot');

        $response
            ->assertOk()
            ->assertJsonCount(1, 'data')
            ->assertJsonPath('data.0.name', 'Pilot');
    }

    public function test_episodes_can_be_filtered_by_air_date(): void
    {
        Episode::create([
            'external_id' => 1,
            'name' => 'Pilot',
            'air_date' => '2013-12-02',
            'episode_code' => 'S01E01',
        ]);

        Episode::create([
            'external_id' => 2,
            'name' => 'Lawnmower Dog',
            'air_date' => '2013-12-09',
            'episode_code' => 'S01E02',
        ]);

        Episode::create([
            'external_id' => 3,
            'name' => 'Anatomy Park',
            'air_date' => '2013-12-16',
            'episode_code' => 'S01E03',
        ]);

        $response = $this->getJson(
            '/api/episodes?air_date_from=2013-12-05&air_date_to=2013-12-12'
        );

        $response
            ->assertOk()
            ->assertJsonCount(1, 'data')
            ->assertJsonPath('data.0.name', 'Lawnmower Dog');
    }

    public function test_invalid_per_page_returns_validation_error(): void
    {
        $response = $this->getJson('/api/episodes?per_page=500');

        $response
            ->assertUnprocessable()
            ->assertJsonValidationErrors(['per_page']);
    }
}
