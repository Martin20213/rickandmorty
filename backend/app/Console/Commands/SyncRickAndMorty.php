<?php
namespace App\Console\Commands;

use App\Services\RickAndMortySyncService;
use Illuminate\Console\Command;
use Throwable;

class SyncRickAndMorty extends Command
{
    protected $signature = 'rick-and-morty:sync';

    protected $description = 'Sync episodes and characters from Rick and Morty API';

    public function handle(RickAndMortySyncService $syncService): int
    {
        $this->info('Starting Rick and Morty sync...');

        try {
            $result = $syncService->sync();
        } catch (Throwable $exception) {
            report($exception);

            $this->error('Sync failed: ' . $exception->getMessage());

            return self::FAILURE;
        }

        $this->info('Sync completed successfully!');
        $this->info("Episodes processed: {$result['episodes']}");
        $this->info(
            "Character appearances processed: {$result['characters_processed']}"
        );

        return self::SUCCESS;
    }
}
