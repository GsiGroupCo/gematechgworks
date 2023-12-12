import CardGeneral from '@/Components/UI/CartaGeneral'
import CategoriaAppbar from '@/Components/UI/Categorias/Appbar'
import React, { useEffect } from 'react'
import { Toaster, toast } from 'sonner';

export default function TipoHerramientas({ Categorias, status, error }) {
    
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
        <CategoriaAppbar cantidad = { Categorias[0].herramientas.length } tittle = {`Herramientas`} nombre = { Categorias[0].nombre } />
        <div className='w-full h-[95%] grid  grid-cols-1 sm:grid-cols-2  lg:grid-cols-3 xl:grid-cols-4 gap-4'>
            {
                Categorias ? (
                    Categorias[0].herramientas.map((data) => (
                      (
                        data.urlImage != 'default-image.jpg' ? (
                            <CardGeneral
                              link = {`https://gworks.gematech.co/storage/Herramientas/${data.taqHer}/${data.urlImage}`}
                                nombre={data.nombre}
                                route={`/herramienta/${data.taqHer}`}
                                key={data.taqHer}
                            />
                        ) : (
                            <CardGeneral
                                link = {`https://gworks.gematech.co/storage/${data.urlImage}`}
                                nombre={data.nombre}
                                route={`/herramienta/${data.taqHer}`}
                                key={data.taqHer + `_default_image`}
                            />
                        )
                      )
                    ))
                ) : null
            }
        </div>
        <Toaster richColors position='top-center'/>
    </main>
  )
}
