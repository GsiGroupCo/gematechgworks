
import { Toaster } from 'sonner'
import { useFormik } from "formik";
import { initialValue, validationSchema } from './LoginForm.form';
import logo from '../../../../../../public/img/gema.png'
import LogoGworks from '../../../../../../public/img/LogoGworks.png'
import { useForm } from '@inertiajs/react';

export default function LoginForm() {

  const { data, post } = useForm();

  const formik = useFormik({
    initialValues:initialValue(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      data.email    = formValue.email,
      data.password = formValue.password, 
      post('/loginstore')
    }
  })
  
  return (
    <form 
        onSubmit = { formik.handleSubmit }
        className = " w-[20%] h-full   shadow-lg shadow-black flex flex-col justify-center items-center justify-items-center px-8 py-8 gap-3 "  
        method = "POST"
      > 
        <div className='w-full h-auto flex justify-center items-center gap-3'>
          <img src={logo} alt="logo_gema" className='w-[70px] h-[70px]' loading="lazy"/>
          <h3 className='text-6xl font-bold text-black'>GEMA</h3>
        </div>
        <div className='w-auto h-[45px] flex justify-center items-center gap-3 mb-[50px]'>
          <img src={LogoGworks} alt="logo_gema" className='w-full h-full object-cover' loading="lazy"/> 
        </div>
        <div className='w-full h-auto flex flex-col justify-center items-start justify-items-center gap-2'>
          <label htmlFor="email" className='font-bold text-black'>
            Email
          </label> 
          <input 
            type="email"
            name="email"
            id="email"
            value = { formik.values.email } 
            onChange = { formik.handleChange } 
            placeholder="JhonDoe@gematech.com" 
            className = {`w-full h-auto px-4 py-2 rounded-md focus:outline-none border border-black ${ formik.touched.email && formik.errors.email ? 'border-red-500' : 'border-black' }`} 
          />
          {
            formik.touched.email && formik.errors.email && (
              <div className="text-red-500 font-bold">{formik.errors.email}</div>
            )
          }
        </div>
        <div className='w-full h-auto flex flex-col justify-center items-start justify-items-center gap-2'>
          <label htmlFor="password" className='font-bold text-black'>
            Contraseña
          </label> 
          <input 
            type="password"
            name="password"
            id="password"
            value = { formik.values.password }
            onChange = { formik.handleChange }
            placeholder="Ingresa tu Contraseña"
            className = {`w-full h-auto px-4 py-2 rounded-md focus:outline-none border border-black ${ formik.touched.password && formik.errors.password ? 'border-red-500' : 'border-black' }`}
          />
          {
            formik.touched.password && formik.errors.password && (
              <div className="text-red-500 font-bold">{formik.errors.password}</div>
            )
          }
        </div>
        <input type="submit" value = "Iniciar Sesion" className="w-full h-auto px-4 py-2 bg-[#385449] hover:text-white hover:bg-green-500 font-bold text-white shadow shadow-black cursor-pointer   transition duration-700 ease-in-out" />
        <Toaster richColors position="top-center"/>
    </form>
  )
}
