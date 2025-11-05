// import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import { DataTable, DataTableSmall } from '@/components/ui/data-table';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { trackingHistory } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { ColumnDef } from '@tanstack/react-table';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { DownloadIcon, EllipsisVertical, FileDown } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Tracking History',
        href: trackingHistory().url,
    },
];

interface Platform {
    id: number;
    category: number;
    name: string;
    start_time: string;
    end_time: string;
    platform_id: number;
}

export const columns: ColumnDef<Platform>[] = [
    {
        accessorKey: 'id',
        // header: 'ID',
        meta: { label: 'ID' },
        minSize: 30,
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === 'asc')
                    }
                >
                    ID
                </Button>
            );
        },
        cell: ({ row }) => <div className="">{row.getValue('id')}</div>,
    },
    {
        accessorKey: 'category',
        meta: { label: 'CATEGORY' },
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === 'asc')
                    }
                >
                    CATEGORY
                </Button>
            );
        },
        cell: ({ row }) => <div className="">{row.getValue('category')}</div>,
    },
    {
        accessorKey: 'name',
        meta: { label: 'PLATFORM NAME' },
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === 'asc')
                    }
                >
                    PLATFORM NAME
                    {/* <ArrowUpDown /> */}
                </Button>
            );
        },
        cell: ({ row }) => <div className="">{row.getValue('name')}</div>,
    },
    {
        accessorKey: 'date',
        meta: { label: 'DATE' },
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === 'asc')
                    }
                >
                    DATE
                </Button>
            );
        },
        cell: ({ row }) => <div className="">{row.getValue('date')}</div>,
    },
    {
        accessorKey: 'start_time',
        meta: { label: 'START TIME' },
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === 'asc')
                    }
                >
                    START TIME
                </Button>
            );
        },
        cell: ({ row }) => <div className="">{row.getValue('start_time')}</div>,
    },
    {
        accessorKey: 'end_time',
        meta: { label: 'END TIME' },
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === 'asc')
                    }
                >
                    END TIME
                </Button>
            );
        },
        cell: ({ row }) => <div className="">{row.getValue('end_time')}</div>,
    },
    {
        accessorKey: 'time_diff',
        meta: { label: 'SESSION TIME' },
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === 'asc')
                    }
                >
                    SESSION TIME
                </Button>
            );
        },
        cell: ({ row }) => <div className="">{row.getValue('time_diff')}</div>,
    },
];

export default function TrackingHistory() {
    const { props } = usePage<{
        platforms: Platform[];
    }>();

    function getData(): Platform[] {
        return props.platforms;
    }

    const data = getData();

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="fixed top-3.5 right-4 z-50 w-fit p-0 px-0 md:top-[1.3rem] md:right-6">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline">
                                <EllipsisVertical />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                            align="end"
                            className="[--radius:1rem]"
                        >
                            <DropdownMenuGroup>
                                <DropdownMenuItem>
                                    <FileDown />
                                    <a href="/tracking-history/export/">
                                        Export
                                    </a>
                                </DropdownMenuItem>
                            </DropdownMenuGroup>
                            <DropdownMenuSeparator />
                            <DropdownMenuGroup>
                                <DropdownMenuItem variant="default">
                                    <DownloadIcon />
                                    <a href="/tracking-history/export_raw/">
                                        Export (Raw)
                                    </a>
                                </DropdownMenuItem>
                            </DropdownMenuGroup>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
                <div className="relative hidden min-h-[100vh] flex-1 overflow-hidden rounded-xl border border-sidebar-border/70 p-4 md:block md:min-h-min dark:border-sidebar-border">
                    {/* <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" /> */}
                    <DataTable columns={columns} data={data} />
                </div>
                <div className="relative min-h-[100vh] flex-1 overflow-x-scroll rounded-xl border border-sidebar-border/70 p-1 md:hidden md:min-h-min md:overflow-x-hidden dark:border-sidebar-border">
                    <DataTableSmall columns={columns} data={data} />
                </div>
            </div>
        </AppLayout>
    );
}
