import { Button } from '@/components/ui/button';
import { useForm } from '@inertiajs/react';
import React, { useEffect } from 'react';

interface Reservation {
    id: string;
    status: string;
}

interface FormData {
    status: string;
    [key: string]: string;
}

interface Props {
    reservation: Reservation;
}

const Form = ({ reservation }: Props) => {
    const { data, setData, post, processing, errors } = useForm<FormData>({
        status: reservation.status || '',
        _method: 'PUT',
    });

    useEffect(() => {
        console.log(data.status);
    }, [data.status]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('proprietaire.reservations.update', { reservation }), {
            forceFormData: true,
            onSuccess: () => {
                console.log('Form submitted successfully');
            },
            onError: (errors) => {
                console.error('Form submission errors:', errors);
            },
        });
    };

    return (
        <div className="mx-auto max-w-2xl">
            <form onSubmit={handleSubmit}>
                <select name="" id="" className="mb-6 rounded border border-black" onChange={(e) => setData({ ...data, status: e.target.value })}>
                    <option value="">Select a status</option>
                    <option value="approved">Approved</option>
                    <option value="rejected">Rejected</option>
                </select>
                <div className="flex items-center gap-4">
                    <Button type="submit" disabled={processing}>
                        Update
                    </Button>
                    <Button type="button" variant="outline" onClick={() => window.history.back()}>
                        Cancel
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default Form;
