<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class movrecRequest extends FormRequest
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
            'taqrecurso'  => 'unique:movrecursos',
            'taqot'       => 'required',
            'taqRec'      => 'required',
            'descripcion' => 'required',
            'cantidad'    => 'required',
        ];
    }

    public function messages()
    {
        return [
            'taqot.required'       => 'OT requerida',
            'taqRec.required'      => 'Taq del recurso requerido',
            'descripcion.required' => 'Descripcion requerida',
            'cantidad.required'    => 'Cantidad requerida',
        ];
    }
}
