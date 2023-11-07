import NewActMttoPrev from "@/Components/forms/Mantenimiento/MttoPreventivo/Actividades/FormNewActividad/FormNewActividad";
import { useState } from "react";
import Panel_general from "../../Panel_general";
import EditActMttoPrev from "@/Components/forms/Mantenimiento/MttoPreventivo/Actividades/FormEditActividad/FormEditActividad";
import { useForm } from "@inertiajs/react";

const  Actions = ({ Responsables, onClose, taqmttActivo, Actividades, filterData }) => {
    
    const [Acctions, setAcctions] = useState(true)
    const [AddActividad, setAddActividad] = useState(false)
    const [ListActividades, setListActividades] = useState(false)
    const [ShowEditPanel, setShowEditPanel] = useState(false)
    const [ActividadSelected, setActividadSelected] = useState({
        actividad      :'',
        frecuencia     :'',
        taqresponsable :'',
        fecha          :'',
        taqActPrevact  :'',
        taqmttActivo   :''
    })
    
    const { post, data } = useForm()

    function ShowAcctions(){
        setAddActividad(false)
        setListActividades(false)
    }

    function ShowActividades(){
        if(AddActividad){
            ShowAcctions()
        }else{
            setListActividades(false)
            setAcctions(false)
            setAddActividad(true)
        }
    }

    function ShowListActividades(){
        if(ListActividades){
            ShowAcctions()
        }else{
            setAddActividad(false)
            setAcctions(false)
            setListActividades(true)
        }
    }

    function SelectedActToDelete(dataActividad){
        data.taqActPrevact = dataActividad.taqActPrevact
        data.taqmttActivo  = dataActividad.taqmttActivo
        post('/act/prev/activo/delete')
    }

    function SelectedAct(data){
        setShowEditPanel(true)
        setActividadSelected({
            actividad      :data.nombre,
            frecuencia     :data.frecuencia,
            taqresponsable :data.taqresponsable,
            fecha          :data.fecha,
            taqActPrevact  :data.taqActPrevact,
            taqmttActivo   :data.taqmttActivo
        })
    }

    const Acciones = [{
        "id"         : '113861',
        "label"      : "Añadir nueva actividad ",
        "estate"     : 1,
        "function"   : ShowActividades,
    },{
        "id"         : '1132861',
        "label"      : "Editar actividades ",
        "estate"     : 2,
        "function"   : ShowListActividades,
    }]

  return (
    <div className="min-w-[500px] w-auto max-h-[800px] h-auto flex flex-col justify-center items-center justify-items-center gap-3 ">
        {
            Acctions ? (
                <div className="max-w-[500px] px-4 py-2">
                    <button>
                        {
                            Acciones ? (
                                Acciones.map( (data) => (
                                <button onClick = { data.function } key = { data.id } className = {`  w-full mb-2 transition duration-700 ease-in-out h-auto text-white border-black border-2 font-bold  rounded-md px-4 py-2 ${ data.estate === 1 ? 'bg-green-600 hover:bg-green-800 hover:border-green-800' : 'bg-yellow-700 hover:bg-yellow-800 hover:border-yellow-800' }  hover:text-white hover:border-white   `} >
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
            ListActividades ? (
                ShowEditPanel ? (
                    <EditActMttoPrev Responsables = { Responsables } onClose = { () => ShowEditPanel(false) } Actividad = { ActividadSelected } />
                ) : (
                    <Panel_general FunctionfilterData={filterData} key={`4654513`}>
                        {
                            Actividades ? (
                                Actividades.map((data) => (
                                    <div className="w-full h-auto px-4 py-2 border border-black bg-white hover:bg-gray-800 hover:text-white curso flex justify-between">
                                        <div className="w-[60%]  h-full flex justify-start items-center ">
                                            { data.nombre }
                                        </div>
                                        <div className="w-[40%] flex gap-3  items-center justify-end">
                                            <div onClick={ () => SelectedAct(data) } className="w-auto max-h-[35px] h-auto px-4 py-1 bg-yellow-500 hover:bg-yellow-800 flex justify-center items-center text-black hover:text-white font-semibold rounded-md shadow shadow-black cursor-pointer transition duration-700 ease-in-out">
                                                Editar
                                            </div>
                                            <div onClick={ () => SelectedActToDelete(data) } className="w-auto max-h-[35px] h-auto px-4 py-1 bg-red-500 hover:bg-red-800 flex justify-center items-center text-black hover:text-white font-semibold rounded-md shadow shadow-black cursor-pointer transition duration-700 ease-in-out">
                                                Eliminar
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : null
                        }
                    </Panel_general>
                ) 
            ) : null
        }
        {
            AddActividad ? (
                <NewActMttoPrev Responsables={Responsables} onClose={onClose} taqmttActivo = { taqmttActivo }/>
            ) : null
        }
    </div> 
  )
}

export default Actions;
