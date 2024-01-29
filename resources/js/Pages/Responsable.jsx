 
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
  const [OmasResponsablePanel, setOmasResponsablePanel] = useState(false) 
  const [OmcsResponsablePanel, setOmcsResponsablePanel] = useState(false) 
  const [ActividadesOmaPanel, setActividadesOmaPanel] = useState(false) 
  const [ActividadesOmcPanel, setActividadesOmcPanel] = useState(false) 
  const [DocumentosPanel, setDocumentosPanel] = useState(false)
  const [DocumentosEliminadosPanel, setDocumentosEliminadosPanel] = useState(false);
     
  function ShowDefault(){
    setActividadesPanel(false)
    setDocumentosPanel(false)
    setOmasResponsablePanel(false)
    setOmcsResponsablePanel(false)
    setActividadesOmaPanel(false)
    setActividadesOmcPanel(false)
    setDocumentosEliminadosPanel(false)
  }
  
  function ShowActividades() {
    if(ActividadesPanel){
      ShowDefault()
    }else{       
      setDocumentosPanel(false)
      setOmasResponsablePanel(false)
      setOmcsResponsablePanel(false)
      setActividadesOmaPanel(false)
      setActividadesOmcPanel(false)
      setDocumentosEliminadosPanel(false)
      setActividadesPanel(true)
    }
  }

  function ShowDocumentos() {
    if(DocumentosPanel){
      ShowDefault()
    }else{     
      setActividadesPanel(false) 
      setOmasResponsablePanel(false)
      setOmcsResponsablePanel(false)
      setActividadesOmaPanel(false)
      setActividadesOmcPanel(false)
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
      setOmasResponsablePanel(false)
      setOmcsResponsablePanel(false)
      setActividadesOmaPanel(false)
      setActividadesOmcPanel(false) 
      setDocumentosEliminadosPanel(true)
    }
  }

  function ShowOmas() {
    if(OmasResponsablePanel){
      ShowDefault()
    }else{     
      setActividadesPanel(false)
      setDocumentosPanel(false)
      setOmcsResponsablePanel(false)
      setActividadesOmaPanel(false)
      setActividadesOmcPanel(false) 
      setDocumentosEliminadosPanel(false)
      setOmasResponsablePanel(true)
    }
  }

  function ShowOmcs() {
    if(OmcsResponsablePanel){
      ShowDefault()
    }else{     
      setActividadesPanel(false)
      setDocumentosPanel(false)
      setActividadesOmaPanel(false)
      setActividadesOmcPanel(false) 
      setDocumentosEliminadosPanel(false)
      setOmasResponsablePanel(false)
      setOmcsResponsablePanel(true)
    }
  }

  function ShowActividadesOma() {
    if(ActividadesOmaPanel){
      ShowDefault()
    }else{     
      setActividadesPanel(false)
      setDocumentosPanel(false)
      setActividadesOmcPanel(false) 
      setDocumentosEliminadosPanel(false)
      setOmasResponsablePanel(false)
      setOmcsResponsablePanel(false)
      setActividadesOmaPanel(true)
    }
  }
  
  function ShowActividadesOmc() {
    if(ActividadesOmcPanel){
      ShowDefault()
    }else{     
      setActividadesPanel(false)
      setDocumentosPanel(false)
      setActividadesOmaPanel(false) 
      setDocumentosEliminadosPanel(false)
      setOmasResponsablePanel(false)
      setOmcsResponsablePanel(false)
      setActividadesOmcPanel(true)
    }
  }

  const Buttons = [{  
    "id"         : '16123256256',
    "label"      : "Mantenimientos Activos",
    "Myfunction" : ShowOmas,
    "estado"     : OmasResponsablePanel
  },{  
    "id"         : '16256212356',
    "label"      : "Actividades Activos",
    "Myfunction" : ShowActividadesOma,
    "estado"     : ActividadesOmaPanel
  },{  
    "id"         : '1625634256',
    "label"      : "Mantenimientos Componentes",
    "Myfunction" : ShowOmcs,
    "estado"     : OmcsResponsablePanel
  },{  
    "id"         : '16qw12256256',
    "label"      : "Actividades Componentes",
    "Myfunction" : ShowActividadesOmc,
    "estado"     : ActividadesOmcPanel
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
 
  const OrdenesMttoActivos = [];
  Responsable.forEach(object => {
    object.oma.forEach(data => {
      OrdenesMttoActivos.push({
        taqom       : data.taqom,
        activo      : data.activos.nombre,
        taqActivos  : data.activos.taqActivos,
        estado      : data.estado,
        descripcion : data.descripcion,
      });
    });
  });
  
  const OrdenesMttoComponentes = [];
  Responsable.forEach(object => {
    object.omc.forEach(data => {
      OrdenesMttoComponentes.push({
        taqom         : data.taqom,
        componente    : data.componente.nombre,
        taqComponente : data.componente.taqComponente,
        estado        : data.estado,
        descripcion   : data.descripcion,
      });
    });
  });

  const ActividadesOma = [];
  Responsable.forEach(object => { 
    object.actividades__oma.forEach(data => {
      ActividadesOma.push({
        actividad_id : data.actividad.actividad_id,
        taqom        : data.actividad.taqom,
        nombre       : data.actividad.nombre,
        descripcion  : data.actividad.descripcion,
        estado       : data.actividad.estado,
      });
    });
  });

  const ActividadesOmc = [];
  Responsable.forEach(object => {
    object.actividades__omc.forEach(data => {
      ActividadesOmc.push({
        actividad_id : data.actividad.actividad_id,
        taqom        : data.actividad.taqom,
        nombre       : data.actividad.nombre,
        descripcion  : data.actividad.descripcion,
        estado       : data.actividad.estado,
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
    setOmas(OrdenesMttoActivos)
    setOmas(OrdenesMttoComponentes)
    setActsOma(ActividadesOma)
    setActsOmc(ActividadesOmc)
    setDocumentosFiltrados(DocumentosData)
    setDocumentosEliminadosFiltrados(DocumentosEliminadosData)
  }, [Responsable])

  const [Omas, setOmas] = useState();
  const FiltroOmas = ( searchTerm ) => {
    const filtered = OrdenesMttoActivos.filter((data) => {
        const taqom       = data.taqom.toLowerCase();
        const activo      = data.activos.nombre.toLowerCase();
        const taqActivos  = data.activos.taqActivos.toLowerCase();
        const estado      = data.estado.toLowerCase();
        const descripcion = data.descripcion.toLowerCase();
        return (
          taqActivos.includes(searchTerm)  ||
          activo.includes(searchTerm)      ||
          taqom.includes(searchTerm)       || 
          estado.includes(searchTerm)      ||   
          descripcion.includes(searchTerm)      
        );
    });
    setOmas(filtered);
  };

  const [Omcs, setOmcs] = useState();
  const FiltroOmcs = ( searchTerm ) => {
    const filtered = OrdenesMttoComponentes.filter((data) => {
        const taqom         = data.taqom.toLowerCase();
        const componente    = data.componente.nombre.toLowerCase();
        const taqComponente = data.componente.taqComponente.toLowerCase();
        const estado        = data.estado.toLowerCase();
        const descripcion   = data.descripcion.toLowerCase();
        return (
          taqActivos.includes(searchTerm)  ||
          activo.includes(searchTerm)      ||
          taqom.includes(searchTerm)       || 
          estado.includes(searchTerm)      ||   
          descripcion.includes(searchTerm)      
        );
    });
    setOmcs(filtered);
  };
 
  const [ActsOma, setActsOma] = useState();
  const FiltroActsOma = ( searchTerm ) => {
    const filtered = ActividadesOma.filter((data) => {
        const actividad_id = data.actividad_id.toLowerCase();
        const taqom        = data.taqom.toLowerCase();
        const nombre       = data.nombre.toLowerCase();
        const descripcion  = data.descripcion.toLowerCase();
        const estado       = data.estado.toLowerCase();
        return (
          actividad_id.includes(searchTerm) ||
          taqom.includes(searchTerm)        ||
          nombre.includes(searchTerm)       || 
          estado.includes(searchTerm)       ||   
          descripcion.includes(searchTerm)      
        );
    });
    setActsOma(filtered);
  };

  const [ActsOmc, setActsOmc] = useState();
  const FiltroActsOmc = ( searchTerm ) => {
    const filtered = ActividadesOmc.filter((data) => {
        const actividad_id = data.actividad_id.toLowerCase();
        const taqom        = data.taqom.toLowerCase();
        const nombre       = data.nombre.toLowerCase();
        const descripcion  = data.descripcion.toLowerCase();
        const estado       = data.estado.toLowerCase();
        return (
          actividad_id.includes(searchTerm) ||
          taqom.includes(searchTerm)        ||
          nombre.includes(searchTerm)       || 
          estado.includes(searchTerm)       ||   
          descripcion.includes(searchTerm)    
        );
    });
    setActsOmc(filtered);
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
            OmasResponsablePanel ? (
              <div key = {`OmasResponsablePanel`} className='w-full h-full flex flex-col justify-start items-center justify-items-center gap-2 p-4 overflow-y-auto'>
                <div className='w-full h-auto flex flex-col sm:flex-row justify-center items-center gap-3 px-2 py-1'>
                  <SearchInput SearchFunction = { FiltroOmas } />
                  <div onClick = { () => setCreateFormModal(true) } className='w-full sm:w-auto h-auto text-center flex justify-center items-center px-2 py-1 border border-black hover:border-white rounded-md text-sm bg-green-500 hover:bg-green-800 text-white cursor-pointer duration-700 ease-in-out'>
                    Agregar Nuevo Mantenimiento de Activo
                  </div> 
                </div>
                <div className={`w-full h-full flex flex-col justify-start items-center gap-2 py-1 px-4  overflow-hidden overflow-y-auto`}>
                  { 
                    Omas ? (
                      Omas.map((data) => (
                        <Link href={`/omas/${data.taqom}`} key = { data.taqom } className='w-full h-auto flex flex-col justify-center items-star bg-white border border-black px-4 py-2 cursor-pointer '>
                          <div className = {`font-bold ${data.estado != 'FINALIZADO' ? 'text-red-500' : 'text-green-500'} `} >
                            { data.taqom }
                          </div>
                          <div>
                            { data.descripcion }
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
            OmcsResponsablePanel ? (
              <div key = {`OmasResponsablePanel`} className='w-full h-full flex flex-col justify-start items-center justify-items-center gap-2 p-4 overflow-y-auto'>
                <div className='w-full h-auto flex flex-col sm:flex-row justify-center items-center gap-3 px-2 py-1'>
                  <SearchInput SearchFunction = { FiltroOmcs } />
                  <div onClick = { () => setCreateFormModal(true) } className='w-full sm:w-auto h-auto text-center flex justify-center items-center px-2 py-1 border border-black hover:border-white rounded-md text-sm bg-green-500 hover:bg-green-800 text-white cursor-pointer duration-700 ease-in-out'>
                    Agregar Nuevo Mantenimiento de Componente
                  </div> 
                </div>
                <div className={`w-full h-full flex flex-col justify-start items-center gap-2 py-1 px-4  overflow-hidden overflow-y-auto`}>
                  { 
                    Omcs ? (
                      Omcs.map((data) => (
                        <Link href={`/omcs/${data.taqom}`} key = { data.taqom } className='w-full h-auto flex flex-col justify-center items-star bg-white border border-black px-4 py-2 cursor-pointer '>
                          <div className = {`font-bold ${data.estado != 'FINALIZADO' ? 'text-red-500' : 'text-green-500'} `} >
                            { data.taqom }
                          </div>
                          <div>
                            { data.descripcion }
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
            ActividadesOmaPanel ? (
              <div key = {`ActividadesOmaPanel`} className='w-full h-full flex flex-col justify-start items-center justify-items-center gap-2 p-4 overflow-y-auto'>
                <div className='w-full h-auto flex flex-col sm:flex-row justify-center items-center gap-3 px-2 py-1'>
                  <SearchInput SearchFunction = { FiltroActsOma } /> 
                </div>
                <div className={`w-full h-full flex flex-col justify-start items-center gap-2 py-1 px-4  overflow-hidden overflow-y-auto`}>
                  { 
                    ActsOma ? (
                      ActsOma.map((data) => (
                        <Link href={`/omas/${data.taqom}`} key = { data.taqom } className='w-full h-auto flex flex-col justify-center items-star bg-white border border-black px-4 py-2 cursor-pointer '>
                          <div className = {`font-bold ${data.estado != 'FINALIZADO' ? 'text-red-500' : 'text-green-500'} `} >
                           Actividad: { data.nombre }
                          </div>
                          <div>
                            { data.descripcion }
                          </div>
                          <div>
                            { data.taqom }
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
            ActividadesOmcPanel ? (
              <div key = {`ActividadesOmcPanel`} className='w-full h-full flex flex-col justify-start items-center justify-items-center gap-2 p-4 overflow-y-auto'>
                <div className='w-full h-auto flex flex-col sm:flex-row justify-center items-center gap-3 px-2 py-1'>
                  <SearchInput SearchFunction = { FiltroActsOmc } /> 
                </div>
                <div className={`w-full h-full flex flex-col justify-start items-center gap-2 py-1 px-4  overflow-hidden overflow-y-auto`}>
                  { 
                    ActsOmc ? (
                      ActsOmc.map((data) => (
                        <Link href={`/omcs/${data.taqom}`} key = { data.taqom } className='w-full h-auto flex flex-col justify-center items-star bg-white border border-black px-4 py-2 cursor-pointer '>
                          <div className = {`font-bold ${data.estado != 'FINALIZADO' ? 'text-red-500' : 'text-green-500'} `} >
                           Actividad: { data.nombre }
                          </div>
                          <div>
                            { data.descripcion }
                          </div>
                          <div>
                            { data.taqom }
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