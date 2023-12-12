
import Modal from '@/Components/Panels/Modals/Modal';
import MenuAppbar from '@/Components/UI/MenuAppbar';
import PanelSection from '@/Components/UI/PanelSection'; 
import CreateActivo from '@/Components/forms/Activo/CreateActivo';
import CreateCateoria from '@/Components/forms/Categoria/CreateCategoria'; 
import CreateComponente from '@/Components/forms/Componente/CreateComponente';
import CreateDocumento from '@/Components/forms/Documentos/CreateDocumento';
import CreateEmpresa from '@/Components/forms/Empresa/CreateEmpresa'; 
import CreateMantenimiento from '@/Components/forms/Mantenimiento/CreateMantenimiento';
import CreateOms from '@/Components/forms/Oms/CreateOms';
import CreateResponsable from '@/Components/forms/Responsable/CreateResponsable';
import { router } from '@inertiajs/react';
import { useEffect, useState } from 'react';

  const Dashboard = ({
    Activos,
    Componentes,
    Oms,
    Rigs,
    Tipos_Activo,
    Tipos_Componentes,
    Documentos,
    Cargos,
    Empresas,
    Mantenimientos,
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
          if(parsedPanelState.State === 'EmpresasPanel') {
            ShowEmpresa();
          } 
          if(parsedPanelState.State === 'DocumentosPanel') {
            ShowDocumentos();
          } 
          if(parsedPanelState.State === 'ComponentesPanel') {
            ShowComponentes();
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
    const [EmpresasPanel, setEmpresasPanel] = useState(false)
    const [MantenimientosPanel, setMantenimientosPanel] = useState(false)
    const [ResponsablesPanel, setResponsablesPanel] = useState(false)
    const [RigsPanel, setRigsPanel] = useState(false)
    const [CategoriasActivoPanel, setCategoriasActivoPanel] = useState(false)
    const [CategoriasComponentePanel, setCategoriasComponentePanel] = useState(false)
  
    function ShowDefault() {
        setActivosPanel(false)
        setComponentesPanel(false)
        setOmsPanel(false)
        setDocumentosPanel(false)
        setEmpresasPanel(false)
        setMantenimientosPanel(false)
        setResponsablesPanel(false)
        setRigsPanel(false)
        setCategoriasActivoPanel(false) 
        setCategoriasComponentePanel(false)
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
            setEmpresasPanel(false)
            setMantenimientosPanel(false)
            setResponsablesPanel(false)
            setCategoriasActivoPanel(false) 
            setCategoriasComponentePanel(false) 
            setDefaultPanel(false)
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
            setEmpresasPanel(false)
            setMantenimientosPanel(false)
            setResponsablesPanel(false)
            setDefaultPanel(false)
            setRigsPanel(false)
            setCategoriasComponentePanel(false) 
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
            setEmpresasPanel(false)
            setMantenimientosPanel(false)
            setResponsablesPanel(false)
            setDefaultPanel(false)
            setRigsPanel(false)
            setCategoriasActivoPanel(false)
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
            setEmpresasPanel(false)
            setMantenimientosPanel(false)
            setResponsablesPanel(false)
            setDefaultPanel(false)
            setRigsPanel(false)
            setCategoriasActivoPanel(false) 
            setCategoriasComponentePanel(false)
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
                setEmpresasPanel(false)
                setMantenimientosPanel(false)
                setResponsablesPanel(false)
                setDefaultPanel(false)
                setRigsPanel(false) 
                setCategoriasActivoPanel(false) 
                setCategoriasComponentePanel(false)
                setActivosPanel(false)
                setOmsPanel(true)
              localStorage.setItem('PanelState', JSON.stringify({
                State:'OmsPanel'
              })); 
          }
    }
  
    function ShowEmpresa() {
        if(EmpresasPanel){
        ShowDefault()
        }else{
            setComponentesPanel(false)
            setDocumentosPanel(false)
            setMantenimientosPanel(false)
            setResponsablesPanel(false)
            setDefaultPanel(false)
            setRigsPanel(false)
            setCategoriasActivoPanel(false) 
            setCategoriasComponentePanel(false)
            setActivosPanel(false)
            setOmsPanel(false)
            setEmpresasPanel(true)
            localStorage.setItem('PanelState', JSON.stringify({
            State:'EmpresasPanel'
            }));  
        }
    }
  
    function ShowDocumentos() {
        if(DocumentosPanel){
          ShowDefault()
        }else{
            setComponentesPanel(false)
            setMantenimientosPanel(false)
            setResponsablesPanel(false)
            setDefaultPanel(false)
            setRigsPanel(false)
            setCategoriasActivoPanel(false) 
            setCategoriasComponentePanel(false)
            setActivosPanel(false)
            setOmsPanel(false)
            setEmpresasPanel(false)
            setDocumentosPanel(true)
            localStorage.setItem('PanelState', JSON.stringify({
              State:'DocumentosPanel'
            }));
        }
    }
  
    function ShowMantenimiento() {
        if(MantenimientosPanel){
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
            setEmpresasPanel(false)
            setDocumentosPanel(false)
            setMantenimientosPanel(true)
            localStorage.setItem('PanelState', JSON.stringify({
            State:'Panel_Mantenimiento'
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
            setEmpresasPanel(false)
            setDocumentosPanel(false)
            setMantenimientosPanel(false)
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
            setEmpresasPanel(false)
            setDocumentosPanel(false)
            setMantenimientosPanel(false)
            setResponsablesPanel(false)
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
            "cantidad"   : Tipos_Activo?.length > 0 ? Tipos_Activo?.length : '0',
            "Myfunction" : ShowCategoriasActivo,
            "estado"     : CategoriasActivoPanel
        },{
            "id"         : "453706520", 
            "label"      : "Categorias de Componente",
            "cantidad"   : Tipos_Componentes?.length > 0 ? Tipos_Componentes?.length : '0',
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
            "id"         : '34258', 
            "label"      : "Empresas",
            "cantidad"   : Empresas?.length > 0 ? Empresas?.length : '0',
            "Myfunction" : ShowEmpresa,
            "estado"     : EmpresasPanel
        },{
            "id"         : '456465', 
            "label"      : "Rigs",
            "cantidad"   : Rigs?.length > 0 ? Rigs?.length : '0',
            "Myfunction" : ShowRigs,
            "estado"     : RigsPanel
        },{
            "id"         : '41891', 
            "label"      : "Responsables",
            "cantidad"   : Responsables?.length > 0 ? Responsables?.length : '0',
            "Myfunction" : ShowResponsables,
            "estado"     : ResponsablesPanel
        },{
            "id"         : '58122', 
            "label"      : "Mantenimientos",
            "cantidad"   : Mantenimientos?.length > 0 ? Mantenimientos?.length : '0',
            "Myfunction" : ShowMantenimiento,
            "estado"     : MantenimientosPanel
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
            "Data"       : Tipos_Activo, 
            "State"      : CategoriasActivoPanel,
        },
        {
            "id"         : "13d2d523a4a6", 
            "Tittle"     : "Categorias Componente",
            "ExcelAction": null,
            "Data"       : Tipos_Componentes, 
            "State"      : CategoriasComponentePanel
        },
        {
            "id"         : "bb35e3728ef0", 
            "Tittle"     : "Activo",
            "ExcelAction": "/Download/activos",
            "Data"       : Activos, 
            "State"      : ActivosPanel
        },
        {
            "id"         : "f21ff4cf82c1", 
            "Tittle"     : "Componente",
            "ExcelAction": "/Download/componentes",
            "Data"       : Componentes, 
            "State"      : ComponentesPanel
        },
        {
            "id"         : "96334918fb7d", 
            "Tittle"     : "Empresa",
            "ExcelAction": "/Download/clientes",
            "Data"       : Empresas,
            "State"      : EmpresasPanel
        },
        {
            "id"         : "4abe7087a2bd", 
            "Tittle"     : "Rig",
            "ExcelAction": "/Download/rigs",
            "Data"       : Rigs, 
            "State"      : RigsPanel
        }, 
        {
            "id"         : "2e576d97ea68", 
            "Tittle"     : "Responsable",
            "ExcelAction": "/Download/responsables",
            "Data"       : Responsables, 
            "State"      : ResponsablesPanel
        }, 
        {
            "id"         : "c5c06ae3d247", 
            "Tittle"     : "Mantenimiento",
            "ExcelAction": "/Download/mantenimientos",
            "Data"       : Mantenimientos, 
            "State"      : MantenimientosPanel
        }, 
        {
            "id"         : "76b1ac64b527", 
            "Tittle"     : "Om",
            "ExcelAction": "/Download/oms",
            "Data"       : Oms, 
            "State"      : OmsPanel
        }, 
        {
            "id"         : "c74ca769b631", 
            "Tittle"     : "Documento",
            "ExcelAction": null,
            "Data"       : Documentos, 
            "State"      : DocumentosPanel
        }, 
    ]
      
    return (
      <main className='w-full h-screen overflow-hidden bg-gray-800 flex flex-col xl:flex-row '>
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
              <CreateActivo Empresa = { Empresas } Tipos = { Tipos_Activo } onClose = { () => setShowModal(false) } />
            ) : null 
          }
          {
            CategoriasActivoPanel  ? (
              <CreateCateoria onClose = { () => setShowModal(false) } route={`/categoria/create/activo`} key = {`d992f2f2cbd9d094be`} />
            ) : null 
          }
          {
            CategoriasComponentePanel  ? (
              <CreateCateoria onClose = { () => setShowModal(false) } route={`/categoria/create/componente`} key={`c0ef6ff5f88c81216b`}/>
            ) : null 
          }
          {
            ComponentesPanel  ? (
              <CreateComponente onClose = { () => setShowModal(false) } Tipos = { Tipos_Componentes } key={`31d3add5cad3afb5a8`}/>
            ) : null 
          }
          {
            EmpresasPanel  ? (
              <CreateEmpresa onClose = { () => setShowModal(false) } key={`0d49a8bbf20be5f63e`} />
            ) : null 
          } 
          {
            RigsPanel  ? (
              <CreateEmpresa onClose = { () => setShowModal(false) } key={`a14476a7b0a1f82d62`} />
            ) : null 
          }
          {
            ResponsablesPanel ? (
              <CreateResponsable Cargos = { Cargos } onClose = { () => setShowModal(false) } key={`22d5ef25092ed15861`} />
            ) : null 
          }
          {
            MantenimientosPanel ? (
              <CreateMantenimiento onClose = { () => setShowModal(false) } key={`8651aeb15d291641db`} />
            ) : null 
          }
          {
            OmsPanel ? (
              <CreateOms LastOm = {Oms && Oms[0] ? Oms[0].taqom : "0"} Responsables = { Responsables } onClose = { () => setShowModal(false) } key={`8fe4b439accaa0b558`}/>
            ) : null 
          }
          {
            DocumentosPanel ? (
              <CreateDocumento route={``} Taq={``} onClose = { () => setShowModal(false) } key={`c53166671f945e794f`}/>
            ) : null 
          }
        </Modal>
      </main>
    )
  }

  export default Dashboard;