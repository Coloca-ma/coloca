import { type SharedData } from '@/types';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { Home, MapPin, Search, Heart, Star, Users, Ruler, Sun, Moon } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface Address {
    street: string;
    city: string;
    postal_code: string;
    region: string;
}

interface Annonce {
    id: string;
    title: string;
    description: string;
    loyer: number;
    surface: number;
    rooms: number;
    address: Address;
    photos: { path: string }[];
    created_at: string;
    equipements: { name: string }[];
}

export default function Welcome() {
    const { auth, annonces } = usePage<SharedData>().props;
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredAnnonces, setFilteredAnnonces] = useState<Annonce[]>([]);
    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
        setFilteredAnnonces(annonces as Annonce[]);
    }, [annonces]);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const isDark = localStorage.getItem('darkMode') === 'true' || 
                         (!('darkMode' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);
            setDarkMode(isDark);
        }
    }, []);

    useEffect(() => {
        document.documentElement.classList.toggle('dark', darkMode);
        localStorage.setItem('darkMode', darkMode.toString());
    }, [darkMode]);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        const results = (annonces as Annonce[]).filter(annonce =>
            annonce.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            annonce.address.city.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredAnnonces(results);
    };

    const handleAnnonceClick = (annonceId: string) => {
        if (auth.user) {
            router.visit(route('colocataire.listings.show', annonceId));
        } else {
            router.visit(route('register'));
        }
    };

    return (
        <div className={`min-h-screen ${darkMode ? 'dark' : ''}`}>
            <Head title="COLOCA - Find Your Perfect Shared Living Space" />

            {/* Navigation */}
            <header className="bg-white dark:bg-gray-900 shadow-sm">
                <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                        <div className="bg-green-500 dark:bg-teal-600 p-2 rounded-lg">
                            <Home className="text-white" />
                        </div>
                        <span className="text-xl font-bold text-green-600 dark:text-teal-400">COLOCA</span>
                    </div>
                    <div className="flex items-center space-x-4">
                        <button
                            onClick={() => setDarkMode(!darkMode)}
                            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
                        >
                            {darkMode ? (
                                <Sun className="text-yellow-400" />
                            ) : (
                                <Moon className="text-gray-700" />
                            )}
                        </button>
                        {auth.user ? (
                            <Link href={route('dashboard')} className="btn-primary">
                                Dashboard
                            </Link>
                        ) : (
                            <>
                                <Link href={route('login')} className="btn-secondary">
                                    Login
                                </Link>
                                <Link href={route('register')} className="btn-primary">
                                    Sign Up
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </header>

            {/* Hero Section with Search */}
            <section className="bg-gradient-to-r from-green-50 to-teal-50 dark:from-gray-800 dark:to-gray-900 py-20">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white">
                        Find Your Perfect <span className="text-green-600 dark:text-teal-400">Roommate</span>
                    </h1>
                    <p className="text-xl text-gray-600 dark:text-gray-300 mb-10 max-w-2xl mx-auto">
                        Discover shared living spaces that match your lifestyle and budget
                    </p>
                    
                    <form onSubmit={handleSearch} className="max-w-2xl mx-auto">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <Input
                                type="text"
                                placeholder="Search by city or listing title..."
                                className="pl-10 pr-4 py-6 text-lg border-0 shadow-lg"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <Button 
                                type="submit" 
                                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-green-600 hover:bg-green-700 dark:bg-teal-600 dark:hover:bg-teal-700"
                            >
                                Search
                            </Button>
                        </div>
                    </form>
                </div>
            </section>

            {/* Featured Listings */}
            <section className="py-16 bg-white dark:bg-gray-900">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold mb-12 text-center text-gray-900 dark:text-white">
                        Available Shared Spaces
                    </h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredAnnonces.map((annonce) => (
                            <Card 
                                key={annonce.id} 
                                className="cursor-pointer hover:shadow-xl transition-shadow"
                                onClick={() => handleAnnonceClick(annonce.id)}
                            >
                                <CardHeader className="p-0">
                                    <div className="h-48 overflow-hidden rounded-t-lg">
                                        {annonce.photos.length > 0 ? (
                                            <img
                                                src={`/storage/${annonce.photos[0].path}`}
                                                alt={annonce.title}
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <div className="h-full w-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                                                <Home className="text-gray-400 dark:text-gray-500 h-12 w-12" />
                                            </div>
                                        )}
                                    </div>
                                </CardHeader>
                                <CardContent className="pt-4">
                                    <div className="flex justify-between items-start">
                                        <h3 className="text-xl font-semibold">{annonce.title}</h3>
                                        <Badge className="bg-green-100 text-green-800 dark:bg-teal-900 dark:text-teal-100">
                                            {annonce.loyer} MAD/month
                                        </Badge>
                                    </div>
                                    <div className="flex items-center mt-2 text-gray-600 dark:text-gray-400">
                                        <MapPin className="h-4 w-4 mr-1" />
                                        <span>{annonce.address.city}</span>
                                    </div>
                                    <div className="flex mt-4 gap-2">
                                        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                                            <Users className="h-4 w-4 mr-1" />
                                            {annonce.rooms} rooms
                                        </div>
                                        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                                            <Ruler className="h-4 w-4 mr-1" />
                                            {annonce.surface} m²
                                        </div>
                                    </div>
                                </CardContent>
                                <CardFooter className="flex justify-between items-center">
                                    <div className="flex items-center">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <Star 
                                                key={star} 
                                                className={`h-4 w-4 ${star <= 4 ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                                            />
                                        ))}
                                    </div>
                                    <Button 
                                        variant="ghost" 
                                        className="text-green-600 dark:text-teal-400 hover:bg-green-50 dark:hover:bg-gray-800"
                                    >
                                        <Heart className="h-5 w-5 mr-2" />
                                        Save
                                    </Button>
                                </CardFooter>
                            </Card>
                        ))}
                    </div>

                    {filteredAnnonces.length === 0 && (
                        <div className="text-center py-12">
                            <h3 className="text-xl font-medium text-gray-500 dark:text-gray-400">
                                No listings found. Try a different search.
                            </h3>
                        </div>
                    )}
                </div>
            </section>

            {/* Call to Action */}
            <section className="py-16 bg-gray-50 dark:bg-gray-800">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
                        Ready to Find Your Perfect Shared Space?
                    </h2>
                    <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
                        Join thousands of happy users who found their ideal living situation with COLOCA
                    </p>
                    <div className="flex justify-center space-x-4">
                        {auth.user ? (
                            <Link href={route('dashboard')} className="btn-primary">
                                View Dashboard
                            </Link>
                        ) : (
                            <>
                                <Link href={route('login')} className="btn-secondary">
                                    Login
                                </Link>
                                <Link href={route('register')} className="btn-primary">
                                    Sign Up - It's Free
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 py-8">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <div className="flex items-center space-x-2 mb-4 md:mb-0">
                            <div className="bg-green-500 dark:bg-teal-600 p-2 rounded-lg">
                                <Home className="text-white" />
                            </div>
                            <span className="text-xl font-bold text-green-600 dark:text-teal-400">COLOCA</span>
                        </div>
                        <div className="flex space-x-6">
                            <Link href="#" className="text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-teal-400">
                                About
                            </Link>
                            <Link href="#" className="text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-teal-400">
                                Contact
                            </Link>
                            <Link href="#" className="text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-teal-400">
                                Privacy
                            </Link>
                            <Link href="#" className="text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-teal-400">
                                Terms
                            </Link>
                        </div>
                    </div>
                    <div className="mt-8 text-center text-gray-500 dark:text-gray-400 text-sm">
                        © {new Date().getFullYear()} COLOCA. All rights reserved.
                    </div>
                </div>
            </footer>
        </div>
    );
}