import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    Menubar,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarSub,
    MenubarSubContent,
    MenubarSubTrigger,
    MenubarTrigger,
} from '@/components/ui/menubar';
import { PlusCircle, X } from 'lucide-react';
import { useEffect, useState } from 'react';

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

interface SelectedPreference {
    preferenceId: string;
    preferenceName: string;
    valueId: string;
    valueName: string;
}

interface PreferenceSelectorProps {
    preferences: Preference[];
    onPreferencesChange: (selectedPreferences: SelectedPreference[]) => void;
    initialSelectedPreferences?: SelectedPreference[];
}

export function PreferenceSelector({ preferences, onPreferencesChange, initialSelectedPreferences = [] }: PreferenceSelectorProps) {
    const [selectedPreferences, setSelectedPreferences] = useState<SelectedPreference[]>(initialSelectedPreferences);

    useEffect(() => {
        setSelectedPreferences(initialSelectedPreferences);
    }, [initialSelectedPreferences]);

    // console.log(selectedPreferences, preferences);

    // Get list of preferences not yet selected
    const availablePreferences = preferences.filter((pref) => !selectedPreferences.some((selected) => selected.preferenceId === pref.id));

    const handleSelectPreference = (preference: Preference, value: PreferenceValue) => {
        const newSelectedPreference = {
            preferenceId: preference.id,
            preferenceName: preference.name,
            valueId: value.id,
            valueName: value.value,
        };

        const updatedPreferences = [...selectedPreferences, newSelectedPreference];
        setSelectedPreferences(updatedPreferences);
        // console.log(updatedPreferences);

        onPreferencesChange(updatedPreferences);
    };

    const handleRemovePreference = (preferenceId: string) => {
        const updatedPreferences = selectedPreferences.filter((pref) => pref.preferenceId !== preferenceId);
        setSelectedPreferences(updatedPreferences);
        onPreferencesChange(updatedPreferences);
    };

    return (
        <div className="space-y-4">
            <div className="flex items-center space-x-2">
                <Menubar className="border-none p-0">
                    <MenubarMenu>
                        <MenubarTrigger className="bg-primary text-primary-foreground hover:bg-primary/90 data-[state=open]:bg-primary/80 flex items-center gap-1 px-3 py-2">
                            <PlusCircle className="h-4 w-4" />
                            <span>Add Preference</span>
                        </MenubarTrigger>
                        <MenubarContent align="start" className="min-w-[220px]">
                            {availablePreferences.length > 0 ? (
                                availablePreferences.map((preference) => (
                                    <MenubarSub key={preference.id}>
                                        <MenubarSubTrigger className="capitalize">{preference.name}</MenubarSubTrigger>
                                        <MenubarSubContent className="min-w-[180px]">
                                            {preference.preference_values.map((value) => (
                                                <MenubarItem
                                                    key={value.id}
                                                    onClick={() => handleSelectPreference(preference, value)}
                                                    className="capitalize"
                                                >
                                                    {value.value}
                                                </MenubarItem>
                                            ))}
                                        </MenubarSubContent>
                                    </MenubarSub>
                                ))
                            ) : (
                                <MenubarItem disabled>All preferences selected</MenubarItem>
                            )}
                        </MenubarContent>
                    </MenubarMenu>
                </Menubar>
            </div>

            {selectedPreferences.length > 0 && (
                <div className="flex flex-wrap gap-2">
                    {selectedPreferences.map((pref) => (
                        <Badge
                            key={`${pref.preferenceId}-${pref.valueId}`}
                            variant="secondary"
                            className="flex items-center gap-1 px-3 py-1.5 text-sm capitalize"
                        >
                            <span className="font-medium">{pref.preferenceName}:</span>
                            <span>{pref.valueName}</span>
                            <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                className="hover:bg-secondary/80 hover:text-foreground ml-1 h-4 w-4 p-0"
                                onClick={() => handleRemovePreference(pref.preferenceId)}
                            >
                                <X className="h-3 w-3" />
                                <span className="sr-only">Remove</span>
                            </Button>
                        </Badge>
                    ))}
                </div>
            )}
        </div>
    );
}
