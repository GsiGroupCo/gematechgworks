import SearchInput from '@/Components/UI/Search';
import { useState } from 'react'

const Mttos = ({ mantenimientos }) =>  {

  const [datosFiltrados, setDatosFiltrados] = useState(mantenimientos);

  const filterData = ( searchTerm ) => {
    const filtered = mantenimientos.filter((data) => {
        const TaqManto    =   data.taqManto.toLowerCase();
        const Nombre      =   data.Nombre.toLowerCase();
        const descripcion =   data.descripcion.toLowerCase();
        const tipe        =   data.tipe.toLowerCase();
        const created_at  =   data.created_at.toString().toLowerCase();
        const updated_at  =   data.updated_at.toString().toLowerCase();
        return (
            TaqManto.includes(searchTerm) ||
            Nombre.includes(searchTerm) ||
            descripcion.includes(searchTerm) ||
            tipe.includes(searchTerm) ||
            created_at.includes(searchTerm) ||
            updated_at.includes(searchTerm) 
        );
    });
    setDatosFiltrados(filtered);
  };


  return (
    <div className='w-full h-full overflow-y-auto px-4 py-2 bg-white rounded-md shadow-md shadow-black flex flex-col justify-start items-start gap-3'>
        <h3 className='font-bold text-2xl'> Mantenimientos </h3>
        <SearchInput SearchFunction = { filterData } />
        {
          datosFiltrados ? (
            datosFiltrados .map((data) => (
              <a href={`/mantenimiento/${data.taqManto}`} className=' cursor-pointer hover:bg-[#385449] hover:text-white transition duration-700 ease-in-out w-full h-auto px-4 py-2 flex justify-center items-center gap-3 bg-white border rounded-md border-[#385449] text-black font-bold'>
                <div className='w-[50%] h-auto flex justify-center items-center'>
                  { data.Nombre }
                </div>
                <div className='w-[50%] h-auto flex justify-center items-center'>
                  { data.tipe }
                </div>
              </a>
            ))) : null
        }
    </div>
  )
}


export default Mttos; 