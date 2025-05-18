import AppLayout from '@/layouts/app-layout';
import { Head, Link, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { type BreadcrumbItem } from '@/types';
import { PencilIcon, TrashIcon, EyeIcon, PlusIcon } from 'lucide-react';
// import { Pagination } from '@/components/ui/pagination';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Users',
        href: '/users',
    }
];

interface User {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    role: 'admin' | 'tenant' | 'owner';
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
}

export default function UserIndex({ users }: Props) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="User Management" />
            
            <div className="space-y-6 p-6">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-bold">User Management</h1>
                        <p className="text-sm text-muted-foreground">
                            Manage all registered users in the system
                        </p>
                    </div>
                    <Link href={route('users.create')}>
                        <Button>
                            <PlusIcon className="mr-2 h-4 w-4" />
                            Add New User
                        </Button>
                    </Link>
                </div>

                <div className="border rounded-lg overflow-hidden">
                    <Table className="w-full">
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
                                            variant={
                                                user.role === 'admin' ? 'destructive' :
                                                user.role === 'owner' ? 'default' : 'secondary'
                                            }
                                        >
                                            {user.role}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="px-6 py-4">
                                        {new Date(user.created_at).toLocaleDateString()}
                                    </TableCell>
                                    <TableCell className="px-6 py-4 flex justify-end gap-2">
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

                <div className="py-4">
                    {/* <Pagination links={users.links} /> */}
                </div>
            </div>
        </AppLayout>
    );
}