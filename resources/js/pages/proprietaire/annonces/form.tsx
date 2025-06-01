import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { useForm } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import EquipementSelector from './equipSelector';
import { PreferenceSelector } from './prefSelectore';

interface Region {
    id: string;
    name?: string;
    [key: string]: string | undefined;
}

interface Equipement {
    id: string;
    name: string;
    [key: string]: string;
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

interface PreferenceValue {
    id: string;
    value: string;
    preference_id: string;
    [key: string]: string;
}

interface Preference {
    id: string;
    name: string;
    preference_values: PreferenceValue[];
    [key: string]: string | PreferenceValue[];
}

interface AnnoncePreference {
    id: string;
    name: string;
}

interface AnnoncePreferenceValue {
    id: string;
    value: string;
}

interface AnnonceEquipement {
    id: string;
    equipement_id: string;
    annonce_id: string;
    equipements: Equipement;
}

interface AnnoncePreferenceValues {
    preference: AnnoncePreference;
    preference_value: AnnoncePreferenceValue;
}

interface SelectedPreference {
    preferenceId: string;
    preferenceName: string;
    valueId: string;
    valueName: string;
}

// interface SelectedEquipement {
//     equipement_id: string;
//     annonce_id: string;
//     equipementName: string;
// }

interface Annonce {
    id?: string;
    title: string;
    description: string;
    address_id: string;
    address: Address;
    loyer: number;
    annonce_preference_values: AnnoncePreferenceValues[];
    annonce_equipements: AnnonceEquipement[];
    [key: string]: string | undefined | Address | number | AnnoncePreferenceValues[] | AnnonceEquipement[];
}

interface FormData {
    title: string;
    description: string;
    address: Address;
    loyer: number;
    photos: File[];
    preferences: any;
    equipements: any;
    [key: string]: string | number | Address | File[] | any;
}

interface Props {
    regions?: Region[];
    annonce?: Annonce;
    preferences: Preference[];
    type: string;
    equipements: Equipement[];
}

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

export default function Form({ annonce, regions, type, preferences, equipements }: Props) {
    const { data, setData, post, processing, errors } = useForm<FormData>({
        title: annonce?.title || '',
        description: annonce?.description || '',
        address: {
            street: annonce?.address.street || '',
            city: annonce?.address.city || '',
            postal_code: annonce?.address.postal_code || '',
            region: {
                id: annonce?.address.region.id || '',
            },
        },
        loyer: annonce?.loyer || 0,
        photos: [],
        preferences: preferences,
        equipements: equipements,
        ...(type === 'edit' && { _method: 'PUT' }),
    });
    const [initSelectPref, setinitSelectPref] = useState<SelectedPreference[]>([]);
    const [initSelectEquip, setinitSelectEquip] = useState<Equipement[]>([]);

    useEffect(() => {
        if (annonce?.annonce_preference_values) {
            const initialPrefs: SelectedPreference[] = annonce.annonce_preference_values.map((prefVal) => ({
                preferenceId: prefVal.preference.id,
                preferenceName: prefVal.preference.name,
                valueId: prefVal.preference_value.id,
                valueName: prefVal.preference_value.value,
            }));
            setinitSelectPref(initialPrefs);
        }
    }, [annonce]);

    useEffect(() => {
        if (annonce?.annonce_equipements) {
            const initialEquips: Equipement[] = annonce.annonce_equipements.map((equip) => ({
                id: equip.equipement_id,
                // annonce_id: equip.annonce_id,
                name: equip.equipements.name,
            }));
            // console.log(initialEquips, 'from useEffect of initialEquips');

            setinitSelectEquip(initialEquips);
        }
    }, [equipements]);

    useEffect(() => {
        setData('preferences', initSelectPref);
    }, [initSelectPref]);

    useEffect(() => {
        setData('equipements', initSelectEquip);
    }, [initSelectEquip]);
    // useEffect(() => console.log(data.preferences, initSelectPref), [data, initSelectPref]);

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
        // console.log('Form submitted with data:');
        console.log(data);

        post(route(type === 'create' ? 'annonces.store' : 'annonces.update', { annonce }), {
            forceFormData: true,
            onSuccess: () => {
                // console.log('Form submitted successfully');
            },
            onError: (errors) => {
                console.error('Form submission errors:', errors);
            },
        });
    }

    return (
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
                <Label htmlFor="postal_code">Postal code</Label>
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
                    <SelectTrigger id="region" className={errors['address.region.id'] ? 'border-red-500' : ''}>
                        <SelectValue placeholder="Select a region" />
                    </SelectTrigger>
                    <SelectContent>
                        {regions &&
                            regions.map((region) => (
                                <SelectItem key={region.id} value={region.id}>
                                    {region.name}
                                </SelectItem>
                            ))}
                    </SelectContent>
                </Select>
                {errors['address.region.id'] && <p className="mt-1 text-sm text-red-500">{errors['address.region.id']}</p>}
            </div>
            <div>
                <Label htmlFor="preferences">Preferences</Label>
                <PreferenceSelector
                    preferences={preferences}
                    onPreferencesChange={(selectedPreferences) => {
                        console.log(selectedPreferences, '#FRom compo');

                        setData('preferences', selectedPreferences);
                    }}
                    initialSelectedPreferences={initSelectPref}
                />
                {errors['preferences'] && <p className="mt-1 text-sm text-red-500">{errors['preferences']}</p>}
            </div>
            <div>
                <Label htmlFor="preferences">Equipements</Label>
                <EquipementSelector
                    equipements={equipements}
                    onEquipementsChange={(selectedEquipement) => {
                        setData('equipements', selectedEquipement);
                    }}
                    initialSelectedEquipements={initSelectEquip}
                />
                {errors['equipements'] && <p className="mt-1 text-sm text-red-500">{errors['equipements']}</p>}
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
                    {type === 'create' ? 'Create' : 'Edit'}
                </Button>
                <Button type="button" variant="outline" onClick={() => window.history.back()}>
                    Cancel
                </Button>
            </div>
        </form>
    );
}
