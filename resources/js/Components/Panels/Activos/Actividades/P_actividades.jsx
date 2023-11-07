import SearchInput from "@/Components/UI/Search";
import ActividadesElementList from "@/Components/UI/Activo/Actividades/Element";
import { useState } from "react";


const PanelActividades = ({ state }) => {

  const [datosFiltrados, setDatosFiltrados] = useState(state);

  const filterData = ( searchTerm ) => {
    const filtered = state.filter((data) => {
        const om_id           =   data.om_id.toLowerCase();
        const activo_id       =   data.activo_id.toLowerCase();
        const responsable_id  =   data.responsable_id.toLowerCase();
        const fecha_inicio    =   data.fecha_inicio ? data.fecha_inicio.toString().toLowerCase() : '';
        const fecha_fin       =   data.fecha_fin ? data.fecha_fin.toString().toLowerCase() : '';
        const hora_inicio     =   data.hora_inicio ? data.hora_inicio.toString().toLowerCase() : '';
        const hora_fin        =   data.hora_fin? data.hora_fin.toLowerCase() : '';
        const descripcion     =   data.descripcion.toLowerCase();
        const prioridad       =   data.prioridad.toLowerCase();
        const estado          =   data.descripcion ? data.descripcion.toLowerCase() : '' ;
        const created_at      =   data.created_at.toString().toLowerCase();
        const updated_at      =   data.updated_at.toString().toLowerCase();
        return (
          om_id.includes(searchTerm) ||
          activo_id.includes(searchTerm) ||
          responsable_id.includes(searchTerm) ||
          fecha_inicio.includes(searchTerm) ||
          fecha_fin.includes(searchTerm) ||
          hora_inicio.includes(searchTerm) ||
          hora_fin.includes(searchTerm) ||
          descripcion.includes(searchTerm) ||
          prioridad.includes(searchTerm) ||
          estado.includes(searchTerm) ||
          updated_at.includes(searchTerm) ||
          created_at.includes(searchTerm)
        );
    });
    setDatosFiltrados(filtered); // Actualiza el estado con los datos filtrados
  };
  
  return (
    <div className='w-full  h-full py-2 px-4 flex flex-col justify-center items-center justify-items-center gap-2  '>
     <SearchInput SearchFunction = { filterData } />
      <div className='w-full h-full flex flex-col gap-1 justify-start items-center justify-items-center'>
        {
          datosFiltrados ? (
              datosFiltrados.map( (data) => (
                  <ActividadesElementList
                    key = { data.om_id }
                    estado = { data.estado }
                    ot = { data.om_id }
                  />
              ))
          ) : null
        }
      </div>
    </div>
  )
}

export default PanelActividades;
