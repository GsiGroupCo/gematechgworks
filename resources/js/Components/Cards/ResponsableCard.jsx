
const ResponsablesCounts = ({ image, alt, nombre, trabajosAsiganados, trabajosRealizados,taqresponsable }) =>  {
  return (
    <a href = {`/responsable/${taqresponsable}`} className='w-full h-auto px-4 py-2 cursor-pointer bg-[#385449] hover:scale-105 transition duration-700 ease-in-out  text-white rounded-md font-bold flex flex-col lg:flex-row justify-center items-center gap-3'>
        <div className='w-[90px] h-[70px] flex border-2 border-white rounded-full'>
          <img src="" alt="" className=' w-full h-full object-cover rounded-full overflow-hidden' />
        </div>
        <div className='w-full flex flex-col justify-start items-center'>
          <span className='w-full flex justify-start items-center'>  { nombre }  </span>
          <span className='w-full flex justify-start items-center'> TRABAJOS ASIGNADOS: { trabajosAsiganados }  </span>
          <span className='w-full flex justify-start items-center'> TRABAJOS REALIZADOS: { trabajosRealizados }  </span>
        </div>
    </a>
  )
}

export default ResponsablesCounts;