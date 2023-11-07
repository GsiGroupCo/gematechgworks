
import FormDocument from "@/Components/forms/Responsables/FormDocuments/FormDocuments";
import EditResponsable from "@/Components/forms/Responsables/FormEditResponsable/FormEditResponsables";
import { useForm } from "@inertiajs/react";
import { useState } from "react";

const  Actions = ({ onClose, taqresponsable, Responsable, Cargos }) => {

    const [Acctions, setAcctions] = useState(true)
    const [PanelDocumentos, setPanelDocumentos] = useState(false)
    const [PanelEdit, setPanelEdit] = useState(false)  
       
    const { post, data } = useForm()

    function showDocumentos(){
        if(PanelDocumentos){
            setPanelDocumentos(false)
            setPanelEdit(false)
            setAcctions(true)
        }else{
            setPanelEdit(false)
            setAcctions(false)
            setPanelDocumentos(true)
        }
    }

    function ShowEdit(){
        if(PanelEdit){
            setPanelDocumentos(false)
            setPanelEdit(false)
            setAcctions(true)
        }else{
            setPanelDocumentos(false)
            setAcctions(false)
            setPanelEdit(true)
        }
    }

    function ascend(taqresponsable){
        data.taqresponsable = taqresponsable,
        post(`/responsables/ascend`)
        onClose()
    }


    const Acciones = [{  
        "id"         : '839139',
        "label"      : "Adjuntar Documentos",
        "estate"     : 1,
        "function"   : showDocumentos,
    },{  
        "id"         : '127562',
        "label"      : "Editar Informacion",
        "estate"     : 2,
        "function"   : ShowEdit,
    },{  
        "id"         : '839156539',
        "label"      : "Cambiar estado de responsable",
        "estate"     : 3,
        "function"   : () => ascend(taqresponsable),
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
                                <button onClick = { data.function } key = { data.id } className = {`  w-full mb-2 transition duration-700 ease-in-out h-auto text-white border-black border-2 font-bold  rounded-md px-4 py-2 ${ data.estate === 1 ? 'bg-green-600 hover:bg-green-800 hover:border-green-800' : data.estate === 2 ? 'bg-yellow-500 hover:bg-yellow-800 hover:border-yellow-800' : 'bg-red-500 hover:bg-red-800 hover:border-red-800' }  hover:text-white hover:border-white   `} >
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
        {
            PanelEdit ? (
                <EditResponsable Cargos = { Cargos } Responsable = { Responsable } onClose = { () => onClose() } />
            ) : null
        }
    </div>
  )
}

export default Actions;
