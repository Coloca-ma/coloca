import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, router } from '@inertiajs/react';
import { CalendarCheckIcon, EyeIcon, SearchIcon } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Listings',
        href: '/colocataire/annonces',
    },
];

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
}

interface Photo {
    path: string;
}

interface Annonce {
    id: string;
    title: string;
    description: string;
    loyer: number;
    address: Address;
    user: User;
    photos: Photo[];
    created_at: string;
    annonceEquipements: {
        equipements: {
            name: string;
        };
    }[];
}

interface Props {
    annonces: Annonce[];
    filters: {
        search?: string;
        min_price?: string;
        max_price?: string;
        city?: string;
    };
}

export default function ColocataireAnnonceIndex({ annonces, filters }: Props) {
    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const search = (form.elements.namedItem('search') as HTMLInputElement).value;
        const min_price = (form.elements.namedItem('min_price') as HTMLInputElement).value;
        const max_price = (form.elements.namedItem('max_price') as HTMLInputElement).value;
        const city = (form.elements.namedItem('city') as HTMLInputElement).value;

        router.get(route('colocataire.annonces.index'), { search, min_price, max_price, city }, { preserveState: true, replace: true });
    };

    const resetFilters = () => {
        router.get(route('colocataire.annonces.index'), {}, { preserveState: true, replace: true });
    };

    const handleBookNow = (annonceId: string) => {
        router.post(route('colocataire.bookings.store'), { annonce_id: annonceId });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Roommate Listings" />

            <div className="space-y-6 p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold">Roommate Listings</h1>
                        <p className="text-muted-foreground text-sm">Find your perfect shared accommodation</p>
                    </div>
                </div>

                <div className="space-y-4 rounded-lg border p-4">
                    <form onSubmit={handleSearch} className="grid grid-cols-1 gap-4 md:grid-cols-4">
                        <div className="relative col-span-1 md:col-span-2">
                            <SearchIcon className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
                            <Input name="search" placeholder="Search by title..." className="pl-10" defaultValue={filters.search} />
                        </div>
                        <Input name="city" placeholder="City" defaultValue={filters.city} />
                        <div className="flex gap-2">
                            <Input name="min_price" placeholder="Min price" type="number" defaultValue={filters.min_price} />
                            <Input name="max_price" placeholder="Max price" type="number" defaultValue={filters.max_price} />
                        </div>
                        <Button type="submit" className="md:col-span-1">
                            Filter
                        </Button>
                        {(filters.search || filters.min_price || filters.max_price || filters.city) && (
                            <Button variant="outline" onClick={resetFilters} className="md:col-span-1">
                                Reset
                            </Button>
                        )}
                    </form>

                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {annonces.map((annonce) => (
                            <Card key={annonce.id} className="transition-shadow hover:shadow-lg">
                                <CardHeader className="p-0">
                                    <div className="h-48 overflow-hidden rounded-t-lg">
                                        <Link href={route('annonces.show', annonce.id)}>
                                            {annonce.photos.length > 0 ? (
                                                <img
                                                    src={`/storage/${annonce.photos[0].path}`}
                                                    alt={annonce.title}
                                                    className="h-full w-full object-cover"
                                                />
                                            ) : (
                                                <div className="flex h-full w-full items-center justify-center bg-gray-200">
                                                    <span className="text-gray-500">No photo</span>
                                                </div>
                                            )}
                                        </Link>
                                    </div>
                                </CardHeader>
                                <CardContent className="p-4">
                                    <Link href={route('annonces.show', annonce.id)}>
                                        <div className="flex items-start justify-between">
                                            <h3 className="text-lg font-semibold">{annonce.title}</h3>
                                            <Badge className="bg-primary text-primary-foreground">{annonce.loyer} MAD</Badge>
                                        </div>
                                        <p className="text-muted-foreground mt-2 text-sm">
                                            {annonce.address.street}, {annonce.address.city}
                                        </p>
                                    </Link>
                                    <div className="mt-4 flex flex-wrap gap-2">
                                        {(annonce.annonceEquipements || []).slice(0, 3).map((equipement, index) => (
                                            <Badge key={index} variant="secondary">
                                                {equipement.equipements.name}
                                            </Badge>
                                        ))}
                                    </div>
                                </CardContent>
                                <CardFooter className="flex items-center justify-between p-4 pt-0">
                                    <div className="text-muted-foreground text-sm">Posted by {annonce.user.first_name}</div>
                                    <div className="flex gap-2">
                                        <Button variant="outline" size="icon" asChild>
                                            <Link href={route('annonces.show', annonce.id)}>
                                                <EyeIcon className="h-4 w-4" />
                                            </Link>
                                        </Button>
                                        <Button variant="default" size="sm" onClick={() => handleBookNow(annonce.id)} className="gap-1">
                                            <CalendarCheckIcon className="h-4 w-4" />
                                            Book Now
                                        </Button>
                                    </div>
                                </CardFooter>
                            </Card>
                        ))}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
