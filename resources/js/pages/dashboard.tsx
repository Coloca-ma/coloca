import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

export default function Dashboard() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col items-center justify-center p-4">
                <div className="w-full max-w-2xl text-center">
                    {/* App Logo - Modern style */}
                    <div className="mx-auto mb-8 flex size-24 items-center justify-center rounded-full bg-gradient-to-br from-green-400 to-teal-500 text-white shadow-lg">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="48"
                            height="48"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="drop-shadow-sm"
                        >
                            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                            <polyline points="9 22 9 12 15 12 15 22"></polyline>
                        </svg>
                    </div>

                    {/* Welcome Message */}
                    <h1 className="mb-6 text-4xl font-extrabold text-gray-900 dark:text-white sm:text-5xl">
                        Welcome to <span className="bg-gradient-to-r from-green-500 to-teal-600 bg-clip-text text-transparent">COLOCA</span>
                    </h1>
                    
                    {/* App Description */}
                    <p className="mx-auto mb-10 max-w-lg text-xl leading-relaxed text-gray-600 dark:text-gray-300">
                        Your modern platform for finding the perfect shared living spaces 
                        and compatible roommates. Simplify your search and enhance your 
                        co-living experience.
                    </p>

                    {/* Decorative elements */}
                    <div className="absolute inset-0 -z-10 overflow-hidden">
                        <div className="absolute left-1/2 top-0 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-green-50 to-teal-50 opacity-50 blur-3xl dark:from-green-900/20 dark:to-teal-900/20"></div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}