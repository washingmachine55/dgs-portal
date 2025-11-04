import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard().url,
    },
];

export default function Dashboard() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="relative min-h-[80vh] flex-1 overflow-hidden rounded-xl border border-sidebar-border/70 md:min-h-min lg:min-h-[50vh] dark:border-sidebar-border">
                    {/* <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" /> */}
                    <div className="m-8 md:m-20">
                        <h1 className="pb-4 text-6xl md:text-7xl">Guide:</h1>
                        <ul className="text-md list-disc pl-2 md:list-inside">
                            <li>
                                Use the platform layout page to create a gaming
                                platform listing
                            </li>
                            <li>
                                Once a listing has been created, use the
                                Platform Layout page to start the timer
                            </li>
                            <li>
                                Timer runs indefinitely unless stopped from the
                                Platform Tracking page
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="hidden auto-rows-min gap-4 md:grid md:grid-cols-3">
                    <div className="relative aspect-video content-center overflow-hidden rounded-xl border border-sidebar-border/70 text-center dark:border-sidebar-border">
                        <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                    </div>
                    <div className="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
                        <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                    </div>
                    <div className="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
                        <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
