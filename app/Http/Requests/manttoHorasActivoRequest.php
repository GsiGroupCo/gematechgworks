<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class manttoHorasActivoRequest extends FormRequest
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
            'taqManto'         => 'required',
            'taqActivos'       => 'required',
            'taqresponsable'   => 'required',
            'ultimohorometro'  => 'required',
        ];
    }

    public function messages()
    {
        return [
            'taqActivos.required'       => 'El Activo es requerido',
            'taqManto.required'         => 'El Mantenimiento es requerido',
            'taqresponsable.required'   => 'El responsable es requerido',
            'ultimohorometro.required'  => 'Las horas del ultimo mantenimiento son requeridas',
        ];
    }
}
