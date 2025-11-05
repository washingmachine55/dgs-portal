<?php

namespace App\Exports;

use Carbon\Carbon;
use Inertia\Inertia;
use Carbon\CarbonTimeZone;
use Carbon\CarbonInterface;
use Illuminate\Support\Str;
use Maatwebsite\Excel\Excel;
use Illuminate\Support\Facades\DB;
use App\Models\PlatformTimeTracking;
use Maatwebsite\Excel\Concerns\Exportable;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Illuminate\Contracts\Support\Responsable;
// use Maatwebsite\Excel\Concerns\FromQuery;
use Maatwebsite\Excel\Concerns\FromCollection;

class PlatformTimeTrackingExport implements Responsable, WithHeadings, FromCollection
{
    use Exportable;

    /**
    * It's required to define the fileName within
    * the export class when making use of Responsable.
    */
    // private $fileName = 'tracking-history.xlsx';
    private $fileName = 'tracking-history.csv';

    /**
    * Optional Writer Type
    */
    // private $writerType = Excel::XLSX;
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
            'platform_category',
            'platform_name',
            'date',
            'start_time',
            'end_time',
            'time_difference',
        ];
    }

    /**
    * @return \Illuminate\Support\Collection
    */
    public function collection()
    {
        // return PlatformTimeTracking::query();
        // $queryResult = PlatformTimeTracking::query();

        $tz = new CarbonTimeZone("Asia/Karachi");

        $queryResult = DB::table('platform_time_tracking')
            ->join('platforms', 'platforms.id', '=', 'platform_time_tracking.platform_id', 'inner')
            ->join('platform_categories', 'platforms.platform_categories_id', '=', 'platform_categories.id', 'inner')
            ->select(
                'platform_time_tracking.*',
                'platforms.name as name',
                'platforms.platform_categories_id AS category_id',
                'platform_categories.name AS category')
            ->where('platform_time_tracking.stopped', '=', true )
            ->orderBy('id', 'asc')
            ->get()
            ->map(function ($queryResult) {
                return [
                    'id' => $queryResult->id,
                    'category' => $queryResult->category,
                    'name' => Str::limit($queryResult->name, 40),
                    'date' => Carbon::parse($queryResult->date)->toFormattedDayDateString(),
                    'start_time' => Carbon::parse($queryResult->start_time, "Asia/Karachi")->format(' h:i:s A'),
                    'end_time' => Carbon::parse($queryResult->end_time, "Asia/Karachi")->format(' h:i:s A'),
                    'time_diff' => Carbon::parse($queryResult->end_time, "Asia/Karachi")
                        ->copy()
                        ->from($queryResult->start_time, [
                            'syntax' => CarbonInterface::DIFF_ABSOLUTE,
                            'parts' => 3,
                            'short' => false,
                            'join' => ', ', // join with commas
                        ]),
                ];
            })
        ;

        return $queryResult;
    }
}
