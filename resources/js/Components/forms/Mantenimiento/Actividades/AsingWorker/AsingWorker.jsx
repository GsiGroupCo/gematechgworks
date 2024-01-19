
import React from 'react'
import { useFormik } from "formik";
import { initialValue, validationSchema } from './AsingWorker.form';
import { useForm } from '@inertiajs/react';
import { useState } from "react"; 

const AsingWorker = ({ onClose, Responsables, route }) =>  {
  
  const { data, post } = useForm()
  const [filtro, setFiltro] = useState("");
  
  const formik = useFormik({
    initialValues:initialValue(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      data.nombre           = formValue.nombre
      data.descripcion      = formValue.Descripcion
      data.sistema          = formValue.sistema 
      data.frecuencia       = formValue.frecuencia
      data.tipofrecuencia   = Mantenimiento[0].tipe
      data.taqMantenimiento = Mantenimiento[0].taqMantenimiento 
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
        <div className='w-full h-auto flex flex-col justify-center items-start justify-items-center gap-2'>
            <div className='w-full h-auto flex gap-2 justify-start items-center'>
                <label htmlFor="taqresponsable" className='font-bold text-black'>
                Responsable
                </label> 
                <span className='text-red-500 font-bold text-2xl'>
                *
                </span>
            </div>
            <input 
              type="text" 
              value={filtro} 
              onChange={(e) => setFiltro(e.target.value)} 
              placeholder="Filtrar por nombre..."
              className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
            <select 
              name="taqresponsable"
              id="taqresponsable"
              value={formik.values.taqresponsable} 
              onChange={(e) => {
                  formik.handleChange(e);
                  formik.setFieldValue('taqresponsable', e.target.value.toUpperCase());
              }} 
              className = {`w-full h-auto  px-4 py-2 rounded-md focus:outline-none border border-gray-300 ${ formik.touched.taqresponsable && formik.errors.taqresponsable ? 'border-red-500' : 'border-black' }`}
            >
              {
                Responsables ? (
                  Responsables.filter(data => data.nombre.includes(filtro)).map((data) => (
                    <option 
                      key = { data.taqresponsable } 
                      value = { data.taqresponsable }
                    >
                      { data.nombre } 
                    </option>
                    ))
                ) : null
              }
            </select> 
            {
                formik.touched.taqresponsable && formik.errors.taqresponsable && (
                <div className="text-red-500 font-bold">{formik.errors.taqresponsable}</div>
                )
            }
        </div>  
        <input type="submit" value = "Registrar Actividad" className="w-full h-auto px-4 py-2 border border-green-500 hover:border-white bg-green-500 hover:bg-green-800 text-white  font-bold  rounded-sm cursor-pointer transition duration-700 ease-in-out" />
    </form>
  )
}

export default AsingWorker;
