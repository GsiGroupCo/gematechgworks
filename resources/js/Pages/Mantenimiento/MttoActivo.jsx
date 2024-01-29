
import Modal from "@/Components/Panels/Modals/Modal";
import Actions from "@/Components/UI/Actions"; 
import Appbar from "@/Components/UI/Mantenimiento/Activo/Appbar";
import SearchInput from "@/Components/UI/Search"; 
import EditMantenimiento from "@/Components/forms/Mantenimiento/EditMantenimiento";
import EditActividadMtto from "@/Components/forms/Mantenimiento/Actividades/EditActividadMtto";
import { useForm } from "@inertiajs/react";
import { useEffect, useState } from "react"; 
 
const MttoActivo = ({ MttoData }) => {
 
  const { post, data } = useForm();

  const [ModalShow, setModalShow] = useState(false)

  const [FormModal, setFormModal] = useState(false)

  const [CreateFormModal, setCreateFormModal] = useState(false)
  const [EditFormModal, setEditFormModal] = useState(false)
  const [DeleteFormModal, setDeleteteFormModal] = useState(false)

  function CreateNewAct(){
    setFormModal(true)
    setDeleteteFormModal(false)
    setEditFormModal(false)
    setCreateFormModal(true)
  }

  function EditAct(){
    setFormModal(true)
    setCreateFormModal(false)
    setDeleteteFormModal(false)
    setEditFormModal(true)
  }

  function DeleteAct(){
    setFormModal(true)
    setCreateFormModal(false)
    setEditFormModal(false)
    setDeleteteFormModal(true)
  }

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
  
  const Actividades = [];
  MttoData.forEach(MttoData => {
    MttoData.actividades.forEach(data => {
      Actividades.push({
        actividad_id     : data.actividad_id,
        taqMantenimiento : data.taqMantenimiento,
        nombre           : data.nombre,
        descripcion      : data.descripcion,
        sistema          : data.sistema,
        frecuencia       : data.frecuencia,
        tipofrecuencia   : data.tipofrecuencia,
      });
    });
  });

  useEffect(() => {  
    setActividadesFiltradas(Actividades)
  }, [MttoData])
  
  const [ActividadesFiltradas, setActividadesFiltradas] = useState();
  const FiltroActividades = ( searchTerm ) => {
    const filtered = Actividades.filter((data) => { 
        const actividad_id     = data.actividad_id.toLowerCase(); 
        const nombre           = data.nombre.toLowerCase();
        const descripcion      = data.descripcion.toLowerCase();
        const sistema          = data.sistema.toLowerCase();
        const frecuencia       = data.frecuencia.toLowerCase();
        const tipofrecuencia   = data.tipofrecuencia.toLowerCase();
        return (
          actividad_id.includes(searchTerm)   ||
          nombre.includes(searchTerm)         ||
          frecuencia.includes(searchTerm)     ||
          descripcion.includes(searchTerm)    ||
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
        MttoData  = { MttoData[0] }
      />
        <div key = {`ActividadesPanel`} className='w-full h-full flex flex-col justify-start items-center justify-items-center gap-2 p-4 overflow-y-auto'>
          <div className='w-full h-auto flex flex-col sm:flex-row justify-center items-center gap-3 px-2 py-1'>
            <SearchInput SearchFunction = { FiltroActividades } />
            <div onClick = { () => CreateNewAct() } className='w-full sm:w-auto h-auto text-center flex justify-center items-center px-2 py-1 border border-black hover:border-white rounded-md text-sm bg-green-500 hover:bg-green-800 text-white cursor-pointer duration-700 ease-in-out'>
              Agregar Actividad
            </div> 
          </div>
          <div className={`w-full h-full flex flex-col justify-start items-center gap-2 py-1 px-4  overflow-hidden overflow-y-auto`}>
            { 
              ActividadesFiltradas ? (
                ActividadesFiltradas.map((data) => (
                  <div key = { data.actividad_id } className='w-full h-auto flex justify-between items-center border border-black cursor-pointer px-4 py-2'>
                    <div className="w-auto flex flex-col justify-start items-start">
                      <span className='w-auto h-full font-bold text-lg '>
                        { data.nombre }
                      </span>
                      <span className='w-auto h-full '>
                        Descripcion: { data.descripcion }
                      </span>
                      <span className='w-auto h-full '>
                        Frecuencia : { data.frecuencia }
                      </span>
                      <span className='w-auto h-full '>
                        Tipo de Frecuencia: { data.tipofrecuencia }
                      </span>
                    </div>
                    <div className='w-[200px] h-full flex flex-col justify-center items-center gap-1'> 
                      <span onClick = { () => EditAct() } className='w-full h-auto px-4 py-2 rounded-md  shadow-sm flex border border-black hover:border-white shadow-blackflex justify-center items-center bg-yellow-500 hover:bg-yellow-800 transition duration-700 ease-in-out text-black hover:text-white font-semibold'>
                        Editar  
                      </span>
                      <span onClick = { () => DeleteAct() } className='w-full h-auto px-4 py-2 rounded-md  shadow-sm flex border border-black hover:border-white shadow-blackflex justify-center items-center bg-red-500 hover:bg-red-800 transition duration-700 ease-in-out text-black hover:text-white font-semibold'>
                        Eliminar
                      </span>
                    </div>
                  </div> 
                ))
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
                  <EditMantenimiento route = {`/mantenimiento/activo/update`} Mtto = { MttoData[0] } onClose = { () => setShowModal(false) } />
                ) : null
              }
            </Actions>
          ) : null
        } 
      </Modal>
      <Modal
        isVisible = { FormModal }
        onClose = { () => setFormModal(false) }
        tittle = {`Acciones`}
      >
        {
          CreateFormModal ? (
            <CreateActividad Mantenimiento = { MttoData } onClose = { () => setFormModal() } route = {`/actividades/mantenimiento/activo/store`} />
          ) : null
        }
        {
          EditFormModal ? ( 
            <EditActividadMtto Actividad = { ActividadSelected } onClose = { () => setFormModal() } route = {`/actividades/mantenimiento/activo/store`} />
          ) : null
        }
        {
          DeleteFormModal ? (
            <EliminarActividad/>
          ) : null
        }
      </Modal>       
    </main>
  )
}


export default MttoActivo ;