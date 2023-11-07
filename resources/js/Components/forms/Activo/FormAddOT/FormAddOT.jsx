

import React, { useEffect, useState } from 'react'
import { useFormik } from "formik";
import { initialValue, validationSchema } from './FormAddOT.form';
import { useForm } from '@inertiajs/react'
import SearchInput from '@/Components/UI/Search';
import Panel_general from '@/Components/UI/Panel_general';

const FormAddOT = ({ taqActivos, onClose, oms }) =>  {

  const { data, post } = useForm()
  const [TaqOT, setTaqOT] = useState()

  const formik = useFormik({
    initialValues:initialValue(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      data.taqActivos  = taqActivos,
      data.taqot       =taqom,
      data.from       = 'activos'
      post('/asignacion/ot')
      onClose()
    }
  })

  const [OTSFiltradas, setOTSFiltradas] = useState(OTs);
  const FilterOTs = ( searchTerm ) => {
    const filtered  = oms.filter((data) => {
        consttaqom          = data.taqot.toLowerCase();
        const taqempresa     = data.taqempresa.toLowerCase();
        const fechainicio    = data.fechainicio.toLowerCase();
        const horainicio     = data.horainicio.toLowerCase();
        const fechafin       = data.fechafin ? data.fechafin.toLowerCase() : '';
        const horafin        = data.horafin ? data.horafin.toLowerCase() : '';
        const tipo           = data.tipo.toLowerCase();
        const clasot         = data.tipo.toLowerCase();
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
    setOTSFiltradas(filtered);
};
 
   return (
    <form 
        onSubmit = { formik.handleSubmit }
        className = "w-auto sm:w-[400px] md:w-[800px] h-full flex flex-col justify-center items-start justify-items-center px-8 pt-2 pb-8 gap-3"
        method = "POST"
      >
        <div className='w-full h-[500px]  flex flex-col '>
            <Panel_general  FunctionfilterData = { FilterOTs } >
                {
                    omsFiltradas ? (
                        omsFiltradas.map((data) => (
                            <div
                            id={data.taqot}
                            key={data.taqot}
                            onClick={() => {
                                setTaqOT(data.taqot)
                            }}
                                className={`w-full h-auto px-4 py-2 cursor-pointer translate duration-700 ease-in-out ${
                                   taqom === data.taqot
                                    ? 'bg-gray-800 text-white border border-black hover:border-white'
                                    : 'hover:bg-gray-800 hover:text-white border border-black hover:border-white'
                                }`}
                            >
                            {data.taqot}
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

export default FormAddOT;
