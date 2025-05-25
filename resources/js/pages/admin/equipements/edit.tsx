// pages/equipements/edit.tsx
import AppLayout from '@/layouts/app-layout';
import { Head, useForm } from '@inertiajs/react';
import EquipementForm from './form';

const breadcrumbs = [
    { title: 'Equipements', href: '/admin/equipements' },
    { title: 'Edit Equipement', href: '#' },
];

interface EditProps {
    equipement: {
        name: string;
    };
}

export default function EquipementEdit({ equipement }: EditProps) {
    const { data, setData, put, processing, errors } = useForm({
        name: equipement.name,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(route('equipements.update', equipement));
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit Equipement" />
            <EquipementForm data={data} setData={setData} errors={errors} processing={processing} onSubmit={handleSubmit} mode="edit" />
        </AppLayout>
    );
}
