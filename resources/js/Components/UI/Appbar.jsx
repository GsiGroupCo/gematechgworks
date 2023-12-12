import ArrowIcon from '@/Components/Icons/arrow';
import PointerIcon from '@/Components/Icons/pointer'; 
import OmsIcon from '@/Components/Icons/ots';
import { Link } from '@inertiajs/react'; 

const Appbar = ({ Objeto }) => { 
  return (
    <div className='w-full h-[10%] sm:h-auto px-8 py-4 bg-[#385449] flex flex-col sm:flex-row justify-start items-center justify-items-center gap-6'>
        <div className='w-full h-full sm:h-[150px] sm:px-8 md:py-4 bg-[#385449] flex justify-start items-center justify-items-center gap-6'>
          <div className=' w-full sm:w-[60%] h-auto text-white font-bold flex flex-col justify-center items-start smitems-center sm:items-start justify-items-center order-2'>
              {
                Objeto.nombre.length > 0 ? <h3 className=' text-sm sm:text-base md:text-lg'> ACTIVO: { Objeto.nombre } </h3> : null
              }
              {
                Objeto.taqActivos.length > 0 ? <h3 className='hidden sm:flex md:text-lg '> ID: { Objeto.taqActivos } </h3> : null
              }
              {
                Objeto.serial ? <h3 className='hidden sm:flex md:text-lg '> SERIAL: { Objeto.serial } </h3> : null
              }
          </div>
          <div className='flex min-w-[150px] w-auto   h-full z-10  rounded-md overflow-hidden border-2 border-white order-1 cursor-pointer hover:scale-105 transition duration-700 ease-in-out'>
            {
              Objeto.urlImage != 'default-image.jpg' ? (
                <img src={`https://gworks.gematech.co/storage/Activos/${Objeto.taqActivos}/${Objeto.urlImage}`} alt={`activo: ${Objeto.nombre}`} className = ' w-full h-full object-cover sm:object-fill ' loading="lazy"/>
              ) : (
                <img src={`https://gworks.gematech.co/storage/${Objeto.urlImage}`} alt={`activo: ${Objeto.nombre}`} className = ' w-full h-full object-fill ' loading="lazy"/>
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
            <div className='w-full h-1/2 flex justify-center items-center justify-items-center gap-3 font-bold text-white cursor-pointer hover:bg-green-800 transition duration-700 border border-green-500 px-6 py-2 rounded-md  bg-green-500 order-3'>
              <PointerIcon color='#FFFFFF' width='30px' height='30px'/>
              Acciones
            </div>
            <div className='md:hidden w-full h-1/2 flex justify-center items-center justify-items-center gap-3 font-bold text-white cursor-pointer hover:bg-green-800 transition duration-700 border border-green-500 px-6 py-2 rounded-md  bg-green-500 order-3'>
              <OmsIcon color='#FFFFFF' width='30px' height='30px'/>
              Formatos
            </div>
          </div>
          <div className='hidden w-[100px] h-full md:flex flex-col justify-center items-center justify-items-center gap-3 font-bold text-white cursor-pointer hover:bg-green-800 transition duration-700 border border-green-500 px-6 py-2 rounded-md  bg-green-500 order-3 '>
            <OmsIcon color='#FFFFFF' width='30px' height='30px'/>
            Formatos
          </div>
        </div>        
    </div>
  )
}

export default Appbar;