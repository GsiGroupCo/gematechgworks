<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ResponsableRequest extends FormRequest
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
            'primernombre'      => 'required',
            'primerapellido'    => 'required',
            'id_cargo'          => 'required',
        ];
    }

    public function messages()
    {
        return [
            'primernombre.required'  => 'Nombre requerido',
            'primerapellido.required'=> 'Apellido requerido',
            'id_cargo.required'       => 'Cargo requerido',
        ];
    }
}
