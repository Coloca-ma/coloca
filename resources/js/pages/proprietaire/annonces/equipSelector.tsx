import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarTrigger } from '@/components/ui/menubar';
import { PlusCircle, X } from 'lucide-react';
import { useEffect, useState } from 'react';

interface Equipement {
    id: string;
    name: string;
    [key: string]: string;
}

interface EquipementSelectorProps {
    equipements: Equipement[];
    onEquipementsChange: (selectedEquipements: Equipement[]) => void;
    initialSelectedEquipements?: Equipement[];
}

export default function EquipementSelector({ equipements, onEquipementsChange, initialSelectedEquipements = [] }: EquipementSelectorProps) {
    const [selectedEquipements, setSelectedEquipements] = useState<Equipement[]>(initialSelectedEquipements);

    useEffect(() => {
        setSelectedEquipements(initialSelectedEquipements);
    }, [initialSelectedEquipements]);

    // console.log(initialSelectedEquipements, se);

    // Get list of equipements not yet selected
    const availableEquipements = equipements.filter((equip) => !selectedEquipements.some((selected) => selected.id === equip.id));

    const handleSelectEquipement = (equipement: Equipement) => {
        const newSelectedEquipement = {
            id: equipement.id,
            name: equipement.name,
            // annonceId: equipement.name,
        };

        const updatedEquipements = [...selectedEquipements, newSelectedEquipement];
        setSelectedEquipements(updatedEquipements);
        onEquipementsChange(updatedEquipements);
    };

    const handleRemoveEquipement = (id: string) => {
        const updatedEquipements = selectedEquipements.filter((equip) => equip.id !== id);
        setSelectedEquipements(updatedEquipements);
        onEquipementsChange(updatedEquipements);
    };

    return (
        <div className="space-y-4">
            <div className="flex items-center space-x-2">
                <Menubar className="border-none p-0">
                    <MenubarMenu>
                        <MenubarTrigger className="bg-primary text-primary-foreground hover:bg-primary/90 data-[state=open]:bg-primary/80 flex items-center gap-1 px-3 py-2">
                            <PlusCircle className="h-4 w-4" />
                            <span>Add Equipement</span>
                        </MenubarTrigger>
                        <MenubarContent align="start" className="min-w-[220px]">
                            {availableEquipements.length > 0 ? (
                                availableEquipements.map((equipement) => (
                                    <MenubarItem key={equipement.id} className="capitalize" onClick={() => handleSelectEquipement(equipement)}>
                                        {equipement.name}
                                    </MenubarItem>
                                    // <MenubarSub key={equipement.id}>
                                    //     <MenubarSubTrigger className="capitalize" on>{equipement.name}</MenubarSubTrigger>
                                    //     <MenubarSubContent className="min-w-[180px]">
                                    //         {equipement.map((value) => (
                                    //             <MenubarItem
                                    //                 key={value.id}
                                    //                 onClick={() => handleSelectEquipement(equipement, value)}
                                    //                 className="capitalize"
                                    //             >
                                    //                 {value.value}
                                    //             </MenubarItem>
                                    //         ))}
                                    //     </MenubarSubContent>
                                    // </MenubarSub>
                                ))
                            ) : (
                                <MenubarItem disabled>All equipements selected</MenubarItem>
                            )}
                        </MenubarContent>
                    </MenubarMenu>
                </Menubar>
            </div>

            {selectedEquipements.length > 0 && (
                <div className="flex flex-wrap gap-2">
                    {selectedEquipements.map((equip) => (
                        <Badge key={equip.id} variant="secondary" className="flex items-center gap-1 px-3 py-1.5 text-sm capitalize">
                            <span className="font-medium">{equip.name}</span>
                            <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                className="hover:bg-secondary/80 hover:text-foreground ml-1 h-4 w-4 p-0"
                                onClick={() => handleRemoveEquipement(equip.id)}
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
