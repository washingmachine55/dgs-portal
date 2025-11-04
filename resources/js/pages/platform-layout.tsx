import PlatformsController from '@/actions/App/Http/Controllers/PlatformsController';
import DeletePlatform from '@/components/delete-platform';
import InputError from '@/components/input-error';
import { StartTimer } from '@/components/timer-button';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
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
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
// import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
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
import { Form, Head, usePoll } from '@inertiajs/react';
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
    category: number;
    name: string;
    manufacturer: string;
    is_running?: boolean;
}

interface PlatformLayoutProps {
    categories: Category[];
    platforms: Platform[];
}

export default function PlatformLayout({
    categories,
    platforms,
}: PlatformLayoutProps) {
    usePoll(1000); // automatic fetching every 1s (1000ms)
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Platform Layout" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <Card className="fixed top-1 right-2 z-50 w-fit p-0 px-0 md:top-[0.8rem] md:right-4">
                    <CardContent className="p-0">
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button
                                    variant="positive"
                                    className="min-w-max bg-green-600 text-background hover:bg-green-600/90 focus-visible:ring-destructive/20 dark:bg-green-700 hover:dark:bg-green-700/90 dark:focus-visible:ring-destructive/40"
                                >
                                    Create New
                                    <PlusIcon />
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
                                                    Fill up the form below to
                                                    add a new platform to your
                                                    list.
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
                                                        message={errors.name}
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
                {categories.map((category) => {
                    // Filter platforms that belong to this category
                    const categoryPlatforms = platforms.filter(
                        (p) => p.category === category.id,
                    );

                    return (
                        <div
                            key={category.id}
                            className="relative max-h-max flex-1 overflow-clip rounded-xl border border-sidebar-border/70 md:min-h-min dark:border-sidebar-border"
                        >
                            <h2 className="m-4 text-xl font-semibold">
                                {category.name}
                            </h2>
                            <div className="m-4 grid rounded-xl border border-sidebar-border/70 p-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 dark:border-sidebar-border">
                                {categoryPlatforms.length > 0 ? (
                                    categoryPlatforms.map((platform) => (
                                        <Card key={platform.id}>
                                            <CardHeader>
                                                <div className="inline-flex items-center justify-between">
                                                    <CardTitle>
                                                        <p key={platform.id}>
                                                            {platform.name}
                                                        </p>
                                                    </CardTitle>
                                                    <DeletePlatform
                                                        id={platform.id}
                                                        category={category.name}
                                                        name={platform.name}
                                                    />
                                                </div>
                                            </CardHeader>
                                            <CardContent>
                                                <p className="text-sm">
                                                    <b>Manufacturer:</b>{' '}
                                                    <p className="text-xs">
                                                        {platform.manufacturer}
                                                    </p>
                                                </p>
                                            </CardContent>
                                            <CardFooter className="w-full">
                                                {/*  */}
                                                {/* <StartTimer
                                                    id={platform.id}
                                                    // category={platform.category}
                                                    // name={platform.name}
                                                /> */}
                                                {!platform.is_running ? (
                                                    <StartTimer
                                                        id={platform.id}
                                                        // name={platform.name}
                                                    />
                                                ) : (
                                                    <StartTimer
                                                        id={platform.id}
                                                        // name={platform.name}
                                                        disabled
                                                    />
                                                )}
                                            </CardFooter>
                                        </Card>
                                    ))
                                ) : (
                                    <p className="pl-2 text-sm text-muted-foreground">
                                        No platforms in this category.
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
