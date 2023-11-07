//Componentes de React
import { FC, useState } from 'react'

//Interfaces
import { EmpresasData } from '@/interfaces/Empresas/EmpresasListResponse';

//Componentes
import SearchInput from '@/Components/UI/Search_input';
import EmpresaPresentacion_cart from '@/Components/UI/Empresa/CardPresentation';
import DownloadIcon from '@/Components/Icons/download';
import AddIcon from '@/Components/Icons/Add';
import Modal from '../Modals/Modal';
import NewClient from '@/Components/forms/Empresa/FormNewClient/FormNewEmpresa';

//Imagenes

interface Props{
    state: EmpresasData[]
}

const Panel_Empresa:FC<Props> = ({ state }) => {

  const [datosFiltrados, setDatosFiltrados] = useState<EmpresasData[]>(state);
  const [ModalShow, setModalShow] = useState(false);

  const filterData = ( searchTerm:string ) => {
    const filtered = state.filter((data) => {
        // Convierte todos los valores a minúsculas para hacer la comparación insensible a mayúsculas
        const taqempresa  =   data.taqempresa.toLowerCase();
        const nombre      =   data.nombre.toLowerCase();
        const urlImage =   data.urlImage.toLowerCase();
        const created_at  =   data.created_at.toString().toLowerCase();
        const updated_at  =   data.updated_at.toString().toLowerCase();
    
        // Comprueba si algún campo contiene el término de búsqueda
        return (
            taqempresa.includes(searchTerm) ||
            nombre.includes(searchTerm) ||
            urlImage.includes(searchTerm) ||
            created_at.includes(searchTerm) ||
            updated_at.includes(searchTerm) 
        );
    });
    setDatosFiltrados(filtered); // Actualiza el estado con los datos filtrados
  };


  return (
    <>
      <div className='w-full h-full flex flex-col justify-center items-center justify-items-center gap-2  p-4 '>
       {/* <SearchInput SearchFunction = { filterData } />
       <div className='hidden  w-auto h-full md:flex justify-center items-center justify-items-center gap-3 '>
        <div  className='w-auto h-full flex justify-center items-center justify-items-center text-center gap-3 font-bold  text-white cursor-pointer hover:border-[#385449] border-2 transition duration-700 px-6 py-2 rounded-md  bg-green-500 hover:bg-green-700 order-3 '>
          <AddIcon color='#FFFFFF' width='40px' height='40px'/>
          <span>Agregar Nueva OT'S</span>
        </div>
       </div> */}
        <div className='w-full flex justify-center items-center gap-3'>
          <SearchInput SearchFunction = { filterData } />
          <div className='hidden  w-auto h-full md:flex justify-center items-center justify-items-center gap-3 '>   
            <div  onClick = { () => setModalShow(true) } className='w-auto h-full flex justify-center items-center justify-items-center text-center gap-3 font-bold  text-white cursor-pointer hover:border-[#385449] border-2 transition duration-700 px-6 py-2 rounded-md  bg-green-500 hover:bg-green-700 order-3 '>
              <AddIcon color='#FFFFFF' width='40px' height='40px'/>
              <span> Agregar Nueva Empresa </span>
            </div>
          </div>
        </div>
        <div className='w-full h-full grid  grid-cols-1 sm:grid-cols-2  lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4 overflow-y-auto'>
          {
            datosFiltrados ? (
                datosFiltrados.map( (data) => (
                    <EmpresaPresentacion_cart
                      key = {data.taqempresa}
                      taqempresa = { data.taqempresa }
                      nombre = { data.nombre }
                      urlImage = { data.urlImage }
                    />
                ))
            ) : null
          }
        </div>
        <Modal
          isVisible = { ModalShow }
          onClose = { () => setModalShow(false) }
          tittle = {`Nueva Empresa`} 
        >
          <NewClient onClose = { () => setModalShow(false) } />
        </Modal>
      </div>
    </> 
  )
}

export default Panel_Empresa;