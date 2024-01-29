
import React from 'react'
import { useFormik } from "formik";
import { initialValue, validationSchema } from './DeleteActividad.form';
import { useForm } from '@inertiajs/react'

const DeleteActividad = ({ onClose, Actividad, route, taqom }) =>  {
   
  const { data, post } = useForm()
  
  const formik = useFormik({
    initialValues:initialValue(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async () => {
      data.taqom = taqom,
      data.actividad_id = Actividad,
      console.log(data)
      console.log(route)
      post(route)
      onClose();
    }
  })

  
  return (
    <form 
        onSubmit = { formik.handleSubmit }
        className = "w-[500px] md:w-[750px] h-full flex flex-col justify-center items-start justify-items-center px-8 pt-2 pb-8 gap-3"
        method = "POST"
      >
        <h3 className='font-bold'>
          Desear Eliminar esta Actividad ?
        </h3> 
        <input type="submit" value = "Eliminar Actividad" className="w-full h-auto px-4 py-2 border border-red-500 hover:border-white bg-red-500 hover:bg-red-800 text-white  font-bold  rounded-sm cursor-pointer transition duration-700 ease-in-out" />
    </form>
  )
}

export default DeleteActividad;
