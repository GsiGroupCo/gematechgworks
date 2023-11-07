
import SearchInput from "@/Components/UI/Search";
import { useState } from "react";

const PanelMovimientos = ({ state }) => {

  const [datosFiltrados, setDatosFiltrados] = useState(state);
  const filterData = ( searchTerm ) => {
    const filtered = state.filter((data) => {
        const taqmovactivs  =   data.taqmovactivs.toLowerCase();
        const activo_id    =   data.activo_id.toLowerCase();
        consttaqom         =   data.taqot.toLowerCase();
        const taqempresa    =   data.taqempresa.toLowerCase();
        const fechaSalida   =   data.fechaSalida.toString().toLowerCase();
        const fechaRetorno  =   data.fechaRetorno.toString().toLowerCase();
        const estado        =   data.estado.toLowerCase();
        const ubicacion     =   data.ubicacion.toLowerCase();
        const descripcion   =   data.descripcion.toLowerCase();
        const created_at    =   data.created_at.toString().toLowerCase();
        const updated_at    =   data.updated_at.toString().toLowerCase();
        return (
            taqmovactivs.includes(searchTerm) ||
            activo_id.includes(searchTerm) ||
           taqom.includes(searchTerm) ||
            taqempresa.includes(searchTerm) ||
            fechaSalida.includes(searchTerm) ||
            fechaRetorno.includes(searchTerm) ||
            ubicacion.includes(searchTerm) ||
            descripcion.includes(searchTerm) ||
            estado.includes(searchTerm) ||
            updated_at.includes(searchTerm) ||
            created_at.includes(searchTerm)
        );
    });
    setDatosFiltrados(filtered);
  };
  
  return (
    <div className='w-full  h-full py-2 px-4 flex flex-col justify-center items-center justify-items-center gap-2 '>
     <SearchInput SearchFunction = { filterData } />
      <div className='w-full h-full flex flex-col gap-1 justify-start items-center justify-items-center'>
        {
          datosFiltrados ? (
              datosFiltrados.map( (data) => (
                <div key={data.taqmovactivs} className='w-full h-auto border transition ease-out duration-700 border-black hover:text-white hover:bg-[#385449] hover:border-white cursor-pointer px-4 py-2 rounded-md flex justify-between items-center justify-items-center text-black font-bold'>
                    <h3> OT: { data.taqot } </h3>
                    <h3 className='text-justify'>
                         empresa: { data.nombre_empresa }
                    </h3>
                    <div className='flex gap-3'> 
                        <h3>ESTADO:</h3>
                        <h3 className={`${ data.estado === 'EN PROCESO' ? 'text-[#ce1241]' : 'text-green-500' }`}>
                        { data.estado }
                        </h3>
                    </div>
                </div>
              ))
          ) : null
        }
      </div>
    </div>
  )
}

export default PanelMovimientos;
