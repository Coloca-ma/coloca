// components/preference-form.tsx
import { Label } from '@/components/ui/label';

export interface PreferenceValue {
    name: string;
    [key: string]: string;
}

interface PreferenceFormProps {
    data: {
        name: string;
    };
    setData: (name: string, value: string) => void;
    errors: Record<string, string>;
    processing: boolean;
    onSubmit: (e: React.FormEvent) => void;
    mode: 'create' | 'edit';
}

export default function EquipementForm({ data, setData, errors, processing, onSubmit, mode }: PreferenceFormProps) {
    return (
        <div className="space-y-6 p-6">
            <form onSubmit={onSubmit} className="mx-auto max-w-xl space-y-4">
                <div>
                    <Label htmlFor="name">Name</Label>
                    <input
                        id="name"
                        type="text"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        className="mt-1 w-full rounded border px-3 py-2"
                    />
                    {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
                </div>

                <button type="submit" disabled={processing} className="cursor-pointer rounded bg-white px-4 py-2 text-black disabled:opacity-50">
                    {mode === 'create' ? 'Create Equipements' : 'Update Equipements'}
                </button>
            </form>
        </div>
    );
}
