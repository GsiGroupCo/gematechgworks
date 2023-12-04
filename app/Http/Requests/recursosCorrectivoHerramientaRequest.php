<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class recursosCorrectivoHerramientaRequest extends FormRequest
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
            'taqmttHerramienta' => 'required',
            'nombre'            => 'required',
            'descripcion'       => 'required',
            'cantidad'          => 'required',
        ];
    }

    public function messages()
    {
        return [
            'taqmttHerramienta.required'  => 'EL MANTENIMIENTO ES REQUERIDO',
            'nombre.required'             => 'EL NOMBRE ES REQUERIDO',
            'cantidad.required'           => 'LA CANTIDAD ES REQUERIDA',
            'descripcion.required'        => 'LA DESCRIPCION ES REQUERIDA',
        ];
    }
}