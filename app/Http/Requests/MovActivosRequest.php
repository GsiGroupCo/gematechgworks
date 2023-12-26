<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class MovActivosRequest extends FormRequest
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
            'taqActivos',
            'taqresponsable',
            'taqot',
            'estado',
            'ubicacionnueva',
            'descripcion',
        ];
    }

    public function messages()
    {
        return [
            'taqActivos.required'       => 'El Activo es requerido',
            'taqot.required'            => 'El OT es requerido',
            'estado.required'           => 'El estado es requerdo',
            'taqresponsable.required'   => 'El Responsable es requerido',
            'descripcion.required'      => 'Descripcion requerida',
        ];
    }
}
