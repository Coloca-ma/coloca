import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { useEffect, useState } from 'react';

interface User {
    first_name: string;
    last_name: string;
}

interface Annonce {
    title: string;
}

interface Reservation {
    id: string;
    user: User;
    status: string;
    start_date: string;
    end_date: string;
    annonce: Annonce;
}

interface Props {
    reservations: Reservation[];
    success?: string;
}

const breadcrumbs: BreadcrumbItem[] = [{ title: 'Reservation', href: route('reservations.index') }];

export default function Index({ reservations, success }: Props) {
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
                    <h1 className="text-2xl font-bold">Reservations</h1>
                    {/* <Link href={route('res.create')}>
                        <Button>
                            <PlusIcon className="mr-2 h-4 w-4" />
                            Add Annonce
                        </Button>
                    </Link> */}
                </div>

                {showSuccess && <div className="mb-4 rounded border border-green-400 bg-green-100 px-4 py-3 text-green-700">{success}</div>}

                <div className="overflow-x-auto rounded-lg bg-white shadow">
                    <table className="min-w-full divide-y divide-gray-200 overflow-x-auto">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">Title</th>
                                <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">Colocataire</th>
                                <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">Status</th>
                                <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">Start Date</th>
                                <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">End Date</th>
                                <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 bg-white">
                            {reservations.map((rsv, idx) => (
                                <tr key={idx} className="text-black">
                                    <td className="px-6 py-4 whitespace-nowrap">{rsv.annonce.title}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {rsv.user.first_name} - {rsv.user.last_name}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">{rsv.status}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{rsv.start_date}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{rsv.end_date}</td>
                                    <td className="px-6 py-4 text-right text-sm font-medium whitespace-nowrap">
                                        <Link
                                            href={route('proprietaire.reservations.edit', rsv.id)}
                                            className="mr-4 text-green-600 hover:text-green-900"
                                        >
                                            Edit
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </AppLayout>
    );
}
