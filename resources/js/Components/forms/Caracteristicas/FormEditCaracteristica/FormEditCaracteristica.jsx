
//Componentes externos
import { useFormik } from "formik";

//Componentes Internos
import { initialValue, validationSchema } from './FormEditCaracteristica.form';
import { useForm } from "@inertiajs/react";


const FormPanelEditCaracteristica = ({ onClose, Caracteristicas, route }) =>  {
  
  const { data , patch } = useForm()

  const formik = useFormik({
    initialValues:initialValue(Caracteristicas),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      data.taqotro           = Caracteristicas.taqotro
      data.taqActivos        = Caracteristicas.taqActivos
      data.nombre            = formValue.Nombre
      data.valor             = formValue.value
      patch(`${route}`)
      onClose()
    }
  })
  
  return (
    <form 
        onSubmit = { formik.handleSubmit }
        className = " w-full h-full flex flex-col justify-center items-start justify-items-center px-8 pt-2 pb-8 gap-3"
        method = "POST"
      >
        <h3 className='font-bold'>
          Asignando Nueva Caracteristica
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
            placeholder='Ejemplo: Kilometraje'
            className = {`w-full h-auto  px-4 py-2 rounded-md focus:outline-none border border-black ${ formik.touched.Nombre && formik.errors.Nombre ? 'border-red-500' : 'border-black' }`}
          />
          {
            formik.touched.Nombre && formik.errors.Nombre && (
              <div className="text-red-500 font-bold">{formik.errors.Nombre}</div>
            )
          }
        </div>
        <div className='w-full h-auto flex flex-col justify-center items-start justify-items-center gap-2'>
          <div className='w-full h-auto flex gap-2 justify-start items-center'>
            <label htmlFor="value" className='font-bold text-black'>
              Valor
            </label> 
            <span className='text-red-500 font-bold text-2xl'>
              *
            </span>
          </div>
          <input 
            type="text"
            name="value"
            id="value"
            value={formik.values.value}
            onChange={formik.handleChange}
            placeholder='Ejemplo: 120Km'
            className = {`w-full h-auto  px-4 py-2 rounded-md focus:outline-none border border-black ${ formik.touched.value && formik.errors.value ? 'border-red-500' : 'border-black' }`}
          />
          {
            formik.touched.value && formik.errors.value && (
              <div className="text-red-500 font-bold">{formik.errors.value}</div>
            )
          }
        </div>
        <input type="submit" value = "Editar Caracteristica" className="w-full h-auto px-4 py-2 border border-green-500 hover:border-white bg-green-500 hover:bg-green-800 text-white  font-bold  rounded-sm cursor-pointer transition duration-700 ease-in-out" />
    </form>
  )
}

export default FormPanelEditCaracteristica;
