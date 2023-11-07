
import ArrowIcon from '@/Components/Icons/arrow';
import omsIcon from '@/Components/Icons/ots';
import PointerIcon from '@/Components/Icons/pointer';
import Modal from '@/Components/Panels/Modals/Modal';
import Actions from './Actions';
import { useState } from 'react';

const omsAppbar = ({  estado, ot, Activos, Responsables, Empresas, ResponsablesOT  }) => { 
  const [AcctionsShow, setAcctionsShow] = useState(false)
  const [FormatsShow, setFormatsShow] = useState(false)

  return (
    <div className='w-full h-[10%] sm:h-auto px-8 py-4 bg-[#385449] flex justify-start items-center justify-items-center gap-6'>
        <div className='w-full h-full sm:h-[150px] sm:px-8 md:py-4 bg-[#385449] flex justify-start items-center justify-items-center gap-6'>
          <div className=' w-full sm:w-[60%] h-auto text-white font-bold flex flex-col justify-center items-start smitems-center sm:items-start justify-items-center order-2'>
              {
                ot.data[0].taqot ? <h3 className=' text-sm sm:text-base md:text-lg'> { ot.data[0].taqot } </h3> : null
              }
              {
                ot.data[0].estado ? <h3 className = {`hidden sm:flex md:text-lg ${ ot.data[0].estado === 'FINALIZADO' ? 'text-green-500' : 'text-red-500' }`}> { ot.data[0].estado } </h3> : null
              }
          </div>
        </div>
        <div className='hidden w-[300px] h-[110px] md:flex justify-center items-center justify-items-center p-2 '>
          <div className='w-[200px] h-full flex flex-col justify-center items-center justify-items-center px-4 p-2 gap-3 '>
            <a href = '/home' className='w-full h-1/2 flex justify-center items-center justify-items-center gap-3 font-bold text-white cursor-pointer hover:bg-green-800 transition duration-700 border border-green-500 px-4 py-2 rounded-md  bg-green-500 order-3'>
              <ArrowIcon color='#FFFFFF' width='30px' height='30px' />
              Regresar
            </a>
            {
              estado != 'FINALIZADO' ? (
                <div onClick = { () => setAcctionsShow(true) } className='w-full h-1/2 flex justify-center items-center justify-items-center gap-3 font-bold text-white cursor-pointer hover:bg-green-800 transition duration-700 border border-green-500 px-6 py-2 rounded-md  bg-green-500 order-3'>
                  <PointerIcon color='#FFFFFF' width='30px' height='30px'/>
                  Acciones
                </div>
              ) : (
                <button disabled className='w-full h-1/2 flex justify-center items-center justify-items-center gap-3 font-bold text-white cursor-not-allowed hover:bg-green-800 transition duration-700 border   px-6 py-2 rounded-md  bg-green-800 order-3'>
                  <PointerIcon color='#FFFFFF' width='30px' height='30px'/>
                  Acciones
                </button>
              )
            }
          </div>
          <a href={`/Download/ot/${ot.data[0].taqot}`} className='w-[100px] h-full flex flex-col justify-center items-center justify-items-center gap-3 font-bold text-white cursor-pointer hover:bg-green-800 transition duration-700 border border-green-500 px-6 py-2 rounded-md  bg-green-500 order-3 '>
            <OtsIcon color='#FFFFFF' width='30px' height='30px'/>
            <span className='text-center'>Formatos</span>
          </a>
        </div>
        <Modal
          isVisible = { AcctionsShow }
          onClose = { () => setAcctionsShow(false) }
          tittle = {`Acciones para ${ot.data[0].taqot}`} 
        >
          <Actions Activos = { Activos } onClose = { () => setAcctionsShow(false) }taqom = { ot.data[0].taqot } Responsables = { Responsables } ResponsablesOT = { ResponsablesOT } estado = { estado }  Empresa = { Empresas } Ot = { ot } />
        </Modal> 
    </div>
  )
}

export default omsAppbar;