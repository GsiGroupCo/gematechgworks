
import SearchInput from "@/Components/UI/Search";
import { FC, useState } from "react";

const PanelDocumentosEliminados = ({ state }) => { 

  const [documentosFiltrados, setdocumentosFiltrados] = useState(state);

  const filtered = ( searchTerm ) => {
    const filtered = state.filter((data) => {
        const activo_id        = data.activo_id.toLowerCase();
        const taqDeleteRegister = data.taqDeleteRegister.toLocaleLowerCase();
        const taqresponsable    = data.taqresponsable.toLocaleLowerCase();
        const nombre_documento  = data.nombreDocumento.toLowerCase();
        const created_at        = data.created_at.toString().toLowerCase();
        const updated_at        = data.updated_at.toString().toLowerCase();
        return (
            activo_id.includes(searchTerm) ||
            taqDeleteRegister.includes(searchTerm) ||
            nombre_documento.includes(searchTerm) ||
            taqresponsable.includes(searchTerm) ||
            updated_at.includes(searchTerm) ||
            created_at.includes(searchTerm)
        );
    });
    setdocumentosFiltrados(filtered);
  };

  return (
    <div className='w-full  h-full py-2 px-4 flex flex-col justify-center items-center justify-items-center gap-2 '>
      <SearchInput SearchFunction = { filtered } />
      <div className='w-full h-full flex flex-col gap-1 justify-start items-center justify-items-center'>
        {
          documentosFiltrados ? (
              documentosFiltrados.map( (data) => (
                <ManttoElement key={data.taqDeleteRegister}>
                  <>
                      { data.nombreDocumento }
                  </>
                </ManttoElement>
              ))
          ) : null
        }
      </div>
    </div>
  )
}

export default PanelDocumentosEliminados;
