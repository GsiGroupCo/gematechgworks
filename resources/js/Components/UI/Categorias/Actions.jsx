
import FormDocument from "@/Components/forms/Documentos/FormDocuments/FormDocuments";
import { FC, useState } from "react";

const  Actions = ({ onClose, taqresponsable }) => {

    const [Acctions, setAcctions] = useState(true)
    const [PanelDocumentos, setPanelDocumentos] = useState(false) 
    const [PanelHerramientas, setPanelHerramientas] = useState(false)   
    const [PanelEdit, setPanelEdit] = useState(false)     
    
    function showDocumentos(){
        if(PanelDocumentos){
            setPanelDocumentos(false)
            setPanelHerramientas(false)
            setPanelEdit(false)
            setAcctions(true)
        }else{
            setPanelHerramientas(false)
            setPanelEdit(false)
            setAcctions(false)
            setPanelDocumentos(true)
        }
    }

    function ShowEdit(){
        if(PanelEdit){
            setPanelDocumentos(false)
            setPanelHerramientas(false)
            setPanelEdit(false)
            setAcctions(true)
        }else{
            setPanelDocumentos(false)
            setPanelHerramientas(false)
            setAcctions(false)
            setPanelEdit(true)
        }
    }

    function ShowHerramientas(){
        if(PanelHerramientas){
            setPanelDocumentos(false)
            setPanelHerramientas(false)
            setPanelEdit(false)
            setAcctions(true)
        }else{
            setPanelDocumentos(false)
            setPanelEdit(false)
            setAcctions(false)
            setPanelHerramientas(true)
        }
    }

    const Acciones = [{  
        "id"         : '127562',
        "label"      : "Editar ",
        "estate"     : 2,
        "function"   : ShowEdit,
    },{  
        "id"         : '839139',
        "label"      : "Adjuntar Documentos",
        "estate"     : 1,
        "function"   : showDocumentos,
    },{
        "id"         : '534072',
        "label"      : "Solicitar Herramienta",
        "estate"     : 1,
        "function"   : ShowHerramientas,
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
                                <button onClick = { data.function } key = { data.id } className = {`  w-full mb-2 transition duration-700 ease-in-out h-auto text-white border-black border-2 font-bold  rounded-md px-4 py-2 ${ data.estate === 1 ? 'bg-green-600 hover:bg-green-800 hover:border-green-800' : 'bg-yellow-500 hover:bg-yellow-800 hover:border-yellow-800' }  hover:text-white hover:border-white   `} >
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
            PanelDocumentos ? (
                <FormDocument onClose = { () => onClose() } taqresponsable = { taqresponsable } key = { taqresponsable } />
            ) : null
        }

    </div>
  )
}

export default Actions;
