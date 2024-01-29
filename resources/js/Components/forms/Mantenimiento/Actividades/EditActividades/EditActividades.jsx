
import React from 'react'
import { useFormik } from "formik";
import { initialValue, validationSchema } from './EditActividades.form';
import { useForm } from '@inertiajs/react'

const EditActividades = ({ onClose, Actividad, route, taqom }) =>  {

  const { data, post } = useForm()
  
  const formik = useFormik({
    initialValues:initialValue(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      data.taqom        = taqom
      data.actividad_id = Actividad
      data.nombre       = formValue.nombre
      data.descripcion  = formValue.Descripcion
      post(route)
      console.log(data)
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
        Editando nueva actividad de mantenimiento
      </h3>
      <div className='w-full h-auto flex flex-col justify-center items-start justify-items-center gap-2'>
        <div className='w-full h-auto flex gap-2 justify-start items-center'>
            <label htmlFor="nombre" className='font-bold text-black'>
            Nombre de Actividad
            </label> 
            <span className='text-red-500 font-bold text-2xl'>
            *
            </span>
        </div>
        <input 
            type="text"
            name="nombre"
            id="nombre"
            value={formik.values.nombre} 
            onChange={(e) => {
                formik.handleChange(e);
                formik.setFieldValue('nombre', e.target.value.toUpperCase());
            }} 
            className = {`w-full h-auto  px-4 py-2 rounded-md focus:outline-none border border-gray-300 ${ formik.touched.nombre && formik.errors.nombre ? 'border-red-500' : 'border-black' }`}
        />
        {
            formik.touched.nombre && formik.errors.nombre && (
            <div className="text-red-500 font-bold">{formik.errors.nombre}</div>
            )
        }
      </div>
      <div className='w-full h-auto flex flex-col justify-center items-start justify-items-center gap-2'>
        <div className='w-full h-auto flex gap-2 justify-start items-center'>
            <label htmlFor="Descripcion" className='font-bold text-black'>
            Descripcion de Actividad
            </label> 
            <span className='text-red-500 font-bold text-2xl'>
            *
            </span>
        </div>
        <textarea
          cols={30}
          rows={3} 
          type="text"
          name="Descripcion"
          id="Descripcion"
          value={formik.values.Descripcion} 
          onChange={(e) => {
              formik.handleChange(e);
              formik.setFieldValue('Descripcion', e.target.value.toUpperCase());
          }} 
          className = {`w-full h-auto  px-4 py-2 rounded-md focus:outline-none border border-gray-300 ${ formik.touched.Descripcion && formik.errors.Descripcion ? 'border-red-500' : 'border-black' }`}
        />
        {
            formik.touched.Descripcion && formik.errors.Descripcion && (
            <div className="text-red-500 font-bold">{formik.errors.Descripcion}</div>
            )
        }
      </div>  
      <input type="submit" value = "Editar Actividad" className="w-full h-auto px-4 py-2 border border-yellow-500 hover:border-white bg-yellow-500 hover:bg-yellow-800 text-white  font-bold  rounded-sm cursor-pointer transition duration-700 ease-in-out" />
    </form>
  )
}

export default EditActividades;
