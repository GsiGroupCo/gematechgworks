 
import FormAddOM from "@/Components/forms/Activo/FormAddOM/FormAddOM";
import FormEditCaracteristica from "@/Components/forms/Caracteristicas/FormEditCaracteristica";
import CaracteristicaList from "@/Components/forms/Caracteristicas/ListCaracteristica/FormListCaracteristica";
import FormCertificacion from "@/Components/forms/Certificaciones/FormCertificacion";
import FormDocument from "@/Components/forms/Documentos/FormDocuments/FormDocuments";
import { useState } from "react"; 

const  Actions = ({ 
    onClose,
}) => {
    const [Acctions, setAcctions]                     = useState(true)
    const [AddDocument, setAddDocument]               = useState(false)
    const [AddCertificacion, setAddCertificacion]     = useState(false)
    const [AddMtto, setAddMtto]                       = useState(false)
    const [AddCaracteristica, setAddCaracteristica]   = useState(false)
    const [EditCaracteristica, setEditCaracteristica] = useState(false)
    const [EditComponenete, setEditComponenete]       = useState(false)
    const [cloneComponente, setcloneComponente]       = useState(false)
    const [ActivoAdd, setActivoAdd]                   = useState(false)
    const [MttoCorrectivo, setMttoCorrectivo]         = useState(false)
    const [MttoPreventivo, setMttoPreventivo]         = useState(false)
    
    function ShowAddDocument(){
        if(AddDocument){
            ShowAcctions();
        }else{
            setAddMtto(false)
            setAddCaracteristica(false)
            setEditCaracteristica(false)
            setMttoCorrectivo(false)
            setEditComponenete(false)
            setMttoPreventivo(false)
            setcloneComponente(false)
            setAddCertificacion(false)
            setAcctions(false)
            setAddDocument(true)
        }
    }

    function ShowAddCaracteristica(){
        if(AddCaracteristica){
            ShowAcctions();
        }else{
            setAddMtto(false)
            setEditCaracteristica(false)
            setAddCertificacion(false)
            setMttoPreventivo(false)
            setMttoCorrectivo(false)
            setEditComponenete(false)
            setAddDocument(false)
            setActivoAdd(false)
            setcloneComponente(false)
            setAcctions(false)
            setAddCaracteristica(true)
        }
    }

    function ShowEditCaracteristica(){
        if(EditCaracteristica){
            ShowAcctions();
        }else{
            setAddMtto(false)
            setEditComponenete(false)
            setAddDocument(false)
            setcloneComponente(false)
            setAddCertificacion(false)
            setActivoAdd(false)
            setAddCaracteristica(false)
            setMttoPreventivo(false)
            setMttoCorrectivo(false)
            setAcctions(false)
            setEditCaracteristica(true)
        }
    }

    function ShowEditComponenete(){
        if(EditActivo){
            ShowAcctions();
        }else{
            setAddMtto(false)
            setAddDocument(false)
            setcloneComponente(false)
            setAddCertificacion(false)
            setAddCaracteristica(false)
            setActivoAdd(false)
            setMttoCorrectivo(false)
            setMttoPreventivo(false)
            setEditCaracteristica(false)
            setAcctions(false)
            setEditComponenete(true)
        }
    }

    function ShowcloneComponente(){
        if(cloneComponente){
            ShowAcctions();
        }else{
            setAddMtto(false)
            setAddDocument(false)
            setAddCaracteristica(false)
            setAddCertificacion(false)
            setActivoAdd(false)
            setMttoCorrectivo(false)
            setMttoPreventivo(false)
            setEditCaracteristica(false)
            setAcctions(false)
            setEditComponenete(false)
            setcloneComponente(true)
        }
    }

    function ShowAddCertifiacion(){
        if(AddCertificacion){
            ShowAcctions();
        }else{
            setAddMtto(false)
            setAddDocument(false)
            setAddCaracteristica(false)
            setEditCaracteristica(false)
            setAcctions(false)
            setActivoAdd(false)
            setEditComponenete(false)
            setMttoPreventivo(false)
            setMttoCorrectivo(false)
            setcloneComponente(false)
            setAddCertificacion(true)
        }
    }

    function ShowCorrectivos(){
        if(MttoCorrectivo){
            ShowAcctions();
        }else{
            setAddMtto(false)
            setAddDocument(false)
            setAddCaracteristica(false)
            setEditCaracteristica(false)
            setMttoPreventivo(false)
            setAcctions(false)
            setActivoAdd(false)
            setEditComponenete(false)
            setcloneComponente(false)
            setAddCertificacion(false)
            setMttoCorrectivo(true)
        }
    }

    function ShowPreventivos(){
        if(MttoPreventivo){
            ShowAcctions();
        }else{
            setAddMtto(false)
            setAddDocument(false)
            setAddCaracteristica(false)
            setEditCaracteristica(false)
            setAcctions(false)
            setEditComponenete(false)
            setActivoAdd(false)
            setcloneComponente(false)
            setAddCertificacion(false)
            setMttoCorrectivo(false)
            setMttoPreventivo(true)
        }
    }

    function ShowAcctions(){
        setAddDocument(false)
        setAddMtto(false)
        setMttoPreventivo(false)
        setAddCaracteristica(false)
        setMttoCorrectivo(false)
        setEditCaracteristica(false)
        setEditComponenete(false)
        setAddCertificacion(false)
        setActivoAdd(false)
        setcloneComponente(false)
        setActivoAdd(false)
        setAcctions(true)
    }

    function ShowActivoAdd(){
        if(ActivoAdd){
            ShowAcctions();
        }else{
            setAddMtto(false)
            setAddDocument(false)
            setAddCaracteristica(false)
            setEditCaracteristica(false)
            setAcctions(false)
            setEditComponenete(false)
            setcloneComponente(false)
            setAddCertificacion(false)
            setMttoCorrectivo(false)
            setMttoPreventivo(false)
            setActivoAdd(true)
        }
    }

    const Acciones = [
    {
        "id"         : "45545",
        "label"      : "Agregar Documento",
        "estate"     : 1,
        "function"   : ShowAddDocument,
    },{
        "id"         : "31806",
        "label"      : "Agregar Certificacion",
        "estate"     : 1,
        "function"   : ShowAddCertifiacion,
    },{
        "id"         : "47228",
        "label"      : "Agregar Mantenimiento Preventivo",
        "estate"     : 1,
        "function"   : ShowPreventivos,
    },{
        "id"         : "649086",
        "label"      : "Agregar Mantenimiento Correctivo",
        "estate"     : 1,
        "function"   : ShowCorrectivos,
    },{
        "id"         : "571701123126",
        "label"      : "Asignar a Activo",
        "estate"     : 1,
        "function"   : ShowActivoAdd,
    },{
        "id"         : "181498950",
        "label"      : "Agregar Caracteristica",
        "estate"     : 1,
        "function"   : ShowAddCaracteristica,
    },{
        "id"         : "296215696",
        "label"      : "Editar Caracteristica",
        "estate"     : 2,
        "function"   : ShowEditCaracteristica,
    },{
        "id"         : "1213522726",
        "label"      : "Editar Componente",
        "estate"     : 2,
        "function"   : ShowEditComponenete,
    },{
        "id"         : "571701126",
        "label"      : "Clonar Componente",
        "estate"     : 2,
        "function"   : ShowcloneComponente,
    }]

    return (
        <div className=" w-auto h-auto flex flex-col justify-center items-center justify-items-center gap-3 ">
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
                AddDocument ? (
                    <FormDocument 
                        Taq      = { Componente[0].taqComponente }
                        route    = {`/document/componente/`}
                        onClose  = { onClose } 
                    />
                ) : null
            }
            {
                AddCertificacion ? (
                    <FormCertificacion
                        Taq      = { Componente[0].taqComponente }
                        route    = {`/certificacion/componente/store`}
                        onClose  = { onClose }
                    />
                ) : null
            }
            {
                AddMtto ? (
                    <FormAddOM
                        Oms = { Oms }
                        TaqComponente = { Componente[0].taqComponente }
                        route={`/asignacion/om`}
                    />
                ) : null
            }
            {
                AddCaracteristica ? (
                    <FormEditCaracteristica
                        Taq      = { Componente[0].taqComponente }
                        route    = {`/certificacion/componente/store`}
                        onClose  = { onClose }
                    />
                ) : null
            }
            {
                EditCaracteristica ? (
                    <CaracteristicaList
                        route = {`caracteristica/componente/delete`}
                        Caracteristicas = { Caracteristicas }
                        onClose = { onClose }
                    />
                ) : null
            }
            {
                EditComponenete ? (
                    <FormEditandoComponenete
                        Activo  = { Activo }
                        onClose = { onClose }
                    />
                ) : null
            }
            {
                cloneComponente ? (
                    <FormcloneComponente
                         Tipo = { Tipo }
                         Activo  = { Activo }
                         onClose = { onClose }
                         Empresa = { Empresas }
                    />
                ) : null
            } 
            {
                MttoCorrectivo ? (
                    <FormMttoCorrectivo 
                        taqActivo = { Activo[0].taqActivos }
                        Responsables = { Responsables }
                        Activos = { Activos } 
                        Areas = { Areas } 
                        onClose = { onClose }
                    />
                ) : null
            }
            {
                MttoPreventivo ? (
                    <FormMttoPreventivo 
                        Mantenimiento = { Mantenimientos }
                        taqActivo = { Activo[0].taqActivos }
                        Responsables = { Responsables }
                        Activos = { Activos } 
                        Areas = { Areas } 
                        onClose = { onClose }
                    />
                ) : null
            }
            {
                ActivoAdd ? (
                    <FormAddComponente Componentes = { Componentes }  onClose = { onClose } taqActivos = { Activo[0].taqActivos } />
                ) : null
            }
        </div>
    )
}

export default Actions;
