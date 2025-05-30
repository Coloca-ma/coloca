import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import type { SharedData } from '@/types'; // ajuste le chemin si nécessaire
import { type NavItem } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { LayoutGrid, User, Users } from 'lucide-react';
import AppLogo from './app-logo';

export const AppSidebar = () => {
    const { auth } = usePage<SharedData>().props;
    const userRole = auth.user?.role;
    // console.log('User Role:', userRole); // Debugging line to check the user role
    // console.log('Auth:', auth); // Debugging line to check the auth object

    const adminNavItems: NavItem[] = [
        {
            title: 'Dashboard',
            href: '/dashboard',
            icon: LayoutGrid,
        },
        {
            title: 'Users',
            href: '/users',
            icon: Users,
        },
        {
            title: 'Preferences',
            href: '/preferences',
            icon: Users,
        },
        {
            title: 'Equipements',
            href: '/equipements',
            icon: Users,
        },
    ];

    const proprietaireNavItems: NavItem[] = [
        {
            title: 'Dashboard',
            href: '/dashboard',
            icon: LayoutGrid,
        },
        {
            title: 'Mes annonces',
            href: '/proprietaire/annonces',
            icon: User,
        },
    ];

    const colocataireNavItems: NavItem[] = [
        {
            title: 'Dashboard',
            href: '/dashboard',
            icon: LayoutGrid,
        },
        {
            title: 'Recherche',
            href: '/colocataire',
            icon: User,
        },
    ];

    const getNavItems = () => {
        switch (userRole) {
            case 'admin':
                return adminNavItems;
            case 'proprietaire':
                return proprietaireNavItems;
            case 'colocataire':
                return colocataireNavItems;
            default:
                return [];
        }
    };

    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/dashboard" prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={getNavItems()} />
            </SidebarContent>

            <SidebarFooter>
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
};
