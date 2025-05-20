import AppLayout from '@/layouts/app-layout';
import { Head, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { type BreadcrumbItem } from '@/types';
import { ArrowLeftIcon, PencilIcon, TrashIcon } from 'lucide-react';

interface User {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    role: 'admin' | 'colocataire' | 'proprietaire';
    created_at: string;
    updated_at: string;
}

interface Props {
    user: User;
}

export default function UserShow({ user }: Props) {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Users',
            href: '/users',
        },
        {
            title: `${user.first_name} ${user.last_name}`,
            href: `/users/${user.id}`,
        }
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`User Details - ${user.first_name} ${user.last_name}`} />
            
            <div className="space-y-6 p-6">
                <div className="flex justify-between items-center">
                    <div>
                        <Link href={route('users.index')}>
                            <Button variant="outline" className="mb-4">
                                <ArrowLeftIcon className="mr-2 h-4 w-4" />
                                Back to Users
                            </Button>
                        </Link>
                        <h1 className="text-2xl font-bold">User Details</h1>
                        <p className="text-sm text-muted-foreground">
                            Viewing details for {user.first_name} {user.last_name}
                        </p>
                    </div>
                    <div className="flex gap-2">
                        <Link href={route('users.edit', user.id)}>
                            <Button>
                                <PencilIcon className="mr-2 h-4 w-4" />
                                Edit User
                            </Button>
                        </Link>
                        <Button 
                            variant="destructive"
                            onClick={() => {
                                if (confirm('Are you sure you want to delete this user?')) {
                                    // router.delete(route('users.destroy', user.id));
                                }
                            }}
                        >
                            <TrashIcon className="mr-2 h-4 w-4" />
                            Delete User
                        </Button>
                    </div>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Personal Information</CardTitle>
                    </CardHeader>
                    <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <p className="text-sm font-medium text-muted-foreground">First Name</p>
                            <p>{user.first_name}</p>
                        </div>
                        <div className="space-y-2">
                            <p className="text-sm font-medium text-muted-foreground">Last Name</p>
                            <p>{user.last_name}</p>
                        </div>
                        <div className="space-y-2">
                            <p className="text-sm font-medium text-muted-foreground">Email</p>
                            <p>{user.email}</p>
                        </div>
                        <div className="space-y-2">
                            <p className="text-sm font-medium text-muted-foreground">Phone</p>
                            <p>{user.phone}</p>
                        </div>
                        <div className="space-y-2">
                            <p className="text-sm font-medium text-muted-foreground">Role</p>
                            <Badge 
                                variant={
                                    user.role === 'admin' ? 'destructive' :
                                    user.role === 'proprietaire' ? 'default' : 'secondary'
                                }
                            >
                                {user.role}
                            </Badge>
                        </div>
                    </CardContent>
                </Card>

                <Card>
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
                </Card>
            </div>
        </AppLayout>
    );
}