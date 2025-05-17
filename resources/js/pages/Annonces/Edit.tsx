import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import AppLayout from '@/layouts/app-layout';
import { cn } from '@/lib/utils';
import { BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';

interface Region {
    id: string;
    name?: string;
    [key: string]: string | undefined;
}

interface Address {
    id?: string;
    street: string;
    city: string;
    postal_code: string;
    region_id?: Region;
    region: Region;
    [key: string]: string | undefined | Region;
}

interface Annonce {
    id?: string;
    title: string;
    description: string;
    address_id: string;
    address: Address;
    loyer: number;
    [key: string]: string | undefined | Address | number;
}

interface FormData {
    title: string;
    description: string;
    address: Address;
    loyer: number;
    photos: File[];
    [key: string]: string | number | Address | File[];
}

interface Props {
    annonce: Annonce;
    regions: Region[];
}

export default function Edit({ annonce, regions }: Props) {
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Annonces', href: route('annonces.index') },
        { title: 'Edit Annonce', href: route('annonces.edit', annonce.id) },
    ];

    const { data, setData, post, processing, errors } = useForm<FormData>({
        title: annonce.title,
        description: annonce.description,
        address: {
            street: annonce.address.street,
            city: annonce.address.city,
            postal_code: annonce.address.postal_code,
            region: {
                id: annonce.address.region.id,
            },
        },
        loyer: annonce.loyer,
        photos: [],
        _method: 'PUT',
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

        // Use put with the formData and specify multipart/form-data
        post(route('annonces.update', { annonce }), {
            forceFormData: true, // Ensures FormData is used
            preserveState: true,
            // onSuccess: () => {
            //     console.log('data updated successfully');
            // },
            // onError: (errors) => {
            //     console.error('Form submission errors:', errors);
            // },
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
            <Head title="Edit Annonce" />

            <div className="mx-auto w-full space-y-8 px-4 py-8 xl:max-w-6xl">
                <h1 className="mx-auto mb-6 max-w-2xl text-2xl font-bold">Edit Annonce</h1>

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
                        <Label htmlFor="postal_code">Postal_code</Label>
                        <Input
                            id="postal_code"
                            name="postal_code"
                            type="text"
                            inputMode="numeric"
                            pattern="[0-9]{5}"
                            maxLength={5}
                            value={data.address.postal_code}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                const value = e.target.value.replace(/\D/g, '');
                                handleAddressChange('postal_code', value);
                            }}
                            onInvalid={(e: React.FormEvent<HTMLInputElement>) => {
                                e.preventDefault();
                                (e.target as HTMLInputElement).setCustomValidity('Please enter exactly 5 digits');
                            }}
                            onInput={(e: React.FormEvent<HTMLInputElement>) => {
                                (e.target as HTMLInputElement).setCustomValidity('');
                            }}
                            className={errors['address.postal_code'] ? 'border-red-500' : ''}
                        />
                        {errors['address.postal_code'] && <p className="mt-1 text-sm text-red-500">{errors['address.postal_code']}</p>}
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
                            onChange={(e) => setData('loyer', Number(e.target.value))}
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
                            Edit
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
