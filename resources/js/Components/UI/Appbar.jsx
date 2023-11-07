import ArrowIcon from '@/Components/Icons/arrow';
import PointerIcon from '@/Components/Icons/pointer';
import Modal from '@/Components/Panels/Modals/Modal';
import OmsIcon from '@/Components/Icons/ots';
import { Link } from '@inertiajs/react';
import Formats from './Activo/Formats';

const Appbar = ({
    urlImage, 
    nombre, 
    serial, 
    id, 
    formats, 
    setFormatState, 
    acctions, 
    setAcctionState, 
    modal, 
    setModalState, 
    modal_tittle, 
    childrenAcction, 
    childrenFormats 
  }) => {

  return (
    <div className='w-full h-[10%] sm:h-auto px-8 py-4 bg-[#385449] flex flex-col sm:flex-row justify-start items-center justify-items-center gap-6'>
        <div className='w-full h-full sm:h-[150px] sm:px-8 md:py-4 bg-[#385449] flex justify-start items-center justify-items-center gap-6'>
          <div className=' w-full sm:w-[60%] h-auto text-white font-bold flex flex-col justify-center items-start smitems-center sm:items-start justify-items-center order-2'>
              {
                nombre.length > 0 ? <h3 className=' text-sm sm:text-base md:text-lg'> ACTIVO: { nombre } </h3> : null
              }
              {
                id.length > 0 ? <h3 className='hidden sm:flex md:text-lg '> ID: { id } </h3> : null
              }
              {
                serial ? <h3 className='hidden sm:flex md:text-lg '> SERIAL: { serial } </h3> : null
              }
          </div>
          <div onClick = { () => setModalState(true) } className='flex min-w-[150px] w-auto   h-full z-10  rounded-md overflow-hidden border-2 border-white order-1 cursor-pointer hover:scale-105 transition duration-700 ease-in-out'>
            {
              urlImage != 'default-image.jpg' ? (
                <img src={`https://gematech.co/storage/Activos/${id}/${urlImage}`} alt={`activo: ${nombre}`} className = ' w-full h-full object-cover sm:object-fill ' loading="lazy"/>
              ) : (
                <img src={`https://gematech.co/storage/${urlImage}`} alt={`activo: ${nombre}`} className = ' w-full h-full object-fill ' loading="lazy"/>
              )
            }
          </div>
        </div>
        <div className='hidden  w-[300px] h-[110px] sm:flex justify-center items-center justify-items-center p-2 '>
          <div className='w-[200px] h-full flex flex-col justify-center items-center justify-items-center px-4 p-2 gap-1 md:gap-3 '>
            <Link href = '/' className='w-full h-1/2 flex justify-center items-center justify-items-center gap-3 font-bold text-white cursor-pointer hover:bg-green-800 transition duration-700 border border-green-500 px-4 py-2 rounded-md  bg-green-500 order-3'>
              <ArrowIcon color='#FFFFFF' width='30px' height='30px' />
              Regresar
            </Link>
            <div onClick = { () => setAcctionState(true) } className='w-full h-1/2 flex justify-center items-center justify-items-center gap-3 font-bold text-white cursor-pointer hover:bg-green-800 transition duration-700 border border-green-500 px-6 py-2 rounded-md  bg-green-500 order-3'>
              <PointerIcon color='#FFFFFF' width='30px' height='30px'/>
              Acciones
            </div>
            <div  onClick = { () => setFormatState(true) } className='md:hidden w-full h-1/2 flex justify-center items-center justify-items-center gap-3 font-bold text-white cursor-pointer hover:bg-green-800 transition duration-700 border border-green-500 px-6 py-2 rounded-md  bg-green-500 order-3'>
              <OmsIcon color='#FFFFFF' width='30px' height='30px'/>
              Formatos
            </div>
          </div>
          <div onClick = { () => setFormatState(true) } className='hidden w-[100px] h-full md:flex flex-col justify-center items-center justify-items-center gap-3 font-bold text-white cursor-pointer hover:bg-green-800 transition duration-700 border border-green-500 px-6 py-2 rounded-md  bg-green-500 order-3 '>
            <OmsIcon color='#FFFFFF' width='30px' height='30px'/>
            Formatos
          </div>
        </div>
        <Modal
          isVisible = { modal }
          onClose = { () => setModalState(false) }
          tittle = {`Activo`}
        >
          {
            urlImage != 'default-image.jpg' ? (  
              <img src={`https://gematech.co/storage/Activos/${id}/${urlImage}`} alt={`${nombre}`} className = 'max-w-[300px] sm:max-w-[650px] md:max-w-[780px] max-h-[800px] object-fill ' loading="lazy"/>
            ) : (
              <img src={`https://gematech.co/storage/${urlImage}`} alt={`${nombre}`} className = ' max-w-[800px] max-h-[800px] object-fill ' loading="lazy"/>
            )   
          }   
        </Modal>
        <Modal
          isVisible = { acctions }
          onClose = { () => setAcctionState(false) }
          tittle = {`Acciones`} 
        >
              { childrenAcction }
        </Modal>
        <Modal
          isVisible = { formats }
          onClose = { () => setFormatState(false) }
          tittle = {`Formatos`} 
        >
              <Formats Activo = { id } onClose = { () => setFormatState(false) } />
        </Modal>
    </div>
  )
}

export default Appbar;