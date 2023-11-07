
import SearchInput from '@/Components/UI/Search';
import React, { useState } from 'react'

const PanelCertificaciones = ({ state }) => {

    const [Certificaciones, setCertificaciones] = useState(state);
    const filtered = ( searchTerm ) => {
        const filtered = state.filter((data) => {
            const activo_id        = data.activo_id.toLowerCase();
            const taqDoc            = data.taqDoc.toLocaleLowerCase();
            const nombre            = data.nombre.toLocaleLowerCase();
            const fechacertificion  = data.fechacertificion.toLowerCase();
            const frecuencia        = data.frecuencia.toLowerCase();
            const estado            = data.estado.toLowerCase();
            const DocURL            = data.DocURL.toLowerCase();
            const created_at        = data.created_at.toString().toLowerCase();
            const updated_at        = data.updated_at.toString().toLowerCase();
            return (
                activo_id.includes(searchTerm) ||
                taqDoc.includes(searchTerm) ||
                nombre.includes(searchTerm) ||
                fechacertificion.includes(searchTerm) ||
                frecuencia.includes(searchTerm) ||
                estado.includes(searchTerm) ||
                DocURL.includes(searchTerm) ||
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
                <ManttoElement key={data.DocURL}>
                  <>
                      { data.nombre }
                  </>
                </ManttoElement>
              ))
          ) : null
        }
      </div>
    </div>
  )
}

export default PanelCertificaciones;