import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, router } from '@inertiajs/react';
import { ArrowLeft, CalendarCheck, MapPin, Ruler, Users } from 'lucide-react';

interface Address {
    street: string;
    city: string;
    postal_code: string;
    region: {
        name: string;
    };
}

interface User {
    id: string;
    first_name: string;
    last_name: string;
    avatar?: string;
    phone?: string;
}

interface Photo {
    path: string;
}

interface Equipement {
    id: string;
    name: string;
}

interface Annonce {
    id: string;
    title: string;
    description: string;
    loyer: number;
    surface: number;
    rooms: number;
    address: Address;
    user: User;
    photos: Photo[];
    created_at: string;
    annonceEquipements: {
        equipement: Equipement;
    }[];
}

interface Props {
    annonce: Annonce;
    isBooked: boolean;
}

export default function ColocataireAnnonceshow({ annonce, isBooked }: Props) {
    const handleBookNow = () => {
        router.post(route('bookings.store'), { annonce_id: annonce.id });
    };

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'annonces',
            href: route('annonces.index'),
        },
        {
            title: annonce.title,
            href: route('annonces.show', annonce.id),
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={annonce.title} />

            <div className="space-y-6 p-6">
                <Button variant="outline" size="sm" asChild>
                    <Link href={route('annonces.index')}>
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to annonces
                    </Link>
                </Button>

                <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                    {/* Main Content */}
                    <div className="lg:col-span-2">
                        {/* Image Gallery */}
                        <div className="mb-6 rounded-lg bg-gray-100">
                            {annonce.photos.length > 0 ? (
                                <img src={`/storage/${annonce.photos[0].path}`} alt={annonce.title} className="h-96 w-full rounded-lg object-cover" />
                            ) : (
                                <div className="flex h-96 w-full items-center justify-center rounded-lg bg-gray-200">
                                    <span className="text-gray-500">No photos available</span>
                                </div>
                            )}
                        </div>

                        {/* Listing Details */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-2xl">{annonce.title}</CardTitle>
                                <div className="text-muted-foreground flex items-center gap-4 text-sm">
                                    <div className="flex items-center">
                                        <MapPin className="mr-1 h-4 w-4" />
                                        {annonce.address.street}, {annonce.address.city}
                                    </div>
                                    <div className="flex items-center">
                                        <Ruler className="mr-1 h-4 w-4" />
                                        {annonce.surface} m²
                                    </div>
                                    <div className="flex items-center">
                                        <Users className="mr-1 h-4 w-4" />
                                        {annonce.rooms} rooms
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div>
                                    <h3 className="mb-2 text-lg font-semibold">Description</h3>
                                    <p className="text-muted-foreground">{annonce.description}</p>
                                </div>

                                <div>
                                    <h3 className="mb-2 text-lg font-semibold">Equipements</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {annonce.annonceEquipements?.length > 0 ? (
                                            annonce.annonceEquipements.map(({ equipement }) => (
                                                <Badge key={equipement.id} variant="secondary">
                                                    {equipement.name}
                                                </Badge>
                                            ))
                                        ) : (
                                            <p className="text-muted-foreground">No equipements listed</p>
                                        )}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-4">
                        {/* Pricing Card */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-xl">Pricing</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="flex items-end justify-between">
                                    <span className="text-3xl font-bold">{annonce.loyer} MAD</span>
                                    <span className="text-muted-foreground">/ month</span>
                                </div>
                                <Button size="lg" className="mt-4 w-full gap-2" onClick={handleBookNow} disabled={isBooked}>
                                    <CalendarCheck className="h-5 w-5" />
                                    {isBooked ? 'Already Booked' : 'Book Now'}
                                </Button>
                            </CardContent>
                        </Card>

                        {/* Owner Card */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-xl">Property Owner</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="flex items-center gap-4">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
                                        {annonce.user.avatar ? (
                                            <img
                                                src={`/storage/${annonce.user.avatar}`}
                                                alt={`${annonce.user.first_name} ${annonce.user.last_name}`}
                                                className="h-full w-full rounded-full object-cover"
                                            />
                                        ) : (
                                            <span className="text-lg font-medium">
                                                {annonce.user.first_name.charAt(0)}
                                                {annonce.user.last_name.charAt(0)}
                                            </span>
                                        )}
                                    </div>
                                    <div>
                                        <h4 className="font-medium">
                                            {annonce.user.first_name} {annonce.user.last_name}
                                        </h4>
                                        {annonce.user.phone && <p className="text-muted-foreground text-sm">{annonce.user.phone}</p>}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Location Card */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-xl">Location</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-2">
                                    <p className="flex items-center gap-2">
                                        <MapPin className="text-muted-foreground h-5 w-5" />
                                        <span>{annonce.address.street}</span>
                                    </p>
                                    <p className="flex items-center gap-2">
                                        <MapPin className="text-muted-foreground h-5 w-5" />
                                        <span>
                                            {annonce.address.postal_code}, {annonce.address.city}
                                        </span>
                                    </p>
                                    <p className="flex items-center gap-2">
                                        <MapPin className="text-muted-foreground h-5 w-5" />
                                        <span>{annonce.address.region.name}</span>
                                    </p>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
