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
    reservations: Reservation[];
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Listings', href: route('listings.index') },
    { title: 'Reservation', href: route('reservations.create') },
];

export default function Create({ reservation, reservations }: Props) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Reservation" />
            <div className="mx-auto w-full space-y-8 px-4 py-8 xl:max-w-6xl">
                <h1 className="mx-auto mb-6 max-w-2xl text-2xl font-bold">Create Reservation</h1>
                <Form reservation={reservation} reservations={reservations} type="create" />
            </div>
        </AppLayout>
    );
}
