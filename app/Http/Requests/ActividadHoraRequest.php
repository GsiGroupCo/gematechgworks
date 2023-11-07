<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ActividadHoraRequest extends FormRequest
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
            'taqActivos'      => 'required',
            'actividad'       => 'required',
            'frecuencia'      => 'required',
            'ultimohorometro' => 'required',
            'horometroactual' => 'required',
        ];
    }

    public function messages()
    {
        return [
            'taqActivos.required'      => 'ACTIVO REQUERIDO',
            'actividad.required'       => 'ACTIVIDAD REQUERIDA',
            'frecuencia.required'      => 'FRECUENCIA REQUERIDA',
            'ultimohorometro.required' => 'ULTIMO HOROMETRO REQUERIDO',
            'horometroactual.required' => 'EL HOROMETRO ACTUAL ES REQUERIDO'
        ];
    }
}
