import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import useEmblaCarousel from 'embla-carousel-react';
import { MapPin } from 'lucide-react';

interface Photo {
    annonce_id: string;
    path: string;
    [key: string]: string;
}

interface Address {
    id: string;
    street: string;
    city: string;
    postal_code: string;
    region_id: string;
    region: Region;
    [key: string]: string | Region;
}

interface Region {
    id: string;
    name: string;
    [key: string]: string;
}

interface Preference {
    name: string;
}

interface PreferenceValue {
    value: string;
}

interface AnnoncePreferenceValue {
    preference: Preference;
    preference_value: PreferenceValue;
}

interface Equipement {
    id: string;
    name: string;
}

interface AnnonceEquipement {
    id: string;
    equipements: Equipement;
}

interface Annonce {
    id: string;
    title: string;
    description: string;
    loyer: number;
    photos: Photo[];
    address_id: string;
    address: Address;
    annonce_preference_values: AnnoncePreferenceValue[];
    annonce_equipements: AnnonceEquipement[];
    [key: string]: string | number | Photo[] | Address | AnnoncePreferenceValue[] | AnnonceEquipement[];
}

export default function Show({ annonce }: { annonce: Annonce }) {
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Annonces', href: route('annonces.index') },
        { title: annonce.title, href: route('annonces.show', { id: annonce.id }) },
    ];

    const [emblaRef] = useEmblaCarousel({ loop: true });

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <div className="mx-auto w-full space-y-8 px-4 py-8 xl:max-w-7xl">
                {/* Enhanced Image Carousel */}
                <div className="overflow-hidden rounded-xl shadow-md" ref={emblaRef}>
                    <div className="flex">
                        {annonce.photos.length > 0 ? (
                            annonce.photos.map((photo, index) => (
                                <div className="h-[55vh] min-h-[400px] w-full flex-shrink-0" key={index}>
                                    <img 
                                        src={`/storage/${photo.path}`} 
                                        alt={`Photo ${index + 1}`} 
                                        className="h-full w-full object-cover object-center"
                                        loading="lazy"
                                    />
                                </div>
                            ))
                        ) : (
                            <div className="flex h-[55vh] min-h-[400px] w-full items-center justify-center bg-gray-100">
                                <p className="text-xl text-gray-500">Aucune image disponible</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Property Header */}
                <div className="space-y-2">
                    <h1 className="text-3xl font-bold text-gray-900">{annonce.title}</h1>
                    <div className="flex items-center gap-2 text-gray-600">
                        <MapPin className="h-5 w-5" />
                        <span>{annonce.address.city}, {annonce.address.region.name}</span>
                    </div>
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                    {/* Left Column */}
                    <div className="space-y-6 lg:col-span-2">
                        {/* Description Card */}
                        <div className="rounded-xl bg-white p-6 shadow-sm">
                            <h2 className="mb-4 text-xl font-semibold text-gray-900">Description</h2>
                            <p className="whitespace-pre-line text-gray-700 leading-relaxed">
                                {annonce.description}
                            </p>
                        </div>

                        {/* Preferences Card */}
                        <div className="rounded-xl bg-white p-6 shadow-sm">
                            <h2 className="mb-4 text-xl font-semibold text-gray-900">Préférences</h2>
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                {annonce.annonce_preference_values.map((apv, idx) => (
                                    <div key={idx} className="flex justify-between py-2">
                                        <span className="font-medium text-gray-700">{apv.preference.name}</span>
                                        <span className="text-gray-600">{apv.preference_value.value}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Column */}
                    <div className="space-y-6">
                        {/* Pricing Card */}
                        <div className="rounded-xl bg-white p-6 shadow-sm">
                            <h2 className="mb-4 text-xl font-semibold text-gray-900">Détails Financiers</h2>
                            <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                    <span className="text-gray-700">Loyer mensuel</span>
                                    <span className="text-2xl font-bold text-gray-900">{annonce.loyer} MAD</span>
                                </div>
                            </div>
                        </div>

                        {/* Address Card */}
                        <div className="rounded-xl bg-white p-6 shadow-sm">
                            <h2 className="mb-4 text-xl font-semibold text-gray-900">Adresse</h2>
                            <div className="space-y-2">
                                <div className="flex items-start gap-3">
                                    <MapPin className="h-5 w-5 text-gray-500 mt-0.5 flex-shrink-0" />
                                    <div>
                                        <p className="text-gray-900">{annonce.address.street}</p>
                                        <p className="text-gray-600">
                                            {annonce.address.postal_code} {annonce.address.city}
                                        </p>
                                        <p className="text-gray-600">{annonce.address.region.name}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Equipment Card */}
                        <div className="rounded-xl bg-white p-6 shadow-sm">
                            <h2 className="mb-4 text-xl font-semibold text-gray-900">Équipements</h2>
                            <div className="flex flex-wrap gap-2">
                                {annonce.annonce_equipements.map((equip, idx) => (
                                    <span key={idx} className="inline-flex items-center rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-700">
                                        {equip.equipements.name}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}