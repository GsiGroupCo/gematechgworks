import { useFormik } from "formik";
import { initialValue, validationSchema } from './EditActivo.form';
import { useForm } from '@inertiajs/react';
import { useState } from 'react';

const EditActivo = ({ Activo, onClose }) =>  {
  
  const [file, setFile] = useState();
  const { data, post } = useForm()

  const formik = useFormik({
    initialValues:initialValue(Activo),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      data.taqActivos  = Activo[0].taqActivos
      data.nombre      = formValue.Nombre
      data.descripcion = formValue.Descripcion 
      data.serial      = formValue.Serial
      data.horasuso    = formValue.Horas_Uso
      data.Image       = file 
      post('/activo/update')
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
        className = "w-full h-full flex flex-col justify-center items-start justify-items-center px-8 pt-2 pb-8 gap-3"
        method = "POST"
      >
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
            className = {`w-full h-auto  px-4 py-2 rounded-md focus:outline-none border border-black ${ formik.touched.Nombre && formik.errors.Nombre ? 'border-red-500' : 'border-black' }`}
          />
          {
            formik.touched.Nombre && formik.errors.Nombre && (
              <div className="text-red-500 font-bold">{formik.errors.Nombre}</div>
            )
          }
        </div> 
        <div className='w-full flex justify-center items-center gap-3'>
          <div className='w-full h-auto flex flex-col justify-center items-start justify-items-center gap-2'>
            <div className='w-full h-auto flex gap-2 justify-start items-center'>
              <label htmlFor="Serial" className='font-bold text-black'>
                Serial
              </label> 
              <span className='text-red-500 font-bold text-2xl'>
                *
              </span>
            </div>
            <input 
              type="text"
              name="Serial"
              id="Serial"
              value={formik.values.Serial}
              onChange={(e) => {
                formik.handleChange(e);
                formik.setFieldValue('Serial', e.target.value.toUpperCase());
              }}
              className = {`w-full h-auto  px-4 py-2 rounded-md focus:outline-none border border-black ${ formik.touched.Serial && formik.errors.Serial ? 'border-red-500' : 'border-black' }`}
            />
            {
              formik.touched.Serial && formik.errors.Serial && (
                <div className="text-red-500 font-bold">{formik.errors.Serial}</div>
              )
            }
          </div>
          <div className='w-full h-auto flex flex-col justify-center items-start justify-items-center gap-2'>
            <div className='w-full h-auto flex gap-2 justify-start items-center'>
              <label htmlFor="Horas_Uso" className='font-bold text-black'>
                Horas de Uso
              </label> 
            </div>
            <input 
              type="number"
              min={0}
              name="Horas_Uso"
              id="Horas_Uso"
              value={formik.values.Horas_Uso}
              onChange={formik.handleChange}
              className = {`w-full h-auto  px-4 py-2 rounded-md focus:outline-none border border-black ${ formik.touched.Horas_Uso && formik.errors.Horas_Uso ? 'border-red-500' : 'border-black' }`}
            />
            {
              formik.touched.Horas_Uso && formik.errors.Horas_Uso && (
                <div className="text-red-500 font-bold">{formik.errors.Horas_Uso}</div>
              )
            }
          </div>
        </div>
        <div className='w-full h-auto flex flex-col justify-center items-start justify-items-center gap-2'>
          <div className='w-full h-auto flex gap-2 justify-start items-center'>
            <label htmlFor="Descripcion" className='font-bold text-black'>
              Descripcion
            </label> 
          </div>
          <textarea 
            name="Descripcion"
            id="Descripcion"
            value={formik.values.Descripcion} 
            onChange={(e) => {
              formik.handleChange(e);
              formik.setFieldValue('Descripcion', e.target.value.toUpperCase());
            }}
            className = {`w-full h-auto  px-4 py-2 rounded-md focus:outline-none border border-black ${ formik.touched.Descripcion && formik.errors.Descripcion ? 'border-red-500' : 'border-black' }`}
            placeholder="Escribe aquí"
          ></textarea>
          {
            formik.touched.Descripcion && formik.errors.Descripcion && (
              <div className="text-red-500 font-bold">{formik.errors.Descripcion}</div>
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
            value={formik.values.Imagen}
            onChange={handleFileChange}
            className = {`w-full h-auto  px-4 py-2 rounded-md focus:outline-none  ${ formik.touched.Image && formik.errors.Image ? 'border-red-500' : 'border-black' }`} 
          />
          {file && (
            <div className='w-full h-[200px] flex justify-center'>
              <img src={URL.createObjectURL(file)} alt="" className="w-full h-full object-cover" loading="lazy"/>
            </div>
          )}
        </div>  
        <input type="submit" value = "Editar Activo" className="w-full h-auto px-4 py-2 border border-green-500 hover:border-white bg-green-500 hover:bg-green-800 text-white  font-bold  rounded-sm cursor-pointer transition duration-700 ease-in-out" />
    </form>
  )
}

export default EditActivo;
