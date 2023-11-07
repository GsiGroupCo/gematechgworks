
import React, { ChangeEvent, FC, useState } from 'react'
import { Toaster, toast } from 'sonner' 
import { useFormik } from "formik";
import { initialValue, validationSchema } from './FormAddOm.form';
import { useForm } from '@inertiajs/react'

const AddOt  = ({ onClose, Responsables, Empresa }) =>  {

  const { data, post } = useForm()
  
  const formik = useFormik({
    initialValues:initialValue(Empresa),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => { 
      data.taqot               = formValue.taqot
      data.taqempresa          = formValue.Empresa
      data.taqresponsable      = formValue.Responsable
      data.descripcion         = formValue.Descripcion
      data.tipo                = formValue.Tipo
      data.clasot              = formValue.Clasificacion
      data.prioridad           = formValue.Prioridad
      data.mecanica            = formValue.mecanica
      data.instrumentacion     = formValue.instrumentacion
      data.metalmecanica       = formValue.metalmecanica
      data.electrico           = formValue.electrico
      data.pintura             = formValue.pintura
      data.equipopesado        = formValue.equipopesado
      data.ensayonodestructivo = formValue.ensayonodestructivo
      data.soldadura           = formValue.soldadura
      data.alquiler            = formValue.alquiler
      data.fabricacion         = formValue.fabricacion
      post('/oms/empresa/store')
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
          Asignando Nueva OT
        </h3>
        <div className='w-full flex justify-center items-center gap-3'>
          <div className='w-full flex justify-center items-center gap-3'>
            <div className='w-full h-full flex flex-col justify-center items-center justify-items-center '>
              <div className='w-full h-auto flex gap-2 justify-start items-center'>
                <label htmlFor="taqot" className='font-bold text-black'>
                  OT
                </label> 
                <span className='text-red-500 font-bold text-2xl'>
                  *
                </span>
              </div>
              <input type='text' placeholder='OT23050' id="taqot" name="taqot"  value = { formik.values.taqot } onChange = { formik.handleChange} className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm "/>
              {
                formik.touched.taqot && formik.errors.taqot && (
                  <div className="text-red-500 font-bold">{formik.errors.taqot}</div>
                )
              }
          </div>
        </div>
        </div>
        <div className='w-full flex justify-center items-center gap-3'>
            <div className='w-1/2 h-full flex flex-col justify-center items-center justify-items-center '>
              <div className='w-full h-auto flex gap-2 justify-start items-center'>
                <label htmlFor="Clasificacion" className='font-bold text-black'>
                  Clasificacion
                </label> 
                <span className='text-red-500 font-bold text-2xl'>
                  *
                </span>
              </div>
              <select id="Clasificacion" name="Clasificacion"  value = { formik.values.Clasificacion } onChange = { formik.handleChange} className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ">
                <option value = "" disabled>
                    POR FAVOR SELECCIONA UNA OPCION
                </option>
                <option>
                  CLIENTES (OT)
                </option>
                <option>
                  GSI (OIT)
                </option>
                <option>
                  GSITECH (OITT)
                </option>
              </select>
              {
                formik.touched.Clasificacion && formik.errors.Clasificacion && (
                  <div className="text-red-500 font-bold">{formik.errors.Clasificacion}</div>
                )
              }
          </div>
          <div className='w-1/2 h-full flex flex-col justify-center items-center justify-items-center '>
            <div className='w-full h-auto flex gap-2 justify-start items-center'>
              <label htmlFor="Responsable" className='font-bold text-black'>
                Responsable
              </label> 
              <span className='text-red-500 font-bold text-2xl'>
                *
              </span>
            </div>
            <select id="Responsable" name="Responsable"  value = { formik.values.Responsable } onChange = { formik.handleChange} className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ">
              <option value = "" disabled>
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
          <label className='w-auto cursor-pointer flex justify-start items-center gap-2  hover:border-black  rounded-md px-4 py-2 hover:bg-[#385449] border border-gray-300 hover:text-white text-sm font-bold transition duration-700 ease-in-out'>
            <input  
              type="checkbox"
              name={"MEC"}
              value={formik.values.mecanica}
              onChange={formik.handleChange}
              className='rounded-full'
            />
            MECÁNICA
          </label>
          <label className='w-auto cursor-pointer flex justify-start items-center gap-2  hover:border-black  rounded-md px-4 py-2 hover:bg-[#385449] border border-gray-300 hover:text-white text-sm font-bold transition duration-700 ease-in-out'>
            <input  
              type="checkbox"
              name="INST"
              value={formik.values.instrumentacion}
              onChange={formik.handleChange}
              className='rounded-full'
            />
            INSTRUMENTACION
          </label>
          <label className='w-auto cursor-pointer flex justify-start items-center gap-2  hover:border-black  rounded-md px-4 py-2 hover:bg-[#385449] border border-gray-300 hover:text-white text-sm font-bold transition duration-700 ease-in-out'>
            <input  
              type="checkbox"
              name={"METALMEC"}
              value={formik.values.metalmecanica}
              onChange={formik.handleChange}
              className='rounded-full'
            />
            METALMECANICA
          </label>
          <label className='w-auto cursor-pointer flex justify-start items-center gap-2  hover:border-black  rounded-md px-4 py-2 hover:bg-[#385449] border border-gray-300 hover:text-white text-sm font-bold transition duration-700 ease-in-out'>
            <input  
              type="checkbox"
              name={"ELECT"}
              value={formik.values.electrico}
              onChange={formik.handleChange}
              className='rounded-full'
            />
            ELÉCTRICO
          </label>
          <label className='w-auto cursor-pointer flex justify-start items-center gap-2  hover:border-black  rounded-md px-4 py-2 hover:bg-[#385449] border border-gray-300 hover:text-white text-sm font-bold transition duration-700 ease-in-out'>
            <input  
              type="checkbox"
              name={"PINT"}
              value={formik.values.pintura}
              onChange={formik.handleChange}
              className='rounded-full'
            />
            PINTURA
          </label>
          <label className='w-auto cursor-pointer flex justify-start items-center gap-2  hover:border-black  rounded-md px-4 py-2 hover:bg-[#385449] border border-gray-300 hover:text-white text-sm font-bold transition duration-700 ease-in-out'>
            <input  
              type="checkbox"
              name={"FAB"}
              value={formik.values.fabricacion}
              onChange={formik.handleChange}
              className='rounded-full'
            />
            FABRICACION
          </label>
          <label className='w-auto cursor-pointer flex justify-start items-center gap-2  hover:border-black  rounded-md px-4 py-2 hover:bg-[#385449] border border-gray-300 hover:text-white text-sm font-bold transition duration-700 ease-in-out'>
            <input  
              type="checkbox"
              name={"EPES"}
              value={formik.values.equipopesado}
              onChange={formik.handleChange}
              className='rounded-full'
            />
            EQUIPO PESADO
          </label>
          <label className='w-auto cursor-pointer flex justify-start items-center gap-2  hover:border-black  rounded-md px-4 py-2 hover:bg-[#385449] border border-gray-300 hover:text-white text-sm font-bold transition duration-700 ease-in-out'>
            <input  
              type="checkbox"
              name={"ENNODES"}
              value={formik.values.ensayonodestructivo}
              onChange={formik.handleChange}
              className='rounded-full'
            />
            ENSAYO NO DESTRUTIVO
          </label>
          <label className='w-auto cursor-pointer flex justify-start items-center gap-2  hover:border-black  rounded-md px-4 py-2 hover:bg-[#385449] border border-gray-300 hover:text-white text-sm font-bold transition duration-700 ease-in-out'>
            <input  
              type="checkbox"
              name={"SOLD"}
              value={formik.values.soldadura}
              onChange={formik.handleChange}
              className='rounded-full'
            />
            SOLDADURA
          </label>
          <label className='w-auto cursor-pointer flex justify-start items-center gap-2  hover:border-black  rounded-md px-4 py-2 hover:bg-[#385449] border border-gray-300 hover:text-white text-sm font-bold transition duration-700 ease-in-out'>
            <input  
              type="checkbox"
              name={"ALQ"}
              value={formik.values.alquiler}
              onChange={formik.handleChange}
              className='rounded-full'
            />
            ALQUILER
          </label>
        </div>
        <input type="submit" value = "Agregar Orden de Trabajo" className="w-full h-auto px-4 py-2 border border-green-500 hover:border-white bg-green-500 hover:bg-green-800 text-white  font-bold  rounded-sm cursor-pointer transition duration-700 ease-in-out" />
        <Toaster richColors position="top-center"/>
    </form>
  )
}

export default AddOt;
