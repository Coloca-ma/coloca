import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, router } from '@inertiajs/react';
import { EyeIcon, PencilIcon, PlusIcon, TrashIcon } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Preferences',
        href: '/preferences',
    },
];

interface Preference {
    id: string;
    name: string;
    created_at: string;
}

interface Props {
    preferences: Preference[];
}

export default function PreferenceIndex({ preferences }: Props) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Preference Management" />

            <div className="space-y-6 p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold">Preference Management</h1>
                        <p className="text-muted-foreground text-sm">Manage all registered users in the system</p>
                    </div>
                    <Link href={route('preferences.create')}>
                        <Button>
                            <PlusIcon className="mr-2 h-4 w-4" />
                            Add New Preference
                        </Button>
                    </Link>
                </div>

                <div className="space-y-4 rounded-lg border p-4">
                    <Table>
                        <TableHeader className="bg-gray-50 dark:bg-gray-800">
                            <TableRow>
                                <TableHead className="px-6 py-3">Name</TableHead>
                                <TableHead className="px-6 py-3">Created At</TableHead>
                                <TableHead className="px-6 py-3 text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {preferences.map((preference) => (
                                <TableRow key={preference.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                                    <TableCell className="px-6 py-4 font-medium">{preference.name}</TableCell>
                                    <TableCell className="px-6 py-4">{new Date(preference.created_at).toLocaleDateString()}</TableCell>
                                    <TableCell className="flex justify-end gap-2 px-6 py-4">
                                        <Link href={route('preferences.show', { preference })}>
                                            <Button variant="outline" size="icon" title="View">
                                                <EyeIcon className="h-4 w-4" />
                                            </Button>
                                        </Link>
                                        <Link href={route('preferences.edit', preference.id)}>
                                            <Button variant="outline" size="icon" title="Edit">
                                                <PencilIcon className="h-4 w-4" />
                                            </Button>
                                        </Link>
                                        <Button
                                            variant="destructive"
                                            size="icon"
                                            title="Delete"
                                            onClick={() => {
                                                if (confirm('Are you sure you want to delete this preference?')) {
                                                    router.delete(route('preferences.destroy', { preference }));
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

                <div className="py-4">{/* <Pagination links={users.links} /> */}</div>
            </div>
        </AppLayout>
    );
}
