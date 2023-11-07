
import SearchInput from "@/Components/UI/Search";
import { useState } from "react";

const PanelDocumentosOts = ({ state }) => {

  const [datosFiltrados, setDatosFiltrados] = useState(state);
  const filterData = ( searchTerm ) => {
    const filtered = state.filter((data) => {
        consttaqom         =   data.taqot.toLowerCase();
        const nombre        =   data.nombre.toLowerCase();
        const taqDoc        =   data.taqDoc.toLowerCase();
        const DocURL        =   data.DocURL.toLowerCase();
        const created_at    =   data.created_at.toString().toLowerCase();
        const updated_at    =   data.updated_at.toString().toLowerCase();
        return (
           taqom.includes(searchTerm) ||
            nombre.includes(searchTerm) ||
            taqDoc.includes(searchTerm) ||
           taqom.includes(searchTerm) ||
            DocURL.includes(searchTerm) ||
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
        <div className='w-full h-auto px-4 py-2 flex justify-start items-center bg-[#385449]  justify-items-center gap-3 border border-black rounded-md font-bold text-white transition ease-in-out duration-700 cursor-pointer'>
            DOCUMENTO
        </div>
        {
          datosFiltrados ? (
              datosFiltrados.map( (data) => (
                  <DocumentElement 
                    nombre = { data.nombre }
                    taqDoc = { data.taqDoc }
                    key = { data.taqDoc }
                  />
              ))
          ) : null
        }
      </div>
    </div>
  )
}

export default PanelDocumentosOts;
