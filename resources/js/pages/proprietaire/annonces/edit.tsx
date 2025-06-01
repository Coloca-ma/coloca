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

interface AnnoncePreference {
    id: string;
    name: string;
}

interface AnnoncePreferenceValue {
    id: string;
    value: string;
}

interface AnnoncePreferenceValues {
    preference: AnnoncePreference;
    preference_value: AnnoncePreferenceValue;
}

interface AnnonceEquipement {
    id: string;
    equipement_id: string;
    annonce_id: string;
    equipements: Equipement;
}

interface Annonce {
    id?: string;
    title: string;
    description: string;
    address_id: string;
    address: Address;
    loyer: number;
    annonce_preference_values: AnnoncePreferenceValues[];
    annonce_equipements: AnnonceEquipement[];
    [key: string]: string | undefined | Address | number | AnnoncePreferenceValues[] | AnnonceEquipement[];
}

interface PreferenceValue {
    id: string;
    value: string;
    preference_id: string;
    [key: string]: string;
}

interface Preference {
    id: string;
    name: string;
    preference_values: PreferenceValue[];
    [key: string]: string | PreferenceValue[];
}

interface Equipement {
    id: string;
    name: string;
    [key: string]: string;
}

interface Props {
    annonce: Annonce;
    regions: Region[];
    preferences: Preference[];
    equipements: Equipement[];
}

export default function Edit({ annonce, regions, preferences, equipements }: Props) {
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Annonces', href: route('annonces.index') },
        { title: 'Edit Annonce', href: route('annonces.edit', annonce.id) },
    ];
    // console.log(annonce);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit Annonce" />
            <div className="mx-auto w-full space-y-8 px-4 py-8 xl:max-w-6xl">
                <h1 className="mx-auto mb-6 max-w-2xl text-2xl font-bold">Edit Annonce</h1>
                <Form regions={regions} annonce={annonce} preferences={preferences} equipements={equipements} type="edit" />
            </div>
        </AppLayout>
    );
}
