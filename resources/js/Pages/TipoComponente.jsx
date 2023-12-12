import Modal from '@/Components/Panels/Modals/Modal'
import CardGeneral from '@/Components/UI/CartaGeneral'
import CategoriaAppbar from '@/Components/UI/Categorias/Appbar'
import CreateCategoria from '@/Components/forms/Categoria/CreateCategoria'
import EditCategoria from '@/Components/forms/Categoria/EditCategoria'
import React, { useState } from 'react'

export default function TipoComponente({ Categoria }) {
    
  const [ActionModal, setActionModal] = useState(false)

  const [AccionesState, setAccionesState] = useState(true)
  const [EditCategoriaState, setEditCategoriaState] = useState(false)
  const [CreateCategoriaState, setCreateCategoriaState] = useState(false)

  function ShowAcctions(){
    setEditCategoriaState(false)
    setCreateCategoriaState(false)
    setAccionesState(true)
  }

  function ShowEdit(){
    if(EditCategoriaState){
      ShowAcctions()
    }else{
      setAccionesState(false)
      setCreateCategoriaState(false)
      setEditCategoriaState(true)
    }
  }
  
  function ShowCreate(){
    if(CreateCategoriaState){
      ShowAcctions()
    }else{
      setAccionesState(false)
      setEditCategoriaState(false)
      setCreateCategoriaState(true)
    }
  }

  const Options = [{  
    "id"         : '127562',
    "label"      : "Editar Nombre de Categoria",
    "estate"     : 2,
    "function"   : ShowEdit,
  },{  
    "id"         : '839139',
    "label"      : "Crear Nueva Categoria",
    "estate"     : 1,
    "function"   : ShowCreate,
  }]

  return (
    <main className='w-full h-screen flex flex-col'> 
        <CategoriaAppbar key = {`515ffb79f2f045fc57`} ShowModal = { () => {
        ShowAcctions()
        setActionModal(true)
      } } cantidad = {  Categoria[0].componentes.length } tittle = {`Componentes`} nombre = { Categoria[0].nombre } />
        <div className='w-full h-[95%] grid  grid-cols-1 sm:grid-cols-2  lg:grid-cols-3 xl:grid-cols-4 gap-4' key={`4645132`}>
            {
              Categoria ? (
                Categoria[0].componentes.map((data) => (
                  (
                    data.urlImage != 'default-image.jpg' ? (
                      <CardGeneral
                          link = {`https://gworks.gematech.co/storage/Componentes/${data.taqActivos}/${data.urlImage}`}
                            nombre={` ACTIVO: ${data.nombre} - SERIAL: ${data.serial}`}
                          route={`/componente/${data.taqComponente}`}
                          key={data.taqComponente}
                      />
                    ) : (
                      <CardGeneral
                          link = {`https://gworks.gematech.co/storage/${data.urlImage}`}
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
        <Modal
          isVisible = { ActionModal }
          onClose = { () => setActionModal(false) }
          tittle = {`Opciones de Categoria de Activo`} 
        >
          {
            AccionesState ? (
              <div className='max-w-[500px] px-4 py-2'>
                {
                  Options ? Options.map((data) => (
                    <button onClick = { data.function } key = { data.id } className = {`  w-full mb-2 transition duration-700 ease-in-out h-auto text-white border-black border-2 font-bold  rounded-md px-4 py-2 ${ data.estate === 1 ? 'bg-green-600 hover:bg-green-800 hover:border-green-800' : 'bg-yellow-500 hover:bg-yellow-800 hover:border-yellow-800' }  hover:text-white hover:border-white   `} >
                      { data.label }
                    </button>
                  ) ) : null
                }
              </div>
            ) : null
          }
          {
            EditCategoriaState ? (
              <EditCategoria onClose = {() => setActionModal(false)} route = {`edit/`} />
            ) : null
          }
          {
            CreateCategoriaState ? (
              <CreateCategoria onClose = {() => setActionModal(false)} key = {`7ebed8e41432a4289e`} />
            ) : null
          }
      </Modal>
    </main>
  )
}
