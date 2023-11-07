
import React, { ChangeEvent, FC, useEffect, useState } from 'react'
import { Toaster, toast } from 'sonner' 
import { useFormik } from "formik";
import { initialValue, validationSchema } from './FormNewResponsables.form';
import { useForm } from '@inertiajs/react'

const AddResponsableEmpresa = ({ onClose, status, Cargos }) =>  {

  useEffect(() => {
    if(status === 'Responsable Registrado Correctamente'){
      onClose()
    }
  }, [status]);

  const { data, post } = useForm()
  const [file, setFile] = useState();
  
  const formik = useFormik({
    initialValues:initialValue(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      data.primernombre     = formValue.primernombre
      data.segundonombre    = formValue.segundonombre
      data.primerapellido   = formValue.primerapellido
      data.segundoapellido  = formValue.segundoapellido
      data.id_cargo         = formValue.id_cargo
      data.Image            = file
      post('/responsables/store')
    }
  })

  const handleFileChange = (e) => {
    if (!e.target.files?.[0]) return;
    setFile(e.target.files?.[0]);
  };
  
  return (
    <form 
        onSubmit = { formik.handleSubmit }
        className = "w-[500px] md:w-[750px] h-full flex flex-col justify-center items-start justify-items-center px-8 pt-2 pb-8 gap-3"
        method = "POST"
      >
        <h3 className='font-bold'>
          Registrando Nuevo Responsable
        </h3>
        <div className='w-full flex gap-3'>
          <div className='w-1/2 h-auto flex flex-col justify-center items-start justify-items-center gap-2'>
            <div className='w-full h-auto flex gap-2 justify-start items-center'>
              <label htmlFor="primernombre" className='font-bold text-black'>
                Primer Nombre
              </label> 
              <span className='text-red-500 font-bold text-2xl'>
                *
              </span>
            </div>
            <input 
              type="text"
              name="primernombre"
              id="primernombre"
              value={formik.values.primernombre}
              onChange={formik.handleChange}
              placeholder='GSI GROUP'
              className = {`w-full h-auto  px-4 py-2 rounded-md focus:outline-none border border-gray-300 ${ formik.touched.primernombre && formik.errors.primernombre ? 'border-red-500' : 'border-black' }`}
            />
            {
              formik.touched.primernombre && formik.errors.primernombre && (
                <div className="text-red-500 font-bold">{formik.errors.primernombre}</div>
              )
            }
          </div>
          <div className='w-1/2 h-auto flex flex-col justify-center items-start justify-items-center gap-2'>
            <div className='w-full h-auto flex gap-2 justify-start items-center'>
              <label htmlFor="segundonombre" className='font-bold text-black'>
                Segundo nombre
              </label> 
            </div>
            <input 
              type="text"
              name="segundonombre"
              id="segundonombre"
              value={formik.values.segundonombre}
              onChange={formik.handleChange}
              placeholder='GSI GROUP'
              className = {`w-full h-auto  px-4 py-2 rounded-md focus:outline-none border border-gray-300 ${ formik.touched.segundonombre && formik.errors.segundonombre ? 'border-red-500' : 'border-black' }`}
            />
          </div>
        </div>
        <div className='w-full flex gap-3'>
          <div className='w-1/2 h-auto flex flex-col justify-center items-start justify-items-center gap-2'>
            <div className='w-full h-auto flex gap-2 justify-start items-center'>
              <label htmlFor="primerapellido" className='font-bold text-black'>
                Primer Apellido
              </label> 
              <span className='text-red-500 font-bold text-2xl'>
                *
              </span>
            </div>
            <input 
              type="text"
              name="primerapellido"
              id="primerapellido"
              value={formik.values.primerapellido}
              onChange={formik.handleChange}
              placeholder='GSI GROUP'
              className = {`w-full h-auto  px-4 py-2 rounded-md focus:outline-none border border-gray-300 ${ formik.touched.primerapellido && formik.errors.primerapellido ? 'border-red-500' : 'border-black' }`}
            />
            {
              formik.touched.primerapellido && formik.errors.primerapellido && (
                <div className="text-red-500 font-bold">{formik.errors.primerapellido}</div>
              )
            }
          </div>
          <div className='w-1/2 h-auto flex flex-col justify-center items-start justify-items-center gap-2'>
            <div className='w-full h-auto flex gap-2 justify-start items-center'>
              <label htmlFor="segundoapellido" className='font-bold text-black'>
                Segundo Apellido
              </label>
            </div>
            <input 
              type="text"
              name="segundoapellido"
              id="segundoapellido"
              value={formik.values.segundoapellido}
              onChange={formik.handleChange}
              placeholder='GSI GROUP'
              className = {`w-full h-auto  px-4 py-2 rounded-md focus:outline-none border border-gray-300 ${ formik.touched.segundoapellido && formik.errors.segundoapellido ? 'border-red-500' : 'border-black' }`}
            />
          </div>
        </div>
          <div className='w-full h-auto flex flex-col justify-center items-start justify-items-center gap-2'>
            <div className='w-full h-auto flex gap-2 justify-start items-center'>
              <label htmlFor="id_cargo" className='font-bold text-black'>
                Cargo
              </label> 
              <span className='text-red-500 font-bold text-2xl'>
                *
              </span>
            </div>
            <select 
              name="id_cargo"
              id="id_cargo"
              value={formik.values.id_cargo}
              onChange={formik.handleChange}
              className = {`w-full h-auto  px-4 py-2 rounded-md focus:outline-none border border-gray-300 ${ formik.touched.id_cargo && formik.errors.id_cargo ? 'border-red-500' : 'border-black' }`}
            >
              <option value="" disabled>SELECCIONAR UNA OPCION</option>
              {
                Cargos ? (
                    Cargos.map( (data) => (
                      <option key = { data.id_cargo } value={data.id_cargo}> { data.cargo } </option>
                    ))
                ) : null
              }
            </select>
            {
              formik.touched.id_cargo && formik.errors.id_cargo && (
                <div className="text-red-500 font-bold">{formik.errors.id_cargo}</div>
              )
            }
          </div>
          <div className='w-full h-auto flex flex-col justify-center items-start justify-items-center gap-2'>
          <div className='w-full h-auto flex gap-2 justify-start items-center'>
            <label htmlFor="Image" className='font-bold text-black'>
              Image
            </label> 
          </div>
          <input 
            id="Image"
            name="Image"
            type="file"
            accept="image/*"
            value={formik.values.Image}
            onChange={handleFileChange}
            className = {`w-full h-auto  px-4 py-2 rounded-md focus:outline-none  ${ formik.touched.Image && formik.errors.Image ? 'border-red-500' : 'border-black' }`} 
          />
          {file && (
            <div className='w-full h-[200px] flex justify-center'>
              <img src={URL.createObjectURL(file)} alt="" className="w-full h-full object-cover" loading="lazy"/>
            </div>
          )}
        </div>  
        <input type="submit" value = "Registrar Responsable" className="w-full h-auto px-4 py-2 border border-green-500 hover:border-white bg-green-500 hover:bg-green-800 text-white  font-bold  rounded-sm cursor-pointer transition duration-700 ease-in-out" />
        <Toaster richColors position="top-center"/>
    </form>
  )
}

export default AddResponsableEmpresa;
