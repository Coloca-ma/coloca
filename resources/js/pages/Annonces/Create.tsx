import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import AppLayout from '@/layouts/app-layout';
import { cn } from '@/lib/utils';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import React from 'react';

interface Region {
    id: string;
    [key: string]: string;
}

interface Props {
    regions: Region[];
    success?: string;
}

interface Address {
    street: string;
    city: string;
    postalCode: string;
    region: Region;
    [key: string]: string | Region;
}

interface FormData {
    title: string;
    description: string;
    address: Address;
    loyer: string;
    photos: File[];
    [key: string]: string | File[] | Record<string, string | Record<string, string>>;
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Annonces', href: route('annonces.index') },
    { title: 'Create', href: route('annonces.create') },
];

export default function Create({ regions }: Props) {
    const { data, setData, post, processing, errors } = useForm<FormData>({
        title: '',
        description: '',
        address: {
            street: '',
            city: '',
            postalCode: '',
            region: {
                id: '',
            },
        },
        loyer: '',
        photos: [],
    });

    function handleAddressChange(field: string, value: string) {
        setData('address', {
            ...data.address,
            [field]: field === 'region' ? { id: value } : value,
        });
    }

    function handlePhotoChange(e: React.ChangeEvent<HTMLInputElement>) {
        if (e.target.files) {
            const fileList = Array.from(e.target.files);
            setData('photos', fileList);
        }
    }

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        console.log('Form submitted with data:');

        // Use FormData for file uploads with Inertia
        const formData = new FormData();
        formData.append('title', data.title);
        formData.append('description', data.description);
        formData.append('address[street]', data.address.street);
        formData.append('address[city]', data.address.city);
        formData.append('address[postalCode]', data.address.postalCode);
        formData.append('address[region][id]', data.address.region.id);
        formData.append('loyer', data.loyer);

        // Append each photo to the FormData
        if (data.photos.length > 0) {
            data.photos.forEach((photo, index) => {
                formData.append(`photos[${index}]`, photo);
            });
        }

        // Use post with the formData and specify multipart/form-data
        post(route('annonces.store'), {
            forceFormData: true,
            onSuccess: () => {
                console.log('Form submitted successfully');
            },
            onError: (errors) => {
                console.error('Form submission errors:');
            },
        });
    }

    // Import the correct Textarea component
    const Textarea = ({ className, ...props }: React.TextareaHTMLAttributes<HTMLTextAreaElement>) => (
        <textarea
            className={cn(
                'border-input flex h-20 w-full min-w-0 rounded-md border bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
                'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]',
                'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
                className,
            )}
            {...props}
        />
    );

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Annonce" />

            <div className="mx-auto w-full space-y-8 px-4 py-8 xl:max-w-6xl">
                <h1 className="mx-auto mb-6 max-w-2xl text-2xl font-bold">Create Annonce</h1>

                <form onSubmit={handleSubmit} className="mx-auto max-w-2xl space-y-6" encType="multipart/form-data">
                    <div>
                        <Label htmlFor="title">Title</Label>
                        <Input
                            id="title"
                            type="text"
                            name="title"
                            value={data.title}
                            onChange={(e) => setData('title', e.target.value)}
                            className={errors.title ? 'border-red-500' : ''}
                        />
                        {errors.title && <p className="mt-1 text-sm text-red-500">{errors.title}</p>}
                    </div>
                    <div>
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                            id="description"
                            name="description"
                            value={data.description}
                            onChange={(e) => setData('description', e.target.value)}
                            className={errors.description ? 'border-red-500' : ''}
                        />
                        {errors.description && <p className="mt-1 text-sm text-red-500">{errors.description}</p>}
                    </div>
                    <div>
                        <Label htmlFor="street">Street</Label>
                        <Input
                            id="street"
                            name="street"
                            type="text"
                            value={data.address.street}
                            onChange={(e) => handleAddressChange('street', e.target.value)}
                            className={errors['address.street'] ? 'border-red-500' : ''}
                        />
                        {errors['address.street'] && <p className="mt-1 text-sm text-red-500">{errors['address.street']}</p>}
                    </div>
                    <div>
                        <Label htmlFor="city">City</Label>
                        <Input
                            id="city"
                            name="city"
                            type="text"
                            value={data.address.city}
                            onChange={(e) => handleAddressChange('city', e.target.value)}
                            className={errors['address.city'] ? 'border-red-500' : ''}
                        />
                        {errors['address.city'] && <p className="mt-1 text-sm text-red-500">{errors['address.city']}</p>}
                    </div>
                    <div>
                        <Label htmlFor="postalCode">PostalCode</Label>
                        <Input
                            id="postalCode"
                            name="postal_code"
                            type="text"
                            inputMode="numeric"
                            pattern="[0-9]{5}"
                            maxLength={5}
                            value={data.address.postalCode}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                const value = e.target.value.replace(/\D/g, '');
                                handleAddressChange('postalCode', value);
                            }}
                            onInvalid={(e: React.FormEvent<HTMLInputElement>) => {
                                e.preventDefault();
                                (e.target as HTMLInputElement).setCustomValidity('Please enter exactly 5 digits');
                            }}
                            onInput={(e: React.FormEvent<HTMLInputElement>) => {
                                (e.target as HTMLInputElement).setCustomValidity('');
                            }}
                            className={errors['address.postalCode'] ? 'border-red-500' : ''}
                        />
                        {errors['address.postalCode'] && <p className="mt-1 text-sm text-red-500">{errors['address.postalCode']}</p>}
                    </div>
                    <div>
                        <Label htmlFor="region">Region</Label>
                        <Select name="region" value={data.address.region.id} onValueChange={(value) => handleAddressChange('region', value)}>
                            <SelectTrigger id="region" className={errors['address.region'] ? 'border-red-500' : ''}>
                                <SelectValue placeholder="Select a region" />
                            </SelectTrigger>
                            <SelectContent>
                                {regions.map((region) => (
                                    <SelectItem key={region.id} value={region.id}>
                                        {region.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        {errors['address.region.id'] && <p className="mt-1 text-sm text-red-500">{errors['address.region.id']}</p>}
                    </div>
                    <div>
                        <Label htmlFor="loyer">Loyer</Label>
                        <Input
                            id="loyer"
                            name="loyer"
                            type="number"
                            value={data.loyer}
                            onChange={(e) => setData('loyer', e.target.value)}
                            className={errors.loyer ? 'border-red-500' : ''}
                        />
                        {errors.loyer && <p className="mt-1 text-sm text-red-500">{errors.loyer}</p>}
                    </div>
                    <div>
                        <Label htmlFor="photos">Photos</Label>
                        <Input
                            id="photos"
                            type="file"
                            name="photos[]"
                            accept="image/*"
                            multiple
                            onChange={handlePhotoChange}
                            className={errors.photos ? 'border-red-500' : ''}
                        />
                        {errors.photos && <p className="mt-1 text-sm text-red-500">{errors.photos}</p>}
                    </div>

                    <div className="flex items-center gap-4">
                        <Button type="submit" disabled={processing}>
                            Create
                        </Button>
                        <Button type="button" variant="outline" onClick={() => window.history.back()}>
                            Cancel
                        </Button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}

// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
// import AppLayout from '@/layouts/app-layout';
// import { cn } from '@/lib/utils';
// import { type BreadcrumbItem } from '@/types';
// import { Textarea } from '@headlessui/react';
// import { Head, useForm } from '@inertiajs/react';
// import { useEffect } from 'react';

// interface Region {
//     id: string;
//     [key: string]: string;
// }

// interface Props {
//     regions: Region[];
//     success?: string;
// }

// interface Address {
//     street: string;
//     city: string;
//     postalCode: string;
//     region: Region;
//     [key: string]: string | Region;
// }

// interface FormData {
//     title: string;
//     description: string;
//     address: Address;
//     loyer: string;
//     photos: File[];
//     [key: string]: string | File[] | Record<string, string | Record<string, string>>;
// }

// const breadcrumbs: BreadcrumbItem[] = [
//     { title: 'Annonces', href: route('annonces.index') },
//     { title: 'Create', href: route('annonces.create') },
// ];

// export default function Create({ regions }: Props) {
//     const { data, setData, post, processing, errors } = useForm<FormData>({
//         title: '',
//         description: '',
//         address: {
//             street: '',
//             city: '',
//             postalCode: '',
//             region: {
//                 id: '',
//             },
//         },
//         loyer: '',
//         photos: [],
//     });

//     useEffect(() => {
//         console.log(errors);
//     }, [errors]);

//     function handleAddressChange(field: string, value: string) {
//         setData('address', {
//             ...data.address,
//             [field]: field === 'region' ? { id: value } : value,
//         });
//     }

//     function handlePhotoChange(e: React.ChangeEvent<HTMLInputElement>) {
//         if (e.target.files) {
//             const fileList = Array.from(e.target.files);
//             setData('photos', fileList);
//         }
//     }

//     function handleSubmit(e: React.FormEvent) {
//         e.preventDefault();
//         console.log('data');

//         post(route('annonces.store'), {
//             forceFormData: true,
//             onSuccess: () => {
//                 console.log('Form submitted successfully');
//             },
//             onError: (errors) => {
//                 console.error('Form submission errors:', errors);
//             },
//         });
//     }

//     return (
//         <AppLayout breadcrumbs={breadcrumbs}>
//             <Head title="Create Annonce" />

//             <div className="p-6">
//                 <h1 className="mb-6 text-2xl font-bold">Create Annonce</h1>

//                 <form onSubmit={handleSubmit} className="max-w-2xl space-y-6">
//                     <div>
//                         <Label htmlFor="title">Title</Label>
//                         <Input
//                             id="title"
//                             type="text"
//                             name="title"
//                             value={data.title}
//                             onChange={(e) => setData('title', e.target.value)}
//                             className={errors.title ? 'border-red-500' : ''}
//                         />
//                         {errors.title && <p className="mt-1 text-sm text-red-500">{errors.title}</p>}
//                     </div>
//                     <div>
//                         <Label htmlFor="description">Description</Label>
//                         <Textarea
//                             id="description"
//                             name="description"
//                             value={data.description}
//                             onChange={(e) => setData('description', e.target.value)}
//                             className={cn(
//                                 'border-input flex h-20 w-full min-w-0 rounded-md border bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
//                                 'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]',
//                                 'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
//                                 errors.description ? 'border-red-500' : '',
//                             )}
//                         />
//                         {errors.description && <p className="mt-1 text-sm text-red-500">{errors.description}</p>}
//                     </div>
//                     <div>
//                         <Label htmlFor="street">Street</Label>
//                         <Input
//                             id="street"
//                             name="street"
//                             type="text"
//                             value={data.address.street}
//                             onChange={(e) => handleAddressChange('street', e.target.value)}
//                             className={errors['address.street'] ? 'border-red-500' : ''}
//                         />
//                         {errors['address.street'] && <p className="mt-1 text-sm text-red-500">{errors['address.street']}</p>}
//                     </div>
//                     <div>
//                         <Label htmlFor="city">City</Label>
//                         <Input
//                             id="city"
//                             name="city"
//                             type="text"
//                             value={data.address.city}
//                             onChange={(e) => handleAddressChange('city', e.target.value)}
//                             className={errors['address.city'] ? 'border-red-500' : ''}
//                         />
//                         {errors['address.city'] && <p className="mt-1 text-sm text-red-500">{errors['address.city']}</p>}
//                     </div>
//                     <div>
//                         <Label htmlFor="postalCode">PostalCode</Label>
//                         <Input
//                             id="postalCode"
//                             name="postal_code"
//                             type="text"
//                             inputMode="numeric"
//                             pattern="[0-9]{5}"
//                             maxLength={5}
//                             value={data.address.postalCode}
//                             onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
//                                 const value = e.target.value.replace(/\D/g, '');
//                                 handleAddressChange('postalCode', value);
//                             }}
//                             onInvalid={(e: React.FormEvent<HTMLInputElement>) => {
//                                 e.preventDefault();
//                                 (e.target as HTMLInputElement).setCustomValidity('Please enter exactly 5 digits');
//                             }}
//                             onInput={(e: React.FormEvent<HTMLInputElement>) => {
//                                 (e.target as HTMLInputElement).setCustomValidity('');
//                             }}
//                             className={errors['address.postalCode'] ? 'border-red-500' : ''}
//                         />
//                         {errors['address.postalCode'] && <p className="mt-1 text-sm text-red-500">{errors['address.postalCode']}</p>}
//                     </div>
//                     <div>
//                         <Label htmlFor="region">Region</Label>
//                         <Select name="region" value={data.address.region.id} onValueChange={(value) => handleAddressChange('region', value)}>
//                             <SelectTrigger id="region" className={errors['address.region.id'] ? 'border-red-500' : ''}>
//                                 <SelectValue placeholder="Select a region" />
//                             </SelectTrigger>
//                             <SelectContent>
//                                 {regions.map((region) => (
//                                     <SelectItem key={region.name} value={region.id}>
//                                         {region.name}
//                                     </SelectItem>
//                                 ))}
//                             </SelectContent>
//                         </Select>
//                         {errors['address.region.id'] && <p className="mt-1 text-sm text-red-500">{errors['address.region.id']}</p>}
//                     </div>
//                     <div>
//                         <Label htmlFor="loyer">Loyer</Label>
//                         <Input
//                             id="loyer"
//                             name="loyer"
//                             type="number"
//                             value={data.loyer}
//                             onChange={(e) => setData('loyer', e.target.value)}
//                             className={errors.loyer ? 'border-red-500' : ''}
//                         />
//                         {errors.loyer && <p className="mt-1 text-sm text-red-500">{errors.loyer}</p>}
//                     </div>
//                     <div>
//                         <Label htmlFor="photos">Photos</Label>
//                         <Input
//                             id="photos"
//                             type="file"
//                             name="photos[]"
//                             accept="image/*"
//                             multiple
//                             onChange={handlePhotoChange}
//                             className={errors.photos ? 'border-red-500' : ''}
//                         />
//                         {/* {
//                             data.photos.map((photo, idx) => {
//                                 return errors.photos[idx] && <p className="mt-1 text-sm text-red-500">{errors.photos[idx]}</p>
//                             })
//                         } */}
//                         {errors.photos && <p className="mt-1 text-sm text-red-500">{errors.photos}</p>}
//                     </div>

//                     {/* Add other form fields */}

//                     <div className="flex items-center gap-4">
//                         <Button type="submit" disabled={processing}>
//                             Create
//                         </Button>
//                         <Button type="button" variant="outline" onClick={() => window.history.back()}>
//                             Cancel
//                         </Button>
//                     </div>
//                 </form>
//             </div>
//         </AppLayout>
//     );
// }
