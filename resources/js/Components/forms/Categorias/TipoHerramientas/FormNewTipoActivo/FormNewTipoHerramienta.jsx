
import React, { useEffect, useState } from 'react'
import { useFormik } from "formik";
import { initialValue, validationSchema } from './FormNewTipoHerramienta.form';
import { useForm } from '@inertiajs/react'

const NewTipeHerramienta = ({ onClose }) =>  {

  const { data, post } = useForm()
  const formik = useFormik({
    initialValues:initialValue(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      data.taq_herramienta_base   = formValue.taq_herramienta_base ,
      data.nombre           = formValue.nombre,
      post('tipos/herramientas/store')
      onClose()
    }
  })
  
  return (
    <form 
        onSubmit = { formik.handleSubmit }
        className = " w-[500px] h-full flex flex-col justify-center items-start justify-items-center px-8 pt-2 pb-8 gap-3"
        method = "POST"
      >
        <div className='w-full h-auto flex flex-col justify-center items-start justify-items-center gap-2'>
          <div className='w-full h-auto flex gap-2 justify-start items-center'>
            <label htmlFor="nombre" className='font-bold text-black'>
              Nombre
            </label> 
            <span className='text-red-500 font-bold text-2xl'>
              *
            </span>
          </div>
          <input 
            type="text"
            name="nombre"
            id="nombre"
            placeholder='ACUMULADOR'
            value={formik.values.nombre}
            onChange={formik.handleChange}
            className = {`w-full h-auto  px-4 py-2 rounded-md focus:outline-none border border-black ${ formik.touched.nombre && formik.errors.nombre ? 'border-red-500' : 'border-black' }`}
          />
          {
            formik.touched.nombre && formik.errors.nombre && (
              <div className="text-red-500 font-bold">{formik.errors.nombre}</div>
            )
          }
        </div>
        <div className='w-full h-auto flex flex-col justify-center items-start justify-items-center gap-2'>
          <div className='w-full h-auto flex gap-2 justify-start items-center'>
            <label htmlFor="taq_herramienta_base " className='font-bold text-black'>
              TAQ Base
            </label> 
            <span className='text-red-500 font-bold text-2xl'>
              *
            </span>
          </div>
          <input 
            type="text"
            name="taq_herramienta_base "
            id="taq_herramienta_base "
            value={formik.values.taq_herramienta_base }
            onChange={formik.handleChange}
            placeholder='ACC_'
            className = {`w-full h-auto  px-4 py-2 rounded-md focus:outline-none border border-black ${ formik.touched.taq_herramienta_base  && formik.errors.taq_herramienta_base  ? 'border-red-500' : 'border-black' }`}
          />
          {
            formik.touched.taq_herramienta_base  && formik.errors.taq_herramienta_base  && (
              <div className="text-red-500 font-bold">{formik.errors.taq_herramienta_base }</div>
            )
          }
        </div>
        <input type="submit" value = "Registrar Tipo Activo" className="w-full h-auto px-4 py-2 border border-green-500 hover:border-white bg-green-500 hover:bg-green-800 text-white  font-bold  rounded-sm cursor-pointer transition duration-700 ease-in-out" />
    </form>
  )
}

export default NewTipeHerramienta;
