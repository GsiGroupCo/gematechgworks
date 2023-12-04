import { useFormik } from "formik";
import { initialValue, validationSchema } from './FormEditOM.form';
import { useForm } from '@inertiajs/react'
import React, { useState, useEffect } from 'react';

const Areas = [{
  "id"     : "101168387",
  "value"  : "MEC",
  "name"   : "MECÁNICA"
},{
  "id"     : "63153517",
  "value"  : "INST",
  "name"   : "INSTRUMENTACION"
}
,{
  "id"     : "2100069",
  "value"  : "METALMEC",
  "name"   : "METALMECANICA"
},
{
  "id"     : "12107538",
  "value"  : "ELECT",
  "name"   : "ELÉCTRICO"
}
,{
  "id"     : "10697233",
  "value"  : "PINT",
  "name"   : "PINTURA"
},{
  "id"     : "2479312",
  "value"  : "EPES",
  "name"   : "EQUIPO PESADO"
},
{
  "id"     : "12182420",
  "value"  : "ENNODES",
  "name"   : "ENSAYO NO DESTRUCTIVO"
},
{
  "id"     : "10524744",
  "value"  : "SOLD",
  "name"   : "SOLDADURA"
},
{
  "id"     : "5632941",
  "value"  : "ALQ",
  "name"   : "ALQUILER"
},
{
  "id"     : "9353789",
  "value"  : "FAB",
  "name"   : "FABRICACION"
}]

const checkboxValues = {
};

const EditOt  = ({ onClose, Responsables, Empresa, Ot }) =>  {

  const [checkboxValues, setCheckboxValues] = useState({});

  useEffect(() => {
    // Inicializar los valores de los checkboxes
    const initialCheckboxValues = {};
    Areas.forEach((area) => {
      const isInOt = Ot.data[0].areas.some(
        (otArea) => otArea.taqarea === area.value
      );
      initialCheckboxValues[area.value] = isInOt;
    });
    setCheckboxValues(initialCheckboxValues);
  }, [Ot]);

  
  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setCheckboxValues({ ...checkboxValues, [name]: checked });
  };

  const { data, post } = useForm()
  
  const formik = useFormik({
    initialValues:initialValue(Ot),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      data.taqot               = formValue.Ot
      data.taqempresa          = formValue.Empresa
      data.taqresponsable      = formValue.Responsable
      data.descripcion         = formValue.Descripcion
      data.tipo                = formValue.Tipo
      data.clasot              = formValue.Clasificacion
      data.prioridad           = formValue.Prioridad
      for (const key in checkboxValues) {
        data[key] = checkboxValues[key];
      }
      post('/oms/update')
      onClose()
    }
  })

  
  
  return (
    <form 
        onSubmit = { formik.handleSubmit }
        className = "w-[500px] md:w-[750px] h-full flex flex-col justify-center items-start justify-items-center px-8 pt-2 pb-8 gap-3"
        method = "POST"
      >
        <h3 className='font-bold'>
          Editando OT
        </h3> 
        <div className='w-full h-auto flex justify-center items-center gap-3'>
          <div className='w-1/2'>
            <div className='w-full h-auto flex gap-2 justify-start items-center'>
              <label htmlFor="Ot" className='font-bold text-black'>
                OT
              </label> 
              <span className='text-red-500 font-bold text-2xl'>
                *
              </span>
            </div> 
            <input 
              type="text" 
              name="Ot"
              disabled
              id="Ot"
              value={formik.values.Ot}
              onChange={formik.handleChange}
              placeholder='23001'
              className = {`w-full h-auto  px-4 py-2 rounded-md focus:outline-none border border-gray-500 bg-gray-500 text-white cursor-not-allowed ${ formik.touched.Ot && formik.errors.Ot ? 'border-red-500' : 'border-black' }`}
            />
            {
              formik.touched.Ot && formik.errors.Ot && (
                <div className="text-red-500 font-bold">{formik.errors.Ot}</div>
              )
            }
          </div>
          <div className="w-1/2"> 
            <div className='w-full h-auto flex gap-2 justify-start items-center'>
              <label htmlFor="Clasificacion" className='font-bold text-black'>
                Clasificacion
              </label> 
              <span className='text-red-500 font-bold text-2xl'>
                *
              </span>
            </div>
            <select disabled id="Clasificacion" name="Clasificacion"  value = { formik.values.Clasificacion } onChange = { formik.handleChange} className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ">
              <option value = "" disabled>
                  POR FAVOR SELECCIONA UNA OPCION
              </option>
              <option value="GSI (OIT)">GSI (OIT)</option>
              <option value="CLIENTES (OT)">CLIENTES (OT)</option>
              <option value="GSITECH (OITT)">GSITECH (OITT)</option>
            </select>
            {
              formik.touched.Clasificacion && formik.errors.Clasificacion && (
                <div className="text-red-500 font-bold">{formik.errors.Clasificacion}</div>
              )
            }
          </div>
        </div>
        <div className='w-full h-auto flex justify-center items-center gap-3'>
          <div className='w-1/2'>
            <div className='w-full h-auto flex gap-2 justify-start items-center'>
              <label htmlFor="Empresa" className='font-bold text-black'>
                Empresa
              </label> 
              <span className='text-red-500 font-bold text-2xl'>
                *
              </span>
            </div>
            {
              formik.values.Clasificacion === 'GSI (OIT)' ? (
                <select disabled id="Empresa" name="Empresa"  value = { formik.values.Empresa } onChange = { formik.handleChange} className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ">
                  <option value = "GSI">
                      GSI GROUP
                  </option> 
                </select>
              ) : (
                <select  id="Empresa" name="Empresa"  value = { formik.values.Empresa } onChange = { formik.handleChange} className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ">
                  <option value = "" disabled>
                      POR FAVOR SELECCIONA UNA OPCION
                  </option>
                  {
                    Empresa ? (
                        Empresa.map((data) => (
                        <option 
                          key = { data.taqempresa } 
                          value = { data.taqempresa }
                        >
                            { data.nombre } 
                        </option>
                        ))
                    ) : null
                  }
                </select>
              )
            }
            {
              formik.touched.Empresa && formik.errors.Empresa && (
                <div className="text-red-500 font-bold">{formik.errors.Empresa}</div>
              )
            }  
          </div>
          <div className="w-1/2"> 
            <div className='w-full h-auto flex gap-2 justify-start items-center'>
              <label htmlFor="Responsable" className='font-bold text-black'>
                Responsable
              </label> 
              <span className='text-red-500 font-bold text-2xl'>
                *
              </span>
            </div>
            <select id="Responsable" name="Responsable"  value = { formik.values.Responsable } onChange = { formik.handleChange} className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ">
              <option value="" disabled>
                  POR FAVOR SELECCIONA UNA OPCION
              </option>
              {
                Responsables ? (
                    Responsables.map((data) => (
                    <option 
                      key = { data.taqresponsable } 
                      value = { data.taqresponsable }
                    >
                        { data.primernombre } { data.segundonombre } { data.primerapellido } { data.segundoapellido } 
                    </option>
                    ))
                ) : null
              }
            </select>
            {
              formik.touched.Responsable && formik.errors.Responsable && (
                <div className="text-red-500 font-bold">{formik.errors.Responsable}</div>
              )
            }
          </div>
        </div>
        <div className='w-full h-auto flex flex-col justify-center items-start justify-items-center gap-2'>
          <div className='w-full h-auto flex gap-2 justify-start items-center'>
            <label htmlFor="Descripcion" className='font-bold text-black'>
              Descripcion
            </label> 
            <span className='text-red-500 font-bold text-2xl'>
              *
            </span>
          </div>  
          <textarea 
            name="Descripcion"
            id="Descripcion"
            value={formik.values.Descripcion}
            onChange={formik.handleChange}
            className = {`w-full h-auto  px-4 py-2 rounded-md focus:outline-none border border-gray-300 ${ formik.touched.Descripcion && formik.errors.Descripcion ? 'border-red-500' : 'border-black' }`}
            placeholder="Escribe aquí"
          ></textarea>
          {
            formik.touched.Descripcion && formik.errors.Descripcion && (
              <div className="text-red-500 font-bold">{formik.errors.Descripcion}</div>
            )
          }
        </div>
        <div className='w-full h-auto flex justify-center items-center gap-3'>
          <div className='w-1/2'>
            <div className='w-full h-auto flex gap-2 justify-start items-center'>
              <label htmlFor="Tipo" className='font-bold text-black'>
                Tipo
              </label> 
              <span className='text-red-500 font-bold text-2xl'>
                *
              </span>
            </div>
            <select id="Tipo" name="Tipo"  value = { formik.values.Tipo } onChange = { formik.handleChange} className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ">
              <option value = "" disabled>
                  POR FAVOR SELECCIONA UNA OPCION
              </option>
              <option>
                MTTO PREVENTIVO
              </option>
              <option>
                MTTO CORRECTIVO
              </option>
              <option>
                MTTO DISEÑO O MEJORA
              </option>
              <option>
                SERVICIO
              </option>
              <option>
                FABRICACION
              </option>
            </select>
            {
              formik.touched.Tipo && formik.errors.Tipo && (
                <div className="text-red-500 font-bold">{formik.errors.Tipo}</div>
              )
            }  
          </div>
          <div className='w-1/2 h-auto flex flex-col justify-center items-start justify-items-center '>
            <div className='w-full h-auto flex gap-2 justify-start items-center'>
              <label htmlFor="Prioridad" className='font-bold text-black'>
                Prioridad
              </label> 
              <span className='text-red-500 font-bold text-2xl'>
                *
              </span>
            </div>
            <select id="Prioridad" name="Prioridad"  value = { formik.values.Prioridad } onChange = { formik.handleChange} className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ">
              <option value = "" disabled>
                  POR FAVOR SELECCIONA UNA OPCION
              </option>
              <option>
                PRIORIDAD URGENTE
              </option>
              <option>
                PRIORIDAD ORDINARIA
              </option>
            </select>
            {
              formik.touched.Prioridad && formik.errors.Prioridad && (
                <div className="text-red-500 font-bold">{formik.errors.Prioridad}</div>
              )
            }
          </div>
        </div>
        <div className='w-full h-auto grid grid-cols-3 gap-4 '>
          {
            Areas.map((area) => (
            <label
              key={area.id}
              className="w-auto cursor-pointer flex justify-start items-center gap-2 hover:border-black rounded-md px-4 py-2 hover:bg-[#385449] border border-gray-300 hover:text-white text-sm font-bold transition duration-700 ease-in-out"
            >
              <input
                type="checkbox"
                name={area.value}
                checked={checkboxValues[area.value] || false}
                onChange={handleCheckboxChange}
                className="rounded-full"
              />
              {area.name}
            </label>
          ))}
        </div>
        <input type="submit" value = "Editar Orden de Trabajo" className="w-full h-auto px-4 py-2 border border-green-500 hover:border-white bg-green-500 hover:bg-green-800 text-white  font-bold  rounded-sm cursor-pointer transition duration-700 ease-in-out" />
    </form>
  )
}

export default EditOt;
