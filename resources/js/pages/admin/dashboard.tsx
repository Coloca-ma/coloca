import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, type SharedData } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { BarChart, Home, Users, Settings, Calendar, MessageSquare, Sun, Moon, ArrowUp, ArrowDown ,DollarSign} from 'lucide-react';
import { useState, useEffect } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard Admin',
        href: '/dashboard',
    },
];

export default function Dashboard() {
    const { auth } = usePage<SharedData>().props;
    const userName = `${auth.user?.first_name} ${auth.user?.last_name}` || 'Admin';
    const [darkMode, setDarkMode] = useState(false);

    // Theme preference logic
    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');
        const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        setDarkMode(savedTheme === 'dark' || (!savedTheme && systemPrefersDark));
    }, []);

    useEffect(() => {
        document.documentElement.classList.toggle('dark', darkMode);
        localStorage.setItem('theme', darkMode ? 'dark' : 'light');
    }, [darkMode]);

    // Stats data
    const stats = [
        { name: 'Total Properties', value: '124', icon: Home, change: '+12%', changeType: 'positive' },
        { name: 'Active Users', value: '893', icon: Users, change: '+5%', changeType: 'positive' },
        { name: 'Pending Bookings', value: '24', icon: Calendar, change: '-3%', changeType: 'negative' },
        { name: 'New Messages', value: '16', icon: MessageSquare, change: '+8%', changeType: 'positive' },
    ];

    // Recent activities
    const activities = [
        { id: 1, type: 'user', description: 'New user registration', details: 'John Doe signed up', time: '2 hours ago' },
        { id: 2, type: 'property', description: 'New property listed', details: 'Luxury apartment in downtown', time: '5 hours ago' },
        { id: 3, type: 'payment', description: 'Payment processed', details: 'Transaction #45892 completed', time: '1 day ago' },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="space-y-8 p-6">
                {/* Theme Toggle */}
                <button
                    onClick={() => setDarkMode(!darkMode)}
                    className="fixed right-6 top-6 z-50 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-lg transition-all hover:scale-105 dark:bg-gray-700"
                    aria-label="Toggle dark mode"
                >
                    {darkMode ? (
                        <Sun className="h-5 w-5 text-yellow-400" />
                    ) : (
                        <Moon className="h-5 w-5 text-gray-700" />
                    )}
                </button>

                {/* Welcome Section */}
                <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-green-50 to-teal-50 p-8 shadow-sm dark:from-gray-800 dark:to-gray-800/50">
                    <div className="relative z-10 flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">
                                Welcome back, <span className="bg-gradient-to-r from-green-500 to-teal-600 bg-clip-text text-transparent">{userName}</span>
                            </h1>
                            <p className="mt-2 text-lg text-gray-600 dark:text-gray-300">
                                Here's what's happening with your platform today.
                            </p>
                        </div>
                        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-green-400 to-teal-500 shadow-lg">
                            <Home className="h-8 w-8 text-white" />
                        </div>
                    </div>
                    <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-gradient-to-r from-green-100 to-teal-100 opacity-20 dark:from-green-900/10 dark:to-teal-900/10"></div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {stats.map((stat) => (
                        <div
                            key={stat.name}
                            className="group relative overflow-hidden rounded-2xl bg-white p-6 shadow-sm transition-all hover:shadow-lg dark:bg-gray-800/50"
                        >
                            {/* Gradient accent */}
                            <div className={`absolute inset-x-0 top-0 h-1 ${
                                stat.changeType === 'positive' 
                                    ? 'bg-gradient-to-r from-green-400 to-teal-500' 
                                    : 'bg-gradient-to-r from-amber-400 to-red-500'
                            }`}></div>
                            
                            <div className="flex items-start justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{stat.name}</p>
                                    <p className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">
                                        {stat.value}
                                    </p>
                                </div>
                                <div className={`rounded-lg p-3 ${
                                    stat.changeType === 'positive' 
                                        ? 'bg-green-50 text-green-600 dark:bg-gray-700 dark:text-teal-400' 
                                        : 'bg-amber-50 text-amber-600 dark:bg-gray-700 dark:text-red-400'
                                }`}>
                                    <stat.icon className="h-5 w-5" />
                                </div>
                            </div>
                            <div className="mt-4 flex items-center">
                                {stat.changeType === 'positive' ? (
                                    <ArrowUp className="h-4 w-4 text-green-500 dark:text-teal-400" />
                                ) : (
                                    <ArrowDown className="h-4 w-4 text-amber-500 dark:text-red-400" />
                                )}
                                <span className={`ml-2 text-sm font-medium ${
                                    stat.changeType === 'positive' 
                                        ? 'text-green-600 dark:text-teal-400' 
                                        : 'text-amber-600 dark:text-red-400'
                                }`}>
                                    {stat.change} from last week
                                </span>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Main Content Area */}
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                    {/* Recent Activity */}
                    <div className="rounded-2xl bg-white p-6 shadow-sm dark:bg-gray-800/50 lg:col-span-2">
                        <div className="flex items-center justify-between">
                            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                                Recent Activity
                            </h2>
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
                                    <div className={`mt-1 mr-4 flex h-10 w-10 items-center justify-center rounded-full ${
                                        activity.type === 'user' 
                                            ? 'bg-green-50 text-green-600 dark:bg-gray-700 dark:text-teal-400' 
                                            : activity.type === 'property' 
                                            ? 'bg-blue-50 text-blue-600 dark:bg-gray-700 dark:text-blue-400' 
                                            : 'bg-purple-50 text-purple-600 dark:bg-gray-700 dark:text-purple-400'
                                    }`}>
                                        {activity.type === 'user' && <Users className="h-5 w-5" />}
                                        {activity.type === 'property' && <Home className="h-5 w-5" />}
                                        {activity.type === 'payment' && <DollarSign className="h-5 w-5" />}
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                                            {activity.description}
                                        </p>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">
                                            {activity.details}
                                        </p>
                                        <p className="mt-1 text-xs text-gray-400 dark:text-gray-500">
                                            {activity.time}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="rounded-2xl bg-white p-6 shadow-sm dark:bg-gray-800/50">
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                            Quick Actions
                        </h2>
                        <div className="mt-6 space-y-3">
                            <button className="flex w-full items-center justify-between rounded-lg bg-green-50 px-4 py-3 text-left text-green-600 transition-all hover:bg-green-100 dark:bg-gray-700 dark:text-teal-400 dark:hover:bg-gray-600">
                                <span className="font-medium">Manage Users</span>
                                <Users className="h-5 w-5" />
                            </button>
                            <button className="flex w-full items-center justify-between rounded-lg bg-blue-50 px-4 py-3 text-left text-blue-600 transition-all hover:bg-blue-100 dark:bg-gray-700 dark:text-blue-400 dark:hover:bg-gray-600">
                                <span className="font-medium">View Reports</span>
                                <BarChart className="h-5 w-5" />
                            </button>
                            <button className="flex w-full items-center justify-between rounded-lg bg-purple-50 px-4 py-3 text-left text-purple-600 transition-all hover:bg-purple-100 dark:bg-gray-700 dark:text-purple-400 dark:hover:bg-gray-600">
                                <span className="font-medium">System Settings</span>
                                <Settings className="h-5 w-5" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Background elements */}
                <div className="fixed inset-0 -z-10 overflow-hidden">
                    <div className="absolute left-1/2 top-0 h-[500px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-green-50 to-teal-50 opacity-30 blur-3xl dark:from-green-900/20 dark:to-teal-900/20"></div>
                    <div className="absolute bottom-0 right-0 h-[300px] w-[500px] rounded-full bg-gradient-to-r from-green-50 to-teal-50 opacity-20 blur-3xl dark:from-green-900/20 dark:to-teal-900/20"></div>
                </div>
            </div>
        </AppLayout>
    );
}