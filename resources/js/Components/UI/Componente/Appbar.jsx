import ArrowIcon from '@/Components/Icons/arrow';
import PointerIcon from '@/Components/Icons/pointer';
import Modal from '@/Components/Panels/Modals/Modal';
import OmsIcon from '@/Components/Icons/ots';
import { useState } from 'react';

const Appbar = ({
    Componente,
    formatos,
    Acciones
  }) => {

  const [ModalImage, setModalImage] = useState(false)
  const [ActionMenu, setActionMenu] = useState(false)
  const [FormatMenu, setFormatMenu] = useState(false)

  return (
    <div className='w-full h-[10%] sm:h-auto px-8 py-4 bg-[#385449] flex justify-start items-center justify-items-center gap-6'>
        <div className='w-full h-full sm:h-[150px] sm:px-8 md:py-4 bg-[#385449] flex justify-start items-center justify-items-center gap-6'>
          <div className=' w-full sm:w-[60%] h-auto text-white font-bold flex flex-col justify-center items-start smitems-center sm:items-start justify-items-center order-2'>
              {
                Componente[0].nombre.length > 0 ? <h3 className=' text-sm sm:text-base md:text-lg'> ACTIVO: { Componente[0].nombre } </h3> : null
              }
              {
                Componente[0].taqComponente.length > 0 ? <h3 className='hidden sm:flex md:text-lg '> ID: { Componente[0].taqComponente } </h3> : null
              }
              {
                Componente[0].serial ? <h3 className='hidden sm:flex md:text-lg '> SERIAL: { Componente[0].serial } </h3> : null
              }
          </div>
          <div onClick = { () => setModalImage(true) } className='hidden sm:flex w-auto h-full z-10  rounded-md overflow-hidden border-2 border-white order-1 cursor-pointer hover:scale-105 transition duration-700 ease-in-out'>
            {
              Componente[0].urlImage != 'default-image.jpg' ? (
                <img src={`https://gworks.gematech.co/storage/Componentes/${Componente[0].taqComponente}/${Componente[0].urlImage}`} alt={`activo: ${Componente[0].nombre}`} className = ' w-full h-full object-fill ' loading="lazy"/>
              ) : (
                <img src={`https://gworks.gematech.co/storage/${Componente[0].urlImage}`} alt={`activo: ${Componente[0].nombre}`} className = ' w-full h-full object-fill ' loading="lazy"/>
              )
            }
          </div>
        </div>
        <div className='hidden w-[300px] h-[110px] md:flex justify-center items-center justify-items-center p-2 '>
          <div className='w-[200px] h-full flex flex-col justify-center items-center justify-items-center px-4 p-2 gap-3 '>
            <a href = '/home' className='w-full h-1/2 flex justify-center items-center justify-items-center gap-3 font-bold text-white cursor-pointer hover:bg-green-800 transition duration-700 border border-green-500 px-4 py-2 rounded-md  bg-green-500 order-3'>
              <ArrowIcon color='#FFFFFF' width='30px' height='30px' />
              Regresar
            </a>
            <div onClick = { () => setActionMenu(true) } className='w-full h-1/2 flex justify-center items-center justify-items-center gap-3 font-bold text-white cursor-pointer hover:bg-green-800 transition duration-700 border border-green-500 px-6 py-2 rounded-md  bg-green-500 order-3'>
              <PointerIcon color='#FFFFFF' width='30px' height='30px'/>
              Acciones
            </div>
          </div>
          <div onClick = { () => setFormatMenu(true) } className='w-[100px] h-full flex flex-col justify-center items-center justify-items-center gap-3 font-bold text-white cursor-pointer hover:bg-green-800 transition duration-700 border border-green-500 px-6 py-2 rounded-md  bg-green-500 order-3 '>
            <OmsIcon color='#FFFFFF' width='30px' height='30px'/>
            Formatos
          </div>
        </div>
        <Modal
          isVisible = { ModalImage }
          onClose = { () => setModalImage(false) }
          tittle = {`Imagen de Componente`}
        >
          {
            Componente[0].urlImage != 'default-image.jpg' ? (
              <img src={`http://gworks.gematech.co/storage/Componentes/${Componente[0].taqComponente}/${Componente[0].urlImage}`} alt={`activo: ${Componente[0].nombre}`} className = ' w-full h-full object-fill ' loading="lazy"/>
            ) : (
              <img src={`http://gworks.gematech.co/storage/${Componente[0].urlImage}`} alt={`activo: ${Componente[0].nombre}`} className = ' w-full h-full object-fill ' loading="lazy"/>
            )
          }
        </Modal>
        <Modal
          isVisible = { ActionMenu }
          onClose = { () => setActionMenu(false) }
          tittle = {`Acciones`} 
        >
              { Acciones }
        </Modal>
        <Modal
          isVisible = { FormatMenu }
          onClose = { () => setFormatMenu(false) }
          tittle = {`Formatos`} 
        >
              { formatos }
        </Modal>
    </div>
  )
}

export default Appbar;