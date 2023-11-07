<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class RecursoRequest extends FormRequest
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
            'descripcion'            => 'required',
            'justificacion'         => 'required',
            'referencia'            => 'required',
            'marca'                 => 'required',
            'unidad_medida'         => 'required',
            'cantidad_solicitada'   => 'required',
        ];
    }

    public function messages()
    {
        return [
            'descripcion.required'            => 'Descripcion es requerida',
            'justificacion.required'         => 'Justificacion es requerida',
            'referencia.required'            => 'Referencia es requerida',
            'marca.required'                 => 'Marca es requerida',
            'unidad_medida.required'         => 'Unidad de medida es requerida',
            'cantidad_solicitada.required'   => 'Cantidad solicitada es requerida',
        ];
    }
}
