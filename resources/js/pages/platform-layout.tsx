import PlatformsController from '@/actions/App/Http/Controllers/PlatformsController';
import DeletePlatform from '@/components/delete-platform';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
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
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import AppLayout from '@/layouts/app-layout';
import { platformLayout } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Transition } from '@headlessui/react';
import { Form, Head } from '@inertiajs/react';
import { PlusIcon } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Platform Layout',
        href: platformLayout().url,
    },
];

interface Category {
    id: number;
    name: string;
}
interface Platform {
    id: number;
    category: string;
    name: string;
    manufacturer: string;
}

interface PlatformLayoutProps {
    categories: Category[];
    platforms: Platform[];
}

export default function PlatformLayout({
    categories,
    platforms,
}: PlatformLayoutProps) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Platform Layout" />
            <div className="flex h-full flex-1 gap-4 overflow-x-auto rounded-xl p-4">
                <div className="relative flex-1 flex-col overflow-hidden rounded-xl border border-sidebar-border/70 md:min-h-min dark:border-sidebar-border">
                    {platforms &&
                        platforms.map((platform) => (
                            <Card className="" key={platform.id}>
                                <CardHeader>
                                    <CardTitle>
                                        <p key={platform.id}>{platform.name}</p>
                                    </CardTitle>
                                    <CardDescription>
                                        <b>Manufacturer:</b>{' '}
                                        {platform.manufacturer}
                                        <br></br>
                                        <b>Category:</b> {platform.category}
                                    </CardDescription>
                                </CardHeader>
                                <CardFooter className="w-full">
                                    {/*  */}
                                    <DeletePlatform
                                        id={platform.id}
                                        category={platform.category}
                                        name={platform.name}
                                    />
                                    {/* <DeletePlatform /> */}
                                </CardFooter>
                            </Card>
                        ))}
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
                                    <Form {...PlatformsController.store.form()}>
                                        {({
                                            processing,
                                            recentlySuccessful,
                                            errors,
                                        }) => (
                                            <>
                                                <DialogHeader>
                                                    <DialogTitle>
                                                        Add a new platform
                                                    </DialogTitle>
                                                    <DialogDescription>
                                                        This action cannot be
                                                        undone. This will
                                                        permanently delete your
                                                        account and remove your
                                                        data from our servers.
                                                    </DialogDescription>
                                                </DialogHeader>
                                                <div className="my-4 grid gap-4">
                                                    <div className="grid gap-3">
                                                        <Label htmlFor="category-1">
                                                            Category*
                                                        </Label>
                                                        <Select name="category">
                                                            <SelectTrigger className="w-full">
                                                                <SelectValue placeholder="Select a gaming platform" />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                <SelectGroup>
                                                                    <SelectLabel>
                                                                        Gaming
                                                                        Platforms
                                                                    </SelectLabel>
                                                                    {categories &&
                                                                        categories.map(
                                                                            (
                                                                                category,
                                                                            ) => (
                                                                                <SelectItem
                                                                                    key={
                                                                                        category.id
                                                                                    }
                                                                                    value={category.id.toString()}
                                                                                >
                                                                                    {
                                                                                        category.name
                                                                                    }
                                                                                </SelectItem>
                                                                            ),
                                                                        )}
                                                                </SelectGroup>
                                                            </SelectContent>
                                                        </Select>
                                                        <InputError
                                                            className="mt-2"
                                                            message={
                                                                errors.category
                                                            }
                                                        />
                                                    </div>
                                                    <div className="grid gap-3">
                                                        <Label htmlFor="name-1">
                                                            Name*
                                                        </Label>
                                                        <Input
                                                            id="name-1"
                                                            name="name"
                                                            placeholder="Enter the gaming platform's name (eg. PS5 - #1 )"
                                                        />
                                                        <InputError
                                                            className="mt-2"
                                                            message={
                                                                errors.name
                                                            }
                                                        />
                                                    </div>
                                                    <div className="grid gap-3">
                                                        <Label htmlFor="manufacturer-1">
                                                            Manufacturer/Vendor
                                                        </Label>
                                                        <Input
                                                            id="manufacturer-1"
                                                            name="manufacturer"
                                                            placeholder="Optionally enter the platform's manufacturer or vendor"
                                                            // placeholder="N/A"
                                                        />
                                                    </div>
                                                </div>
                                                <DialogFooter>
                                                    <DialogClose asChild>
                                                        <Button variant="outline">
                                                            Cancel
                                                        </Button>
                                                    </DialogClose>
                                                    <Button
                                                        type="submit"
                                                        disabled={processing}
                                                    >
                                                        Save changes
                                                    </Button>
                                                </DialogFooter>
                                                <Transition
                                                    show={recentlySuccessful}
                                                    enter="transition ease-in-out"
                                                    enterFrom="opacity-0"
                                                    leave="transition ease-in-out"
                                                    leaveTo="opacity-0"
                                                >
                                                    <p className="mt-4 place-self-center text-sm text-neutral-600">
                                                        Saved
                                                    </p>
                                                </Transition>
                                            </>
                                        )}
                                    </Form>
                                </DialogContent>
                            </Dialog>
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
