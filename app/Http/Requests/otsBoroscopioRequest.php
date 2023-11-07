<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class omsBoroscopioRequest extends FormRequest
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
            'taqot'                 => 'required',
            'CentroCosto'           => 'required',
            'ContactoEmpresa'       => 'required',
            'TelefonoEmpresa'       => 'required',
            'CorreoEmpresa'         => 'required',
            'Generalidades'         => 'required',
            'Normativa'             => 'required',
            'taqresponsable'        => 'required',
        ];
    }

    public function messages()
    {
        return [
            'taqot.unique'             => 'La OT es requerida',
            'CentroCosto.required'     => 'El Centro de costo es requerido',
            'ContactoEmpresa.required' => 'El Contacto del  empresa es requerido',
            'TelefonoEmpresa.required' => 'el Telefono del  empresa es requerido',
            'CorreoEmpresa.required'   => 'El Correo del  empresa es requerido',
            'Generalidades'            => 'Las Generalidades del reporte son requeridas',
            'Normativa'                => 'Las Referencias Normativas del reporte son requeridas',
            'taqresponsable'           => 'El Inspector es requerido',
        ];
    }
}
