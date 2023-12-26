
//Componentes externos
import { useFormik } from "formik";

//Componentes Internos
import { initialValue, validationSchema } from './AsignarComponente.form';
import { useForm } from "@inertiajs/react";  
import { useEffect, useState } from "react";
import SearchInput from "@/Components/UI/Search";

const AsignarComponente = ({ Taq, Componentes, onClose }) =>  {

  const { data, post } = useForm()

  const [Componente, setComponente] = useState();
  const [ComponentesFiltrados, setComponentesFiltrados] = useState(Componentes);
  
  const FiltroComponentes = ( searchTerm ) => {
    const filtered  = Componentes.filter((data) => {
        const taqComponente = data.taqComponente.toLowerCase();
        const nombre        = data.nombre.toLowerCase();
        const serial        = data.serial.toLowerCase(); 
        return (
            taqComponente.includes(searchTerm)  ||
            nombre.includes(searchTerm)         ||
            serial.includes(searchTerm) 
        );
    });
    setComponentesFiltrados(filtered);
  };
    
  const formik = useFormik({
    initialValues:initialValue(),
    validationSchema: validationSchema(initialValue()),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      data.taqActivos    = Taq, 
      data.taqComponente = Componente,
      post('/componente/activo')
      onClose()
    }
  })
  
  return (
    <form 
      onSubmit = { formik.handleSubmit }
      className = " w-[500px] h-full flex flex-col justify-center items-start justify-items-center px-8 pt-2 pb-8 gap-3"
      method = "POST"
    >
      <div className='w-full h-auto flex-col justify-center items-center gap-3'>
        <div className='w-full h-auto flex gap-2 justify-start items-center'>
          <label htmlFor="taqComponente" className='font-bold text-black'>
            Componentes
          </label> 
          <span className='text-red-500 font-bold text-2xl'>
            *
          </span>
        </div>  
        <SearchInput
          SearchFunction = { FiltroComponentes }
        />
        {
          ComponentesFiltrados ? (
            ComponentesFiltrados.map( (data) => (
              <div
                id={data.taqComponente}
                key={data.taqComponente}
                onClick={() => {
                  setComponente(data.taqComponente)
                }}
                    className={`w-full h-auto px-4 py-2 mt-2 cursor-pointer translate duration-700 ease-in-out ${
                        Componente === data.taqComponente
                        ? 'bg-gray-800 text-white border border-black hover:border-white'
                        : 'hover:bg-gray-800 hover:text-white border border-black hover:border-white'
                    }`}
                >
                {data.nombre}
              </div>
            ))
          ) : null
        }
        {
          formik.touched.taqComponente && formik.errors.taqComponente && (
            <div className="text-red-500 font-bold">{formik.errors.taqComponente}</div>
          )
        }
      </div> 
      <input 
        type="submit" 
        value = "Asignar Componentes" 
        className = "w-full h-auto px-4 py-2 border border-green-500 hover:border-white bg-green-500 hover:bg-green-800 text-white  font-bold  rounded-sm cursor-pointer transition duration-700 ease-in-out" 
      />
    </form>
  )
}

export default AsignarComponente;
