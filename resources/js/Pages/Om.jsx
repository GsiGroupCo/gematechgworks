import Modal from "@/Components/Panels/Modals/Modal"
import Actions from "@/Components/UI/Actions"
import ButtonMenu from "@/Components/UI/Activo/ButtonMenu"  
import Caracteristica_target from "@/Components/UI/Activo/Caracteristica_target"
import AppbarOms from "@/Components/UI/Ots/Appbar" 
import SearchInput from "@/Components/UI/Search"
import CreateMantenimiento from "@/Components/forms/Mantenimiento/CreateMantenimiento"
import { Link } from "@inertiajs/react"
import { useEffect, useState } from "react"

const OmsPage = ({ DataOms }) => {

  const [CreateFormModal, setCreateFormModal] = useState(false)

  const [AccionesModal, setAccionesModal] = useState(false) 
  const [FormatosModal, setFormatosModal] = useState(false) 
  const [ShowModal, setShowModal] = useState(false)

  function ShowActions(){
    setFormatosModal(false)
    setShowModal(true)
    setAccionesModal(true)
    ShowActionButtons()
  }
  
  function ShowFormats(){
    setAccionesModal(false)
    setShowModal(true)
    setFormatosModal(true)
  }

  const [AcctionsButtons, setAcctionsButtons] = useState(true) 
  const [EditarOm, setEditarOm]               = useState(false)
  const [FinalizarOm, setFinalizarOm]         = useState(false)
  
  function ShowActionButtons(){
    setEditarOm(false)
    setFinalizarOm(false) 
    setAcctionsButtons(true)
  }
 
  function ShowFormEditOm(){ 
    setFinalizarOm(false) 
    setAcctionsButtons(false)
    setEditarOm(true)
  }

  function ShowFormFinalizarOm(){ 
    setEditarOm(false)
    setAcctionsButtons(false)
    setFinalizarOm(true) 
  }

  const Acciones = [{
      "id"         : "296215696",
      "label"      : "Editar Orden de mantenimiento",
      "estate"     : 2,
      "function"   : ShowFormEditOm,
  },{
      "id"         : "1213522726",
      "label"      : "Finalizar Orden de mantenimiento",
      "estate"     : 1,
      "function"   : ShowFormFinalizarOm,
  }]
  
  const [ComponentesVinculadosPanel, setComponentesVinculadosPanel] = useState(true) 
  const [DocumentosPanel, setDocumentosPanel]                       = useState(false)
  const [DocumentosEliminadosPanel, setDocumentosEliminadosPanel]   = useState(false)
  const [MantenimientosPanel, setMantenimientosPanel]               = useState(false) 
     
  function ShowDefault(){
    setComponentesVinculadosPanel(false)
    setDocumentosPanel(false)
    setDocumentosEliminadosPanel(false) 
    setMantenimientosPanel(false)
  }
  
  function ShowComponentes() {
    if(ComponentesVinculadosPanel){
      ShowDefault()
    }else{
      setDocumentosPanel(false)
      setDocumentosEliminadosPanel(false) 
      setMantenimientosPanel(false)
      setComponentesVinculadosPanel(true)
    }
  }

  function ShowDocumentos() {
    if(DocumentosPanel){      
      ShowDefault()
    }else{
      setDocumentosEliminadosPanel(false) 
      setMantenimientosPanel(false)
      setComponentesVinculadosPanel(false)
      setDocumentosPanel(true)
    }
  }

  function ShowDocumentosEliminados() {
    if(DocumentosEliminadosPanel){
      ShowDefault()
    }else{
      setMantenimientosPanel(false)
      setComponentesVinculadosPanel(false)
      setDocumentosPanel(false)
      setDocumentosEliminadosPanel(true) 
    }
  }

  function ShowMantenimientos() {
    if(MantenimientosPanel){
      ShowDefault()
    }else{
      setComponentesVinculadosPanel(false)
      setDocumentosPanel(false)
      setDocumentosEliminadosPanel(false) 
      setMantenimientosPanel(true)
    }
  } 

  const ComponentesData = [];
  DataOms.forEach(Om => {  
    Om.activos.historial.forEach(HistorialData => {
      HistorialData.componente.forEach(ComponenteData => {
        ComponentesData.push({
          taqComponente : ComponenteData.taqComponente,
          categoria_id  : ComponenteData.categoria_id,
          nombre        : ComponenteData.nombre,
          estado        : ComponenteData.estado,
          descripcion   : ComponenteData.descripcion,
          serial        : ComponenteData.serial,
          horasuso      : ComponenteData.horasuso,
        });
      });
    });
  });
  
  const DocumentosData = [];
  DataOms.forEach(Om => { 
    Om.documentos.forEach(DocumentosData => {
      DocumentosData.push({
        taqom  : DocumentosData.taqom,
        taqDoc : DocumentosData.taqDoc,
        nombre : DocumentosData.nombre,
        DocURL : DocumentosData.DocURL, 
      });
    });
  }); 

  const DocumentosEliminadosData = [];
  DataOms.forEach(Om => { 
    Om.documentos__eliminados.forEach(DocumentosEliminadosData => {
      DocumentosEliminadosData.push({
        taqDeleteRegister : DocumentosEliminadosData.taqDeleteRegister,
        taqom             : DocumentosEliminadosData.taqom,
        nombreDocumento   : DocumentosEliminadosData.nombreDocumento,
        Responsable       : DocumentosEliminadosData.responsable.nombre, 
      });
    });
  }); 

  const MantenimientosData = [];
  DataOms.forEach(Om => {  
    Om.mantenimientos.forEach(MttoData => {
      MantenimientosData.push({
        taqmantenimiento  : MttoData.taqmantenimiento,
        taqom             : MttoData.taqom,
        Nombre            : MttoData.Nombre,
        Descripcion       : MttoData.Descripcion, 
        tipe              : MttoData.tipe
      });
    });
  }); 

  useEffect(() => {  
    setComponentesFiltrados(ComponentesData)
    setDocumentosFiltrados(DocumentosData)
    setDocumentosEliminadosFiltrados(DocumentosEliminadosData)
    setMantenimientosFiltrados(MantenimientosData)
  }, [DataOms])
  
  const [ComponentesFiltrados, setComponentesFiltrados] = useState();
  const FiltroComponentes = ( searchTerm ) => {
    const filtered = ComponentesData.filter((data) => { 
        const taqComponente = data.taqComponente.toLowerCase();
        const categoria_id  = data.categoria_id.toLowerCase();
        const nombre        = data.nombre.toLowerCase();
        const estado        = data.estado.toLowerCase();
        const descripcion	  = data.descripcion.toLowerCase();
        const serial        = data.serial.toLowerCase();
        const horasuso      = data.horasuso.toLowerCase();
        return (
            taqComponente.includes(searchTerm)  ||
            categoria_id.includes(searchTerm)   ||
            nombre.includes(searchTerm)         ||
            estado.includes(searchTerm)         ||
            serial.includes(searchTerm)         ||
            descripcion.includes(searchTerm)    ||
            horasuso.includes(searchTerm)
        );
    });
    setComponentesFiltrados(filtered);
  };

  const [DocumentosFiltrados, setDocumentosFiltrados] = useState();
  const FiltroDocumentos = ( searchTerm ) => {
    const filtered = DocumentosData.filter((data) => { 
        const  taqom   = DocumentosData.taqom.toLowerCase();
        const  taqDoc  = DocumentosData.taqDoc.toLowerCase();
        const  nombre  = DocumentosData.nombre.toLowerCase();
        const  DocURL  = DocumentosData.DocURL.toLowerCase(); 
        return (
          taqom.includes(searchTerm)  ||
          taqDoc.includes(searchTerm) ||
          nombre.includes(searchTerm) ||
          DocURL.includes(searchTerm)
        );
    });
    setComponentesFiltrados(filtered);
  };

  const [DocumentosEliminadosFiltrados, setDocumentosEliminadosFiltrados] = useState();
  const FiltroDocumentosEliminados = ( searchTerm ) => {
    const filtered = DocumentosData.filter((data) => { 
        const taqDeleteRegister = DocumentosEliminadosData.taqDeleteRegister.toLowerCase();
        const taqom             = DocumentosEliminadosData.taqom.toLowerCase();
        const nombreDocumento   = DocumentosEliminadosData.nombreDocumento.toLowerCase();
        const Responsable       = DocumentosEliminadosData.responsable.nombre.toLowerCase();
        return (
          taqDeleteRegister.includes(searchTerm) ||
          taqom.includes(searchTerm)             ||
          nombreDocumento.includes(searchTerm)   ||
          Responsable.includes(searchTerm)
        );
    });
    setDocumentosEliminadosFiltrados(filtered);
  };

  const [MantenimientosFiltrados, setMantenimientosFiltrados] = useState();
  const FiltroMantenimientos = ( searchTerm ) => {
    const filtered = DocumentosData.filter((data) => {
        const taqmantenimiento  =  MttoData.taqmantenimiento.toLowerCase();
        const taqom             =  MttoData.taqom.toLowerCase();
        const Nombre            =  MttoData.Nombre.toLowerCase();
        const Descripcion       =  MttoData.Descripcion.toLowerCase(); 
        const tipe              =  MttoData.tipe.toLowerCase();
        return (
          taqmantenimiento.includes(searchTerm) ||
          taqom.includes(searchTerm)            ||
          Nombre.includes(searchTerm)           ||
          Descripcion.includes(searchTerm)      ||
          tipe.includes(searchTerm)
        );
    });
    FiltroMantenimientos(filtered);
  };
  
  const Data = [{  
    "id"         : '623026548',
    "nombre"     : "Responsable",
    "value"      : DataOms[0].responsable.nombre,
  },{  
    "id"         : '807708498',
    "nombre"     : "Descripcion",
    "value"      : DataOms[0].descripcion,
  },{  
    "id"         : '173944',
    "nombre"     : "ACTIVO",
    "value"      : DataOms[0].activos.nombre,
  },{  
    "id"         : '47175832',
    "nombre"     : "Fecha Inicio",
    "value"      : DataOms[0].fechainicio,
  }]

  const Buttons = [{  
    "id"         : '16256256',
    "label"      : "Componentes",
    "Myfunction" : ShowComponentes,
    "estado"     : ComponentesVinculadosPanel
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
    "label"      : "Mantenimientos",
    "Myfunction" : ShowMantenimientos,
    "estado"     : MantenimientosPanel
  }]
 
  const Panels = [{
    "id"         : "6b4fe94b95bb902a15", 
    "Tittle"     : "Componentes", 
    "Data"       : "", 
    "State"      : ComponentesVinculadosPanel,
    "add"        : true
  },
  {
    "id"         : "feddc0dab45263a21a", 
    "Tittle"     : "Documentos", 
    "Data"       : "", 
    "State"      : DocumentosPanel,
    "add"        : true
  },
  {
    "id"         : "8acfc6e23005040812", 
    "Tittle"     : "Documentos Eliminados", 
    "Data"       : "", 
    "State"      : DocumentosEliminadosPanel,
    "add"        : false
  },
  {
    "id"         : "be83a6a6312252cfa2ef", 
    "Tittle"     : "Actividades Mantenimientos", 
    "Data"       : DataOms[0].mantenimientos, 
    "State"      : MantenimientosPanel,
    "add"        : true
  }]

  return (
    <main className='w-full h-screen overflow-hidden  flex flex-col justify-start items-center '>
      <AppbarOms
        Objeto = { DataOms[0] }  
        ShowActions = { ShowActions } 
        ShowFormats = { ShowFormats }  
      />
      <div className="w-full h-full overflow-hidden overflow-y-auto flex flex-col lg:flex-row justify-start items-start">
        <div className="w-full h-auto px-4 py-2 lg:w-[20%]  gap-2 flex flex-col justify-start items-center">
          {
            Data ? (
              Data.map((data) => (
                <Caracteristica_target
                  key   = { data.id }
                  name  = { data.nombre }
                  value = { data.value }
                />
              ))
            ) : null
          }
        </div>
        <div className='hidden h-auto px-4 py-2 lg:w-auto  gap-2 lg:flex flex-col justify-start items-center'>
          {
            Buttons ? (
              Buttons.map((data) => (
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
            ComponentesVinculadosPanel ? (
              <div key = {`ComponentesSectionPanel`} className='w-full h-full flex flex-col justify-start items-center justify-items-center gap-2 p-4 overflow-y-auto'>
                <div className='w-full h-auto flex flex-col sm:flex-row justify-center items-center gap-3 px-2 py-1'>
                  <SearchInput SearchFunction = { FiltroComponentes } />
                  <div onClick = { ShowModal } className='w-full sm:w-auto h-auto text-center flex justify-center items-center px-2 py-1 border border-black hover:border-white rounded-md text-sm bg-green-500 hover:bg-green-800 text-white cursor-pointer duration-700 ease-in-out'>
                    Agregar Nuevo componente
                  </div>
                  <a href={`download/componentes`} className='w-full sm:w-auto h-auto text-center flex justify-center items-center px-2 py-1 border border-black hover:border-white rounded-md text-sm bg-green-500 hover:bg-green-800 text-white cursor-pointer duration-700 ease-in-out'>
                    Descargar Listado de componentes
                  </a>
                </div>
                <div className={`w-full h-full flex flex-col justify-start items-center gap-2 py-1 px-4  overflow-hidden overflow-y-auto`}>
                  {
                    ComponentesFiltrados ? (
                      ComponentesFiltrados.map((data) => (
                        <Link key={data.taqComponente} href={`/componente/${data.taqComponente}`} className='w-full h-auto flex  justify-between items-center bg-white border border-black px-4 py-2 cursor-pointer hover:bg-gray-800 hover:text-white transition duration-700 ease-in-out'>
                          { data.nombre }
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
                  <div onClick = { ShowModal } className='w-full sm:w-auto h-auto text-center flex justify-center items-center px-2 py-1 border border-black hover:border-white rounded-md text-sm bg-green-500 hover:bg-green-800 text-white cursor-pointer duration-700 ease-in-out'>
                    Agregar Nuevo Documento
                  </div> 
                </div>
                <div className={`w-full h-full flex flex-col justify-start items-center gap-2 py-1 px-4  overflow-hidden overflow-y-auto`}>
                  { 
                    DocumentosFiltrados ? (
                      DocumentosFiltrados.map((data) => (
                        <div key={data.taqDoc} className='w-full h-auto flex  justify-between items-center bg-white border border-black px-4 py-2 cursor-pointer hover:bg-gray-800 hover:text-white transition duration-700 ease-in-out'>
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
                    DocumentosEliminadosFiltrados ? (
                      DocumentosEliminadosFiltrados.map((data) => (
                        <div key={data.taqDoc} className='w-full h-auto flex  justify-between items-center bg-white border border-black px-4 py-2 cursor-pointer hover:bg-gray-800 hover:text-white transition duration-700 ease-in-out'>
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
              <div key = {`MttoSectionPanel`} className='w-full h-full flex flex-col justify-start items-center justify-items-center gap-2 p-4 overflow-y-auto'>
                <div className='w-full h-auto flex flex-col sm:flex-row justify-center items-center gap-3 px-2 py-1'>
                  <SearchInput SearchFunction = { FiltroMantenimientos } /> 
                  <div onClick = { ShowModal } className='w-full sm:w-auto h-auto text-center flex justify-center items-center px-2 py-1 border border-black hover:border-white rounded-md text-sm bg-green-500 hover:bg-green-800 text-white cursor-pointer duration-700 ease-in-out'>
                    Agregar Nuevo Mtto
                  </div> 
                </div>                
                <div className={`w-full h-full flex flex-col justify-start items-center gap-2 py-1 px-4  overflow-hidden overflow-y-auto`}>
                  { 
                    MantenimientosFiltrados ? (
                      MantenimientosFiltrados.map((data) => (
                        <div key={data.taqmantenimiento} className='w-full h-auto flex  justify-between items-center bg-white border border-black px-4 py-2 cursor-pointer hover:bg-gray-800 hover:text-white transition duration-700 ease-in-out'>
                          { data.nombre }
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
          AccionesModal ? (
            <Actions 
              Acctions = { AcctionsButtons }
              Acciones = { Acciones } 
              key = {`a300c473056b301c`}
            >
              
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
            <CreateMantenimiento
              onClose = { () => setShowModal(false) }
              taqom   = { DataOms[0].taqom }
            />
          ) : null
        }
      </Modal>       
    </main>
  )
}


export default OmsPage ;