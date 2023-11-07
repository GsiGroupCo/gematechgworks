<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class DeleteDocumentOtRequest extends FormRequest
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
            'taqDoc'           => 'required',
            'taqresponsable'   => 'required',
        ];
    }

    public function messages()
    {
        return [
            'taqDoc.required'            => 'El documento hace falta',
            'taqresponsable.required'    => 'El responsable hace falta',
        ];
    }
}
