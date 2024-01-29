
import React from 'react'
import { useFormik } from "formik";
import { initialValue, validationSchema } from './EditActividadMtto.form';
import { useForm } from '@inertiajs/react'

const EditActividadMtto = ({ onClose, Actividad, route }) =>  {
  
  const { data, post } = useForm()
  
  const formik = useFormik({
    initialValues:initialValue(Actividad),
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
        <h3 className='font-bold'>
          Registrando nueva actividad de mantenimiento
        </h3>
        <div className='w-full h-auto flex flex-col justify-center items-start justify-items-center gap-2'>
            <div className='w-full h-auto flex gap-2 justify-start items-center'>
                <label htmlFor="nombre" className='font-bold text-black'>
                Nombre de Actividad
                </label> 
                <span className='text-red-500 font-bold text-2xl'>
                *
                </span>
            </div>
            <input 
                type="text"
                name="nombre"
                id="nombre"
                value={formik.values.nombre} 
                onChange={(e) => {
                    formik.handleChange(e);
                    formik.setFieldValue('nombre', e.target.value.toUpperCase());
                }}
                placeholder='INSPECCION VISUAL DE ACTIVO'
                className = {`w-full h-auto  px-4 py-2 rounded-md focus:outline-none border border-gray-300 ${ formik.touched.nombre && formik.errors.nombre ? 'border-red-500' : 'border-black' }`}
            />
            {
                formik.touched.nombre && formik.errors.nombre && (
                <div className="text-red-500 font-bold">{formik.errors.nombre}</div>
                )
            }
        </div>
        <div className='w-full h-auto flex flex-col justify-center items-start justify-items-center gap-2'>
            <div className='w-full h-auto flex gap-2 justify-start items-center'>
                <label htmlFor="Descripcion" className='font-bold text-black'>
                Descripcion de Actividad
                </label> 
                <span className='text-red-500 font-bold text-2xl'>
                *
                </span>
            </div>
            <textarea
              cols={30}
              rows={3} 
              type="text"
              name="Descripcion"
              id="Descripcion"
              value={formik.values.Descripcion} 
              onChange={(e) => {
                  formik.handleChange(e);
                  formik.setFieldValue('Descripcion', e.target.value.toUpperCase());
              }} 
              className = {`w-full h-auto  px-4 py-2 rounded-md focus:outline-none border border-gray-300 ${ formik.touched.Descripcion && formik.errors.Descripcion ? 'border-red-500' : 'border-black' }`}
            />
            {
                formik.touched.Descripcion && formik.errors.Descripcion && (
                <div className="text-red-500 font-bold">{formik.errors.Descripcion}</div>
                )
            }
          </div>
        <div className='w-full flex justify-center items-center gap-3 '> 
          <div className='w-1/2 h-auto flex flex-col justify-center items-start justify-items-center gap-2'>
              <div className='w-full h-auto flex gap-2 justify-start items-center'>
                  <label htmlFor="frecuencia" className='font-bold text-black'>
                  Frecuencia de Actividad
                  </label> 
                  <span className='text-red-500 font-bold text-2xl'>
                  *
                  </span>
              </div>
              <input 
                  type="number"
                  min={0}
                  name="frecuencia"
                  id="frecuencia"
                  value={formik.values.frecuencia}
                  onChange={formik.handleChange}
                  className = {`w-full h-auto  px-4 py-2 rounded-md focus:outline-none border border-gray-300 ${ formik.touched.frecuencia && formik.errors.frecuencia ? 'border-red-500' : 'border-black' }`}
              />
              {
                  formik.touched.frecuencia && formik.errors.frecuencia && (
                  <div className="text-red-500 font-bold">{formik.errors.frecuencia}</div>
                  )
              }
          </div>
          <div className='w-1/2 flex flex-col justify-start items-start gap-3 '>
            <div className='w-full h-auto flex gap-2 justify-start items-center'>
              <label htmlFor="sistema" className='font-bold text-black'>
                Sistema
              </label> 
              <span className='text-red-500 font-bold text-2xl'>
              *
              </span>
            </div>
            <select 
                type="text"
                name="sistema"
                id="sistema"
                value={formik.values.sistema}
                onChange={formik.handleChange}
                placeholder='Ej: Sistema Electrico'
                className = {`w-full h-auto  px-4 py-2 rounded-md focus:outline-none border border-gray-300 ${ formik.touched.sistema && formik.errors.sistema ? 'border-red-500' : 'border-black' }`}
            >
              <option value="" disabled> SELECCIONE UNA OPCION </option>
              <option value="NO POSEE"> NO POSEE </option>
              <option value="SISTEMA ELECTRICO"> SISTEMA ELECTRICO </option>
              <option value="SISTEMA MECANICO"> SISTEMA MECANICO </option>
              <option value="SISTEMA DE REFRIGERACION"> SISTEMA DE REFRIGERACION </option>
              <option value="SISTEMA DE CONTROL"> SISTEMA DE CONTROL </option>
              <option value="SISTEMA NEUMATICO"> SISTEMA NEUMATICO </option>
              <option value="SISTEMA HIDRAULICO"> SISTEMA HIDRAULICO </option>
              <option value="SISTEMA DE SUSPENCION"> SISTEMA DE SUSPENCION </option>
              <option value="SISTEMA DE LUBRICACION"> SISTEMA DE LUBRICACION </option>
              <option value="SISTEMA DE REFRIGERACION"> SISTEMA DE REFRIGERACION </option>
              <option value="SISTEMA DE COMBUSTION"> SISTEMA DE COMBUSTION </option>
              <option value="SISTEMA DE TRANSMISION"> SISTEMA DE TRANSMISION</option>
              <option value="SISTEMA DE FRENOS"> SISTEMA DE FRENOS </option>
              <option value="SISTEMA DE LEVANTE"> SISTEMA DE LEVANTE </option>
              <option value="SISTEMA DE DIRECCION"> SISTEMA DE DIRECCION </option>
              <option value="SISTEMA DE POTENCIA"> SISTEMA DE POTENCIA </option>
              <option value="SISTEMA DE COMBUSTIBLE"> SISTEMA DE COMBUSTIBLE </option>
              <option value="SISTEMA DE PRESION HIDRAULICA"> SISTEMA DE PRESION HIDRAULICA </option>
              <option value="SISTEMA DE SEGURIDAD"> SISTEMA DE SEGURIDAD </option>
              <option value="SISTEMA DE POLEAS"> SISTEMA DE POLEAS </option>
            </select>
            {
                formik.touched.sistema && formik.errors.sistema && (
                <div className="text-red-500 font-bold">{formik.errors.sistema}</div>
                )
            }
          </div>  
        </div> 
        <input type="submit" value = "Registrar Actividad" className="w-full h-auto px-4 py-2 border border-green-500 hover:border-white bg-green-500 hover:bg-green-800 text-white  font-bold  rounded-sm cursor-pointer transition duration-700 ease-in-out" />
    </form>
  )
}

export default EditActividadMtto;
