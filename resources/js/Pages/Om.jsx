
import React, {useEffect, useState } from 'react' 
import Caracteristica_target from '@/Components/UI/Activo/Caracteristica_target';
import ButtonMenu from '@/Components/UI/MenuButton';
import Modal from '@/Components/Panels/Modals/Modal'; 
import Panel_general from '@/Components/UI/Panel_general';
import { Toaster, toast } from 'sonner';
import ActivoIcon from '@/Components/Icons/activo';
import { Link } from '@inertiajs/react';
import DeleteDocument from '@/Components/forms/Oms/Documentos/FormDeleteDocuments/FormDeleteDocuments'; 
import ActionsWork from '@/Components/UI/Ots/Trabajo/Actions';

const OTpage = ({ data, error, status, Activos, Responsables, Empresas, ResponsablesOT }) => {

  const nombresAreas = [];

  
  const [showMenu, setShowMenu] = useState(false);

  for (let i = 0; i < data.data.length; i++) {
    for (let j = 0; j < data.data[i].areas.length; j++) { 
      for (let k = 0; k < data.data[i].areas[j].area.length; k++) {
        nombresAreas.push(data.data[i].areas[j].area[k].nombre);
      }
    } 
  }

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
  

  const [TrabajoSelectd, setTrabajoSelectd] = useState({
    'taqtrabajo'     : "",
    'taqresponsable' : "",
    'taqot'          : "",
    'descripcion'    : "",
    'cantHoras'      : "",
    'estado'         : "" 
  })
  const [ModalTrabajo, setModalTrabajo] = useState(false)
  const [ModalActionWork, setModalActionWork] = useState(false)
  
  const [Default, setDefault] = useState(false)
  const [Panel_Trabajos, setPanel_Trabajos] = useState(true)
  const [Panel_Activos, setPanel_Activos] = useState(false)
  const [Panel_Documentos, setPanel_Documentos] = useState(false)
  const [Panel_Documentos_Eliminados, setPanel_Documentos_Eliminados] = useState(false)
  const [ShowModalDocs, setShowModalDocs] = useState(false)
  const [DeleteDocuments, setDeleteDocuments] = useState(false)
  const [TaqDocument, setTaqDocument] = useState()
  const [DocumentSelected, setDocumentSelected] = useState({
   taqom:'',
    taqDoc:'',
    nombre:'',
    DocURL:''
  })

  function ShowDocument(Document){
    setDocumentSelected({
     taqom:Document.taqot,
      taqDoc:Document.taqDoc,
      nombre:Document.nombre,
      DocURL:Document.DocURL
    })
    setShowModalDocs(true)
  }

  function ShowDefault(){ 
    setPanel_Trabajos(false)
    setPanel_Activos(false)
    setPanel_Documentos(false)
    setPanel_Documentos_Eliminados(false)
    setDefault(true)
  }

  function ShowPanel_Trabajos() {
    if(Panel_Trabajos){
      ShowDefault()
    }else{
      setDefault(false)
      setPanel_Activos(false)
      setPanel_Documentos(false)
      setPanel_Documentos_Eliminados(false)
      setPanel_Trabajos(true)
    }
  }
  
  const TrabajosData = [];
  data.data.forEach(data => {
    data.trabajos.forEach(data => {
      TrabajosData.push({
        taqtrabajo      :data.taqtrabajo,
        taqresponsable  :data.taqresponsable,
        responsable     :data.responsable.primernombre + ' ' + data.responsable.primerapellido,
       taqom           :data.taqot,
        descripcion     :data.descripcion,
        cantHoras       :data.cantHoras,
        estado          :data.estado,
        created_at      :data.created_at,
      });
    });
  });

  useEffect(() => {  
    setTrabajosDataFiltrados(TrabajosData)
  }, [data])
  
  const [TrabajosDataFiltrados, setTrabajosDataFiltrados] = useState();
  const FilterTrabajos = ( searchTerm ) => {
    const filtered = TrabajosData.filter((data) => {
        const taqtrabajo       = data.taqtrabajo.toLowerCase();
        const taqresponsable   = data.taqresponsable.toLowerCase();
        consttaqom            = data.taqot.toLowerCase();
        const descripcion      = data.descripcion.toLowerCase();
        const cantHoras        = data.cantHoras.toLowerCase();
        const estado           = data.estado.toLowerCase();
        return (
          taqtrabajo.includes(searchTerm)      ||
          taqresponsable.includes(searchTerm)  ||
         taqom.includes(searchTerm)           || 
          descripcion.includes(searchTerm)     || 
          cantHoras.includes(searchTerm)       || 
          estado.includes(searchTerm)          
        );
    });
    setTrabajosDataFiltrados(filtered);
  };

  const ActivosData = [];
  data.data.forEach(data => {
    data.activos.forEach(data => {
      ActivosData.push({
        taqActivos      :data.taqActivos,
        nombre          :data.activos.nombre,
        serial          :data.activos.serial,
      });
    });
  });

  useEffect(() => {  
    setActivosDataFiltrados(ActivosData)
  }, [data])
  
  const [ActivosDataFiltrados, setActivosDataFiltrados] = useState();
  const FilterActivos = ( searchTerm ) => {
    const filtered = ActivosData.filter((data) => {
        const taqActivos  = data.taqActivos.toLowerCase();
        const nombre      = data.nombre.toLowerCase();
        const serial      = data.serial.toLowerCase();
        return (
          taqActivos.includes(searchTerm)  ||
          nombre.includes(searchTerm)      || 
          serial.includes(searchTerm)      
        );
    });
    setActivosDataFiltrados(filtered);
  };

  const DocumentosData = [];
  data.data.forEach(data => {
    data.documentos.forEach(data => {
      DocumentosData.push({
       taqom       :data.taqot,
        taqDoc      :data.taqDoc,
        nombre      :data.nombre,
        DocURL      :data.DocURL,
      });
    });
  });

  useEffect(() => {  
    setDocumentosDataFiltrados(DocumentosData)
  }, [data])
  
  const [DocumentosDataFiltrados, setDocumentosDataFiltrados] = useState();
  const FilterDocumentos = ( searchTerm ) => {
    const filtered = DocumentosData.filter((data) => {
        consttaqom     = data.taqot.toLowerCase();
        const taqDoc    = data.taqDoc.toLowerCase();
        const nombre    = data.nombre.toLowerCase();
        const DocURL    = data.DocURL.toLowerCase();
        return (
          taqDoc.includes(searchTerm)    ||
          nombre.includes(searchTerm)    ||
         taqom.includes(searchTerm)     || 
          DocURL.includes(searchTerm)  
        );
    });
    setDocumentosDataFiltrados(filtered);
  };
  

  const DocumentosEliminadosData = [];
  data.data.forEach(data => {
    data.documentos__eliminados.forEach(data => {
      DocumentosEliminadosData.push({
        taqDeleteRegister :data.taqDeleteRegister,
        taqDoc            :data.taqDoc,
        nombreDocumento   :data.nombreDocumento,
        taqresponsable    :data.taqresponsable,
        responsable       :data.responsable.nombre,
      });
    });
  });

  useEffect(() => {  
    setDocumentosEliminadosDataFiltrados(DocumentosEliminadosData)
  }, [data])
  
  const [DocumentosEliminadosDataFiltrados, setDocumentosEliminadosDataFiltrados] = useState();
  const FilterDocumentosEliminados = ( searchTerm ) => {
    const filtered = DocumentosEliminadosData.filter((data) => {
        const taqDeleteRegister  = data.taqDeleteRegister .toLowerCase();
        const taqDoc             = data.taqDoc .toLowerCase();
        const nombreDocumento    = data.nombreDocumento.toLowerCase();
        const taqresponsable     = data.taqresponsable.toLowerCase();
        return (
          taqDoc.includes(searchTerm)             ||
          taqDeleteRegister.includes(searchTerm)  ||
          nombreDocumento.includes(searchTerm)    || 
          taqresponsable.includes(searchTerm)            
        );
    });
    setTrabajosDataFiltrados(filtered);
  };
  


  function ShowActivosPanel() {
    if(Panel_Activos){
      ShowDefault()
    }else{
      setDefault(false)
      setPanel_Documentos(false)
      setPanel_Documentos_Eliminados(false)
      setPanel_Trabajos(false)
      setPanel_Activos(true)
    }
  }

  function ShowPanel_Documentos() {
    if(Panel_Documentos){
      ShowDefault()
    }else{
      setDefault(false)
      setPanel_Documentos_Eliminados(false)
      setPanel_Trabajos(false)
      setPanel_Activos(false)
      setPanel_Documentos(true)
    }
  }

  function ShowPanel_Documentos_Eliminados(){
    if(Panel_Documentos_Eliminados){
      ShowDefault()
  }else{
    setDefault(false)
    setPanel_Trabajos(false)
    setPanel_Activos(false)
    setPanel_Documentos(false)
    setPanel_Documentos_Eliminados(true)
  }
  }

  const Data = [{  
    "id"         : '6991098',
    "nombre"     : "RESPONSABLE",
    "value"      : data.data[0].responsable.primernombre + ' ' + data.data[0].responsable.primerapellido,
  },{  
    "id"         : '2284348',
    "nombre"     : "DESCRIPCION",
    "value"      : data.data[0].descripcion ? data.data[0].descripcion : '',
  },{  
    "id"         : '1812700',
    "nombre"     : " empresa",
    "value"      : data.data[0]. empresa.nombre ? data.data[0]. empresa.nombre : '',
  },{  
    "id"         : '181272100',
    "nombre"     : "CLASIFICACION",
    "value"      : data.data[0].clasot,
  },{  
    "id"         : '3962184',
    "nombre"     : "FECHA DE REGISTRO",
    "value"      : data.data[0].created_at,
  },{  
    "id"         : '7530545',
    "nombre"     : "FECHA DE INICIO",
    "value"      : data.data[0].fechainicio,
  },{  
    "id"         : '4968949',
    "nombre"     : "FECHA DE FINALIZACION",
    "value"      : data.data[0].fechafin,
  }]  

  const Buttons = [{
    "id"         : '6667021365',
    "label"      : "Activos Vinculados",
    "Myfunction" : ShowActivosPanel,
    "icon"       : <ActivoIcon color='#FFF' height='30px' width='30px'/>,
    "estado"     : Panel_Activos
  },{  
    "id"         : '7779677',
    "label"      : "Trabajos",
    "icon"       : <OtsIcon color='#FFF' height='30px' width='30px'/>,
    "Myfunction" : ShowPanel_Trabajos,
    "estado"     : Panel_Trabajos
  },{
    "id"         : '3740328',
    "label"      : "Documentos",
    "Myfunction" : ShowPanel_Documentos,
    "icon"       : <OtsIcon color='#FFF' height='30px' width='30px'/>,
    "estado"     : Panel_Documentos
  },{
      "id"         : '6667065',
      "label"      : "Documentos Eliminados",
      "Myfunction" : ShowPanel_Documentos_Eliminados,
      "icon"       : <OtsIcon color='#FFF' height='30px' width='30px'/>,
      "estado"     : Panel_Documentos_Eliminados
  }]

  return (
    <main className='w-full h-screen flex flex-col justify-start items-start justify-items-center'>
      <OtsAppbar
        Responsables = { Responsables }
        ResponsablesOT = { ResponsablesOT } 
        Activos = { Activos }
        ot = { data } 
        empresa = { data.data[0]. empresa.nombre ? data.data[0]. empresa.nombre : '' }
        key = { data.data[0].taqot }
        estado = { data.data[0].estado }
        Empresas = { Empresas }
      />
      <div className='w-full h-auto  flex justify-start items-center justify-items-center gap-3'>
        <div key={`3215451`} className='hidden w-[25%] md:flex flex-col justify-start items-start justify-items-center gap-3  px-4 py-2 h-full rounded-md bg-white '>
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
          {nombresAreas.map((nombre, index) => (
            <Caracteristica_target
            name = {`Area Responsable`}
            key = { index }
            value = { nombre }
          />
          ))}
          {
            data.data[0].areas ? (
                data.data[0].areas.map( (data) => (
                  <Caracteristica_target
                    name = { data.nombre }
                    key = { data.id }
                    value = { data.value }
                  />
                ))
            ) : null
          }
        </div>
        <div className='w-full h-full   flex justify-start items-center justify-items-center gap-3'>
          <div className='hidden md:flex flex-col px-4 py-2 justify-start items-center justify-items-center gap-3 w-auto h-full  rounded-md '>
            {
              Buttons ? (
                Buttons.map( (data) => (
                  <ButtonMenu
                    Myfunction = { data.Myfunction }
                    label = { data.label }
                    estado = { data.estado }
                    key = { data.id } 
                  >
                    { data.icon }
                  </ButtonMenu>
                ))
              ) : null
            }
          </div>
          <div className='w-full h-full'>
            {
              Default ? 
                  <div className='w-full h-full px-4 py-2 flex flex-col justify-start items-center justify-items-center '>
                      
                  </div>
              : null
            }
            {
              Panel_Activos ? (
                <Panel_general FunctionfilterData = { FilterActivos } key = '50111238'>
                  {
                      ActivosDataFiltrados ? (
                          ActivosDataFiltrados.map((data) => (
                            <Link href={`/activo/${data.taqActivos}`} key = {data.taqActivos} className='w-full h-auto flex justify-between items-center border border-black px-4 py-2 cursor-pointer hover:bg-gray-800 hover:text-white transition duration-700 ease-in-out'>
                              <div className='w-auto flex flex-col justify-center items-start h-full'>
                                <span className='font-semibold'> Activo: </span>
                                <span>{ data.nombre }</span>
                              </div>
                              <div className='w-auto flex  flex-col justify-center items-start h-full'>
                                <span className='font-semibold'>Serial:</span>
                                <span>{ data.serial }</span>
                              </div>
                            </Link>
                          ))
                      ) : null
                  }
                </Panel_general>
              ): null
            }  
            {
              Panel_Trabajos ? (
                <Panel_general FunctionfilterData = { FilterTrabajos } key = '50118'>
                  { 
                      TrabajosDataFiltrados ? (
                        TrabajosDataFiltrados.sort((a, b) => new Date(b.created_at) - new Date(a.created_at)).reverse()
                          .map((data) => (
                            <div key={data.taqtrabajo} className='w-full h-auto flex justify-between gap-3 items-center border border-black px-4 py-2 cursor-pointer hover:bg-gray-800 hover:text-white transition duration-700 ease-in-out'>
                              <div className='w-full   h-full flex justify-start items-center '>
                                {data.descripcion}
                              </div>
                              <div className='w-1/4   h-auto flex justify-around items-center gap-3'>
                                <div className='w-1/2 h-full flex justify-start items-center'>
                                  {data.responsable}
                                </div>
                                <button onClick={() => {
                                  setModalActionWork(true)
                                  setTrabajoSelectd({
                                    cantHoras:     data.cantHoras,
                                    descripcion:   data.descripcion,
                                    estado:        data.estado,
                                   taqom:         data.taqot,
                                    taqresponsable:data.taqresponsable,
                                    taqtrabajo:    data.taqtrabajo
                                  })
                                }} className='w-1/2 h-auto px-4 py-2 bg-green-500 hover:bg-green-800 text-white transition duration-700 ease-in-out rounded-md'>
                                  Acciones
                                </button> 
                              </div>
                            </div>
                          ))
                      ) : null
                  }
                  <Modal
                    isVisible={ModalActionWork}
                    onClose={ () => setModalActionWork(false) }
                    tittle={`Acciones de trabajo`}
                  >
                    <ActionsWork Responsables={Responsables} Trabajo={TrabajoSelectd}  onClose={ () => setModalActionWork(false) } />
                  </Modal> 
                </Panel_general>
              ): null
            }  
            {
              Panel_Documentos ? (
                <Panel_general FunctionfilterData = { FilterDocumentos } key = {`501128`}>
                  {
                      DocumentosDataFiltrados ? (
                          DocumentosDataFiltrados.map((data) => (
                            <div key = { data.taqDoc } className='w-full h-auto flex justify-between items-center border border-black px-4 py-2 cursor-pointer hover:bg-gray-800 hover:text-white transition duration-700 ease-in-out'>
                              <div className='w-1/2  flex justify-start items-center h-full'>
                                { data.nombre }
                              </div>
                              <div className='w-1/2  flex justify-end items-center h-full gap-3'>
                                <div onClick={ () => ShowDocument(data) } className='w-auto h-full bg-green-500 px-4 py-2  text-white hover:bg-green-800 hover:border-white transition duration-700 ease-in-out cursor-pointer'>
                                  Ver
                                </div>
                                <div onClick = { () => {
                                    setTaqDocument(data.taqDoc)
                                    setDeleteDocuments(true)
                                  }}
                                className='w-auto h-full bg-red-500 px-4 py-2  text-white hover:bg-red-800 hover:border-white transition duration-700 ease-in-out cursor-pointer'>
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
              ): null
            } 
            {
              Panel_Documentos_Eliminados ? (
                <Panel_general FunctionfilterData = { FilterDocumentosEliminados } key = {`501231128`}>
                  {
                      DocumentosEliminadosDataFiltrados ? (
                          DocumentosEliminadosDataFiltrados.map((data) => (
                            <div key = { data.taqDoc } className='w-full h-auto flex justify-between items-center border border-black px-4 py-2 cursor-pointer hover:bg-gray-800 hover:text-white transition duration-700 ease-in-out'>
                              <div className='w-1/2  flex justify-start items-center h-full'>
                                { data.nombreDocumento }
                              </div>
                              <div className='w-1/2  flex justify-end items-center h-full'>
                                { data.responsable }
                              </div>
                            </div>
                          ))
                      ) : null
                  }
                </Panel_general>
              ): null
            }             
          </div>
        </div>
      </div>
      <Modal
        isVisible = { ShowModalDocs }
        onClose = { () => setShowModalDocs(false) }
        tittle = {DocumentSelected.nombre} 
      >
        <div className='w-[900px] h-[800px]'>
          <embed src={`https://gworks.gematech.co/storage/Oms/${DocumentSelected.DocURL}`} type="application/pdf" className='w-full h-full' />
        </div>
      </Modal>
      <Toaster richColors position='top-center'/>
    </main>
  )
}

export default OTpage;