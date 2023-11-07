<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class submttoRequest extends FormRequest
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
            'nombre'        =>'required',
            'sistema'       =>'required',
            'componente'    =>'required',
            'frecuencia'    =>'required',
            'taqManto'      =>'required',
        ];
    }

    public function messages()
    {
        return [
            'nombre.required'       => 'El Nombre es requerido',
            'frecuencia.required'   => 'La Frecuencia es requerida',
            'sistema.required'      => 'El Sistema es requerido',
            'componente.required'   => 'El Componente es requerido',
            'taqManto.required'     => 'El mantenimeinto al que pertenece la rutina es necesario',
        ];
    }
}
