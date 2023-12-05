

import React, { useState } from 'react'
import { useFormik } from "formik";
import { initialValue, validationSchema } from './FormAddOM.form';
import { useForm } from '@inertiajs/react' 
import Panel_general from '@/Components/UI/Panel_general';

const FormAddOM = ({ TaqComponente, onClose, Oms, route }) =>  {

  const { data, post } = useForm()
  const [TaqOM, setTaqOM] = useState()

  const formik = useFormik({
    initialValues:initialValue(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      data.TaqComponente = TaqComponente,
      data.taqom         = Oms[0].taqom,
      post(`${route}`)
      onClose()
    }
  })

  const [OMSFiltradas, setOMSFiltradas] = useState(Oms);
  const FilterOMs = ( searchTerm ) => {
    const filtered  = oms.filter((data) => {
        const taqom          = data.taqom.toLowerCase();
        const taqempresa     = data.taqempresa.toLowerCase();
        const fechainicio    = data.fechainicio.toLowerCase();
        const horainicio     = data.horainicio.toLowerCase();
        const fechafin       = data.fechafin ? data.fechafin.toLowerCase() : '';
        const horafin        = data.horafin ? data.horafin.toLowerCase() : '';
        const tipo           = data.tipo.toLowerCase();
        const clasom         = data.tipo.toLowerCase();
        const descripcion    = data.descripcion?  data.descripcion.toLowerCase() : '';
        const prioridad      = data.prioridad.toLowerCase();
        const estado         = data.estado.toLowerCase();
        const created_at     = data.created_at.toLowerCase();
        const updated_at     = data.updated_at.toLowerCase();
        return (
           taqom.includes(searchTerm)          ||
            taqempresa.includes(searchTerm)     ||
            fechainicio.includes(searchTerm)    ||
            horainicio.includes(searchTerm)     ||
            fechafin.includes(searchTerm)       ||
            tipo.includes(searchTerm)           ||
            clasot.includes(searchTerm)         ||
            descripcion.includes(searchTerm)    ||
            prioridad.includes(searchTerm)      ||
            horafin.includes(searchTerm)        ||
            estado.includes(searchTerm)         ||
            created_at.includes(searchTerm)     ||
            updated_at.includes(searchTerm) 
        );
    });
    setOMSFiltradas(filtered);
};
 
   return (
    <form 
        onSubmit = { formik.handleSubmit }
        className = "w-auto sm:w-[400px] md:w-[800px] h-full flex flex-col justify-center items-start justify-items-center px-8 pt-2 pb-8 gap-3"
        method = "POST"
      >
        <div className='w-full h-[500px]  flex flex-col '>
            <Panel_general  FunctionfilterData = { FilterOMs } >
                {
                    OMSFiltradas ? (
                        OMSFiltradas.map((data) => (
                            <div
                            id={data.taqom}
                            key={data.taqom}
                            onClick={() => {
                                setTaqOM(data.taqom)
                            }}
                                className={`w-full h-auto px-4 py-2 cursor-pointer translate duration-700 ease-in-out ${
                                   TaqOM === data.taqom
                                    ? 'bg-gray-800 text-white border border-black hover:border-white'
                                    : 'hover:bg-gray-800 hover:text-white border border-black hover:border-white'
                                }`}
                            >
                            {data.taqom}
                        </div>
                        ))
                    ) : null
                }
            </Panel_general>
        </div>
        <input type="submit" value = "Asignar a OM" className="w-full h-auto px-4 py-2 border border-green-500 hover:border-white bg-green-500 hover:bg-green-800 text-white  font-bold  rounded-sm cursor-pointer transition duration-700 ease-in-out" />
    </form>
  )
}

export default FormAddOM;
