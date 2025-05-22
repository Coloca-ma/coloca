import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler } from 'react';

import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AuthLayout from '@/layouts/auth-layout';

type LoginForm = {
    email: string;
    password: string;
    remember: boolean;
};

interface LoginProps {
    status?: string;
    canResetPassword: boolean;
}

export default function Login({ status, canResetPassword }: LoginProps) {
    const { data, setData, post, processing, errors, reset } = useForm<Required<LoginForm>>({
        email: '',
        password: '',
        remember: false,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('login'), {
            onFinish: () => reset('password'),
            preserveState: true,
        });
    };

    return (
        <div>
            <Head title="Log in" />
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
                        Welcome to <span className="bg-gradient-to-r from-green-500 to-teal-600 bg-clip-text text-transparent">COLOCA</span>
                    </h1>
                    <p className="text-lg text-gray-600 dark:text-gray-300">
                        Sign in to your account
                    </p>
                </div>

                {status && (
                    <div className="mb-6 rounded-lg bg-green-50 p-4 text-center text-green-700 dark:bg-green-900/20 dark:text-green-300">
                        {status}
                    </div>
                )}

                <form className="space-y-5 rounded-2xl bg-white p-8 shadow-sm dark:bg-gray-800/50 dark:shadow-gray-700/30" onSubmit={submit}>
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="email" className="text-gray-700 dark:text-gray-300">
                                Email Address *
                            </Label>
                            <Input
                                id="email"
                                type="email"
                                className="focus:ring-2 focus:ring-green-500 focus:border-transparent dark:border-gray-600 dark:bg-gray-700/50 dark:text-white dark:focus:ring-teal-500"
                                required
                                autoFocus
                                autoComplete="email"
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                                placeholder="your@email.com"
                                disabled={processing}
                            />
                            <InputError message={errors.email} />
                        </div>

                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <Label htmlFor="password" className="text-gray-700 dark:text-gray-300">
                                    Password *
                                </Label>
                                {canResetPassword && (
                                    <TextLink 
                                        href={route('password.request')} 
                                        className="text-sm text-green-600 hover:text-green-700 dark:text-teal-400 dark:hover:text-teal-300"
                                    >
                                        Forgot password?
                                    </TextLink>
                                )}
                            </div>
                            <Input
                                id="password"
                                type="password"
                                className="focus:ring-2 focus:ring-green-500 focus:border-transparent dark:border-gray-600 dark:bg-gray-700/50 dark:text-white dark:focus:ring-teal-500"
                                required
                                autoComplete="current-password"
                                value={data.password}
                                onChange={(e) => setData('password', e.target.value)}
                                placeholder="••••••••"
                                disabled={processing}
                            />
                            <InputError message={errors.password} />
                        </div>

                        <div className="flex items-center space-x-3">
                            <Checkbox
                                id="remember"
                                name="remember"
                                checked={data.remember}
                                onClick={() => setData('remember', !data.remember)}
                                disabled={processing}
                                className="h-5 w-5 rounded border-gray-300 text-green-600 focus:ring-green-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-teal-500"
                            />
                            <Label htmlFor="remember" className="text-gray-700 dark:text-gray-300">
                                Remember me
                            </Label>
                        </div>

                        <Button 
                            type="submit" 
                            className="mt-6 w-full bg-gradient-to-r from-green-600 to-teal-600 py-6 text-lg font-medium text-white shadow-lg hover:from-green-700 hover:to-teal-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2 dark:ring-offset-gray-800" 
                            disabled={processing}
                        >
                            {processing ? (
                                <LoaderCircle className="h-5 w-5 animate-spin" />
                            ) : (
                                "Sign In"
                            )}
                        </Button>
                    </div>

                    <div className="pt-2 text-center text-sm text-gray-600 dark:text-gray-400">
                        Don't have an account?{' '}
                        <TextLink 
                            href={route('register')} 
                            className="font-medium text-green-600 hover:text-green-700 dark:text-teal-400 dark:hover:text-teal-300"
                        >
                            Create one
                        </TextLink>
                    </div>
                </form>
            </div>
        </div>
    );
}