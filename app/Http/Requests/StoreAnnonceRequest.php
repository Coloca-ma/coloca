<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreAnnonceRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            "title" => "required|string|max:50",
            "description" => "required|string",
            "address.street" => "required|string|max:255",
            "address.city" => "required|string|max:50",
            "address.postal_code" => "required|digits:5",
            "address.region.id" => "required|string|exists:regions,id",
            "loyer" => "required|numeric",
            "photos" => "array",
            "photos.*" => 'image|mimes:jpeg,png,jpg,gif,svg',
        ];
    }
}