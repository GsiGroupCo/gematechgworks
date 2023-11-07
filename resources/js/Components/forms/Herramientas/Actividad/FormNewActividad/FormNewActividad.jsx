
import React, { ChangeEvent, FC, useEffect, useState } from 'react'
import { useFormik } from "formik";
import { initialValue, validationSchema } from './FormNewActividad.form';
import { useForm } from '@inertiajs/react'

const NewActividadHerramienta = ({ onClose, Responsables, taqHer }) =>  {

  const { data, post } = useForm()
  
  const formik = useFormik({
    initialValues:initialValue(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      data.descripcion    = formValue.Descripcion
      data.taqHer         = taqHer
      data.taqresponsable = formValue.Responsable
      data.ubicacion      = formValue.Ubicacion
      post('/movimiento/herramienta/store')
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
          Registrando Nueva Actividad
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
            <option value="" disabled>POR FAVOR SELECCIONA UNA OPCION </option>
            {
              Responsables ? (
                  Responsables.map((data) => (
                      <option value={data.taqresponsable}>{data.primernombre} {data.segundonombre ? data.segundonombre : ''} {data.primerapellido} {data.segundoapellido ? data.segundoapellido : ''}</option>
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
            <label htmlFor="Ubicacion" className='font-bold text-black'>
              Ubicacion
            </label> 
            <span className='text-red-500 font-bold text-2xl'>
              *
            </span>
          </div>
          <input
            type='text'
            name="Ubicacion"
            id="Ubicacion"
            value={formik.values.Ubicacion}
            onChange={formik.handleChange}
            className = {`w-full h-auto  px-4 py-2 rounded-md focus:outline-none border border-gray-300 ${ formik.touched.Ubicacion && formik.errors.Ubicacion ? 'border-red-500' : 'border-black' }`}
          />
          {
           formik.touched.Ubicacion && formik.errors.Ubicacion && (
              <div className="text-red-500 font-bold">{formik.errors.Ubicacion}</div>
            )
          }
        </div>
        <div className='w-full h-auto flex flex-col justify-center items-start justify-items-center gap-2'>
          <div className='w-full h-auto flex gap-2 justify-start items-center'>
            <label htmlFor="Descripcion" className='font-bold text-black'>
              Descripcion
            </label> 
            <span className='text-red-500 font-bold text-2xl'>
              *
            </span>
          </div>
          <textarea
            cols="5"
            rows="2" 
            name="Descripcion"
            id="Descripcion"
            value={formik.values.Descripcion}
            onChange={formik.handleChange}
            className = {`w-full h-auto  px-4 py-2 rounded-md focus:outline-none border border-gray-300 ${ formik.touched.Descripcion && formik.errors.Descripcion ? 'border-red-500' : 'border-black' }`}
          >
          </textarea>
          {
            formik.touched.Descripcion && formik.errors.Descripcion && (
              <div className="text-red-500 font-bold">{formik.errors.Descripcion}</div>
            )
          }
        </div>
        <input type="submit" value = "Registrar Responsable" className="w-full h-auto px-4 py-2 border border-green-500 hover:border-white bg-green-500 hover:bg-green-800 text-white  font-bold  rounded-sm cursor-pointer transition duration-700 ease-in-out" />
    </form>
  )
}

export default NewActividadHerramienta;
