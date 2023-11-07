import Modal from "@/Components/Panels/Modals/Modal"
import ButtonMenu from "@/Components/UI/Activo/ButtonMenu"
import Caracteristica_target from "@/Components/UI/Activo/Caracteristica_target"
import MttoAppbar from "@/Components/UI/Mantenimiento/MantenimientoPrev/Appbar"
import Panel_general from "@/Components/UI/Panel_general"
import AsingActPrev from "@/Components/forms/Mantenimiento/MttoPreventivo/Actividades/FormAsignarActividad/FormAsignarActividad"
import { useEffect, useState } from "react"
import { Toaster, toast } from "sonner"


export default function MantenimientoPrev({ Mtto, Responsables, status, error }) {

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
  const [PanelActividadesPendientes, setPanelActividadesPendientes] = useState(false)
  const [PanelActividadesFinalizadas, setPanelActividadesFinalizadas] = useState(false)
  const [ModalUse, setModalUse] = useState(false)
  const [Activity, setActivity] = useState()

  function ShowDefault(){
    setPanelActividadesPendientes(false)
    setPanelActividadesFinalizadas(false)
    setDefault(true)
  }

  function ShowActividadesPendientes(){
    if(PanelActividadesPendientes){
        ShowDefault()
    }else{
        setDefault(false)
        setPanelActividadesFinalizadas(false)
        setPanelActividadesPendientes(true)
    }
  }

  function ShowActividadesFinalizadas(){
    if(PanelActividadesFinalizadas){
        ShowDefault()
    }else{
        setDefault(false)
        setPanelActividadesPendientes(false)
        setPanelActividadesFinalizadas(true)
    }
  }

  function ShowModalAsignarActividad(taqAct){
    setModalUse(true)
    setActivity(taqAct)
  }

  const Data = [{  
    "id"         : '623026548',
    "nombre"     : "AREA",
    "value"      : Mtto[0] ? Mtto[0].areas.nombre : '',
  },{  
    "id"         : '47175832',
    "nombre"     : "Mantenimiento Base",
    "value"      : Mtto[0] ? Mtto[0].mantenimiento.nombre : '',
  },{  
    "id"         : '4717583122',
    "nombre"     : "Tipo de Mantenimiento",
    "value"      : Mtto[0] ? Mtto[0].mantenimiento.tipe : '',
  },{  
    "id"         : '47175823',
    "nombre"     : "Descripcion",
    "value"      : Mtto[0] ? Mtto[0].actividad : '',
  },{  
    "id"         : '4717582213',
    "nombre"     : "Activo",
    "value"      : Mtto[0] ? Mtto[0].activo.nombre : '',
  },{  
    "id"         : '47175836',
    "nombre"     : "RESONSABLE",
    "value"      : Mtto[0] ? `${Mtto[0].responsable.primernombre}  ${Mtto[0].responsable.segundonombre}  ${Mtto[0].responsable.primerapellido}  ${Mtto[0].responsable.segundoapellido}` : '',
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
      "id"         : '545051',
      "label"      : "Actividades Pendientes",
      "Myfunction" : ShowActividadesPendientes,
      "estado"     : PanelActividadesPendientes
  },{
      "id"         : '54125051',
      "label"      : "Actividades Finalizadas",
      "Myfunction" : ShowActividadesFinalizadas,
      "estado"     : PanelActividadesFinalizadas
  }]

  
  const ActividadesPendientes = [];
  Mtto.forEach(Mtto => {
    Mtto.actividades__pendientes.forEach(data => {
      ActividadesPendientes.push({
        taqActPrevact  : data.taqActPrevact,
        taqmttActivo   : data.taqmttActivo,
        frecuencia     : data.frecuencia,
        taqresponsable : data.taqresponsable,
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
        const taqActPrevact  = data.taqActPrevact.toLowerCase();
        const taqmttActivo   = data.taqmttActivo.toLowerCase();
        const taqresponsable = data.taqresponsable.toLowerCase();
        const frecuencia     = data.frecuencia.toLowerCase();
        const nombre         = data.nombre.toLowerCase();
        const estado         = data.estado.toLowerCase();
        const fecha          = data.fecha.toLowerCase();
        const fechaFin       = data.fechaFin.toLowerCase();
        return (
          taqActPrevact.includes(searchTerm)  ||
          taqmttActivo.includes(searchTerm)   ||
          estado.includes(searchTerm)         ||
          frecuencia.includes(searchTerm)     ||
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
        taqActPrevact  : data.taqActPrevact,
        taqmttActivo   : data.taqmttActivo,
        frecuencia     : data.frecuencia,
        taqresponsable : data.taqresponsable,
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
    const filtered = ActividadesFinalizadas.filter((data) => {
        const taqActPrevact  = data.taqActPrevact.toLowerCase();
        const taqmttActivo   = data.taqmttActivo.toLowerCase();
        const taqresponsable = data.taqresponsable.toLowerCase();
        const frecuencia     = data.frecuencia.toLowerCase();
        const nombre         = data.nombre.toLowerCase();
        const estado         = data.estado.toLowerCase();
        const fecha          = data.fecha.toLowerCase();
        const fechaFin       = data.fechaFin.toLowerCase();
        return (
          taqActPrevact.includes(searchTerm)  ||
          taqmttActivo.includes(searchTerm)   ||
          estado.includes(searchTerm)         ||
          frecuencia.includes(searchTerm)     ||
          nombre.includes(searchTerm)         ||
          taqresponsable.includes(searchTerm) ||
          fecha.includes(searchTerm)          ||
          fechaFin.includes(searchTerm)         
        );
    });
    setActividadesFinalizadasFiltradas(filtered);
  };

  return (
    <main className='w-full h-screen flex flex-col justify-start items-center justify-items-center'>
      <MttoAppbar
        taqActivo    = { Mtto[0].activo.taqActivos }
        taqmttActivo = { Mtto[0].taqmttActivo }
        nombre       = { Mtto[0].actividad }
        Responsables = { Responsables }
        Actividades  = { ActividadesPendientes }
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
                <Panel_general FunctionfilterData = { FilterActividadesPendientes } >
                  <div className='w-full h-[50px] flex justify-between items-center border border-black bg-[#385449] text-white font-semibold  px-4 py-2'>
                    <span className='w-1/6 h-full flex justify-center items-center'>
                      Descripcion
                    </span>
                    <span className='w-1/6 h-full flex justify-center items-center'>
                      Estado
                    </span>
                    <span className='w-1/6 h-full flex justify-center items-center'>
                      Frecuencia
                    </span>
                    <span className='w-1/6 h-full flex justify-center items-center'>
                      Ultimo Mtto
                    </span>
                    <span className='w-1/6 h-full flex justify-center items-center'>
                      Proximo Mtto
                    </span>
                    <span className='w-1/6 h-full flex justify-center items-center'>
                      Finalizado
                    </span>
                  </div>
                  {
                      ActividadesPendientesFiltradas ? (
                          ActividadesPendientesFiltradas.map( (data) => (
                            <div key={data.taqActPrevact} className='w-full h-auto flex justify-between items-center border border-black cursor-pointer  hover:bg-gray-800 hover:text-white px-4 py-2'>
                              {
                                data.estado != 'TERMINADO' ? (
                                  <>
                                    <span className='w-1/5 h-full flex justify-center items-center'>
                                      { data.nombre } 
                                    </span>
                                    <span className='w-1/5 h-full flex justify-center items-center'>
                                      { data.estado }
                                    </span>
                                    <span className='w-1/5 h-full flex justify-center items-center'>
                                      { data.frecuencia } { Mtto[0].mantenimiento.tipe === 'CALENDARIO' ? 'Dias' : 'Horas' }
                                    </span>
                                    <span className='w-1/5 h-full flex justify-center items-center'>
                                      { data.fecha }
                                    </span>
                                    <span className='w-1/5 h-full flex justify-center items-center'>
                                      { data.fechaFin }
                                    </span>
                                    {
                                      data.diferencia < 7 ? (
                                        <div className='w-1/5 h-[50px] flex gap-1'> 
                                          <button onClick = { () => ShowModalAsignarActividad(data.taqActPrevact) } className='w-full h-full px-4 py-2 rounded-md  shadow-sm flex border border-black hover:border-white shadow-blackflex justify-center items-center text-white bg-red-500 hover:bg-red-800 transition duration-700 ease-in-out   hover:text-white font-semibold'>
                                            Asignar Responsable
                                          </button>
                                        </div>
                                      ) : (
                                        <div className='w-1/5 h-[50px] flex gap-1'> 
                                          <button disabled className='w-full h-full px-4 py-2 rounded-md cursor-not-allowed shadow-sm flex border border-black   shadow-blackflex justify-center items-center text-white bg-blue-400'>
                                            Asignar Responsable
                                          </button>
                                        </div>
                                      )
                                    }
                                  </>
                                ) : (
                                  <>
                                    <span className='w-1/5 h-full flex justify-center items-center'>
                                      { data.nombre }
                                    </span>
                                    <span className='w-1/5 h-full flex justify-center items-center'>
                                      { data.estado }
                                    </span>                                    
                                    <span className='w-1/5 h-full flex justify-center items-center'>
                                      { data.frecuencia } { Mtto[0].mantenimiento.tipe === 'CALENDARIO' ? 'Dias' : 'Horas' }
                                    </span>
                                    <span className='w-1/5 h-full flex justify-center items-center'>
                                      { data.fecha }
                                    </span>
                                    <span className='w-1/5 h-full flex justify-center items-center'>
                                      { data.fechaFin }
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
                <Panel_general FunctionfilterData = { FilterActividadesFinalizadas } >
                  <div className='w-full h-[50px] flex justify-between items-center border border-black bg-[#385449] text-white font-semibold  px-4 py-2'>
                    <span className='w-1/6 h-full flex justify-center items-center'>
                      Descripcion
                    </span>
                    <span className='w-1/6 h-full flex justify-center items-center'>
                      Estado
                    </span>
                    <span className='w-1/6 h-full flex justify-center items-center'>
                      Frecuencia
                    </span>
                    <span className='w-1/6 h-full flex justify-center items-center'>
                      Ultimo Mtto
                    </span>
                    <span className='w-1/6 h-full flex justify-center items-center'>
                      Proximo Mtto
                    </span>
                  </div>
                  {
                      ActividadesFinalizadasFiltradas ? (
                          ActividadesFinalizadasFiltradas.map( (data) => (
                            <div key={data.taqActPrevact} className='w-full h-auto flex justify-between items-center border border-black cursor-pointer  hover:bg-gray-800 hover:text-white px-4 py-2'>
                              <span className='w-1/5 h-full flex justify-center items-center'>
                                { data.nombre } 
                              </span>
                              <span className='w-1/5 h-full flex justify-center items-center'>
                                { data.estado }
                              </span>
                              <span className='w-1/5 h-full flex justify-center items-center'>
                                { data.frecuencia } { Mtto[0].mantenimiento.tipe === 'CALENDARIO' ? 'Dias' : 'Horas' }
                              </span>
                              <span className='w-1/5 h-full flex justify-center items-center'>
                                { data.fecha }
                              </span>
                              <span className='w-1/5 h-full flex justify-center items-center'>
                                { data.fechaFin }
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
      <Modal
        isVisible = { ModalUse }
        onClose = { () => setModalUse(false) }
        tittle = {Mtto[0].actividad} 
      >
       <AsingActPrev Responsables={Responsables} onClose={() => setModalUse(false)}  taqmttActivo = { Mtto[0].taqmttActivo } taqActPrevact = {Activity} />
      </Modal>
      <Toaster richColors position='top-center'/>
    </main>
  )
}
