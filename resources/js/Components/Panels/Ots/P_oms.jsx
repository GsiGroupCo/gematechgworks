import { useState } from 'react'

import SearchInput from '@/Components/UI/Search';
import DownloadIcon from '@/Components/Icons/download';
import AddIcon from '@/Components/Icons/Add';
import Modal from '../Modals/Modal';
import NewOt from '@/Components/forms/Oms/FormNewOM/FormNewOM';
import OmElement from '@/Components/UI/Oms/Om_element';

const PanelOms = ({ Coordinadores, state, Activos }) => {

  const [datosFiltrados, setDatosFiltrados] = useState(state);
  const [ModalShow, setModalShow] = useState(false);

  const filterData = ( searchTerm ) => {
    const filtered = state.filter((data) => {
        const om_id          =  data.om_id.toLowerCase();
        const responsable_id =  data.responsable_id.toLowerCase();
        const fecha_inicio   =  data.fecha_inicio.toLowerCase();
        const fecha_fin      =  data.fecha_fin.toLowerCase();
        const hora_inicio    =  data.hora_inicio.toLowerCase();
        const hora_fin       =  data.hora_fin.toLowerCase();
        const descripcion    =  data.descripcion.toLowerCase();
        const prioridad      =  data.prioridad.toLowerCase();
        const estado         =  data.estado.toLowerCase();
        return (
            om_id.includes(searchTerm) ||
            responsable_id.includes(searchTerm) ||
            fecha_inicio.includes(searchTerm) ||
            fecha_fin.includes(searchTerm) ||
            hora_inicio.includes(searchTerm) ||
            hora_fin.includes(searchTerm) ||
            descripcion.includes(searchTerm) ||
            prioridad.includes(searchTerm) ||
            estado.includes(searchTerm)
        );
    });
    setDatosFiltrados(filtered);
  };

  return (
    <div className='w-full h-full  flex flex-col justify-center items-center justify-items-center gap-2 p-4 '>
      <div className='w-full flex justify-center items-center gap-3'>
       <SearchInput SearchFunction = { filterData } />
       <div className='hidden  w-auto h-full md:flex justify-center items-center justify-items-center gap-3 '>
          <div className='w-auto h-full flex justify-center items-center justify-items-center text-center gap-3 font-bold text-black cursor-pointer hover:border-[#385449] border-2 transition duration-700 px-6 py-2 rounded-md  bg-white order-3 '>
            <DownloadIcon color='#000000' width='30px' height='30px'/>
            <span>Formatos OM's</span>
          </div>
          <div onClick = { () => setModalShow(true) }  className='w-auto h-full flex justify-center items-center justify-items-center text-center gap-3 font-bold  text-white cursor-pointer hover:border-[#385449] border-2 transition duration-700 px-6 py-2 rounded-md  bg-green-500 hover:bg-green-700 order-3 '>
            <AddIcon color='#FFFFFF' width='40px' height='40px'/>
            <span>Agregar Nueva OM'S</span>
          </div>
        </div>
      </div>
      <div className='w-full h-full flex flex-col  justify-start items-center justify-items-center overflow-y-auto  gap-2 px-4'>
        <div className='w-full cursor-pointer h-auto  py-2  font-bold border bg-[#385449]  hover:bg-[#385449]  text-white  rounded-md flex flex-col sm:flex-row justify-start px-4 items-center justify-items-center sm:gap-3 gap-4 transition duration-700 ease-in-out'>
            <div className=' w-1/2 sm:w-[10%] h-full flex justify-start items-center justify-items-center gap-3'>
                <h3> OM </h3>
            </div>
            <div className='w-1/2 sm:w-[60%] h-full flex justify-start items-center justify-items-center'>
                <h3 className='text-justify'>
                    Descripcion
                </h3>
            </div>
        </div>
        {
          datosFiltrados  ? (
              datosFiltrados.map((data) => (
                  <OmElement
                    key = { data.om_id }
                    id = { data.om_id }
                    descripcion = { data.descripcion }
                  />
              ))
          ) : null
        }
      </div>
      <Modal
        isVisible = { ModalShow }
        onClose = { () => setModalShow(false) }
        tittle = {`Nueva Orden de Trabajo`} 
      >
        <NewOt Responsables = { Coordinadores } onClose= { () => setModalShow(false) } Activos = { Activos }  />
      </Modal>
    </div>
  )
}

export default PanelOms;