
import SearchInput from "@/Components/UI/Search";
import { FC, useState } from "react";

const PanelDocumentosEiminadosOts = ({ state }) => {

  const [datosFiltrados, setDatosFiltrados] = useState(state);
  const filterData = ( searchTerm ) => {
    const filtered = state.filter((data) => {
        const taqDeleteRegister  =   data.taqDeleteRegister.toLowerCase();
        consttaqom              =   data.taqot.toLowerCase();
        const nombreDocumento    =   data.nombreDocumento.toLowerCase();
        const taqresponsable     =   data.taqresponsable.toLowerCase();
        const created_at         =   data.created_at.toString().toLowerCase();
        const updated_at         =   data.updated_at.toString().toLowerCase();
        return (
          taqDeleteRegister.includes(searchTerm) ||
          taqresponsable.includes(searchTerm) ||
            nombreDocumento.includes(searchTerm) ||
           taqom.includes(searchTerm) ||
            updated_at.includes(searchTerm) ||
            created_at.includes(searchTerm)
        );
    });
    setDatosFiltrados(filtered);
  };
  return (
    <div className='w-full  h-full py-2 px-4 flex flex-col justify-center items-center justify-items-center gap-2  '>
     <SearchInput SearchFunction = { filterData } />
      <div className=' w-full h-full flex flex-col gap-1 justify-start items-center justify-items-center'>
        <div className='w-full h-auto px-4 py-2 flex justify-start items-center bg-[#385449] justify-items-center gap-3 border border-black rounded-md font-bold text-white transition ease-in-out duration-700 cursor-pointer'>
            DOCUMENTO
        </div>
        {
          datosFiltrados ? (
              datosFiltrados.map( (data) => (
                  <>
                    { data.nombreDocumento }
                  </>
              ))
          ) : null
        }
      </div>
    </div>
  )
}

export default PanelDocumentosEiminadosOts;
