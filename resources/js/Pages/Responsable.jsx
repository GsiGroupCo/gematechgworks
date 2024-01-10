 
import Modal from "@/Components/Panels/Modals/Modal";
import ButtonMenu from "@/Components/UI/Activo/ButtonMenu";
import Appbar from "@/Components/UI/Responsables/Appbar";
import CreateDocumento from "@/Components/forms/Documentos/CreateDocumento";
import { useState } from "react"; 
 
const ResponsablePage= ({ Responsable }) => {

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

  const [AcctionsButtons, setAcctionsButtons]     = useState(true)
  const [EditarActivoState, setEditarActivoState] = useState(false)
  const [ClonarActivoState, setClonarActivoState] = useState(false) 
  
  function ShowActionButtons(){
    setClonarActivoState(false)
    setEditarActivoState(false) 
    setAcctionsButtons(true)
  }
 
  function ShowFormEditCaracteristicas(){ 
    setClonarActivoState(false)
    setEditarActivoState(false) 
    setAcctionsButtons(true)
  }

  function ShowFormEditActivo(){ 
    setClonarActivoState(false)
    setAcctionsButtons(false)
    setEditarActivoState(true) 
  }

  function ShowFormClonarActivo(){  
    setEditarActivoState(false) 
    setAcctionsButtons(false)
    setClonarActivoState(true)
  }
 
  const Acciones = [{
      "id"         : "296215696",
      "label"      : "Editar Caracteristica",
      "estate"     : 2,
      "function"   : () => ShowFormEditCaracteristicas(),
  },{
      "id"         : "1213522726",
      "label"      : "Editar Activo",
      "estate"     : 2,
      "function"   : () => ShowFormEditActivo(),
  },{
      "id"         : "571701126",
      "label"      : "Clonar Activo",
      "estate"     : 2,
      "function"   : () => ShowFormClonarActivo(),
  }]
 
  const [ActividadesPanel, setActividadesPanel] = useState(true) 
  const [DocumentosPanel, setDocumentosPanel] = useState(false) 
     
  function ShowDefault(){
    setActividadesPanel(false)
    setDocumentosPanel(false)
  }
  
  function ShowActividades() {
    if(ActividadesPanel){
      ShowDefault()
    }else{     
      setDocumentosPanel(false)
      setActividadesPanel(true)
    }
  }

  function ShowDocumentos() {
    if(DocumentosPanel){
      ShowDefault()
    }else{    
      setActividadesPanel(false)
      setDocumentosPanel(true)
    }
  }

  const Buttons = [{  
    "id"         : '16256256',
    "label"      : "Actividades",
    "Myfunction" : ShowActividades,
    "estado"     : ActividadesPanel
  },{
    "id"         : '030963498',
    "label"      : "Documentos",
    "Myfunction" : ShowDocumentos,
    "estado"     : DocumentosPanel
  }]
 
  return (
    <main className='w-full h-screen overflow-hidden  flex flex-col justify-start items-center '> 
      <Appbar
        ShowModal = { () => setCreateFormModal(false) }
        Responsable = { Responsable }
      />
      <div className="w-full h-full overflow-hidden overflow-y-auto flex flex-col lg:flex-row justify-start items-start"> 
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
          
        </div>
      </div>
      <Modal
        isVisible = { ShowModal }
        onClose = { () => setShowModal(false) }
        tittle = {`Opciones`}
      >
        {
          ImageModal ? (
              Responsable[0].urlImage != 'default-image.jpg' ? (  
                <img src={`https://gworks.gematech.co/storage/Activos/${Responsable[0]. taqresponsable}/${Responsable[0].urlImage}`} alt={``} className = 'max-w-[300px] sm:max-w-[650px] md:max-w-[780px] max-h-[800px] object-fill ' loading="lazy"/>
              ) : (
                <img src={`https://gworks.gematech.co/storage/${Responsable[0].urlImage}`} alt={``} className = 'max-w-[800px] max-h-[800px] object-fill' loading="lazy"/>
              )
          ) : null   
        }
        {
          AccionesModal ? (
            <Actions 
              Acctions = { AcctionsButtons }
              Acciones = { Acciones } 
              key = {`a300c473056b301c`}
            >
              <> 
              </>
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
          DocumentosPanel ? (
            <CreateDocumento
              Taq = { Responsable[0].taqresponsable }
              onClose = { () => setCreateFormModal(false) }
              route = {`/document/responsable/`}
            />
          ) : null 
        }     
      </Modal>       
    </main>
  )
}

export default ResponsablePage