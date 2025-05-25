import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, router } from '@inertiajs/react';
import { ArrowLeftIcon, PencilIcon, TrashIcon } from 'lucide-react';

interface Equipement {
    id: string;
    name: string;
}

interface Props {
    equipement: Equipement;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Equipements',
        href: '/equipements',
    },
    {
        title: 'Equipements Details',
        href: '/equipements/create',
    },
];

export default function Equipementshow({ equipement }: Props) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Equipements Details" />

            <div className="space-y-6 p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <Link href={route('equipements.index')}>
                            <Button variant="outline" className="mb-4">
                                <ArrowLeftIcon className="mr-2 h-4 w-4" />
                                Back to Equipement
                            </Button>
                        </Link>
                        <h1 className="text-2xl font-bold">Equipement Details</h1>
                        <p className="text-muted-foreground text-sm">Viewing details for {equipement.name} Equipement</p>
                    </div>
                    <div className="flex gap-2">
                        <Link href={route('equipements.edit', equipement.id)}>
                            <Button>
                                <PencilIcon className="mr-2 h-4 w-4" />
                                Edit Equipement
                            </Button>
                        </Link>
                        <Button
                            variant="destructive"
                            onClick={() => {
                                if (confirm('Are you sure you want to delete this equipement?')) {
                                    router.delete(route('equipements.destroy', { equipement }));
                                }
                            }}
                        >
                            <TrashIcon className="mr-2 h-4 w-4" />
                            Delete Equipement
                        </Button>
                    </div>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Equipement Information</CardTitle>
                    </CardHeader>
                    <CardContent className="grid grid-cols-1 gap-6 md:grid-cols-2">
                        <div className="space-y-2">
                            <p className="text-muted-foreground text-sm font-medium">Equipement Name</p>
                            <p>{equipement.name}</p>
                        </div>
                    </CardContent>
                </Card>

                {/* <Card>
                    <CardHeader>
                        <CardTitle>System Information</CardTitle>
                    </CardHeader>
                    <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <p className="text-sm font-medium text-muted-foreground">Created At</p>
                            <p>{new Date(user.created_at).toLocaleString()}</p>
                        </div>
                        <div className="space-y-2">
                            <p className="text-sm font-medium text-muted-foreground">Last Updated</p>
                            <p>{new Date(user.updated_at).toLocaleString()}</p>
                        </div>
                    </CardContent>
                </Card> */}
            </div>
        </AppLayout>
    );
}
