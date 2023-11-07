import AddActivoEmpresa from "@/Components/forms/Empresa/Activo/FormNewActivo/FormNewActivo";
import EditEmpresa from "@/Components/forms/Empresa/FormEditEmpresa/FormEditEmpresa";
import AddHerramientaEmpresa from "@/Components/forms/Empresa/Herramienta/FormNewHerramienta/FormNewHerramientas";
import AddOt from "@/Components/forms/Empresa/OT/FormAddOM/FormAddOm";
import AddResponsableEmpresa from "@/Components/forms/Empresa/Responsable/FormNewResponsable/FormNewResponsables";
import { useState } from "react";

const  Actions = ({ Resposanble, Empresa, onClose, CategoriasActivo, CategoriasHerramientas, Cargos }) => {
    
    const [Acctions, setAcctions]              = useState(true)
    const [AddOT, setAddOT]                    = useState(false)
    const [AddHerramienta, setAddHerramienta]  = useState(false)
    const [AddActivo, setAddActivo]            = useState(false)
    const [AddResponsable, setAddResponsable]  = useState(false)
    const [EditInfo, setEditInfo]              = useState(false)
    
    function ShowAcctions(){
        setAddOT(false)
        setAddHerramienta(false)
        setAddActivo(false)
        setAddResponsable(false)
        setEditInfo(false)
        setAcctions(true)
    }

    function ShowOt(){
        if(AddOT){
            ShowAcctions()
        }else{
            setAddHerramienta(false)
            setAddActivo(false)
            setAddResponsable(false)
            setEditInfo(false)
            setAcctions(false)
            setAddOT(true)
        }
    }

    function ShowHerramienta(){
        if(AddHerramienta){
            ShowAcctions()
        }else{
            setAddActivo(false)
            setAddResponsable(false)
            setEditInfo(false)
            setAcctions(false)
            setAddOT(false)
            setAddHerramienta(true)
        }
    }

    function ShowActivo(){
        if(AddActivo){
            ShowAcctions()
        }else{
            setAddResponsable(false)
            setEditInfo(false)
            setAcctions(false)
            setAddOT(false)
            setAddHerramienta(false)
            setAddActivo(true)
        }
    }

    function ShowResponsable(){
        if(AddResponsable){
            ShowAcctions()
        }else{
            setEditInfo(false)
            setAcctions(false)
            setAddOT(false)
            setAddHerramienta(false)
            setAddActivo(false)
            setAddResponsable(true)
        }
    }

    function ShowEditInfo(){
        if(EditInfo){
            ShowAcctions()
        }else{
            setAcctions(false)
            setAddOT(false)
            setAddHerramienta(false)
            setAddActivo(false)
            setAddResponsable(false)
            setEditInfo(true)
        }
    }

    const Acciones = [{  
        "id"         : '5213',
        "label"      : "Agregar Nueva OT",
        "estate"     : 1,
        "function"   : ShowOt,
    },
    {
        "id"         : '118270',
        "label"      : "Agregar Nueva Herramienta",
        "estate"     : 1,
        "function"   : ShowHerramienta,
    },
    {
        "id"         : '116420',
        "label"      : "Agregar Nuevo Activo",
        "estate"     : 1,
        "function"   : ShowActivo,
    },
    {
        "id"         : '55708',
        "label"      : "Agregar Nuevo Responsable",
        "estate"     : 1,
        "function"   : ShowResponsable,
    },
    {
        "id"         : '113861',
        "label"      : "Editar Informacion",
        "estate"     : 2,
        "function"   : ShowEditInfo,
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
            AddOT ? (
                <AddOt Empresa = { Empresa } Responsables = { Resposanble } onClose = { onClose } />
            ) : null
        }
        {
            AddActivo ? (
                <AddActivoEmpresa Tipos = { CategoriasActivo }  onClose = { onClose } taqempresa = { Empresa[0].taqempresa }/>
            ) : null
        }
        {
            AddHerramienta ? (
                <AddHerramientaEmpresa Categoria = { CategoriasHerramientas } onClose = { onClose } taqempresa = { Empresa[0].taqempresa } />
            ) : null
        }{
            AddResponsable ? (
                <AddResponsableEmpresa Cargos = { Cargos } onClose = { onClose } />
            ) : null
        }
        {
            EditInfo ? (
                <EditEmpresa onClose = { onClose } Empresa = { Empresa } />
            ) : null
        }
    </div>
  )
}

export default Actions;
