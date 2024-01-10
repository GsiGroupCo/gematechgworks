import Modal from "@/Components/Panels/Modals/Modal";
import Actions from "@/Components/UI/Actions";
import ButtonMenu from "@/Components/UI/Activo/ButtonMenu";
import Caracteristica_target from "@/Components/UI/Activo/Caracteristica_target";
import Appbar from "@/Components/UI/Appbar";
import SearchInput from "@/Components/UI/Search";
import CloneActivo from "@/Components/forms/Activo/CloneActivo";
import EditActivo from "@/Components/forms/Activo/EditActivo"; 
import ListCaracteristica from "@/Components/forms/Caracteristicas/ListCaracteristica"; 
import CreateCertificacion from "@/Components/forms/Certificaciones/CreateCertificacion";
import AsignarComponente from "@/Components/forms/Componente/AsignarComponente";
import CreateDocumento from "@/Components/forms/Documentos/CreateDocumento";
import CreateMantenimiento from "@/Components/forms/Mantenimiento/CreateMantenimiento";  
import CreateMovimiento from "@/Components/forms/Movimiento/CreateMovimiento";
import CreateOms from "@/Components/forms/Oms/CreateOms";
import { Link } from "@inertiajs/react";
import { useEffect, useState } from "react"; 
 
const ActivoPage= ({ Activo, Activos, Oms, Empresas, Caracteristicas, Tipo, Responsables, Rigs, Componentes }) => {

  const [CreateFormModal, setCreateFormModal] = useState(false)

  const [AccionesModal, setAccionesModal] = useState(false) 
  const [FormatosModal, setFormatosModal] = useState(false) 
  const [ImageModal, setImageModal] = useState(false) 
  const [ShowModal, setShowModal] = useState(false)

  function ShowActions(){
    ShowAcctionsButtons()
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

  const [AcctionsButtons, setAcctionsButtons]                       = useState(true) 
  const [EditarCaracteristicaState, setEditarCaracteristicaState]   = useState(false)
  const [EditarActivoState, setEditarActivoState]                   = useState(false)
  const [ClonarActivoState, setClonarActivoState]                   = useState(false) 
  
  function ShowAcctionsButtons(){
    setEditarCaracteristicaState(false)
    setClonarActivoState(false) 
    setEditarActivoState(false)
    setAcctionsButtons(true)
  }

  function ShowFormEditCaracteristicas(){ 
    setClonarActivoState(false)
    setEditarActivoState(false) 
    setAcctionsButtons(false)
    setEditarCaracteristicaState(true)
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

  const [MantenimientosPanel, setMantenimientosPanel] = useState(false) 
  const [DocumentosPanel, setDocumentosPanel] = useState(false)
  const [DocumentosEliminadosPanel, setDocumentosEliminadosPanel] = useState(false)
  const [CertificacionesPanel, setCertificacionesPanel] = useState(false)
  const [CertificacionesEliminadosPanel, setCertificacionesEliminadosPanel] = useState(false)
  const [ComponentesPanel, setComponentesPanel] = useState(false)
  const [GaleriaPanel, setGaleriaPanel] = useState(false)
  const [MovimientosPanel, setMovimientosPanel] = useState(false) 
     
  function ShowDefault(){
    setMantenimientosPanel(false)
    setDocumentosPanel(false)
    setDocumentosEliminadosPanel(false) 
    setCertificacionesPanel(false)
    setCertificacionesEliminadosPanel(false)
    setComponentesPanel(false)
    setGaleriaPanel(false)
    setMovimientosPanel(false)
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
      setGaleriaPanel(false)
      setMovimientosPanel(false)
      setMantenimientosPanel(true)
    }
  }

  function ShowDocumentos() {
    if(DocumentosPanel){      
      ShowDefault()
    }else{
      setGaleriaPanel(false)
      setMovimientosPanel(false) 
      setDocumentosEliminadosPanel(false) 
      setCertificacionesPanel(false)
      setCertificacionesEliminadosPanel(false)
      setComponentesPanel(false)
      setMovimientosPanel(false) 
      setMantenimientosPanel(false)
      setDocumentosPanel(true)
    }
  }

  function ShowDocumentosEliminados() {
    if(DocumentosEliminadosPanel){
      ShowDefault()
    }else{
      setGaleriaPanel(false)
      setMovimientosPanel(false) 
      setDocumentosPanel(false)
      setCertificacionesPanel(false)
      setCertificacionesEliminadosPanel(false)
      setComponentesPanel(false)
      setMovimientosPanel(false) 
      setMantenimientosPanel(false)
      setDocumentosEliminadosPanel(true) 
    }
  }

  function ShowCertificaciones() {
    if(CertificacionesPanel){
      ShowDefault()
    }else{
      setGaleriaPanel(false)
      setMovimientosPanel(false) 
      setDocumentosPanel(false)
      setDocumentosEliminadosPanel(false) 
      setCertificacionesEliminadosPanel(false)
      setComponentesPanel(false)
      setMovimientosPanel(false) 
      setMantenimientosPanel(false)
      setCertificacionesPanel(true)
    }
  }

  function ShowCertificacionesEliminadas() {
    if(CertificacionesEliminadosPanel){
      ShowDefault()
    }else{
      setGaleriaPanel(false)
      setMovimientosPanel(false) 
      setDocumentosPanel(false)
      setDocumentosEliminadosPanel(false) 
      setComponentesPanel(false)
      setMovimientosPanel(false) 
      setMantenimientosPanel(false)
      setCertificacionesPanel(false)
      setCertificacionesEliminadosPanel(true)
    }
  }

  function ShowComponentes() {
    if(ComponentesPanel){
      ShowDefault()
    }else{
      setGaleriaPanel(false)
      setMovimientosPanel(false) 
      setDocumentosPanel(false)
      setDocumentosEliminadosPanel(false) 
      setMovimientosPanel(false) 
      setMantenimientosPanel(false)
      setCertificacionesPanel(false)
      setCertificacionesEliminadosPanel(false)
      setComponentesPanel(true)
    }
  }

  function ShowMovimientos() {
    if(MovimientosPanel){
      ShowDefault()
    }else{      
      setDocumentosPanel(false)
      setDocumentosEliminadosPanel(false) 
      setCertificacionesPanel(false)
      setCertificacionesEliminadosPanel(false)
      setComponentesPanel(false)
      setGaleriaPanel(false)
      setMantenimientosPanel(false)
      setMovimientosPanel(true)
    }
  }

  function ShowGaleria(){
    if(GaleriaPanel){
      ShowDefault()
    }else{
      setDocumentosPanel(false)
      setDocumentosEliminadosPanel(false) 
      setMantenimientosPanel(false)
      setCertificacionesPanel(false)
      setCertificacionesEliminadosPanel(false)
      setComponentesPanel(false)
      setMovimientosPanel(false) 
      setGaleriaPanel(true)
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
    "value"      : Activo[0] ? Activo[0].categoria.nombre : '',
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
  },{
    "id"         : '80287512389',
    "label"      : "Galeria",
    "Myfunction" : ShowGaleria,
    "estado"     : GaleriaPanel
  }]
 
  const MantenimientosData = [];
  Activo.forEach(ActivoData => {
    ActivoData.ordenes_mantenimiento.forEach(MantenimientoData => { 
      MantenimientosData.push({
        taqom          : MantenimientoData.taqom,
        taqActivos     : MantenimientoData.taqActivos,
        responsable    : MantenimientoData.responsable.nombre,
        fechainicio    : MantenimientoData.fechainicio,
        horainicio     : MantenimientoData.horainicio,
        fechafin       : MantenimientoData.fechafin,
        horafin        : MantenimientoData.horafin,
        tipo           : MantenimientoData.tipo,
        prioridad      : MantenimientoData.prioridad,
        estado         : MantenimientoData.estado,
        descripcion    : MantenimientoData.descripcion,
        created_at     : MantenimientoData.created_at,
        updated_at     : MantenimientoData.updated_at,
      });
    });
  });

  const DocumentosData = [];
  Activo.forEach(ActivoData => { 
    ActivoData.documentos.forEach(Data => {
      DocumentosData.push({
        taqActivos : Data.taqActivos,
        taqDoc     : Data.taqDoc,
        nombre     : Data.nombre,
        DocURL     : Data.DocURL, 
      });
    });
  }); 

  const DocumentosEliminadosData = [];
  Activo.forEach(ActivoData => {
    ActivoData.documentos__eliminados.forEach(Data => {
      DocumentosEliminadosData.push({
        taqDeleteRegister : Data.taqDeleteRegister,
        taqActivos        : Data.taqActivos,
        nombreDocumento   : Data.nombreDocumento,
        Responsable       : Data.taqresponsable, 
      });
    });
  }); 

  const CertificacionesData = [];
  Activo.forEach(ActivoData => { 
    ActivoData.certificaciones.forEach(CertificacionesData => {
      CertificacionesData.push({
        taqActivos       : CertificacionesData.taqActivos,
        taqDoc           : CertificacionesData.taqDoc,
        nombre           : CertificacionesData.nombre,
        fechacertificion : CertificacionesData.fechacertificion, 
        frecuencia       : CertificacionesData.frecuencia,
        estado           : CertificacionesData.estado,
        DocURL           : CertificacionesData.DocURL, 
      });
    });
  }); 

  const CertificacionesEliminadasData = [];
  Activo.forEach(ActivoData => { 
    ActivoData.certificaciones.forEach(CertificacionesEliminadasData => {
      CertificacionesEliminadasData.push({
        taqDeleteRegister  : CertificacionesEliminadasData.taqDeleteRegister,
        taqActivos         : CertificacionesEliminadasData.taqActivos,
        nombreDocumento    : CertificacionesEliminadasData.nombreDocumento,
        Responsable        : CertificacionesEliminadasData.taqresponsable,  
      });
    });
  });

  const MovimientosData = [];
  Activo.forEach(ActivosData => {  
    ActivosData.movimiento.forEach(MovimientosData => {
      MovimientosData.push({
        taq_movimiento : MovimientosData.taq_movimiento,
        taqrig         : MovimientosData.taqrig,
        taqActivos     : MovimientosData.taqActivos,
        fechaSalida    : MovimientosData.fechaSalida, 
        fechaRetorno   : MovimientosData.fechaRetorno,
        estado         : MovimientosData.estado,
        descripcion    : MovimientosData.descripcion,
      });
    });
  }); 

  const ComponentesData = [];
  Activo.forEach(ActivosData => { 
    ActivosData.historial.forEach(HistorialData => {
      HistorialData.componente.forEach(ComponenteData => {
        ComponentesData.push({
          taqComponente: ComponenteData.taqComponente,
          categoria_id: ComponenteData.categoria_id,
          nombre: ComponenteData.nombre,
          estado: ComponenteData.estado,
          descripcion: ComponenteData.descripcion,
          serial: ComponenteData.serial,
          horasuso: ComponenteData.horasuso,
          urlImage: ComponenteData.urlImage,
        });
      });
    });
  });

  const GaleriaData = [];
  Activo.forEach(ActivosData => {  
    ActivosData.galeria.forEach(MovimientosData => {
      MovimientosData.push({
        foto_id    : MovimientosData.foto_id,
        taqActivos : MovimientosData.taqActivos,
        Image      : MovimientosData.Image, 
      });
    });
  }); 

  useEffect(() => {  
    setGaleriaFiltrados(GaleriaData)
    setCertificacionesFiltradas(CertificacionesData)
    setDocumentosFiltrados(DocumentosData)
    setDocumentosEliminadosFiltrados(DocumentosEliminadosData)
    setComponentesFiltrados(ComponentesData)
    setMantenimientosFiltrados(MantenimientosData)
  }, [Activo])

  const [MantenimientosFiltrados, setMantenimientosFiltrados] = useState();
  const FiltroMantenimiento = ( searchTerm ) => {
    const filtered = MantenimientosData.filter((data) => { 
        const taqom         = data.taqom.toLowerCase();
        const taqActivos    = data.taqActivos.toLowerCase();
        const responsable   = data.taqActivos.toLowerCase();
        const fechainicio   = data.fechainicio.toLowerCase();
        const horainicio    = data.horainicio.toLowerCase();
        const fechafin      = data.fechafin.toLowerCase();
        const horafin       = data.horafin.toLowerCase();
        const tipo          = data.tipo.toLowerCase();
        const prioridad     = data.prioridad.toLowerCase();
        const estado        = data.estado.toLowerCase();
        const descripcion   = data.descripcion.toLowerCase(); 
        return (
            taqom.includes(searchTerm)       ||
            taqActivos.includes(searchTerm)  ||
            responsable.includes(searchTerm) ||
            fechainicio.includes(searchTerm) ||
            horainicio.includes(searchTerm)  ||
            fechafin.includes(searchTerm)    ||
            horafin.includes(searchTerm)     || 
            tipo.includes(searchTerm)        ||        
            prioridad.includes(searchTerm)   ||
            estado.includes(searchTerm)      ||
            descripcion.includes(searchTerm)
        );
    });
    setMantenimientosFiltrados(filtered);
  };

  const [DocumentosFiltrados, setDocumentosFiltrados] = useState();
  const FiltroDocumentos = ( searchTerm ) => {
    const filtered = DocumentosData.filter((data) => {
        const taqActivos = data.taqActivos.toLowerCase();
        const taqDoc     = data.taqDoc.toLowerCase();
        const nombre     = data.nombre.toLowerCase();
        const DocURL     = data.DocURL.toLowerCase(); 
        return (
            taqDoc.includes(searchTerm)       ||
            taqActivos.includes(searchTerm)  ||
            nombre.includes(searchTerm) || 
            DocURL.includes(searchTerm)    
        );
    });
    setDocumentosFiltrados(filtered);
  };

  const [DocumentosEliminadosFiltrados, setDocumentosEliminadosFiltrados] = useState();
  const FiltroDocumentosEliminados = ( searchTerm ) => {
    const filtered = DocumentosEliminadosData.filter((data) => {
        const taqDeleteRegister = data.taqDeleteRegister.toLowerCase()
        const taqActivos        = data.taqActivos.toLowerCase()
        const nombreDocumento   = data.nombreDocumento.toLowerCase()
        const Responsable       = data.taqresponsable.toLowerCase() 
        return (
            taqDeleteRegister.includes(searchTerm) ||
            taqActivos.includes(searchTerm)        ||
            nombreDocumento.includes(searchTerm)   || 
            Responsable.includes(searchTerm)    
        );
    });
    setDocumentosEliminadosFiltrados(filtered);
  };

  const [CertificacionesFiltradas, setCertificacionesFiltradas] = useState();
  const FiltroCertificaciones = ( searchTerm ) => {
    const filtered = MantenimientosData.filter((data) => {
        const taqActivos       = CertificacionesData.taqActivos.toLowerCase();
        const taqDoc           = CertificacionesData.taqDoc.toLowerCase();
        const nombre           = CertificacionesData.nombre.toLowerCase();
        const fechacertificion = CertificacionesData.fechacertificion.toLowerCase(); 
        const frecuencia       = CertificacionesData.frecuencia.toLowerCase();
        const estado           = CertificacionesData.estado.toLowerCase();
        const DocURL           = CertificacionesData.DocURL.toLowerCase();
        return (
            taqDoc.includes(searchTerm)           ||
            taqActivos.includes(searchTerm)       ||
            nombre.includes(searchTerm)           || 
            DocURL.includes(searchTerm)           ||
            fechacertificion.includes(searchTerm) ||
            estado.includes(searchTerm)           ||
            frecuencia.includes(searchTerm)    
        );
    });
    setCertificacionesFiltradas(filtered);
  };

  const [CertificacionesEliminadasFiltradas, setCertificacionesEliminadasFiltradas] = useState();
  const FiltroCertificacionesEliminadas = ( searchTerm ) => {
    const filtered = MantenimientosData.filter((data) => {
        const taqDeleteRegister  = CertificacionesEliminadasData.taqDeleteRegister.toLowerCase();
        const taqActivos         = CertificacionesEliminadasData.taqActivos.toLowerCase();
        const nombreDocumento    = CertificacionesEliminadasData.nombreDocumento.toLowerCase();
        const Responsable        = CertificacionesEliminadasData.taqresponsable.toLowerCase();  
        return (
            taqDeleteRegister.includes(searchTerm) ||
            taqActivos.includes(searchTerm)        ||
            nombreDocumento.includes(searchTerm)   || 
            Responsable.includes(searchTerm)
        );
    });
    setCertificacionesEliminadasFiltradas(filtered);
  };

  
  const [MovimientosFiltrados, setMovimientosFiltrados] = useState();
  const FiltroMovimientos = ( searchTerm ) => {
    const filtered = MantenimientosData.filter((data) => { 
        const taq_movimiento = MovimientosData.taq_movimiento.toLowerCase();
        const taqrig         = MovimientosData.taqrig.toLowerCase();
        const taqActivos     = MovimientosData.taqActivos.toLowerCase();
        const fechaSalida    = MovimientosData.fechaSalida.toLowerCase(); 
        const fechaRetorno   = MovimientosData.fechaRetorno.toLowerCase();
        const estado         = MovimientosData.estado.toLowerCase();
        const descripcion    = MovimientosData.descripcion.toLowerCase(); 
        return (
            taq_movimiento.includes(searchTerm) ||
            taqActivos.includes(searchTerm)     ||
            taqrig.includes(searchTerm)         || 
            fechaSalida.includes(searchTerm)    ||
            fechaRetorno.includes(searchTerm)   || 
            estado.includes(searchTerm)         ||
            descripcion.includes(searchTerm)       
        );
    });
    setMovimientosFiltrados(filtered);
  };

  const [ComponentesFiltrados, setComponentesFiltrados] = useState();
  const FiltrarComponentes = ( searchTerm ) => {
    const filtered = ComponentesData.filter((Data) => {  
        const taqComponente = Data.taqComponente.toLowerCase();
        const categoria_id  = Data.categoria_id.toLowerCase();
        const nombre        = Data.nombre.toLowerCase(); 
        const estado        = Data.estado.toLowerCase();
        const descripcion   = Data.descripcion.toLowerCase();
        const serial        = Data.serial.toLowerCase();
        const horasuso      = Data.horasuso.toLowerCase(); 
        const urlImage      = Data.urlImage
        return (
            taqComponente.includes(searchTerm) ||
            categoria_id.includes(searchTerm)  ||
            nombre.includes(searchTerm)        ||
            estado.includes(searchTerm)        ||
            descripcion.includes(searchTerm)   ||
            serial.includes(searchTerm)        ||
            horasuso.includes(searchTerm)      ||
            urlImage.includes(searchTerm)                
        );
    });
    setComponentesFiltrados(filtered);
  };
  

  const [GaleriaFiltrados, setGaleriaFiltrados] = useState();
  const FiltrarGaleria = ( searchTerm ) => {
    const filtered = GaleriaData.filter((data) => { 
        const foto_id        = MovimientosData.foto_id.toLowerCase();
        const taqActivos     = MovimientosData.taqActivos.toLowerCase();
        const Image          = MovimientosData.Image.toLowerCase(); 
        return (
            foto_id.includes(searchTerm)    ||
            taqActivos.includes(searchTerm) ||
            Image.includes(searchTerm)               
        );
    });
    setGaleriaFiltrados(filtered);
  };
  
  Componentes
  
  const ComponentesFree = Componentes.filter(
    (ComponentesLibres) => ComponentesLibres.estado === "SIN ASIGNAR"
  );

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
            MantenimientosPanel ? (
              <div key = {`MantenimientoSectionPanel`} className='w-full h-full flex flex-col justify-start items-center justify-items-center gap-2 p-4 overflow-y-auto'>
                <div className='w-full h-auto flex flex-col sm:flex-row justify-center items-center gap-3 px-2 py-1'>
                  <SearchInput SearchFunction = { FiltroMantenimiento } />
                  <div onClick = { () => setCreateFormModal(true) } className='w-full sm:w-auto h-auto text-center flex justify-center items-center px-2 py-1 border border-black hover:border-white rounded-md text-sm bg-green-500 hover:bg-green-800 text-white cursor-pointer duration-700 ease-in-out'>
                    Agregar Nuevo Mantenimiento
                  </div> 
                </div>
                <div className={`w-full h-full flex flex-col justify-start items-center gap-2 py-1 px-4  overflow-hidden overflow-y-auto`}>
                  { 
                    MantenimientosFiltrados ? (
                      MantenimientosFiltrados.map((data) => (
                        <Link key={data.taqom} href={`/oms/${data.taqom}`} className='w-full h-auto flex  justify-between items-center bg-white border border-black px-4 py-2 cursor-pointer hover:bg-gray-800 hover:text-white transition duration-700 ease-in-out'>
                          <div className='w-full flex flex-col sm:flex-row  justify-between sm:items-center items-start'>
                              <div className='w-full sm:w-[80%] flex flex-col gap-3'>
                                  <span className={`${data.estado === 'EN PROCESO' ? 'text-red-500' : 'text-green-500' } font-semibold`}> { data.taqom } </span>
                                  <span> { data.descripcion } </span>
                              </div>
                              <div className='w-full sm:w-[20%]'>
                                  {data.responsable}
                              </div>
                          </div>
                        </Link>
                      ))
                    ) : null
                  }
                </div>
              </div>
            ) : null
          }
          {
            DocumentosPanel ? (
              <div key = {`MantenimientoSectionPanel`} className='w-full h-full flex flex-col justify-start items-center justify-items-center gap-2 p-4 overflow-y-auto'>
                <div className='w-full h-auto flex flex-col sm:flex-row justify-center items-center gap-3 px-2 py-1'>
                  <SearchInput SearchFunction = { FiltroDocumentos } />
                  <div onClick = { () => setCreateFormModal(true) } className='w-full sm:w-auto h-auto text-center flex justify-center items-center px-2 py-1 border border-black hover:border-white rounded-md text-sm bg-green-500 hover:bg-green-800 text-white cursor-pointer duration-700 ease-in-out'>
                    Agregar Nuevo Documento
                  </div> 
                </div>
                <div className={`w-full h-full flex flex-col justify-start items-center gap-2 py-1 px-4  overflow-hidden overflow-y-auto`}>
                  { 
                    DocumentosFiltrados ? (
                      DocumentosFiltrados.map((data) => (
                        <div key = { data.taqDoc } className='w-full h-auto flex  justify-between items-center bg-white border border-black px-4 py-2 cursor-pointer '>
                          <div>
                            { data.nombre }
                          </div>
                          <div className="flex gap-3">
                            <div className="w-auto h-auto px-4 py-2 text-black font-semibold transition duration-700 ease-in-out shadow-sm shadow-black hover:text-white hover:bg-green-800  bg-green-500 rounded-sm">
                              Ver
                            </div>
                            <div className="w-auto h-auto px-4 py-2 text-black font-semibold transition duration-700 ease-in-out shadow-sm shadow-black hover:text-white hover:bg-red-800  bg-red-500 rounded-sm">
                              Eliminar
                            </div>
                          </div>
                        </div>
                      ))
                    ) : null
                  }
                </div>
              </div>
            ) : null
          }
          {
            DocumentosEliminadosPanel ? (
              <div key = {`MantenimientoSectionPanel`} className='w-full h-full flex flex-col justify-start items-center justify-items-center gap-2 p-4 overflow-y-auto'>
                <div className='w-full h-auto flex flex-col sm:flex-row justify-center items-center gap-3 px-2 py-1'>
                  <SearchInput SearchFunction = { FiltroDocumentosEliminados } /> 
                </div>
                <div className={`w-full h-full flex flex-col justify-start items-center gap-2 py-1 px-4  overflow-hidden overflow-y-auto`}>
                  { 
                    DocumentosEliminadosFiltrados ? (
                      DocumentosEliminadosFiltrados.map((data) => (
                        <div key = { data.taqDeleteRegister } className='w-full h-auto flex  justify-between items-center bg-white border border-black px-4 py-2 cursor-pointer hover:bg-gray-800 hover:text-white transition duration-700 ease-in-out'>
                          { data.nombreDocumento }
                        </div>
                      ))
                    ) : null
                  }
                </div>
              </div>
            ) : null
          }
          {
            CertificacionesPanel ? (
              <div key = {`MantenimientoSectionPanel`} className='w-full h-full flex flex-col justify-start items-center justify-items-center gap-2 p-4 overflow-y-auto'>
                <div className='w-full h-auto flex flex-col sm:flex-row justify-center items-center gap-3 px-2 py-1'>
                  <SearchInput SearchFunction = { FiltroCertificaciones } />
                  <div onClick = { () => setCreateFormModal(true) } className='w-full sm:w-auto h-auto text-center flex justify-center items-center px-2 py-1 border border-black hover:border-white rounded-md text-sm bg-green-500 hover:bg-green-800 text-white cursor-pointer duration-700 ease-in-out'>
                    Agregar Nueva Certificacion
                  </div> 
                </div>
                <div className={`w-full h-full flex flex-col justify-start items-center gap-2 py-1 px-4  overflow-hidden overflow-y-auto`}>
                  { 
                    CertificacionesFiltradas ? (
                      CertificacionesFiltradas.map((data) => (
                        <div key = { data.taqDoc } className='w-full h-auto flex  justify-between items-center bg-white border border-black px-4 py-2 cursor-pointer '>
                          <div>
                            { data.nombre }
                          </div>
                          <div className="flex gap-3">
                            <div className="w-auto h-auto px-4 py-2 text-black font-semibold transition duration-700 ease-in-out shadow-sm shadow-black hover:text-white hover:bg-green-800  bg-green-500 rounded-sm">
                              Ver
                            </div>
                            <div className="w-auto h-auto px-4 py-2 text-black font-semibold transition duration-700 ease-in-out shadow-sm shadow-black hover:text-white hover:bg-red-800  bg-red-500 rounded-sm">
                              Eliminar
                            </div>
                          </div>
                        </div>
                      ))
                    ) : null
                  }
                </div>
              </div>
            ) : null
          }
          {
            CertificacionesEliminadosPanel ? (
              <div key = {`CertificacionesEliminadasSectionPanel`} className='w-full h-full flex flex-col justify-start items-center justify-items-center gap-2 p-4 overflow-y-auto'>
                <div className='w-full h-auto flex flex-col sm:flex-row justify-center items-center gap-3 px-2 py-1'>
                  <SearchInput SearchFunction = { FiltroCertificacionesEliminadas } />
                </div>
                <div className={`w-full h-full flex flex-col justify-start items-center gap-2 py-1 px-4  overflow-hidden overflow-y-auto`}>
                  { 
                    CertificacionesEliminadasFiltradas ? (
                      CertificacionesEliminadasFiltradas.map((data) => (
                        <div key = { data.taqDoc } className='w-full h-auto flex  justify-between items-center bg-white border border-black px-4 py-2 cursor-pointer hover:bg-gray-800 hover:text-white transition duration-700 ease-in-out'>
                          { data.nombre }
                        </div>
                      ))
                    ) : null
                  }
                </div>
              </div>
            ) : null
          } 
          {
            MovimientosPanel ? (
              <div key = {`CertificacionesEliminadasSectionPanel`} className='w-full h-full flex flex-col justify-start items-center justify-items-center gap-2 p-4 overflow-y-auto'>
                <div className='w-full h-auto flex flex-col sm:flex-row justify-center items-center gap-3 px-2 py-1'>
                  <SearchInput SearchFunction = { FiltroMovimientos } />
                  <div onClick = { () => setCreateFormModal(true) } className='w-full sm:w-auto h-auto text-center flex justify-center items-center px-2 py-1 border border-black hover:border-white rounded-md text-sm bg-green-500 hover:bg-green-800 text-white cursor-pointer duration-700 ease-in-out'>
                    Agregar Nuevo Movimiento
                  </div>  
                </div>
                <div className={`w-full h-full flex flex-col justify-start items-center gap-2 py-1 px-4  overflow-hidden overflow-y-auto`}>
                  { 
                    MovimientosFiltrados ? (
                      MovimientosFiltrados.map((data) => (
                        <div key = { data.taq_movimiento } className='w-full h-auto flex  justify-between items-center bg-white border border-black px-4 py-2 cursor-pointer hover:bg-gray-800 hover:text-white transition duration-700 ease-in-out'>
                          { data.taqrig }
                        </div>
                      ))
                    ) : null
                  }
                </div>
              </div>
            ) : null
          }
          {
            ComponentesPanel ? (
              <div key = {`ComponentesSectionPanel`} className='w-full h-full flex flex-col justify-start items-center justify-items-center gap-2 p-4 overflow-y-auto'>
                <div className='w-full h-auto flex flex-col sm:flex-row justify-center items-center gap-3 px-2 py-1'>
                  <SearchInput SearchFunction = { FiltrarComponentes } />
                  <div onClick = { () => setCreateFormModal(true) } className='w-full sm:w-auto h-auto text-center flex justify-center items-center px-2 py-1 border border-black hover:border-white rounded-md text-sm bg-green-500 hover:bg-green-800 text-white cursor-pointer duration-700 ease-in-out'>
                    Agregar Nuevo Componente
                  </div> 
                </div>
                <div className={`w-full h-full flex flex-col justify-start items-center gap-2 py-1 px-4  overflow-hidden overflow-y-auto`}>
                  { 
                    ComponentesFiltrados ? (
                      ComponentesFiltrados.map((data) => (
                        <div key = { data.taqom } className='w-full h-auto flex  justify-between items-center bg-white border border-black px-4 py-2 cursor-pointer hover:bg-gray-800 hover:text-white transition duration-700 ease-in-out'>
                          { data.nombre }
                        </div>
                      ))
                    ) : null
                  }
                </div>
              </div>
            ) : null
          }
          {
            GaleriaPanel ? (
              <div key = {`CertificacionesEliminadasSectionPanel`} className='w-full h-full flex flex-col justify-start items-center justify-items-center gap-2 p-4 overflow-y-auto'>
                <div className='w-full h-auto flex flex-col sm:flex-row justify-center items-center gap-3 px-2 py-1'>
                  <SearchInput SearchFunction = { FiltrarGaleria } />
                  <div onClick = { () => setCreateFormModal(true) } className='w-full sm:w-auto h-auto text-center flex justify-center items-center px-2 py-1 border border-black hover:border-white rounded-md text-sm bg-green-500 hover:bg-green-800 text-white cursor-pointer duration-700 ease-in-out'>
                    Agregar Nueva Imagen
                  </div>
                </div>
                <div className={`w-full h-full flex flex-col justify-start items-center gap-2 py-1 px-4  overflow-hidden overflow-y-auto`}>
                  { 
                    GaleriaFiltrados ? (
                      GaleriaFiltrados.map((data) => (
                        <div key = { data.foto_id } className='w-full h-auto flex  justify-between items-center bg-white border border-black px-4 py-2 cursor-pointer hover:bg-gray-800 hover:text-white transition duration-700 ease-in-out'>
                          image
                        </div>
                      ))
                    ) : null
                  }
                </div>
              </div>
            ) : null
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
                      onClose = {() => setShowModal(false)}
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
              route = {`/document/activo/`}
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
              route = {`/certificacion/activos/store`}
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
              Rigs = { Rigs }
              taqActivos = { Activo[0].taqActivos }
              onClose = { () => setCreateFormModal(false) }
            />
          ) : null 
        }
        {
          ComponentesPanel ? (
            <AsignarComponente
              Componentes = { ComponentesFree }
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