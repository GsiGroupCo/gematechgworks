//Componentes de React
import React, { FC, useContext, useEffect, useState } from 'react'

//Componentes de Next
import { useFormik } from "formik";

//Componentes Internos
import hostApi from '@/pages/api/host';

//interface 
import { getMantenimientoList } from '@/utils/Activos/mantenimientos/getMantenimientoList';
import { getAreasList } from '@/utils/Activos/Area/getAreasList';
import { getResponsable } from '@/utils/Responsables/getResponsables';
import axios from 'axios';
import { ModalContext } from '@/context';

//Contexts

//Imagenes


const FormMttoPreventivo = ({Activos}) =>  {

  const [Mantenimientos, setMantenimientos] = useState()
  const [Areas, setAreas] = useState()
  const [Responsables, setResponsables] = useState()

  const { closeModal } = useContext(ModalContext)
  
  useEffect(() => {
    const fetchData = async () => {
      const mantos = await getMantenimientoList();
      const areas = await getAreasList();
      const responsables = await getResponsable();
      setAreas(areas)
      setMantenimientos(mantos)
      setResponsables(responsables)   
    };
    fetchData();
  }, []);

  const formik = useFormik({
    initialValues:initialValue(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      const response = await axios.post('http://localhost:3000/api/bonos/create', formValue).then(response => {
          formValue.Activo = '';
          formValue.Area = '';
          formValue.Fecha_Lastt_Mtto = '';
          formValue.Mantenimiento = '';
          formValue.Responsable = '';
          closeModal()
        }).catch(
        error => {
          if (error.response) {
          } else if (error.request) {
          } else {
          }
        }
      )
    }
  })
  
  return (
    <form 
        onSubmit = { formik.handleSubmit }
        className = " w-full h-full flex flex-col justify-center items-start justify-items-center px-8 pt-2 pb-8 gap-3"
        method = "POST"
      >
        <h3 className='font-bold'>
          Asignando Nuevo Mantenimiento Preventivo
        </h3>
        <div className='w-full h-auto flex flex-col justify-center items-start justify-items-center gap-2'>
          <div className='w-full h-auto flex gap-2 justify-start items-center'>
            <label htmlFor="Mantenimiento" className='font-bold text-black'>
              Mantenimiento
            </label> 
            <span className='text-red-500 font-bold text-2xl'>
              *
            </span>
          </div>
          <select id="Mantenimiento" name="Mantenimiento"  value = { formik.values.Mantenimiento } onChange = { formik.handleChange} className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
            {
              Mantenimientos ? (
                  Mantenimientos.map( (data) => (
                  <option 
                    key = { data.taqManto } 
                    value = { data.taqManto }
                  >
                      { data.Nombre }
                  </option>
                  ))
              ) : null
            }
          </select>
          {
            formik.touched.Mantenimiento && formik.errors.Mantenimiento && (
              <div className="text-red-500 font-bold">{formik.errors.Mantenimiento}</div>
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
          <select id="Mantenimiento" name="Mantenimiento"  value = { formik.values.Mantenimiento } onChange = { formik.handleChange} className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
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
        <div className='w-full h-auto flex flex-col justify-center items-start justify-items-center gap-2'>
          <div className='w-full h-auto flex gap-2 justify-start items-center'>
            <label htmlFor="Fecha_Lastt_Mtto" className='font-bold text-black'>
              Fecha de Ultimo Mantenimiento
            </label> 
          </div> 
          <input type="date" name="Fecha_Lastt_Mtto" value={formik.values.Fecha_Lastt_Mtto} onChange={formik.handleChange} className="w-full h-auto px-4 py-2 rounded-md focus:outline-none border border-black"/>
        </div>
        <input type="submit" value = "Asignar Mantenimiento" className="w-full h-auto px-4 py-2 border border-green-500 hover:border-white bg-green-500 hover:bg-green-800 text-white  font-bold  rounded-sm cursor-pointer transition duration-700 ease-in-out" />
    </form>
  )
}

export default FormMttoPreventivo;
