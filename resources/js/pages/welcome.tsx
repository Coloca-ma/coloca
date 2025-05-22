import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';

export default function Welcome() {
    const { auth } = usePage<SharedData>().props;
    const [darkMode, setDarkMode] = useState(false);

    // Check for user's preferred color scheme
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const isDark =
                localStorage.getItem('darkMode') === 'true' ||
                (!('darkMode' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);
            setDarkMode(isDark);
        }
    }, []);

    // Apply dark mode class to document
    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add('dark');
            localStorage.setItem('darkMode', 'true');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('darkMode', 'false');
        }
    }, [darkMode]);

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
    };

    return (
        <>
            <Head title="COLOCA">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
                <meta name="description" content="Find your perfect shared living space and compatible roommates with COLOCA" />
            </Head>

            <div className={`relative min-h-screen overflow-hidden transition-colors duration-300 ${darkMode ? 'dark' : ''}`}>
                {/* Navigation */}
                <header className="mx-auto mb-6 w-full max-w-7xl px-6 pt-6">
                    <nav className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-green-400 to-teal-500">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="text-white"
                                >
                                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                                    <polyline points="9 22 9 12 15 12 15 22"></polyline>
                                </svg>
                            </div>
                            <span className="text-xl font-bold text-green-600 dark:text-teal-400">COLOCA</span>
                        </div>
                        <div className="flex items-center gap-4">
                            <button
                                onClick={toggleDarkMode}
                                className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
                                aria-label="Toggle dark mode"
                            >
                                {darkMode ? (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="20"
                                        height="20"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <circle cx="12" cy="12" r="5"></circle>
                                        <line x1="12" y1="1" x2="12" y2="3"></line>
                                        <line x1="12" y1="21" x2="12" y2="23"></line>
                                        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                                        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                                        <line x1="1" y1="12" x2="3" y2="12"></line>
                                        <line x1="21" y1="12" x2="23" y2="12"></line>
                                        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                                        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
                                    </svg>
                                ) : (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="20"
                                        height="20"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                                    </svg>
                                )}
                            </button>
                            {auth.user ? (
                                <Link
                                    href={route('dashboard')}
                                    className="rounded-lg bg-green-600 px-5 py-2 text-sm font-medium text-white hover:bg-green-700 dark:bg-teal-600 dark:hover:bg-teal-700"
                                >
                                    Dashboard
                                </Link>
                            ) : (
                                <>
                                    <Link
                                        href={route('login')}
                                        className="text-sm font-medium text-gray-600 hover:text-green-600 dark:text-gray-300 dark:hover:text-teal-400"
                                    >
                                        Log in
                                    </Link>
                                    <Link
                                        href={route('register')}
                                        className="rounded-lg bg-green-600 px-5 py-2 text-sm font-medium text-white hover:bg-green-700 dark:bg-teal-600 dark:hover:bg-teal-700"
                                    >
                                        Get Started
                                    </Link>
                                </>
                            )}
                        </div>
                    </nav>
                </header>

                {/* Hero Section */}
                <main className="mx-auto mt-16 flex max-w-7xl flex-col items-center justify-between gap-12 px-6 lg:flex-row lg:gap-24">
                    <div className="flex-1">
                        <h1 className="mb-6 text-4xl leading-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl dark:text-white">
                            Find Your Perfect{' '}
                            <span className="bg-gradient-to-r from-green-500 to-teal-600 bg-clip-text text-transparent dark:from-green-400 dark:to-teal-500">
                                Co-Living Space
                            </span>
                        </h1>
                        <p className="mb-8 max-w-lg text-lg text-gray-600 dark:text-gray-300">
                            COLOCA connects you with compatible roommates and shared living spaces that match your lifestyle, budget, and preferences.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <Link
                                href={auth.user ? route('dashboard') : route('register')}
                                className="rounded-lg bg-green-600 px-6 py-3 font-medium text-white hover:bg-green-700 dark:bg-teal-600 dark:hover:bg-teal-700"
                            >
                                Start Exploring
                            </Link>
                            <Link
                                href="#how-it-works"
                                className="rounded-lg border border-gray-300 px-6 py-3 font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-800"
                            >
                                How It Works
                            </Link>
                        </div>
                        <div className="mt-10 flex items-center gap-4">
                            <div className="flex -space-x-2">
                                {[1, 2, 3, 4].map((item) => (
                                    <img
                                        key={item}
                                        src={`https://randomuser.me/api/portraits/${item % 2 === 0 ? 'women' : 'men'}/${item + 20}.jpg`}
                                        className="h-10 w-10 rounded-full border-2 border-white dark:border-gray-800"
                                        alt="Happy user"
                                    />
                                ))}
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
                                    Join <span className="font-bold text-green-600 dark:text-teal-400">10,000+</span> happy users
                                </p>
                                <div className="flex items-center gap-1">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <svg key={star} className="h-4 w-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                    ))}
                                    <span className="text-sm text-gray-500 dark:text-gray-400">5.0 (2K+ reviews)</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="relative flex-1">
                        <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                            <img
                                src="https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
                                alt="Happy roommates in shared living space"
                                className="h-full w-full object-cover"
                            />
                            <div className="absolute right-0 bottom-0 left-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                                <p className="text-lg font-medium text-white">"Found my perfect roommate match in just 3 days!"</p>
                                <p className="text-sm text-white/80">- Sarah, Paris</p>
                            </div>
                        </div>
                    </div>
                </main>

                {/* Features Section */}
                <section id="how-it-works" className="mx-auto mt-32 max-w-7xl px-6 sm:mt-40">
                    <h2 className="mb-12 text-center text-3xl font-bold text-gray-900 sm:text-4xl dark:text-white">
                        How <span className="text-green-600 dark:text-teal-400">COLOCA</span> Works
                    </h2>
                    <div className="grid gap-8 md:grid-cols-3">
                        {[
                            {
                                icon: (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className="h-8 w-8 text-green-600 dark:text-teal-400"
                                    >
                                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                                        <circle cx="12" cy="10" r="3"></circle>
                                    </svg>
                                ),
                                title: 'Find Locations',
                                description: 'Search for shared living spaces in your desired location with detailed filters.',
                            },
                            {
                                icon: (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className="h-8 w-8 text-green-600 dark:text-teal-400"
                                    >
                                        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                                        <circle cx="9" cy="7" r="4"></circle>
                                        <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                                        <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                                    </svg>
                                ),
                                title: 'Match with Roommates',
                                description: 'Our algorithm suggests compatible roommates based on your lifestyle and preferences.',
                            },
                            {
                                icon: (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className="h-8 w-8 text-green-600 dark:text-teal-400"
                                    >
                                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                                    </svg>
                                ),
                                title: 'Connect & Communicate',
                                description: 'Chat with potential roommates and landlords before making any commitments.',
                            },
                        ].map((feature, index) => (
                            <div
                                key={index}
                                className="rounded-xl bg-white p-6 shadow-lg transition-all hover:shadow-xl dark:bg-gray-800 dark:hover:shadow-gray-700/50"
                            >
                                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-green-50 dark:bg-teal-900/20">
                                    {feature.icon}
                                </div>
                                <h3 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">{feature.title}</h3>
                                <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Testimonials */}
                <section className="mx-auto mt-32 max-w-7xl px-6">
                    <h2 className="mb-12 text-center text-3xl font-bold text-gray-900 sm:text-4xl dark:text-white">
                        What Our <span className="text-green-600 dark:text-teal-400">Users</span> Say
                    </h2>
                    <div className="grid gap-8 md:grid-cols-2">
                        {[
                            {
                                quote: 'COLOCA helped me find my perfect shared apartment in just a week! The matching system is amazing.',
                                author: 'Alex, Berlin',
                                rating: 5,
                            },
                            {
                                quote: 'As a landlord, I appreciate how easy it is to find responsible and compatible tenants through COLOCA.',
                                author: 'Marie, Lyon',
                                rating: 5,
                            },
                        ].map((testimonial, index) => (
                            <div
                                key={index}
                                className="rounded-xl bg-white p-6 shadow-lg transition-all hover:shadow-xl dark:bg-gray-800 dark:hover:shadow-gray-700/50"
                            >
                                <div className="mb-4 flex">
                                    {[...Array(testimonial.rating)].map((_, i) => (
                                        <svg key={i} className="h-5 w-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                    ))}
                                </div>
                                <blockquote className="mb-4 text-lg text-gray-600 italic dark:text-gray-300">"{testimonial.quote}"</blockquote>
                                <p className="font-medium text-gray-800 dark:text-gray-200">- {testimonial.author}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* CTA Section */}
                <section className="mx-auto my-32 max-w-7xl rounded-2xl bg-gradient-to-r from-green-600 to-teal-600 px-8 py-12 text-center text-white shadow-xl">
                    <h2 className="mb-6 text-3xl font-bold sm:text-4xl">Ready to Find Your Perfect Co-Living Space?</h2>
                    <p className="mx-auto mb-8 max-w-2xl text-lg opacity-90">
                        Join thousands of happy users who found their ideal shared living situation with COLOCA.
                    </p>
                    <Link
                        href={auth.user ? route('dashboard') : route('register')}
                        className="inline-block rounded-lg bg-white px-8 py-3 font-medium text-green-600 transition-all hover:bg-gray-100 hover:shadow-md"
                    >
                        Get Started - It's Free
                    </Link>
                </section>

                {/* Footer */}
                <footer className="mx-auto max-w-7xl border-t border-gray-200 px-6 py-8 dark:border-gray-700">
                    <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
                        <div className="flex items-center gap-2">
                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-green-400 to-teal-500">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="text-white"
                                >
                                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                                    <polyline points="9 22 9 12 15 12 15 22"></polyline>
                                </svg>
                            </div>
                            <span className="text-xl font-bold text-green-600 dark:text-teal-400">COLOCA</span>
                        </div>
                        <div className="flex flex-wrap justify-center gap-6 text-sm">
                            <Link href="#" className="text-gray-600 hover:text-green-600 dark:text-gray-300 dark:hover:text-teal-400">
                                About
                            </Link>
                            <Link href="#" className="text-gray-600 hover:text-green-600 dark:text-gray-300 dark:hover:text-teal-400">
                                Features
                            </Link>
                            <Link href="#" className="text-gray-600 hover:text-green-600 dark:text-gray-300 dark:hover:text-teal-400">
                                Pricing
                            </Link>
                            <Link href="#" className="text-gray-600 hover:text-green-600 dark:text-gray-300 dark:hover:text-teal-400">
                                Blog
                            </Link>
                            <Link href="#" className="text-gray-600 hover:text-green-600 dark:text-gray-300 dark:hover:text-teal-400">
                                Contact
                            </Link>
                        </div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">© {new Date().getFullYear()} COLOCA. All rights reserved.</p>
                    </div>
                </footer>

                {/* Background elements */}
                <div className="absolute top-0 left-1/2 -z-10 h-[500px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-green-50 to-teal-50 opacity-30 blur-3xl dark:from-green-900/20 dark:to-teal-900/20"></div>
                <div className="absolute right-0 bottom-0 -z-10 h-[300px] w-[500px] rounded-full bg-gradient-to-r from-green-50 to-teal-50 opacity-20 blur-3xl dark:from-green-900/20 dark:to-teal-900/20"></div>
            </div>
        </>
    );
}
