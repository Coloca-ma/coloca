import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useForm } from '@inertiajs/react';
import React from 'react';

interface FormData {
    user_id: string;
    annonce_id: string;
    status: string;
    start_date: string;
    end_date: string;
    [key: string]: string;
}

interface Reservation {
    user_id: string;
    annonce_id: string;
    status: string;
    start_date: string;
    end_date: string;
}

interface Props {
    reservation: Reservation;
    reservations?: Reservation[];
    type?: string;
}

export default function Form({ reservation, reservations, type }: Props) {
    const { data, setData, post, processing, errors } = useForm<FormData>({
        user_id: reservation.user_id || '',
        annonce_id: reservation.annonce_id || '',
        status: 'pending',
        start_date: reservation.start_date || '',
        end_date: reservation.end_date || '',
        ...(type === 'edit' && { _method: 'PUT' }),
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const selectedStart = new Date(data.start_date);
        const selectedEnd = new Date(data.end_date);

        const hasOverlap = reservations?.some((rsv) => {
            const existingStart = new Date(rsv.start_date);
            const existingEnd = new Date(rsv.end_date);

            // Overlap logic: if selectedStart <= existingEnd && selectedEnd >= existingStart
            return selectedStart <= existingEnd && selectedEnd >= existingStart;
        });

        if (hasOverlap) {
            alert('The selected date range overlaps with an existing reservation.');
            return;
        }

        post(route(type === 'create' ? 'reservations.store' : 'reservations.update', { reservation: reservation.annonce_id }), {
            forceFormData: true,
            onSuccess: () => {
                console.log('Form submitted successfully');
            },
            onError: (errors) => {
                console.error('Form submission errors:', errors);
            },
        });
    };

    // const handleSubmit = (e: React.FormEvent) => {
    //     e.preventDefault();

    //     post(route(type === 'create' ? 'reservations.store' : 'reservations.update', { reservation }), {
    //         forceFormData: true,
    //         onSuccess: () => {
    //             console.log('Form submitted successfully');
    //         },
    //         onError: (errors) => {
    //             console.error('Form submission errors:', errors);
    //         },
    //     });
    // };

    return (
        <form className="mx-auto mb-6 max-w-2xl" onSubmit={handleSubmit}>
            {reservations && (
                <>
                    <p>Can't reserve in these timelines</p>
                    <div className="flex flex-wrap gap-2">
                        {reservations?.map((rsv, idx) => (
                            <p key={idx} className="mb-5 rounded-xl bg-red-100 px-4 py-2 text-red-500">
                                {rsv.start_date} - {rsv.end_date}
                            </p>
                        ))}
                    </div>
                </>
            )}
            <div className="mb-5">
                <Label htmlFor="start_date">Start date</Label>
                <Input
                    id="start_date"
                    type="date"
                    name="start_date"
                    value={data.start_date}
                    onChange={(e) => setData('start_date', e.target.value)}
                    className={`${errors.start_date ? 'border-red-500' : ''} w-fit`}
                />
                {errors.start_date && <p className="mt-1 text-sm text-red-500">{errors.start_date}</p>}
            </div>
            <div className="mb-5">
                <Label htmlFor="end_date">End date</Label>
                <Input
                    id="end_date"
                    type="date"
                    name="end_date"
                    value={data.end_date}
                    onChange={(e) => setData('end_date', e.target.value)}
                    className={`${errors.end_date ? 'border-red-500' : ''} w-fit`}
                />
                {errors.end_date && <p className="mt-1 text-sm text-red-500">{errors.end_date}</p>}
            </div>
            <div className="flex items-center gap-4">
                <Button type="submit" disabled={processing}>
                    {type === 'create' ? 'Create' : 'Edit'}
                </Button>
                <Button type="button" variant="outline" onClick={() => window.history.back()}>
                    Cancel
                </Button>
            </div>
        </form>
    );
}
