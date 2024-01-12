 
import Modal from "@/Components/Panels/Modals/Modal";
import ButtonMenu from "@/Components/UI/Activo/ButtonMenu";
import Appbar from "@/Components/UI/Responsables/Appbar";
import SearchInput from "@/Components/UI/Search";
import CreateDocumento from "@/Components/forms/Documentos/CreateDocumento";
import { Link } from "@inertiajs/react";
import { useEffect, useState } from "react"; 
 
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
  const [DocumentosEliminadosPanel, setDocumentosEliminadosPanel] = useState(false);
     
  function ShowDefault(){
    setActividadesPanel(false)
    setDocumentosPanel(false)
    setDocumentosEliminadosPanel(false)
  }
  
  function ShowActividades() {
    if(ActividadesPanel){
      ShowDefault()
    }else{     
      setDocumentosPanel(false)
      setDocumentosEliminadosPanel(false)
      setActividadesPanel(true)
    }
  }

  function ShowDocumentos() {
    if(DocumentosPanel){
      ShowDefault()
    }else{    
      setActividadesPanel(false)
      setDocumentosEliminadosPanel(false)
      setDocumentosPanel(true)
    }
  }

  function ShowDocumentosEliminados() {
    if(DocumentosEliminadosPanel){
      ShowDefault()
    }else{    
      setActividadesPanel(false)
      setDocumentosPanel(false)
      setDocumentosEliminadosPanel(true)
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
  },{
    "id"         : '03096asd3498',
    "label"      : "Documentos Eliminados",
    "Myfunction" : ShowDocumentosEliminados,
    "estado"     : DocumentosEliminadosPanel
  }]
 
  const ActividadesData = [];
  Responsable.forEach(object => { 
    object.om.forEach(data => {
      ActividadesData.push({
        taqom       : data.taqom,
        taqActivos  : data.taqActivos,
        fechainicio : data.fechainicio,
        horainicio  : data.horainicio,
        fechafin    : data.fechafin,
        horafin     : data.horafin,
        tipo        : data.tipo,
        prioridad   : data.prioridad,
        estado      : data.estado,
        descripcion : data.descripcion,
      });
    });
  }); 

  const DocumentosData = [];
  Responsable.forEach(object => { 
    object.documentos.forEach(data => {
      DocumentosData.push({ 
        taqDoc     : data.taqDoc,
        nombre     : data.nombre,
        DocURL     : data.DocURL, 
      });
    });
  }); 

  const DocumentosEliminadosData = []; 
  Responsable.forEach(object => { 
    object.documentos_eliminados.forEach(data => {
      DocumentosEliminadosData.push({ 
        documento_eliminado_id : data.documento_eliminado_id,
        documento_id           : data.documento_id,
        nombre                 : data.nombre,
        url	                   : data.url
      });
    });
  }); 

  useEffect(() => {
    setMantenimientosFiltrados(ActividadesData)
    setDocumentosFiltrados(DocumentosData)
    setDocumentosEliminadosFiltrados(DocumentosEliminadosData)
  }, [Responsable])

  const [MantenimientosFiltrados, setMantenimientosFiltrados] = useState();
  const FiltroMantenimiento = ( searchTerm ) => {
    const filtered = MantenimientosData.filter((data) => {
        const taqActivos  = data.taqActivos.toLowerCase();
        const fechainicio = data.fechainicio.toLowerCase();
        const horainicio  = data.horainicio.toLowerCase();
        const fechafin    = data.fechafin.toLowerCase();
        const horafin     = data.horafin.toLowerCase();
        const tipo        = data.tipo.toLowerCase();
        const prioridad   = data.prioridad.toLowerCase();
        const estado      = data.estado.toLowerCase();
        const descripcion = data.descripcion.toLowerCase();
        return (
          taqActivos.includes(searchTerm)    ||
          fechainicio.includes(searchTerm)   ||
          horainicio.includes(searchTerm)    ||
          fechafin.includes(searchTerm)      ||
          horafin.includes(searchTerm)       ||
          tipo.includes(searchTerm)          ||
          prioridad.includes(searchTerm)     ||
          estado.includes(searchTerm)        ||   
          descripcion.includes(searchTerm)      
        );
    });
    setMantenimientosFiltrados(filtered);
  };

  const [DocumentosFiltrados, setDocumentosFiltrados] = useState();
  const FiltroDocumentos = ( searchTerm ) => {
    const filtered = DocumentosData.filter((data) => {
        const taqDoc     = data.taqDoc.toLowerCase();
        const nombre     = data.nombre.toLowerCase();
        const DocURL     = data.DocURL.toLowerCase(); 
        return (
            taqDoc.includes(searchTerm) ||
            nombre.includes(searchTerm) ||
            DocURL.includes(searchTerm)        
        );
    });
    setDocumentosFiltrados(filtered);
  };

  const [DocumentosEliminadosFiltrados, setDocumentosEliminadosFiltrados] = useState();
  const FiltroDocumentosEliminados = ( searchTerm ) => {
    const filtered = DocumentosEliminadosData.filter((data) => {
        const taqDoc = data.taqDoc.toLowerCase();
        const nombre = data.nombre.toLowerCase();
        const DocURL = data.DocURL.toLowerCase(); 
        return (
            taqDoc.includes(searchTerm) ||
            nombre.includes(searchTerm) ||
            DocURL.includes(searchTerm)        
        );
    });
    setDocumentosEliminadosFiltrados(filtered);
  };

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
          {
            ActividadesPanel ? (
              <div key = {`ActividadesSectionPanel`} className='w-full h-full flex flex-col justify-start items-center justify-items-center gap-2 p-4 overflow-y-auto'>
                <div className='w-full h-auto flex flex-col sm:flex-row justify-center items-center gap-3 px-2 py-1'>
                  <SearchInput SearchFunction = { <div key = {`MantenimientoSectionPanel`} className='w-full h-full flex flex-col justify-start items-center justify-items-center gap-2 p-4 overflow-y-auto'>
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
              </div> } />
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
              <div key = {`DocumentosSectionPanel`} className='w-full h-full flex flex-col justify-start items-center justify-items-center gap-2 p-4 overflow-y-auto'>
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
              <div key = {`DocumentosEliminadosSectionPanel`} className='w-full h-full flex flex-col justify-start items-center justify-items-center gap-2 p-4 overflow-y-auto'>
                <div className='w-full h-auto flex flex-col sm:flex-row justify-center items-center gap-3 px-2 py-1'>
                  <SearchInput SearchFunction = { FiltroDocumentosEliminados } /> 
                </div>
                <div className={`w-full h-full flex flex-col justify-start items-center gap-2 py-1 px-4  overflow-hidden overflow-y-auto`}>
                  { 
                    DocumentosEliminadosFiltrados ? (
                      DocumentosEliminadosFiltrados.map((data) => (
                        <div key = { data.taqDoc } className='w-full h-auto flex  justify-between items-center bg-white border border-black px-4 py-2 cursor-pointer '>
                          <div>
                            { data.nombre }
                          </div> 
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