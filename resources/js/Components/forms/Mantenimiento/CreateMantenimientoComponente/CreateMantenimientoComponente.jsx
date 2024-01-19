import { useFormik } from "formik";
import { initialValue, validationSchema } from './CreateMantenimientoComponente.form';
import { useForm } from '@inertiajs/react'
import { useState } from "react";

const CreateMantenimientoComponente = ({ onClose, CategoriasComponente }) =>  {

  const { data, post } = useForm()
  const [filtro, setFiltro] = useState("");

  const formik = useFormik({
    initialValues:initialValue(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
        data.categoria_id  = formValue.categoria_id
        data.nombre        = formValue.nombre
        data.Descripcion   = formValue.Descripcion
        data.Tipo          = formValue.Tipo
        post('/mantenimiento/componente/store')
        onClose()
    }
  })
  return (
    <form 
        onSubmit = { formik.handleSubmit }
        className = "w-[500px] md:w-[750px] h-full flex flex-col justify-center items-start justify-items-center px-8 pt-2 pb-8 gap-3"
        method = "POST"
    >
        <h3 className='font-bold'>
          REGISTRANDO NUEVO MANTENIMIENTO DE COMPONENTE
        </h3>
        <div className='w-full h-auto flex-col justify-center items-center gap-3'>
            <div className='w-full h-auto flex gap-2 justify-start items-center'>
            <label htmlFor="categoria_id" className='font-bold text-black'>
                CATEGORIA DE COMPONENTE
            </label> 
            <span className='text-red-500 font-bold text-2xl'>
                *
            </span>
            </div>            
            <input 
                type="text" 
                value={filtro} 
                onChange={(e) => setFiltro(e.target.value)} 
                placeholder="Filtrar por nombre..."
                className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            <select id="categoria_id" name="categoria_id"  value = { formik.values.categoria_id } onChange = { formik.handleChange} className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ">
            <option value = "" disabled>
                POR FAVOR SELECCIONA UNA OPCION
            </option>
            {
                CategoriasComponente ? (
                    CategoriasComponente.filter(data => data.nombre.includes(filtro)).map((data) => (
                        <option 
                            key = { data.categoria_id } 
                            value = { data.categoria_id }
                        >
                            { data.nombre } 
                        </option>
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
                <label htmlFor="nombre" className='font-bold text-black'>
                    NOMBRE DE MANTENIMIENTO
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
                placeholder='MANTENIMIENTO A MOTOSOLDADOR'
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
                    DESCRIPCION
                </label> 
                <span className='text-red-500 font-bold text-2xl'>
                *
                </span>
            </div>
            <textarea  
                cols="30" 
                rows="4"
                name="Descripcion"
                id="Descripcion"
                value={formik.values.Descripcion} 
                onChange={(e) => {
                    formik.handleChange(e);
                    formik.setFieldValue('Descripcion', e.target.value.toUpperCase());
                }}
                className = {`w-full h-auto  px-4 py-2 rounded-md focus:outline-none border border-gray-300 ${ formik.touched.Descripcion && formik.errors.Descripcion ? 'border-red-500' : 'border-black' }`}
            ></textarea> 
            {
                formik.touched.Descripcion && formik.errors.Descripcion && (
                <div className="text-red-500 font-bold">{formik.errors.Descripcion}</div>
                )
            }
        </div>
        <div className='w-full h-auto flex flex-col justify-center items-start justify-items-center gap-2'>
            <div className='w-full h-auto flex gap-2 justify-start items-center'>
                <label htmlFor="Tipo" className='font-bold text-black'>
                TIPO
                </label> 
                <span className='text-red-500 font-bold text-2xl'>
                *
                </span>
            </div>
            <select 
                type="text"
                name="Tipo"
                id="Tipo"
                value={formik.values.Tipo}
                onChange={formik.handleChange}
                className = {`w-full h-auto  px-4 py-2 rounded-md focus:outline-none border border-gray-300 ${ formik.touched.Tipo && formik.errors.Tipo ? 'border-red-500' : 'border-black' }`}
            >
                <option value="">SELECCIONE UNA OPCION</option>
                <option value="HORAS TRABAJADAS">HORAS TRABAJADAS</option>
                <option value="CALENDARIO">CALENDARIO</option>
            </select>
            {
                formik.touched.Tipo && formik.errors.Tipo && (
                <div className="text-red-500 font-bold">{formik.errors.Tipo}</div>
                )
            }
        </div>
        <input type="submit" value = "Registrar Mantenimiento" className="w-full h-auto px-4 py-2 border border-green-500 hover:border-white bg-green-500 hover:bg-green-800 text-white  font-bold  rounded-sm cursor-pointer transition duration-700 ease-in-out" />
    </form>
  )
}

export default CreateMantenimientoComponente;
