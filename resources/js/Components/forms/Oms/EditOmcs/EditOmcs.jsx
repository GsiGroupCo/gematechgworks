import { useFormik } from "formik";
import { initialValue, validationSchema } from './EditOmcs.form';
import { useForm } from '@inertiajs/react'
import { useState } from "react"; 

const CreateOmc  = ({ onClose, Responsables, Componentes, Tipe, Mantenimientos, Omc }) =>  {
 
  const { data, post } = useForm() 
  const [filtro, setFiltro] = useState("");
  const [FiltroMtto, setFiltroMtto] = useState("");
  const [filtroActivos, setFiltroActivos] = useState(""); 
  const [CategoriaIdSeleccionada, setCategoriaIdSeleccionada] = useState("");

  const formik = useFormik({
    initialValues:initialValue(Omc),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      data.taqom             = Omc.taqom
      data.taqComponente     = formValue.taqComponente      
      data.taqMantenimiento  = formValue.taqMantenimiento
      data.taqresponsable    = formValue.Responsable
      data.descripcion       = formValue.Descripcion
      data.tipo              = formValue.Tipo
      data.prioridad         = formValue.Prioridad 
      post('/omcs/update');
      onClose();
    }
  })
 
  return (
    <form 
      onSubmit = { formik.handleSubmit }
      className = "w-[500px] md:w-[750px] h-full flex flex-col justify-center items-start justify-items-center px-8 pt-2 pb-8 gap-3"
      method = "POST"
    >
      <h3 className='font-bold'>
        Asignando Nueva OM
      </h3> 
      <div className='w-full h-auto flex-col justify-center items-center gap-3'>
        <div className='w-full h-auto flex gap-2 justify-start items-center'>
          <label htmlFor="Responsable" className='font-bold text-black'>
            Responsable
          </label> 
          <span className='text-red-500 font-bold text-2xl'>
            *
          </span>
        </div>            
        <input 
            type="text" 
            value={filtro} 
            onChange={(e) => setFiltro(e.target.value)} 
            placeholder="Filtrar por nombre..."
            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
        <select id="Responsable" name="Responsable"  value = { formik.values.Responsable } onChange = { formik.handleChange} className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ">
          <option value = "" disabled>
              POR FAVOR SELECCIONA UNA OPCION
          </option>
          {
            Responsables ? (
              Responsables.filter(data => data.nombre.includes(filtro)).map((data) => (
                <option 
                  key = { data.taqresponsable } 
                  value = { data.taqresponsable }
                >
                  { data.nombre } 
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
      <div className="w-full flex justify-center items-center gap-3 ">
        <div className='w-1/2 h-auto flex-col justify-center items-center gap-3'>
          <div className='w-full h-auto flex gap-2 justify-start items-center'>
            <label htmlFor="taqComponente" className='font-bold text-black'>
              Componente
            </label> 
            <span className='text-red-500 font-bold text-2xl'>
              *
            </span>
          </div>            
          <input 
              type="text" 
              value={filtroActivos} 
              onChange={(e) => setFiltroActivos(e.target.value)} 
              placeholder="Filtrar por nombre..."
              className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
          <select 
            id="taqComponente" 
            name="taqComponente"  
            value = { formik.values.taqComponente } 
            onChange={(e) => {
              formik.handleChange(e);
              const categoriaId = Activos.find(
                (data) => data.taqComponente === e.target.value
              )?.categoria_id;
              setCategoriaIdSeleccionada(categoriaId || "");
            }}
            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ">
            <option value = "" disabled>
                POR FAVOR SELECCIONA UNA OPCION
            </option>
            {
              Componentes ? (
                Componentes.filter(data => data.nombre.includes(filtroActivos)).map((data) => (
                  <option 
                    key = { data.taqComponente } 
                    value = { data.taqComponente }
                  >
                    { data.nombre } 
                  </option>
                  ))
              ) : null
            }
          </select>
          {
            formik.touched.taqComponente && formik.errors.taqComponente && (
              <div className="text-red-500 font-bold">{formik.errors.taqComponente}</div>
            )
          }
        </div>
        <div className='w-1/2 h-auto flex-col justify-center items-center gap-3'>
          <div className='w-full h-auto flex gap-2 justify-start items-center'>
            <label htmlFor="taqMantenimiento" className='font-bold text-black'>
              Mantenimiento
            </label> 
            <span className='text-red-500 font-bold text-2xl'>
              *
            </span>
          </div>            
          <input 
              type="text" 
              value={FiltroMtto} 
              onChange={(e) => setFiltroMtto(e.target.value)} 
              placeholder="Filtrar por nombre..."
              className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
          <select id="taqMantenimiento" name="taqMantenimiento"  value = { formik.values.taqMantenimiento } onChange = { formik.handleChange} className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ">
            <option value = "" disabled>
                POR FAVOR SELECCIONA UNA OPCION
            </option>
            {
              Mantenimientos ? (
                Mantenimientos.filter(data => data.categoria_id.includes(CategoriaIdSeleccionada)).map((data) => (
                  <option 
                    key = { data.taqMantenimiento } 
                    value = { data.taqMantenimiento }
                  >
                    { data.Nombre } 
                  </option>
                  ))
              ) : null
            }
          </select>
          {
            formik.touched.taqMantenimiento && formik.errors.taqMantenimiento && (
              <div className="text-red-500 font-bold">{formik.errors.taqMantenimiento}</div>
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
          onChange={(e) => {
              formik.handleChange(e);
              formik.setFieldValue('Descripcion', e.target.value.toUpperCase());
          }}
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
        {
          Tipe === 'Ninguna' ? (
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
              </select>
              {
                formik.touched.Tipo && formik.errors.Tipo && (
                  <div className="text-red-500 font-bold">{formik.errors.Tipo}</div>
                )
              }  
            </div>
          ) : null
        }
        <div className={` ${Tipe === 'Ninguna' ? 'w-1/2' : 'w-full' } h-auto flex flex-col justify-center items-start justify-items-center `}>
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
        
      <input type="submit" value = "Agregar Orden de Mantenimiento" className="w-full h-auto px-4 py-2 border border-green-500 hover:border-white bg-green-500 hover:bg-green-800 text-white  font-bold  rounded-sm cursor-pointer transition duration-700 ease-in-out" />
  </form>
  )
}

export default CreateOmc;
