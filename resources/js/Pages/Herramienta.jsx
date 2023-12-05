import { useEffect, useState } from 'react'
import DownloadIcon from '@/Components/Icons/download';
import ActivoIcon from '@/Components/Icons/activo';
import MantoIcon from '@/Components/Icons/manto';
import omsIcon from '@/Components/Icons/ots';
import HerramientaAppbar from '@/Components/UI/Herramienta/Appbar';
import Caracteristica_target from '@/Components/UI/Activo/Caracteristica_target';
import ButtonMenu from '@/Components/UI/ButtonMenu';
import Panel_general from '@/Components/UI/Panel_general';
import { Toaster, toast } from 'sonner';
import Modal from '@/Components/Panels/Modals/Modal';
import DeleteDocument from '@/Components/forms/Herramientas/Documentos/FormDeleteDocuments/FormDeleteDocuments';
import { useForm } from '@inertiajs/react';

const empresaPage = ({ herramienta, Responsables, status, error, Caracteristicas, Empresas, Categorias }) => {

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

  const [Panel_Actividades, setPanel_Actividades] = useState(false)
  const [PanelDocumentos, setPanelDocumentos] = useState(false)
  const [PanelDocumentosEliminados, setPanelDocumentosEliminados] = useState(false)
  const [PanelMantenimientoCorrectivo, setPanelMantenimientoCorrectivo] = useState(false)
  const [PanelMantenimientoPreventivo, setPanelMantenimientoPreventivo] = useState(false)

  const [TaqDocument, setTaqDocument] = useState()
  const [DeleteDocuments, setDeleteDocuments] = useState(false)

  const [ModalDocs, setModalDocs] = useState(false) 
  const [DocSelected, setDocSelected] = useState({
    nombre:'',
    url:'',
    taqDoc:''
  })

  const { data, post } = useForm()

  function ShowModalDoc(dataDoc){
    setModalDocs(true)
    setDocSelected({
      nombre:dataDoc.nombre,
      url:dataDoc.DocURL,
      taqDoc:dataDoc.taqDoc
    })
  }
  
  function ShowActividades() {
    if(Panel_Actividades){
        setPanelMantenimientoCorrectivo(false)
        setPanelMantenimientoPreventivo(false)
        setPanelDocumentos(false)
        setPanelDocumentosEliminados(false)
        setPanel_Actividades(false)
        setDefault(true)
    }else{
      setDefault(false)
      setPanelMantenimientoCorrectivo(false)
      setPanelMantenimientoPreventivo(false)
      setPanelDocumentos(false)
      setPanelDocumentosEliminados(false)
      setPanel_Actividades(true)
    }
  }

  function ShowMantenimientoCorrectivo() {
    if(PanelMantenimientoCorrectivo){
        setPanelMantenimiento(false)
        setPanelDocumentos(false)
        setPanelDocumentosEliminados(false)
        setPanel_Actividades(false)
        setDefault(true)
    }else{
      setPanelDocumentos(false)
      setPanelDocumentosEliminados(false)
      setPanel_Actividades(false)
      setDefault(false)
      setPanelMantenimientoPreventivo(false)
      setPanelMantenimientoCorrectivo(true)
    }
  }
  function ShowMantenimientoPreventivo() {
    if(PanelMantenimientoPreventivo){
        setPanelMantenimiento(false)
        setPanelDocumentos(false)
        setPanelDocumentosEliminados(false)
        setPanel_Actividades(false)
        setDefault(true)
    }else{
      setPanelDocumentos(false)
      setPanelDocumentosEliminados(false)
      setPanel_Actividades(false)
      setDefault(false)
      setPanelMantenimientoCorrectivo(false)
      setPanelMantenimientoPreventivo(true)
    }
  }

  function ShowDocumentos() {
    if(PanelDocumentos){
        setPanelMantenimientoCorrectivo(false)
        setPanelMantenimientoPreventivo(false)
        setPanelDocumentosEliminados(false)
        setPanel_Actividades(false)
        setPanelDocumentos(false)
        setDefault(true)
    }else{
      setPanelMantenimientoCorrectivo(false)
      setPanelMantenimientoPreventivo(false)
      setPanelDocumentosEliminados(false)
      setPanel_Actividades(false)
      setDefault(false)
      setPanelDocumentos(true)
    }
  }
  
  function showDocumentosEliminados() {
    if(PanelDocumentosEliminados){
        setPanelMantenimientoCorrectivo(false)
        setPanelMantenimientoPreventivo(false)
        setPanelDocumentosEliminados(false)
        setPanel_Actividades(false)
        setPanelDocumentos(false)
        setDefault(true)
    }else{
      setPanelMantenimientoCorrectivo(false)
      setPanelMantenimientoPreventivo(false)
      setPanel_Actividades(false)
      setDefault(false)
      setPanelDocumentos(false)
      setPanelDocumentosEliminados(true)
    }
  }

  function Retonar(TaqMov){
    data.taqMovher = TaqMov
    data.origin = 'HerramientaPage'
    post(`/movimiento/herramienta/end`)
  }
  
  const Data = [{  
    "id"         : '573588',
    "nombre"     : "TAQ",
    "value"      : herramienta[0].taqHer,
  },{  
    "id"         : '910476',
    "nombre"     : "AREA",
    "value"      : herramienta[0].area,
  },{  
    "id"         : '437004',
    "nombre"     : "HORAS USO",
    "value"      : herramienta[0].horasuso ? herramienta[0].horasuso : '',
  }]
  
  const Buttons = [{  
    "id"         : '726064',
    "label"      : "Actividades",
    "icon"       : <ActivoIcon color='#FFF' height='30px' width='30px'/>,
    "Myfunction" : ShowActividades,
    "estado"     : Panel_Actividades
  },{
    "id"         : '83231263',
    "label"      : "Mantenimientos Correctivos",
    "Myfunction" : ShowMantenimientoCorrectivo,
    "icon"       : <MantoIcon color='#FFF' height='30px' width='30px'/>,
    "estado"     : PanelMantenimientoCorrectivo
  },{
    "id"         : '832363',
    "label"      : "Mantenimientos Preventivos",
    "Myfunction" : ShowMantenimientoPreventivo,
    "icon"       : <MantoIcon color='#FFF' height='30px' width='30px'/>,
    "estado"     : PanelMantenimientoPreventivo
  },{
    "id"         : '648854',
    "label"      : "Documentos",
    "Myfunction" : ShowDocumentos,
    "icon"       : <OtsIcon color='#FFF' height='30px' width='30px'/>,
    "estado"     : PanelDocumentos
  },{
    "id"         : '694014',
    "label"      : "Documentos Eliminados",
    "Myfunction" : showDocumentosEliminados,
    "icon"       : <OtsIcon color='#FFF' height='30px' width='30px'/>,
    "estado"     : PanelDocumentosEliminados
  }]

  const documentosData = [];
  herramienta.forEach(herramienta => {
    herramienta.documentos.forEach(data => {
      documentosData.push({
        taqHer     : data.taqHer,
        taqDoc     : data.taqDoc,
        nombre     : data.nombre,
        DocURL     : data.DocURL,
      });
    });
  });

  useEffect(() => {  
    setDocumentosDataFiltrados(documentosData)
  }, [herramienta])
  
  const [DocumentosDataFiltrados, setDocumentosDataFiltrados] = useState();
  const FilterMttoPreventivo = ( searchTerm ) => {
    const filtered = MovimientosData.filter((data) => {
        const taqmttActivo   = data.taqmttActivo.toLowerCase();
        const taqManto       = data.taqManto.toLowerCase();
        const actividad      = data.actividad.toLowerCase();
        const taqActivos     = data.taqActivos.toLowerCase();
        const taqresponsable = data.taqresponsable.toLowerCase();
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
          area.includes(searchTerm)           ||
          cantDocs.includes(searchTerm)       ||
          estado.includes(searchTerm)         ||
          fecha.includes(searchTerm)          ||
          fechaFin.includes(searchTerm)    
        );
    });
    setDocumentosDataFiltrados(filtered);
  };


  const MantenimientosData = [];
  herramienta.forEach(herramienta => {
    herramienta.documentos.forEach(data => {
      MantenimientosData.push({
        taqHer     : data.taqHer,
        taqDoc     : data.taqDoc,
        nombre     : data.nombre,
        DocURL     : data.DocURL,
      });
    });
  });

  useEffect(() => {  
    setMttoCorrectivosFiltrados(MantenimientosData)
  }, [herramienta])
  
  const [MttoCorrectivosFiltrados, setMttoCorrectivosFiltrados] = useState();
  const FilterMttoCorrectivo = ( searchTerm ) => {
    const filtered = MovimientosData.filter((data) => {
        const taqmttActivo   = data.taqmttActivo.toLowerCase();
        const taqManto       = data.taqManto.toLowerCase();
        const actividad      = data.actividad.toLowerCase();
        const taqActivos     = data.taqActivos.toLowerCase();
        const taqresponsable = data.taqresponsable.toLowerCase();
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
          area.includes(searchTerm)           ||
          cantDocs.includes(searchTerm)       ||
          estado.includes(searchTerm)         ||
          fecha.includes(searchTerm)          ||
          fechaFin.includes(searchTerm)    
        );
    });
    setMttoCorrectivosFiltrados(filtered);
  };
  
const documentosEliminadosData = [];
  herramienta.forEach(herramienta => {
    herramienta.documentos__eliminados.forEach(data => {
      documentosEliminadosData.push({
        taqDeleteRegister   : data.taqDeleteRegister ,
        taqHer              : data.taqHer,
        responsable         : data.responsable.nombre,
        nombreDocumento     : data.nombreDocumento,
        taqresponsable      : data.taqresponsable ,
      });
    });
  });

  useEffect(() => {  
    setDocumentosEliminadosDataFiltrados(documentosEliminadosData)
  }, [herramienta])
  
  const [DocumentosEliminadosDataFiltrados, setDocumentosEliminadosDataFiltrados] = useState();
  const FilterDocumentosEliminados = ( searchTerm ) => {
    const filtered = MovimientosData.filter((data) => {
        const taqDeleteRegister  = data.taqDeleteRegister.toLowerCase();
        const taqHer             = data.taqHer.toLowerCase();
        const nombreDocumento    = data.nombreDocumento.toLowerCase();
        const taqresponsable     = data.taqresponsable.toLowerCase();
        return (
          taqDeleteRegister.includes(searchTerm)  ||
          taqHer.includes(searchTerm)             ||
          nombreDocumento.includes(searchTerm)    ||
          taqresponsable.includes(searchTerm)               
        );
    });
    setDocumentosEliminadosDataFiltrados(filtered);
  };
  
  const ActividadesData = [];
  herramienta.forEach(herramienta => {
    herramienta.movimientos.forEach(data => {
      ActividadesData.push({
        taqMovher      : data.taqMovher,
        taqHer         : data.taqHer,
        taqresponsable : data.taqresponsable,
        responsable    : data.responsable.primernombre + ' ' + data.responsable.primerapellido,
        descripcion	   : data.descripcion,
        ubicacion      : data.ubicacion,
        estado	       : data.estado,
      });
    });
  });

  useEffect(() => {  
    setActividadesDataFiltrados(ActividadesData)
  }, [herramienta])
  
  const [ActividadesDataFiltrados, setActividadesDataFiltrados] = useState();
  const FilterActividades = ( searchTerm ) => {
    const filtered = MovimientosData.filter((data) => {
        const taqMovher      = data.taqMovher.toLowerCase();
        const taqHer         = data.taqHer.toLowerCase();
        const taqresponsable = data.taqresponsable.toLowerCase();
        const responsable    = data.responsable.toLowerCase();
        const descripcion    = data.descripcion.toLowerCase();
        const ubicacion      = data.ubicacion.toLowerCase();
        const estado         = data.estado.toLowerCase();
        return (
          taqMovher.includes(searchTerm)       ||
          taqHer.includes(searchTerm)          ||
          descripcion.includes(searchTerm)     ||
          ubicacion.includes(searchTerm)       ||
          taqresponsable.includes(searchTerm)  ||
          estado.includes(searchTerm)          ||
          responsable.includes(searchTerm)             
        );
    });
    setActividadesDataFiltrados(filtered);
  };

  return (
    <main className='w-full h-screen flex flex-col justify-start items-center justify-items-center'>
      <HerramientaAppbar
        Herramienta = { herramienta }
        Responsables = { Responsables }
        Caracteristicas = { Caracteristicas }
        Categorias = { Categorias }
        Empresas = { Empresas }
      />
      <div className='w-full h-auto  flex justify-center items-center justify-items-center gap-3'>
        <div className='hidden md:flex flex-col justify-start items-start justify-items-center gap-3 w-[25%] px-4 py-2 h-full rounded-md bg-white '>
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
            herramienta[0].caracteristicas ? (
                herramienta[0].caracteristicas.map( (data) => (
                  <Caracteristica_target
                    name = { data.nombre }
                    key = { data.taqotro }
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
              PanelDocumentos ? (
                <Panel_general FunctionfilterData = { FilterMttoPreventivo } >
                  {
                      DocumentosDataFiltrados ? (
                          DocumentosDataFiltrados.map( (data) => (
                            <div key = { data.taqDoc } className='w-full h-auto flex justify-between items-center border border-black px-4 py-2 cursor-pointer hover:bg-gray-800 hover:text-white transition duration-700 ease-in-out'>
                              <div className='w-1/2  flex justify-start items-center h-full'>
                                { data.nombre }
                              </div>
                              <div className='w-1/2  flex justify-end items-center h-full gap-3'>
                                <div onClick={()=>ShowModalDoc(data)} className='w-auto h-full bg-green-500 px-4 py-2  text-white hover:bg-green-800 hover:border-white transition duration-700 ease-in-out cursor-pointer'>
                                  Ver
                                </div>
                                <div  onClick = { () => {
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
              PanelDocumentosEliminados ? (
                <Panel_general FunctionfilterData = { FilterDocumentosEliminados } >
                  {
                      DocumentosEliminadosDataFiltrados ? (
                          DocumentosEliminadosDataFiltrados.map( (data) => (
                            <div key = { data.taqDoc } className='w-full h-auto flex justify-between items-center border border-black px-4 py-2 cursor-pointer hover:bg-gray-800 hover:text-white transition duration-700 ease-in-out'>
                              <div className='w-1/2  flex justify-start items-center h-full'>
                                {data.nombreDocumento}
                              </div>
                              <div className='w-1/2  flex justify-end items-center h-full gap-3'>
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
              Panel_Actividades ? (
                <Panel_general FunctionfilterData = { FilterActividades } >
                  {
                      ActividadesDataFiltrados ? (
                          ActividadesDataFiltrados.map( (data) => (
                            <div key = { data.taqMovher } className='w-full h-auto flex justify-between items-center border border-black px-4 py-2 cursor-pointer hover:bg-gray-800 hover:text-white transition duration-700 ease-in-out'>
                              {
                                data.estado === 'EN USO' ? (
                                  <>
                                    <div className='w-auto h-full flex flex-col justify-center items-start gap-2'>
                                      <div>
                                        { data.descripcion }
                                      </div>
                                      <div>
                                        { data.responsable }
                                      </div>
                                    </div>
                                    <div onClick = { () => Retonar(data.taqMovher) } className='w-auto h-auto flex justify-center items-center gap-3 bg-red-500 hover:bg-red-800 transition duration-700 ease-in-out hover:shadow-red-500 px-4 py-2 shadow shadow-black rounded-md font-semibold text-white'>
                                      Retornar
                                    </div>
                                  </>
                                ) : (
                                  <>
                                    <div className='w-1/2  flex justify-start items-center h-full'>
                                      { data.descripcion }
                                    </div>
                                    <div className='w-1/2  flex justify-end items-center h-full gap-3'>
                                      { data.responsable }
                                    </div>
                                  </>
                                )
                              }
                            </div>
                          ))
                      ) : null
                  }
                </Panel_general>
              ) : null
            }
            {
              PanelMantenimientoCorrectivo ? (
                <Panel_general FunctionfilterData = { FilterMttoCorrectivo } >
                  {
                      MttoCorrectivosFiltrados ? (
                          MttoCorrectivosFiltrados.map( (data) => (
                            <div key = { data.taqMovher } className='w-full h-auto flex justify-between items-center border border-black px-4 py-2 cursor-pointer hover:bg-gray-800 hover:text-white transition duration-700 ease-in-out'>
                              <div className='w-1/2  flex justify-start items-center h-full'>
                                { data.nombre }
                              </div>
                              <div className='w-1/2  flex justify-end items-center h-full gap-3'>
                                  responsable
                              </div>
                            </div>
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
        isVisible = { ModalDocs }
        onClose = { () => setModalDocs(false) }
        tittle = { DocSelected.nombre} 
      >
        <div className='w-[900px] h-[800px]'>
          <embed src={`https://gworks.gematech.co/storage/Herramientas/${DocSelected.url}`} type="application/pdf" className='w-full h-full' />
        </div>
      </Modal>
      <Toaster richColors position='top-center' />
    </main>
  )
}

export default empresaPage;
