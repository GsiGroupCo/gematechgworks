
import Modal from "@/Components/Panels/Modals/Modal";
import Actions from "@/Components/UI/Actions";
import ButtonMenu from "@/Components/UI/Activo/ButtonMenu";
import Caracteristica_target from "@/Components/UI/Activo/Caracteristica_target"; 
import Appbar from "@/Components/UI/Mantenimiento/Activo/Appbar";
import SearchInput from "@/Components/UI/Search";
import CreateActividad from "@/Components/forms/Mantenimiento/Actividades/CreateActividades";
import EditMantenimiento from "@/Components/forms/Mantenimiento/EditMantenimiento";

import { useForm } from "@inertiajs/react";
import { useEffect, useState } from "react"; 
 
const MttoActivo = ({ MttoData }) => {
 
  const { post, data } = useForm();

  const [ModalShow, setModalShow] = useState(false)

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

  const [AcctionsButtons, setAcctionsButtons]                     = useState(true) 
  const [EditarMantenimientoPanel, setEditarMantenimientoPanel]   = useState(false) 
  
  function ShowActionButtons(){ 
    setEditarMantenimientoPanel(false) 
    setAcctionsButtons(true)
  }
 
  function ShowEditarMantenimientoPanel(){ 
    setAcctionsButtons(false) 
    setEditarMantenimientoPanel(true)
  }
 
  const Acciones = [{
    "id"         : "1213522726",
    "label"      : "Editar Mantenimiento",
    "estate"     : 2,
    "function"   : ShowEditarMantenimientoPanel,
  }]

  const [DefaultPanel, setDefaultPanel] = useState(false) 
  const [ActividadesPanel, setActividadesPanel] = useState(true) 

  function CloseAllPanels(){ 
    setActividadesPanel(false) 
    setDefaultPanel(true)
  }

  function ShowActividades(){ 
    setDefaultPanel(false) 
    setActividadesPanel(true)
  }

  const Data = [{  
    "id"         : '623026548',
    "nombre"     : "DESCRIPCION",
    "value"      : MttoData[0] ? MttoData[0].descripcion : '',
  }]

  const Buttons = [{  
    "id"         : '16256256',
    "label"      : "Actividades",
    "Myfunction" : ShowActividades,
    "estado"     : ActividadesPanel
  }]
 
  const Actividades = [];
  MttoData.forEach(MttoData => {
    console.log(MttoData)
    MttoData.actividades.forEach(data => {
      Actividades.push({
        actividad_id   : data.actividad_id,
        nombre         : data.nombre,
        sistema        : data.sistema,
        componente     : data.componente,
        frecuencia     : data.frecuencia,
        tipofrecuencia : data.tipofrecuencia
      });
    });
  });

  useEffect(() => {  
    setActividadesFiltradas(Actividades)
  }, [MttoData])
  
  const [ActividadesFiltradas, setActividadesFiltradas] = useState();
  const FiltroActividades = ( searchTerm ) => {
    const filtered = Actividades.filter((data) => {
        const actividad_id   = data.actividad_id.toLowerCase();
        const nombre         = data.nombre.toLowerCase();
        const sistema        = data.sistema.toLowerCase();
        const componente     = data.componente.toLowerCase();
        const frecuencia     = data.frecuencia.toLowerCase();
        const tipofrecuencia = data.tipofrecuencia.toLowerCase(); 
        return (
          actividad_id.includes(searchTerm)   ||
          nombre.includes(searchTerm)         ||
          frecuencia.includes(searchTerm)     ||
          componente.includes(searchTerm)     ||
          sistema.includes(searchTerm)        ||
          tipofrecuencia.includes(searchTerm)  
        );
    });
    setActividadesFiltradas(filtered);
  };

  return (
    <main className='w-full h-screen overflow-hidden  flex flex-col justify-start items-center '> 
      <Appbar
        ShowModal = { ShowActions }
        Nombre    = { MttoData[0].Nombre }
      />
      <div className="w-full h-full overflow-hidden overflow-y-auto flex flex-col lg:flex-row justify-start items-start">
        <div className="w-full h-auto px-4 py-2 lg:w-[20%]  gap-2 flex flex-col justify-start items-center">
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
            MttoData[0].caracteristicas ? (
                MttoData[0].caracteristicas.map( (data) => (
                  <Caracteristica_target
                    name = { data.nombre }
                    key = { data.taqotro }
                    value = { data.value }
                  />
                ))
            ) : null
          }
        </div>
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
        <div className='w-full xl:w-[80%] h-full overflow-y-auto xl:p-4'>
          {
            ActividadesPanel ? (
              <div key = {`ActividadesPanel`} className='w-full h-full flex flex-col justify-start items-center justify-items-center gap-2 p-4 overflow-y-auto'>
                <div className='w-full h-auto flex flex-col sm:flex-row justify-center items-center gap-3 px-2 py-1'>
                  <SearchInput SearchFunction = { FiltroActividades } />
                  <div onClick = { () => setCreateFormModal(true) } className='w-full sm:w-auto h-auto text-center flex justify-center items-center px-2 py-1 border border-black hover:border-white rounded-md text-sm bg-green-500 hover:bg-green-800 text-white cursor-pointer duration-700 ease-in-out'>
                    Agregar Nueva Actividad
                  </div> 
                </div>
                <div className={`w-full h-full flex flex-col justify-start items-center gap-2 py-1 px-4  overflow-hidden overflow-y-auto`}>
                  { 
                    ActividadesFiltradas ? (
                      ActividadesFiltradas.map((data) => (
                        <div key = { data.actividad_id } className='w-full h-auto flex justify-between items-center border border-black cursor-pointer  hover:bg-gray-800 hover:text-white px-4 py-2'>
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
                            <span onClick = { () => {} } className='w-auto h-[50px] px-4 py-2 rounded-md  shadow-sm flex border border-black hover:border-white shadow-blackflex justify-center items-center bg-yellow-500 hover:bg-yellow-800 transition duration-700 ease-in-out text-black hover:text-white font-semibold'>
                              Editar  
                            </span>
                            <span onClick = { () => {} } className='w-auto h-[50px] px-4 py-2 rounded-md  shadow-sm flex border border-black hover:border-white shadow-blackflex justify-center items-center bg-red-500 hover:bg-red-800 transition duration-700 ease-in-out text-black hover:text-white font-semibold'>
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
                EditarMantenimientoPanel ? (
                  <EditMantenimiento route = {`/mantenimiento/componente/update`} Mtto = { MttoData[0] } onClose = { () => setShowModal(false) } />
                ) : null
              }
            </Actions>
          ) : null
        } 
      </Modal>
      <Modal
        isVisible = { CreateFormModal }
        onClose = { () => setCreateFormModal(false) }
        tittle = {`Acciones`}
      >
        <CreateActividad Mantenimiento = { MttoData } onClose = { () => setCreateFormModal() } route = {`/actividades/mantenimiento/componente/store`} />
      </Modal>       
    </main>
  )
}


export default MttoActivo ;