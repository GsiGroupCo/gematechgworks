<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class DeleteDocumentMttoActivoRequest extends FormRequest
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
            'taqActivos'       => 'required',
            'nombreDocumento'  => 'required',
            'taqresponsable'   => 'required',
            'taqDocMttoActivo' => 'required',
        ];
    }

    public function messages()
    {
        return [
            'taqActivos.required'        => 'El activo hace falta',
            'nombreDocumento.required'   => 'El documento hace falta',
            'taqresponsable.required'    => 'El responsable hace falta',
            'taqDocMttoActivo.required'  => 'El Mantenimiento hace falta'
        ];
    }
}
