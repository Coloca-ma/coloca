import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import Form from './form';

interface Region {
    id: string;
    [key: string]: string;
}

interface Props {
    regions: Region[];
    success?: string;
    preferences: any;
}
const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Annonces', href: route('annonces.index') },
    { title: 'Create', href: route('annonces.create') },
];

export default function Create({ regions, preferences }: Props) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Annonce" />
            <div className="mx-auto w-full space-y-8 px-4 py-8 xl:max-w-6xl">
                <h1 className="mx-auto mb-6 max-w-2xl text-2xl font-bold">Create Annonce</h1>
                <Form regions={regions} preferences={preferences} type="create" />
            </div>
        </AppLayout>
    );
}
