import NewActMttoCorr from "@/Components/forms/Mantenimiento/MttoCorrectivo/FormNewActMttoCorr/FormActMttoCorr";
import { useState } from "react";

const  Actions = ({Responsables, onClose, Mantenimiento}) => {
    
    const [Acctions, setAcctions] = useState(true)
    const [AddActividad, setAddActividad] = useState(false)
    
    function ShowAcctions(){
        setAddActividad(false)
        setAcctions(true)
    }

    function ShowAddActividad(){
        if(AddActividad){
            ShowAcctions()
        }else{
            setAcctions(false)
            setAddActividad(true)
        }
    }

    const Acciones = [{
        "id"         : '113861',
        "label"      : "Añadir nueva actividad al mantenimiento",
        "estate"     : 1,
        "function"   : ShowAddActividad,
    }]

  return (
    <div className="min-w-[500px] w-auto h-auto flex flex-col justify-center items-center justify-items-center gap-3 ">
        {
            Acctions ? (
                <div className="max-w-[500px] px-4 py-2">
                    {
                        Acciones ? (
                            Acciones.map( (data) => (
                            <button onClick = { data.function } key = { data.id } className = {`  w-full mb-2 transition duration-700 ease-in-out h-auto text-white border-black border-2 font-bold  rounded-md px-4 py-2 ${ data.estate === 1 ? 'bg-green-600 hover:bg-green-800 hover:border-green-800' : 'bg-yellow-700 hover:bg-yellow-800 hover:border-yellow-800' }  hover:text-white hover:border-white   `} >
                                { data.label }
                            </button>
                            ))
                        ) : null
                    }
                </div>
            ) : null
        }
        {
            AddActividad ? (
                <NewActMttoCorr Responsables = { Responsables } onClose = { onClose } taqmttActivo = { Mantenimiento } />
            ) : null
        }
    </div> 
  )
}

export default Actions;
