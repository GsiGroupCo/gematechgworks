import Modal from "@/Components/Panels/Modals/Modal";
import Actions from "@/Components/UI/Actions";
import ButtonMenu from "@/Components/UI/Activo/ButtonMenu";
import Caracteristica_target from "@/Components/UI/Activo/Caracteristica_target";
import Appbar from "@/Components/UI/Appbar";
import PanelSection from "@/Components/UI/PanelSection";
import AsignarActivo from "@/Components/forms/Activo/AsignarActivo";
import ListCaracteristica from "@/Components/forms/Caracteristicas/ListCaracteristica"; 
import CreateCertificacion from "@/Components/forms/Certificaciones/CreateCertificacion";
import ClonarComponente from "@/Components/forms/Componente/ClonarComponente";
import EditComponente from "@/Components/forms/Componente/EditComponente";
import CreateDocumento from "@/Components/forms/Documentos/CreateDocumento";
import { useState } from "react";

const ActivoPage= ({ ComponentesData, Categorias, Activos }) => {
  
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

  const [AcctionsButtons, setAcctionsButtons]                       = useState(true)
  
  const [EditarCaracteristicaState, setEditarCaracteristicaState]   = useState(false)
  const [EditarComponenteState, setEditarComponenteState]           = useState(false)
  const [ClonarComponenteState, setClonarComponenteState]           = useState(false) 
 
  function ShowActionButtons(){ 
    setEditarCaracteristicaState(false)
    setEditarComponenteState(false)
    setClonarComponenteState(false) 
    setAcctionsButtons(true)
  } 
    
  function ShowFormEditCaracteristicas(){ 
    setEditarComponenteState(false)
    setClonarComponenteState(false) 
    setAcctionsButtons(false) 
    setEditarCaracteristicaState(true)
  }

  function ShowFormEditComponente(){ 
    setClonarComponenteState(false) 
    setAcctionsButtons(false) 
    setEditarCaracteristicaState(false)
    setEditarComponenteState(true)
  }

  function ShowFormClonarComponente(){  
    setAcctionsButtons(false) 
    setEditarCaracteristicaState(false)
    setEditarComponenteState(false)
    setClonarComponenteState(true)
  }

  const Acciones = [{
      "id"         : "296215696",
      "label"      : "Editar Caracteristica",
      "estate"     : 2,
      "function"   : ShowFormEditCaracteristicas,
  },{
      "id"         : "1213522726",
      "label"      : "Editar Componente",
      "estate"     : 2,
      "function"   : ShowFormEditComponente,
  },{
      "id"         : "571701126",
      "label"      : "Clonar Componente",
      "estate"     : 2,
      "function"   : ShowFormClonarComponente,
  }]
 
  const [MantenimientosPanel, setMantenimientosPanel] = useState(true) 
  const [DocumentosPanel, setDocumentosPanel] = useState(false)
  const [DocumentosEliminadosPanel, setDocumentosEliminadosPanel] = useState(false)
  const [CertificacionesPanel, setCertificacionesPanel] = useState(false)
  const [CertificacionesEliminadosPanel, setCertificacionesEliminadosPanel] = useState(false)
  const [ComponentesPanel, setComponentesPanel] = useState(false)
  const [ActivosPanel, setActivosPanel] = useState(false) 
     
  function ShowDefault(){
    setMantenimientosPanel(false)
    setDocumentosPanel(false)
    setDocumentosEliminadosPanel(false) 
    setCertificacionesPanel(false)
    setCertificacionesEliminadosPanel(false)
    setComponentesPanel(false)
    setActivosPanel(false)  
  }
  
  function ShowMantenimientos() {
    if(MantenimientosPanel){
      ShowDefault()
    }else{      
      setDocumentosPanel(false)
      setDocumentosEliminadosPanel(false) 
      setCertificacionesPanel(false)
      setCertificacionesEliminadosPanel(false)
      setComponentesPanel(false)
      setActivosPanel(false) 
      setMantenimientosPanel(true)
    }
  }

  function ShowDocumentos() {
    if(DocumentosPanel){      
      ShowDefault()
    }else{
      setMantenimientosPanel(false)
      setDocumentosEliminadosPanel(false) 
      setCertificacionesPanel(false)
      setCertificacionesEliminadosPanel(false)
      setComponentesPanel(false)
      setActivosPanel(false) 
      setDocumentosPanel(true)
    }
  }

  function ShowDocumentosEliminados() {
    if(DocumentosEliminadosPanel){
      ShowDefault()
    }else{
      setMantenimientosPanel(false)
      setDocumentosPanel(false)
      setCertificacionesPanel(false)
      setCertificacionesEliminadosPanel(false)
      setComponentesPanel(false)
      setActivosPanel(false) 
      setDocumentosEliminadosPanel(true) 
    }
  }

  function ShowCertificaciones() {
    if(CertificacionesPanel){
      ShowDefault()
    }else{
      setMantenimientosPanel(false)
      setDocumentosPanel(false)
      setDocumentosEliminadosPanel(false) 
      setCertificacionesEliminadosPanel(false)
      setComponentesPanel(false)
      setActivosPanel(false) 
      setCertificacionesPanel(true)
    }
  }

  function ShowCertificacionesEliminadas() {
    if(CertificacionesEliminadosPanel){
      ShowDefault()
    }else{
      setMantenimientosPanel(false)
      setDocumentosPanel(false)
      setDocumentosEliminadosPanel(false) 
      setComponentesPanel(false)
      setActivosPanel(false) 
      setCertificacionesPanel(false)
      setCertificacionesEliminadosPanel(true)
    }
  }
 
  function ShowActivos() {
    if(ActivosPanel){
      ShowDefault()
    }else{
      setMantenimientosPanel(false)
      setDocumentosPanel(false)
      setDocumentosEliminadosPanel(false) 
      setCertificacionesPanel(false)
      setCertificacionesEliminadosPanel(false)
      setComponentesPanel(false)
      setActivosPanel(true) 
    }
  }

  const Data = [{  
    "id"         : '109678',
    "nombre"     : "DESCRIPCION",
    "value"      : ComponentesData[0] ? ComponentesData[0].descripcion : '',
  },{  
    "id"         : '6218340',
    "nombre"     : "EMPRESA",
    "value"      : 'GWORKS SERVICES',
  },{  
    "id"         : '5204759',
    "nombre"     : "CATEGORIA",
    "value"      : ComponentesData[0] ? ComponentesData[0].categoria.nombre : '',
  }]

  const Buttons = [{
    "id"         : '95531561',
    "label"      : "Activos",
    "Myfunction" : ShowActivos,
    "estado"     : ActivosPanel
  },{  
    "id"         : '16256256',
    "label"      : "Mantenimiento",
    "Myfunction" : ShowMantenimientos,
    "estado"     : MantenimientosPanel
  },{
    "id"         : '030963498',
    "label"      : "Documentos",
    "Myfunction" : ShowDocumentos,
    "estado"     : DocumentosPanel
  },{
    "id"         : '79235457',
    "label"      : "Documentos Eliminados",
    "Myfunction" : ShowDocumentosEliminados,
    "estado"     : DocumentosEliminadosPanel
  },{
    "id"         : '8842172',
    "label"      : "Certificaciones",
    "Myfunction" : ShowCertificaciones,
    "estado"     : CertificacionesPanel
  },{
    "id"         : '73286369',
    "label"      : "Certificaciones Eliminados",
    "Myfunction" : ShowCertificacionesEliminadas,
    "estado"     : CertificacionesEliminadosPanel
  }]
 
  const Panels = [{
    "id"         : "6b4fe94b95bb902a15", 
    "Tittle"     : "Mantenimientos", 
    "Data"       : ComponentesData[0].mantenimientos, 
    "State"      : MantenimientosPanel,
    "add"        : true
  },
  {
    "id"         : "feddc0dab45263a21a", 
    "Tittle"     : "Documentos", 
    "Data"       : ComponentesData[0].documentos, 
    "State"      : DocumentosPanel,
    "add"        : true
  },
  {
    "id"         : "8acfc6e23005040812", 
    "Tittle"     : "Documentos Eliminados", 
    "Data"       : ComponentesData[0].documentos__eliminados, 
    "State"      : DocumentosEliminadosPanel,
    "add"        : false
  },
  {
    "id"         : "be83a6a6312252cfa2ef", 
    "Tittle"     : "Certificaciones", 
    "Data"       : ComponentesData[0].certificaciones, 
    "State"      : CertificacionesPanel,
    "add"        : true
  },{
    "id"         : "be83a623a63252cfa2ef", 
    "Tittle"     : "Certificaciones Eliminadas", 
    "Data"       : ComponentesData[0].certificaciones__eliminadas, 
    "State"      : CertificacionesEliminadosPanel,
    "add"        : false
  },{
    "id"         : "be8354a6a63252cfa2ef", 
    "Tittle"     : "Activos", 
    "Data"       : ComponentesData[0].activos, 
    "State"      : ActivosPanel,
    "add"        : true
  }]

  return (
    <main className='w-full h-screen overflow-hidden  flex flex-col justify-start items-center '>
      <Appbar 
        Objeto = { ComponentesData[0] } 
        ShowImage = { ShowImage } 
        ShowActions = { ShowActions } 
        ShowFormats = { ShowFormats }  
        Taq = { ComponentesData[0].taqComponente } 
        urlImage = {` https://gworks.gematech.co/storage/Componentes/${ComponentesData[0].taqComponente}/${ComponentesData[0].urlImage}`} 
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
            ComponentesData[0].caracteristicas ? (
                ComponentesData[0].caracteristicas.map( (data) => (
                  <Caracteristica_target
                    name = { data.nombre }
                    key = { data.taqotro }
                    value = { data.value }
                  />
                ))
            ) : null
          }
        </div>
        <div className='w-full h-auto px-4 py-2 lg:w-auto  gap-2 flex flex-col justify-start items-center'>
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
              <PanelSection key={Constructor.id} Values = {Constructor} ShowModal = { () => setCreateFormModal(true) } />
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
              ComponentesData[0].urlImage != 'default-image.jpg' ? (  
                <img src={`https://gworks.gematech.co/storage/Activos/${ComponentesData[0].taqComponente}/${ComponentesData[0].urlImage}`} alt={``} className = 'max-w-[300px] sm:max-w-[650px] md:max-w-[780px] max-h-[800px] object-fill ' loading="lazy"/>
              ) : (
                <img src={`https://gworks.gematech.co/storage/${ComponentesData[0].urlImage}`} alt={``} className = ' max-w-[800px] max-h-[800px] object-fill ' loading="lazy"/>
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
                  EditarCaracteristicaState  ? (
                    <ListCaracteristica
                      Caracteristicas = { ComponentesData[0].caracteristicas }
                      onClose={() => setShowModal(false)}
                      DeleteRoute = {`/caracteristica/activo/delete`}
                      EditRoute = {`/caracteristica/activo/update`}
                    />
                  ) : null
                }
                {
                  EditarComponenteState  ? (
                    <EditComponente
                      Componente = { ComponentesData[0] }
                      onClose = {() => setShowModal(false)}
                    />
                  ) : null
                }
                {
                  ClonarComponenteState  ? (
                    <ClonarComponente
                      Componente = { ComponentesData[0] } 
                      Categorias = { Categorias } 
                      onClose    = {() => setShowModal(false)}
                    />
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
        {
          ActivosPanel ? (
            <AsignarActivo
              Activos = { Activos }
              Taq = { ComponentesData[0].taqComponente } 
              onClose = { () => setCreateFormModal(false) }
            />
          ) : null
        }
        {
          DocumentosPanel ? (
            <CreateDocumento
              Taq = { ComponentesData[0].taqComponente }
              onClose = { () => setCreateFormModal(false) }
              route = {`/document/componente/`}
            />
          ) : null 
        } 
        {
          CertificacionesPanel ? (
            <CreateCertificacion
              Taq = { ComponentesData[0].taqComponente }
              route = {`/certificacion/componente/store`}
              onClose = { () => setCreateFormModal(false) } 
            />
          ) : null 
        } 
      </Modal>
    </main>
  )
}


export default ActivoPage;