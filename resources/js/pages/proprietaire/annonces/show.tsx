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
        { title: 'Annonce Details', href: route('annonces.show', { id: annonce.id }) },
    ];

    const [emblaRef] = useEmblaCarousel();
    const photos = annonce.photos;
    // console.log(annonce);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <div className="mx-auto w-full space-y-8 px-4 py-8 xl:max-w-6xl">
                {/* Carousel */}
                <div className="overflow-hidden rounded-xl" ref={emblaRef}>
                    <div className="flex">
                        {photos.length > 0 ? (
                            photos.map((photo, index) => (
                                <div className="h-[400px] w-full flex-shrink-0 bg-gray-200" key={index}>
                                    <img src={`/storage/${photo.path}`} alt={`Photo ${index + 1}`} className="h-full w-full object-cover" />
                                </div>
                            ))
                        ) : (
                            <div className="flex h-[400px] w-full items-center justify-between bg-gray-200 text-center text-3xl font-bold text-black">
                                <p className="w-full">No images to preview</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Content */}
                <div>
                    <h1 className="text-3xl font-bold">{annonce.title}</h1>
                </div>

                <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                    {/* Description */}
                    <div className="rounded-lg border bg-white py-6 pl-6 lg:col-span-2">
                        <div className="max-h-52 overflow-y-auto">
                            <h2 className="mb-3 text-lg font-semibold text-gray-900">Description</h2>
                            <p className="leading-relaxed whitespace-pre-line text-gray-700">{annonce.description}</p>
                        </div>
                    </div>

                    {/* Rent and Address */}
                    <div className="space-y-4 rounded-lg border bg-white py-6 pl-6">
                        <div className="max-h-52 overflow-y-auto">
                            <div>
                                <h2 className="mb-1 text-lg font-semibold text-gray-900">Loyer mensuel</h2>
                                <p className="text-3xl font-bold text-gray-900">{annonce.loyer} MAD</p>
                            </div>
                            <hr className="my-3" />
                            <div>
                                <h3 className="mb-3 flex items-center gap-1 text-sm font-semibold text-gray-700">
                                    <MapPin />
                                    Adresse
                                </h3>
                                <p className="text-sm text-gray-600">
                                    {annonce.address.street}
                                    <br />
                                    {annonce.address.postal_code} {annonce.address.city}
                                    <br />
                                    {annonce.address.region.name}
                                </p>
                            </div>
                        </div>
                    </div>
                    {/* Preferences */}
                    <div className="rounded-lg border bg-white p-6 text-black lg:col-span-2">
                        <div className="max-h-52 overflow-y-auto">
                            <h3 className="text-2xl font-bold">Annonce preferences:</h3>
                            {annonce.annonce_preference_values.map((apv, idx) => {
                                return (
                                    <div key={idx}>
                                        <p className="my-1 flex items-center justify-between">
                                            <span className="font-bold">{apv.preference.name}:</span> <span>{apv.preference_value.value}</span>
                                        </p>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                    {/* Rent and Address */}
                    <div className="space-y-4 rounded-lg border bg-white p-6 text-black">
                        <div className="max-h-52 overflow-y-auto">
                            <h3 className="text-2xl font-bold">Annonce equipements:</h3>
                            {annonce.annonce_equipements.map((equip, idx) => {
                                return (
                                    <div key={idx}>
                                        <p className="my-1 flex items-center justify-between">
                                            <span className="font-bold">{equip.equipements.name}</span>
                                        </p>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
