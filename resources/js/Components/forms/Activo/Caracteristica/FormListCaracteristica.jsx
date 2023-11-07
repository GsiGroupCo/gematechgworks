import FormPanelEditCaracteristica from "@/Components/forms/Activo/Caracteristica/FormEditCaracteristica/FormEditCaracteristica";
import { router, useForm } from "@inertiajs/react";
import { useState } from "react";

const CaracteristicaList = ({ onClose, Caracteristicas }) => {

  const { get } = useForm()

  const [CaracteristicasItem, setCaracteristicasItem] = useState();
  const [DefaultPanel, setDefaultPanel] = useState(true);
  const [EditPanel, setEditPanel] = useState(false);
  const [Modal, setModal] = useState(false);

  function ShowEditPanel(){
    if(DefaultPanel){
      setDefaultPanel(false)
      setEditPanel(true)
    }else{
      setDefaultPanel(false)
      setEditPanel(true)
    }
  }

  function functionDefineCaracterID(data){
    setCaracteristicasItem(data);
  }

  return (
    <div className="w-full h-auto flex flex-col justify-start items-center px-4 py-2 gap-2">
      {
        DefaultPanel ? (
          Caracteristicas ? (
            Caracteristicas.map( (data) => (
              <div className="px-4 py-2 w-full h-auto border border-black rounded-md text-black flex justify-between items-center gap-3">
                 <div className="w-1/2 overflow-y-auto">
                  { data.nombre } : {data.valor}
                 </div>
                 <div className="w-auto flex justify-center items-center gap-3">
                  <div onClick = { () => { 
                    ShowEditPanel()
                    functionDefineCaracterID(data)
                  } } className="w-auto h-auto px-4 py-2 bg-yellow-500 rounded-md border-black hover:border-white border cursor-pointer hover:bg-yellow-800 text-white font-semibold">
                    Editar
                  </div>
                  <div onClick = { () => {
                    get(`/caracteristica/delete/${data.taqActivos}/${data.taqotro}/`)
                    onClose()
                  } } className="w-auto h-auto px-4 py-2 bg-red-500 rounded-md border-black hover:border-white border cursor-pointer hover:bg-red-800 text-white font-semibold">
                    Eliminar
                  </div>
                 </div>
              </div>
              ))
          ) : null
        ) : null
      }
      {
        EditPanel ? (
          <FormPanelEditCaracteristica onClose = { onClose } Caracteristicas = { CaracteristicasItem } />
        ) : null
      }
    </div>
  )
}

export default CaracteristicaList;