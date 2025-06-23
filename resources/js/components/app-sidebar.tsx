import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import type { SharedData } from '@/types'; // ajuste le chemin si nécessaire
import { type NavItem } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { BookMarked, Home, LayoutGrid, ListChecks, Search, Users, Wrench } from 'lucide-react';
import AppLogo from './app-logo';

export const AppSidebar = () => {
    const { auth } = usePage<SharedData>().props;
    const userRole = auth.user?.role;
    // console.log('User Role:', userRole); // Debugging line to check the user role
    // console.log('Auth:', auth); // Debugging line to check the auth object

    const adminNavItems: NavItem[] = [
        {
            title: 'Dashboard',
            href: '/admin/dashboard',
            icon: LayoutGrid,
        },
        {
            title: 'Users',
            href: '/admin/users',
            icon: Users,
        },
        {
            title: 'Preferences',
            href: '/admin/preferences',
            icon: ListChecks,
        },
        {
            title: 'Equipements',
            href: '/admin/equipements',
            icon: Wrench,
        },
    ];

    const proprietaireNavItems: NavItem[] = [
        {
            title: 'Dashboard',
            href: '/proprietaire/dashboard',
            icon: LayoutGrid,
        },
        {
            title: 'My Listings',
            href: '/proprietaire/annonces',
            icon: Home,
        },
        {
            title: 'Reservations',
            href: '/proprietaire/reservations',
            icon: BookMarked,
        },
    ];

    const colocataireNavItems: NavItem[] = [
        {
            title: 'Dashboard',
            href: '/colocataire/dashboard',
            icon: LayoutGrid,
        },
        {
            title: 'Search Listings',
            href: '/colocataire/listings',
            icon: Search,
        },
        {
            title: 'Reservations',
            href: '/colocataire/reservations',
            icon: BookMarked,
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
