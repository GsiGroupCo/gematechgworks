
import React, { useState } from 'react'
import { useFormik } from "formik";
import { initialValue, validationSchema } from './FormNewActividad.form';
import { useForm } from '@inertiajs/react'

const NewActMttoPrev = ({ onClose, Responsables, taqmttActivo }) =>  {
  
  const { data, post } = useForm()
  
  const formik = useFormik({
    initialValues:initialValue(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      data.actividad      = formValue.Actividad
      data.frecuencia     = formValue.Frecuencia
      data.taqresponsable = formValue.Responsable
      data.ultimomtto     = formValue.UltimoMtto
      data.taqmttActivo   = taqmttActivo
      post('/act/prev/activo/store')
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
          Registrando nueva actividad 
        </h3>
        <div className='w-full h-auto flex flex-col justify-center items-start justify-items-center gap-2'>
          <div className='w-full h-auto flex gap-2 justify-start items-center'>
              <label htmlFor="Responsable" className='font-bold text-black'>
              Responsable
              </label> 
              <span className='text-red-500 font-bold text-2xl'>
              *
              </span>
          </div>
          <select 
              name="Responsable"
              id="Responsable"
              value={formik.values.Responsable}
              onChange={formik.handleChange}
              className = {`w-full h-auto  px-4 py-2 rounded-md focus:outline-none border border-gray-300 ${ formik.touched.Responsable && formik.errors.Responsable ? 'border-red-500' : 'border-black' }`}
          >
            <option value="">POR FAVOR SELECCIONE UNA OPCION </option>
            {
                Responsables ? (
                    Responsables.map((data) => (
                        <option key={data.taqresponsable} value={data.taqresponsable}>{data.primernombre} {data.primerapellido}</option>
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
                <label htmlFor="Actividad" className='font-bold text-black'>
                Actividad
                </label> 
                <span className='text-red-500 font-bold text-2xl'>
                *
                </span>
            </div>
            <input 
                type="text"
                name="Actividad"
                id="Actividad"
                value={formik.values.Actividad}
                onChange={formik.handleChange}
                placeholder='INSPECCION VISUAL DE ACTIVO'
                className = {`w-full h-auto  px-4 py-2 rounded-md focus:outline-none border border-gray-300 ${ formik.touched.Actividad && formik.errors.Actividad ? 'border-red-500' : 'border-black' }`}
            />
            {
                formik.touched.Actividad && formik.errors.Actividad && (
                <div className="text-red-500 font-bold">{formik.errors.Actividad}</div>
                )
            }
        </div> 
        <div className='w-full h-auto flex flex-col justify-center items-start justify-items-center gap-2'>
            <div className='w-full h-auto flex gap-2 justify-start items-center'>
                <label htmlFor="Frecuencia" className='font-bold text-black'>
                  Frecuencia
                </label> 
                <span className='text-red-500 font-bold text-2xl'>
                *
                </span>
            </div>
            <input 
                type = "number"
                name = "Frecuencia"
                id = "Frecuencia"
                value = {formik.values.Frecuencia}
                onChange = {formik.handleChange}
                placeholder = 'TENER EN CUENTA SI EL MTTO ES TIPO CALENDARIO O HORAS TRABAJADAS'
                className = {`w-full h-auto  px-4 py-2 rounded-md focus:outline-none border border-gray-300 ${ formik.touched.Frecuencia && formik.errors.Frecuencia ? 'border-red-500' : 'border-black' }`}
            />
            {
                formik.touched.Frecuencia && formik.errors.Frecuencia && (
                <div className="text-red-500 font-bold">{formik.errors.Frecuencia}</div>
                )
            }
        </div> 
        <div className='w-full h-auto flex flex-col justify-center items-start justify-items-center gap-2'>
            <div className='w-full h-auto flex gap-2 justify-start items-center'>
                <label htmlFor="UltimoMtto" className='font-bold text-black'>
                  Ultimo Mantenimiento
                </label> 
                <span className='text-red-500 font-bold text-2xl'>
                *
                </span>
            </div>
            <input 
                type = "date"
                name = "UltimoMtto"
                id = "UltimoMtto"
                value = {formik.values.UltimoMtto}
                onChange = {formik.handleChange}
                className = {`w-full h-auto  px-4 py-2 rounded-md focus:outline-none border border-gray-300 ${ formik.touched.UltimoMtto && formik.errors.UltimoMtto ? 'border-red-500' : 'border-black' }`}
            />
            {
                formik.touched.UltimoMtto && formik.errors.UltimoMtto && (
                <div className="text-red-500 font-bold">{formik.errors.UltimoMtto}</div>
                )
            }
        </div> 
        <input type="submit" value = "Registrar Actividad" className="w-full h-auto px-4 py-2 border border-green-500 hover:border-white bg-green-500 hover:bg-green-800 text-white  font-bold  rounded-sm cursor-pointer transition duration-700 ease-in-out" />
    </form>
  )
}

export default NewActMttoPrev;
