<?php

namespace App\Exports;

use App\Models\PlatformTimeTracking;
use Carbon\Carbon;
use Carbon\CarbonTimeZone;
use Carbon\CarbonInterface;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\DB;
use Illuminate\Contracts\Support\Responsable;
use Maatwebsite\Excel\Excel;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\Exportable;
use Maatwebsite\Excel\Concerns\FromCollection;

class PlatformTimeTrackingRawExport implements Responsable, WithHeadings, FromCollection
{
    use Exportable;

    /**
    * It's required to define the fileName within
    * the export class when making use of Responsable.
    */
    private $fileName = 'tracking-history-raw.csv';

    /**
    * Optional Writer Type
    */
    private $writerType = Excel::CSV;

    /**
    * Optional headers
    */
    private $headers = [
        'Content-Type' => 'text/csv',
    ];

    public function headings(): array
    {
        return [
            'id',
            'platform_id',
            'date',
            'games_id',
            'start_time',
            'end_time',
            'stopped',
            'created_at',
            'updated_at',
        ];
    }

    /**
    * @return \Illuminate\Support\Collection
    */
    public function collection()
    {
        return PlatformTimeTracking::all();
    }
}
