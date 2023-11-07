import CardGeneral from '@/Components/UI/Card_general'
import CategoriaAppbar from '@/Components/UI/Categorias/Appbar'
import React, { useEffect } from 'react'
import { Toaster, toast } from 'sonner';

export default function TipoComponente({ Categoria, status, error }) {
    
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
    <main className='w-full h-screen flex flex-col'>
        <CategoriaAppbar cantidad = { Categoria[0].componentes.length } tittle = {`Componentes`} nombre = { Categoria[0].nombre } />
        <div className='w-full h-[95%] grid  grid-cols-1 sm:grid-cols-2  lg:grid-cols-3 xl:grid-cols-4 gap-4' key={`4645132`}>
            {
                Categoria ? (
                    Categoria[0].componentes.map((data) => (
                        (
                            data.urlImage != 'default-image.jpg' ? (
                                <CardGeneral
                                    link = {`https://gematech.co/storage/Componentes/${data.taqActivos}/${data.urlImage}`}
                                     nombre={` ACTIVO: ${data.nombre} - SERIAL: ${data.serial}`}
                                    route={`/componente/${data.taqComponente}`}
                                    key={data.taqComponente}
                                />
                            ) : (
                                <CardGeneral
                                    link = {`https://gematech.co/storage/${data.urlImage}`}
                                     nombre={` ACTIVO: ${data.nombre} - SERIAL: ${data.serial}`}
                                    route={`/componente/${data.taqComponente}`}
                                    key={data.taqComponente + `_default_image`}
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
