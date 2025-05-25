import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, type SharedData } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { Calendar, DollarSign, Home, MessageSquare, Moon, Settings, Sun, Users, FileText, Bell, Handshake } from 'lucide-react';
import { useEffect, useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard Tenant',
        href: '/dashboard',
    },
];

export default function Dashboard() {
    const [darkMode, setDarkMode] = useState(false);
    const { auth } = usePage<SharedData>().props;
    const userName = `${auth.user?.first_name} ${auth.user?.last_name}` || 'Tenant';

    // Check for saved theme preference or system preference
    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');
        const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

        if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
            setDarkMode(true);
        }
    }, []);

    // Apply dark mode class to document
    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    }, [darkMode]);

    // Sample data for tenant statistics
    const stats = [
        { name: 'Current Residence', value: 'Green Valley #5', icon: Home, change: 'Active', changeType: 'positive' },
        { name: 'Roommates', value: '3', icon: Users, change: '+1', changeType: 'positive' },
        { name: 'Monthly Rent', value: '$650', icon: DollarSign, change: 'Due in 5 days', changeType: 'neutral' },
        { name: 'House Rules', value: '12', icon: FileText, change: 'Updated', changeType: 'neutral' },
        { name: 'Notifications', value: '3', icon: Bell, change: 'New', changeType: 'positive' },
    ];

    // Sample recent activities for tenant
    const activities = [
        { id: 1, type: 'payment', description: 'Rent payment confirmed for June', time: '2 days ago' },
        { id: 2, type: 'maintenance', description: 'Kitchen sink repair scheduled', time: '1 week ago' },
        { id: 3, type: 'new', description: 'New roommate joined - Alex', time: '2 weeks ago' },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Tenant Dashboard" />
            <div className="space-y-8 p-6">
                {/* Theme Toggle Button */}
                <button
                    onClick={() => setDarkMode(!darkMode)}
                    className="fixed top-6 right-6 z-50 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-lg transition-all hover:scale-105 dark:bg-gray-700"
                    aria-label="Toggle dark mode"
                >
                    {darkMode ? <Sun className="h-5 w-5 text-yellow-400" /> : <Moon className="h-5 w-5 text-gray-700" />}
                </button>

                {/* Welcome Section */}
                <div className="rounded-2xl bg-gradient-to-r from-green-50 to-teal-50 p-8 shadow-sm dark:from-gray-800 dark:to-gray-800/50">
                    <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl dark:text-white">
                                Welcome back,{' '}
                                <span className="bg-gradient-to-r from-green-500 to-teal-600 bg-clip-text text-transparent">{userName}</span>
                            </h1>
                            <p className="mt-2 text-lg text-gray-600 dark:text-gray-300">Here's your co-living space overview</p>
                        </div>
                        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-green-400 to-teal-500 shadow-lg">
                            <Home className="h-8 w-8 text-white" />
                        </div>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
                    {stats.map((stat) => (
                        <div key={stat.name} className="relative overflow-hidden rounded-2xl bg-white p-6 shadow-sm transition-all hover:shadow-md dark:bg-gray-800/50">
                            {/* Status indicator bar */}
                            <div className={`absolute left-0 top-0 h-1 w-full ${
                                stat.changeType === 'positive' ? 'bg-green-400' : 
                                stat.changeType === 'negative' ? 'bg-red-400' : 'bg-blue-400'
                            }`}></div>
                            
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{stat.name}</p>
                                    <p className="mt-1 text-2xl font-semibold text-gray-900 dark:text-white">{stat.value}</p>
                                </div>
                                <div className={`rounded-lg p-2 ${
                                    stat.changeType === 'positive' ? 'bg-green-50 text-green-600 dark:bg-gray-700 dark:text-teal-400' :
                                    stat.changeType === 'negative' ? 'bg-red-50 text-red-600 dark:bg-gray-700 dark:text-red-400' :
                                    'bg-blue-50 text-blue-600 dark:bg-gray-700 dark:text-blue-400'
                                }`}>
                                    <stat.icon className="h-5 w-5" />
                                </div>
                            </div>
                            <div className="mt-4">
                                <p className={`text-sm ${
                                    stat.changeType === 'positive' ? 'text-green-600 dark:text-teal-400' :
                                    stat.changeType === 'negative' ? 'text-red-600 dark:text-red-400' :
                                    'text-blue-600 dark:text-blue-400'
                                }`}>
                                    {stat.change}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Main Content Area */}
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                    {/* Recent Activity */}
                    <div className="rounded-2xl bg-white p-6 shadow-sm lg:col-span-2 dark:bg-gray-800/50">
                        <div className="flex items-center justify-between">
                            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Recent Activity</h2>
                            <button className="text-sm font-medium text-green-600 hover:text-green-700 dark:text-teal-400 dark:hover:text-teal-300">
                                View all
                            </button>
                        </div>
                        <div className="mt-6 space-y-4">
                            {activities.map((activity) => (
                                <div
                                    key={activity.id}
                                    className="flex items-start rounded-lg p-4 transition-all hover:bg-gray-50 dark:hover:bg-gray-700/30"
                                >
                                    <div className="mt-1 mr-4 flex h-10 w-10 items-center justify-center rounded-full bg-green-50 text-green-600 dark:bg-gray-700 dark:text-teal-400">
                                        {activity.type === 'payment' && <DollarSign className="h-5 w-5" />}
                                        {activity.type === 'maintenance' && <Settings className="h-5 w-5" />}
                                        {activity.type === 'new' && <Users className="h-5 w-5" />}
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-sm font-medium text-gray-900 dark:text-white">{activity.description}</p>
                                        <p className="mt-1 text-xs text-gray-400 dark:text-gray-500">{activity.time}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="rounded-2xl bg-white p-6 shadow-sm dark:bg-gray-800/50">
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Quick Actions</h2>
                        <div className="mt-6 space-y-3">
                            <button className="flex w-full items-center justify-between rounded-lg bg-green-50 px-4 py-3 text-left text-green-600 transition-all hover:bg-green-100 dark:bg-gray-700 dark:text-teal-400 dark:hover:bg-gray-600">
                                <span className="font-medium">Pay Rent</span>
                                <DollarSign className="h-5 w-5" />
                            </button>
                            <button className="flex w-full items-center justify-between rounded-lg bg-green-50 px-4 py-3 text-left text-green-600 transition-all hover:bg-green-100 dark:bg-gray-700 dark:text-teal-400 dark:hover:bg-gray-600">
                                <span className="font-medium">Request Maintenance</span>
                                <Settings className="h-5 w-5" />
                            </button>
                            <button className="flex w-full items-center justify-between rounded-lg bg-green-50 px-4 py-3 text-left text-green-600 transition-all hover:bg-green-100 dark:bg-gray-700 dark:text-teal-400 dark:hover:bg-gray-600">
                                <span className="font-medium">Roommate Agreement</span>
                                <Handshake className="h-5 w-5" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Background elements */}
                <div className="fixed inset-0 -z-10 overflow-hidden">
                    <div className="absolute top-0 left-1/2 h-[500px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-green-50 to-teal-50 opacity-30 blur-3xl dark:from-green-900/20 dark:to-teal-900/20"></div>
                    <div className="absolute right-0 bottom-0 h-[300px] w-[500px] rounded-full bg-gradient-to-r from-green-50 to-teal-50 opacity-20 blur-3xl dark:from-green-900/20 dark:to-teal-900/20"></div>
                </div>
            </div>
        </AppLayout>
    );
}