<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class RequerimientoRequest extends FormRequest
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
            'id_requesicion'   => 'unique:requerimientos',
            'id_requesicion'   => 'required',
            'proyecto'         => 'required',
            'taqot'            => 'required',
            'taqresponsable'   => 'required',
            'id_autorizador'   => 'required',
        ];
    }

    public function messages()
    {
        return [
            'id_requesicion.required' => 'Codigo de requisicion requerido',
            'id_requesicion.unique'   => 'Este codigo de requisicion ya esta registrado',
            'proyecto.required'       => 'Proyecto requerdo',
            'taqot.required'          => 'OT requerida',
            'taqresponsable.required' => 'Solicitante requerido',
            'id_autorizador.required' => 'Autorizador requerido'
        ];
     }
}
