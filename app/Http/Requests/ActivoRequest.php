<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ActivoRequest extends FormRequest
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
            'taqActivos'          => 'required','unique:activos',
            'nombre'              => 'required',
            'horasuso'            => 'required',
            'dependencia'         => 'required',
        ];
    }

    public function messages()
    {
        return [
            'taqActivos.unique'     => 'El Activo ya se encuentra registrado',
            'taqActivos.required'   => 'Activo requerido',
            'nombre.required'       => 'Nombre requerido',
            'horasuso.required'     => 'Las horas de uso son requeridas',
            'dependencia.required'  => 'Dependencia requerida',
        ];
    }
}
