<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Character extends Model
{
    protected $fillable = [
        'external_id',
        'name',
        'status',
        'species',
        'type',
        'gender',
        'origin_name',
        'origin_url',
        'location_name',
        'location_url',
        'image',
    ];

    public function episodes(): BelongsToMany
    {
        return $this->belongsToMany(
            Episode::class,
            'character_episode'
        );
    }
}
