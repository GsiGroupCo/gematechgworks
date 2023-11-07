<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class mttoHerRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'taqHer'          => 'required',
            'taqresponsable'  => 'required',
            'horas'      => 'required',
        ];
    }

    public function messages()
    {
        return [
            'taqHer.required'           => 'La Herramienta es requerida',
            'taqresponsable.required'   => 'El responsable es requerido',
            'horas.required'       => 'La fecha es requerida',
        ];
    }
}   