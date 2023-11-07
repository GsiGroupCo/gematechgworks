<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class OtroRequest extends FormRequest
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
            'taqActivos'          => 'required',
            'nombre'              => 'required',
            'value'               => 'required',
        ];
    }

    public function messages()
    {
        return [
            'taqActivos.required'   => 'Activo requerido',
            'nombre.required'       => 'Nombre requerido',
            'value.required'        => 'Valor requerido',
        ];
    }
}
