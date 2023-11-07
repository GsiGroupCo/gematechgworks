import NewActMttoCorr from "@/Components/forms/Mantenimiento/MttoCorrectivo/FormNewActMttoCorr/FormActMttoCorr";
import { useForm } from "@inertiajs/react";
import { useState } from "react";

const  Actions = ({ onClose, Responsables, taqmttActivo }) => {
    
    const [Acctions, setAcctions] = useState(true)
    
    const [AddActividad, setAddActividad] = useState(false)    
    const [EndMtto, setEndMtto] = useState(false)

    const { data, post } = useForm()

    function ShowActions(){
        setAddActividad(false)
        setAcctions(true)
    }

    function ShowAddActivo(){
        if(AddActividad){
            ShowActions()
        }else{
            setAcctions(false)
            setAddActividad(true)
        }
    }

    function ShowEndMtto(taqmttActivo){
       data.taqmttActivo = taqmttActivo
       post('/mtto/corr/activo/end');
       onClose()
    }
    
    const Acciones = [{
        "id"         : '113861',
        "label"      : "Añadir nueva actividad al mantenimiento",
        "estate"     : 1,
        "function"   : ShowAddActivo,
    },{
        "id"         : '113862',
        "label"      : "Terminar Mtto",
        "estate"     : 3,
        "function"   : () => ShowEndMtto(taqmttActivo),
    }]

  return (
    <div className="min-w-[500px] w-auto h-auto flex flex-col justify-center items-center justify-items-center gap-3 ">
        {
            Acctions ? (
                <div className="max-w-[500px] px-4 py-2">
                    <button>
                        {
                            Acciones ? (
                                Acciones.map( (data) => (
                                <button onClick = { data.function } key = { data.id } className = {`  w-full mb-2 transition duration-700 ease-in-out h-auto text-white border-black border-2 font-bold  rounded-md px-4 py-2 ${ data.estate === 1 ? 'bg-green-600 hover:bg-green-800 hover:border-green-800' : data.estate === 2 ?  'bg-yellow-700 hover:bg-yellow-800 hover:border-yellow-800' : 'bg-red-700 hover:bg-red-800 hover:border-red-800'  }  hover:text-white hover:border-white   `} >
                                    { data.label }
                                </button>
                                ))
                            ) : null
                        }
                    </button>
                </div>
            ) : null
        }
        {
            AddActividad ? (
                <NewActMttoCorr 
                    taqmttActivo = { taqmttActivo }
                    Responsables = { Responsables }
                    onClose = { onClose }
                />
            ) : null
        }
    </div> 
  )
}

export default Actions;
