import ButtonMenu from "@/Components/UI/Activo/ButtonMenu";
import Caracteristica_target from "@/Components/UI/Activo/Caracteristica_target";
import Appbar from "@/Components/UI/Appbar";
import PanelSection from "@/Components/UI/PanelSection";
import { useState } from "react";

 
const ActivoPage= ({ Activo, Activos, Areas, oms, Empresas, Caracteristicas, Tipo, Responsables, Mantenimientos, Componentes }) => {
  
  const [Default, setDefault] = useState(true)
  
  const [MantenimientosPanel, setMantenimientosPanel] = useState(false) 
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
    "Data"       : Mantenimientos, 
    "State"      : MantenimientosPanel,
  },
  {
    "id"         : "feddc0dab45263a21a", 
    "Tittle"     : "Documentos", 
    "Data"       : Activo[0].Documentos, 
    "State"      : DocumentosPanel
  },
  {
    "id"         : "8acfc6e23005040812", 
    "Tittle"     : "Documentos Eliminados", 
    "Data"       : Activo[0].DocumentosEliminados, 
    "State"      : DocumentosEliminadosPanel
  },
  {
      "id"         : "be83a6a6312252cfa2ef", 
      "Tittle"     : "Certificaciones", 
      "Data"       : Componentes, 
      "State"      : CertificacionesPanel
  },{
    "id"         : "be83a623a63252cfa2ef", 
    "Tittle"     : "Certificaciones Eliminadas", 
    "Data"       : Componentes, 
    "State"      : CertificacionesPanel
  },{
    "id"         : "be8354a6a63252cfa2ef", 
    "Tittle"     : "Componentes", 
    "Data"       : Componentes, 
    "State"      : ComponentesPanel
  },{
    "id"         : "be83a6aasd63252cfa2ef", 
    "Tittle"     : "Movimientos", 
    "Data"       : Activos[0].Movimientos, 
    "State"      : MovimientosPanel
  }]

  return (
    <main className='w-full h-screen overflow-hidden  flex flex-col justify-start items-center '>
      <Appbar Objeto = { Activo[0] } />
      <main className="w-full h-full overflow-hidden overflow-y-auto flex flex-col lg:flex-row justify-start items-start">
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
            Panels ?  Panels.map((Constructor) => (
            <PanelSection key={Constructor.id} Values = {Constructor} ShowModal = { () => setShowModal(true) } />
            )) : null 
          }
        </div>
      </main>
    </main>
  )
}


export default ActivoPage;