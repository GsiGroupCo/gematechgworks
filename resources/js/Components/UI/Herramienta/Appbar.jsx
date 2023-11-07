
import ArrowIcon from '@/Components/Icons/arrow';
import PointerIcon from '@/Components/Icons/pointer';
import Modal from '@/Components/Panels/Modals/Modal';
import { useState } from 'react';
import Actions from './Actions';


const HerramientaAppbar = ({ Herramienta, Responsables, Caracteristicas, Categorias, Empresas }) => {

  console.log(Categorias)
  
  const [ModalImage, setModalImage] = useState(false)
  const [ModalActions, setModalActions] = useState(false)

  return (
    <div className='w-full h-[10%] sm:h-auto px-8 py-4 bg-[#385449] flex justify-start items-center justify-items-center gap-6'>
        <div className='w-full h-full sm:h-[150px] sm:px-8 md:py-4 bg-[#385449] flex justify-start items-center justify-items-center gap-6'>
          <div className=' w-full sm:w-[60%] h-auto text-white font-bold flex flex-col justify-center items-start smitems-center sm:items-start justify-items-center order-2'>
              {
                Herramienta[0].nombre ? <h3 className=' text-sm sm:text-base md:text-2xl'> { Herramienta[0].nombre } </h3> : null
              }
              {
                Herramienta[0].serial ? <h3 className=' text-sm sm:text-base md:text-2xl'> SERIAL: { Herramienta[0].serial } </h3> : null
              }
              {
                Herramienta[0].empresa ? <h3 className=' text-sm sm:text-base md:text-2xl'> EMPRESA: { Herramienta[0].empresa.nombre } </h3> : null
              }
          </div>
          <div className='hidden sm:flex w-auto h-full z-10 bg-white  rounded-md overflow-hidden border-2 border-white order-1'>
            {
              Herramienta[0].urlImage === 'default-image.jpg' ? (
                <img onClick = { () => setModalImage(true) } loading="lazy" src={`https://gematech.co/storage/default-image.jpg`} alt={`imagen de ${Herramienta[0].nombre}`} className = ' w-full h-full object-fill hover:cursor-pointer' />
              ) : (
                <img onClick = { () => setModalImage(true) } loading="lazy" src={`https://gematech.co/storage/Herramientas/${Herramienta[0].taqHer}/${Herramienta[0].urlImage}`} alt={`imagen de ${Herramienta[0].nombre}`} className = 'hover:cursor-pointer w-full h-full object-fill ' />
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
            <div onClick = { () => setModalActions(true) } className='w-full h-1/2 flex justify-center items-center justify-items-center gap-3 font-bold text-white cursor-pointer hover:bg-green-800 transition duration-700 border border-green-500 px-6 py-2 rounded-md  bg-green-500 order-3'>
              <PointerIcon color='#FFFFFF' width='30px' height='30px'/>
              Acciones
            </div>
          </div>
        </div>
        <Modal
          isVisible = { ModalImage }
          onClose   = { () => setModalImage(false) }
          tittle    = {`Imange de Herramienta`} 
        >
          {
            Herramienta[0].urlImage === 'default-image.jpg' ? (
              <img src={`https://gematech.co/storage/default-image.jpg`} alt={`imagen de ${Herramienta[0].nombre}`} className = ' w-full h-full max-h-[500px] object-fill ' loading="lazy" />
            ) : (
              <img src={`https://gematech.co/storage/Herramientas/${Herramienta[0].taqHer}/${Herramienta[0].urlImage}`} alt={`imagen de ${Herramienta[0].nombre}`} loading="lazy" className = 'max-h-[700px]  w-full h-full object-fill ' />
            ) 
          }
        </Modal>
        <Modal
          isVisible = { ModalActions }
          onClose   = { () => setModalActions(false) }
          tittle    = {`Acciones para la herramienta ${Herramienta[0].nombre}`} 
        >
          <Actions Responsables = { Responsables } onClose = { () => setModalActions(false) }  Herramienta = { Herramienta } Caracteristicas = { Caracteristicas } Categorias = { Categorias } Empresas = { Empresas } />
        </Modal>
    </div>
  )
}

export default HerramientaAppbar;