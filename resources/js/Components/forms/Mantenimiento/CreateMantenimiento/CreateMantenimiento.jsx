import { useFormik } from "formik";
import { initialValue, validationSchema } from './CreateMantenimiento.form';
import { useForm } from '@inertiajs/react'

const CreateMantenimiento = ({ onClose }) =>  {
  
  const { data, post } = useForm()
  
  const formik = useFormik({
    initialValues:initialValue(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      data.Nombre      = formValue.Nombre
      data.Descripcion = formValue.Descripcion
      data.Tipo        = formValue.Tipo
      post('/mantenimiento/store')
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
          Registrando Nuevo Mantenimiento
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
                onChange={formik.handleChange}
                placeholder='MANTENIMIENTO A MOTOSOLDADOR'
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
                <label htmlFor="Descripcion" className='font-bold text-black'>
                Descripcion
                </label> 
                <span className='text-red-500 font-bold text-2xl'>
                *
                </span>
            </div>
            <input 
                type="text"
                name="Descripcion"
                id="Descripcion"
                value={formik.values.Descripcion}
                onChange={formik.handleChange}
                className = {`w-full h-auto  px-4 py-2 rounded-md focus:outline-none border border-gray-300 ${ formik.touched.Descripcion && formik.errors.Descripcion ? 'border-red-500' : 'border-black' }`}
            />
            {
                formik.touched.Descripcion && formik.errors.Descripcion && (
                <div className="text-red-500 font-bold">{formik.errors.Descripcion}</div>
                )
            }
        </div>
        <div className='w-full h-auto flex flex-col justify-center items-start justify-items-center gap-2'>
            <div className='w-full h-auto flex gap-2 justify-start items-center'>
                <label htmlFor="Tipo" className='font-bold text-black'>
                Tipo
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

export default CreateMantenimiento;
