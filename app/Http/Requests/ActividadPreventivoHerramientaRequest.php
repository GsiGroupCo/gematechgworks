<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ActividadPreventivoHerramientaRequest extends FormRequest
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
            'taqmttHerramienta'   => 'required',
            'taqresponsable'      => 'required',
            'actividad'           => 'required',
        ];
    }

    public function messages()
    {
        return [
            'taqmttHerramienta.unique'     => 'EL MANTENIMIENTO ES REQUERIDO',
            'taqresponsable.required'      => 'EL RESPONSABLE ES REQUERIDO',
            'actividad.required'           => 'EL NOMBRE DE LA ACTIVIDAD ES REQUERIDO',
        ];
    }
}
