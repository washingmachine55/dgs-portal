import PlatformTimeTrackingController from '@/actions/App/Http/Controllers/PlatformTimeTrackingController';
import { Button } from '@/components/ui/button';
import { Form } from '@inertiajs/react';
// import { useRef } from 'react';

interface DeletePlatformProps {
    id: number;
    // name: string;
    disabled?: boolean;
}

export function StartTimer({ id, disabled }: DeletePlatformProps) {
    // export default function StartTimer() {
    // const passwordInput = useRef<HTMLInputElement>(null);
    return (
        <Form
            {...PlatformTimeTrackingController.create.form(id)}
            options={{
                preserveScroll: true,
            }}
            // onError={() => passwordInput.current?.focus()}
            resetOnSuccess
            className="w-full space-y-6"
        >
            <Button
                type="submit"
                variant="default"
                className="w-full"
                data-test="start-timer-button"
                disabled={disabled}
            >
                Start Timer
            </Button>
        </Form>
    );
}

export function StopTimer({ id }: DeletePlatformProps) {
// export default function StartTimer() {
    // const passwordInput = useRef<HTMLInputElement>(null);
    return (
        <Form
            {...PlatformTimeTrackingController.update.form(id)}
            options={{
                preserveScroll: true,
            }}
            // onError={() => passwordInput.current?.focus()}
            resetOnSuccess
            className="w-full space-y-6"
        >
            <Button
                type="submit"
                variant="destructive"
                className="w-full"
                data-test="start-timer-button"
            >
                Stop Timer
            </Button>
        </Form>
    );
}
