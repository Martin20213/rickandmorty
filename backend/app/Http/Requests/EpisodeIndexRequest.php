<?php
namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class EpisodeIndexRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'search' => ['nullable', 'string', 'max:255'],
            'air_date_from' => ['nullable', 'date_format:Y-m-d'],
            'air_date_to' => [
                'nullable',
                'date_format:Y-m-d',
                'after_or_equal:air_date_from',
            ],
            'sort_by' => [
                'nullable',
                'in:name,air_date,episode_code',
            ],
            'sort_direction' => [
                'nullable',
                'in:asc,desc',
            ],
            'per_page' => [
                'nullable',
                'integer',
                'min:1',
                'max:100',
            ],
        ];
    }
}
