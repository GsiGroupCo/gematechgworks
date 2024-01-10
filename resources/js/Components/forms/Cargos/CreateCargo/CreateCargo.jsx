
import React, { useState } from 'react' 
import { useFormik } from "formik";
import { initialValue, validationSchema } from './CreateCargo.form';
import { useForm } from '@inertiajs/react'

const CreateCargo = ({ onClose }) =>  {

  const { data, post } = useForm()  
  const formik = useFormik({
    initialValues:initialValue(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      data.cargo        = formValue.cargo
      data.descripcion  = formValue.descripcion 
      post('/cargo/store')
      onClose()
    }
  })
 
  return (
    <form 
        onSubmit = { formik.handleSubmit }
        className = "w-[500px] md:w-[750px] h-full flex flex-col justify-center items-start justify-items-center px-8 pt-2 pb-8 gap-3"
        method = "POST"
      >
        <h3 className='font-bold'>
          Registrando Nuevo Cargo
        </h3>
        <div className='w-full h-auto flex justify-center items-center gap-3'>
          <div className='w-full h-auto flex flex-col justify-center items-center justify-items-center gap-2'>
            <div className='w-full h-auto flex gap-2 justify-start items-center'>
              <label htmlFor="cargo" className='font-bold text-black'>
                Cargo
              </label> 
              <span className='text-red-500 font-bold text-2xl'>
                *
              </span>
            </div>   
            <input 
              type="text"
              name="cargo"
              id="cargo"
              value={formik.values.cargo}  
              onChange={(e) => {
                  formik.handleChange(e);
                  formik.setFieldValue('cargo', e.target.value.toUpperCase());
              }}
              className = {`w-full h-auto  px-4 py-2 rounded-md focus:outline-none border border-gray-300 ${ formik.touched.cargo && formik.errors.cargo ? 'border-red-500' : 'border-black' }`}
            />
            {
              formik.touched.cargo && formik.errors.cargo && (
                <div className="text-red-500 font-bold">{formik.errors.cargo}</div>
              )
            }
          </div> 
        </div>
        <div className='w-full h-auto flex flex-col justify-center items-start justify-items-center gap-2'>
          <div className='w-full h-auto flex gap-2 justify-start items-center'>
            <label htmlFor="descripcion" className='font-bold text-black'>
              Descripcion
            </label> 
            <span className='text-red-500 font-bold text-2xl'>
              *
            </span>
          </div>   
          <input 
            name="descripcion"
            id="descripcion"
            value={formik.values.descripcion}
            onChange={(e) => {
                formik.handleChange(e);
                formik.setFieldValue('descripcion', e.target.value.toUpperCase());
            }}
            className = {`w-full h-auto  px-4 py-2 rounded-md focus:outline-none border border-gray-300 ${ formik.touched.descripcion && formik.errors.descripcion ? 'border-red-500' : 'border-black' }`}
          />
          {
            formik.touched.descripcion && formik.errors.descripcion && (
              <div className="text-red-500 font-bold">{formik.errors.descripcion}</div>
            )
          }
        </div>
        <input type="submit" value = "Registrar Cargo" className="w-full h-auto px-4 py-2 border border-green-500 hover:border-white bg-green-500 hover:bg-green-800 text-white  font-bold  rounded-sm cursor-pointer transition duration-700 ease-in-out" />
    </form>
  )
}

export default CreateCargo;
