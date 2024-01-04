import Modal from "@/Components/Panels/Modals/Modal";
import Actions from "@/Components/UI/Actions";
import ButtonMenu from "@/Components/UI/Activo/ButtonMenu";
import Caracteristica_target from "@/Components/UI/Activo/Caracteristica_target";
import Appbar from "@/Components/UI/Appbar";
import PanelSection from "@/Components/UI/PanelSection";
import SearchInput from "@/Components/UI/Search";
import AsignarActivo from "@/Components/forms/Activo/AsignarActivo";
import ListCaracteristica from "@/Components/forms/Caracteristicas/ListCaracteristica"; 
import CreateCertificacion from "@/Components/forms/Certificaciones/CreateCertificacion";
import ClonarComponente from "@/Components/forms/Componente/ClonarComponente";
import EditComponente from "@/Components/forms/Componente/EditComponente";
import CreateDocumento from "@/Components/forms/Documentos/CreateDocumento";
import { useState, useEffect } from "react";

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

  
  const [ActivosPanel, setActivosPanel] = useState(false) 
  const [MantenimientosPanel, setMantenimientosPanel] = useState(true) 
  const [DocumentosPanel, setDocumentosPanel] = useState(false)
  const [DocumentosEliminadosPanel, setDocumentosEliminadosPanel] = useState(false)
  const [CertificacionesPanel, setCertificacionesPanel] = useState(false)
  const [CertificacionesEliminadosPanel, setCertificacionesEliminadosPanel] = useState(false) 

  function ShowDefault(){
    setActivosPanel(false)  
    setMantenimientosPanel(false)
    setDocumentosPanel(false)
    setDocumentosEliminadosPanel(false) 
    setCertificacionesPanel(false)
    setCertificacionesEliminadosPanel(false) 
  }
  
  function ShowMantenimientos() {
    if(MantenimientosPanel){
      ShowDefault()
    }else{      
      setActivosPanel(false)  
      setDocumentosPanel(false)
      setDocumentosEliminadosPanel(false) 
      setCertificacionesPanel(false)
      setCertificacionesEliminadosPanel(false) 
      setMantenimientosPanel(true)
    }
  }

  function ShowDocumentos() {
    if(DocumentosPanel){      
      ShowDefault()
    }else{
      setActivosPanel(false)  
      setDocumentosEliminadosPanel(false) 
      setCertificacionesPanel(false)
      setCertificacionesEliminadosPanel(false) 
      setMantenimientosPanel(false)
      setDocumentosPanel(true)
    }
  }

  function ShowDocumentosEliminados() {
    if(DocumentosEliminadosPanel){
      ShowDefault()
    }else{
      setActivosPanel(false)  
      setCertificacionesPanel(false)
      setCertificacionesEliminadosPanel(false) 
      setMantenimientosPanel(false)
      setDocumentosPanel(false)
      setDocumentosEliminadosPanel(true) 
    }
  }

  function ShowCertificaciones() {
    if(CertificacionesPanel){
      ShowDefault()
    }else{
      setActivosPanel(false)  
      setCertificacionesEliminadosPanel(false) 
      setMantenimientosPanel(false)
      setDocumentosPanel(false)
      setDocumentosEliminadosPanel(false) 
      setCertificacionesPanel(true)
    }
  }

  function ShowCertificacionesEliminadas() {
    if(CertificacionesEliminadosPanel){
      ShowDefault()
    }else{
      setActivosPanel(false)  
      setMantenimientosPanel(false)
      setDocumentosPanel(false)
      setDocumentosEliminadosPanel(false) 
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
 
  const HistorialActivos = []; 
  ComponentesData.forEach(ComponenteData => {
    const activo = ComponenteData.historial__activos; 
    if (activo) {
      HistorialActivos.push({
        taq_historial: activo.taq_historial,
        taqComponente: activo.taqComponente,
        taqActivos: activo.taqActivos,
        nombre: activo.activos.nombre,
        estado: activo.estado,
        fecha_acople: activo.fecha_acople,
        fecha_desacople: activo.fecha_desacople,
      });
    } 
  });

  const MantenimientosData = [];
  ComponentesData.forEach(ActivoData => {
    ActivoData.documentos.forEach(DocumentosData => {
      MantenimientosData.push({
        taqActivos : DocumentosData.taqActivos,
        taqDoc     : DocumentosData.taqDoc,
        nombre     : DocumentosData.nombre,
        DocURL     : DocumentosData.DocURL, 
      });
    });
  }); 

  const DocumentosData = [];
  ComponentesData.forEach(ActivoData => { 
    ActivoData.documentos.forEach(DocumentosData => {
      DocumentosData.push({
        taqActivos : DocumentosData.taqActivos,
        taqDoc     : DocumentosData.taqDoc,
        nombre     : DocumentosData.nombre,
        DocURL     : DocumentosData.DocURL, 
      });
    });
  }); 

  const DocumentosEliminadosData = [];
  ComponentesData.forEach(ActivoData => {
    ActivoData.documentos__eliminados.forEach(DocumentosData => {
      DocumentosEliminadosData.push({
        taqDeleteRegister : DocumentosData.taqDeleteRegister,
        taqComponente     : DocumentosData.taqComponente,
        nombreDocumento   : DocumentosData.nombreDocumento,
        Responsable       : DocumentosData.taqresponsable, 
      });
    });
  });

  const CertificacionesData = [];
  ComponentesData.forEach(ActivoData => { 
    ActivoData.certificaciones.forEach(Data => {
      CertificacionesData.push({
        taqComponente    : Data.taqComponente,
        taqDoc           : Data.taqDoc,
        nombre           : Data.nombreDocumento,
        fechacertificion : Data.fechacertificion, 
        frecuencia       : Data.frecuencia,
        estado           : Data.estado, 
      });
    });
  });

  const CertificadosEliminadosData = [];
  ComponentesData.forEach(ActivoData => { 
    ActivoData.certificaciones__eliminadas.forEach(data => {
      CertificadosEliminadosData.push({
        delete_id       : data.delete_id,
        taqComponente   : data.taqComponente,
        nombreDocumento : data.nombreDocumento,
        Responsable     : data.taqresponsable, 
      });
    });
  });
  
  useEffect(() => {  
    setDocumentosFiltradros(DocumentosData)
    setDocumentosEliminadosFiltradros(DocumentosEliminadosData)
    setActivosFiltrados(HistorialActivos)
  }, [ComponentesData])

  const [ActivosFiltrados, setActivosFiltrados] = useState();
  const FiltroActivos = ( searchTerm ) => {
    const filtered = HistorialActivos.filter((data) => { 
      const taq_historial   = data.taq_historial.toLowerCase();
      const taqComponente   = data.taqComponente.toLowerCase();
      const taqActivos      = data.taqActivos.toLowerCase();
      const estado          = data.estado.toLowerCase();
      const fecha_acople    = data.fecha_acople.toLowerCase();
      const fecha_desacople = data.fecha_desacople.toLowerCase();
        const descripcion   = DocumentosData.descripcion.toLowerCase(); 
        return (
            taq_historial.includes(searchTerm)   ||
            taqComponente.includes(searchTerm)   ||
            taqActivos.includes(searchTerm)      ||
            fecha_acople.includes(searchTerm)    ||
            fecha_desacople.includes(searchTerm) || 
            estado.includes(searchTerm)          ||
            descripcion.includes(searchTerm)
        );
    });
    setActivosFiltrados(filtered);
  };

  const [DocumentosFiltradros, setDocumentosFiltradros] = useState();
  const FiltroDocumentos = ( searchTerm ) => {
    const filtered = HistorialActivos.filter((data) => {
      const taqActivos = DocumentosData.taqActivos.toLowerCase();
      const taqDoc     = DocumentosData.taqDoc.toLowerCase();
      const nombre     = DocumentosData.nombre.toLowerCase();
      const DocURL     = DocumentosData.DocURL.toLowerCase();
        return (
            DocURL.includes(searchTerm)     ||
            taqDoc.includes(searchTerm)     ||
            nombre.includes(searchTerm)     || 
            taqActivos.includes(searchTerm) 
        );
    });
    setDocumentosFiltradros(filtered);
  };

  const [DocumentosEliminadosFiltradros, setDocumentosEliminadosFiltradros] = useState();
  const FiltroDocumentosEliminados = ( searchTerm ) => {
    const filtered = DocumentosEliminadosData.filter((data) => { 
      const taqDeleteRegister = DocumentosData.taqDeleteRegister.toLowerCase();
      const taqComponente     = DocumentosData.taqComponente.toLowerCase();
      const nombreDocumento   = DocumentosData.nombreDocumento.toLowerCase();
      const Responsable       = DocumentosData.taqresponsable.toLowerCase(); 
        return (
          taqDeleteRegister.includes(searchTerm) ||
          taqComponente.includes(searchTerm)     ||
          nombreDocumento.includes(searchTerm)   || 
          Responsable.includes(searchTerm) 
        );
    });
    setDocumentosEliminadosFiltradros(filtered);
  };

  const [CertificacionesFiltradas, setCertificacionesFiltradas] = useState();
  const FiltroCertificaciones = ( searchTerm ) => {
    const filtered = CertificacionesData.filter((data) => {  
      const taqComponente    = Data.taqComponente.toLowerCase();
      const taqDoc           = Data.taqDoc.toLowerCase();
      const nombre           = Data.nombreDocumento.toLowerCase();
      const fechacertificion = Data.fechacertificion.toLowerCase(); 
      const frecuencia       = Data.frecuencia.toLowerCase();
      const estado           = Data.estado.toLowerCase(); 
        return (
          taqComponente.includes(searchTerm)    ||
          taqDoc.includes(searchTerm)           ||
          nombre.includes(searchTerm)           || 
          fechacertificion.includes(searchTerm) ||
          frecuencia.includes(searchTerm)       || 
          estado.includes(searchTerm)
        );
    });
    setCertificacionesFiltradas(filtered);
  };

  const [CertificacionesEliminadasFiltradras, setCertificacionesEliminadasFiltradras] = useState();
  const FiltroCertificacionesEliminadas = ( searchTerm ) => {
    const filtered = DocumentosEliminadosData.filter((data) => {
      const delete_id       = data.delete_id.toLowerCase();
      const taqComponente   = data.taqComponente.toLowerCase();
      const nombreDocumento = data.nombreDocumento.toLowerCase();
      const Responsable     = data.taqresponsable.toLowerCase(); 
        return (
          delete_id.includes(searchTerm)       ||
          taqComponente.includes(searchTerm)   ||
          nombreDocumento.includes(searchTerm) || 
          Responsable.includes(searchTerm) 
        );
    });
    setCertificacionesEliminadasFiltradras(filtered);
  };

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
            ActivosPanel ? (
              <div key = {`CertificacionesEliminadasSectionPanel`} className='w-full h-full flex flex-col justify-start items-center justify-items-center gap-2 p-4 overflow-y-auto'>
                <div className='w-full h-auto flex flex-col sm:flex-row justify-center items-center gap-3 px-2 py-1'>
                  <SearchInput SearchFunction = { FiltroActivos } />
                </div>
                <div className={`w-full h-full flex flex-col justify-start items-center gap-2 py-1 px-4  overflow-hidden overflow-y-auto`}>
                  { 
                    ActivosFiltrados ? (
                      ActivosFiltrados.map((data) => (
                        <div key = { data.taqActivos } className='w-full h-auto flex  justify-between items-center bg-white border border-black px-4 py-2 cursor-pointer hover:bg-gray-800 hover:text-white transition duration-700 ease-in-out'>
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
            MantenimientosPanel ? (
              <div key = {`MantenimientosSectionPanel`} className='w-full h-full flex flex-col justify-start items-center justify-items-center gap-2 p-4 overflow-y-auto'>
                <div className='w-full h-auto flex flex-col sm:flex-row justify-center items-center gap-3 px-2 py-1'>
                  <SearchInput SearchFunction = { FiltroDocumentos } />
                </div>
                <div className={`w-full h-full flex flex-col justify-start items-center gap-2 py-1 px-4  overflow-hidden overflow-y-auto`}>
                  { 
                    DocumentosFiltradros ? (
                      DocumentosFiltradros.map((data) => (
                        <div key = { data.taqActivos } className='w-full h-auto flex  justify-between items-center bg-white border border-black px-4 py-2 cursor-pointer hover:bg-gray-800 hover:text-white transition duration-700 ease-in-out'>
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
            DocumentosPanel ? (
              <div key = {`DocumentosSectionPanel`} className='w-full h-full flex flex-col justify-start items-center justify-items-center gap-2 p-4 overflow-y-auto'>
                <div className='w-full h-auto flex flex-col sm:flex-row justify-center items-center gap-3 px-2 py-1'>
                  <SearchInput SearchFunction = { FiltroDocumentos } />
                </div>
                <div className={`w-full h-full flex flex-col justify-start items-center gap-2 py-1 px-4  overflow-hidden overflow-y-auto`}>
                  { 
                    DocumentosFiltradros ? (
                      DocumentosFiltradros.map((data) => (
                        <div key = { data.taqActivos } className='w-full h-auto flex  justify-between items-center bg-white border border-black px-4 py-2 cursor-pointer hover:bg-gray-800 hover:text-white transition duration-700 ease-in-out'>
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
            DocumentosEliminadosPanel ? (
              <div key = {`DocumentosEliminadosSectionPanel`} className='w-full h-full flex flex-col justify-start items-center justify-items-center gap-2 p-4 overflow-y-auto'>
                <div className='w-full h-auto flex flex-col sm:flex-row justify-center items-center gap-3 px-2 py-1'>
                  <SearchInput SearchFunction = { FiltroDocumentosEliminados } />
                </div>
                <div className={`w-full h-full flex flex-col justify-start items-center gap-2 py-1 px-4  overflow-hidden overflow-y-auto`}>
                  { 
                    DocumentosEliminadosFiltradros ? (
                      DocumentosEliminadosFiltradros.map((data) => (
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
              <div key = {`CertificacionesSectionPanel`} className='w-full h-full flex flex-col justify-start items-center justify-items-center gap-2 p-4 overflow-y-auto'>
                <div className='w-full h-auto flex flex-col sm:flex-row justify-center items-center gap-3 px-2 py-1'>
                  <SearchInput SearchFunction = { FiltroCertificaciones } />
                </div>
                <div className={`w-full h-full flex flex-col justify-start items-center gap-2 py-1 px-4  overflow-hidden overflow-y-auto`}>
                  { 
                    CertificacionesFiltradas ? (
                      CertificacionesFiltradas.map((data) => (
                        <div key = { data.taqComponente } className='w-full h-auto flex  justify-between items-center bg-white border border-black px-4 py-2 cursor-pointer hover:bg-gray-800 hover:text-white transition duration-700 ease-in-out'>
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
            CertificacionesEliminadosPanel ? (
              <div key = {`CertificacionesEliminadosSectionPanel`} className='w-full h-full flex flex-col justify-start items-center justify-items-center gap-2 p-4 overflow-y-auto'>
                <div className='w-full h-auto flex flex-col sm:flex-row justify-center items-center gap-3 px-2 py-1'>
                  <SearchInput SearchFunction = { FiltroCertificacionesEliminadas } />
                </div>
                <div className={`w-full h-full flex flex-col justify-start items-center gap-2 py-1 px-4  overflow-hidden overflow-y-auto`}>
                  { 
                    CertificacionesEliminadasFiltradras ? (
                      CertificacionesEliminadasFiltradras.map((data) => (
                        <div key = { data.delete_id } className='w-full h-auto flex  justify-between items-center bg-white border border-black px-4 py-2 cursor-pointer hover:bg-gray-800 hover:text-white transition duration-700 ease-in-out'>
                          { data.nombreDocumento }
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
              ComponentesData[0].urlImage != 'default-image.jpg' ? (  
                <img src={`https://gworks.gematech.co/storage/Componentes/${ComponentesData[0].taqComponente}/${ComponentesData[0].urlImage}`} alt={``} className = 'max-w-[300px] sm:max-w-[650px] md:max-w-[780px] max-h-[800px] object-fill ' loading="lazy"/>
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