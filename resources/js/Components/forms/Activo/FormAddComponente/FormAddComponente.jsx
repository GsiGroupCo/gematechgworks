

import React, { useState } from 'react'
import { useFormik } from "formik";
import { initialValue, validationSchema } from './FormAddComponente.form';
import { useForm } from '@inertiajs/react' 
import Panel_general from '@/Components/UI/Panel_general';

const FormAddComponente = ({ taqActivos, onClose, Componentes }) =>  {

  const { data, post } = useForm()
  const [Componente, setComponente] = useState()  

  const formik = useFormik({
    initialValues:initialValue(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      data.taqActivos    = taqActivos, 
      data.taqComponente = Componente,
      console.log(data)
      post('/componente/activo')
      onClose()
    }
  })

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

   return (
    <form 
        onSubmit = { formik.handleSubmit }
        className = " w-full h-full flex flex-col justify-center items-start justify-items-center px-8 pt-2 pb-8 gap-3"
        method = "POST"
      >
        <div className='w-full h-[500px]'> 
            <Panel_general  FunctionfilterData = { FiltroComponentes } >
                {
                    ComponentesFiltrados ? (
                        ComponentesFiltrados.map((data) => (
                            <div
                            id={data.taqComponente}
                            key={data.taqComponente}
                            onClick={() => {
                              setComponente(data.taqComponente)
                            }}
                                className={`w-full h-auto px-4 py-2 cursor-pointer translate duration-700 ease-in-out ${
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
            </Panel_general>
        </div>
        <input type="submit" value = "Asignar a Activo" className="w-full h-auto px-4 py-2 border border-green-500 hover:border-white bg-green-500 hover:bg-green-800 text-white  font-bold  rounded-sm cursor-pointer transition duration-700 ease-in-out" />
    </form>
  )
}

export default FormAddComponente;
