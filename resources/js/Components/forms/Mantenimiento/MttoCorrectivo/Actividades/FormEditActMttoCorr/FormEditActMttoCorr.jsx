
import React, { useState } from 'react'
import { useFormik } from "formik";
import { initialValue, validationSchema } from './FormEditActMttoCorr.form';
import { useForm } from '@inertiajs/react'

const EditActMttoCorr = ({ onClose, Responsables, taqmttActivo }) =>  {
  
  const { data, post, wasSuccessful } = useForm()
  
  const formik = useFormik({
    initialValues:initialValue(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      data.actividad      = formValue.Actividad
      data.taqresponsable = formValue.Responsable
      data.taqmttActivo   = taqmttActivo
      post('/act/corr/activo')
      if(wasSuccessful){
        onClose();
      }
    }
  })

  
  return (
    <form 
        onSubmit = { formik.handleSubmit }
        className = "w-[500px] md:w-[750px] h-full flex flex-col justify-center items-start justify-items-center px-8 pt-2 pb-8 gap-3"
        method = "POST"
      >
        <h3 className='font-bold'>
          Registrando nueva actividad de mantenimiento
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
        <input type="submit" value = "Registrar Actividad" className="w-full h-auto px-4 py-2 border border-green-500 hover:border-white bg-green-500 hover:bg-green-800 text-white  font-bold  rounded-sm cursor-pointer transition duration-700 ease-in-out" />
    </form>
  )
}

export default EditActMttoCorr;
