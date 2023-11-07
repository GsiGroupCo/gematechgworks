
import { useFormik } from "formik";
import { initialValue, validationSchema } from './FormEditActividad.form';
import { useForm } from '@inertiajs/react'

const EditActMttoPrev = ({ onClose, Responsables, Actividad }) =>  {

  const { data, post } = useForm()
  const formik = useFormik({
    initialValues:initialValue(Actividad),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      data.actividad      = formValue.actividad
      data.frecuencia     = formValue.frecuencia
      data.taqresponsable = formValue.taqresponsable
      data.fecha          = formValue.fecha
      data.taqActPrevact  = Actividad.taqActPrevact
      data.taqmttActivo   = Actividad.taqmttActivo
      post('/act/prev/activo/update') 
      onClose();
    }
  })

  
  return (
    <form 
        onSubmit = { formik.handleSubmit }
        className = "w-[500px] md:w-[750px] h-full flex flex-col justify-center items-start justify-items-center px-8 pt-2 pb-8 gap-3"
        method = "POST"
      >
        <h3 className='font-bold'>
          Editando actividad  
        </h3>
        <div className='w-full h-auto flex flex-col justify-center items-start justify-items-center gap-2'>
          <div className='w-full h-auto flex gap-2 justify-start items-center'>
              <label htmlFor="taqresponsable" className='font-bold text-black'>
              Nuevo Responsable
              </label> 
              <span className='text-red-500 font-bold text-2xl'>
              *
              </span>
          </div>
          <select 
              name="taqresponsable"
              id="taqresponsable"
              value={formik.values.taqresponsable}
              onChange={formik.handleChange}
              className = {`w-full h-auto  px-4 py-2 rounded-md focus:outline-none border border-gray-300 ${ formik.touched.taqresponsable && formik.errors.taqresponsable ? 'border-red-500' : 'border-black' }`}
          >
            <option value="">POR FAVOR SELECCIONE UNA OPCION </option>
            {
                Responsables ? (
                    Responsables.map((data) => (
                        <option key={data.taqresponsable} value={data.taqresponsable}>{data.primernombre} {data.primerapellido}</option>
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
                <label htmlFor="actividad" className='font-bold text-black'>
                Nueva Actividad
                </label> 
                <span className='text-red-500 font-bold text-2xl'>
                *
                </span>
            </div>
            <input 
                type="text"
                name="actividad"
                id="actividad"
                value={formik.values.actividad}
                onChange={formik.handleChange}
                placeholder='INSPECCION VISUAL DE ACTIVO'
                className = {`w-full h-auto  px-4 py-2 rounded-md focus:outline-none border border-gray-300 ${ formik.touched.actividad && formik.errors.actividad ? 'border-red-500' : 'border-black' }`}
            />
            {
                formik.touched.actividad && formik.errors.actividad && (
                <div className="text-red-500 font-bold">{formik.errors.actividad}</div>
                )
            }
        </div> 
        <div className='w-full h-auto flex flex-col justify-center items-start justify-items-center gap-2'>
            <div className='w-full h-auto flex gap-2 justify-start items-center'>
                <label htmlFor="frecuencia" className='font-bold text-black'>
                  Nueva Frecuencia
                </label> 
                <span className='text-red-500 font-bold text-2xl'>
                *
                </span>
            </div>
            <input 
                type = "number"
                name = "frecuencia"
                id = "frecuencia"
                value = {formik.values.frecuencia}
                onChange = {formik.handleChange}
                placeholder = 'TENER EN CUENTA SI EL MTTO ES TIPO CALENDARIO O HORAS TRABAJADAS'
                className = {`w-full h-auto  px-4 py-2 rounded-md focus:outline-none border border-gray-300 ${ formik.touched.frecuencia && formik.errors.frecuencia ? 'border-red-500' : 'border-black' }`}
            />
            {
                formik.touched.frecuencia && formik.errors.frecuencia && (
                <div className="text-red-500 font-bold">{formik.errors.frecuencia}</div>
                )
            }
        </div>  
        <div className='w-full h-auto flex flex-col justify-center items-start justify-items-center gap-2'>
            <div className='w-full h-auto flex gap-2 justify-start items-center'>
                <label htmlFor="fecha" className='font-bold text-black'>
                  Ultimo Mantenimiento
                </label> 
                <span className='text-red-500 font-bold text-2xl'>
                *
                </span>
            </div>
            <input 
              type = "date"
              name = "fecha"
              id = "fecha"
              value = {formik.values.fecha}
              onChange = {formik.handleChange}
              className = {`w-full h-auto  px-4 py-2 rounded-md focus:outline-none border border-gray-300 ${ formik.touched.fecha && formik.errors.fecha ? 'border-red-500' : 'border-black' }`}
            />
            {
              formik.touched.fecha && formik.errors.fecha && (
                <div className="text-red-500 font-bold">{formik.errors.fecha}</div>
              )
            }
        </div> 
        <input type="submit" value = "Editar Actividad" className="w-full h-auto px-4 py-2 border border-green-500 hover:border-white bg-green-500 hover:bg-green-800 text-white  font-bold  rounded-sm cursor-pointer transition duration-700 ease-in-out" />
    </form>
  )
}

export default EditActMttoPrev;
