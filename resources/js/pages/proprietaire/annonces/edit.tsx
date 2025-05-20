import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import Form from './form';

interface Region {
    id: string;
    name?: string;
    [key: string]: string | undefined;
}

interface Address {
    id?: string;
    street: string;
    city: string;
    postal_code: string;
    region_id?: Region;
    region: Region;
    [key: string]: string | undefined | Region;
}

interface Annonce {
    id?: string;
    title: string;
    description: string;
    address_id: string;
    address: Address;
    loyer: number;
    [key: string]: string | undefined | Address | number;
}

interface Props {
    annonce: Annonce;
    regions: Region[];
}

export default function Edit({ annonce, regions }: Props) {
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Annonces', href: route('annonces.index') },
        { title: 'Edit Annonce', href: route('annonces.edit', annonce.id) },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit Annonce" />
            <div className="mx-auto w-full space-y-8 px-4 py-8 xl:max-w-6xl">
                <h1 className="mx-auto mb-6 max-w-2xl text-2xl font-bold">Edit Annonce</h1>
                <Form regions={regions} annonce={annonce} type="edit" />
            </div>
        </AppLayout>
    );
}