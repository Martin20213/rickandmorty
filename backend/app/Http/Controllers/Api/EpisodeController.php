<?php
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\EpisodeIndexRequest;
use App\Models\Episode;
use Illuminate\Database\Eloquent\Builder;

class EpisodeController extends Controller
{
    public function index(EpisodeIndexRequest $request)
    {
        $filters = $request->validated();

        $episodes = Episode::query()
            ->when(
                $filters['search'] ?? null,
                fn (Builder $query, string $search) =>
                    $query->where('name', 'like', "%{$search}%")
            )
            ->when(
                $filters['air_date_from'] ?? null,
                fn (Builder $query, string $date) =>
                    $query->whereDate('air_date', '>=', $date)
            )
            ->when(
                $filters['air_date_to'] ?? null,
                fn (Builder $query, string $date) =>
                    $query->whereDate('air_date', '<=', $date)
            )
            ->orderBy(
                $filters['sort_by'] ?? 'air_date',
                $filters['sort_direction'] ?? 'asc'
            )
            ->paginate($filters['per_page'] ?? 10)
            ->withQueryString();

        return response()->json($episodes);
    }
}
