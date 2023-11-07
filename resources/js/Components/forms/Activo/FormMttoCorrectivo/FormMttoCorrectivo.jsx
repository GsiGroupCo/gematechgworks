//Componentes de React
import React from 'react'
import { useFormik } from "formik";

import { initialValue, validationSchema } from './FormMttoCorrectivo.form';
import { useForm } from '@inertiajs/react';

const FormMttoCorrectivo = ({ Areas, taqActivo, onClose, Responsables }) =>  {
  console.log(taqActivo)
  const { data, post, wasSuccessful } = useForm();

  const formik = useFormik({
    initialValues:initialValue(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      data.Preoperacional = formValue.Preoperacional
      data.Area           = formValue.Area
      data.Actividad      = formValue.Actividad
      data.Activo         = taqActivo
      data.Responsable    = formValue.Responsable
      post(`/mtto/corr/activo`)
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
          Asignando Nuevo Mtto Correctivo
        </h3>
        <div className='w-full h-auto flex flex-col justify-center items-start justify-items-center gap-2'>
          <div className='w-full h-auto flex gap-2 justify-start items-center'>
            <label htmlFor="Preoperacional" className='font-bold text-black'>
              Preoperacional
            </label>
          </div> 
          <input type="text" name="Preoperacional" id="Preoperacional" value={formik.values.Preoperacional} onChange={formik.handleChange} className="border border-gray-300 w-full h-auto px-4 py-2 rounded-md focus:outline-none"/>
          {
            formik.touched.Preoperacional && formik.errors.Preoperacional && (
              <div className="text-red-500 font-bold">{formik.errors.Preoperacional}</div>
            )
          }
        </div>
        <div className='w-full h-auto flex flex-col justify-center items-start justify-items-center gap-2'>
          <div className='w-full h-auto flex gap-2 justify-start items-center'>
            <label htmlFor="Responsable" className='font-bold text-black'>
              Responsable
            </label> 
            <span className='text-red-500 font-bold text-2xl'>
              *
            </span>
          </div> 
          <select id="Responsable" name="Responsable"  value = { formik.values.Responsable } onChange = { formik.handleChange} className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
            <option value="">SELECCIONE UNA OPCION</option>
            {
              Responsables ? (
                  Responsables.map( (data) => (
                  <option 
                    key = { data.taqresponsable } 
                    value = { data.taqresponsable }
                  >
                      { data.primernombre } { data.primerapellido } { data.segundonombre } { data.segundoapellido }
                  </option>
                  ))
              ) : null
            }
          </select>
          {
            formik.touched.Responsable && formik.errors.Responsable && (
              <div className="text-red-500 font-bold">{formik.errors.Responsable}</div>
            )
          }
        </div>
        <div className='w-full h-auto flex flex-col justify-center items-start justify-items-center gap-2'>
          <div className='w-full h-auto flex gap-2 justify-start items-center'>
            <label htmlFor="Area" className='font-bold text-black'>
              Area
            </label> 
            <span className='text-red-500 font-bold text-2xl'>
              *
            </span>
          </div>
          <select id="Area" name="Area"  value = { formik.values.Area } onChange = { formik.handleChange} className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
            <option value="">SELECCIONE UNA OPCION</option>
            {
              Areas ? (
                  Areas.map( (data) => (
                  <option 
                    key = { data.taqarea } 
                    value = { data.taqarea }
                  >
                      { data.nombre }
                  </option>
                  ))
              ) : null
            }
          </select>
          {
            formik.touched.Area && formik.errors.Area && (
              <div className="text-red-500 font-bold">{formik.errors.Area}</div>
            )
          }
        </div>
        <div className='w-full h-auto flex flex-col justify-center items-start justify-items-center gap-2'>
          <div className='w-full h-auto flex gap-2 justify-start items-center'>
            <label htmlFor="Actividad" className='font-bold text-black'>
              Actividad
            </label> 
            <span className='text-red-500 font-bold text-2xl'>
              *
            </span>
          </div>  
          <textarea 
            name="Actividad"
            id="Actividad"
            value={formik.values.Actividad}
            onChange={formik.handleChange}
            className = {`w-full h-auto  px-4 py-2 rounded-md focus:outline-none border border-gray-300 ${ formik.touched.Actividad && formik.errors.Actividad ? 'border-red-500' : 'border-black' }`}
            placeholder="Escribe aquí"
          ></textarea>
          {
            formik.touched.Actividad && formik.errors.Actividad && (
              <div className="text-red-500 font-bold">{formik.errors.Actividad}</div>
            )
          }
        </div>
        <input type="submit" value = "Asignar Movimiento" className="w-full h-auto px-4 py-2 border border-green-500 hover:border-white bg-green-500 hover:bg-green-800 text-white  font-bold  rounded-sm cursor-pointer transition duration-700 ease-in-out" />
    </form>
  )
}

export default FormMttoCorrectivo;
