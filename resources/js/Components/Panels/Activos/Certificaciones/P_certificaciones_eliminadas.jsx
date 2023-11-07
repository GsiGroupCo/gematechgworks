
import SearchInput from '@/Components/UI/Search';
import { useState } from 'react'

const PanelCertificacionesEliminadas = ({ state }) => {

    const [Certificaciones, setCertificaciones] = useState(state);
    const filtered = ( searchTerm ) => {
        const filtered = state.filter((data) => {
            const activo_id         = data.activo_id.toLowerCase();
            const taqDeleteRegister  = data.taqDeleteRegister.toLocaleLowerCase();
            const nombreDocumento    = data.nombreDocumento.toLocaleLowerCase();
            const taqresponsable     = data.taqresponsable.toLowerCase();
            const created_at         = data.created_at.toString().toLowerCase();
            const updated_at         = data.updated_at.toString().toLowerCase();
            return (
                activo_id.includes(searchTerm) ||
                taqDeleteRegister.includes(searchTerm) ||
                nombreDocumento.includes(searchTerm) ||
                taqresponsable.includes(searchTerm) ||
                updated_at.includes(searchTerm) ||
                created_at.includes(searchTerm)
            );
        });
        setCertificaciones(filtered);
    };
    
  return (
    <div className='w-full  h-full py-2 px-4 flex flex-col justify-center items-center justify-items-center gap-2 '>
      <SearchInput SearchFunction = { filtered } />
      <div className='w-full h-full flex flex-col gap-1 justify-start items-center justify-items-center'>
        {
          Certificaciones ? (
              Certificaciones.map( (data) => (
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

export default PanelCertificacionesEliminadas;