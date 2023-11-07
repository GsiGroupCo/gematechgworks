//Componentes de React
import React, { useState } from 'react'
import { useFormik } from "formik";

import { initialValue, validationSchema } from './FormMovimiento.form';
import { useForm } from '@inertiajs/react';

const FormMovimiento = ({ Empresas, oms, onClose, taqActivos }) =>  {
  
  const { data, post } = useForm();
  const [filtro, setFiltro] = useState("");

  const formik = useFormik({
    initialValues:initialValue(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      data.taqActivos  = taqActivos
      data.taqempresa  = formValue.Empresa
      data.taqot       = formValue.Ot
      data.fechaSalida = formValue.Fecha_Salida
      data.ubicacion   = formValue.Destino
      data.descripcion = formValue.Descripcion
      post(`/movimiento/activo/store`)
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
          Asignando Nuevo Movimiento
        </h3>
        <div className='w-full flex gap-3'>
          <div className='w-1/2 h-auto flex flex-col justify-center items-start justify-items-center gap-2'>
            <div className='w-full h-auto flex gap-2 justify-start items-center'>
              <label htmlFor="Empresa" className='font-bold text-black'>
                Empresa
              </label> 
              <span className='text-red-500 font-bold text-2xl'>
                *
              </span>
            </div>
            <select id="Empresa" name="Empresa"  value = { formik.values.Empresa } onChange = { formik.handleChange} className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
              {
                Empresas ? (
                    Empresas.map( (data) => (
                    <option 
                      key = { data.taqempresa } 
                      value = { data.taqempresa }
                    >
                        { data.nombre }
                    </option>
                    ))
                ) : null
              }
            </select>
            {
              formik.touched.Empresa && formik.errors.Empresa && (
                <div className="text-red-500 font-bold">{formik.errors.Empresa}</div>
              )
            }
          </div>
          <div className='w-1/2 h-auto flex flex-col justify-center items-start justify-items-center gap-2'>
            <div className='w-full h-auto flex gap-2 justify-start items-center'>
              <label htmlFor="Ot" className='font-bold text-black'>
                Orden de Trabajo
              </label> 
              <span className='text-red-500 font-bold text-2xl'>
                *
              </span>
            </div>
            <input 
                type="number"
                min={0} 
                value={filtro} 
                onChange={(e) => setFiltro(e.target.value)} 
                placeholder="Filtrar por numero de OT..."
                className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            <select id="Ot" name="Ot"  value = { formik.values.Ot } onChange = { formik.handleChange} className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
              {
                oms ? (
                  oms.filter(data => data.taqot.includes(filtro)).map((data) => (
                    <option 
                      key = { data.taqot } 
                      value = { data.taqot }
                    >
                        { data.taqot }
                    </option>
                    ))
                ) : null
              }
            </select>
            {
              formik.touched.Ot && formik.errors.Ot && (
                <div className="text-red-500 font-bold">{formik.errors.Ot}</div>
              )
            }
          </div>
        </div>
        <div className='w-full flex gap-3'>
          <div className='w-full h-auto flex flex-col justify-center items-start justify-items-center gap-2'>
            <div className='w-full h-auto flex gap-2 justify-start items-center'>
              <label htmlFor="Fecha_Salida" className='font-bold text-black'>
                Fecha de Salida
              </label> 
              <span className='text-red-500 font-bold text-2xl'>
                *
              </span>
            </div> 
            <input type="date" name="Fecha_Salida" id="Fecha_Salida" value={formik.values.Fecha_Salida} onChange={formik.handleChange} className="w-full h-auto px-4 py-2 rounded-md focus:outline-none border border-black"/>
            {
              formik.touched.Fecha_Salida && formik.errors.Fecha_Salida && (
                <div className="text-red-500 font-bold">{formik.errors.Fecha_Salida}</div>
              )
            }
          </div>
          <div className='w-full h-auto flex flex-col justify-center items-start justify-items-center gap-2'>
            <div className='w-full h-auto flex gap-2 justify-start items-center'>
              <label htmlFor="Destino" className='font-bold text-black'>
                Ubicacion
              </label> 
              <span className='text-red-500 font-bold text-2xl'>
                *
              </span>
            </div> 
            <input 
              type="text"
              name="Destino"
              id="Destino"
              value={formik.values.Destino}
              onChange={formik.handleChange}
              placeholder='GSI BASE'
              className = {`w-full h-auto  px-4 py-2 rounded-md focus:outline-none border border-black ${ formik.touched.Destino && formik.errors.Destino ? 'border-red-500' : 'border-black' }`}
            />
          </div>
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
            name="Descripcion"
            id="Descripcion"
            value={formik.values.Descripcion}
            onChange={formik.handleChange}
            className = {`w-full h-auto  px-4 py-2 rounded-md focus:outline-none border border-black ${ formik.touched.Descripcion && formik.errors.Descripcion ? 'border-red-500' : 'border-black' }`}
            placeholder="Escribe aquí"
          ></textarea>
          {
            formik.touched.Descripcion && formik.errors.Descripcion && (
              <div className="text-red-500 font-bold">{formik.errors.Descripcion}</div>
            )
          }
        </div>
        <input type="submit" value = "Asignar Movimiento" className="w-full h-auto px-4 py-2 border border-green-500 hover:border-white bg-green-500 hover:bg-green-800 text-white  font-bold  rounded-sm cursor-pointer transition duration-700 ease-in-out" />
    </form>
  )
}

export default FormMovimiento;
