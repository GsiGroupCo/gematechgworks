import Modal from "@/Components/Panels/Modals/Modal";
import Actions from "@/Components/UI/Actions";
import ButtonMenu from "@/Components/UI/Activo/ButtonMenu"; 
import Appbar from "@/Components/UI/Appbar";
import PanelSection from "@/Components/UI/PanelSection"; 
import { useState } from "react"; 
 
const RigPage= ({ Rig }) => {
 
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
 
  const [AcctionsButtons, setAcctionsButtons] = useState(true) 
  const [EditarRigState, setEditarRigState]   = useState(false)
  const [ClonarRigState, setClonarRigState]   = useState(false) 

  function ShowActionButtons(){ 
    setEditarRigState(false)
    setClonarRigState(false) 
    setAcctionsButtons(true)
  }

  function ShowFormEditRig(){ 
    setClonarRigState(false) 
    setEditarRigState(true)
  }

  function ShowFormClonarRig(){
    setEditarRigState(false)
    setClonarRigState(true)
  }
 
  const Acciones = [{
      "id"         : "1213522726",
      "label"      : "Editar Rig",
      "estate"     : 2,
      "function"   : ShowFormEditRig,
  },{
      "id"         : "571701126",
      "label"      : "Clonar Rig",
      "estate"     : 2,
      "function"   : ShowFormClonarRig,
  }]
  
  const [DocumentosPanel, setDocumentosPanel] = useState(false)
  const [DocumentosEliminadosPanel, setDocumentosEliminadosPanel] = useState(false)
  const [ActivosPanel, setActivosPanel] = useState(false) 
  const [MovimientosPanel, setMovimientosPanel] = useState(false) 
     
  function ShowDefault(){
    setDocumentosPanel(false)
    setDocumentosEliminadosPanel(false)
    setActivosPanel(false)
    setMovimientosPanel(false)
  }
  
  function ShowDocumentosPanel() {
    if(DocumentosPanel){
      ShowDefault()
    }else{    
      setDocumentosEliminadosPanel(false)
      setActivosPanel(false)
      setMovimientosPanel(false)
      setDocumentosPanel(true)
    }
  }

  function ShowDocumentosEliminadosPanel() {
    if(DocumentosEliminadosPanel){      
      ShowDefault()
    }else{
      setDocumentosPanel(false)
      setActivosPanel(false)
      setMovimientosPanel(false)
      setDocumentosEliminadosPanel(true)
    }
  }

  function ShowActivosPanel() {
    if(ActivosPanel){
      ShowDefault()
    }else{
      setDocumentosPanel(false)
      setDocumentosEliminadosPanel(false)
      setMovimientosPanel(false)
      setActivosPanel(true)
    }
  }

  function ShowMovimientosPanel() {
    if(MovimientosPanel){
      ShowDefault()
    }else{
      setDocumentosPanel(false)
      setDocumentosEliminadosPanel(false)
      setActivosPanel(false)
      setMovimientosPanel(true)
    }
  }
 
  const Buttons = [{  
    "id"         : '16256256',
    "label"      : "Documentos",
    "Myfunction" : ShowDocumentosPanel,
    "estado"     : DocumentosPanel
  },{
    "id"         : '030963498',
    "label"      : "Documentos Eliminados",
    "Myfunction" : ShowDocumentosEliminadosPanel,
    "estado"     : DocumentosEliminadosPanel
  },{
    "id"         : '79235457',
    "label"      : "Activos",
    "Myfunction" : ShowActivosPanel,
    "estado"     : ActivosPanel
  },{
    "id"         : '8842172',
    "label"      : "Movimientos",
    "Myfunction" : ShowMovimientosPanel,
    "estado"     : MovimientosPanel
  }]
 
  const Panels = [{
    "id"         : "6b4fe94b95bb902a15", 
    "Tittle"     : "Documentos", 
    "Data"       : Rig[0].documentos, 
    "State"      : DocumentosPanel,
    "add"        : true
  },
  {
    "id"         : "feddc0dab45263a21a", 
    "Tittle"     : "Documentos", 
    "Data"       : Rig[0].documentos__eliminados, 
    "State"      : DocumentosEliminadosPanel,
    "add"        : false
  },
  {
    "id"         : "8acfc6e23005040812", 
    "Tittle"     : "Activos", 
    "Data"       : Rig[0].activos, 
    "State"      : ActivosPanel,
    "add"        : true
  },
  {
    "id"         : "be83a6a6312252cfa2ef", 
    "Tittle"     : "Movimientos", 
    "Data"       : Rig[0].movimientos, 
    "State"      : MovimientosPanel,
    "add"        : true
  }]

  return (
    <main className='w-full h-screen overflow-hidden  flex flex-col justify-start items-center '>
      <Appbar 
        Objeto = { Rig[0] } 
        ShowImage = { ShowImage } 
        ShowActions = { ShowActions } 
        ShowFormats = { ShowFormats }  
        Taq = { Rig[0].taqrig } 
        urlImage = {` https://gworks.gematech.co/storage/Rigs/${Rig[0].taqrig}/${Rig[0].urlImage} `} 
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
          ImageModal ? (
              Rig[0].urlImage != 'default-image.jpg' ? (  
                <img src={`https://gworks.gematech.co/storage/Rigs/${Rig[0].taqrig}/${Rig[0].urlImage}`} alt={``} className = 'max-w-[300px] sm:max-w-[650px] md:max-w-[780px] max-h-[800px] object-fill ' loading="lazy"/>
              ) : (
                <img src={`https://gworks.gematech.co/storage/${Rig[0].urlImage}`} alt={``} className = 'max-w-[800px] max-h-[800px] object-fill' loading="lazy"/>
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
                {
                  EditarRigState  ? (
                    <>
                    </>
                  ) : null
                }  
                {
                  ClonarRigState  ? (
                    <></>
                  ) : null
                } 
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
        <></>
      </Modal>       
    </main>
  )
}


export default RigPage;