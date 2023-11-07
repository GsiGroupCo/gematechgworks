import CardGeneral from '@/Components/UI/Card_general'
import CategoriaAppbar from '@/Components/UI/Categorias/Appbar'
import React, { useEffect } from 'react'
import { Toaster, toast } from 'sonner'

export default function TipoActivo({ TiposActivo, error, status }) {
  
  useEffect(() => {
    if(status){
      toast.success(status)
    }
  }, [status]);

  useEffect(() => {
    if(error){
      toast.error(error)
    }
  }, [error]);

  return (
    <main className='w-full h-screen flex flex-col '>
        <CategoriaAppbar cantidad = { TiposActivo[0].activos.length } tittle = {`Activos`} nombre = { TiposActivo[0].nombre } />
        <div className='w-full h-[95%] grid  grid-cols-1 sm:grid-cols-2  lg:grid-cols-3 xl:grid-cols-4 gap-4'>
            {
                TiposActivo ? (
                    TiposActivo[0].activos.map((data) => (
                        (
                            data.urlImage != 'default-image.jpg' ? (
                                <CardGeneral
                                    link = {`https://gematech.co/storage/Activos/${data.taqActivos}/${data.urlImage}`}
                                    nombre={` ACTIVO: ${data.nombre} - SERIAL: ${data.serial}`}
                                    route={`/activo/${data.taqActivos}`}
                                    key={data.taqActivos}
                                />
                            ) : (
                                <CardGeneral
                                    link = {`https://gematech.co/storage/${data.urlImage}`}
                                    nombre={` ACTIVO: ${data.nombre} - SERIAL: ${data.serial}`}
                                    route={`/activo/${data.taqActivos}`}
                                    key={data.taqActivos}
                                />
                            )
                        )
                    ))
                ) : null
            }
        </div>
        <Toaster richColors position='top-center' />
    </main>
  )
} 