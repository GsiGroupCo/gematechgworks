
import SearchInput from "@/Components/UI/Search";
import { FC, useState } from "react";

const PanelTrabajosResponsables = ({ state }) => {

  const [datosFiltrados, setDatosFiltrados] = useState(state);
  const filterData = ( searchTerm ) => {
    const filtered = state.filter((data) => {
        const taqtrabajo     =   data.taqtrabajo.toLowerCase();
        const taqresponsable =   data.taqresponsable.toLowerCase();
        consttaqom          =   data.taqot.toLowerCase();
        const cantHoras      =   data.cantHoras.toLowerCase();
        const descripcion    =   data.descripcion.toLowerCase();
        const estado         =   data.estado.toLowerCase();
        const created_at     =   data.created_at.toString().toLowerCase();
        const updated_at     =   data.updated_at.toString().toLowerCase();
        return (
            taqtrabajo.includes(searchTerm) ||
            estado.includes(searchTerm) ||
            taqresponsable.includes(searchTerm) ||
           taqom.includes(searchTerm) ||
            cantHoras.includes(searchTerm) ||
            descripcion.includes(searchTerm) ||
            estado.includes(searchTerm) ||
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
        <div className=" hidden w-full h-auto px-4 py-2  bg-[#385449]  cursor-pointer text-white font-bold rounded-md lg:flex justify-center items-center justify-items-center gap-3">
          <div className="w-[50%] flex justify-start items-center">
            DESCRIPCION
          </div>
          <div className="w-[20%] flex justify-center  items-center">
            OT
          </div>
          <div className="w-[15%] flex justify-center  items-center">
            RESPONSABLE
          </div>
          <div className="w-[15%] flex justify-center items-center">
            ESTADO
          </div>
        </div>
        {
          datosFiltrados ? (
              datosFiltrados.map( (data) => (
                  <TrabajoElement_Empresa 
                    descripcion = { data.descripcion }
                    ot = { data.taqot }
                    estado = { data.estado }
                    responsable = { data.primernombre  + '   ' + data.primerapellido }
                    key = { data.taqtrabajo } 
                  />
              ))
          ) : null
        }
      </div>
    </div>
  )
}

export default PanelTrabajosResponsables;
