import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
// import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { platformTracking } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Platform Tracking',
        href: platformTracking().url,
    },
];

export default function PlatformTracking() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Platform Tracking" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="relative max-h-max flex-1 overflow-hidden rounded-xl border border-sidebar-border/70 md:min-h-min dark:border-sidebar-border">
                    <h2 className="m-4 text-xl font-semibold">PS5's</h2>
                    <div className="m-4 p-2 grid rounded-xl border border-sidebar-border/70 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 dark:border-sidebar-border">
                        <Card className="">
                            <CardHeader>
                                <CardTitle>Platform (n)</CardTitle>
                                <CardDescription>
                                    Start Tracking Time for Platform (n)
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <p>Empty if no time is running</p>
                            </CardContent>
                            <CardFooter>
                                <Button variant="default" className="w-full">
                                    Start
                                </Button>
                            </CardFooter>
                        </Card>
                        <Card className="">
                            <CardHeader>
                                <CardTitle>Platform (n)</CardTitle>
                                <CardDescription>
                                    Start Tracking Time for Platform (n)
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <p>Current Time if exists</p>
                            </CardContent>
                            <CardFooter className="space-x-2">
                                <Button variant="outline" className="w-full">
                                    Pause
                                </Button>
                                <Button
                                    variant="destructive"
                                    className="w-full"
                                >
                                    Stop
                                </Button>
                            </CardFooter>
                        </Card>
                    </div>
                </div>
                <div className="relative max-h-max flex-1 overflow-hidden rounded-xl border border-sidebar-border/70 md:min-h-min dark:border-sidebar-border">
                    <h2 className="m-4 text-xl font-semibold">
                        Gaming Computers
                    </h2>
                    <div className="m-4 p-2 grid auto-rows-min gap-0 rounded-xl border border-sidebar-border/70 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 dark:border-sidebar-border">
                        <Card className="">
                            <CardHeader>
                                <CardTitle>Platform (n)</CardTitle>
                                <CardDescription>
                                    Start Tracking Time for Platform (n)
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <p>Empty if no time is running</p>
                            </CardContent>
                            <CardFooter>
                                <Button variant="default" className="w-full">
                                    Start
                                </Button>
                            </CardFooter>
                        </Card>
                        <Card className="">
                            <CardHeader>
                                <CardTitle>Platform (n)</CardTitle>
                                <CardDescription>
                                    Start Tracking Time for Platform (n)
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <p>Current Time if exists</p>
                            </CardContent>
                            <CardFooter className="space-x-2">
                                <Button variant="outline" className="w-full">
                                    Pause
                                </Button>
                                <Button
                                    variant="destructive"
                                    className="w-full"
                                >
                                    Stop
                                </Button>
                            </CardFooter>
                        </Card>
                        <Card className="">
                            <CardHeader>
                                <CardTitle>Platform (n)</CardTitle>
                                <CardDescription>
                                    Start Tracking Time for Platform (n)
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <p>Empty if no time is running</p>
                            </CardContent>
                            <CardFooter>
                                <Button variant="default" className="w-full">
                                    Start
                                </Button>
                            </CardFooter>
                        </Card>
                        <Card className="">
                            <CardHeader>
                                <CardTitle>Platform (n)</CardTitle>
                                <CardDescription>
                                    Start Tracking Time for Platform (n)
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <p>Current Time if exists</p>
                            </CardContent>
                            <CardFooter className="space-x-2">
                                <Button variant="outline" className="w-full">
                                    Pause
                                </Button>
                                <Button
                                    variant="destructive"
                                    className="w-full"
                                >
                                    Stop
                                </Button>
                            </CardFooter>
                        </Card>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
