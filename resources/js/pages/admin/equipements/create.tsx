// pages/equipements/create.tsx
import AppLayout from '@/layouts/app-layout';
import { Head, useForm } from '@inertiajs/react';
import PreferenceForm from './form';

const breadcrumbs = [
    { title: 'Equipements', href: '/equipements' },
    { title: 'Create Equipements', href: '/equipements/create' },
];

export default function PreferenceCreate() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
    });

    // useEffect(() => {
    //     console.log(data, errors);
    // }, [data, errors]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('equipements.store'));
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Preference" />
            <PreferenceForm data={data} setData={setData} errors={errors} processing={processing} onSubmit={handleSubmit} mode="create" />
        </AppLayout>
    );
}
