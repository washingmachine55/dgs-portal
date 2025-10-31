import PlatformsController from '@/actions/App/Http/Controllers/PlatformsController';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Form } from '@inertiajs/react';
// import { useRef } from 'react';

interface DeletePlatformProps {
    id: number;
    category: string;
    name: string;
}

export default function DeletePlatform({ id, category, name }: DeletePlatformProps) {
    // const passwordInput = useRef<HTMLInputElement>(null);

    return (
        <div className="w-full">
            <Dialog>
                <DialogTrigger asChild>
                    <Button
                        variant="destructive"
                        className="w-full"
                        data-test="delete-user-button"
                    >
                        Delete Platform
                    </Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogTitle>
                        Are you sure you want to delete this platform?
                    </DialogTitle>
                    <DialogDescription>
                        Once this platform is deleted, all of its resources and
                        data will also be permanently deleted. Please confirm if
                        you would like to permanently delete
                        this platform.
                    </DialogDescription>
                    <div>
                        <p>
                            <b>Platform ID:</b> {id}
                        </p>
                        <p><b>Platform Name:</b> {name}</p>
                        <p><b>Platform:</b> {category}</p>
                    </div>

                    <Form
                        // {...ProfileController.destroy.form()}
                        {...PlatformsController.destroy.form(id)}
                        // {...PlatformsController.destroy.form({platformId.toString()})}
                        options={{
                            preserveScroll: true,
                        }}
                        // onError={() => passwordInput.current?.focus()}
                        resetOnSuccess
                        className="space-y-6"
                    >
                        {({ resetAndClearErrors, processing }) => (
                            <>
                                {/* <div className="grid gap-2">
                                    <Label
                                        htmlFor="password"
                                        className="sr-only"
                                    >
                                        Password
                                    </Label>

                                    <Input
                                        id="password"
                                        type="password"
                                        name="password"
                                        ref={passwordInput}
                                        placeholder="Password"
                                        autoComplete="current-password"
                                    />

                                    <InputError message={errors.password} />
                                </div> */}

                                <DialogFooter className="gap-2">
                                    <DialogClose asChild>
                                        <Button
                                            variant="secondary"
                                            onClick={() =>
                                                resetAndClearErrors()
                                            }
                                        >
                                            Cancel
                                        </Button>
                                    </DialogClose>

                                    <Button
                                        variant="destructive"
                                        disabled={processing}
                                        asChild
                                    >
                                        <button
                                            type="submit"
                                            // data-test="confirm-delete-user-button"
                                        >
                                            Delete Platfornm
                                        </button>
                                    </Button>
                                </DialogFooter>
                            </>
                        )}
                    </Form>
                </DialogContent>
            </Dialog>
        </div>
    );
}
