// components/preference-form.tsx
import { Label } from '@/components/ui/label';
import { Input } from '@headlessui/react';
import { Plus, X } from 'lucide-react';
import { useState } from 'react';

export interface PreferenceValue {
    id: number;
    value: string;
    [key: string]: string | number;
}

interface PreferenceFormProps {
    data: {
        name: string;
        preference_values: PreferenceValue[];
    };
    setData: (key: string, value: any) => void;
    errors: Record<string, string>;
    processing: boolean;
    onSubmit: (e: React.FormEvent) => void;
    mode: 'create' | 'edit';
}

export default function PreferenceForm({ data, setData, errors, processing, onSubmit, mode }: PreferenceFormProps) {
    const [newOptionLabel, setNewOptionLabel] = useState('');

    const handleAddOption = () => {
        const trimmed = newOptionLabel.trim();
        if (!trimmed) return;

        const newOption: PreferenceValue = {
            id: Date.now(),
            value: trimmed.toLowerCase(),
            // value: trimmed.toLowerCase().replace(/\s+/g, '_'),
        };

        setData('preference_values', [...data.preference_values, newOption]);
        setNewOptionLabel('');
    };

    const handleRemoveOption = (id: number) => {
        setData(
            'preference_values',
            data.preference_values.filter((opt) => opt.id !== id),
        );
    };

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

                <div>
                    <Label htmlFor="new-option">Options</Label>
                    <div className="mt-1 flex items-center gap-2">
                        <Input
                            id="new-option"
                            type="text"
                            value={newOptionLabel}
                            onChange={(e) => setNewOptionLabel(e.target.value)}
                            placeholder="Add option..."
                            className={`w-full rounded border px-3 py-2 ${errors.preference_values ? 'border-red-500' : ''}`}
                        />
                        <button type="button" onClick={handleAddOption} className="rounded bg-blue-500 p-2 text-white hover:bg-blue-600">
                            <Plus size={18} />
                        </button>
                    </div>

                    {errors.preference_values && typeof errors.preference_values === 'string' && (
                        <p className="mt-1 text-sm text-red-500">{errors.preference_values}</p>
                    )}

                    <div className="mt-3 flex flex-wrap gap-2">
                        {data.preference_values.map((option) => (
                            <div key={option.id} className="flex items-center gap-1 rounded-full bg-gray-200 px-3 py-1 text-sm text-black">
                                {option.value}
                                <button type="button" onClick={() => handleRemoveOption(option.id)} className="text-gray-500 hover:text-red-500">
                                    <X size={14} />
                                </button>
                            </div>
                        ))}
                    </div>

                    {Object.entries(errors).map(
                        ([key, message]) =>
                            key.startsWith('preference_values.') && (
                                <p key={key} className="mt-1 text-sm text-red-500">
                                    {message}
                                </p>
                            ),
                    )}
                </div>

                <button
                    type="submit"
                    disabled={processing}
                    className="rounded bg-green-600 px-4 py-2 text-white hover:bg-green-700 disabled:opacity-50"
                >
                    {mode === 'create' ? 'Create Preference' : 'Update Preference'}
                </button>
            </form>
        </div>
    );
}
