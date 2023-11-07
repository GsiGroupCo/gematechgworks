<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class manttoCorrHerramientaRequest extends FormRequest
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
            'actividad'      => 'required',
            'taqHer'         => 'required',
            'taqresponsable' => 'required',
        ];
    }

    public function messages()
    {
        return [
            'actividad.required'      => 'La actividad es requerida',
            'taqHer.required'         => 'La Herramienta es requerida',
            'taqresponsable.required' => 'El responsable es requerido',
        ];
    }
}
