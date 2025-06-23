import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head, Link, router } from '@inertiajs/react';
import { EyeIcon, PencilIcon, PlusIcon, SearchIcon, TrashIcon } from 'lucide-react';
import { useEffect, useState } from 'react';

interface Annonce {
    id: string;
    title: string;
    description: string;
    address_id: string;
    loyer: string;
}

interface Address {
    id: string;
    street: string;
    city: string;
    postal_code: string;
    region_id: string;
}

interface Props {
    annonces: Annonce[];
    addresses: Address[];
    success?: string;
    filters?: {
        search?: string;
    };
}

const breadcrumbs: BreadcrumbItem[] = [{ title: 'Annonces', href: route('annonces.index') }];

export default function Index({ annonces, addresses, success, filters = {} }: Props) {
    const [showSuccess, setShowSuccess] = useState(!!success);
    const [searchValue, setSearchValue] = useState(filters.search || '');

    useEffect(() => {
        if (success) {
            setShowSuccess(true);
            const timer = setTimeout(() => setShowSuccess(false), 2000);
            return () => clearTimeout(timer);
        }
    }, [success]);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        router.get(
            route('annonces.index'),
            { search: searchValue },
            { preserveState: true, replace: true }
        );
    };

    const resetFilters = () => {
        setSearchValue('');
        router.get(
            route('annonces.index'),
            {},
            { preserveState: true, replace: true }
        );
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Annonces" />

            <div className="space-y-6 p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold">Annonces</h1>
                        <p className="text-muted-foreground text-sm">Manage all property listings</p>
                    </div>
                    <Link href={route('annonces.create')}>
                        <Button>
                            <PlusIcon className="mr-2 h-4 w-4" />
                            Add Annonce
                        </Button>
                    </Link>
                </div>

                {showSuccess && (
                    <div className="rounded-md bg-green-100 p-4 text-green-700">
                        {success}
                    </div>
                )}

                <div className="space-y-4 rounded-lg border p-4">
                    <form onSubmit={handleSearch} className="flex gap-4">
                        <div className="relative flex-1">
                            <SearchIcon className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
                            <Input 
                                name="search" 
                                placeholder="Search by title..." 
                                className="pl-10" 
                                value={searchValue}
                                onChange={(e) => setSearchValue(e.target.value)}
                            />
                        </div>
                        <Button type="submit">Search</Button>
                        {(filters.search) && (
                            <Button variant="outline" onClick={resetFilters}>
                                Reset
                            </Button>
                        )}
                    </form>

                    <Table>
                        <TableHeader className="bg-gray-50 dark:bg-gray-800">
                            <TableRow>
                                <TableHead>Title</TableHead>
                                <TableHead>Description</TableHead>
                                <TableHead>Address</TableHead>
                                <TableHead>Loyer</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {annonces.map((annonce) => (
                                <TableRow key={annonce.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                                    <TableCell className="font-medium">{annonce.title}</TableCell>
                                    <TableCell className="max-w-xs truncate">{annonce.description}</TableCell>
                                    <TableCell>
                                        {addresses.find(a => a.id === annonce.address_id)?.postal_code}
                                    </TableCell>
                                    <TableCell>{annonce.loyer} MAD</TableCell>
                                    <TableCell className="flex justify-end gap-2">
                                        <Link href={route('annonces.show', annonce.id)}>
                                            <Button variant="outline" size="icon" title="View">
                                                <EyeIcon className="h-4 w-4" />
                                            </Button>
                                        </Link>
                                        <Link href={route('annonces.edit', annonce.id)}>
                                            <Button variant="outline" size="icon" title="Edit">
                                                <PencilIcon className="h-4 w-4" />
                                            </Button>
                                        </Link>
                                        <Button
                                            variant="destructive"
                                            size="icon"
                                            title="Delete"
                                            onClick={() => {
                                                if (confirm('Are you sure you want to delete this annonce?')) {
                                                    router.delete(route('annonces.destroy', annonce.id));
                                                }
                                            }}
                                        >
                                            <TrashIcon className="h-4 w-4" />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </AppLayout>
    );
}