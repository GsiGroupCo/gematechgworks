import { useFormik } from "formik";

import { initialValue, validationSchema } from './FormDeleteDocuments.form';
import { useEffect, useState } from "react";
import { useForm } from "@inertiajs/react";


const DeleteDocument = ({ taqDoc, onClose }) =>  {
  
  const { data, post } = useForm()

  const formik = useFormik({
    initialValues:initialValue(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async () => {
      data.taqDoc = taqDoc;
      post('/documento/activo/delete/')
      onClose();
    }
  })

  return (
    <form 
      onSubmit = { formik.handleSubmit }
      className = " w-[500px] md:w-[650px] h-full flex flex-col justify-center items-center justify-items-center px-8 pt-2 pb-8 gap-3 "
      method = "POST"
      enctype="multipart/form-data"
    >
      <h3 className='font-bold'>
        Esta seguro de eliminar el documento ? 
      </h3> 
      <input type="submit" value = "Si, Eliminar Documento" className="w-full h-auto px-4 py-2 border border-red-500 hover:border-white bg-red-500 hover:bg-red-800 text-white  font-bold  rounded-sm cursor-pointer transition duration-700 ease-in-out" />
    </form>
  )
}

export default DeleteDocument;