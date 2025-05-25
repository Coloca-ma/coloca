import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, router } from '@inertiajs/react';
import { EyeIcon, PencilIcon, PlusIcon, SearchIcon, TrashIcon } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Preferences',
        href: '/preferences',
    },
];

interface PreferenceValue {
    id: string;
    value: string;
    preference_id: string;
}

interface Preference {
    id: string;
    name: string;
    created_at: string;
    preference_values: PreferenceValue[];
}

interface Props {
    preferences: {
        data: Preference[];
        links: Array<{
            url: string | null;
            label: string;
            active: boolean;
        }>;
    };
    filters: {
        search?: string;
    };
}

export default function PreferenceIndex({ preferences, filters }: Props) {
    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const search = (form.elements.namedItem('search') as HTMLInputElement).value;

        router.get(
            route('preferences.index'),
            { search },
            {
                preserveState: true,
                replace: true,
            },
        );
    };

    const resetFilters = () => {
        router.get(
            route('preferences.index'),
            {},
            {
                preserveState: true,
                replace: true,
            },
        );
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Preference Management" />

            <div className="space-y-6 p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold">Preference Management</h1>
                        <p className="text-muted-foreground text-sm">Manage all preferences in the system</p>
                    </div>
                    <Link href={route('preferences.create')}>
                        <Button>
                            <PlusIcon className="mr-2 h-4 w-4" />
                            Add New Preference
                        </Button>
                    </Link>
                </div>

                <div className="space-y-4 rounded-lg border p-4">
                    <form onSubmit={handleSearch} className="flex gap-4">
                        <div className="relative flex-1">
                            <SearchIcon className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
                            <Input 
                                name="search" 
                                placeholder="Search by name..." 
                                className="pl-10" 
                                defaultValue={filters.search} 
                            />
                        </div>
                        <Button type="submit">Search</Button>
                        {filters.search && (
                            <Button variant="outline" onClick={resetFilters}>
                                Reset
                            </Button>
                        )}
                    </form>

                    <Table>
                        <TableHeader className="bg-gray-50 dark:bg-gray-800">
                            <TableRow>
                                <TableHead className="px-6 py-3">Name</TableHead>
                                <TableHead className="px-6 py-3">Options</TableHead>
                                <TableHead className="px-6 py-3">Created At</TableHead>
                                <TableHead className="px-6 py-3 text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {preferences.data.map((preference) => (
                                <TableRow key={preference.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                                    <TableCell className="px-6 py-4 font-medium">{preference.name}</TableCell>
                                    <TableCell className="px-6 py-4">
                                        <div className="flex flex-wrap gap-1">
                                            {preference.preference_values?.map((value) => (
                                                <span 
                                                    key={value.id} 
                                                    className="text-xs bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded"
                                                >
                                                    {value.value}
                                                </span>
                                            ))}
                                        </div>
                                    </TableCell>
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

                <div className="py-4">
                    {/* Uncomment when you implement pagination */}
                    {/* <Pagination links={preferences.links} /> */}
                </div>
            </div>
        </AppLayout>
    );
}