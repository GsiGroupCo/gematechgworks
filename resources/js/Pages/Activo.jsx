import Modal from "@/Components/Panels/Modals/Modal";
import Actions from "@/Components/UI/Actions";
import ButtonMenu from "@/Components/UI/Activo/ButtonMenu";
import Caracteristica_target from "@/Components/UI/Activo/Caracteristica_target";
import Appbar from "@/Components/UI/Appbar";
import PanelSection from "@/Components/UI/PanelSection";
import CloneActivo from "@/Components/forms/Activo/CloneActivo";
import EditActivo from "@/Components/forms/Activo/EditActivo"; 
import ListCaracteristica from "@/Components/forms/Caracteristicas/ListCaracteristica"; 
import CreateCertificacion from "@/Components/forms/Certificaciones/CreateCertificacion";
import AsignarComponente from "@/Components/forms/Componente/AsignarComponente";
import CreateDocumento from "@/Components/forms/Documentos/CreateDocumento";
import CreateMantenimiento from "@/Components/forms/Mantenimiento/CreateMantenimiento";  
import CreateMovimiento from "@/Components/forms/Movimiento/CreateMovimiento";
import CreateOms from "@/Components/forms/Oms/CreateOms";
import { useState } from "react"; 
 
const ActivoPage= ({ Activo, Activos, Areas, Oms, Empresas, Caracteristicas, Tipo, Responsables, Rigs, Mantenimientos, Componentes }) => {
 
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
  const [EditarActivoState, setEditarActivoState]                   = useState(false)
  const [ClonarActivoState, setClonarActivoState]                   = useState(false) 
  
  function ShowActionButtons(){
    setClonarActivoState(false)
    setEditarCaracteristicaState(false)
    setEditarActivoState(false) 
    setAcctionsButtons(true)
  }
 
  function ShowFormEditCaracteristicas(){ 
    setClonarActivoState(false)
    setEditarCaracteristicaState(false)
    setEditarActivoState(false) 
    setAcctionsButtons(true)
  }

  function ShowFormEditActivo(){ 
    setClonarActivoState(false)
    setEditarCaracteristicaState(false)
    setAcctionsButtons(false)
    setEditarActivoState(true) 
  }

  function ShowFormClonarActivo(){  
    setEditarCaracteristicaState(false)
    setEditarActivoState(false) 
    setAcctionsButtons(false)
    setClonarActivoState(true)
  }
 
  const Acciones = [{
      "id"         : "296215696",
      "label"      : "Editar Caracteristica",
      "estate"     : 2,
      "function"   : ShowFormEditCaracteristicas,
  },{
      "id"         : "1213522726",
      "label"      : "Editar Activo",
      "estate"     : 2,
      "function"   : ShowFormEditActivo,
  },{
      "id"         : "571701126",
      "label"      : "Clonar Activo",
      "estate"     : 2,
      "function"   : ShowFormClonarActivo,
  }]

  const [Default, setDefault] = useState(false)
  const [MantenimientosPanel, setMantenimientosPanel] = useState(true) 
  const [DocumentosPanel, setDocumentosPanel] = useState(false)
  const [DocumentosEliminadosPanel, setDocumentosEliminadosPanel] = useState(false)
  const [CertificacionesPanel, setCertificacionesPanel] = useState(false)
  const [CertificacionesEliminadosPanel, setCertificacionesEliminadosPanel] = useState(false)
  const [ComponentesPanel, setComponentesPanel] = useState(false)
  const [MovimientosPanel, setMovimientosPanel] = useState(false) 
     
  function ShowDefault(){
    setMantenimientosPanel(false)
    setDocumentosPanel(false)
    setDocumentosEliminadosPanel(false) 
    setCertificacionesPanel(false)
    setCertificacionesEliminadosPanel(false)
    setComponentesPanel(false)
    setMovimientosPanel(false) 
    setDefault(true)
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
      setMovimientosPanel(false) 
      setDefault(false)
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
      setMovimientosPanel(false) 
      setDefault(false)
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
      setMovimientosPanel(false) 
      setDefault(false)
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
      setMovimientosPanel(false) 
      setDefault(false)
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
      setMovimientosPanel(false) 
      setDefault(false)
      setCertificacionesPanel(false)
      setCertificacionesEliminadosPanel(true)
    }
  }

  function ShowComponentes() {
    if(ComponentesPanel){
      ShowDefault()
    }else{
      setMantenimientosPanel(false)
      setDocumentosPanel(false)
      setDocumentosEliminadosPanel(false) 
      setMovimientosPanel(false) 
      setDefault(false)
      setCertificacionesPanel(false)
      setCertificacionesEliminadosPanel(false)
      setComponentesPanel(true)
    }
  }

  function ShowMovimientos() {
    if(MovimientosPanel){
      ShowDefault()
    }else{
      setMantenimientosPanel(false)
      setDocumentosPanel(false)
      setDocumentosEliminadosPanel(false) 
      setDefault(false)
      setCertificacionesPanel(false)
      setCertificacionesEliminadosPanel(false)
      setComponentesPanel(false)
      setMovimientosPanel(true) 
    }
  }

  const Data = [{  
    "id"         : '623026548',
    "nombre"     : "DESCRIPCION",
    "value"      : Activo[0] ? Activo[0].descripcion : '',
  },{  
    "id"         : '807708498',
    "nombre"     : "EMPRESA",
    "value"      : "GWORKS SERVICES SAS",
  },{  
    "id"         : '173944',
    "nombre"     : "DEPENDENCIA",
    "value"      : Activo[0] ? Activo[0].dependencia : '',
  },{  
    "id"         : '47175832',
    "nombre"     : "CATEGORIA",
    "value"      : Activo[0] ? Activo[0].tipo.nombre : '',
  }]

  const Buttons = [{  
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
  },{
    "id"         : '95531561',
    "label"      : "Movimientos",
    "Myfunction" : ShowMovimientos,
    "estado"     : MovimientosPanel
  },{
    "id"         : '80287589',
    "label"      : "Componentes",
    "Myfunction" : ShowComponentes,
    "estado"     : ComponentesPanel
  }]
 
  const Panels = [{
    "id"         : "6b4fe94b95bb902a15", 
    "Tittle"     : "Mantenimientos", 
    "Data"       : Activo[0].mantenimientos, 
    "State"      : MantenimientosPanel,
    "add"        : true
  },
  {
    "id"         : "feddc0dab45263a21a", 
    "Tittle"     : "Documentos", 
    "Data"       : Activo[0].documentos, 
    "State"      : DocumentosPanel,
    "add"        : true
  },
  {
    "id"         : "8acfc6e23005040812", 
    "Tittle"     : "Documentos Eliminados", 
    "Data"       : Activo[0].documentos__eliminados, 
    "State"      : DocumentosEliminadosPanel,
    "add"        : false
  },
  {
    "id"         : "be83a6a6312252cfa2ef", 
    "Tittle"     : "Certificaciones", 
    "Data"       : Activo[0].certificaciones, 
    "State"      : CertificacionesPanel,
    "add"        : true
  },{
    "id"         : "be83a623a63252cfa2ef", 
    "Tittle"     : "Certificaciones Eliminadas", 
    "Data"       : Activo[0].certificaciones__eliminadas, 
    "State"      : CertificacionesEliminadosPanel,
    "add"        : false
  },{
    "id"         : "be8354a6a63252cfa2ef", 
    "Tittle"     : "Componentes", 
    "Data"       : Activos[0].componente, 
    "State"      : ComponentesPanel,
    "add"        : true
  },{
    "id"         : "be83a6aasd63252cfa2ef", 
    "Tittle"     : "Movimientos", 
    "Data"       : Activos[0].movimiento, 
    "State"      : MovimientosPanel,
    "add"        : true
  }]

  return (
    <main className='w-full h-screen overflow-hidden  flex flex-col justify-start items-center '>
      <Appbar 
        Objeto = { Activo[0] } 
        ShowImage = { ShowImage } 
        ShowActions = { ShowActions } 
        ShowFormats = { ShowFormats }  
        Taq = { Activos[0].taqActivos } 
        urlImage = {` https://gworks.gematech.co/storage/Activos/${Activos[0].taqActivos}/${Activos[0].urlImage} `} 
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
            Activo[0].caracteristicas ? (
                Activo[0].caracteristicas.map( (data) => (
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
          ImageModal ? (
              Activo[0].urlImage != 'default-image.jpg' ? (  
                <img src={`https://gworks.gematech.co/storage/Activos/${Activo[0].taqActivos}/${Activo[0].urlImage}`} alt={``} className = 'max-w-[300px] sm:max-w-[650px] md:max-w-[780px] max-h-[800px] object-fill ' loading="lazy"/>
              ) : (
                <img src={`https://gworks.gematech.co/storage/${Activo[0].urlImage}`} alt={``} className = 'max-w-[800px] max-h-[800px] object-fill' loading="lazy"/>
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
                      Caracteristicas = { Caracteristicas }
                      onClose={() => setShowModal(false)}
                      DeleteRoute = {`caracteristica/activo/delete`}
                      EditRoute = {`caracteristica/activo/update`}
                    />
                  ) : null
                }
                {
                  EditarActivoState  ? (
                    <EditActivo
                      Activo = { Activo }
                      onClose={() => setShowModal(false)}
                    />
                  ) : null
                }  
                {
                  ClonarActivoState  ? (
                    <CloneActivo
                      Activo = {Activo} 
                      Empresa = { Empresas }
                      Tipo = { Tipo }
                      onClose={() => setShowModal(false)}
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
          MantenimientosPanel ? (
            <CreateOms 
              LastOm = { Oms && Oms[0] ? Oms[0].taqom : "0" }
              Responsables = { Responsables }
              onClose = { () => setCreateFormModal(false) } 
            />
          ) : null 
        }
        {
          DocumentosPanel ? (
            <CreateDocumento
              Taq = { Activo[0].taqActivos }
              onClose = { () => setCreateFormModal(false) }
              route = {`/document/componente/`}
            />
          ) : null 
        }
        {
          DocumentosEliminadosPanel ? (
            <CreateMantenimiento onClose={() => setCreateFormModal(false)} />
          ) : null 
        }
        {
          CertificacionesPanel ? (
            <CreateCertificacion
              Taq = { Activo[0].taqActivos }
              route = {`/certificacion/componente/store`}
              onClose={() => setCreateFormModal(false)} 
            />
          ) : null 
        }
        {
          CertificacionesEliminadosPanel ? (
            <CreateMantenimiento
             onClose = { () => setCreateFormModal(false) }
            />
          ) : null 
        }
        {
          MovimientosPanel ? (
            <CreateMovimiento
              Oms = { Oms }
              Rigs = { Rigs }
              Taq = { Activo[0].taqActivos }
              onClose = { () => setCreateFormModal(false) }
            />
          ) : null 
        }
        {
          ComponentesPanel ? (
            <AsignarComponente
              Componentes = { Componentes }
              Taq = { Activos[0].taqActivos }
              onClose = { () => setCreateFormModal(false) }
            />
          ) : null 
        }
      </Modal>       
    </main>
  )
}


export default ActivoPage;