import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { PlusIcon } from 'lucide-react';
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
}

const breadcrumbs: BreadcrumbItem[] = [{ title: 'Annonces', href: route('annonces.index') }];

export default function Index({ annonces, addresses, success }: Props) {
    const [showSuccess, setShowSuccess] = useState(!!success);

    useEffect(() => {
        if (success) {
            setShowSuccess(true);
            const timer = setTimeout(() => setShowSuccess(false), 2000);
            return () => clearTimeout(timer); // cleanup
        }
    }, [success]);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Annonces" />

            <div className="mx-auto w-full space-y-8 px-4 py-8 xl:max-w-6xl">
                <div className="mb-6 flex items-center justify-between">
                    <h1 className="text-2xl font-bold">Annonces</h1>
                    <Link href={route('annonces.create')}>
                        <Button>
                            <PlusIcon className="mr-2 h-4 w-4" />
                            Add Annonce
                        </Button>
                    </Link>
                </div>

                {showSuccess && <div className="mb-4 rounded border border-green-400 bg-green-100 px-4 py-3 text-green-700">{success}</div>}

                <div className="overflow-x-auto rounded-lg bg-white shadow">
                    <table className="min-w-full divide-y divide-gray-200 overflow-x-auto">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">Title</th>
                                <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">Description</th>
                                <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">Address</th>
                                <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">Loyer</th>
                                <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 bg-white">
                            {annonces.map((annonce, idx) => (
                                <tr key={idx} className="text-black">
                                    <td className="px-6 py-4 whitespace-nowrap">{annonce.title}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{annonce.description}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {addresses.map((address) => (annonce.address_id == address.id ? address.postal_code : ''))}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">{annonce.loyer} MAD</td>
                                    <td className="px-6 py-4 text-right text-sm font-medium whitespace-nowrap">
                                        <Link href={route('annonces.show', { annonce })} className="mr-4 text-indigo-600 hover:text-indigo-900">
                                            View
                                        </Link>
                                        <Link href={route('annonces.edit', { annonce })} className="mr-4 text-green-600 hover:text-green-900">
                                            Edit
                                        </Link>
                                        <Link
                                            href={route('annonces.destroy', { annonce })}
                                            method="delete"
                                            as="button"
                                            className="text-red-600 hover:text-red-900"
                                            onClick={(e) => {
                                                if (!confirm('Are you sure you want to delete this annonce?')) {
                                                    e.preventDefault();
                                                }
                                            }}
                                        >
                                            Delete
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {/* <EquipSelector /> */}
                </div>
            </div>
        </AppLayout>
    );
}
