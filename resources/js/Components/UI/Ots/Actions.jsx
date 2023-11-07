//Componentes de React

import EditOt from "@/Components/forms/Oms/FormEditOm/FormEditOM";
import FormDocumentOt from "@/Components/forms/Oms/Documentos/FormDocuments/FormDocuments";
import FormAddActivo from "@/Components/forms/Oms/FormAddActivo/FormAddActivo";
import NewWork from "@/Components/forms/Oms/FormNewTrabajo/FormNewTrabajo";
import { useForm } from "@inertiajs/react";
import { useState } from "react";

const  Actions = ({ Activos, onClose,taqom, Responsables, ResponsablesOT, Empresa, Ot }) => { 

    const [Acctions, setAcctions] = useState(true)
    const [AddActivo, setAddActivo]   = useState(false) 
    const [AddTrabajo, setAddTrabajo]   = useState(false)
    const [EditOT, setEditOT]   = useState(false) 
    const [AddDoc, setAddDoc]   = useState(false)

    const { data, patch } = useForm()

    function ShowAcctions(){ 
        setAddActivo(false)
        setAddTrabajo(false)
        setAddDoc(false)
        setEditOT(false)
        setAcctions(true)
    }

    function ShowAddAcivo() {
        if(AddActivo){
            ShowAcctions()
        }else{
            setAddTrabajo(false)
            setAcctions(false)
            setEditOT(false)
            setAddDoc(false)
            setAddActivo(true)
        }
    }


    function ShowAddTrabajo() {
        if(AddTrabajo){
            ShowAcctions()
        }else{
            setAcctions(false)
            setAddActivo(false)
            setEditOT(false)
            setAddDoc(false)
            setAddTrabajo(true)
        }
    }

    function ShowEditOT() {
        if(EditOT){
            ShowAcctions()
        }else{
            setAcctions(false)
            setAddActivo(false)
            setAddTrabajo(false)
            setAddDoc(false)
            setEditOT(true)
        }
    }

    function ShowAddDoc() {
        if(AddDoc){
            ShowAcctions()
        }else{
            setAcctions(false)
            setAddActivo(false)
            setAddTrabajo(false)
            setEditOT(false)
            setAddDoc(true)
        }
    }

    function End(taqot){
        data.taqot =taqom
        patch('/oms/close')
        onClose()
    }
    
    const Acciones = [{  
        "id"         : '169633',
        "label"      : "Agregar Activo",
        "estate"     : 1,
        "function"   : ShowAddAcivo,
    },{
        "id"         : '227721235',
        "label"      : "Agregar Trabajo",
        "estate"     : 1,
        "function"   : ShowAddTrabajo,
    },{
        "id"         : '227721231235',
        "label"      : "Agregar Documento",
        "estate"     : 1,
        "function"   : ShowAddDoc,
    },{
        "id"         : '227725123',
        "label"      : "Editar OT",
        "estate"     : 2,
        "function"   : ShowEditOT,
    },{
        "id"         : '22772435',
        "label"      : "Finalizar Orden de Trabajo",
        "estate"     : 3,
        "function"   : () => End(taqot),
    }]

  return (
    <div className="w-full h-auto flex flex-col justify-center items-center justify-items-center gap-3 ">
        {
            Acctions ? (
                <div className="max-w-[500px] px-4 py-2">
                    {
                        Acciones ? (
                            Acciones.map( (data) => (
                                <button onClick = { data.function } key = { data.id } className = {`  w-full mb-2 transition duration-700 ease-in-out h-auto text-white border-black border-2 font-bold  rounded-md px-4 py-2 ${ data.estate === 1 ? 'bg-green-500 hover:bg-green-800 hover:border-white' : data.estate === 2 ? 'bg-yellow-500 hover:bg-yellow-800 hover:hover:border-white ' : 'bg-red-500 hover:bg-red-800 hover:border-white' }  hover:text-white hover:border-white   `} >
                                    { data.label }
                                </button>
                            ))
                        ) : null
                    }
                </div>
            ) : null
        }
        {
            AddActivo ? (
                <FormAddActivo Activos = { Activos } onClose = { onClose }taqom = {taqom } />
            ) : null
        }
        {
            AddTrabajo ? (
                <NewWork Responsables = { Responsables }taqom = {taqom } onClose = { onClose }/>
            ) : null
        }
        {
            AddDoc ? (
                <FormDocumentOt onClose = { onClose }taqom = {taqom } />
            ) : null 
        }
        {
            EditOT ? (
                <EditOt onClose = { onClose } Responsables = { ResponsablesOT } Empresa = { Empresa } Ot = { Ot } />
            ) : null
        }
    </div>
  )
}

export default Actions;
