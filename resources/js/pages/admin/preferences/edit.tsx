// pages/preferences/edit.tsx
import AppLayout from '@/layouts/app-layout';
import { Head, useForm } from '@inertiajs/react';
import PreferenceForm, { type PreferenceValue } from './form';

const breadcrumbs = [
    { title: 'Preferences', href: '/admin/preferences' },
    { title: 'Edit Preference', href: '#' },
];

interface EditProps {
    preference: {
        name: string;
        preference_values: PreferenceValue[];
    };
}

export default function PreferenceEdit({ preference }: EditProps) {
    const { data, setData, put, processing, errors } = useForm({
        name: preference.name,
        preference_values: preference.preference_values,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(route('preferences.update', preference));
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit Preference" />
            <PreferenceForm data={data} setData={setData} errors={errors} processing={processing} onSubmit={handleSubmit} mode="edit" />
        </AppLayout>
    );
}
