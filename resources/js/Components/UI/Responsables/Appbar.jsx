
import ArrowIcon from '@/Components/Icons/arrow'; 
import PointerIcon from '@/Components/Icons/pointer'; 

const Appbar = ({ Responsable, ShowModal, ShowImage }) => {
  
  return (
    <div className='w-full h-[10%] sm:h-auto px-8 py-4 bg-[#385449] flex justify-start items-center justify-items-center gap-6'>
        <div className='w-full h-full sm:h-[150px] sm:px-8 md:py-4 bg-[#385449] flex justify-start items-center justify-items-center gap-6'>
          <div onClick = { ShowImage } className='flex min-w-[150px] w-auto   h-full z-10  rounded-md overflow-hidden border-2 border-white order-1 cursor-pointer hover:scale-105 transition duration-700 ease-in-out'>
            {
              Responsable[0].urlImage != 'default-image.jpg' ? (
                <img src={`https://gworks.gematech.co/storage/responsable/${Responsable[0].taqresponsable}/${Responsable[0].urlImage}`} alt={`image: ${Responsable[0].nombre}`} className = ' max-w-[100px] h-full object-cover sm:object-fill ' loading="lazy"/>
              ) : (
                <img src={`https://gworks.gematech.co/storage/${Responsable[0].urlImage}`} alt={`image: ${Responsable[0].nombre}`} className = ' w-full h-full object-fill ' loading="lazy"/>
              )
            }
          </div>
          <div className=' w-full sm:w-[60%] h-auto text-white font-bold flex flex-col justify-center items-start smitems-center sm:items-start justify-items-center order-2'>
              {
                Responsable[0].nombre ? <h3 className=' text-sm sm:text-base md:text-2xl'> { Responsable[0].nombre } </h3> : null
              }
              {
                Responsable[0].estado ? <h3 className={` text-sm sm:text-base md:text-2xl ${ Responsable[0].estado === 'VIGENTE' ? 'text-green-500' : 'text-red-500' } `}> { Responsable[0].estado } </h3> : null
              }
              {
                Responsable[0].cargo.cargo ? <h3 className=' text-sm sm:text-base md:text-2xl'> { Responsable[0].cargo.cargo } </h3> : null
              }
          </div>
        </div>
        <div className='hidden w-[300px] h-[110px] md:flex justify-center items-center justify-items-center p-2 '>
          <div className='w-[200px] h-full flex flex-col justify-center items-center justify-items-center px-4 p-2 gap-3 '>
              <a href = '/home' className='w-full h-1/2 flex justify-center items-center justify-items-center gap-3 font-bold text-white cursor-pointer hover:bg-green-800 transition duration-700 border border-green-500 px-4 py-2 rounded-md  bg-green-500 order-3'>
                <ArrowIcon color='#FFFFFF' width='30px' height='30px' />
                Regresar
              </a>
              <div onClick = { ShowModal } href = '/home' className='w-full h-1/2 flex justify-center items-center justify-items-center gap-3 font-bold text-white cursor-pointer hover:bg-green-800 transition duration-700 border border-green-500 px-4 py-2 rounded-md  bg-green-500 order-3'>
                <PointerIcon color='#FFFFFF' width='30px' height='30px' />
                Acciones
              </div>
          </div>
        </div>
    </div>
  )
}

export default Appbar;