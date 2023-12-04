//Componentes de React
import React, { useEffect, useState } from 'react'

//Componentes
import ButtonMenu from '@/Components/UI/ButtonMenu';
import DownloadIcon from '@/Components/Icons/download';
import Caracteristica_target from '@/Components/UI/Activo/Caracteristica_target';
import Appbar from '@/Components/UI/Appbar';
import Panel_general from '@/Components/UI/Panel_general';
import { Link } from '@inertiajs/react';
import { Toaster, toast } from 'sonner';
import Modal from '@/Components/Panels/Modals/Modal';
import DeleteDocument from '@/Components/forms/Documentos/FormDeleteDocuments/FormDeleteDocuments';
import DeleteCertificacion from '@/Components/forms/Certificacion/FormDeleteCertificacion/FormDeleteCertificacion';
import CheckIcon from '@/Components/Icons/check';
import Actions from '@/Components/UI/Activo/Actions';

const ActivoPage= ({ Activo, Activos, Areas, oms, Empresas, status, error, Caracteristicas, Tipo, Responsables, Mantenimientos, Componentes }) => {
    
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

  const [Default, setDefault] = useState(true)
  const [CloseMenu, setCloseMenu] = useState(true)

  const [Panel_Actividades, setPanel_Actividades] = useState(false)
  const [Panel_Mantenimientos_Correctivos, setPanel_Mantenimientos_Correctivos] = useState(false)
  const [Panel_Mantenimientos_Preventivos, setPanel_Mantenimientos_Preventivos] = useState(false)
  const [Panel_Documentos, setPanel_Documentos] = useState(false)
  const [Panel_Documentos_Eliminados, setPanel_Documentos_Eliminados] = useState(false)
  const [Panel_Certificaciones, setPanel_Certificaciones] = useState(false)
  const [Panel_Certificaciones_Eliminadas, setPanel_Certificaciones_Eliminadas] = useState(false)
  const [PanelComponentes, setPanelComponentes] = useState(false)
  const [Panel_Movimientos, setPanel_Movimientos] = useState(false)
  const [TaqDocument, setTaqDocument] = useState()
  const [TaqCertificado, setTaqCertificado] = useState()
  
  const [MttoSelected, setMttoSelected] = useState(true)
  const [TaqMtto, setTaqMtto] = useState()

  //Modals
  const [ModalActions, setModalActions] = useState(false)
  const [ShowModalDocs, setShowModalDocs] = useState(false)
  const [DocSelected, setDocSelected] = useState({
    nombre:'',
    url:'',
    taqDoc:''
  })

  const [ShowModalCerts, setShowModalCerts] = useState(false)
  const [CertSelected, setCertSelected] = useState({
    nombre:'',
    url:'',
    taqDoc:''
  })
  const [DeleteDocuments, setDeleteDocuments] = useState(false)
  const [DeleteCertificado, setDeleteCertificado] = useState(false)
  const [ReturnActivo, setReturnActivo] = useState(false)
  const [ModalFormats, setModalFormats] = useState(false)
  const [ModalImage, setModalImage] = useState(false)

  function onClose(){
    setModalActions(false)
  }

  function Enabled_Actions() {
    setModalFormats(false)
    setModalActions(true)
  }

  function Enabled_Formats() {
    setModalActions(false)
    setModalFormats(true)
  }

  function ShowDefault(){
    setDefault(true)
    setPanel_Actividades(false)
    setPanel_Mantenimientos_Correctivos(false)
    setPanel_Mantenimientos_Preventivos(false)
    setPanelComponentes(false)
    setPanel_Documentos(false)
    setPanel_Documentos_Eliminados(false)
    setPanel_Certificaciones(false)
    setPanel_Certificaciones_Eliminadas(false)
    setPanel_Movimientos(false)
  }
  
  function Show_Actividades() {
    if(Panel_Actividades){
      ShowDefault()
    }else{
      setDefault(false)
      setPanel_Documentos(false)
      setPanel_Documentos_Eliminados(false)
      setPanel_Certificaciones(false)
      setPanelComponentes(false)
      setPanel_Mantenimientos_Correctivos(false)
      setPanel_Mantenimientos_Preventivos(false)
      setPanel_Certificaciones_Eliminadas(false)
      setPanel_Movimientos(false)
      setPanel_Actividades(true)
    }
  }

  function Show_Mantenimientos_Correctivo() {
    if(Panel_Mantenimientos_Correctivos){      
      ShowDefault()
    }else{
      setDefault(false)
      setPanel_Documentos(false)
      setPanel_Documentos_Eliminados(false)
      setPanel_Certificaciones(false)
      setPanel_Certificaciones_Eliminadas(false)
      setPanel_Actividades(false)
      setPanelComponentes(false)
      setPanel_Mantenimientos_Preventivos(false)
      setPanel_Mantenimientos_Correctivos(true)
    }
  }

  function Show_Mantenimientos_Preventivo() {
    if(Panel_Mantenimientos_Preventivos){
      ShowDefault()
    }else{
      setDefault(false)
      setPanel_Documentos(false)
      setPanel_Documentos_Eliminados(false)
      setPanel_Certificaciones(false)
      setPanel_Certificaciones_Eliminadas(false)
      setPanelComponentes(false)
      setPanel_Actividades(false)
      setPanel_Mantenimientos_Correctivos(false)
      setPanel_Mantenimientos_Preventivos(true)
    }
  }

  function Show_Documentos() {
    if(Panel_Documentos){
      ShowDefault()
    }else{
      setDefault(false)
      setPanel_Documentos_Eliminados(false)
      setPanel_Certificaciones(false)
      setPanel_Certificaciones_Eliminadas(false)
      setPanelComponentes(false)
      setPanel_Movimientos(false)
      setPanel_Actividades(false)
      setPanel_Mantenimientos_Correctivos(false)
      setPanel_Mantenimientos_Preventivos(false)
      setPanel_Documentos(true)
    }
  }

  function Show_Documentos_Eliminados() {
    if(Panel_Documentos_Eliminados){
      ShowDefault()
    }else{
      setDefault(false)
      setPanel_Documentos(false)
      setPanel_Certificaciones(false)
      setPanel_Certificaciones_Eliminadas(false)
      setPanel_Actividades(false)
      setPanel_Mantenimientos_Correctivos(false)
      setPanelComponentes(false)
      setPanel_Mantenimientos_Preventivos(false)
      setPanel_Movimientos(false)
      setPanel_Documentos_Eliminados(true)
    }
  }

  function ShowCertificaciones() {
    if(Panel_Certificaciones){
      ShowDefault()
    }else{
      setDefault(false)
      setPanel_Documentos(false)
      setPanel_Certificaciones_Eliminadas(false)
      setPanel_Actividades(false)
      setPanel_Mantenimientos_Correctivos(false)
      setPanelComponentes(false)
      setPanel_Mantenimientos_Preventivos(false)
      setPanel_Movimientos(false)
      setPanel_Documentos_Eliminados(false)
      setPanel_Certificaciones(true)
    }
  }

  function ShowCertificacionesEliminadas() {
    if(Panel_Certificaciones_Eliminadas){
      ShowDefault()
    }else{
      setDefault(false)
      setPanel_Documentos(false)
      setPanel_Actividades(false)
      setPanel_Mantenimientos_Correctivos(false)
      setPanel_Mantenimientos_Preventivos(false)
      setPanelComponentes(false)
      setPanel_Movimientos(false)
      setPanel_Documentos_Eliminados(false)
      setPanel_Certificaciones(false)
      setPanel_Certificaciones_Eliminadas(true)
    }
  }

  function ShowMovimientos() {
    if(Panel_Movimientos){
      ShowDefault()
    }else{
      setDefault(false)
      setPanel_Documentos(false)
      setPanel_Actividades(false)
      setPanel_Mantenimientos_Correctivos(false)
      setPanel_Mantenimientos_Preventivos(false)
      setPanel_Documentos_Eliminados(false)
      setPanel_Certificaciones(false)
      setPanelComponentes(false)
      setPanel_Certificaciones_Eliminadas(false)
      setPanel_Movimientos(true)
    }
  }

  function ShowComponentes() {
    if(PanelComponentes){
      ShowDefault()
    }else{
      setDefault(false)
      setPanel_Documentos(false)
      setPanel_Actividades(false)
      setPanel_Mantenimientos_Correctivos(false)
      setPanel_Mantenimientos_Preventivos(false)
      setPanel_Documentos_Eliminados(false)
      setPanel_Certificaciones(false)
      setPanel_Certificaciones_Eliminadas(false)
      setPanel_Movimientos(false)
      setPanelComponentes(true)
    }
  }

  function OpenDoc(data){
    setShowModalDocs(true)
    setDocSelected({
      nombre:data.nombre,
      url:data.DocURL,
      taqDoc:data.taqDoc
    })
  }

  const Data = [{  
    "id"         : '623026548',
    "nombre"     : "DESCRIPCION",
    "value"      : Activo[0] ? Activo[0].descripcion : '',
  },{  
    "id"         : '807708498',
    "nombre"     : "EMPRESA",
    "value"      : "Gworks Services",
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
      "Myfunction" : Show_Actividades,
      "estado"     : Panel_Actividades
  },{
      "id"         : '4873483',
      "label"      : "Mantenimientos Preventivos",
      "Myfunction" : Show_Mantenimientos_Preventivo,
      "estado"     : Panel_Mantenimientos_Preventivos
  },{
      "id"         : '030963498',
      "label"      : "Mantenimientos Correctivos",
      "Myfunction" : Show_Mantenimientos_Correctivo,
      "estado"     : Panel_Mantenimientos_Correctivos
  },{
      "id"         : '79235457',
      "label"      : "Documentos",
      "Myfunction" : Show_Documentos,
      "estado"     : Panel_Documentos
  },{
      "id"         : '8842172',
      "label"      : "Documentos Eliminados",
      "Myfunction" : Show_Documentos_Eliminados,
      "estado"     : Panel_Documentos_Eliminados
  },{
      "id"         : '73286369',
      "label"      : "Certificaciones",
      "Myfunction" : ShowCertificaciones,
      "estado"     : Panel_Certificaciones
  },{
      "id"         : '71592218',
      "label"      : "Certificaciones Eliminadas",
      "Myfunction" : ShowCertificacionesEliminadas,
      "estado"     : Panel_Certificaciones_Eliminadas
  },{
      "id"         : '95531561',
      "label"      : "Movimientos",
      "Myfunction" : ShowMovimientos,
      "estado"     : Panel_Movimientos
  },{
      "id"         : '80287589',
      "label"      : "Componentes",
      "Myfunction" : ShowComponentes,
      "estado"     : PanelComponentes
  }]

  const ActividadesData = [];
  Activo.forEach(Activo => {
    Activo.mantenimientos.forEach(data => {
      ActividadesData.push({
       taqom      :data.taqot,
        descripcion:data.descripcion,
      });
    });
  });

  useEffect(() => {  
    setActividadesDataFiltrados(ActividadesData)
  }, [Activo])
  
  const [ActividadesDataFiltrados, setActividadesDataFiltrados] = useState();
  const FilterActividades = ( searchTerm ) => {
    const filtered = DocumentosData.filter((data) => {
        consttaqom        = data.taqot.toLowerCase();
        const descripcion  = data.descripcion.toLowerCase();
        return (
           taqom.includes(searchTerm) || descripcion.includes(searchTerm)  
        );
    });
    setActividadesDataFiltrados(filtered);
  };
  
  const DocumentosData = [];
  Activo.forEach(Activo => {
    Activo.documentos.forEach(documentos => {
      DocumentosData.push({
        taqActivos : documentos.taqActivos,
        taqDoc : documentos.taqDoc,
        nombre: documentos.nombre,
        DocURL: documentos.DocURL,
        created_at: documentos.created_at,
        updated_at: documentos.updated_at,
      });
    });
  });

  useEffect(() => {  
    setDocumentosFiltrados(DocumentosData)
  }, [Activo])
  
  const [DocumentosFiltrados, setDocumentosFiltrados] = useState();
  const FilterDocuments = ( searchTerm ) => {
    const filtered = DocumentosData.filter((data) => {
        const taqActivos  = data.taqActivos.toLowerCase();
        const taqDoc      = data.taqDoc.toLowerCase();
        const nombre      = data.nombre.toLowerCase();
        const DocURL      = data.DocURL.toLowerCase();
        const created_at  = data.created_at.toLowerCase();
        const updated_at  = data.updated_at.toLowerCase();
        return (
            taqActivos.includes(searchTerm)  ||
            taqDoc.includes(searchTerm)      ||
            nombre.includes(searchTerm)      ||
            DocURL.includes(searchTerm)      ||
            created_at.includes(searchTerm)  ||
            updated_at.includes(searchTerm) 
        );
    });
    setDocumentosFiltrados(filtered);
  };

  const DocumentosEliminadosData = [];
  Activo.forEach(Activo => {
    Activo.documentos__eliminados.forEach(documentos => {
      DocumentosEliminadosData.push({
        taqDeleteRegister : documentos.taqDeleteRegister,
        taqActivos        : documentos.taqActivos ,
        nombreDocumento   : documentos.nombreDocumento,
        responsable       : `${documentos.responsable.nombre}`,
        created_at        : documentos.created_at,
        updated_at        : documentos.updated_at,
      });
    });
  });

  useEffect(() => {  
    setDocumentosEliminadosFiltrados(DocumentosEliminadosData)
  }, [Activo])
  
  const [DocumentosEliminadosFiltrados, setDocumentosEliminadosFiltrados] = useState();
  const FilterDocumentsEliminados = ( searchTerm ) => {
    const filtered = DocumentosData.filter((data) => {
        const taqDeleteRegister  = data.taqDeleteRegister.toLowerCase();
        const taqActivos         = data.taqActivos.toLowerCase();
        const nombreDocumento    = data.nombreDocumento.toLowerCase();
        const responsable        = data.responsable.toLowerCase();
        return (
            taqDeleteRegister.includes(searchTerm)  ||
            taqActivos.includes(searchTerm)         ||
            nombreDocumento.includes(searchTerm)    ||
            responsable.includes(searchTerm)     
        );
    });
    setDocumentosEliminadosFiltrados(filtered);
  };

  const CertificacionesData = [];
  Activo.forEach(Activo => {
    Activo.certificaciones.forEach(data => {
      const fechaActual = new Date();
      const fechaActualMinus1 = new Date();
      const [dia, mes, año] = data.frecuencia.split('-');
      const frecuencia = new Date(`${año}-${mes}-${dia}`);
      fechaActualMinus1.setMonth(fechaActual.getMonth() - 1)
      if(data.estado === 'VIGENTE'){
        if(fechaActual > frecuencia){
          data.estado = 'CADUCADO'
        }
        if(fechaActual === frecuencia){
          data.estado = 'ULTIMO DIA DE VIGENCIA'
        }
        if(fechaActual === fechaActualMinus1){
          data.estado = 'A 1 MES DE CADUCAR'
        }
      }
      CertificacionesData.push({
        taqDoc           : data.taqDoc,
        nombre           : data.nombre,
        fechacertificion : data.fechacertificion,
        frecuencia       : data.frecuencia,
        estado           : data.estado,
        DocURL           : data.DocURL
      });
    });
  });

  useEffect(() => {  
    setCertificacionesDataFiltrados(CertificacionesData)
  }, [Activo])
  
  const [CertificacionesDataFiltrados, setCertificacionesDataFiltrados] = useState();
  const FilterCertificaciones = ( searchTerm ) => {
    const filtered = CertificacionesData.filter((data) => {
        const taqDoc           = data.taqDoc.toLowerCase();
        const nombre           = data.nombre.toLowerCase();
        const fechacertificion = data.fechacertificion.toLowerCase();
        const frecuencia       = data.frecuencia.toLowerCase();
        const estado           = data.estado.toLowerCase();
        const DocURL           = data.DocURL.toLowerCase();
        return (
          taqDoc.includes(searchTerm)           ||
          nombre.includes(searchTerm)           ||
          fechacertificion.includes(searchTerm) ||
          frecuencia.includes(searchTerm)       ||
          estado.includes(searchTerm)           ||
          DocURL.includes(searchTerm) 
        );
    });
    setCertificacionesDataFiltrados(filtered);
  };

  const CertificacionesEliminadasData = [];
  Activo.forEach(Activo => {
    Activo.certificaciones__eliminadas.forEach(data => {
      CertificacionesEliminadasData.push({
        taqDeleteRegister : data.taqDeleteRegister ,
        taqActivos        : data.taqActivos ,
        nombreDocumento   : data.nombreDocumento,
        responsable       : `${data.responsable.nombre}`,
        estado            : data.estado,
        DocURL            : data.DocURL
      });
    });
  });

  useEffect(() => {  
    setCertificacionesEliminadasDataFiltrados(CertificacionesEliminadasData)
  }, [Activo])
  
  const [CertificacionesEliminadasDataFiltrados, setCertificacionesEliminadasDataFiltrados] = useState();
  const FilterCertificacionesEliminadas = ( searchTerm ) => {
    const filtered = CertificacionesEliminadasData.filter((data) => {
        const taqDeleteRegister    = data.taqDeleteRegister.toLowerCase();
        const taqActivos           = data.taqActivos.toLowerCase();
        const nombreDocumento      = data.nombreDocumento.toLowerCase();
        const responsable          = data.responsable.toLowerCase();
        const estado               = data.estado.toLowerCase();
        const DocURL               = data.DocURL.toLowerCase();
        return (
          taqDeleteRegister.includes(searchTerm)  ||
          taqActivos.includes(searchTerm)         ||
          nombreDocumento.includes(searchTerm)    ||
          responsable.includes(searchTerm)     ||
          estado.includes(searchTerm)             ||
          DocURL.includes(searchTerm) 
        );
    });
    setCertificacionesEliminadasDataFiltrados(filtered);
  };

  const MovimientosData = [];
  Activo.forEach(Activo => {
    Activo.movimiento.forEach(data => {
      MovimientosData.push({
        taqmovactivs : data.taqmovactivs,
        taqActivos   : data.taqActivos,
       taqom        : data.taqot,
        taqempresa   : data.taqempresa,
        empresa      : data.empresa.nombre,
        fechaSalida  : data.fechaSalida,
        fechaRetorno : data.fechaRetorno,
        estado       : data.estado,
        ubicacion    : data.ubicacion,
        descripcion  : data.descripcion,
      });
    });
  });

  useEffect(() => {  
    setMovimientossDataFiltrados(MovimientosData)
  }, [Activo])
  
  const [MovimientossDataFiltrados, setMovimientossDataFiltrados] = useState();
  const FilterMovimientos = ( searchTerm ) => {
    const filtered = MovimientosData.filter((data) => {
        const taqmovactivs   = data.taqmovactivs.toLowerCase();
        const taqActivos     = data.taqActivos.toLowerCase();
        consttaqom          = data.taqot.toLowerCase();
        const taqempresa     = data.taqempresa.toLowerCase();
        const empresa        = data.empresa.toLowerCase();
        const fechaSalida    = data.fechaSalida.toLowerCase();
        const fechaRetorno   = data.fechaRetorno.toLowerCase();
        const estado         = data.estado.toLowerCase();
        const ubicacion      = data.ubicacion.toLowerCase();
        const descripcion    = data.descripcion.toLowerCase();
        return (
          taqmovactivs.includes(searchTerm)  ||
          taqActivos.includes(searchTerm)    ||
         taqom.includes(searchTerm)         ||
          taqempresa.includes(searchTerm)    ||
          empresa.includes(searchTerm)       ||
          fechaSalida.includes(searchTerm)   ||
          fechaRetorno.includes(searchTerm)  ||
          estado.includes(searchTerm)        ||
          ubicacion.includes(searchTerm)     ||
          descripcion.includes(searchTerm)       
        );
    });
    setMovimientossDataFiltrados(filtered);
  };

  const MttoCorrectivoData = [];
  Activo.forEach(Activo => {
    Activo.mantenimientos__correctivos.forEach(data => {
      MttoCorrectivoData.push({
        taqmttActivo   : data.taqmttActivo,
        actividad      : data.actividad,
        taqActivos     : data.taqActivos,
        area           : data.area,
        preoperacional : data.preoperacional,
        taqresponsable : data.taqresponsable,
        responsable    : `${data.responsable.primernombre}  ${data.responsable.segundonombre ? data.responsable.segundonombre : ''}  ${data.responsable.primerapellido} ${data.responsable.segundoapellido ? data.responsable.segundoapellido : ''}`,
        estado         : data.estado,
        fecha          : data.fecha,
        fechaFin       : data.fechaFin,
      });
    });
  });

  useEffect(() => {  
    setMantenimientoCorrectivoDataFiltrados(MttoCorrectivoData)
  }, [Activo])
  
  const [MantenimientoCorrectivoDataFiltrados, setMantenimientoCorrectivoDataFiltrados] = useState();
  const FilterMttoCorrectivo = ( searchTerm ) => {
    const filtered = MttoCorrectivoData.filter((data) => {
        const taqmttActivo   = data.taqmttActivo.toLowerCase();
        const actividad      = data.actividad.toLowerCase();
        const taqActivos     = data.taqActivos.toLowerCase();
        const area           = data.area.toLowerCase();
        const preoperacional = data.preoperacional.toLowerCase();
        const taqresponsable = data.taqresponsable.toLowerCase();
        const responsable    = data.responsable.toLowerCase();
        const fecha          = data.fecha.toLowerCase();
        const fechaFin       = data.fechaFin.toLowerCase();
        return (
          taqmttActivo.includes(searchTerm)   ||
          actividad.includes(searchTerm)      ||
          taqActivos.includes(searchTerm)     ||
          area.includes(searchTerm)           ||
          responsable.includes(searchTerm)    ||
          preoperacional.includes(searchTerm) ||
          taqresponsable.includes(searchTerm) ||
          fecha.includes(searchTerm)          ||
          fechaFin.includes(searchTerm)    
        );
    });
    setMantenimientoCorrectivoDataFiltrados(filtered);
  };

  const ComponentesData = [];
  Activo.forEach(Activo => {
    Activo.componente.forEach(data => {
      ComponentesData.push({
        taqComponente : data.taqComponente, 
        nombre        : data.componente[0].nombre, 
      });
    });
  });

  useEffect(() => {  
    setComponentesDataFiltrados(ComponentesData)
  }, [Activo])
  
  const [ComponentesDataFiltrados, setComponentesDataFiltrados] = useState();
  const FilterComponentes = ( searchTerm ) => {
    const filtered = ComponentesData.filter((data) => {
        const taqComponente = data.taqComponente.toLowerCase();
        const nombre        = data.nombre.toLowerCase();
        return (
          taqComponente.includes(searchTerm)  ||
          nombre.includes(searchTerm)         
        );
    });
    setComponentesDataFiltrados(filtered);
  };

  const MttoPreventivoData = [];
  Activo.forEach(Activo => {
    Activo.mantenimientos__preventivos.forEach(data => {
      MttoPreventivoData.push({
        taqmttActivo    : data.taqmttActivo,
        taqManto        : data.taqManto,
        actividad       : data.actividad,
        taqActivos      : data.taqActivos,
        taqresponsable  : data.taqresponsable,
        responsable     : `${data.responsable.primernombre}  ${data.responsable.segundonombre ? data.responsable.segundonombre : ''}  ${data.responsable.primerapellido} ${data.responsable.segundoapellido ? data.responsable.segundoapellido : ''}`,
        area            : data.area,
        cantDocs        : data.cantDocs,
        estado          : data.estado,
        fecha           : data.fecha,
        fechaFin        : data.fechaFin,
      });
    });
  });

  useEffect(() => {  
    setMantenimientoPreventivoDataFiltrados(MttoPreventivoData)
  }, [Activo])
  
  const [MantenimientoPreventivoDataFiltrados, setMantenimientoPreventivoDataFiltrados] = useState();
  const FilterMttoPreventivo = ( searchTerm ) => {
    const filtered = MttoPreventivoData.filter((data) => {
        const taqmttActivo   = data.taqmttActivo.toLowerCase();
        const taqManto       = data.taqManto.toLowerCase();
        const actividad      = data.actividad.toLowerCase();
        const taqActivos     = data.taqActivos.toLowerCase();
        const taqresponsable = data.taqresponsable.toLowerCase();
        const responsable    = data.responsable.toLowerCase();
        const area           = data.area.toLowerCase();
        const cantDocs       = data.cantDocs.toLowerCase();
        const estado         = data.estado.toLowerCase();
        const fecha          = data.fecha.toLowerCase();
        const fechaFin       = data.fechaFin.toLowerCase();
        return (
          taqmttActivo.includes(searchTerm)   ||
          taqManto.includes(searchTerm)       ||
          actividad.includes(searchTerm)      ||
          taqActivos.includes(searchTerm)     ||
          taqresponsable.includes(searchTerm) ||
          responsable.includes(searchTerm)    ||
          area.includes(searchTerm)           ||
          cantDocs.includes(searchTerm)       ||
          estado.includes(searchTerm)         ||
          fecha.includes(searchTerm)          ||
          fechaFin.includes(searchTerm)    
        );
    });
    setMantenimientoPreventivoDataFiltrados(filtered);
  };

  return (
    <main className='w-full h-screen flex flex-col justify-start items-center justify-items-center'>
      <Appbar
        id               = { Activo[0].taqActivos }
        nombre           = { Activo[0].nombre }
        setModalState    = { setModalImage }
        modal            = { ModalImage }
        functionActions  = { Enabled_Actions }
        functionFormats  = { Enabled_Formats }
        setAcctionState  = { setModalActions }
        childrenAcction  = { 
          <Actions 
            Activo={Activo} 
            Activos={Activos} 
            Areas={Areas} 
            Caracteristicas={Activo[0].caracteristicas} 
            Componentes={Componentes} 
            Empresas={Empresas} 
            Mantenimientos={Mantenimientos} 
            Responsables={Responsables} 
            Tipo={Tipo} 
          /> 
        }
        childrenFormats  = { <>asd</> }
        acctions         = { ModalActions }
        formats          = { ModalFormats }
        setFormatState   = { setModalFormats}
        taq              = { Activo[0].taqActivos }
        serial           = { Activo[0].serial }
        urlImage         = { Activo[0].urlImage }
        key              = { '63335' }
      />
      <div className='w-full  h-auto flex flex-col lg:flex-row justify-center items-center justify-items-center  '>
        <div className={`grid grid-cols-1 w-full ${ CloseMenu ? 'lg:w-[25%]' : 'lg:w-0' }  md:flex flex-col justify-start items-start justify-items-center  h-full`}>
          <div className='flex  justify-between items-center lg:hidden w-full h-auto   px-4 py-2'>
            <span className='text-2xl text-center font-semibold'>
              Caracteristicas
            </span>
            <div onClick={ () => setCloseMenu(!CloseMenu)} className='w-auto h-auto px-4 py-2 bg-green-500 hover:bg-green-800 text-black hover:text-white transition duration-700 ease-in-out font-semibold rounded-md  cursor-pointer '>
              {
                CloseMenu ? (
                  <span> Ocultar </span>
                ) : (
                  <span> Ver </span>
                )
              }
            </div>
          </div>
          {
            CloseMenu ? (
              <div className='w-full   flex flex-col gap-3 px-4 py-2'>
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
            ) : null
          }
          <div className='w-full   grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  lg:hidden px-4 py-2  gap-3  h-full  rounded-md '>
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
        </div>
        <div className='w-full h-full  flex justify-start items-center justify-items-center gap-3'>
          <div className='hidden lg:flex flex-col px-4 py-2 justify-start items-center justify-items-center gap-3 w-auto h-full  rounded-md '>
            {
              Buttons ? (
                Buttons.map( (data) => (
                  <ButtonMenu
                    children={<></>}
                    Myfunction = { data.Myfunction }
                    label = { data.label }
                    estado = { data.estado }
                    key = { data.id } 
                  />
                ))
              ) : null
            }
          </div>
          <div className='w-full h-full'>
            {
              Default ? (
                  <div className='w-full h-full px-4 py-2 flex  justify-center items-center justify-items-center '>
                      
                  </div> 
              ) : null
            }
            {
              Panel_Actividades ? (
                <Panel_general FunctionfilterData = { FilterActividades } key = { 136366 } >
                  {
                      ActividadesDataFiltrados ? (
                          ActividadesDataFiltrados.reverse().map( (data) => (
                            <Link href={`/oms/${data.taqot}`} className='w-full h-[50px] flex justify-between items-center border border-black px-4 py-2 cursor-pointer hover:bg-gray-800 hover:text-white transition duration-700 ease-in-out'>
                              <span> { data.taqot } </span>
                              <span> { data.descripcion } </span>
                            </Link>
                          ))
                      ) : null
                  }
                </Panel_general>
              ) : null
            }
            {
              Panel_Documentos ? (
                <Panel_general FunctionfilterData = { FilterDocuments } key={120398} >
                  {
                      DocumentosFiltrados ? (
                          DocumentosFiltrados.reverse().map( (data) => (
                            <div key = { data.taqDoc } className='w-full h-auto flex flex-col gap-3 sm:flex-row justify-between items-center border border-black px-4 py-2 cursor-pointer hover:bg-gray-800 hover:text-white transition duration-700 ease-in-out'>
                              <div className='w-full sm:w-1/2  flex justify-start items-center h-full'>
                                { data.nombre }
                              </div>
                              <div className='w-full sm:w-1/2  flex justify-start sm:justify-end items-center h-full gap-3'>
                                <div onClick={ () => OpenDoc(data) } className='w-auto h-full bg-green-500 px-4 py-2  text-white hover:bg-green-800 hover:border-white transition duration-700 ease-in-out cursor-pointer'>
                                  Ver
                                </div>
                                <div onClick = { () => {
                                  setTaqDocument(data.taqDoc)
                                  setDeleteDocuments(true)
                                } } className='w-auto h-full bg-red-500 px-4 py-2  text-white hover:bg-red-800 hover:border-white transition duration-700 ease-in-out cursor-pointer'>
                                  Eliminar
                                </div>
                              </div>
                            </div>
                          ))
                      ) : null
                  }
                  <Modal
                    isVisible = { DeleteDocuments }
                    onClose   = { () => setDeleteDocuments(false) }
                    tittle    = {`ADVERTENCIA`}
                  >
                    <DeleteDocument 
                      onClose = { () => setDeleteDocuments(false) }
                      taqDoc  = { TaqDocument }
                    />
                  </Modal>
                </Panel_general>
              ) : null
            } 
            {
              Panel_Documentos_Eliminados ? (
                <Panel_general FunctionfilterData = { FilterDocumentsEliminados } key={30558}>
                  {
                      DocumentosEliminadosFiltrados ? (
                          DocumentosEliminadosFiltrados.reverse().map( (data) => (
                            <div key = { data.taqDoc } className='w-full h-auto flex flex-col sm:flex-row justify-between items-center border border-black px-4 py-2 cursor-pointer hover:bg-gray-800 hover:text-white transition duration-700 ease-in-out'>
                              <div className='w-full sm:w-1/2  flex justify-start items-center h-full'>
                                { data.nombreDocumento }
                              </div>
                              <div className='w-full sm:w-1/2  flex justify-start sm:justify-end items-center h-full gap-3'>
                                { data.responsable }
                              </div>
                            </div> 
                          ))
                      ) : null
                  }
                </Panel_general>
              ) : null
            } 
            {
              Panel_Certificaciones ? (
                <Panel_general FunctionfilterData = { FilterCertificaciones } key={98989} >
                  <div className='hidden sm:flex w-full h-auto px-4 py-2 justify-center items-center gap-3 bg-[#385449]'>
                    <div className='w-1/5 flex justify-center items-center text-white '>
                      Certificacion
                    </div>
                    <div className='w-1/5 flex justify-center items-center text-white '>
                      Fecha de ultima renovacion
                    </div>
                    <div className='w-1/5 flex justify-center items-center text-white '>
                      Fecha Proxima renovacion
                    </div>
                    <div className='w-1/5 flex justify-center items-center text-white '>
                      Estado
                    </div>
                    <div className='w-1/5 flex justify-center items-center text-white '>
                      Acciones
                    </div>
                  </div>
                  {
                      CertificacionesDataFiltrados ? (
                          CertificacionesDataFiltrados.reverse().map( (data) => (
                            <div key={data.taqDoc} className={`${data.estado === 'CADUCADO' ? 'bg-red-500 text-white' : data.estado === 'POR CADUCAR' ? 'bg-yellow-500 text-black font-semibold' : 'bg-white text-black'} w-full h-auto flex flex-col sm:flex-row gap-2 justify-between items-center border border-black px-4 py-2`}>
                              <span className='w-full sm:w-1/5 h-auto flex justify-start items-center px-2   overflow-x-hidden'> { data.nombre } </span>
                              <span className='w-full sm:w-1/5 h-auto flex justify-start sm:justify-center items-center'> { data.fechacertificion } </span>
                              <span className='w-full sm:w-1/5 h-auto flex justify-start sm:justify-center items-center'> { data.frecuencia } </span>
                              <span className='w-full sm:w-1/5 h-auto flex justify-start sm:justify-center items-center'> { data.estado } </span>
                              <div className='w-full sm:w-1/5 h-auto flex  justify-start sm:justify-end items-center gap-2'>
                                {
                                  data.estado != 'VIGENTE' ? (
                                    <div onClick={ () => OpenDoc(data) } className='w-auto h-auto bg-green-500 px-1 py-1  rounded-full text-white hover:bg-green-800 border border-white transition duration-700 ease-in-out cursor-pointer'>
                                      <CheckIcon color={`#fff`} height = { 30 } width = { 30 }/>
                                    </div>
                                  ) : null
                                }
                                <div onClick={ () => OpenDoc(data) } className='w-auto h-auto bg-green-500 px-4 py-2  rounded-md text-white hover:bg-green-800 border border-white transition duration-700 ease-in-out cursor-pointer'>
                                  Ver
                                </div>
                                <div onClick = { () => {
                                  setTaqCertificado(data.taqDoc)
                                  setDeleteCertificado(true)
                                } } className='w-auto h-full bg-red-500 px-4 py-2  rounded-md text-white hover:bg-red-800 border border-white transition duration-700 ease-in-out cursor-pointer'>
                                  Eliminar
                                </div>
                              </div>
                            </div>
                          ))
                      ) : null
                  }
                  <Modal
                    isVisible = { DeleteCertificado }
                    onClose   = { () => setDeleteCertificado(false) }
                    tittle    = {`ADVERTENCIA`}
                  >
                    <DeleteCertificacion 
                      onClose = { () => setDeleteCertificado(false) }
                      TaqDoc  = { TaqCertificado }
                    />
                  </Modal>
                </Panel_general>
              ) : null
            }
            {
              Panel_Certificaciones_Eliminadas ? (
                <Panel_general FunctionfilterData = { FilterCertificacionesEliminadas } key={ 67588 }>
                    <div className='hidden sm:flex w-full h-auto px-4 py-2  justify-center items-center gap-3 bg-[#385449]'>
                      <div className='w-1/5 flex justify-center items-center text-white '>
                        Certificacion
                      </div>
                      <div className='w-1/5 flex justify-center items-center text-white '>
                        Fecha de ultima renovacion
                      </div>
                      <div className='w-1/5 flex justify-center items-center text-white '>
                        Fecha Proxima renovacion
                      </div>
                      <div className='w-1/5 flex justify-center items-center text-white '>
                        Estado
                      </div>
                      <div className='w-1/5 flex justify-center items-center text-white '>
                        Acciones
                      </div>
                    </div>
                  {
                      CertificacionesEliminadasDataFiltrados ? (
                          CertificacionesEliminadasDataFiltrados.reverse().map( (data) => (
                            <div key = { data.taqDoc } className='w-full h-auto flex flex-col sm:flex-row justify-between items-center border border-black px-4 py-2 cursor-pointer hover:bg-gray-800 hover:text-white transition duration-700 ease-in-out'>
                              <div className='w-full sm:w-1/2 flex justify-start items-center h-full'>
                                { data.nombreDocumento }
                              </div>
                              <div className='w-full sm:w-1/2 flex justify-start sm:justify-end items-center h-full gap-3'>
                                { data.responsable }
                              </div>
                            </div>
                          ))
                      ) : null
                  }
                </Panel_general>
              ) : null
            }
            {
              Panel_Movimientos ? (
                <Panel_general FunctionfilterData = { FilterMovimientos } key={117437} >
                  <div className='hidden sm:flex w-full h-[50px]  justify-between items-center border bg-[#385449] text-white border-black px-4 py-2'>
                    <span className='w-1/6 flex justify-center items-center'>OT</span>
                    <span className='w-1/6 flex justify-center items-center'>EMPRESA</span>
                    <span className='w-1/6 flex justify-center items-center'>FECHA SALIDA</span>
                    <span className='w-1/6 flex justify-center items-center'>FECHA RETORNO</span>
                    <span className='w-1/6 flex justify-center items-center'>ESTADO</span>
                    <span className='w-1/6 flex justify-center items-center'>ACCIONES</span>
                  </div>
                  {
                      MovimientossDataFiltrados ? (
                          MovimientossDataFiltrados.reverse().map( (data) => (
                            <div key={data.taqmovactivs} className='w-full h-auto flex flex-col sm:flex-row gap-2 justify-between items-center border border-black px-4 py-2'>
                              <span className=' w-full sm:w-1/6 flex justify-start sm:justify-center items-center'> <span className='flex sm:hidden'>OT:</span>{data.taqot}</span>
                              <span className=' w-full sm:w-1/6 flex justify-start sm:justify-center items-center'> <span className='flex sm:hidden'>EMPRESA:</span> {data.empresa}</span>
                              <span className=' w-full sm:w-1/6 flex justify-start sm:justify-center items-center'> <span className='flex sm:hidden'>SALIDA:</span> {data.fechaSalida}</span>
                              <span className=' w-full sm:w-1/6 flex justify-start sm:justify-center items-center'> <span className='flex sm:hidden'>RETORNO:</span>{data.fechaRetorno}</span>
                              <span className=' w-full sm:w-1/6 flex justify-start sm:justify-center items-center'> <span className='flex sm:hidden'>ESTADO:</span>{data.estado}</span>
                              <div className=' w-full sm:w-1/6 flex justify-start sm:justify-center items-center'>
                                {
                                  data.estado === 'EN PROCESO' ? (
                                    <Link href={`/movimiento/activo/fin/${data.taqmovactivs}`}  className='w-auto h-full border rounded-full border-black cursor-pointer'>
                                      <CheckIcon color={`#323c7c`} height={30} width={30} />
                                    </Link>
                                  ) : (
                                    <div className='w-auto h-full border rounded-full border-black'>
                                      <CheckIcon color={`#D6EAF8`} height={30} width={30} />
                                    </div>
                                  )
                                }
                              </div>
                            </div>
                          ))
                      ) : null
                  }
                </Panel_general>
              ) : null
            }
            {
              PanelComponentes ? (
                <Panel_general FunctionfilterData = { FilterComponentes } key={`4654564`}>
                  {
                      ComponentesDataFiltrados ? (
                        ComponentesDataFiltrados.reverse().map((data) => (
                            <Link href={`/componente/${data.taqComponente}`} className='w-full h-auto flex justify-between items-center border border-black cursor-pointer  hover:bg-gray-800 hover:text-white px-4 py-2'>
                              { data.nombre }
                            </Link>
                          ))
                      ) : null
                  }
                </Panel_general>
              ) : null
            }
            {
              Panel_Mantenimientos_Correctivos ? (
                <Panel_general FunctionfilterData = { FilterMttoCorrectivo } key={173399}>
                  <div className='hidden sm:flex w-full h-[50px]  justify-between items-center border border-black bg-[#385449] text-white font-semibold  px-4 py-2'>
                    <span className='w-1/4 h-full flex justify-center items-center'>
                      Actividad
                    </span>
                    <span className='w-1/4 h-full flex justify-center items-center'>
                      Fecha
                    </span>
                    <span className='w-1/4 h-full flex justify-center items-center'>
                      Estado
                    </span>
                    <span className='w-1/4 h-full flex justify-center items-center'>
                      Responsable
                    </span>
                  </div>
                  {
                      MantenimientoCorrectivoDataFiltrados ? (
                          MantenimientoCorrectivoDataFiltrados.reverse().map((data) => (
                            <Link href={`/mtto/corr/activo/show/${data.taqmttActivo}`} className='w-full h-auto flex flex-col sm:flex-row justify-between items-center border border-black cursor-pointer  hover:bg-gray-800 hover:text-white px-4 py-2'>
                              <span className='w-full sm:w-1/4 h-full flex justify-start sm:justify-center items-center'>
                                { data.actividad }
                              </span>
                              <span className='w-full sm:w-1/4 h-full flex justify-start sm:justify-center items-center'>
                                { data.fecha }
                              </span>
                              <span className='w-full sm:w-1/4 h-full flex justify-start sm:justify-center items-center'>
                                { data.estado }
                              </span>
                              <span className='w-full sm:w-1/4 h-full flex justify-start sm:justify-center items-center'>
                                { data.responsable }  
                              </span>
                            </Link>
                          ))
                      ) : null
                  }
                </Panel_general>
              ) : null
            }
            {
              Panel_Mantenimientos_Preventivos ? (
                <Panel_general FunctionfilterData = { FilterMttoPreventivo } key = { 14445 }>
                  <div className='hidden w-full h-[50px] sm:flex justify-between items-center border border-black bg-[#385449] text-white font-semibold  px-4 py-2'>
                    <span className='w-1/4 h-full flex justify-center items-center'>
                      Actividad
                    </span>
                    <span className='w-1/4 h-full flex justify-center items-center'>
                      Fecha
                    </span>
                    <span className='w-1/4 h-full flex justify-center items-center'>
                      Estado
                    </span>
                    <span className='w-1/4 h-full flex justify-center items-center'>
                      Responsable
                    </span>
                  </div>
                  {
                      MantenimientoPreventivoDataFiltrados ? (
                          MantenimientoPreventivoDataFiltrados.reverse().map( (data) => (
                            <Link href={`/mtto/prev/activo/show/${data.taqmttActivo}`} className='w-full h-auto flex flex-col sm:flex-row justify-between items-start sm:items-center border border-black cursor-pointer  hover:bg-gray-800 hover:text-white px-4 py-2'>
                              <span className='w-full sm:w-1/4 h-full flex justify-start sm:justify-center items-center'>
                                { data.actividad }
                              </span>
                              <span className='w-full sm:w-1/4 h-full flex justify-start sm:justify-center items-center'>
                                { data.fecha }
                              </span>
                              <span className='w-full sm:w-1/4 h-full flex justify-start sm:justify-center items-center'>
                                { data.estado }
                              </span>
                              <span className='w-full sm:w-1/4 h-full flex justify-start sm:justify-center items-center'>
                                { data.responsable }  
                              </span>
                            </Link>
                          ))
                      ) : null
                  }
                </Panel_general>
              ) : null
            }
          </div>
        </div>
      </div>
      <Modal
        isVisible = { ShowModalDocs }
        onClose = { () => setShowModalDocs(false) }
        tittle = {DocSelected.nombre} 
      >
        <div className='w-[900px] h-[800px]'>
          <embed src={`https://gematech.co/storage/Activos/${DocSelected.url}`} type="application/pdf" className='w-full h-full' />
        </div>
      </Modal>
      <Modal
        isVisible = { ShowModalCerts }
        onClose = { () => setShowModalCerts(false) }
        tittle = { CertSelected.nombre} 
      >
        <div className='w-[900px] h-[800px]'>
          <embed src={`https://gematech.co/storage/Certificaciones/${CertSelected.url}`} type="application/pdf" className='w-full h-full' />
        </div>
      </Modal>
      <Toaster richColors position='top-center'/>
    </main>
  )
}


export default ActivoPage;