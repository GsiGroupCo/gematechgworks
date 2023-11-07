<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ClientRequest extends FormRequest
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
            'taqempresa' => 'required','unique:clientes',
            'nombre'     => 'required',
        ];
    }

    public function messages()
    {
        return [
            'taqempresa.required' => 'Taq de empresa requerido',
            'taqempresa.unique' => 'Ya se encuentra registrada una empresa con ese Taq',
            'nombre.required' => 'El nombre de la empresa es requerido',
        ];
    }
}
