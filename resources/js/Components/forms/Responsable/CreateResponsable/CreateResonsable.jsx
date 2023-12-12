
import React, { useState } from 'react' 
import { useFormik } from "formik";
import { initialValue, validationSchema } from './CreateResonsable.form';
import { useForm } from '@inertiajs/react'

const CreateResponsable = ({ onClose, Cargos }) =>  {

  const { data, post } = useForm()
  const [filtro, setFiltro] = useState("");
  const [file, setFile] = useState();
  
  const formik = useFormik({
    initialValues:initialValue(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      data.nombre    = formValue.nombre
      data.cargo_id  = formValue.cargo_id
      data.Image     = file
      post('/responsables/store')
      onClose()
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
        <div className='w-full h-auto flex justify-center items-center gap-3'>
          <div className='w-full h-auto flex flex-col justify-center items-center justify-items-center gap-2'>
            <div className='w-full h-auto flex gap-2 justify-start items-center'>
              <label htmlFor="nombre" className='font-bold text-black'>
                Nombre
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
              onChange={formik.handleChange} 
              className = {`w-full h-auto  px-4 py-2 rounded-md focus:outline-none border border-gray-300 ${ formik.touched.nombre && formik.errors.nombre ? 'border-red-500' : 'border-black' }`}
            />
            {
              formik.touched.nombre && formik.errors.nombre && (
                <div className="text-red-500 font-bold">{formik.errors.nombre}</div>
              )
            }
          </div>
          <div className={`w-auto h-[70px] ${ file ? 'flex' : 'hidden' }  flex-col justify-center border border-black rounded-sm items-center justify-items-center gap-2`}>
            {
                file && (
                  <div className='w-full h-full flex justify-center px-4'>
                    <img src={URL.createObjectURL(file)} alt="" className="w-full h-full object-cover" loading="lazy"/>
                  </div>
                )
              }
          </div>
        </div>
        <div className='w-full h-auto flex flex-col justify-center items-start justify-items-center gap-2'>
            <div className='w-full h-auto flex gap-2 justify-start items-center'>
              <label htmlFor="cargo_id" className='font-bold text-black'>
                Cargo
              </label> 
              <span className='text-red-500 font-bold text-2xl'>
                *
              </span>
            </div>            
            <input 
                type="text" 
                value={filtro} 
                onChange={(e) => setFiltro(e.target.value)} 
                placeholder="Filtrar por nombre ..."
                className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            <select 
              name="cargo_id"
              id="cargo_id"
              value={formik.values.cargo_id}
              onChange={formik.handleChange}
              className = {`w-full h-auto  px-4 py-2 rounded-md focus:outline-none border border-gray-300 ${ formik.touched.cargo_id && formik.errors.cargo_id ? 'border-red-500' : 'border-black' }`}
            >
              <option value="" disabled>SELECCIONAR UNA OPCION</option>
              {
                Cargos ? (
                  Cargos.filter(data => data.cargo.includes(filtro)).map((data) => (
                      <option value={data.cargo_id}> { data.cargo } </option>
                    ))
                ) : null
              }
            </select>
            {
              formik.touched.cargo_id && formik.errors.cargo_id && (
                <div className="text-red-500 font-bold">{formik.errors.cargo_id}</div>
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
        </div>  
        <input type="submit" value = "Registrar Responsable" className="w-full h-auto px-4 py-2 border border-green-500 hover:border-white bg-green-500 hover:bg-green-800 text-white  font-bold  rounded-sm cursor-pointer transition duration-700 ease-in-out" />
    </form>
  )
}

export default CreateResponsable;
