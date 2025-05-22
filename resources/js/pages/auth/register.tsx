import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler } from 'react';

import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import AuthLayout from '@/layouts/auth-layout';

type RegisterForm = {
    first_name: string;
    last_name: string;
    phone: string;
    role: 'colocataire' | 'proprietaire';
    email: string;
    password: string;
    password_confirmation: string;
};

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm<Required<RegisterForm>>({
        first_name: '',
        last_name: '',
        phone: '',
        role: 'colocataire',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('register'), {
            onFinish: () => {
                reset('password', 'password_confirmation');
                console.log('Registration complete');
            },
            onError: (errors) => {
                console.error('Registration errors:', errors);
            },
        });
    };

    return (
        <div>
            <Head title="Register" />
            <div className="mx-auto w-full max-w-md px-4 py-12">
                <div className="mb-10 text-center">
                    <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-green-400 to-teal-500 shadow-lg">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="32"
                            height="32"
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
                    <h1 className="mb-3 text-3xl font-bold text-gray-900 dark:text-white">
                        Join <span className="bg-gradient-to-r from-green-500 to-teal-600 bg-clip-text text-transparent">COLOCA</span>
                    </h1>
                    <p className="text-lg text-gray-600 dark:text-gray-300">
                        Find your perfect shared living space
                    </p>
                </div>

                <form className="space-y-5 rounded-2xl bg-white p-8 shadow-sm dark:bg-gray-800/50 dark:shadow-gray-700/30" onSubmit={submit}>
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                        <div className="space-y-2">
                            <Label htmlFor="first_name" className="text-gray-700 dark:text-gray-300">
                                First Name *
                            </Label>
                            <Input
                                id="first_name"
                                className="focus:ring-2 focus:ring-green-500 focus:border-transparent dark:border-gray-600 dark:bg-gray-700/50 dark:text-white dark:focus:ring-teal-500"
                                value={data.first_name}
                                onChange={(e) => setData('first_name', e.target.value)}
                                required
                                autoFocus
                                disabled={processing}
                            />
                            <InputError message={errors.first_name} />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="last_name" className="text-gray-700 dark:text-gray-300">
                                Last Name *
                            </Label>
                            <Input
                                id="last_name"
                                className="focus:ring-2 focus:ring-green-500 focus:border-transparent dark:border-gray-600 dark:bg-gray-700/50 dark:text-white dark:focus:ring-teal-500"
                                value={data.last_name}
                                onChange={(e) => setData('last_name', e.target.value)}
                                required
                                disabled={processing}
                            />
                            <InputError message={errors.last_name} />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="phone" className="text-gray-700 dark:text-gray-300">
                            Phone Number *
                        </Label>
                        <Input
                            id="phone"
                            type="tel"
                            className="focus:ring-2 focus:ring-green-500 focus:border-transparent dark:border-gray-600 dark:bg-gray-700/50 dark:text-white dark:focus:ring-teal-500"
                            value={data.phone}
                            onChange={(e) => setData('phone', e.target.value)}
                            required
                            disabled={processing}
                            placeholder="+33 6 12 34 56 78"
                        />
                        <InputError message={errors.phone} />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="role" className="text-gray-700 dark:text-gray-300">
                            I am a *
                        </Label>
                        <Select
                            value={data.role}
                            onValueChange={(value: 'colocataire' | 'proprietaire') => setData('role', value)}
                            disabled={processing}
                        >
                            <SelectTrigger className="focus:ring-2 focus:ring-green-500 focus:border-transparent dark:border-gray-600 dark:bg-gray-700/50 dark:text-white dark:focus:ring-teal-500">
                                <SelectValue placeholder="Select your role" />
                            </SelectTrigger>
                            <SelectContent className="border-gray-200 dark:border-gray-600 dark:bg-gray-700">
                                <SelectItem 
                                    value="colocataire"
                                    className="hover:bg-gray-100 dark:hover:bg-gray-600"
                                >
                                    Tenant (Colocataire)
                                </SelectItem>
                                <SelectItem 
                                    value="proprietaire"
                                    className="hover:bg-gray-100 dark:hover:bg-gray-600"
                                >
                                    Owner (Propriétaire)
                                </SelectItem>
                            </SelectContent>
                        </Select>
                        <InputError message={errors.role} />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="email" className="text-gray-700 dark:text-gray-300">
                            Email Address *
                        </Label>
                        <Input
                            id="email"
                            type="email"
                            className="focus:ring-2 focus:ring-green-500 focus:border-transparent dark:border-gray-600 dark:bg-gray-700/50 dark:text-white dark:focus:ring-teal-500"
                            required
                            autoComplete="email"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            disabled={processing}
                            placeholder="your@email.com"
                        />
                        <InputError message={errors.email} />
                    </div>

                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                        <div className="space-y-2">
                            <Label htmlFor="password" className="text-gray-700 dark:text-gray-300">
                                Password *
                            </Label>
                            <Input
                                id="password"
                                type="password"
                                className="focus:ring-2 focus:ring-green-500 focus:border-transparent dark:border-gray-600 dark:bg-gray-700/50 dark:text-white dark:focus:ring-teal-500"
                                required
                                autoComplete="new-password"
                                value={data.password}
                                onChange={(e) => setData('password', e.target.value)}
                                disabled={processing}
                                placeholder="At least 8 characters"
                            />
                            <InputError message={errors.password} />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="password_confirmation" className="text-gray-700 dark:text-gray-300">
                                Confirm Password *
                            </Label>
                            <Input
                                id="password_confirmation"
                                type="password"
                                className="focus:ring-2 focus:ring-green-500 focus:border-transparent dark:border-gray-600 dark:bg-gray-700/50 dark:text-white dark:focus:ring-teal-500"
                                required
                                autoComplete="new-password"
                                value={data.password_confirmation}
                                onChange={(e) => setData('password_confirmation', e.target.value)}
                                disabled={processing}
                                placeholder="Confirm your password"
                            />
                            <InputError message={errors.password_confirmation} />
                        </div>
                    </div>

                    <Button 
                        type="submit" 
                        className="mt-6 w-full bg-gradient-to-r from-green-600 to-teal-600 py-6 text-lg font-medium text-white shadow-lg hover:from-green-700 hover:to-teal-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2 dark:ring-offset-gray-800" 
                        disabled={processing}
                    >
                        {processing ? (
                            <LoaderCircle className="h-5 w-5 animate-spin" />
                        ) : (
                            "Create Account"
                        )}
                    </Button>

                    <div className="pt-2 text-center text-sm text-gray-600 dark:text-gray-400">
                        Already have an account?{' '}
                        <TextLink 
                            href={route('login')} 
                            className="font-medium text-green-600 hover:text-green-700 dark:text-teal-400 dark:hover:text-teal-300"
                        >
                            Sign in here
                        </TextLink>
                    </div>
                </form>
            </div>
        </div>
    );
}