import { useFormik } from "formik";
import { initialValue, validationSchema } from './FormNewTrabajo.form';
import { useForm } from '@inertiajs/react'

const NewWork  = ({ onClose, Responsables,taqom }) =>  {

  const { data, post } = useForm()
  
  const formik = useFormik({
    initialValues:initialValue(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      data.cantHoras       = formValue.cantHoras
      data.descripcion     = formValue.descripcion.toUpperCase(),
      data.taqot           =taqom
      data.taqresponsable  = formValue.taqresponsable
      data.estado          = formValue.estado 
      post('/trabajo/store')
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
          Registrando Nuevo Trabajo para la {taqom }
        </h3>
        <div className='w-full h-auto flex flex-col justify-center items-start justify-items-center gap-2'>
          <div className='w-full h-auto flex gap-2 justify-start items-center'>
            <label htmlFor="descripcion" className='font-bold text-black'>
              Descripcion
            </label> 
            <span className='text-red-500 font-bold text-2xl'>
              *
            </span>
          </div>
          <input 
            type="text" 
            name="descripcion"
            id="descripcion"
            value={formik.values.descripcion}
            onChange={formik.handleChange}
            className = {`w-full h-auto  px-4 py-2 rounded-md focus:outline-none border border-gray-300 ${ formik.touched.descripcion && formik.errors.descripcion ? 'border-red-500' : 'border-black' }`}
          />
          {
            formik.touched.descripcion && formik.errors.descripcion && (
              <div className="text-red-500 font-bold">{formik.errors.descripcion}</div>
            )
          }
        </div>
        <div className='w-full h-auto flex flex-col justify-center items-start justify-items-center gap-2'>
          <div className='w-full h-auto flex gap-2 justify-start items-center'>
            <label htmlFor="cantHoras" className='font-bold text-black'>
              Cantidad de Horas
            </label> 
            <span className='text-red-500 font-bold text-2xl'>
              *
            </span>
          </div>
          <input 
            type="number"
            min={0}
            name="cantHoras"
            id="cantHoras"
            value={formik.values.cantHoras}
            onChange={formik.handleChange}
            className = {`w-full h-auto  px-4 py-2 rounded-md focus:outline-none border border-gray-300 ${ formik.touched.cantHoras && formik.errors.cantHoras ? 'border-red-500' : 'border-black' }`}
          />
          {
            formik.touched.cantHoras && formik.errors.cantHoras && (
              <div className="text-red-500 font-bold">{formik.errors.cantHoras}</div>
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
          <select id="taqresponsable" name="taqresponsable"  value = { formik.values.taqresponsable } onChange = { formik.handleChange} className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ">
            <option value = "" disabled> POR FAVOR SELECCIONA UNA OPCION </option>
            {
              Responsables ? (
                  Responsables.map((data) => (
                  <option 
                    key = { data.taqresponsable } 
                    value = { data.taqresponsable }
                  >
                      { data.primernombre } { data.segundonombre } { data.primerapellido } { data.segundoapellido } 
                  </option>
                  ))
              ) : null
            }
          </select>
          {
            formik.touched.taqresponsable && formik.errors.taqresponsable && (
              <div className="text-red-500 font-bold">{formik.errors.taqresponsable}</div>
            )
          }
        </div>
        <div className='w-full h-auto flex flex-col justify-center items-start justify-items-center gap-2'>
          <div className='w-full h-auto flex gap-2 justify-start items-center'>
            <label htmlFor="estado" className='font-bold text-black'>
              estado
            </label> 
            <span className='text-red-500 font-bold text-2xl'>
              *
            </span>
          </div>
          <select id="estado" name="estado"  value = { formik.values.estado } onChange = { formik.handleChange} className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ">
            <option value = "" disabled>
                POR FAVOR SELECCIONA UNA OPCION
            </option>
            <option value="EN PROCESO">EN PROCESO</option>
            <option value="FINALIZADO">FINALIZADO</option>
          </select>
          {
            formik.touched.estado && formik.errors.estado && (
              <div className="text-red-500 font-bold">{formik.errors.estado}</div>
            )
          }
        </div>
        <input type="submit" value = "Registrar Trabajo" className="w-full h-auto px-4 py-2 border border-green-500 hover:border-white bg-green-500 hover:bg-green-800 text-white  font-bold  rounded-sm cursor-pointer transition duration-700 ease-in-out" />
    </form>
  )
}

export default NewWork;
