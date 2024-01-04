
import Modal from '@/Components/Panels/Modals/Modal';
import MenuAppbar from '@/Components/UI/MenuAppbar';
import PanelSection from '@/Components/UI/PanelSection'; 
import CreateActivo from '@/Components/forms/Activo/CreateActivo';
import CreateCategoria from '@/Components/forms/Categoria/CreateCategoria'; 
import CreateComponente from '@/Components/forms/Componente/CreateComponente';
import CreateDocumento from '@/Components/forms/Documentos/CreateDocumento';
import CreateMantenimiento from '@/Components/forms/Mantenimiento/CreateMantenimiento';
import CreateOms from '@/Components/forms/Oms/CreateOms';
import CreateResponsable from '@/Components/forms/Responsable/CreateResponsable';
import CreateRigs from '@/Components/forms/Rigs/CreateRigs';
import { router } from '@inertiajs/react';
import { useEffect, useState } from 'react';

  const Dashboard = ({
    Activos,
    Componentes,
    Oms,
    Rigs,
    CategoriasActivo,
    CategoriasComponentes,
    Documentos,
    Cargos,
    Responsables,
  }) => {
     
    useEffect(() => {
        const storedPanelState = localStorage.getItem('PanelState');
        if(storedPanelState) {
          const parsedPanelState = JSON.parse(storedPanelState); 
          if(parsedPanelState.State === 'Default') {
            ShowDefault();
          }
          if(parsedPanelState.State === 'CategoriasActivoPanel') {
            ShowCategoriasActivo();
          }
          if(parsedPanelState.State === 'CategoriasComponentePanel') {
            ShowCategoriasComponentes();
          }
          if(parsedPanelState.State === 'ActivosPanel') {
            Show_Activos();
          }
          if(parsedPanelState.State === 'RigsPanel') {
            ShowRigs();
          }
          if(parsedPanelState.State === 'OmsPanel') {
            ShowOms();
          } 
          if(parsedPanelState.State === 'DocumentosPanel') {
            ShowDocumentos();
          } 
          if(parsedPanelState.State === 'ComponentesPanel') {
            ShowComponentes();
          }
          if(parsedPanelState.State === 'CargosPanel') {
            ShowCargos();
          } 
          if(parsedPanelState.State === 'ResponsblesPanel') {
            ShowResponsables();
          } 
        }
    },[])
         
    const [ShowModal, setShowModal] = useState(false);
    
    const [DefaultPanel, setDefaultPanel] = useState(true)
    const [ActivosPanel, setActivosPanel] = useState(false)
    const [ComponentesPanel, setComponentesPanel] = useState(false)
    const [OmsPanel, setOmsPanel] = useState(false)  
    const [DocumentosPanel, setDocumentosPanel] = useState(false)
    const [CargosPanel, setCargosPanel] = useState(false)
    const [ResponsablesPanel, setResponsablesPanel] = useState(false)
    const [RigsPanel, setRigsPanel] = useState(false)
    const [CategoriasActivoPanel, setCategoriasActivoPanel] = useState(false)
    const [CategoriasComponentePanel, setCategoriasComponentePanel] = useState(false)
  
    function ShowDefault() {
        setActivosPanel(false)
        setComponentesPanel(false)
        setOmsPanel(false)
        setDocumentosPanel(false)
        setResponsablesPanel(false)
        setRigsPanel(false)
        setCategoriasActivoPanel(false) 
        setCategoriasComponentePanel(false)
        setCargosPanel(false)
        setDefaultPanel(true)
        localStorage.setItem('PanelState', JSON.stringify({
          State:'Default'
        }));
    }
  
    function ShowRigs(){
        if(RigsPanel){
            ShowDefault()
        }else{
            setActivosPanel(false)
            setComponentesPanel(false)
            setOmsPanel(false)
            setDocumentosPanel(false)
            setResponsablesPanel(false)
            setCategoriasActivoPanel(false) 
            setCategoriasComponentePanel(false) 
            setDefaultPanel(false)
            setCargosPanel(false)
            setRigsPanel(true)
            localStorage.setItem('PanelState', JSON.stringify({
            State:'RigsPanel'
            })); 
        }
    }
  
    function ShowCategoriasActivo(){
        if(CategoriasActivoPanel){
          ShowDefault()
        }else{
            setActivosPanel(false)
            setComponentesPanel(false)
            setOmsPanel(false)
            setDocumentosPanel(false)
            setResponsablesPanel(false)
            setDefaultPanel(false)
            setRigsPanel(false)
            setCategoriasComponentePanel(false) 
            setCargosPanel(false)
            setCategoriasActivoPanel(true) 
            localStorage.setItem('PanelState', JSON.stringify({
              State:'CategoriasPanel'
            })); 
        }
    }

    function ShowCategoriasComponentes(){
        if(CategoriasComponentePanel){
          ShowDefault()
        }else{
            setActivosPanel(false)
            setComponentesPanel(false)
            setOmsPanel(false)
            setDocumentosPanel(false)  
            setResponsablesPanel(false)
            setDefaultPanel(false)
            setRigsPanel(false)
            setCategoriasActivoPanel(false)
            setCargosPanel(false)
            setCategoriasComponentePanel(true) 
            localStorage.setItem('PanelState', JSON.stringify({
              State:'CategoriasPanel'
            })); 
        }
    }
  
    function Show_Activos() {
        if(ActivosPanel){
          ShowDefault()
        }else{
            setComponentesPanel(false)
            setOmsPanel(false)
            setDocumentosPanel(false)  
            setResponsablesPanel(false)
            setDefaultPanel(false)
            setRigsPanel(false)
            setCategoriasActivoPanel(false) 
            setCategoriasComponentePanel(false)
            setCargosPanel(false)
            setActivosPanel(true)
            localStorage.setItem('PanelState', JSON.stringify({
              State:'ActivosPanel'
            }));  
        }
    }
  
    function ShowOms() {
          if(OmsPanel){
            ShowDefault()
          }else{
                setComponentesPanel(false)
                setDocumentosPanel(false)    
                setResponsablesPanel(false)
                setDefaultPanel(false)
                setRigsPanel(false) 
                setCategoriasActivoPanel(false) 
                setCategoriasComponentePanel(false)
                setActivosPanel(false)
                setCargosPanel(false)
                setOmsPanel(true)
              localStorage.setItem('PanelState', JSON.stringify({
                State:'OmsPanel'
              })); 
          }
    }
  
    function ShowDocumentos() {
        if(DocumentosPanel){
          ShowDefault()
        }else{
            setComponentesPanel(false)
            setResponsablesPanel(false)
            setDefaultPanel(false)
            setRigsPanel(false)
            setCategoriasActivoPanel(false) 
            setCategoriasComponentePanel(false)
            setActivosPanel(false)
            setOmsPanel(false)  
            setCargosPanel(false)
            setDocumentosPanel(true)
            localStorage.setItem('PanelState', JSON.stringify({
              State:'DocumentosPanel'
            }));
        }
    }

    function ShowCargos(){
      if(CargosPanel){
        ShowDefault()
        }else{
            setComponentesPanel(false)
            setDefaultPanel(false)
            setRigsPanel(false)
            setCategoriasActivoPanel(false) 
            setCategoriasComponentePanel(false)
            setActivosPanel(false)
            setOmsPanel(false)  
            setDocumentosPanel(false)
            setResponsablesPanel(false)
            setCargosPanel(true)
            localStorage.setItem('PanelState', JSON.stringify({
            State:'CargosPanel'
            })); 
        }
    }
  
    function ShowResponsables() {
        if(ResponsablesPanel){
        ShowDefault()
        }else{
            setComponentesPanel(false)
            setDefaultPanel(false)
            setRigsPanel(false)
            setCategoriasActivoPanel(false) 
            setCategoriasComponentePanel(false)
            setActivosPanel(false)
            setOmsPanel(false)  
            setDocumentosPanel(false)
            setCargosPanel(false)
            setResponsablesPanel(true)
            localStorage.setItem('PanelState', JSON.stringify({
            State:'ResponsblesPanel'
            })); 
        }
    }
      
    function ShowComponentes() {
        if(ComponentesPanel){
            ShowDefault()
        }else{
            setDefaultPanel(false)
            setRigsPanel(false)
            setCategoriasActivoPanel(false) 
            setCategoriasComponentePanel(false)
            setActivosPanel(false)
            setOmsPanel(false)  
            setDocumentosPanel(false)
            setResponsablesPanel(false)
            setCargosPanel(false)
            setComponentesPanel(true)
            localStorage.setItem('PanelState', JSON.stringify({
                State:'ComponentesPanel'
            }));   
        }
    }   
    
    const Buttons = [
        {
            "id"         : "45123706520", 
            "label"      : "Categorias de Activo",
            "cantidad"   : CategoriasActivo?.length > 0 ? CategoriasActivo?.length : '0',
            "Myfunction" : ShowCategoriasActivo,
            "estado"     : CategoriasActivoPanel
        },{
            "id"         : "453706520", 
            "label"      : "Categorias de Componente",
            "cantidad"   : CategoriasComponentes?.length > 0 ? CategoriasComponentes?.length : '0',
            "Myfunction" : ShowCategoriasComponentes,
            "estado"     : CategoriasComponentePanel
        },{
            "id"         : "58951", 
            "label"      : "Activos",
            "cantidad"   : Activos?.length > 0 ? Activos?.length : '0',
            "Myfunction" : Show_Activos,
            "estado"     : ActivosPanel
        },{
            "id"         : '39582', 
            "label"      : "Componentes",
            "cantidad"   : Componentes?.length > 0 ? Componentes?.length : '0',
            "Myfunction" : ShowComponentes,
            "estado"     : ComponentesPanel
        },{
            "id"         : '456465', 
            "label"      : "Rigs",
            "cantidad"   : Rigs?.length > 0 ? Rigs?.length : '0',
            "Myfunction" : ShowRigs,
            "estado"     : RigsPanel
        },{
            "id"         : "4532706520", 
            "label"      : "Cargos",
            "cantidad"   : Cargos?.length > 0 ? Cargos?.length : '0',
            "Myfunction" : ShowCargos,
            "estado"     : CargosPanel
        },{
            "id"         : '41891', 
            "label"      : "Responsables",
            "cantidad"   : Responsables?.length > 0 ? Responsables?.length : '0',
            "Myfunction" : ShowResponsables,
            "estado"     : ResponsablesPanel
        },{
            "id"         : '397asd34', 
            "label"      : "Om's",
            "cantidad"   : Oms?.length  > 0 ? Oms?.length  : '0',
            "Myfunction" : ShowOms,
            "estado"     : OmsPanel
        },{
            "id"         : '865115', 
            "label"      : "Documentos",
            "cantidad"   : Documentos?.length,
            "Myfunction" : ShowDocumentos,
            "estado"     : DocumentosPanel
        },{
            "id"         : '742225', 
            "label"      : "Salir",
            "Myfunction" : () => router.get(`logout`),
            "estado"     : false
        }
    ]

    const Sections = [
        {
            "id"         : "13d2d523a2314a6", 
            "Tittle"     : "Categorias Activo",
            "ExcelAction": null,
            "Data"       : CategoriasActivo, 
            "State"      : CategoriasActivoPanel,
            "add"        : true,
        },
        {
            "id"         : "13d2d523a4a6", 
            "Tittle"     : "Categorias Componente",
            "ExcelAction": null,
            "Data"       : CategoriasComponentes, 
            "State"      : CategoriasComponentePanel,
            "add"        : true,
        },
        {
            "id"         : "bb35e3728ef0", 
            "Tittle"     : "Activo",
            "ExcelAction": "/Download/activos",
            "Data"       : Activos, 
            "State"      : ActivosPanel,
            "add"        : true,
        },
        {
            "id"         : "f21ff4cf82c1", 
            "Tittle"     : "Componente",
            "ExcelAction": "/Download/componentes",
            "Data"       : Componentes, 
            "State"      : ComponentesPanel,
            "add"        : true,
        },
        {
            "id"         : "4abe7087a2bd", 
            "Tittle"     : "Rig",
            "ExcelAction": "/Download/rigs",
            "Data"       : Rigs, 
            "State"      : RigsPanel,
            "add"        : true,
        }, 
        {
            "id"         : "2e5762d97ea68", 
            "Tittle"     : "Cargo",
            "ExcelAction": "",
            "Data"       : Cargos, 
            "State"      : CargosPanel,
            "add"        : true,
        },
        {
            "id"         : "2e576d97ea68", 
            "Tittle"     : "Responsable",
            "ExcelAction": "/Download/responsables",
            "Data"       : Responsables, 
            "State"      : ResponsablesPanel,
            "add"        : true,
        }, 
        {
            "id"         : "76b1ac64b527", 
            "Tittle"     : "Om",
            "ExcelAction": "/Download/oms",
            "Data"       : Oms, 
            "State"      : OmsPanel,
            "add"        : true,
        }, 
        {
            "id"         : "c74ca769b631", 
            "Tittle"     : "Documento",
            "ExcelAction": null,
            "Data"       : Documentos, 
            "State"      : DocumentosPanel,
            "add"        : true,
        }, 
    ]
      
    return (
      <main className='w-full h-screen overflow-hidden bg-gray-200 flex flex-col xl:flex-row '>
        <MenuAppbar Buttons = { Buttons } Default = { ShowDefault } /> 
        <div className='w-full xl:w-[80%] h-full overflow-y-auto xl:p-4'>
             {
               Sections ?  Sections.map((Constructor) => (
                <PanelSection key={Constructor.id} Values = {Constructor} ShowModal = { () => setShowModal(true) } />
               )) : null 
             }
        </div> 
        <Modal
            isVisible = { ShowModal }
            onClose = { () => setShowModal(false) }
            tittle = {`Opciones`} 
        >
          {
            ActivosPanel ? (
              <CreateActivo Tipos = { CategoriasActivo } onClose = { () => setShowModal(false) } />
            ) : null 
          }
          {
            CargosPanel ? (
              <>
                cargos new
              </>
            ) : null 
          }
          {
            CategoriasActivoPanel  ? (
              <CreateCategoria onClose = { () => setShowModal(false) } route={`/categorias/activo/store`} key = {`d992f2f2cbd9d094be`} />
            ) : null 
          }
          {
            CategoriasComponentePanel  ? (
              <CreateCategoria onClose = { () => setShowModal(false) } route={`/categorias/componente/store`} key={`c0ef6ff5f88c81216b`}/>
            ) : null 
          }
          {
            ComponentesPanel  ? (
              <CreateComponente onClose = { () => setShowModal(false) } Tipos = { CategoriasComponentes } key={`31d3add5cad3afb5a8`}/>
            ) : null 
          }
          {
            RigsPanel  ? (
              <CreateRigs onClose = { () => setShowModal(false) } key={`a14476a7b0a1f82d62`} />
            ) : null 
          }
          {
            ResponsablesPanel ? (
              <CreateResponsable Cargos = { Cargos } onClose = { () => setShowModal(false) } key={`22d5ef25092ed15861`} />
            ) : null 
          }
          {
            OmsPanel ? (
              <CreateOms Activos = { Activos } LastOm = {Oms && Oms[0] ? Oms[0].taqom : "0"} Responsables = { Responsables } onClose = { () => setShowModal(false) } key={`8fe4b439accaa0b558`}/>
            ) : null 
          }
          {
            DocumentosPanel ? (
              <CreateDocumento route={`/documents/store`} Taq={``} onClose = { () => setShowModal(false) } key={`c53166671f945e794f`}/>
            ) : null 
          }
        </Modal>
      </main>
    )
  }

  export default Dashboard;