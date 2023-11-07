import { useFormik } from "formik";
import { initialValue, validationSchema } from './FormEditHerramienta.form';
import { useForm } from '@inertiajs/react';
import { useState } from 'react';

const FormEditandoHerramienta = ({ Herramienta, onClose, Empresas, Categorias }) =>  {
  
  const [file, setFile] = useState();
  const { data, post } = useForm()

  const formik = useFormik({
    initialValues:initialValue(Herramienta),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      data.taqHer      = Herramienta[0].taqHer
      data.nombre      = formValue.nombre
      data.serial      = formValue.serial
      data.area        = formValue.area
      data.horasuso    = formValue.horasuso
      data.Image       = file
      post('/herramienta/update')
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
      className = " w-full h-full flex flex-col justify-center items-start justify-items-center px-8 pt-2 pb-8 gap-3"
      method = "POST"
    >
      <div className='w-full h-auto flex flex-col justify-center items-start justify-items-center gap-2'>
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
          className = {`w-full h-auto  px-4 py-2 rounded-md focus:outline-none border border-black ${ formik.touched.nombre && formik.errors.nombre ? 'border-red-500' : 'border-black' }`}
        />
        {
          formik.touched.nombre && formik.errors.nombre && (
            <div className="text-red-500 font-bold">{formik.errors.nombre}</div>
          )
        }
      </div>
      <div className='w-full h-auto flex flex-col justify-center items-start justify-items-center gap-2'>
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
          className = {`w-full h-auto  px-4 py-2 rounded-md focus:outline-none border border-black ${ formik.touched.serial && formik.errors.serial ? 'border-red-500' : 'border-black' }`}
        />
        {
          formik.touched.serial && formik.errors.serial && (
            <div className="text-red-500 font-bold">{formik.errors.serial}</div>
          )
        }
      </div>
      <div className='w-full h-auto flex flex-col justify-center items-start justify-items-center gap-2'>
        <div className='w-full h-auto flex gap-2 justify-start items-center'>
          <label htmlFor="area" className='font-bold text-black'>
            Area
          </label> 
        </div>
        <input 
          type="text"
          name="area"
          id="area"
          value={formik.values.area}
          onChange={formik.handleChange}
          className = {`w-full h-auto  px-4 py-2 rounded-md focus:outline-none border border-black ${ formik.touched.area && formik.errors.area ? 'border-red-500' : 'border-black' }`}
        />
        {
          formik.touched.area && formik.errors.area && (
            <div className="text-red-500 font-bold">{formik.errors.area}</div>
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
        {
          formik.touched.horasuso && formik.errors.horasuso && (
            <div className="text-red-500 font-bold">{formik.errors.horasuso}</div>
          )
        }
      </div>
      <div className='w-full h-auto flex flex-col justify-center items-start justify-items-center gap-2'>
        <div className='w-full h-auto flex gap-2 justify-start items-center'>
          <label htmlFor="Image" className='font-bold text-black'>
            Imagen
          </label> 
        </div>
        <input 
          id="Image"
          name="Image"
          type="file"
          accept="image/*"
          value={formik.values.Imagen}
          onChange={handleFileChange}
          className = {`w-full h-auto  px-4 py-2 rounded-md focus:outline-none  ${ formik.touched.Image && formik.errors.Image ? 'border-red-500' : 'border-black' }`} 
        />
      </div>       
      {file && (
        <div className='w-full h-[250px] flex justify-center'>
          <img src={URL.createObjectURL(file)} alt="" className="w-full h-full object-contain" loading="lazy"/>
        </div>
      )}
      <input type="submit" value = "Editar Herramienta" className="w-full h-auto px-4 py-2 border border-green-500 hover:border-white bg-green-500 hover:bg-green-800 text-white  font-bold  rounded-sm cursor-pointer transition duration-700 ease-in-out" />
    </form>
  )
}

export default FormEditandoHerramienta;
