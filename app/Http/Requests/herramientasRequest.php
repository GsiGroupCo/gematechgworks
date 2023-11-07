<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class herramientasRequest extends FormRequest
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
            'taqHer'           => 'required',
            'nombre'           => 'required',
            'area'             => 'required',
            'horasuso'          => 'required'
        ];
    }

    public function messages()
    {
        return [
            'taqHer.required'           => 'La herramienta es requerida',
            'nombre.required'           => 'El nombre es requerido',
            'horasuso.required'          => 'Las horas de uso son requeridas',
            'area.required'             => 'El area es requerida',
        ];
    }
}
