import { useFormik } from "formik"; 
import { initialValue, validationSchema } from './createCaracteristica.form';
import { useForm } from '@inertiajs/react'; 

const CreateCaracteristica = ({ onClose, Taq, route }) =>  {

  const { data , post } = useForm()

  const formik = useFormik({
    initialValues:initialValue(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      data.Taq     = Taq
      data.nombre  = formValue.Nombre
      data.value   = formValue.value
      post(route)
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
            onChange={(e) => {
                formik.handleChange(e);
                formik.setFieldValue('Nombre', e.target.value.toUpperCase());
            }}
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
            onChange={(e) => {
                formik.handleChange(e);
                formik.setFieldValue('value', e.target.value.toUpperCase());
            }}
            placeholder='Ejemplo: 120Km'
            className = {`w-full h-auto  px-4 py-2 rounded-md focus:outline-none border border-black ${ formik.touched.value && formik.errors.value ? 'border-red-500' : 'border-black' }`}
          />
          {
            formik.touched.value && formik.errors.value && (
              <div className="text-red-500 font-bold">{formik.errors.value}</div>
            )
          }
        </div>
        <input type="submit" value = "Asignar Caracteristica" className="w-full h-auto px-4 py-2 border border-green-500 hover:border-white bg-green-500 hover:bg-green-800 text-white  font-bold  rounded-sm cursor-pointer transition duration-700 ease-in-out" />
    </form>
  )
}

export default CreateCaracteristica;
