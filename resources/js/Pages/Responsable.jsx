import BuildIcon from '@/Components/Icons/Build'
import ActivoIcon from '@/Components/Icons/activo'
import MantoIcon from '@/Components/Icons/manto' 
import omsIcon from '@/Components/Icons/ots'
import Modal from '@/Components/Panels/Modals/Modal'
import ButtonMenu from '@/Components/UI/ButtonMenu'
import Panel_general from '@/Components/UI/Panel_general'
import ResponsableAppbar from '@/Components/UI/Responsables/Appbar'
import { Link } from '@inertiajs/react'
import { useEffect, useState } from 'react' 
import { Toaster, toast } from 'sonner'

const ResponsablePage = ({ Responsable, status, error, Cargos }) => {

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
  const [Panel_Trabajos, setPanel_Trabajos] = useState(false)
  const [Panel_Mtto_Correctivo, setPanel_Mtto_Correctivo] = useState(false)
  const [Panel_Mtto_Preventivo, setPanel_Mtto_Preventivo] = useState(false)
  const [Actividades_Correctivas, setActividades_Correctivas] = useState(false)
  const [Actividades_Correctivas_Finalizadas, setActividades_Correctivas_Finalizadas] = useState(false)
  const [Panel_Herramientas, setPanel_Herramientas] = useState(false)
  const [Documentos, setDocumentos] = useState(false)
  const [ShowModalDocs, setShowModalDocs] = useState(false)

  const [DocSelectd, setDocSelectd] = useState({
    taqDoc:"",
    nombre:"",
    url:""
  })

  function ShowModal(data){
    setDocSelectd({
      taqDoc:data.taqDoc,
      nombre:data.nombre,
      url:data.url
    })
    setShowModalDocs(true)
  }

  function ShowDefault(){
    setPanel_Herramientas(false)
    setPanel_Trabajos(false)
    setDocumentos(false)
    setPanel_Mtto_Preventivo(false)
    setActividades_Correctivas(false)
    setActividades_Correctivas_Finalizadas(false)
    setPanel_Mtto_Correctivo(false)
    setActividades_Correctivas(false) 
    setDefault(true)
  }

  function ShowTrabajos() {
    if(Panel_Trabajos){
      ShowDefault()
    }else{
      setDefault(false)
      setDocumentos(false)
      setPanel_Herramientas(false)
      setPanel_Mtto_Correctivo(false)
      setPanel_Mtto_Preventivo(false)
      setActividades_Correctivas(false)
      setActividades_Correctivas_Finalizadas(false)
      setPanel_Trabajos(true)
    }
  }

  function ShowDocmentos() {
    if(Documentos){
      ShowDefault()
    }else{
      setDefault(false)
      setPanel_Herramientas(false)
      setPanel_Trabajos(false)
      setPanel_Mtto_Correctivo(false)
      setActividades_Correctivas(false)
      setActividades_Correctivas_Finalizadas(false)
      setPanel_Mtto_Preventivo(false)
      setDocumentos(true)
    }
  }

  function ShowHerramientas() {
    if(Panel_Herramientas){
      ShowDefault()
    }else{
      setDefault(false)
      setPanel_Trabajos(false)
      setPanel_Mtto_Correctivo(false)
      setPanel_Mtto_Preventivo(false)
      setActividades_Correctivas(false)
      setActividades_Correctivas_Finalizadas(false)
      setDocumentos(false)
      setPanel_Herramientas(true)
    }
  }

  function Show_Mttos_Correctivos() {
    if(Panel_Mtto_Correctivo){
      ShowDefault()
    }else{
      setDefault(false)
      setPanel_Trabajos(false)
      setDocumentos(false)
      setPanel_Herramientas(false)
      setPanel_Mtto_Preventivo(false)
      setActividades_Correctivas(false)
      setActividades_Correctivas_Finalizadas(false)
      setPanel_Mtto_Correctivo(true)
    }
  }

  function Show_Mttos_Preventivos() {
    if(Panel_Mtto_Preventivo){
      ShowDefault()
    }else{
      setDefault(false)
      setPanel_Trabajos(false)
      setDocumentos(false)
      setPanel_Herramientas(false)
      setActividades_Correctivas(false)
      setActividades_Correctivas_Finalizadas(false)
      setPanel_Mtto_Correctivo(false)
      setPanel_Mtto_Preventivo(true)
    }
  }

  function Show_Actividades_Correctivas() {
    if(Actividades_Correctivas){
      ShowDefault()
    }else{
      setDefault(false)
      setPanel_Trabajos(false)
      setDocumentos(false)
      setPanel_Herramientas(false)
      setPanel_Mtto_Preventivo(false)
      setPanel_Mtto_Correctivo(false)
      setActividades_Correctivas_Finalizadas(false)
      setActividades_Correctivas(true)
    }
  }

  function Show_Actividades_Preventivos() {
    if(Actividades_Correctivas_Finalizadas){
      ShowDefault()
    }else{
      setDefault(false)
      setPanel_Trabajos(false)
      setDocumentos(false)
      setPanel_Herramientas(false)
      setPanel_Mtto_Preventivo(false)
      setActividades_Correctivas(false)
      setPanel_Mtto_Correctivo(false)
      setActividades_Correctivas_Finalizadas(true)
    }
  }
  
  const Buttons = [{  
    "id"         : `64480909`,
    "label"      : "Documentos",
    "icon"       : <omsIcon color='#FFF' height='30px' width='30px'/>,
    "Myfunction" : ShowDocmentos,
    "estado"     : Documentos
  },{  
    "id"         : `2178943`,
    "label"      : "Trabajos",
    "icon"       : <ActivoIcon color='#FFF' height='30px' width='30px'/>,
    "Myfunction" : ShowTrabajos,
    "estado"     : Panel_Trabajos
  },{
    "id"         : `73395192`,
    "label"      : "Mantenimientos Correctivos de Activos",
    "Myfunction" : Show_Mttos_Correctivos,
    "icon"       : <MantoIcon color='#FFF' height='30px' width='30px'/>,
    "estado"     : Panel_Mtto_Correctivo
  },{
    "id"         : `95651619`,
    "label"      : "Mantenimientos Preventivos de Activos",
    "Myfunction" : Show_Mttos_Preventivos,
    "icon"       : <MantoIcon color='#FFF' height='30px' width='30px'/>,
    "estado"     : Panel_Mtto_Preventivo
  }]

  
  const DocumentosData = [];
  Responsable.forEach(Responsable => {
    Responsable.documentos.forEach(data => {
      DocumentosData.push({
        documento_id   : data.documento_id,
        nombre         : data.nombre,
        url            : data.url,
      });
    });
  });

  useEffect(() => {  
    setDocumentosFiltrados(DocumentosData)
  }, [Responsable])
  
  const [DocumentosFiltrados, setDocumentosFiltrados] = useState();
  const FiltrarDocumentos = ( searchTerm ) => {
    const filtered = MovimientosData.filter((data) => {
        const documento_id   = data.documento_id.toLowerCase();
        const nombre         = data.nombre.toLowerCase();
        const url            = data.url.toLowerCase();
        return (
          documento_id.includes(searchTerm)    ||
          nombre.includes(searchTerm)          ||
          url.includes(searchTerm)          
        );
    });
    setDocumentosFiltrados(filtered);
  };

  const TrabajosData = [];
  Responsable.forEach(Responsable => {
    Responsable.trabajo.forEach(data => {
      TrabajosData.push({
        taqtrabajo     : data.taqtrabajo,
       taqom          : data.taqot,
        descripcion    : data.descripcion,
        cantHoras      : data.cantHoras,
        estado         : data.estado
      });
    });
  });

  useEffect(() => {  
    setTrabajosFiltrados(TrabajosData)
  }, [Responsable])
  
  const [TrabajosFiltrados, setTrabajosFiltrados] = useState();
  const FilterTrabajos = ( searchTerm ) => {
    const filtered = MovimientosData.filter((data) => {
        const taqtrabajo   = data.taqtrabajo.toLowerCase();
        consttaqom        = data.taqot.toLowerCase();
        const descripcion  = data.descripcion.toLowerCase();
        const cantHoras    = data.cantHoras.toLowerCase();
        const estado       = data.estado.toLowerCase();
        return (
          taqtrabajo.includes(searchTerm)   ||
         taqom.includes(searchTerm)        ||
          cantHoras.includes(searchTerm)    ||
          descripcion.includes(searchTerm)  ||
          estado.includes(searchTerm)          
        );
    });
    setTrabajosFiltrados(filtered);
  };
 

  const MttosCorrectivosData = [];

  Responsable.forEach(Responsable => {
    Responsable.mantenimiento__correctivo__activos.forEach(data => { 
      MttosCorrectivosData.push({
        taqmttActivo   : data.taqmttActivo,
        actividad      : data.actividad,
        taqActivos     : data.taqActivos,
        activo         : data.activo.nombre,
        area           : data.area,
        preoperacional : data.preoperacional,
        taqresponsable : data.taqresponsable,
        estado         : data.estado,
        fecha          : data.fecha,
        fechaFin       : data.fechaFin,
      });
    });
  });

  useEffect(() => {  
    setMttosCorrectivosFiltrados(MttosCorrectivosData)
  }, [Responsable])
  
  const [MttosCorrectivosFiltrados, setMttosCorrectivosFiltrados] = useState();
  const FilterMttosCorrectivos = ( searchTerm ) => {
    const filtered = MttosCorrectivosData.filter((data) => {
        const taqmttActivo   = data.taqmttActivo.toLowerCase();
        const actividad      = data.actividad.toLowerCase();
        const taqActivos     = data.taqActivos.toLowerCase();
        const activo         = data.activo.toLowerCase();
        const area           = data.area.toLowerCase();
        const preoperacional = data.preoperacional.toLowerCase();
        const taqresponsable = data.taqresponsable.toLowerCase();
        const estado         = data.estado.toLowerCase();
        const fecha          = data.fecha.toLowerCase();
        const fechaFin       = data.fechaFin.toLowerCase();
        return (
          taqmttActivo.includes(searchTerm)    ||
          actividad.includes(searchTerm)       ||
          taqActivos.includes(searchTerm)      ||
          activo.includes(searchTerm)          ||
          area.includes(searchTerm)            ||
          preoperacional.includes(searchTerm)  ||
          taqresponsable.includes(searchTerm)  ||
          estado.includes(searchTerm)          ||
          fecha.includes(searchTerm)           ||
          fechaFin.includes(searchTerm)             
        );
    });
    setMttosCorrectivosFiltrados(filtered);
  };

  const MttosPreventivosData = [];

  Responsable.forEach(Responsable => {
    Responsable.mantenimiento__preventivos__activos.forEach(data => { 
      MttosPreventivosData.push({
        taqmttActivo   : data.taqmttActivo,
        actividad      : data.actividad,
        taqActivos     : data.taqActivos,
        activo         : data.activo.nombre,
        area           : data.area,
        preoperacional : data.preoperacional,
        taqresponsable : data.taqresponsable,
        estado         : data.estado,
        fecha          : data.fecha,
        fechaFin       : data.fechaFin,
      });
    });
  });

  useEffect(() => {  
    setMttosPreventivosFiltrados(MttosPreventivosData)
  }, [Responsable])
  
  const [MttosPreventivosFiltrados, setMttosPreventivosFiltrados] = useState();
  const FilterMttosPreventivos = ( searchTerm ) => {
    const filtered = MttosPreventivosData.filter((data) => { 
        const taqmttActivo   = data.taqmttActivo.toLowerCase();
        const actividad      = data.actividad.toLowerCase();
        const taqActivos     = data.taqActivos.toLowerCase();
        const activo         = data.activo.toLowerCase();
        const area           = data.area.toLowerCase();
        const preoperacional = data.preoperacional.toLowerCase();
        const taqresponsable = data.taqresponsable.toLowerCase();
        const estado         = data.estado.toLowerCase();
        const fecha          = data.fecha.toLowerCase();
        const fechaFin       = data.fechaFin.toLowerCase();
        return (
          taqmttActivo.includes(searchTerm)    ||
          actividad.includes(searchTerm)       ||
          taqActivos.includes(searchTerm)      ||
          activo.includes(searchTerm)          ||
          area.includes(searchTerm)            ||
          preoperacional.includes(searchTerm)  ||
          taqresponsable.includes(searchTerm)  ||
          estado.includes(searchTerm)          ||
          fecha.includes(searchTerm)           ||
          fechaFin.includes(searchTerm)             
        );
    });
    setMttosPreventivosFiltrados(filtered);
  };
  
  return (
    <div>
      <ResponsableAppbar
        Cargos = { Cargos } 
        Responsable = { Responsable }
        taqresponsable = { Responsable[0].taqresponsable }
        estado = { Responsable[0].estado }
        nombre = {`${Responsable[0].nombre}`}  
        urlImage = { Responsable[0].urlImage }
        empresa = { Responsable[0].nombre_empresa }
        cargo = { Responsable[0].cargo }
        functionActions = { {} }
      />
      <div className='w-full h-auto  flex justify-center items-center justify-items-center gap-3'>
        <div className='w-full h-full flex justify-center items-start justify-items-center'>
          <div className='flex flex-col justify-center items-center w-full max-w-[300px] h-auto gap-3 p-4'>
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
          <div className='w-full h-full '>
            {
              Default ? <div className='w-full h-full px-4 py-2 flex flex-col justify-start items-center justify-items-center '></div>: null
            }
            {
              Documentos ? (
                <Panel_general  FunctionfilterData = { FiltrarDocumentos } >
                  {
                      DocumentosFiltrados ? (
                          DocumentosFiltrados.reverse().map( (data) => (
                            <div key = { data.documento_id }  className='w-full h-auto flex justify-between items-center border border-black px-4 py-2 cursor-pointer hover:bg-gray-800 hover:text-white transition duration-700 ease-in-out'>
                              <span className='w-[90%] '> { data.nombre } </span>
                             <div className='w-auto h-full flex gap-2'>
                              <div onClick={ () => ShowModal(data) } className='w-auto h-full px-4 py-2 bg-green-600 hover:bg-green-800 text-white cursor-pointer border hover:border-white '>
                                  Ver
                                </div>
                              <div className='w-auto h-full px-4 py-2 bg-red-600 hover:bg-red-800 text-white cursor-pointer border hover:border-white '>
                                  Eliminar
                                </div>
                             </div>
                            </div>
                          ))
                      ) : null
                  }
                </Panel_general>
              ) : null
            }
            {
              Panel_Trabajos ? (
                <Panel_general  FunctionfilterData = { FilterTrabajos } >
                  {
                      TrabajosFiltrados ? (
                          TrabajosFiltrados.reverse().map( (data) => (
                            <Link href={`/oms/${data.taqot}`} key = { data.taqtrabajo }  className='w-full h-auto flex justify-between items-center border border-black px-4 py-2 cursor-pointer hover:bg-gray-800 hover:text-white transition duration-700 ease-in-out'>
                              <span className='w-[90%] '> { data.descripcion } </span>
                              <span> { data.taqot } </span>
                            </Link>
                          ))
                      ) : null
                  }
                </Panel_general>
              ) : null
            }
            {
              Panel_Mtto_Correctivo ? (
                <Panel_general  FunctionfilterData = { FilterMttosCorrectivos } >
                  {
                      MttosCorrectivosFiltrados ? (
                          MttosCorrectivosFiltrados.reverse().map( (data) => (
                            <Link href={`/mtto/corr/activo/show/${data.taqmttActivo}`} key = { data.taqmttActivo }  className='w-full h-auto flex justify-between items-center border border-black px-4 py-2 cursor-pointer hover:bg-gray-800 hover:text-white transition duration-700 ease-in-out'>
                              <span className='w-auto'> { data.actividad } </span>
                              <span className='w-auto'> { data.activo } </span>
                            </Link>
                          ))
                      ) : null
                  }
                </Panel_general>
              ) : null
            }
            {
              Panel_Mtto_Preventivo ? (
                <Panel_general  FunctionfilterData = { FilterMttosPreventivos } >
                  {
                      MttosPreventivosFiltrados ? (
                          MttosPreventivosFiltrados.reverse().map( (data) => (
                            <Link href={`/mtto/prev/activo/show/${data.taqmttActivo}`} key = { data.taqmttActivo }  className='w-full h-auto flex justify-between items-center border border-black px-4 py-2 cursor-pointer hover:bg-gray-800 hover:text-white transition duration-700 ease-in-out'>
                              <span className='w-auto '> { data.actividad } </span>
                              <span className='w-auto'> { data.activo } </span>
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
        tittle = {DocSelectd.nombre} 
      >
        <div className='w-[900px] h-[800px]'>
          <embed src={`https://gworks.gematech.co/storage/Responsables/${DocSelectd.url}`} type="application/pdf" className='w-full h-full' />
        </div>
      </Modal>
      <Toaster richColors position='top-center'/>
    </div>
  )
}

export default ResponsablePage;
