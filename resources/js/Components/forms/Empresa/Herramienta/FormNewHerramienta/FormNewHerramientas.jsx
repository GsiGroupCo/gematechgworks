
import React, { useEffect, useState } from 'react'
import { useFormik } from "formik";
import { initialValue, validationSchema } from './FormNewHerramientas.form';
import { useForm } from '@inertiajs/react'

const AddHerramientaEmpresa = ({ onClose, status, Categoria, taqempresa }) =>  { 
  
  useEffect(() => {
    if(status === 'Herramienta Registrada Correctamente'){
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
      data.id_tipo    = formValue.id_tipo
      data.nombre     = formValue.nombre
      data.taqempresa = taqempresa
      data.serial     = formValue.serial
      data.area       = formValue.area
      data.horasuso   = formValue.horasuso
      data.Image      = file
      post('/herramientas/store')
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
          Registrando Nueva Herramienta
        </h3>
        <div className='w-full flex gap-3'>
          <div className='w-1/2 h-auto flex flex-col justify-center items-start justify-items-center gap-2'>
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
          <div className='w-1/2 h-auto flex flex-col justify-center items-start justify-items-center gap-2'>
            <div className='w-full h-auto flex gap-2 justify-start items-center'>
              <label htmlFor="id_tipo" className='font-bold text-black'>
                Categoria
              </label> 
              <span className='text-red-500 font-bold text-2xl'>
                *
              </span>
            </div>
            <select 
              type="text"
              name="id_tipo"
              id="id_tipo"
              value={formik.values.id_tipo}
              onChange={formik.handleChange}
              className = {`w-full h-auto  px-4 py-2 rounded-md focus:outline-none border border-gray-300 ${ formik.touched.id_tipo && formik.errors.id_tipo ? 'border-red-500' : 'border-black' }`}
            >
              <option value=""> SELECCIONE UNA OPCION</option>
              {
                  Categoria ? (
                      Categoria.map((data) => (
                          <option key={data.id_tipo} value={data.id_tipo}>{data.nombre}</option>
                      ))
                  ) : null
              }
            </select>
            {
              formik.touched.id_tipo && formik.errors.id_tipo && (
                <div className="text-red-500 font-bold">{formik.errors.id_tipo}</div>
              )
            }
          </div>
        </div>
        <div className='w-full flex gap-3'>
          
        </div>
        <div className='w-full h-auto flex gap-3'>
          <div className='w-1/2 h-auto flex flex-col justify-center items-start justify-items-center gap-2'>
            <div className='w-full h-auto flex gap-2 justify-start items-center'>
              <label htmlFor="area" className='font-bold text-black'>
                Area
              </label>
              <span className='text-red-500 font-bold text-2xl'>
                *
              </span>
            </div>
            <input 
              type="text"
              name="area"
              id="area"
              value={formik.values.area}
              onChange={formik.handleChange}
              placeholder='MECANICA'
              className = {`w-full h-auto  px-4 py-2 rounded-md focus:outline-none border border-gray-300 ${ formik.touched.area && formik.errors.area ? 'border-red-500' : 'border-black' }`}
            />
            {
              formik.touched.area && formik.errors.area && (
                <div className="text-red-500 font-bold">{formik.errors.area}</div>
              )
            }
          </div>
          <div className='w-1/2 h-auto flex flex-col justify-center items-start justify-items-center gap-2'>
            <div className='w-full h-auto flex gap-2 justify-start items-center'>
              <label htmlFor="serial" className='font-bold text-black'>
                Serial
              </label> 
              <span className='text-red-500 font-bold text-2xl'>
                *
              </span>
            </div>
            <input 
              type="text"
              name="serial"
              id="serial"
              value={formik.values.serial}
              onChange={formik.handleChange}
              className = {`w-full h-auto  px-4 py-2 rounded-md focus:outline-none border border-gray-300 ${ formik.touched.serial && formik.errors.serial ? 'border-red-500' : 'border-black' }`}
            />
          </div>
        </div>
        <div className='w-full h-auto flex flex-col justify-center items-start justify-items-center gap-2'>
          <div className='w-full h-auto flex gap-2 justify-start items-center'>
            <label htmlFor="horasuso" className='font-bold text-black'>
              Horas de Uso
            </label> 
          </div>
          <input 
            type="number"
            min={0}
            name="horasuso"
            id="horasuso"
            value={formik.values.horasuso}
            onChange={formik.handleChange}
            className = {`w-full h-auto  px-4 py-2 rounded-md focus:outline-none border border-gray-300 ${ formik.touched.horasuso && formik.errors.horasuso ? 'border-red-500' : 'border-black' }`}
          />
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
        <input type="submit" value = "Registrar Herramienta" className="w-full h-auto px-4 py-2 border border-green-500 hover:border-white bg-green-500 hover:bg-green-800 text-white  font-bold  rounded-sm cursor-pointer transition duration-700 ease-in-out" />
    </form>
  )
}

export default AddHerramientaEmpresa;
