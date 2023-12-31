
import React, { useState } from 'react'
import { useFormik } from "formik";
import { initialValue, validationSchema } from './CreateComponente.form';
import { useForm } from '@inertiajs/react'

const CreateComponente = ({ onClose, Tipos }) =>  {

  const { data, post } = useForm()
  const [file, setFile] = useState();
  const formik = useFormik({
    initialValues:initialValue(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => { 
      data.categoria_id  = formValue.categoria_id,
      data.nombre        = formValue.nombre,
      data.descripcion   = formValue.descripcion,
      data.serial        = formValue.serial,
      data.horasuso      = formValue.horasuso,
      data.Image         = file
      post('/componente/store')
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
        className = " w-full lg:w-[800px] h-full flex flex-col justify-center items-start justify-items-center px-8 pt-2 pb-8 gap-3"
        method = "POST"
      >
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
              placeholder='ACUMULADOR SHENKAI'
              value={formik.values.nombre} 
              onChange={(e) => {
                  formik.handleChange(e);
                  formik.setFieldValue('nombre', e.target.value.toUpperCase());
              }}
              className = {`w-full h-auto  px-4 py-2 rounded-md focus:outline-none border border-black ${ formik.touched.nombre && formik.errors.nombre ? 'border-red-500' : 'border-black' }`}
            />
            {
              formik.touched.nombre && formik.errors.nombre && (
                <div className="text-red-500 font-bold">{formik.errors.nombre}</div>
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
              onChange={(e) => {
                formik.handleChange(e);
                formik.setFieldValue('serial', e.target.value.toUpperCase());
              }}
              className = {`w-full h-auto  px-4 py-2 rounded-md focus:outline-none border border-black ${ formik.touched.serial && formik.errors.serial ? 'border-red-500' : 'border-black' }`}
            />
            {
              formik.touched.serial && formik.errors.serial && (
                <div className="text-red-500 font-bold">{formik.errors.serial}</div>
              )
            }
          </div>
        </div>
        <div className='w-full flex justify-center items-center gap-3'> 
          <div className='w-full h-auto flex flex-col justify-center items-start justify-items-center gap-2'>
            <div className='w-full h-auto flex gap-2 justify-start items-center'>
              <label htmlFor="categoria_id" className='font-bold text-black'>
                Tipo de Componente
              </label> 
              <span className='text-red-500 font-bold text-2xl'>
                *
              </span>
            </div>
            <select 
              name="categoria_id"
              id="categoria_id"
              value={formik.values.categoria_id}
              onChange={formik.handleChange}
              className = {`w-full h-auto  px-4 py-2 rounded-md focus:outline-none border border-black ${ formik.touched.categoria_id && formik.errors.categoria_id ? 'border-red-500' : 'border-black' }`}
            >
              <option value="" disabled>SELECCIONE UNA OPCION</option>
              {
                    Tipos ? (
                        Tipos.map((data) => (
                            <option key={data.categoria_id} value={data.categoria_id}>{data.nombre}</option>
                        ))
                    ) : null
                }
            </select>
            {
              formik.touched.categoria_id && formik.errors.categoria_id && (
                <div className="text-red-500 font-bold">{formik.errors.categoria_id}</div>
              )
            }
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
              className = {`w-full h-auto  px-4 py-2 rounded-md focus:outline-none border border-black ${ formik.touched.horasuso && formik.errors.horasuso ? 'border-red-500' : 'border-black' }`}
            />
          </div>
        </div>
        
        <div className='w-full h-auto flex flex-col justify-center items-start justify-items-center gap-2'>
          <div className='w-full h-auto flex gap-2 justify-start items-center'>
            <label htmlFor="descripcion" className='font-bold text-black'>
              descripcion
            </label> 
          </div>
          <textarea 
            name="descripcion"
            id="descripcion"
            value={formik.values.descripcion} 
            onChange={(e) => {
                formik.handleChange(e);
                formik.setFieldValue('descripcion', e.target.value.toUpperCase());
            }}
            className = {`w-full h-auto  px-4 py-2 rounded-md focus:outline-none border border-black ${ formik.touched.descripcion && formik.errors.descripcion ? 'border-red-500' : 'border-black' }`}
            placeholder="Escribe aquí"
          ></textarea>
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
        <input type="submit" value = "Registrar Componente" className="w-full h-auto px-4 py-2 border border-green-500 hover:border-white bg-green-500 hover:bg-green-800 text-white  font-bold  rounded-sm cursor-pointer transition duration-700 ease-in-out" />
    </form>
  )
}

export default CreateComponente;
