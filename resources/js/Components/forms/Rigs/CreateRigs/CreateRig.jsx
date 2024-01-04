
import React, { useState } from 'react'
import { useFormik } from "formik";
import { initialValue, validationSchema } from './CreateRig.form';
import { useForm } from '@inertiajs/react'

const CreateRigs = ({ onClose }) =>  {

  const { data, post } = useForm()
  const [file, setFile] = useState();
  
  const formik = useFormik({
    initialValues:initialValue(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      data.nombre      = formValue.Nombre
      data.Image       = file
      post('/rigs/store')
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
          Registrando Nuevo Rig
        </h3>
        <div className='w-full h-auto flex flex-col justify-center items-start justify-items-center gap-2'>
            <div className='w-full h-auto flex gap-2 justify-start items-center'>
              <label htmlFor="Nombre" className='font-bold text-black'>
                Nombre
              </label> 
              <span className='text-red-500 font-bold text-2xl'>
                *
              </span>
            </div>
            <input 
              type="text"
              name="Nombre"
              id="Nombre"
              value={formik.values.Nombre} 
              onChange={(e) => {
                  formik.handleChange(e);
                  formik.setFieldValue('Nombre', e.target.value.toUpperCase());
              }}
              placeholder='GSI GROUP'
              className = {`w-full h-auto  px-4 py-2 rounded-md focus:outline-none border border-gray-300 ${ formik.touched.Nombre && formik.errors.Nombre ? 'border-red-500' : 'border-black' }`}
            />
            {
              formik.touched.Nombre && formik.errors.Nombre && (
                <div className="text-red-500 font-bold">{formik.errors.Nombre}</div>
              )
            }
          </div>
          <div className='w-full h-auto flex flex-col justify-center items-start justify-items-center gap-2'>
            <div className='w-full h-auto flex gap-2 justify-start items-center'>
              <label htmlFor="Taq" className='font-bold text-black'>
                Taq
              </label> 
              <span className='text-red-500 font-bold text-2xl'>
                *
              </span>
            </div>
            <input 
              type="text"
              name="Taq"
              id="Taq"
              value={formik.values.Taq} 
              onChange={(e) => {
                  formik.handleChange(e);
                  formik.setFieldValue('Taq', e.target.value.toUpperCase());
              }}
              placeholder='GSI'
              className = {`w-full h-auto  px-4 py-2 rounded-md focus:outline-none border border-gray-300 ${ formik.touched.Taq && formik.errors.Taq ? 'border-red-500' : 'border-black' }`}
            />
            {
              formik.touched.Taq && formik.errors.Taq && (
                <div className="text-red-500 font-bold">{formik.errors.Taq}</div>
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
        <input type="submit" value = "Registrar Nuevo Rig " className="w-full h-auto px-4 py-2 border border-green-500 hover:border-white bg-green-500 hover:bg-green-800 text-white  font-bold  rounded-sm cursor-pointer transition duration-700 ease-in-out" />
    </form>
  )
}

export default CreateRigs;
