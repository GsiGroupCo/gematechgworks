
import Modal from "@/Components/Panels/Modals/Modal";
import Actions from "@/Components/UI/Actions";
import ButtonMenu from "@/Components/UI/Activo/ButtonMenu";
import Caracteristica_target from "@/Components/UI/Activo/Caracteristica_target";
import Appbar from "@/Components/UI/Appbar";
import PanelSection from "@/Components/UI/PanelSection";
import CreateActividad from "@/Components/forms/Mantenimiento/Actividades/CreateActividades";
import EditMantenimiento from "@/Components/forms/Mantenimiento/EditMantenimiento";
import { useForm } from "@inertiajs/react";
import { useState } from "react"; 
 
const MttoPage= ({ Mtto, Responsables }) => {
 
  const { post, data } = useForm();

  console.log(Mtto)

  const [ModalShow, setModalShow] = useState(false)

  const [CreateFormModal, setCreateFormModal] = useState(false)

  const [AccionesModal, setAccionesModal] = useState(false) 
  const [FormatosModal, setFormatosModal] = useState(false) 
  const [ImageModal, setImageModal] = useState(false) 
  const [ShowModal, setShowModal] = useState(false)

  function ShowActions(){
    setImageModal(false)
    setFormatosModal(false)
    setShowModal(true)
    setAccionesModal(true)
    ShowActionButtons()
  }
  
  function ShowFormats(){
    setImageModal(false)
    setAccionesModal(false)
    setShowModal(true)
    setFormatosModal(true)
  }
  
  function ShowImage(){
    setAccionesModal(false)
    setFormatosModal(false)
    setShowModal(true)
    setImageModal(true)
  }

  const [AcctionsButtons, setAcctionsButtons]                     = useState(true) 
  const [EditarMantenimientoPanel, setEditarMantenimientoPanel]   = useState(false) 
  
  function ShowActionButtons(){ 
    setEditarMantenimientoPanel(false) 
    setAcctionsButtons(true)
  }
 
  function ShowEditarMantenimientoPanel(){ 
    setAcctionsButtons(false) 
    setEditarMantenimientoPanel(true)
  }
 
  const Acciones = [{
    "id"         : "1213522726",
    "label"      : "Editar Mantenimiento",
    "estate"     : 2,
    "function"   : ShowEditarMantenimientoPanel,
  }]

  const [DefaultPanel, setDefaultPanel] = useState(false) 
  const [ActividadesPanel, setActividadesPanel] = useState(true) 

  function CloseAllPanels(){ 
    setActividadesPanel(false) 
    setDefaultPanel(true)
  }

  function ShowActividades(){ 
    setDefaultPanel(false) 
    setActividadesPanel(true)
  }

  const Data = [{  
    "id"         : '623026548',
    "nombre"     : "DESCRIPCION",
    "value"      : Mtto[0] ? Mtto[0].descripcion : '',
  }]

  const Buttons = [{  
    "id"         : '16256256',
    "label"      : "Actividades",
    "Myfunction" : ShowActividades,
    "estado"     : ActividadesPanel
  }]
 
  const Panels = [{
    "id"         : "6b4fe942b95bb902a15", 
    "Tittle"     : "Actividades", 
    "Data"       : Mtto[0].actividades, 
    "State"      : ActividadesPanel,
    "add"        : true
  }]

  return (
    <main className='w-full h-screen overflow-hidden  flex flex-col justify-start items-center '>
      <Appbar 
        Objeto = { Mtto[0] } 
        ShowImage = { ShowImage } 
        ShowActions = { ShowActions } 
        ShowFormats = { ShowFormats }  
        Taq = {`not_show`} 
        urlImage = {`not_image`} 
      />
      <div className="w-full h-full overflow-hidden overflow-y-auto flex flex-col lg:flex-row justify-start items-start">
        <div className="w-full h-auto px-4 py-2 lg:w-[20%]  gap-2 flex flex-col justify-start items-center">
          {
            Data ? (
              Data.map( (data) => (
                <Caracteristica_target
                  name = { data.nombre }
                  key = { data.id }
                  value = { data.value }
                />
              ))
            ) : null
          }
          {
            Mtto[0].caracteristicas ? (
                Mtto[0].caracteristicas.map( (data) => (
                  <Caracteristica_target
                    name = { data.nombre }
                    key = { data.taqotro }
                    value = { data.value }
                  />
                ))
            ) : null
          }
        </div>
        <div className='hidden h-auto px-4 py-2 lg:w-auto  gap-2 lg:flex flex-col justify-start items-center'>
          {
            Buttons ? (
              Buttons.map( (data) => (
                <ButtonMenu
                  Myfunction = { data.Myfunction }
                  label = { data.label }
                  estado = { data.estado }
                  key = { data.id } 
                />
              ))
            ) : null
          }
        </div>
        <div className='w-full h-full gap-2 flex flex-col justify-start items-center'>
          {
            Panels ? Panels.map((Constructor) => (
              <PanelSection key = { Constructor.id } Values = { Constructor } ShowModal = { () => setCreateFormModal(true) } />
            )) : null 
          } 
        </div>
      </div>
      <Modal
        isVisible = { ShowModal }
        onClose = { () => setShowModal(false) }
        tittle = {`Opciones`}
      >
        {
          AccionesModal ? (
            <Actions 
              Acctions = { AcctionsButtons }
              Acciones = { Acciones } 
              key = {`a300c473056b301c`}
            >
              
              {
                EditarMantenimientoPanel ? (
                  <EditMantenimiento Mtto = { Mtto } onClose = { () => setShowModal(false) } />
                ) : null
              }
            </Actions>
          ) : null
        }
        {
          FormatosModal ? (
            <>
            
            </>
          ) : null
        }   
      </Modal>
      <Modal
        isVisible = { CreateFormModal }
        onClose = { () => setCreateFormModal(false) }
        tittle = {`Acciones`}
      >
        {
          ActividadesPanel ? (
            <CreateActividad
              Mantenimiento = { Mtto[0] }
              onClose = { () => setCreateFormModal(false) }
            />
          ) : null
        }
      </Modal>       
    </main>
  )
}


export default MttoPage;