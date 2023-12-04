import NewActividadHerramienta from "@/Components/forms/Herramientas/Actividad/FormNewActividad/FormNewActividad";
import FormCaracteristica from "@/Components/forms/Herramientas/Caracteristica/FormCaracteristica/FormCaracteristica";
import CaracteristicaList from "@/Components/forms/Herramientas/Caracteristica/FormListCaracteristica";
import FormDocument from "@/Components/forms/Herramientas/Documentos/FormDocuments/FormDocuments";
import FormCloneHerramienta from "@/Components/forms/Herramientas/FormCloneHerramienta";
import FormEditandoHerramienta from "@/Components/forms/Herramientas/FormEditHerramienta/FormEditHerramienta";
import { useState } from "react";

const  Actions = ({ Responsables, onClose, Caracteristicas, Herramienta, Categorias, Empresas }) => {
    
    const [Acctions, setAcctions]                      = useState(true)
    const [Actividad, setActividad]                    = useState(false)
    const [Documentos, setDocumentos]                  = useState(false)
    const [MttoPrev, setMttoPrev]                      = useState(false)
    const [MttoCorr, setMttoCorr]                      = useState(false)
    const [AddCaracteristica, setAddCaracteristica]    = useState(false)
    const [EditCaracteristica, setEditCaracteristica]  = useState(false)
    const [EditHerramienta, setEditHerramienta]        = useState(false)
    const [CloneHerramienta, setCloneHerramienta]      = useState(false)

    function ShowAccions(){
        setActividad(false)
        setMttoPrev(false)
        setDocumentos(false)
        setMttoCorr(false)
        setAddCaracteristica(false)
        setEditCaracteristica(false)
        setEditHerramienta(false)
        setCloneHerramienta(false)
        setAcctions(true)
    }

    function ShowActividad() {
        if(Actividad){
            ShowAccions()
        }else{
            setAcctions(false)
            setMttoPrev(false)
            setActividad(true)
            setDocumentos(false)
            setAddCaracteristica(false)
            setEditCaracteristica(false)
            setEditHerramienta(false)
            setCloneHerramienta(false)
        }
    }

    function ShowMttoPrev() {
        if(MttoPrev){
            ShowAccions()
        }else{
            setAcctions(false)
            setActividad(false)
            setMttoPrev(true)
            setMttoCorr(false)
            setDocumentos(false)
            setAddCaracteristica(false)
            setEditCaracteristica(false)
            setEditHerramienta(false)
            setCloneHerramienta(false)
        }
    }

    function ShowMttoCorr() {
        if(MttoCorr){
            ShowAccions()
        }else{
            setAcctions(false)
            setActividad(false)
            setDocumentos(false)
            setMttoPrev(false)
            setAddCaracteristica(false)
            setEditCaracteristica(false)
            setEditHerramienta(false)
            setCloneHerramienta(false)
            setMttoCorr(true)
        }
    }

    function ShowAddCaracteristica() {
        if(AddCaracteristica){
            ShowAccions()
        }else{
            setAcctions(false)
            setActividad(false)
            setDocumentos(false)
            setMttoPrev(false)
            setEditCaracteristica(false)
            setEditHerramienta(false)
            setCloneHerramienta(false)
            setMttoCorr(false)
            setAddCaracteristica(true)
        }
    }

    function ShowEditCaracteristica() {
        if(EditCaracteristica){
            ShowAccions()
        }else{
            setAcctions(false)
            setActividad(false)
            setDocumentos(false)
            setMttoPrev(false)
            setEditHerramienta(false)
            setCloneHerramienta(false)
            setMttoCorr(false)
            setAddCaracteristica(false)
            setEditCaracteristica(true)
        }
    }

    function ShowEditHerramienta() {
        if(EditHerramienta){
            ShowAccions()
        }else{
            setAcctions(false)
            setActividad(false)
            setMttoPrev(false)
            setDocumentos(false)
            setCloneHerramienta(false)
            setMttoCorr(false)
            setAddCaracteristica(false)
            setEditCaracteristica(false)
            setEditHerramienta(true)
        }
    }

    function ShowCloneHerramienta() {
        if(CloneHerramienta){
            ShowAccions()
        }else{
            setAcctions(false)
            setActividad(false)
            setDocumentos(false)
            setMttoPrev(false)
            setMttoCorr(false)
            setAddCaracteristica(false)
            setEditCaracteristica(false)
            setEditHerramienta(false)
            setCloneHerramienta(true)
        }
    }

    function ShowDocumentos() {
        if(Documentos){
            ShowAccions()
        }else{
            setAcctions(false)
            setActividad(false)
            setMttoPrev(false)
            setMttoCorr(false)
            setAddCaracteristica(false)
            setEditCaracteristica(false)
            setEditHerramienta(false)
            setCloneHerramienta(false)
            setDocumentos(true)
        }
    }
      
    const Acciones = [{  
        "id"         : `131767263`,
        "label"      : "Agregar Actividad",
        "estate"     : 1,
        "function"   : ShowActividad,
    },{  
        "id"         : `13121767263`,
        "label"      : "Agregar Documentos",
        "estate"     : 1,
        "function"   : ShowDocumentos,
    },{  
        "id"         : `448759839`,
        "label"      : "Agregar Mantenimiento Preventivo",
        "estate"     : 1,
        "function"   : ShowMttoPrev,
    },{  
        "id"         : `520048480`,
        "label"      : "Agregar Mantenimiento Correctivo",
        "estate"     : 1,
        "function"   : ShowMttoCorr,
    },{
        "id"         : `806394485`,
        "label"      : "Agregar Caracteristica",
        "estate"     : 1,
        "function"   : ShowAddCaracteristica,
    },{
        "id"         : `24563110`,
        "label"      : "Editar Caracteristica",
        "estate"     : 2,
        "function"   : ShowEditCaracteristica,
    },{
        "id"         : `728802616`,
        "label"      : "Editar Herramienta",
        "estate"     : 2,
        "function"   : ShowEditHerramienta,
    },{
        "id"         : `649992479`,
        "label"      : "Clonar Herramienta",
        "estate"     : 2,
        "function"   : ShowCloneHerramienta,
    }]

  return (
    <div className="min-w-[500px] w-auto h-auto flex flex-col justify-center items-center justify-items-center gap-3 ">
        {
            Acctions ? (
                <div className="max-w-[500px] px-4 py-2">
                    {
                        Acciones ? (
                            Acciones.map( (data) => (
                            <button onClick = { data.function } key = { data.id } className = {`  w-full mb-2 transition duration-700 ease-in-out h-auto text-black hover:text-white border-black border-2 font-bold  rounded-md px-4 py-2 ${ data.estate === 1 ? 'bg-green-600 hover:bg-green-500 hover:border-green-800' : 'bg-yellow-500 hover:bg-yellow-800 hover:border-yellow-800' }  hover:text-white hover:border-white   `} >
                                { data.label }
                            </button>
                            ))
                        ) : null
                    }
                </div>
            ) : null
        }
        {
            Actividad ? (
                <NewActividadHerramienta Responsables = { Responsables } onClose = { onClose } taqHer = { Herramienta[0].taqHer } />
            ) : null
        }
        {
            Documentos ? ( 
                <FormDocument onClose = { onClose } taqHer = { Herramienta[0].taqHer } />
            ) : null
        }
        {
            EditCaracteristica ? (
                <CaracteristicaList Caracteristicas = { Caracteristicas }  onClose = { onClose } />
            ) : null
        }
        {
            AddCaracteristica ? (
                <FormCaracteristica taqHer = { Herramienta[0].taqHer }  onClose = { onClose } />
            ) : null
        }
        {
            EditHerramienta ? (
                <FormEditandoHerramienta Herramienta = { Herramienta } onClose = { onClose } Categorias = { Categorias } Empresas = { Empresas } />
            ) : null
        }
        {
            CloneHerramienta ? (
                <FormCloneHerramienta Categoria = { Categorias } Empresa = { Empresas } Herramienta = { Herramienta } onClose = { onClose } />
            ) : null
        }
    </div>
  )
}

export default Actions;
