import { FC, useState } from "react";
import SearchInput from "@/Components/UI/Search";
import ProgressBar from "@/Components/charts/ProgressBar";
import DonutChart from "@/Components/charts/Donut"; 
import BarChart from "@/Components/charts/Bar_line_chart";
import ResponsablesCounts from "@/Components/Cards/ResponsableCard";

const PanelDashboard = ({ responsables, TotalOm ,OmsPendientes ,OmsFinalizadas  }) => {
    
    const [datosFiltrados, setDatosFiltrados] = useState(responsables);
    
    const data_chart = [0,22,0,0,3,2,1,12,24,12,22,0];

    const filterData = ( searchTerm ) => {
    const filtered = responsables.filter((data) => {
        // Convierte todos los valores a minúsculas para
        const taqresponsable   =   data.taqresponsable.toLowerCase();
        const primernombre     =   data.primernombre.toLowerCase();
        const segundonombre    =   data.segundonombre  ? data.segundonombre.toLowerCase() : '' ;
        const primerapellido   =   data.primerapellido.toLowerCase();
        const segundoapellido  =   data.segundoapellido ? data.segundoapellido.toLowerCase() : '' ;
        const id_cargo         =   data.id_cargo.toLowerCase();
        const urlImage         =   data.urlImage.toLowerCase();
        const created_at       =   data.updated_at.toString().toLowerCase();
        const updated_at       =   data.updated_at.toString().toLowerCase();
    
        // Comprueba si algún campo contiene el término de búsqueda
        return (
            taqresponsable.includes(searchTerm) ||
            primernombre.includes(searchTerm) ||
            segundonombre.includes(searchTerm) ||
            primerapellido.includes(searchTerm) ||
            segundoapellido.includes(searchTerm) ||
            id_cargo.includes(searchTerm) ||
            urlImage.includes(searchTerm) ||
            created_at.includes(searchTerm) ||
            updated_at.includes(searchTerm) 
        );
    });
    setDatosFiltrados(filtered); // Actualiza el estado con los datos filtrados
};

    const data = {
        labels: ['A', 'B', 'C'],
        datasets: [
        {
            label: 'Fallas Registradas',
            data: [300, 50, 100],
            backgroundColor: ['rgb(255, 99, 132)', 'rgb(54, 162, 235)', 'rgb(255, 205, 86)'],
        },
        ],
    };

    
    const meshorasactuales = 60;
        return (
        <div className="w-full h-[100%] bg-gray-400 flex flex-col justify-center items-center">
            <div className="w-full h-[60%]  flex flex-col justify-start items-center ">
                <div className="w-full h-[40%] p-4  flex justify-center items-center gap-6">
                    <div className="w-1/3 h-full bg-white rounded-md shadow-sm shadow-black flex justify-center items-center py-8 gap-3 "> 
                        <div className="w-1/3 h-full flex flex-col justify-center items-center">
                            <span className="w-1/3  flex justify-center text-5xl  ">{TotalOm}</span>
                            <span className="flex justify-center">OM's</span>
                            <span className="flex justify-center ">Totales</span>
                        </div>
                        <div className="border-2 border-black w-[1px] h-full rounded-md"></div>
                        <div className="w-1/3 h-full flex flex-col justify-center items-center">
                            <span className="w-1/3  flex justify-center text-5xl  ">{OmsPendientes}</span>
                            <span className="flex justify-center ">OM's </span>
                            <span className="flex justify-center ">Pendientes</span>
                        </div>
                        <div className="border-2 border-black w-[1px] h-full rounded-md"></div>
                        <div className="w-1/3 h-full flex flex-col justify-center items-center">
                            <span className="w-1/3  flex justify-center text-5xl  ">{OmsFinalizadas}</span>
                            <span className="flex justify-center" >OM's</span>
                            <span className="flex justify-center" >Finalizadas</span>
                        </div>
                    </div>
                    <div className="w-1/3 h-full flex justify-center items-center py-8 gap-3 bg-white rounded-md shadow-sm shadow-black"> 
                        <div className="w-1/3 h-full flex flex-col justify-center items-center">
                            <span className="w-1/3  flex justify-center text-5xl  ">15</span>
                            <span className="flex justify-center">Horas Totales</span>
                            <span className="flex justify-center ">NPT</span>
                        </div>
                        <div className="border-2 border-black w-[1px] h-full rounded-md"></div>
                        <div className="w-1/3 h-full flex flex-col justify-center items-center">
                            <span className={`w-1/3  flex justify-center text-5xl ${ meshorasactuales <= 10 ? 'text-green-500' : 'text-red-500' }`}> {meshorasactuales} </span>
                            <span className="flex justify-center ">Horas</span>
                            <span className="flex justify-center ">del Mes</span>
                        </div>
                        <div className="border-2 border-black w-[1px] h-full rounded-md"></div>
                        <div className="w-1/3 h-full flex flex-col justify-center items-center">
                            <span className="w-1/3  flex justify-center text-5xl ">10</span>
                            <span className="flex justify-center" >Meta</span>
                            <span className="flex justify-center" >del Mes</span>
                        </div>
                    </div>
                    <div className="w-1/3 h-full bg-white rounded-md shadow-sm shadow-black flex flex-col justify-center items-center gap-3 p-4"> 
                        <div className="w-full h-auto flex justify-center items-end">
                           <h3 className="  text-7xl">1500</h3>
                           <span className="text-4xl">Hrs</span> 
                        </div>
                        <span >Horas Acumuladas de Servicio</span>
                    </div>
                </div>
                <div className="w-full h-[60%] px-4 flex justify-center items-center gap-6">
                    <div className="w-1/3 h-full bg-white rounded-md shadow-sm shadow-black p-4 "> 
                        <h3 className="font-bold text-lg"> Total de Mantenimientos </h3>
                        <div className="flex flex-col gap-3">
                            <div className="flex flex-col gap-3">
                                <ProgressBar correctiveCount = { 20 } preventiveCount = { 20 } />
                                <div className="flex justify-start items-center gap-1">
                                    <div className="bg-green-500 w-[2px] h-[2px] p-4 rounded-md"></div>
                                    <h3>Mantenimientos Preventivos</h3>
                                </div>
                                <div className="flex justify-start items-center gap-1">
                                    <div className="bg-red-500 w-[2px] h-[2px] p-4 rounded-md"></div>
                                    <h3>Mantenimientos Correctivos</h3>
                                </div>
                            </div>
                            <h3 className="font-bold text-lg"> Total de Mantenimientos Preventivos </h3>
                            <div className="flex flex-col gap-3">
                                <ProgressBar correctiveCount = { 90 } preventiveCount = { 20 } />
                                <div className="flex justify-start items-center gap-1">
                                    <div className="bg-green-500 w-[2px] h-[2px] p-4 rounded-md"></div>
                                    <h3>Mantenimientos Preventivos Planeados</h3>
                                </div>
                                <div className="flex justify-start items-center gap-1">
                                    <div className="bg-red-500 w-[2px] h-[2px] p-4 rounded-md"></div>
                                    <h3>Mantenimientos Correctivos Ejecutados</h3>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="w-1/3 h-full bg-white rounded-md shadow-sm shadow-black p-4  flex flex-col justify-center items-start"> 
                        <h3 className="text-lg font-bold">Total de Fallas Registradas</h3>
                        <DonutChart/>
                    </div>
                    <div className="w-1/3  h-full bg-white  rounded-md shadow-sm shadow-black flex flex-col justify-start items-start p-4 gap-3 overflow-y-auto"> 
                        <span className="text-lg  font-bold">Responsables</span>
                        <SearchInput SearchFunction = { filterData } />
                        <div className="w-full h-auto px-4 py-2 flex flex-col justify-center items-center gap-3">
                            {
                                datosFiltrados ? (
                                    datosFiltrados.map( (data) => (
                                        <ResponsablesCounts
                                            taqresponsable          = { data.responsable_id }
                                            alt                     = {`Imagen del responsable: ${data.nombre}`}
                                            image                   = { data.Image }
                                            nombre                  = { data.nombre }
                                            trabajosAsiganados      = { 100 }
                                            trabajosRealizados      = { 200 }
                                            key                     = { data.responsable_id }
                                        />
                                    ))
                                ) : null
                            }
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-full h-[40%] p-4" >
                <div className="w-full h-full bg-white rounded-md shadow-sm shadow-black flex justify-center items-center">
                    <div className="w-1/3 h-full p-4 gap-3 flex flex-col justify-start items-center">
                        <div className="w-full h-auto px-4 py-2 bg-[#385449] hover:bg-[#CE1241] cursor-pointer hover:scale-105 transition ease-in-out duration-700 rounded-md shadow-md  shadow-black text-white font-bold">
                            Mantenimientos NPT
                        </div>
                    </div>
                    <div className="w-full h-full flex justify-center items-center justify-items-center">
                        <BarChart scores={data_chart} />
                    </div>
                </div>
            </div>
        </div>
    )}

export default PanelDashboard;
