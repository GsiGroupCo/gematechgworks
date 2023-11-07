import EditWork from "@/Components/forms/Oms/FormEditTrabajo/FormEditTrabajo"
import { useForm } from "@inertiajs/react"
import { useState } from "react"

const  ActionsWork = ({ onClose, Responsables, Trabajo }) => { 
 
    const [Acctions, setAcctions]           = useState(true) 
    const [EditWorkState, setEditWorkState] = useState(false)  
     
    const { data, post } = useForm() 

    function ShowAcctions(){  
        setEditWorkState(false) 
        setAcctions(true)
    }  
    function ShowEditWork() {
        if(EditWorkState){
            ShowAcctions()
        }else{
            setAcctions(false) 
            setEditWorkState(true)
        }
    }  

    function DeleteWork() {
        data.taqtrabajos = Trabajo.taqtrabajo 
        post(`/trabajo/delete`)
        onClose()
    }

    function FinWork() {
        data.taqtrabajos = Trabajo.taqtrabajos
        data.taqot = Trabajo.taqot 
        post(`/trabajo/finish`)
        onClose()
    }

    const Acciones = [{
        "id"         : '2123125',
        "label"      : "Finalizar Trabajo",
        "estate"     : 1,
        "function"   : FinWork,
    },{  
        "id"         : '16963321',
        "label"      : "Editar Trabajo",
        "estate"     : 2,
        "function"   : ShowEditWork,
    },{
        "id"         : '22772123125',
        "label"      : "Eliminar Trabajo",
        "estate"     : 3,
        "function"   : DeleteWork,
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
            EditWorkState ? ( 
                <EditWork Responsables = { Responsables } onClose = { onClose } Trabajo = { Trabajo } />
            ) : null
        }
    </div>
  )
}

export default ActionsWork;
