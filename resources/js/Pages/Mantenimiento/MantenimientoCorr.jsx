import Modal from "@/Components/Panels/Modals/Modal"
import ButtonMenu from "@/Components/UI/Activo/ButtonMenu"
import Caracteristica_target from "@/Components/UI/Activo/Caracteristica_target"
import MttoAppbar from "@/Components/UI/Mantenimiento/MantenimientoCorr/Appbar"
import Panel_general from "@/Components/UI/Panel_general"
import { useForm } from "@inertiajs/react"
import { useEffect, useState } from "react"
import { Toaster } from "sonner"


export default function MantenimientoCorr({ Mtto, Responsables }) {
  
  const [Default, setDefault] = useState(true)

  const [PanelActividadesPendientes, setPanelActividadesPendientes] = useState(false)
  const [PanelActividadesFinalizadas, setPanelActividadesFinalizadas] = useState(false)

  const { data, post } = useForm()

  function End(taqAct, taqmttActivo){
    data.taqActCorrAct = taqAct
    data.taqmttActivo = taqmttActivo
    post(`/act/corr/activo/end`);
  }

  function ShowDefault(){
    setPanelActividadesPendientes(false)
    setPanelActividadesFinalizadas(false)
    setDefault(true)
  }

  function ShowPanelActividadesPendientes(){
    if(PanelActividadesPendientes){
      ShowDefault()
    }else{
      setDefault(false)
      setPanelActividadesFinalizadas(false)
      setPanelActividadesPendientes(true)
    }
  }

  function ShowPanelActividadesFinalizadas(){
    if(PanelActividadesFinalizadas){
      ShowDefault()
    }else{
      setDefault(false)
      setPanelActividadesPendientes(false)
      setPanelActividadesFinalizadas(true)
    }
  }

  const Data = [{  
    "id"         : '623026548',
    "nombre"     : "AREA",
    "value"      : Mtto[0] ? Mtto[0].areas.nombre : '',
  },{  
    "id"         : '47175832',
    "nombre"     : "PREOPERACIONAL",
    "value"      : Mtto[0] ? Mtto[0].preoperacional : '',
  },{  
    "id"         : '47175833',
    "nombre"     : "ESTADO",
    "value"      : Mtto[0] ? Mtto[0].estado : '',
  },{  
    "id"         : '47175834',
    "nombre"     : "FECHA",
    "value"      : Mtto[0] ? Mtto[0].fecha : '',
  },{  
    "id"         : '47175835',
    "nombre"     : "FECHA FINALIZACION",
    "value"      : Mtto[0] ? Mtto[0].fechaFin : '',
  }]

  const Buttons = [{
      "id"         : '54502s51',
      "label"      : "Actividades Pendientes",
      "Myfunction" : ShowPanelActividadesPendientes,
      "estado"     : PanelActividadesPendientes
  },{
      "id"         : '545051',
      "label"      : "Actividades Finalizadas",
      "Myfunction" : ShowPanelActividadesFinalizadas,
      "estado"     : PanelActividadesFinalizadas
  }]
  const ActividadesPendientes = [];
  Mtto.forEach(Mtto => {
    Mtto.actividades__pendientes.forEach(data => {
      ActividadesPendientes.push({
        taqActCorrAct  : data.taqActCorrAct,
        taqmttActivo   : data.taqmttActivo,
        taqresponsable : data.taqresponsable,
        responsable    : `${data.responsables.primernombre} ${data.responsables.segundonombre ? data.responsables.segundonombre : ''} ${data.responsables.primerapellido} ${data.responsables.segundoapellido ? data.responsables.segundoapellido : ''}`,
        nombre         : data.nombre,
        estado         : data.estado,
        fecha          : data.fecha,
        fechaFin       : data.fechaFin,
      });
    });
  });

  useEffect(() => {  
    setActividadesPendientesFiltradas(ActividadesPendientes)
  }, [Mtto])
  
  const [ActividadesPendientesFiltradas, setActividadesPendientesFiltradas] = useState();
  const FilterActividadesPendientes = ( searchTerm ) => {
    const filtered = ActividadesPendientes.filter((data) => {
        const taqActCorrAct  = data.taqActCorrAct.toLowerCase();
        const taqmttActivo   = data.taqmttActivo.toLowerCase();
        const taqresponsable = data.taqresponsable.toLowerCase();
        const nombre         = data.nombre.toLowerCase();
        const estado         = data.estado.toLowerCase();
        const fecha          = data.fecha.toLowerCase();
        const fechaFin       = data.fechaFin.toLowerCase();
        return (
          taqActCorrAct.includes(searchTerm)  ||
          taqmttActivo.includes(searchTerm)   ||
          estado.includes(searchTerm)         ||
          nombre.includes(searchTerm)         ||
          taqresponsable.includes(searchTerm) ||
          fecha.includes(searchTerm)          ||
          fechaFin.includes(searchTerm)         
        );
    });
    setActividadesPendientesFiltradas(filtered);
  };

  const ActividadesFinalizadas = [];
  Mtto.forEach(Mtto => {
    Mtto.actividades__finalizadas.forEach(data => {
      ActividadesFinalizadas.push({
        taqActCorrAct  : data.taqActCorrAct,
        taqmttActivo   : data.taqmttActivo,
        taqresponsable : data.taqresponsable,
        responsable    : `${data.responsables.primernombre} ${data.responsables.segundonombre ? data.responsables.segundonombre : ''} ${data.responsables.primerapellido} ${data.responsables.segundoapellido ? data.responsables.segundoapellido : ''}`,
        nombre         : data.nombre,
        estado         : data.estado,
        fecha          : data.fecha,
        fechaFin       : data.fechaFin,
      });
    });
  });

  useEffect(() => {  
    setActividadesFinalizadasFiltradas(ActividadesFinalizadas)
  }, [Mtto])
  
  const [ActividadesFinalizadasFiltradas, setActividadesFinalizadasFiltradas] = useState();
  const FilterActividadesFinalizadas = ( searchTerm ) => {
    const filtered = ActividadesFinalizadasFiltradas.filter((data) => {
        const taqActCorrAct   = data.taqActCorrAct.toLowerCase();
        const taqmttActivo    = data.taqmttActivo.toLowerCase();
        const taqresponsable  = data.taqresponsable.toLowerCase();
        const nombre          = data.nombre.toLowerCase();
        const estado          = data.estado.toLowerCase();
        const fecha           = data.fecha.toLowerCase();
        const fechaFin        = data.fechaFin.toLowerCase();
        return (
          taqActCorrAct.includes(searchTerm)  ||
          taqmttActivo.includes(searchTerm)   ||
          estado.includes(searchTerm)         ||
          nombre.includes(searchTerm)         ||
          taqresponsable.includes(searchTerm) ||
          fecha.includes(searchTerm)          ||
          fechaFin.includes(searchTerm)         
        );
    });
    setActividadesFiltradas(filtered);
  };

  return (
    <main className='w-full h-screen flex flex-col justify-start items-center justify-items-center'>
      <MttoAppbar
        nombre      = { Mtto[0].actividad }
        Activo      = { Mtto[0].activo.nombre }
        taqActivo   = { Mtto[0].activo.taqActivos }
        taqmttActivo= { Mtto[0].taqmttActivo }
        Estado      = { Mtto[0].estado }
        Responsables= { Responsables }
        Responsable = {` ${Mtto[0].responsable.primernombre}  ${Mtto[0].responsable.segundonombre ? Mtto[0].responsable.segundonombre : ''}  ${Mtto[0].responsable.primerapellido}  ${Mtto[0].responsable.segundoapellido ? Mtto[0].responsable.segundoapellido : ''} `}
        taqresponsable = { Mtto[0].responsable.taqresponsable }
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
              PanelActividadesPendientes ? (
                <Panel_general FunctionfilterData = { FilterActividadesPendientes } key={ 492526 } >
                  <div className='w-full h-[50px] flex justify-between items-center border border-black bg-[#385449] text-white font-semibold  px-4 py-2'>
                    <span className='w-1/5 h-full flex justify-center items-center'>
                      Descripcion
                    </span>
                    <span className='w-1/5 h-full flex justify-center items-center'>
                      Responsable
                    </span>
                    <span className='w-1/5 h-full flex justify-center items-center'>
                      Estado
                    </span>
                    <span className='w-1/5 h-full flex justify-center items-center'>
                      Mantenimiento
                    </span>
                    <span className='w-1/5 h-full flex justify-center items-center'>
                      Finalizado
                    </span>
                  </div>
                  {
                      ActividadesPendientesFiltradas ? (
                          ActividadesPendientesFiltradas.reverse().map( (data) => (
                            <div className='w-full h-auto flex justify-between items-center border border-black cursor-pointer  hover:bg-gray-800 hover:text-white px-4 py-2'>
                              {
                                data.estado != 'TERMINADO' ? (
                                  <>
                                    <span className='w-1/5 h-full flex justify-center items-center'>
                                      { data.nombre }
                                    </span>
                                    <span className='w-1/5 h-full flex justify-center items-center'>
                                      { data.responsable }
                                    </span>
                                    <span className='w-1/5 h-full flex justify-center items-center'>
                                      { data.estado }
                                    </span>
                                    <span className='w-1/5 h-full flex justify-center items-center'>
                                      { data.fecha }
                                    </span>
                                    <div className='w-1/5 h-full flex gap-1'> 
                                      <span onClick = { () => End(data.taqActCorrAct, data.taqmttActivo) } className='w-full h-full px-4 py-2 rounded-md  shadow-sm flex border border-black hover:border-white shadow-blackflex justify-center items-center text-white bg-green-500 hover:bg-green-800 transition duration-700 ease-in-out text-black hover:text-white font-semibold'>
                                        Finalizar
                                      </span>
                                    </div>
                                  </>
                                ) : (
                                  <>
                                    <span className='w-1/5 h-full flex justify-center items-center'>
                                      { data.nombre }
                                    </span>
                                    <span className='w-1/5 h-full flex justify-center items-center'>
                                      { data.responsable }
                                    </span>
                                    <span className='w-1/5 h-full flex justify-center items-center'>
                                      { data.estado }
                                    </span>
                                    <span className='w-1/5 h-full flex justify-center items-center'>
                                      { data.fecha }
                                    </span>
                                    <div className='w-1/5 h-full flex justify-center items-center'> 
                                      Sin Acciones
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
              PanelActividadesFinalizadas ? (
                <Panel_general FunctionfilterData = { FilterActividadesFinalizadas } key={ 492526 } >
                  {
                      ActividadesFinalizadasFiltradas ? (
                        ActividadesFinalizadasFiltradas.reverse().map( (data) => (
                            <div className='w-full h-auto flex justify-between items-center border border-black cursor-pointer  hover:bg-gray-800 hover:text-white hover:font-semibold px-4 py-2'>
                                <span className='w-[80%] h-full flex flex-col gap-2'>
                                  <div>
                                    { data.nombre }
                                  </div>
                                  <div>
                                    { data.responsable }
                                  </div>
                                </span>
                                <span className='w-[20%] h-full flex justify-center items-center'>
                                  { data.estado }
                                </span>
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
      <Toaster richColors position='top-center'/>
    </main>
  )
}
