<?php

namespace Database\Seeders;

use App\Models\Annonce;
use App\Models\Address;
use App\Models\User;
use App\Models\Region;
use App\Models\Photo;
use App\Models\Preference;
use App\Models\Equipement;
use App\Models\AnnoncePreferenceValue;
use App\Models\AnnonceEquipement;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;

class AnnonceSeeder extends Seeder
{
    public function run(): void
    {
        // Récupérer les utilisateurs propriétaires
        $youssef = User::where('email', 'youssef.proprietaire@gmail.com')->first();
        $marouane = User::where('email', 'marouane.proprietaire@gmail.com')->first();

        if (!$youssef || !$marouane) {
            throw new \Exception("Les utilisateurs propriétaires n'existent pas. Exécutez d'abord le UserSeeder.");
        }

        // Récupérer les régions pertinentes
        $casablancaRegion = Region::where('code', 'MA-06')->first();
        $rabatRegion = Region::where('code', 'MA-04')->first();

        if (!$casablancaRegion || !$rabatRegion) {
            throw new \Exception("Les régions nécessaires n'existent pas. Exécutez d'abord le RegionSeeder.");
        }

        // Récupérer des préférences et équipements existants
        $preferences = Preference::with('preferenceValues')->get();
        $equipements = Equipement::all();

        // Annonces pour Youssef (Casablanca)
        $this->createAnnoncesForUser($youssef, 3, 'Appartement moderne', 'Casablanca', '20000', 5000, $casablancaRegion->id, $preferences, $equipements);

        // Annonces pour Marouane (Rabat)
        $this->createAnnoncesForUser($marouane, 3, 'Villa spacieuse', 'Rabat', '10000', 8000, $rabatRegion->id, $preferences, $equipements);
    }

    private function createAnnoncesForUser(User $user, int $count, string $titlePrefix, string $city, string $postalCode, int $baseLoyer, string $regionId, $preferences, $equipements): void
    {
        for ($i = 1; $i <= $count; $i++) {
            // Créer l'adresse
            $address = Address::create([
                'id' => Str::uuid(),
                'street' => '123 Rue du Propriétaire ' . $i,
                'city' => $city,
                'postal_code' => $postalCode,
                'region_id' => $regionId,
            ]);

            // Créer l'annonce
            $annonce = Annonce::create([
                'id' => Str::uuid(),
                'title' => $titlePrefix . ' ' . $i . ' - ' . $user->first_name,
                'description' => $this->generateDescription($titlePrefix, $i, $city),
                'user_id' => $user->id,
                'address_id' => $address->id,
                'loyer' => $baseLoyer + ($i * 500),
            ]);

            // Ajouter des photos fictives
            $this->addFakePhotos($annonce, $i);

            // Ajouter des préférences aléatoires
            $this->addRandomPreferences($annonce, $preferences);

            // Ajouter des équipements aléatoires
            $this->addRandomEquipements($annonce, $equipements);
        }
    }

    private function addFakePhotos(Annonce $annonce, int $index): void
    {
        $seedImages = ['appartement1.jpg', 'appartement2.jpg', 'appartement3.jpg', 'villa1.jpg', 'villa2.jpg', 'villa3.jpg'];

        foreach ($seedImages as $image) {
            $newPath = "annonces/{$annonce->id}/" . Str::random(10) . '.jpg';
            Storage::disk('public')->copy("seed-images/{$image}", $newPath);

            Photo::create([
                'annonce_id' => $annonce->id,
                'path' => $newPath,
            ]);
        }
    }

    private function addRandomPreferences(Annonce $annonce, $preferences): void
    {
        foreach ($preferences as $preference) {
            // Prendre une valeur aléatoire pour chaque préférence
            $randomValue = $preference->preferenceValues->random();

            AnnoncePreferenceValue::create([
                'annonce_id' => $annonce->id,
                'preference_id' => $preference->id,
                'preference_option_id' => $randomValue->id,
            ]);
        }
    }

    private function addRandomEquipements(Annonce $annonce, $equipements): void
    {
        // Prendre entre 5 et 10 équipements aléatoires
        $randomEquipements = $equipements->random(rand(5, 10));

        foreach ($randomEquipements as $equipement) {
            AnnonceEquipement::create([
                'annonce_id' => $annonce->id,
                'equipement_id' => $equipement->id,
            ]);
        }
    }

    private function generateDescription(string $type, int $index, string $city): string
    {
        $descriptions = [
            'Appartement moderne' => [
                "Superbe appartement neuf de $index pièces en plein cœur de $city.",
                "Appartement lumineux avec vue imprenable sur $city.",
                "Appartement haut standing avec toutes commodités à proximité."
            ],
            'Villa spacieuse' => [
                "Magnifique villa avec piscine dans un quartier calme de $city.",
                "Villa contemporaine avec grand jardin arboré à $city.",
                "Propriété exceptionnelle avec garage et dépendances."
            ]
        ];

        return $descriptions[$type][$index % count($descriptions[$type])] ?? "Belle propriété à $city.";
    }
}
