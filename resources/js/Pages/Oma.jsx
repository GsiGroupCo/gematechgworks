import Modal from "@/Components/Panels/Modals/Modal"
import Actions from "@/Components/UI/Actions"
import ButtonMenu from "@/Components/UI/Activo/ButtonMenu"  
import Caracteristica_target from "@/Components/UI/Activo/Caracteristica_target"
import AppbarOms from "@/Components/UI/Ots/Appbar" 
import AsingWorker from "@/Components/forms/Mantenimiento/Actividades/AsingWorker"
import SearchInput from "@/Components/UI/Search"
import CreateMantenimiento from "@/Components/forms/Mantenimiento/CreateMantenimientoComponente"
import EditOms from "@/Components/forms/Oms/EditOms" 
import { useForm } from "@inertiajs/react"
import { useEffect, useState } from "react"

const OmsPage = ({ DataOms, ActivosList, ResponsablesList }) => {
 
  const [CreateFormModal, setCreateFormModal] = useState(false)
  
  const [AsingWorkerState, setAsingWorkerState] = useState(false) 
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
  
  function ShowActionButtons(){
    setEditarOm(false)
    setAcctionsButtons(true)
  }
 
  function ShowFormEditOm(){ 
    setAcctionsButtons(false)
    setEditarOm(true)
  }
 
  const { data, post } = useForm() 

  const Acciones = [{
      "id"         : "296215696",
      "label"      : "Editar Orden de mantenimiento",
      "estate"     : 2,
      "function"   : ShowFormEditOm,
  },{
      "id"         : "1213522726",
      "label"      : "Finalizar Orden de mantenimiento",
      "estate"     : 1,
      "function"   : () => { 
        data.taqom = DataOms[0].taqom 
        post('/oms/close');
      },
  }]

  const [DocumentosPanel, setDocumentosPanel]                       = useState(false)
  const [DocumentosEliminadosPanel, setDocumentosEliminadosPanel]   = useState(false)
  const [MantenimientosPanel, setMantenimientosPanel]               = useState(false) 
     
  function ShowDefault(){
    setDocumentosPanel(false)
    setDocumentosEliminadosPanel(false) 
    setMantenimientosPanel(false)
  }
   
  function ShowDocumentos() {
    if(DocumentosPanel){      
      ShowDefault()
    }else{
      setDocumentosEliminadosPanel(false) 
      setMantenimientosPanel(false)
      setDocumentosPanel(true)
    }
  }

  function ShowDocumentosEliminados() {
    if(DocumentosEliminadosPanel){
      ShowDefault()
    }else{
      setMantenimientosPanel(false)
      setDocumentosPanel(false)
      setDocumentosEliminadosPanel(true) 
    }
  }

  function ShowMantenimientos() {
    if(MantenimientosPanel){
      ShowDefault()
    }else{
      setDocumentosPanel(false)
      setDocumentosEliminadosPanel(false) 
      setMantenimientosPanel(true)
    }
  } 
  
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

  const ActividadesData = [];
  DataOms.forEach(Om => {
    Om.actividades.forEach(ActData => { 
      ActividadesData.push({
        actividad_id   : ActData.actividad_id,
        nombre         : ActData.nombre,
        descripcion    : ActData.descripcion,
        responsable    : ActData.responsable.nombre ? ActData.responsable.nombre : '',
        sistema        : ActData.sistema,
        frecuencia     : ActData.frecuencia, 
        tipofrecuencia : ActData.tipofrecuencia
      });
    });
  }); 

  useEffect(() => {
    setDocumentosFiltrados(DocumentosData)
    setDocumentosEliminadosFiltrados(DocumentosEliminadosData)
    setActividadesFiltrados(ActividadesData)
  }, [DataOms])
  
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

  const [ActividadesFiltrados, setActividadesFiltrados] = useState();
  const FiltroActividades = ( searchTerm ) => {
    const filtered = ActividadesData.filter((ActData) => {
        const actividad_id   = ActData.actividad_id.toLowerCase();
        const nombre         = ActData.nombre.toLowerCase();
        const descripcion    = ActData.descripcion.toLowerCase();
        const responsable    = ActData.responsable.nombre.toLowerCase();
        const sistema        = ActData.sistema.toLowerCase();
        const frecuencia     = ActData.frecuencia.toLowerCase(); 
        const tipofrecuencia = ActData.tipofrecuencia.toLowerCase();
        return (
          actividad_id.includes(searchTerm)   ||
          nombre.includes(searchTerm)         ||
          descripcion.includes(searchTerm)    ||
          responsable.includes(searchTerm)    ||
          sistema.includes(searchTerm)        ||
          frecuencia.includes(searchTerm)     ||
          tipofrecuencia.includes(searchTerm)
        );
    });
    setActividadesFiltrados(filtered);
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
    "id"         : '8842172',
    "label"      : "Actividades de mantenimiento",
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
              <div key = {`MttoActividadesPanel`} className='w-full h-full flex flex-col justify-start items-center justify-items-center gap-2 p-4 overflow-y-auto'>
                <div className='w-full h-auto flex flex-col sm:flex-row justify-center items-center gap-3 px-2 py-1'>
                  <SearchInput SearchFunction = { FiltroActividades } /> 
                  <div onClick = { ShowModal } className='w-full sm:w-auto h-auto text-center flex justify-center items-center px-2 py-1 border border-black hover:border-white rounded-md text-sm bg-green-500 hover:bg-green-800 text-white cursor-pointer duration-700 ease-in-out'>
                    Agregar Nueva actividad
                  </div> 
                </div>                
                <div className={`w-full h-full flex flex-col justify-start items-center gap-2 py-1 px-4  overflow-hidden overflow-y-auto`}>
                  { 
                    ActividadesFiltrados ? (
                      ActividadesFiltrados.map((data) => (
                        <div key = { data.actividad_id } className='w-full h-auto flex justify-between items-center border border-black cursor-pointer px-4 py-2'>
                          <div className="w-auto flex flex-col justify-start items-start gap-2">
                            <span className='w-auto h-full font-bold text-lg '>
                              { data.nombre }
                            </span>
                            <span className='w-auto h-full '>
                              { data.descripcion }
                            </span>
                            <span className='w-auto h-full '>
                              { data.responsable }
                            </span>
                          </div>
                          <div className='w-auto h-full  flex justify-end items-center gap-1'>
                            <span onClick = { () => setAsingWorkerState(true) } className='w-auto h-auto px-4 py-2 rounded-md  shadow-sm flex border border-black hover:border-white shadow-blackflex justify-center items-center bg-green-500 hover:bg-green-800 transition duration-700 ease-in-out text-black hover:text-white font-semibold'>
                              Asignar Responsable  
                            </span>
                            <span onClick = { () => {} } className='w-auto h-auto px-4 py-2 rounded-md  shadow-sm flex border border-black hover:border-white shadow-blackflex justify-center items-center bg-yellow-500 hover:bg-yellow-800 transition duration-700 ease-in-out text-black hover:text-white font-semibold'>
                              Editar  
                            </span>
                            <span onClick = { () => {} } className='w-auto h-auto px-4 py-2 rounded-md  shadow-sm flex border border-black hover:border-white shadow-blackflex justify-center items-center bg-red-500 hover:bg-red-800 transition duration-700 ease-in-out text-black hover:text-white font-semibold'>
                              Eliminar
                            </span>
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
          AccionesModal ? (
            <Actions 
              Acctions = { AcctionsButtons }
              Acciones = { Acciones } 
              key = {`a300c473056b301c`}
            >
              {
                EditarOm ? (
                  <EditOms
                    Activos = { ActivosList }
                    Om = { DataOms[0] }
                    Responsables = { ResponsablesList }
                    onClose = { () => setShowModal(false) }
                  />
                ) : null
              }
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
      <Modal
        isVisible = { AsingWorkerState }
        onClose = { () => setAsingWorkerState(false) }
        tittle = {`Asignar trabajador`}
      >
         <AsingWorker Responsables = { ResponsablesList } onClose = { () => setAsingWorkerState(false) } route = {`/actividad/oma/asing`} />
      </Modal>       
    </main>
  )
}


export default OmsPage ;