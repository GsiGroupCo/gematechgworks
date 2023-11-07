const SubrutinaElement = ({ nombre, Frecuencia, tipo, isValid }) => {

  return (
    <div className='w-full h-auto px-4 py-2 bg-white border border-[#385449] rounded-md flex justify-evenly font-bold text-[#385449] cursor-pointer hover:bg-[#385449] hover:text-white transition duration-700 ease-in-out  items-center'>
        <div className='w-[55%] flex justify-start text-xs'>
            { nombre }
        </div>
        <div className='w-[15%] flex justify-center text-xs'>
            { Frecuencia } Horas
        </div>
        <div className='w-[15%] flex justify-center text-xs'>
            { tipo }
        </div>
        {
            isValid ? (
                <div className='w-[15%] flex justify-center items-center gap-1'>
                    <button className='w-1/2 h-auto px-2 py-1 bg-yellow-500 hover:bg-yellow-800 border border-white text-white transition duration-700 ease-in-out rounded-md '> Editar </button>
                    <button className='w-1/2 h-auto px-2 py-1 bg-red-500 hover:bg-red-800 border border-white text-white transition duration-700 ease-in-out rounded-md '> Eliminar </button>
                </div>
            ) : null
        }
    </div>
  )
}

export default SubrutinaElement;
