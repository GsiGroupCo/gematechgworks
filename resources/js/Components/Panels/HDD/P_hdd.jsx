import React, { useState } from 'react'
import SearchInput from '@/Components/UI/Search';


const PanelHDD  = ({ state }) => {

    const [datosFiltrados, setDatosFiltrados] = useState(state);

    const [viewDocList, setviewDocList] = useState(false)
    const [viewDoc, setviewDoc] = useState(true)

    const filterData = ( searchTerm ) => {
        const filtered = state.filter((data) => {
            const taqDoc      =   data.taqDoc.toLowerCase();
            const nombre      =   data.nombre.toLowerCase();
            const DocURL      =   data.DocURL.toLowerCase();
            const created_at  =   data.created_at.toString().toLowerCase();
            const updated_at  =   data.updated_at.toString().toLowerCase();
            return (
                taqDoc.includes(searchTerm) ||
                nombre.includes(searchTerm) ||
                DocURL.includes(searchTerm) ||
                created_at.includes(searchTerm) ||
                updated_at.includes(searchTerm) 
            );
        });
        setDatosFiltrados(filtered);
    };

    return (
        <div className='w-full h-full  flex flex-col justify-center items-center justify-items-center gap-2 p-4'>
            {
                viewDocList ? (
                    <>
                   <SearchInput SearchFunction = { filterData } />
                        <div className='w-full h-full flex flex-col justify-start items-center gap-3'>
                            {
                            datosFiltrados ? (
                                datosFiltrados.map( (data) => (
                                    <div className='w-full h-auto px-4 py-2 border border-[#385449] rounded-md bg-white font-bold cursor-pointer hover:bg-[#385449] hover:text-white transition duration-700 ease-in-out'>
                                        { data.nombre }
                                    </div>
                                ))
                            ) : null
                            }
                        </div>
                    </>
                ) :  null
            }
        </div>
        )
    }

export default PanelHDD;