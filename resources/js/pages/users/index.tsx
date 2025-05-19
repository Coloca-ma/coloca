import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, router } from '@inertiajs/react';
import { EyeIcon, PencilIcon, SearchIcon, TrashIcon } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Users',
        href: '/users',
    },
];

interface User {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    role: 'admin' | 'colocataire' | 'proprietaire';
    created_at: string;
}

interface Props {
    users: {
        data: User[];
        links: Array<{
            url: string | null;
            label: string;
            active: boolean;
        }>;
    };
    filters: {
        search?: string;
        role?: string;
    };
}

export default function UserIndex({ users, filters }: Props) {
    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const search = (form.elements.namedItem('search') as HTMLInputElement).value;

        router.get(
            route('users.index'),
            {
                search,
                role: filters.role,
            },
            {
                preserveState: true,
                replace: true,
            },
        );
    };

    const resetFilters = () => {
        router.get(
            route('users.index'),
            {},
            {
                preserveState: true,
                replace: true,
            },
        );
    };


    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="User Management" />

            <div className="space-y-6 p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold">User Management</h1>
                        <p className="text-muted-foreground text-sm">Manage all registered users in the system</p>
                    </div>
                    {/* <Link href={route('users.create')}>
                        <Button>
                            <PlusIcon className="mr-2 h-4 w-4" />
                            Add New User
                        </Button>
                    </Link> */}
                </div>

                <div className="space-y-4 rounded-lg border p-4">
                    <form onSubmit={handleSearch} className="flex gap-4">
                        <div className="relative flex-1">
                            <SearchIcon className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
                            <Input name="search" placeholder="Search by name..." className="pl-10" defaultValue={filters.search} />
                        </div>
                        <Select
                            name="role"
                            value={filters.role || undefined}
                            onValueChange={(value) => {
                                router.get(
                                    route('users.index'),
                                    {
                                        ...filters,
                                        role: value || undefined,
                                    },
                                    {
                                        preserveState: true,
                                        replace: true,
                                    },
                                );
                            }}
                        >
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Filter by role" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="admin">Admin</SelectItem>
                                <SelectItem value="colocataire">Colocataire</SelectItem>
                                <SelectItem value="proprietaire">Proprietaire</SelectItem>
                            </SelectContent>
                        </Select>
                        <Button type="submit">Filter</Button>
                        {(filters.search || filters.role) && (
                            <Button variant="outline" onClick={resetFilters}>
                                Reset
                            </Button>
                        )}
                    </form>

                    <Table>
                        <TableHeader className="bg-gray-50 dark:bg-gray-800">
                            <TableRow>
                                <TableHead className="px-6 py-3">Full Name</TableHead>
                                <TableHead className="px-6 py-3">Email</TableHead>
                                <TableHead className="px-6 py-3">Phone</TableHead>
                                <TableHead className="px-6 py-3">Role</TableHead>
                                <TableHead className="px-6 py-3">Created At</TableHead>
                                <TableHead className="px-6 py-3 text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {users.data.map((user) => (
                                <TableRow key={user.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                                    <TableCell className="px-6 py-4 font-medium">
                                        {user.first_name} {user.last_name}
                                    </TableCell>
                                    <TableCell className="px-6 py-4">{user.email}</TableCell>
                                    <TableCell className="px-6 py-4">{user.phone}</TableCell>
                                    <TableCell className="px-6 py-4">
                                        <Badge
                                            variant={user.role === 'admin' ? 'destructive' : user.role === 'proprietaire' ? 'default' : 'secondary'}
                                        >
                                            {user.role}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="px-6 py-4">{new Date(user.created_at).toLocaleDateString()}</TableCell>
                                    <TableCell className="flex justify-end gap-2 px-6 py-4">
                                        <Link href={route('users.show', user.id)}>
                                            <Button variant="outline" size="icon" title="View">
                                                <EyeIcon className="h-4 w-4" />
                                            </Button>
                                        </Link>
                                        <Link href={route('users.edit', user.id)}>
                                            <Button variant="outline" size="icon" title="Edit">
                                                <PencilIcon className="h-4 w-4" />
                                            </Button>
                                        </Link>
                                        <Button 
                                            variant="destructive" 
                                            size="icon"
                                            title="Delete"
                                            onClick={() => {
                                                if (confirm('Are you sure you want to delete this user?')) {
                                                    router.delete(route('users.destroy', user.id));
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
