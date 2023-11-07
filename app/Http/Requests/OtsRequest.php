<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class omsRequest extends FormRequest
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
            'taqempresa'    => 'required',
            'tipo'          => 'required',
            'clasot'        => 'required',
            'prioridad'     => 'required',
        ];
    }

    public function messages()
    {
        return [
            'tipo.required'          => 'Tipo de mantenimiento requerido',
            'clasot.required'        => 'Clasificacion de OT requerida',
            'categoria.required'     => 'Categoria de OT requerida',
            'prioridad.required'     => 'Prioridad de OT requerida',
        ];
    }
}
