import { Card, CardContent } from '@/components/ui/card';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Icon } from '@/components/ui/icon';
import { platformLayout } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Form, Head } from '@inertiajs/react';
import { PlusIcon } from 'lucide-react';
import platforms from '@/routes/platforms';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

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
                    <Form {...platforms.store.form()}>
                        <Card className="w-fit">
                            <CardContent>
                                <Dialog>
                                    <DialogTrigger asChild>
                                        <Button
                                            variant="secondary"
                                            className="min-w-max"
                                        >
                                            <Icon iconNode={PlusIcon} />
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent>
                                        <DialogHeader>
                                            <DialogTitle>
                                                Add a new platform
                                            </DialogTitle>
                                            <DialogDescription>
                                                This action cannot be undone.
                                                This will permanently delete
                                                your account and remove your
                                                data from our servers.
                                            </DialogDescription>
                                        </DialogHeader>
                                        <div className="grid gap-4">
                                            <div className="grid gap-3">
                                                <Label htmlFor="category-1">
                                                    Category*
                                                </Label>
                                                <Select>
                                                    <SelectTrigger className="w-full">
                                                        <SelectValue placeholder="Select a gaming platform" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectGroup>
                                                            <SelectLabel>
                                                                Gaming Platforms
                                                            </SelectLabel>
                                                            <SelectItem value="PS5">
                                                                PlayStation 5
                                                            </SelectItem>
                                                            <SelectItem value="XBOX">
                                                                Xbox Series X
                                                            </SelectItem>
                                                            <SelectItem value="gaming-pc-200hz">
                                                                Gaming PC -200Hz
                                                            </SelectItem>
                                                            <SelectItem value="gaming-pc-188hz">
                                                                Gaming PC -
                                                                188Hz
                                                            </SelectItem>
                                                            <SelectItem value="racing-simulator">
                                                                Racing Simulator
                                                            </SelectItem>
                                                        </SelectGroup>
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                            <div className="grid gap-3">
                                                <Label htmlFor="name-1">
                                                    Name*
                                                </Label>
                                                <Input
                                                    id="name-1"
                                                    name="name"
                                                    required
                                                    placeholder="Enter the gaming platform's name (eg. PS5 - #1 )"
                                                />
                                            </div>
                                            <div className="grid gap-3">
                                                <Label htmlFor="manufacturer-1">
                                                    Manufacturer/Vendor
                                                </Label>
                                                <Input
                                                    id="manufacturer-1"
                                                    name="manufacturer"
                                                    defaultValue="N/A"
                                                    placeholder="Optionally enter the platform's manufacturer or vendor"
                                                />
                                            </div>
                                        </div>
                                        <DialogFooter>
                                            <DialogClose asChild>
                                                <Button variant="outline">
                                                    Cancel
                                                </Button>
                                            </DialogClose>
                                            <Button type="submit">
                                                Save changes
                                            </Button>
                                        </DialogFooter>
                                    </DialogContent>
                                </Dialog>
                            </CardContent>
                        </Card>
                    </Form>
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
