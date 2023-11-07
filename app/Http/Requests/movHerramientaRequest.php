<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class movherramientaRequest extends FormRequest
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
            'taqHer'         => 'required',
            'taqresponsable' => 'required',
            'descripcion'    => 'required',
            'ubicacion'      => 'required',
        ];
    }

    public function messages()
    {
        return [
            'taqHer.required'               => 'Herramienta requerida',
            'taqresponsable.required'       => 'Responsable requerido',
            'descripcion.required'          => 'Descripcion requerido',
            'ubicacion.required'            => 'Ubicacion requerida',
        ];
    }
}
