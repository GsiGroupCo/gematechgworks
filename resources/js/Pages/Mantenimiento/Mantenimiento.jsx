import Modal from '@/Components/Panels/Modals/Modal'
import ButtonMenu from '@/Components/UI/Activo/ButtonMenu'
import Caracteristica_target from '@/Components/UI/Activo/Caracteristica_target'
import MttoAppbar from '@/Components/UI/Mantenimiento/Appbar'
import Panel_general from '@/Components/UI/Panel_general'
import EditActMtto from '@/Components/forms/Mantenimiento/FormEditActividadMtto/FormEditActividadMtto'
import EditMtto from '@/Components/forms/Mantenimiento/FormEditMtto/FormEditMtto'
import { useForm } from '@inertiajs/react'
import React, { useEffect, useState } from 'react'
import { Toaster, toast } from 'sonner'

export default function Mantenimiento({ Mtto, Responsables, status, error }) {

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
  
  const [Default, setDefault] = useState(false)

  const { post, data } = useForm();

  const [PanelActividades, setPanelActividades] = useState(true)
  const [ModalShow, setModalShow] = useState(false)
  const [ActividadSelected, setActividadSelected] = useState({
    actividad_id   :'',
    nombre         :'',
    sistema        :'',
    componente     :'',
    frecuencia     :'',
    tipofrecuencia :'',
    taqManto       :''
  })

  function ShowDefault(){
    setPanelActividades(false)
    setDefault(true)
  }

  function Edit(actividadData){
    setModalShow(true)
    console.log(actividadData)
    setActividadSelected({
      actividad_id   :actividadData.actividad_id,
      nombre         :actividadData.nombre,
      sistema        :actividadData.sistema,
      componente     :actividadData.componente,
      frecuencia     :actividadData.frecuencia,
      tipofrecuencia :actividadData.tipofrecuencia,
      taqManto       :actividadData.taqManto
    })
    console.log(ActividadSelected)
  }

  function Delete(actividadData){
    data.actividad_id = actividadData.actividad_id,
    data.taqManto     = actividadData.taqManto,
    post(`/actividades/mantenimiento/delete`)
  }

  function ShowPanelMttoCorrActivo(){
    if(PanelActividades){
      ShowDefault()
    }else{
      setDefault(false)
      setPanelActividades(true)
    }
  }

  const Data = [{  
    "id"         : '623026548',
    "nombre"     : "DESCRIPCION",
    "value"      : Mtto[0] ? Mtto[0].descripcion : '',
  },{  
    "id"         : '47175832',
    "nombre"     : "CATEGORIA",
    "value"      : Mtto[0] ? Mtto[0].tipe : '',
  }]

  const Buttons = [{
      "id"         : '545051',
      "label"      : "Actividades",
      "Myfunction" : ShowPanelMttoCorrActivo,
      "estado"     : PanelActividades
  }]

  
  const Actividades = [];
  Mtto.forEach(Mtto => {
    Mtto.actividades.forEach(data => {
      Actividades.push({
        actividad_id   : data.actividad_id,
        nombre         : data.nombre,
        sistema        : data.sistema,
        componente     : data.componente,
        frecuencia     : data.frecuencia,
        tipofrecuencia : data.tipofrecuencia,
        taqManto       : data.taqManto,
      });
    });
  });

  useEffect(() => {  
    setActividadesFiltradas(Actividades)
  }, [Mtto])
  
  const [ActividadesFiltradas, setActividadesFiltradas] = useState();
  const FilterActividades = ( searchTerm ) => {
    const filtered = Actividades.filter((data) => {
        const actividad_id   = data.actividad_id.toLowerCase();
        const nombre         = data.nombre.toLowerCase();
        const sistema        = data.sistema.toLowerCase();
        const componente     = data.componente.toLowerCase();
        const frecuencia     = data.frecuencia.toLowerCase();
        const tipofrecuencia = data.tipofrecuencia.toLowerCase();
        const taqManto       = data.taqManto.toLowerCase();
        return (
          actividad_id.includes(searchTerm)   ||
          nombre.includes(searchTerm)         ||
          frecuencia.includes(searchTerm)     ||
          componente.includes(searchTerm)     ||
          sistema.includes(searchTerm)        ||
          tipofrecuencia.includes(searchTerm) ||
          taqManto.includes(searchTerm)         
        );
    });
    setActividadesFiltradas(filtered);
  };

  return (
    <main className='w-full h-screen flex flex-col justify-start items-center justify-items-center'>
      <MttoAppbar
        nombre = {  Mtto[0].Nombre }
        Mantenimiento = { Mtto }
        Responsables = { Responsables }
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
              PanelActividades ? (
                <Panel_general FunctionfilterData = { FilterActividades } key='12314292526'>
                  <div key={`54564651`} className='w-full h-[50px] flex justify-between items-center border border-black bg-[#385449] text-white font-semibold  px-4 py-2'>
                    <span className='w-1/4 h-full flex justify-center items-center'>
                      Nombre
                    </span>
                    <span className='w-1/4 h-full flex justify-center items-center'>
                      Frecuencia
                    </span>
                    <span className='w-1/4 h-full flex justify-center items-center'>
                      Tipo
                    </span>
                    <span className='w-1/4 h-full flex justify-center items-center'>
                      Acciones
                    </span>
                  </div>
                  {
                      ActividadesFiltradas ? (
                          ActividadesFiltradas.reverse().map( (data) => (
                            <div key = { data.taactividad_id } className='w-full h-auto flex justify-between items-center border border-black cursor-pointer  hover:bg-gray-800 hover:text-white px-4 py-2'>
                              <span className='w-1/4 h-full flex justify-center items-center'>
                                { data.nombre }
                              </span>
                              <span className='w-1/4 h-full flex justify-center items-center'>
                                { data.frecuencia }
                              </span>
                              <span className='w-1/4 h-full flex justify-center items-center'>
                                { data.tipofrecuencia }
                              </span>
                              <div className='w-1/4 h-full  flex justify-end items-center gap-1'>
                                <span onClick = { () => Edit(data) } className='w-auto h-[50px] px-4 py-2 rounded-md  shadow-sm flex border border-black hover:border-white shadow-blackflex justify-center items-center bg-yellow-500 hover:bg-yellow-800 transition duration-700 ease-in-out text-black hover:text-white font-semibold'>
                                  Editar  
                                </span>
                                <span onClick = { () => Delete(data) } className='w-auto h-[50px] px-4 py-2 rounded-md  shadow-sm flex border border-black hover:border-white shadow-blackflex justify-center items-center bg-red-500 hover:bg-red-800 transition duration-700 ease-in-out text-black hover:text-white font-semibold'>
                                  Eliminar
                                </span>
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
        isVisible = { ModalShow }
        onClose   = { () => setModalShow(false) }
        tittle    = {`Acciones de mantenimiento`}
      >
        <EditActMtto Actividad = { ActividadSelected } onClose = { () => setModalShow(false) } />
      </Modal>
      <Toaster richColors position='top-center'/>
    </main>
  )
}
