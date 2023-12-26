//Componentes externos
import { useFormik } from "formik";

//Componentes Internos
import { initialValue, validationSchema } from './AsignarActivo.form';
import { useForm } from "@inertiajs/react";
import { useState } from "react";
import SearchInput from "@/Components/UI/Search";

const AsignarActivo = ({ Taq, onClose, Activos }) =>  {

  const { data, post } = useForm()

  const [Activo, setActivo] = useState();
  const [ActivosFiltrados, setActivosFiltrados] = useState(Activos);
  
  const FiltroActivos = ( searchTerm ) => {
    const filtered  = Activos.filter((data) => {
        const taqActivos = data.taqActivos.toLowerCase();
        const nombre     = data.nombre.toLowerCase();
        const serial     = data.serial.toLowerCase();
        const estado     = data.estado.toLowerCase(); 
        return (
            taqActivos.includes(searchTerm)  ||
            nombre.includes(searchTerm)      ||
            serial.includes(searchTerm)      ||
            estado.includes(searchTerm) 
        );
    });
    setActivosFiltrados(filtered);
  };
    
  const formik = useFormik({
    initialValues:initialValue(),
    validationSchema: validationSchema(initialValue()),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      data.taqActivos = Activo, 
      data.Componente = Taq,
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
          <label htmlFor="taqActivos" className='font-bold text-black'>
            Activos
          </label> 
          <span className='text-red-500 font-bold text-2xl'>
            *
          </span>
        </div>  
        <SearchInput
          SearchFunction = { FiltroActivos }
        />
        {
          ActivosFiltrados ? (
            ActivosFiltrados.map( (data) => (
              <div
                id={data.taqActivos}
                key={data.taqActivos}
                onClick={() => {
                  setActivo(data.taqActivos)
                }}
                    className={`w-full h-auto px-4 py-2 mt-2 cursor-pointer translate duration-700 ease-in-out ${
                        Activo === data.taqActivos
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
          formik.touched.taqActivos && formik.errors.taqActivos && (
            <div className="text-red-500 font-bold">{formik.errors.taqActivos}</div>
          )
        }
      </div> 
      <input 
        type="submit" 
        value = "Asignar Activo" 
        className = "w-full h-auto px-4 py-2 border border-green-500 hover:border-white bg-green-500 hover:bg-green-800 text-white  font-bold  rounded-sm cursor-pointer transition duration-700 ease-in-out" 
      />
    </form>
  )
}

export default AsignarActivo;
