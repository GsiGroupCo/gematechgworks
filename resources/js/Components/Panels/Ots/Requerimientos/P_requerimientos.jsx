
import SearchInput from "@/Components/UI/Search";
import { FC, useState } from "react";

const PanelRequerimientos  = ({ state }) => {

  const [datosFiltrados, setDatosFiltrados] = useState(state);
  const filterData = ( searchTerm ) => {
    const filtered = state.filter((data) => {
        const id_requesicion    =   data.id_requesicion.toLowerCase();
        const proyecto          =   data.proyecto.toLowerCase();
        consttaqom             =   data.taqot.toLowerCase();
        const taqresponsable    =   data.taqresponsable.toLowerCase();
        const cargo_solicitante =   data.cargo_solicitante.toLowerCase();
        const Autoriza          =   data.Autoriza.toLowerCase();
        const cargo_Autoriza    =   data.cargo_Autoriza.toLowerCase();
        const estado            =   data.estado.toLowerCase();
        const created_at        =   data.created_at.toString().toLowerCase();
        const updated_at        =   data.updated_at.toString().toLowerCase();
        return (
            id_requesicion.includes(searchTerm) ||
            proyecto.includes(searchTerm) ||
            taqresponsable.includes(searchTerm) ||
           taqom.includes(searchTerm) ||
            cargo_solicitante.includes(searchTerm) ||
            Autoriza.includes(searchTerm) ||
            cargo_Autoriza.includes(searchTerm) ||
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
          <div className="w-[70%] flex justify-start items-center">
            NUMERO DE REQUISICION
          </div>
          <div className="w-[15%] flex justify-start  items-center">
            PROYECTO
          </div>
          <div className="w-[15%] flex justify-start items-center">
            FECHA DE SOLICITUD
          </div>
        </div>
        {
          datosFiltrados ? (
              datosFiltrados.map( (data) => (
                  <RequerimientosElement 
                    requesicion = { data.proyecto }
                    proyecto = { data.proyecto }
                    fecha = { data.created_at ? data.created_at.toString() : '16-08-2023' }
                    key = { data.id_requesicion } 
                  />
              ))
          ) : null
        }
      </div>
    </div>
  )
}

export default PanelRequerimientos;
