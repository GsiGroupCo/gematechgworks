<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class TrabajoUpdateRequest extends FormRequest
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
            'taqot'          => 'required',
            'descripcion'    => 'required',
            'cantHoras'      => 'required',
            'estado'         => 'required'
        ];
    }

    public function messages()
    {
        return [
            'taqot.required'              => 'OT requerida',
            'descripcion.required'        => 'Descripcion requerido',
            'cantHoras.required'          => 'Las horas son requeridas',
            'estado.required'             => 'Estado requerido',
        ];
    }
}
