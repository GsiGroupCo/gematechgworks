<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class manttoCorrActivoRequest extends FormRequest
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
            'actividad'      => 'required',
            'taqActivos'     => 'required',
            'taqresponsable' => 'required',
        ];
    }

    public function messages()
    {
        return [
            'actividad.required'      => 'La actividad es requerida',
            'taqActivos.required'     => 'El Activo es requerido',
            'taqresponsable.required' => 'El responsable es requerido',
        ];
    }
}
