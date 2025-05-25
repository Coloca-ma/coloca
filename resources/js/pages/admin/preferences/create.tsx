// pages/preferences/create.tsx
import AppLayout from '@/layouts/app-layout';
import { Head, useForm } from '@inertiajs/react';
import { useEffect } from 'react';
import PreferenceForm, { type PreferenceValue } from './form';

const breadcrumbs = [
    { title: 'Preferences', href: '/preferences' },
    { title: 'Create Preference', href: '/preferences/create' },
];

export default function PreferenceCreate() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        preference_values: [] as PreferenceValue[],
    });

    useEffect(() => {
        console.log(data, errors);
    }, [data, errors]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('preferences.store'));
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Preference" />
            <PreferenceForm data={data} setData={setData} errors={errors} processing={processing} onSubmit={handleSubmit} mode="create" />
        </AppLayout>
    );
}
