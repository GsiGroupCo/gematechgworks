import Modal from '@/Components/Panels/Modals/Modal'
import Appbar from '@/Components/UI/Cargos/Appbar'
import CartaGeneral from '@/Components/UI/CartaGeneral'
import CreateCargo from '@/Components/forms/Cargos/CreateCargo' 
import EditCargo from '@/Components/forms/Cargos/EditCargo' 
import CreateResponsable from '@/Components/forms/Responsable/CreateResponsable'
import { useState } from 'react'

export default function CargoPage({ Cargos }) {
  
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
    "label"      : "Editar Nombre de Cargo",
    "estate"     : 2,
    "function"   : ShowEdit,
  },{  
    "id"         : '839139',
    "label"      : `Registrar Nuevo Responsable`,
    "estate"     : 1,
    "function"   : ShowCreate,
  }]
 
  return (
    <main className='w-full h-screen flex flex-col '>
      <Appbar 
        key = {`515ffb79f2f045fc57`} 
        ShowModal = {() => {
          ShowAcctions()
          setActionModal(true)
        }} 
        cantidad = { Cargos[0].responsables.length } 
        tittle = {`RESPONSABLES`} 
        nombre = { Cargos[0].cargo } 
      />
      <div className='w-full h-[95%] grid  grid-cols-1 sm:grid-cols-2  lg:grid-cols-3 xl:grid-cols-4 gap-4'>
        {
          Cargos ? (
            Cargos[0].responsables.map((data) => (
              (
                <CartaGeneral
                  link   = {`https://gworks.gematech.co/storage/Responsable/${data.taqresponsable}/${data.urlImage}`}
                  nombre = {data.nombre}
                  route  = {`responsables/${data.taqresponsable}`}
                  key    = {`CartaResponsablesxCargo`}
                />
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
              <EditCargo
                Cargo = { Cargos } 
                onClose = {() => setActionModal(false)} 
              />
            ) : null
          }
          {
            CreateCategoriaState ? (
              <CreateResponsable 
                onClose = {() => setActionModal(false)}
                Cargo = { Cargos[0].cargo_id }
                key = {`7ebed8e41432a4289e`} 
              />
            ) : null
          }
      </Modal>
    </main>
  )
} 