import { Card, CardContent } from '@/components/ui/card';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { platformLayout } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { PlusIcon } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Platform Layout',
        href: platformLayout().url,
    },
];

export default function PlatformLayout() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Platform Layout" />
            <div className="flex h-full flex-1 gap-4 overflow-x-auto rounded-xl p-4">
                <div className="relative flex-1 flex-col overflow-hidden rounded-xl border border-sidebar-border/70 md:min-h-min dark:border-sidebar-border">
                    <Card className="w-fit">
                        <CardContent>
                            <Button variant="secondary" className="min-w-max">
                                <Icon iconNode={PlusIcon} />
                            </Button>
                        </CardContent>
                    </Card>
                </div>
                <div className="relative flex-1 flex-col overflow-hidden rounded-xl border border-sidebar-border/70 md:min-h-min dark:border-sidebar-border">
                    <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                </div>
                <div className="relative flex-1 flex-col overflow-hidden rounded-xl border border-sidebar-border/70 md:min-h-min dark:border-sidebar-border">
                    <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                </div>
            </div>
        </AppLayout>
    );
}
