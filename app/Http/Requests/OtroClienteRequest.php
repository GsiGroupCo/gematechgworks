<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class OtroEmpresaRequest extends FormRequest
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
            'taqempresa'          => 'required',
            'nombre'              => 'required',
            'value'               => 'required',
        ];
    }

    public function messages()
    {
        return [
            'taqempresa.required'   => 'Activo requerido',
            'nombre.required'       => 'Nombre requerido',
            'value.required'        => 'Valor requerido',
        ];
    }
}