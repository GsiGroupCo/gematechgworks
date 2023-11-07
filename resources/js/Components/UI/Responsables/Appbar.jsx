//Componentes de React
import { FC, useContext, useState } from 'react'

//Contextos
import ArrowIcon from '@/Components/Icons/arrow';
import PointerIcon from '@/Components/Icons/pointer';
import Modal from '@/Components/Panels/Modals/Modal';
import Actions from './Actions';


const ResponsableAppbar = ({ nombre, urlImage, taqresponsable, cargo, estado, Cargos, Responsable }) => {

  const [VisibleModal, setVisibleModal] = useState(false);

  return (
    <div className='w-full h-[10%] sm:h-auto px-8 py-4 bg-[#385449] flex justify-start items-center justify-items-center gap-6'>
        <div className='w-full h-full sm:h-[150px] sm:px-8 md:py-4 bg-[#385449] flex justify-start items-center justify-items-center gap-6'>
          <div className=' w-full sm:w-[60%] h-auto text-white font-bold flex flex-col justify-center items-start smitems-center sm:items-start justify-items-center order-2'>
              {
                nombre ? <h3 className=' text-sm sm:text-base md:text-2xl'> { nombre } </h3> : null
              }
              {
                cargo ? <h3 className=' text-sm sm:text-base md:text-xl'> { cargo } </h3> : null
              }
              {
                estado ? <h3 className={`text-sm sm:text-base md:text-xl ${estado === 'VIGENTE' ? 'text-green-500' : 'text-red-500' }`}> { estado } </h3> : null
              }
          </div>
          <div className='hidden sm:flex w-auto h-full z-10 bg-white   rounded-md overflow-hidden border-2 border-white order-1'>
            <img src={`http://localhost:8000/storage/${urlImage}`} alt={`Imagen ${nombre}`}  className = ' w-full h-full object-fill ' loading="lazy"/>
          </div>
        </div>
        <div className='hidden w-[300px] h-[110px] md:flex justify-center items-center justify-items-center p-2 '>
          <div className='w-[200px] h-full flex flex-col justify-center items-center justify-items-center px-4 p-2 gap-3 '>
            <a href = '/home' className='w-full h-1/2 flex justify-center items-center justify-items-center gap-3 font-bold text-white cursor-pointer hover:bg-green-800 transition duration-700 border border-green-500 px-4 py-2 rounded-md  bg-green-500 order-3'>
              <ArrowIcon color='#FFFFFF' width='30px' height='30px' />
              Regresar
            </a>
            <div onClick = { () => setVisibleModal(true) } className='w-full h-1/2 flex justify-center items-center justify-items-center gap-3 font-bold text-white cursor-pointer hover:bg-green-800 transition duration-700 border border-green-500 px-6 py-2 rounded-md  bg-green-500 order-3'>
              <PointerIcon color='#FFFFFF' width='30px' height='30px'/>
              Acciones
            </div>
          </div>
        </div>
        <Modal
            isVisible = { VisibleModal }
            onClose = { () => setVisibleModal(false) }
            tittle = {`Acciones para: ${nombre}`} 
        >
            <Actions onClose = { () => setVisibleModal(false) } taqresponsable = { taqresponsable } Cargos = { Cargos } Responsable = { Responsable } />
        </Modal>
    </div>
  )
}

export default ResponsableAppbar;