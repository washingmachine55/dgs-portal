import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
// import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import { StopTimer } from '@/components/timer-button';
import AppLayout from '@/layouts/app-layout';
import { platformTracking } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Head, usePoll } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Platform Tracking',
        href: platformTracking().url,
    },
];

interface Category {
    id: number;
    name: string;
}

interface Platform {
    id: number;
    category: number;
    name: string;
    start_time: string;
    platform_id: number;
    // manufacturer: string;
}

interface RunningTime {
    id: number;
    category: number;
    name: string;
    start_time: Date;
    // manufacturer: string;
}

interface Game {
    id: number;
    name: string;
}

interface PlatformLayoutProps {
    categories: Category[];
    platforms: Platform[];
    runningTimes: RunningTime[];
    games: Game[];
}

export default function PlatformTracking({
    categories,
    platforms,
    // runningTimes,
    // games,
}: PlatformLayoutProps) {
    usePoll(1000); // temporarily stopping the automatic fetching
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Platform Tracking" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                {categories.map((category) => {
                    // Filter platforms that belong to this category
                    const categoryPlatforms = platforms.filter(
                        (p) => p.category === category.id,
                    );

                    return (
                        <div
                            key={category.id}
                            className="relative max-h-max flex-1 overflow-hidden rounded-xl border border-sidebar-border/70 md:min-h-min dark:border-sidebar-border"
                        >
                            <h2 className="m-4 text-xl font-semibold">
                                {category.name}
                            </h2>
                            <div className="m-4 grid rounded-xl border border-sidebar-border/70 p-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 dark:border-sidebar-border">
                                {categoryPlatforms.length > 0 ? (
                                    categoryPlatforms.map((platform) => (
                                        <Card className="" key={platform.id}>
                                            <CardHeader>
                                                <CardTitle>
                                                    {platform.name}
                                                </CardTitle>
                                                <CardDescription>
                                                    Start Tracking Time for
                                                    Platform {platform.name}
                                                </CardDescription>
                                            </CardHeader>
                                            <CardContent>
                                                <p>
                                                    <b>Start Time:</b>
                                                </p>
                                                <p className="text-xs">
                                                    {platform.start_time}
                                                </p>
                                            </CardContent>
                                            <CardFooter>
                                                <StopTimer
                                                    id={platform.id}
                                                    // category={platform.category}
                                                    name={platform.name}
                                                />
                                            </CardFooter>
                                        </Card>
                                    ))
                                ) : (
                                    <p className="text-center text-sm text-muted-foreground">
                                        No platforms with a timer running in
                                        this category.
                                    </p>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </AppLayout>
    );
}
