import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import Form from './form';

interface Reservation {
    user_id: string;
    annonce_id: string;
    status: string;
    start_date: string;
    end_date: string;
}

interface Props {
    reservation: Reservation;
}

export default function Edit({ reservation }: Props) {
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Listings', href: route('listings.index') },
        { title: 'Reservation', href: route('reservations.edit', { reservation }) },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit Reservation" />
            <div className="mx-auto w-full space-y-8 px-4 py-8 xl:max-w-6xl">
                <h1 className="mx-auto mb-6 max-w-2xl text-2xl font-bold">Edit Reservation</h1>
                <Form reservation={reservation} type="edit" />
            </div>
        </AppLayout>
    );
}
