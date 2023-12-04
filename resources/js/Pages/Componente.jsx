import PanelCertificaciones from '@/Components/Panels/Activos/Certificaciones/P_certificaciones' 
import Modal from '@/Components/Panels/Modals/Modal'
import ButtonMenu from '@/Components/UI/Activo/ButtonMenu'
import Caracteristica_target from '@/Components/UI/Activo/Caracteristica_target'
import Appbar from '@/Components/UI/Componente/Appbar'
import Panel_general from '@/Components/UI/Panel_general'
import React, { useEffect, useState } from 'react'
import { Toaster, toast } from 'sonner'

export default function Componente({ ComponentesData, status, error }) {
   
  useEffect(() => {
    if(status){
      toast.success(status)
    }
  }, [status]);

  useEffect(() => {
    if(error){
      toast.error(error)
    }
  }, [error]);

  const [Default, setDefault]                                               = useState(true)
  const [DocumentosPanel,           setDocumentosPanel]                     = useState(false)
  const [DocumentosPanelEliminados, setDocumentosPanelEliminados]           = useState(false)
  const [CertificacionesPanel,      setCertificacionesPanel]                = useState(false)
  const [CertificacionesEliminadosPanel,setCertificacionesEliminadosPanel]  = useState(false)
  const [HistorialPanel,            setHistorialPanel]                      = useState(false)
  const [MttoCorrectivos,           setMttoCorrectivos]                     = useState(false)
  const [MttoPreventivos,           setMttoPreventivos]                     = useState(false)

  const [ModalActions, setModalActions] = useState(false)
  const [ModalFormats, setModalFormats] = useState(false)
  const [ModalDeleteDoc, setModalDeleteDoc] = useState(false)

  function ShowDefault(){
    setDocumentosPanel(false)
    setCertificacionesPanel(false)
    setHistorialPanel(false)
    setMttoCorrectivos(false)
    setMttoPreventivos(false)
    setDocumentosPanelEliminados(false)
    setCertificacionesEliminadosPanel(false)
    setDefault(true)
  }

  function ShowActividades(){
    if(HistorialPanel){
      ShowDefault()
    }else{
      setDefault(false)
      setDocumentosPanel(false)
      setCertificacionesPanel(false)
      setMttoCorrectivos(false)
      setDocumentosPanelEliminados(false)
      setMttoPreventivos(false)
      setCertificacionesEliminadosPanel(false)
      setHistorialPanel(true)
    }
  }  

  function ShowDocumentos(){
    if(DocumentosPanel){
      ShowDefault()
    }else{
      setDefault(false)
      setCertificacionesPanel(false)
      setMttoCorrectivos(false)
      setDocumentosPanelEliminados(false)
      setMttoPreventivos(false)
      setCertificacionesEliminadosPanel(false)
      setHistorialPanel(false)
      setDocumentosPanel(true)
    }
  }
  
  function ShowDocumentosEliminados(){
    if(DocumentosPanelEliminados){
      ShowDefault()
    }else{
      setDefault(false)
      setCertificacionesPanel(false)
      setMttoCorrectivos(false)
      setMttoPreventivos(false)
      setCertificacionesEliminadosPanel(false)
      setHistorialPanel(false)
      setDocumentosPanelEliminados(false)
      setDocumentosPanel(false)
      setDocumentosPanelEliminados(true)
    }
  }

  function ShowCertificaciones(){
    if(CertificacionesPanel){
      ShowDefault()
    }else{
      setDefault(false)
      setMttoCorrectivos(false)
      setMttoPreventivos(false)
      setHistorialPanel(false)
      setDocumentosPanelEliminados(false)
      setCertificacionesEliminadosPanel(false)
      setDocumentosPanel(false)
      setCertificacionesPanel(true)
    }
  }  

  function ShowCertificacionesEliminadas(){
    if(CertificacionesEliminadosPanel){
      ShowDefault()
    }else{
      setDefault(false)
      setMttoCorrectivos(false)
      setMttoPreventivos(false)
      setHistorialPanel(false)
      setDocumentosPanelEliminados(false)
      setDocumentosPanel(false)
      setCertificacionesPanel(false)
      setCertificacionesEliminadosPanel(true)
    }
  }  

  function ShowMttoPrev(){
    if(MttoPreventivos){
      ShowDefault()
    }else{
      setDefault(false)
      setCertificacionesPanel(false)
      setMttoCorrectivos(false)
      setMttoPreventivos(false)
      setDocumentosPanel(false)
      setDocumentosPanelEliminados(false)
      setCertificacionesEliminadosPanel(false)
      setMttoPreventivos(true)
    }
  } 
  
  function ShowMttoCorr(){
    if(MttoCorrectivos){
      ShowDefault()
    }else{
      setDefault(false)
      setCertificacionesPanel(false)
      setMttoPreventivos(false)
      setDocumentosPanelEliminados(false)
      setCertificacionesEliminadosPanel(false)
      setDocumentosPanel(false)
      setHistorialPanel(false)
      setMttoCorrectivos(true)
    }
  } 

  const Data = [{  
    "id"         : '109678',
    "nombre"     : "DESCRIPCION",
    "value"      : ComponentesData[0] ? ComponentesData[0].descripcion : '',
  },{  
    "id"         : '6218340',
    "nombre"     : "EMPRESA",
    "value"      : 'Gworks Services',
  },{  
    "id"         : '5204759',
    "nombre"     : "CATEGORIA",
    "value"      : ComponentesData[0] ? ComponentesData[0].categoria.nombre : '',
  }]

  const Buttons = [{
      "id"         : '8768676',
      "label"      : "Historial de Actividad",
      "Myfunction" : ShowActividades,
      "estado"     : HistorialPanel
    },{  
      "id"         : '6431574',
      "label"      : "Documentos",
      "Myfunction" : ShowDocumentos,
      "estado"     : DocumentosPanel
    },{  
      "id"         : '643152374',
      "label"      : "Documentos Eliminados",
      "Myfunction" : ShowDocumentosEliminados,
      "estado"     : DocumentosPanelEliminados
    },{
      "id"         : '6281203',
      "label"      : "Certificaciones",
      "Myfunction" : ShowCertificaciones,
      "estado"     : CertificacionesPanel
    },{
      "id"         : '628103',
      "label"      : "Certificaciones Eliminadas",
      "Myfunction" : ShowCertificacionesEliminadas,
      "estado"     : CertificacionesEliminadosPanel
    },{
      "id"         : '6046348',
      "label"      : "MTTO Correctivos",
      "Myfunction" : ShowMttoCorr,
      "estado"     : MttoCorrectivos
    },{
      "id"         : '6876693',
      "label"      : "MTTO Preventivos",
      "Myfunction" : ShowMttoPrev,
      "estado"     : MttoPreventivos
  }]

  const DocumentosData = [];
  ComponentesData.forEach(Componente => {
    Componente.documentos.forEach(documentos => {
      DocumentosData.push({
        taqComponentes : documentos.taqComponentes,
        taqDoc : documentos.taqDoc,
        nombre: documentos.nombre,
        DocURL: documentos.DocURL,
        created_at: documentos.created_at,
        updated_at: documentos.updated_at,
      });
    });
  });

  useEffect(() => {  
    setDocumentosFiltrados(DocumentosData)
  }, [ComponentesData])
  
  const [DocumentosFiltrados, setDocumentosFiltrados] = useState();
  const FiltradoDocumentos = ( searchTerm ) => {
    const filtered = DocumentosData.filter((data) => {
        const taqComponentes  = data.taqComponentes.toLowerCase();
        const taqDoc          = data.taqDoc.toLowerCase();
        const nombre          = data.nombre.toLowerCase();
        const DocURL          = data.DocURL.toLowerCase();
        const created_at      = data.created_at.toLowerCase();
        const updated_at      = data.updated_at.toLowerCase();
        return (
            taqComponentes.includes(searchTerm) ||
            taqDoc.includes(searchTerm)         ||
            nombre.includes(searchTerm)         ||
            DocURL.includes(searchTerm)         ||
            created_at.includes(searchTerm)     ||
            updated_at.includes(searchTerm) 
        );
    });
    setDocumentosFiltrados(filtered);
  };

  const DocumentosEliminadosData = [];
  ComponentesData.forEach(Componente => {
    Componente.documentos__eliminados.forEach(documentos => {
      DocumentosEliminadosData.push({
        taqComponentes : documentos.taqComponentes,
        taqDoc : documentos.taqDoc,
        nombre: documentos.nombre,
        DocURL: documentos.DocURL,
        created_at: documentos.created_at,
        updated_at: documentos.updated_at,
      });
    });
  });

  useEffect(() => {  
    setDocumentosEliminiadosFiltrados(DocumentosEliminadosData)
  }, [ComponentesData])
  
  const [DocumentosEliminiadosFiltrados, setDocumentosEliminiadosFiltrados] = useState();
  const FiltradoDocumentosEliminados = ( searchTerm ) => {
    const filtered = DocumentosData.filter((data) => {
        const taqComponentes  = data.taqComponentes.toLowerCase();
        const taqDoc          = data.taqDoc.toLowerCase();
        const nombre          = data.nombre.toLowerCase();
        const DocURL          = data.DocURL.toLowerCase();
        const created_at      = data.created_at.toLowerCase();
        const updated_at      = data.updated_at.toLowerCase();
        return (
            taqComponentes.includes(searchTerm) ||
            taqDoc.includes(searchTerm)         ||
            nombre.includes(searchTerm)         ||
            DocURL.includes(searchTerm)         ||
            created_at.includes(searchTerm)     ||
            updated_at.includes(searchTerm) 
        );
    });
    setDocumentosEliminiadosFiltrados(filtered);
  };

  const Actividades = [];
  ComponentesData.forEach(Componente => {
    Componente.actividades.forEach(documentos => {
      Actividades.push({
        taqComponentes : documentos.taqComponentes,
        taqDoc : documentos.taqDoc,
        nombre: documentos.nombre,
        DocURL: documentos.DocURL,
        created_at: documentos.created_at,
        updated_at: documentos.updated_at,
      });
    });
  });

  useEffect(() => {  
    setActividadesFiltradas(Actividades)
  }, [ComponentesData])
  
  const [ActividadesFiltradas, setActividadesFiltradas] = useState();
  const FiltradoActividades = ( searchTerm ) => {
    const filtered = DocumentosData.filter((data) => {
        const taqComponentes  = data.taqComponentes.toLowerCase();
        const taqDoc          = data.taqDoc.toLowerCase();
        const nombre          = data.nombre.toLowerCase();
        const DocURL          = data.DocURL.toLowerCase();
        const created_at      = data.created_at.toLowerCase();
        const updated_at      = data.updated_at.toLowerCase();
        return (
            taqComponentes.includes(searchTerm) ||
            taqDoc.includes(searchTerm)         ||
            nombre.includes(searchTerm)         ||
            DocURL.includes(searchTerm)         ||
            created_at.includes(searchTerm)     ||
            updated_at.includes(searchTerm) 
        );
    });
    setActividadesFiltradas(filtered);
  };
  
  return (
    <main className='w-full h-screen flex flex-col justify-start items-center justify-items-center'>
        <Appbar
            Acciones={<></>}
            Componente={ComponentesData}
            formatos={<></>}
            key={`ActionMenu`}
        />
        <div className='w-full h-auto  flex justify-center items-center justify-items-center gap-3'>
        <div className='hidden md:flex flex-col justify-start items-start justify-items-center gap-3 w-[25%] px-4 py-2 h-full rounded-md bg-white '>
          {
            Data ? (
              Data.map( (data) => (
                <Caracteristica_target
                  name = { data.nombre }
                  key = { data.id }
                  value = { data.value }
                />
              ))
            ) : null
          }
          {
            ComponentesData[0].caracteristicas ? (
                ComponentesData[0].caracteristicas.map( (data) => (
                  <Caracteristica_target
                    name = { data.nombre }
                    key = { data.taqotro }
                    value = { data.value }
                  />
                ))
            ) : null
          }
        </div>
        <div className='w-full h-full   flex justify-start items-center justify-items-center gap-3'>
          <div className='hidden md:flex flex-col px-4 py-2 justify-start items-center justify-items-center gap-3 w-auto h-full  rounded-md '>
            {
              Buttons ? (
                Buttons.map( (data) => (
                  <ButtonMenu
                    children={<></>}
                    Myfunction = { data.Myfunction }
                    label = { data.label }
                    estado = { data.estado }
                    key = { data.id } 
                  />
                ))
              ) : null
            }
          </div>
          <div className='w-full h-full'>
            {
              Default ? (
                  <div className='w-full h-full px-4 py-2 flex  justify-center items-center justify-items-center '>
                      
                  </div> 
              ) : null
            } 
            {
              DocumentosPanel ? (
                <Panel_general FunctionfilterData = { FiltradoDocumentos } key={`120398`} >
                  {
                      DocumentosFiltrados ? (
                          DocumentosFiltrados.reverse().map( (data) => (
                            <div key = { data.taqDoc } className='w-full h-auto flex justify-between items-center border border-black px-4 py-2 cursor-pointer hover:bg-gray-800 hover:text-white transition duration-700 ease-in-out'>
                              <div className='w-1/2  flex justify-start items-center h-full'>
                                { data.nombre }
                              </div>
                              <div className='w-1/2  flex justify-end items-center h-full gap-3'>
                                <div className='w-auto h-full bg-green-500 px-4 py-2  text-white hover:bg-green-800 hover:border-white transition duration-700 ease-in-out cursor-pointer'>
                                  Ver
                                </div>
                                <div className='w-auto h-full bg-red-500 px-4 py-2  text-white hover:bg-red-800 hover:border-white transition duration-700 ease-in-out cursor-pointer'>
                                  Eliminar
                                </div>
                              </div>
                            </div>
                          ))
                      ) : null
                  }
                  <Modal
                    isVisible = { ModalDeleteDoc }
                    onClose   = { {} }
                    tittle    = {`ADVERTENCIA`}
                  >
                    <>
                    
                    </>
                  </Modal>
                </Panel_general>
              ) : null
            }
            {
              DocumentosPanelEliminados ? (
                <Panel_general FunctionfilterData = { FiltradoDocumentosEliminados } key={`3230558`}>
                  {
                      DocumentosEliminiadosFiltrados ? (
                          DocumentosEliminiadosFiltrados.reverse().map( (data) => (
                            <div key = { data.taqDoc } className='w-full h-auto flex justify-between items-center border border-black px-4 py-2 cursor-pointer hover:bg-gray-800 hover:text-white transition duration-700 ease-in-out'>
                              <div className='w-1/2  flex justify-start items-center h-full'>
                                { data.nombreDocumento }
                              </div>
                              <div className='w-1/2  flex justify-end items-center h-full gap-3'>
                                { data.responsable }
                              </div>
                            </div> 
                          ))
                      ) : null
                  }
                </Panel_general>
              ) : null
            }
            {
              HistorialPanel ? (
                <Panel_general FunctionfilterData = { FiltradoActividades } key = {`23136366`}>
                  {
                      ActividadesFiltradas ? (
                          ActividadesFiltradas.reverse().map( (data) => (
                            <div className='w-full h-[50px] flex justify-between items-center border border-black px-4 py-2 cursor-pointer hover:bg-gray-800 hover:text-white transition duration-700 ease-in-out'>
                              <span> { data.taqot } </span>
                              <span> { data.activo.nombre } </span>
                            </div>
                          ))
                      ) : null
                  }
                </Panel_general>
              ) : null
            }
          </div>
        </div>
      </div>
      <Toaster richColors position='top-center'/>
    </main>
  )
}
