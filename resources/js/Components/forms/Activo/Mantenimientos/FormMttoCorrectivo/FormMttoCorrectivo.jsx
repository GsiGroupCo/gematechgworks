//Componentes de React
import React, { FC, useContext, useEffect, useState } from 'react'
import { useFormik } from "formik";

import { initialValue, validationSchema } from './FormMttoCorrectivo.form';

import { getAreasList } from '@/utils/Activos/Area/getAreasList';
import { getResponsable } from '@/utils/Responsables/getResponsables';

const FormMttoCorrectivo = ({Activos}) =>  {

  const [Areas, setAreas] = useState()
  const [Responsables, setResponsables] = useState()
  
  useEffect(() => {
    const fetchData = async () => {
      const areas = await getAreasList();
      const responsables = await getResponsable();
      setAreas(areas)
      setResponsables(responsables)   
    };
    fetchData();
  }, []);

  const formik = useFormik({
    initialValues:initialValue(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
     
    }
  })
  
  return (
    <form 
        onSubmit = { formik.handleSubmit }
        className = " w-full h-full flex flex-col justify-center items-start justify-items-center px-8 pt-2 pb-8 gap-3"
        method = "POST"
      >
        <h3 className='font-bold'>
          Asignando Nuevo Mantenimiento Correctivo
        </h3>
        <div className='w-full h-auto flex flex-col justify-center items-start justify-items-center gap-2'>
          <label htmlFor="Numero_Preoperacional" className='font-bold text-black'>
            Numero Preoperacional
          </label>
          <span className='text-xs text-gray-500'>EN CASO DE POSEER PREOPERAACIONAL, ESCRIBIR EL NUMERO</span>
          <input 
            type="text"
            name="Numero_Preoperacional"
            id="Numero_Preoperacional"
            value={formik.values.Numero_Preoperacional}
            onChange={formik.handleChange}
            placeholder="XXXXXXX"
            className = {`w-full h-auto  px-4 py-2 rounded-md focus:outline-none border border-black ${ formik.touched.Numero_Preoperacional && formik.errors.Numero_Preoperacional ? 'border-red-500' : 'border-black' }`}
          />
          {
            formik.touched.Numero_Preoperacional && formik.errors.Numero_Preoperacional && (
              <div className="text-red-500 font-bold">{formik.errors.Numero_Preoperacional}</div>
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
            <label htmlFor="Area" className='font-bold text-black'>
              ACTIVIDAD
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
            placeholder="ACTIVIDAD DE MANTENIMIENTO"
            className = {`w-full h-auto  px-4 py-2 rounded-md focus:outline-none border border-black ${ formik.touched.Actividad && formik.errors.Actividad ? 'border-red-500' : 'border-black' }`}
          />
          {
            formik.touched.Actividad && formik.errors.Actividad && (
              <div className="text-red-500 font-bold">{formik.errors.Actividad}</div>
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
            {
              Responsables ? (
                  Responsables.map( (data) => (
                  <option 
                    key = { data.taqresponsable } 
                    value = { data.taqresponsable }
                  >
                      {` ${data.primernombre} ${data.segundonombre ? data.segundonombre : ''}  ${data.primerapellido}  ${data.segundoapellido ? data.segundoapellido : ''} `}
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
        <input type="submit" value = "Asignar Mantenimiento" className="w-full h-auto px-4 py-2 border border-green-500 hover:border-white bg-green-500 hover:bg-green-800 text-white  font-bold  rounded-sm cursor-pointer transition duration-700 ease-in-out" />
    </form>
  )
}

export default FormMttoCorrectivo;
