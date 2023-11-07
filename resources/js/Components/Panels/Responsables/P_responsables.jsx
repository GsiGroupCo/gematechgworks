import SearchInput from '@/Components/UI/Search';
import AddIcon from '@/Components/Icons/Add';
import AvatarCart from '@/Components/UI/Responsables/AvatarCart';
import Modal from '../Modals/Modal';
import NewResponsable from '@/Components/forms/Responsable/CreateNewResponsable/CreateNewResponsable';
import { useState } from 'react';

//Imagenes

const PanelResponsable = ({ state, cargos }) => {

  const [datosFiltrados, setDatosFiltrados] = useState(state);
  const [ShowCreateModal, setShowCreateModal] = useState(false);

  const filterData = ( searchTerm ) => {
    const filtered = state.filter((data) => {
        const responsable_id   =   data.responsable_id.toLowerCase();
        const cargo_id         =   data.cargo_id.toLowerCase();
        const nombre           =   data.nombre.toLowerCase();
        const urlImage         =   data.urlImage.toLowerCase();
        const created_at       =   data.updated_at.toString().toLowerCase();
        const updated_at       =   data.updated_at.toString().toLowerCase();
        return (
          responsable_id.includes(searchTerm) ||
          cargo_id.includes(searchTerm) ||
          nombre.includes(searchTerm) ||
          urlImage.includes(searchTerm) ||
          created_at.includes(searchTerm) ||
          updated_at.includes(searchTerm) 
        );
    });
    setDatosFiltrados(filtered);
  };


  return (
    <>
      <div className='w-full h-full flex flex-col justify-center items-center justify-items-center gap-2  p-4 '>
        <div className='w-full flex justify-center items-center gap-3'>
          <SearchInput SearchFunction = { filterData } />
          <div className='hidden  w-auto h-full md:flex justify-center items-center justify-items-center gap-3 '>
            <div onClick = { () => setShowCreateModal(true) }  className='w-auto h-full flex justify-center items-center justify-items-center text-center gap-3 font-bold  text-white cursor-pointer hover:border-[#385449] border-2 transition duration-700 px-6 py-2 rounded-md  bg-green-500 hover:bg-green-700 order-3 '>
              <AddIcon color='#FFFFFF' width='40px' height='40px'/>
              <span>Agregar Nuevo Responsable </span>
            </div>
          </div>
        </div>
        <div className='w-full h-full grid  grid-cols-1 sm:grid-cols-2  lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4 overflow-y-auto'>
          {
            datosFiltrados ? (
                datosFiltrados.map( (data) => (
                  <AvatarCart
                    key = { data.responsable_id }
                    urlImage = { data.urlImage }
                    responsable_id = { data.responsable_id }
                    nombre = {` ${ data.nombre } `}
                  />
                ))
            ) : null
          }
        </div>
        <Modal
          isVisible = { ShowCreateModal }
          onClose = { () => setShowCreateModal(false) }
          tittle = {`Nuevo Activo`} 
        >
          <NewResponsable Cargos = { cargos } onClose = { () => setShowCreateModal(false) } />
        </Modal>
      </div>
    </>
  )
}

export default PanelResponsable;