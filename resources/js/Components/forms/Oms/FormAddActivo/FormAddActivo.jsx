

import React, { useState } from 'react'
import { useFormik } from "formik";
import { initialValue, validationSchema } from './FormAddActivo.form';
import { useForm } from '@inertiajs/react' 
import Panel_general from '@/Components/UI/Panel_general';

const FormAddActivo = ({ Activos, onClose,taqom }) =>  {

  const { data, post } = useForm()
  const [TaqActivo, setTaqActivo] = useState()

  const formik = useFormik({
    initialValues:initialValue(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      data.taqActivos = TaqActivo,
      data.taqot      =taqom,
      data.from       = 'ot'
      post('/asignacion/ot')
      onClose()
    }
  })

  const [ActivosFiltrados, setActivosFiltrados] = useState(Activos);
  const FilterActivos = ( searchTerm ) => {
    const filtered  = Activos.filter((data) => { 
        const taqActivos = data.taqActivos.toLowerCase();
        const nombre     = data.nombre.toLowerCase();
        const serial     = data.serial ? data.serial.toLowerCase() : '';
        return (
            taqActivos.includes(searchTerm)    ||
            nombre.includes(searchTerm)        ||
            serial.includes(searchTerm)        
        );
    });
    setActivosFiltrados(filtered);
};

   return (
    <form 
        onSubmit = { formik.handleSubmit }
        className = " w-full min-w-[800px] h-full flex flex-col justify-center items-start justify-items-center px-8 pt-2 pb-8 gap-3"
        method = "POST"
      >
        <div className='w-full h-[500px]  flex flex-col '>
            <Panel_general  FunctionfilterData = { FilterActivos } >
                {
                    ActivosFiltrados ? (
                        ActivosFiltrados.map((data) => (
                            <div
                            id={data.taqActivos}
                            key={data.taqActivos}
                            onClick={() => {
                              setTaqActivo(data.taqActivos)
                            }}
                                className={`w-full h-auto px-4 py-2 flex justify-between items-center cursor-pointer translate duration-700 ease-in-out ${ TaqActivo === data.taqActivos
                                    ? 'bg-gray-800 text-white border border-black hover:border-white'
                                    : 'hover:bg-gray-800 hover:text-white border border-black hover:border-white'
                                }`}
                            >
                            <div className='w-auto h-full flex justify-start items-center'>
                              {data.nombre}
                            </div>
                            <div className='w-auto h-full flex justify-end items-center'>
                              {data.serial}
                            </div>
                        </div>
                        ))
                    ) : null
                }
            </Panel_general>
        </div>
        <input type="submit" value = "Asignar a OT" className="w-full h-auto px-4 py-2 border border-green-500 hover:border-white bg-green-500 hover:bg-green-800 text-white  font-bold  rounded-sm cursor-pointer transition duration-700 ease-in-out" />
    </form>
  )
}

export default FormAddActivo;
