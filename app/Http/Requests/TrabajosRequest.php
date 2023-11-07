<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class TrabajosRequest extends FormRequest
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
            'taqtrabajo'     => 'unique:trabajos',
            'taqot'          => 'required',
            'nombre'         => 'required',
            'descripcion'    => 'required',
            'estado'         => 'required'
        ];
    }

    public function messages()
    {
        return [
            'taqot.required'              => 'OT requerida',
            'nombre.required'             => 'Nombre requerido',
            'descripcion.required'        => 'Descripcion requerido',
            'estado.required'             => 'Estado requerido',
        ];
    }
}
