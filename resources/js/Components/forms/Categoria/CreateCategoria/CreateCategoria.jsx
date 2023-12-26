
import React, { useEffect, useState } from 'react'
import { useFormik } from "formik";
import { initialValue, validationSchema } from './CreateCategoria.form';
import { useForm } from '@inertiajs/react'

const CreateCategoria = ({ onClose, route }) =>  {

  const { data,post } = useForm()

  const formik = useFormik({
    initialValues:initialValue(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      data.nombre        = formValue.nombre,
      data.taq           = formValue.taq_activo_base, 
      console.log(data)
      post(route)
      onClose()
    }
  })

  return (
    <form 
        onSubmit = { formik.handleSubmit }
        className = " w-full h-full flex flex-col justify-center items-start justify-items-center px-8 pt-2 pb-8 gap-3"
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
            placeholder='ACUMULADOR SHENKAI'
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
            <label htmlFor="taq_activo_base" className='font-bold text-black'>
              Taq
            </label> 
            <span className='text-red-500 font-bold text-2xl'>
              *
            </span>
          </div>
          <input 
            type="text"
            name="taq_activo_base"
            id="taq_activo_base" 
            value={formik.values.taq_activo_base}
            onChange={formik.handleChange}
            className = {`w-full h-auto  px-4 py-2 rounded-md focus:outline-none border border-black ${ formik.touched.taq_activo_base && formik.errors.taq_activo_base ? 'border-red-500' : 'border-black' }`}
          />
          {
            formik.touched.taq_activo_base && formik.errors.taq_activo_base && (
              <div className="text-red-500 font-bold">{formik.errors.taq_activo_base}</div>
            )
          }
        </div>
      <input type="submit" value = "Registrar Categoria" className="w-full h-auto px-4 py-2 border border-green-500 hover:border-white bg-green-500 hover:bg-green-800 text-white  font-bold  rounded-sm cursor-pointer transition duration-700 ease-in-out" />
    </form>
  )
}

export default CreateCategoria;
