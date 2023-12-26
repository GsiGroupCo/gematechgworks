import React, { useEffect, useState } from 'react' 
import SearchInput from './Search';  
import CardGeneral from './CartaGeneral';
import Elemento_general from './ElementoGeneral';
import { Link } from '@inertiajs/react';

export default function PanelSection({ Values, ShowModal }) {
  
    console.log(Values)

    useEffect(() => {
        setData(Values.Data)
    }, [Values.Data])
    
    const [Data, setData] = useState(Values.Data);  

    const Filter = ( searchTerm ) => {
      const filtered = Values.Data.filter((data) => { 

        const searchFields = Object.keys(data).map(key => {
            const value = data[key];
            return typeof value === 'string' ? value.toLowerCase() : '';
        });
      
        return searchFields.some(field => field.includes(searchTerm));
      });
      setData(filtered);
    };

    return (
        <>
            { 
                Values.State ? (
                    <div className='w-full h-full flex flex-col justify-start items-center justify-items-center gap-2 p-4 overflow-y-auto'> 
                        <div className='w-full h-auto flex flex-col sm:flex-row justify-center items-center gap-3 px-2 py-1'>
                            <SearchInput SearchFunction = { Filter } />
                            {
                                Values.add ? (
                                    <div onClick = { ShowModal } className='w-full sm:w-auto h-auto text-center flex justify-center items-center px-2 py-1 border border-black hover:border-white rounded-md text-sm bg-green-500 hover:bg-green-800 text-white cursor-pointer duration-700 ease-in-out'>
                                        Agregar Nuevo  { Values.Tittle }
                                    </div>
                                ) : null
                            }
                            {
                                Values.ExcelAction ? (
                                    <a href={Values.ExcelAction} className='w-full sm:w-auto h-auto text-center flex justify-center items-center px-2 py-1 border border-black hover:border-white rounded-md text-sm bg-green-500 hover:bg-green-800 text-white cursor-pointer duration-700 ease-in-out'>
                                        Descargar Listado { Values.Tittle }
                                    </a>
                                ) : null
                            }
                        </div>
                        <div className={`w-full h-full ${ Values.Tittle === 'Activo' || Values.Tittle === 'Componente' || Values.Tittle === 'Empresa' || Values.Tittle === 'Responsable' || Values.Tittle === 'Rig'  ? 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6' : 'flex flex-col justify-start items-center gap-2 py-1 px-4 ' } overflow-hidden overflow-y-auto`}>
                            {
                                Data ? (
                                    Data.map(( values ) => (
                                        Values.Tittle === 'Categorias Activo' ? (
                                            <Elemento_general key = { values.id_tipo } link = {`categorias/activo/${values.id_tipo}`} >
                                                <div className='w-full flex justify-between'>
                                                    <div>
                                                        {values.nombre}
                                                    </div>
                                                    <div>
                                                        Activos: { values.activos != null ? values.activos.length : 0}
                                                    </div>
                                                </div>
                                            </Elemento_general>
                                        ) : Values.Tittle === 'Actividades' ? (
                                            <div key = { values.taactividad_id } className='w-full h-auto flex justify-between items-center border border-black cursor-pointer  hover:bg-gray-800 hover:text-white px-4 py-2'>
                                                <span className='w-1/4 h-full flex justify-center items-center'>
                                                    { values.nombre }
                                                </span>
                                                <span className='w-1/4 h-full flex justify-center items-center'>
                                                    { values.frecuencia }
                                                </span>
                                                <span className='w-1/4 h-full flex justify-center items-center'>
                                                    { values.tipofrecuencia }
                                                </span>
                                                <div className='w-1/4 h-full  flex justify-end items-center gap-1'>
                                                    <span onClick = { () => Edit(values.taqManto) } className='w-auto h-[50px] px-4 py-2 rounded-md  shadow-sm flex border border-black hover:border-white shadow-blackflex justify-center items-center bg-yellow-500 hover:bg-yellow-800 transition duration-700 ease-in-out text-black hover:text-white font-semibold'>
                                                    Editar  
                                                    </span>
                                                    <span onClick = { () => Delete(values.taqManto) } className='w-auto h-[50px] px-4 py-2 rounded-md  shadow-sm flex border border-black hover:border-white shadow-blackflex justify-center items-center bg-red-500 hover:bg-red-800 transition duration-700 ease-in-out text-black hover:text-white font-semibold'>
                                                    Eliminar
                                                    </span>
                                                </div>
                                            </div>
                                        ) : Values.Tittle === 'Categorias Componente' ? (
                                            <Elemento_general key={values.id_tipo} link = {`/categorias/componente/${values.id_tipo}`} >
                                                <div className='w-full flex justify-between'>
                                                    <div>
                                                        {values.nombre}
                                                    </div>
                                                    <div>
                                                        Componentes: { values ? values.componentes ? values.componentes.length : '0' : '0' }
                                                    </div>
                                                </div>
                                            </Elemento_general>
                                        ) : Values.Tittle === 'Activo' ? (
                                            <CardGeneral
                                                link = {`https://gworks.gematech.co/storage/Activos/${values.taqActivos}/${values.urlImage}`}
                                                nombre={`${values.serial} ${values.nombre} `}
                                                route={`/activo/${values.taqActivos}`}
                                                key={values.taqActivos}
                                            />
                                        ) : Values.Tittle === 'Componente' ? (
                                            <CardGeneral
                                                link = {`https://gworks.gematech.co/storage/Componentes/${values.taqComponente}/${values.urlImage}`}
                                                nombre={`${values.nombre} - SERIAL: ${values.serial}`}
                                                route={`/componente/${values.taqComponente}`}
                                                key={values.taqComponente}
                                            />
                                        ) : Values.Tittle === 'Rig' ? (
                                            <CardGeneral
                                                link = {`https://gworks.gematech.co/storage/Activos/${values.taqActivos}/${values.urlImage}`}
                                                nombre={`${values.nombre} - SERIAL: ${values.serial}`}
                                                route={`/activo/${values.taqActivos}`}
                                                key={values.taqActivos}
                                            />
                                        ) : Values.Tittle === 'Responsable' ? (
                                            <CardGeneral
                                                link   = {`https://gworks.gematech.co/storage/${values.Image}`}
                                                nombre = {`${values.nombre}`}
                                                route  = {`/responsables/${values.taqresponsable}`}
                                                key    = {values.taqresponsable}
                                            />
                                        ) : Values.Tittle === 'Mantenimiento' ? (
                                            <Link href={`/mantenimiento/show/${values.taqManto}`} className='w-full h-auto flex justify-between items-center bg-white border border-black px-4 py-2 cursor-pointer hover:bg-gray-800 hover:text-white transition duration-700 ease-in-out'>
                                                <div className='w-full flex justify-between items-center'>
                                                    <div className='w-[80%] flex flex-col gap-3'>
                                                        <span className='text-red-500 font-semibold'> { values.Nombre } </span>
                                                        <span> { values.descripcion } </span>
                                                    </div>
                                                    <div className='w-[20%]'>
                                                        {values.tipe} 
                                                    </div>
                                                </div>
                                            </Link>
                                        ) : Values.Tittle === 'Om' ? (
                                            <Link href={`/oms/${values.taqom}`} className='w-full h-auto flex  justify-between items-center bg-white border border-black px-4 py-2 cursor-pointer hover:bg-gray-800 hover:text-white transition duration-700 ease-in-out'>
                                                <div className='w-full flex flex-col sm:flex-row  justify-between sm:items-center items-start'>
                                                    <div className='w-full sm:w-[80%] flex flex-col gap-3'>
                                                        <span className={`${values.estado === 'EN PROCESO' ? 'text-red-500' : 'text-green-500' } font-semibold`}> { values.taqom } </span>
                                                        <span> { values.descripcion } </span>
                                                    </div>
                                                    <div className='w-full sm:w-[20%]'>
                                                        {values.responsable.nombre}
                                                    </div>
                                                </div>
                                            </Link>
                                        ) : Values.Tittle === 'Documento' || Values.Tittle === 'Documentos' ? (
                                            <div key = { values.taqDoc }  className='w-full h-auto flex flex-col sm:flex-row gap-3 justify-between items-center border bg-white border-black px-4 py-2 cursor-pointer hover:bg-gray-800 hover:text-white transition duration-700 ease-in-out'>
                                                <span className='w-[90%] '> { values.nombre } </span>
                                                <div className='w-full sm:w-auto h-full flex flex-col sm:flex-row justify-center items-center gap-2'>
                                                    <div className='w-full sm:w-auto max-h-[40px] h-full px-4 py-2 bg-green-600 hover:bg-green-800 text-white cursor-pointer border hover:border-white '>
                                                        Ver
                                                    </div>
                                                    <div className='w-full sm:w-auto max-h-[40px] h-full px-4 py-2 bg-red-600 hover:bg-red-800 text-white cursor-pointer border hover:border-white '>
                                                        Eliminar
                                                    </div>
                                                </div>
                                            </div>
                                        ) :  null     
                                    ))
                                ) : null
                            } 
                        </div> 
                    </div>
                ) : null 
            }
        </> 
    )
}
