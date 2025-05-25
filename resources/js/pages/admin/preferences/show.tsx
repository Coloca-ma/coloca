import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, router } from '@inertiajs/react';
import { ArrowLeftIcon, PencilIcon, TrashIcon } from 'lucide-react';

interface PreferenceValue {
    id: string;
    preference_id: string;
    value: string;
    [key: string]: string;
}

interface Preference {
    id: string;
    name: string;
    preference_values: PreferenceValue[];
}

interface Props {
    preference: Preference;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Preferences',
        href: '/preferences',
    },
    {
        title: 'Preference Details',
        href: '/preferences/create',
    },
];

export default function PreferenceShow({ preference }: Props) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Preference Details" />

            <div className="space-y-6 p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <Link href={route('preferences.index')}>
                            <Button variant="outline" className="mb-4">
                                <ArrowLeftIcon className="mr-2 h-4 w-4" />
                                Back to Preference
                            </Button>
                        </Link>
                        <h1 className="text-2xl font-bold">Preference Details</h1>
                        <p className="text-muted-foreground text-sm">Viewing details for {preference.name} Preference</p>
                    </div>
                    <div className="flex gap-2">
                        <Link href={route('preferences.edit', preference.id)}>
                            <Button>
                                <PencilIcon className="mr-2 h-4 w-4" />
                                Edit Preference
                            </Button>
                        </Link>
                        <Button
                            variant="destructive"
                            onClick={() => {
                                if (confirm('Are you sure you want to delete this preference?')) {
                                    router.delete(route('preferences.destroy', { preference }));
                                }
                            }}
                        >
                            <TrashIcon className="mr-2 h-4 w-4" />
                            Delete Preference
                        </Button>
                    </div>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Preference Information</CardTitle>
                    </CardHeader>
                    <CardContent className="grid grid-cols-1 gap-6 md:grid-cols-2">
                        <div className="space-y-2">
                            <p className="text-muted-foreground text-sm font-medium">Preference Name</p>
                            <p>{preference.name}</p>
                        </div>
                        <div className="space-y-2">
                            <p className="text-muted-foreground text-sm font-medium">preference Values</p>
                            {preference.preference_values.map((option, idx) => (
                                <p key={idx}>{option.value}</p>
                            ))}
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
