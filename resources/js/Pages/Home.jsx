import Modal from '@/Components/Panels/Modals/Modal';
import MenuAppbar from '@/Components/UI/MenuAppbar';  
import SearchInput from '@/Components/UI/Search';
import CreateActivo from '@/Components/forms/Activo/CreateActivo';
import CreateCargo from '@/Components/forms/Cargos/CreateCargo';
import CreateCategoria from '@/Components/forms/Categoria/CreateCategoria'; 
import CreateComponente from '@/Components/forms/Componente/CreateComponente';
import CreateDocumento from '@/Components/forms/Documentos/CreateDocumento';  
import CreateResponsable from '@/Components/forms/Responsable/CreateResponsable';
import CreateRigs from '@/Components/forms/Rigs/CreateRigs';
import { Link, router } from '@inertiajs/react';
import { useEffect, useState } from 'react';

import CardGeneral from '../Components/UI/CartaGeneral';
import CreateOmcs from '@/Components/forms/Oms/CreateOmcs';
import CreateOmas from '@/Components/forms/Oms/CreateOmas';
import CreateMantenimiento from '@/Components/forms/Mantenimiento/CreateMantenimientoComponente';
import CreateMantenimientoComponente from '@/Components/forms/Mantenimiento/CreateMantenimientoComponente';
import CreateMantenimientoActivo from '@/Components/forms/Mantenimiento/CreateMantenimientoActivo';

  const Dashboard = ({
    Activos,
    Componentes,
    Omas,
    Omcs,
    Rigs,
    Mantenimientos_activos,
    Mantenimientos_componentes,
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
          if(parsedPanelState.State === 'MttosPanel') {
            ShowMttos();
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
          if(parsedPanelState.State === 'OmasPanel') {
            ShowOmas();
          } 
          if(parsedPanelState.State === 'OmcsPanel') {
            ShowOmcs();
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
    const [OmasPanel, setOmasPanel] = useState(false)  
    const [OmcsPanel, setOmcsPanel] = useState(false)  
      const [OmasPreventivasPanel, setOmasPreventivasPanel] = useState(false)  
      const [OmasCorrectivasPanel, setOmasCorrectivasPanel] = useState(false)   
      const [OmasDiseñoMejoraPanel, setOmasDiseñoMejoraPanel] = useState(false) 
      const [OmcsPreventivasPanel, setOmcsPreventivasPanel] = useState(false)  
      const [OmcsCorrectivasPanel, setOmcsCorrectivasPanel] = useState(false)   
      const [OmcsDiseñoMejoraPanel, setOmcsDiseñoMejoraPanel] = useState(false) 
    const [DocumentosPanel, setDocumentosPanel] = useState(false)
    const [CargosPanel, setCargosPanel] = useState(false)
    const [MttosPanel, setMttosPanel] = useState(false)
      const [MantenimientosActivo, setMantenimientosActivo] = useState(false)
      const [MantenimientosComponentes, setMantenimientosComponentes] = useState(false)
    const [ResponsablesPanel, setResponsablesPanel] = useState(false)
    const [RigsPanel, setRigsPanel] = useState(false)
    const [CategoriasActivoPanel, setCategoriasActivoPanel] = useState(false)
    const [CategoriasComponentePanel, setCategoriasComponentePanel] = useState(false)
  
    function ShowDefault() {
        setActivosPanel(false)
        setComponentesPanel(false)
        setOmasPanel(false)
        setOmcsPanel(false)
        setDocumentosPanel(false)
        setResponsablesPanel(false)
        setRigsPanel(false)
        setMttosPanel(false)
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
            setOmasPanel(false)
            setMttosPanel(false)
            setOmcsPanel(false)
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
            setMttosPanel(false)
            setComponentesPanel(false)
            setOmasPanel(false)
            setOmcsPanel(false)
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
            setMttosPanel(false)
            setComponentesPanel(false)
            setOmasPanel(false)
            setOmcsPanel(false)
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
            setOmasPanel(false)
            setMttosPanel(false)
            setOmcsPanel(false)
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
  
    function ShowOmas() {
          if(OmasPanel){
            ShowDefault()
          }else{
                setComponentesPanel(false)
                setDocumentosPanel(false)    
                setMttosPanel(false)
                setResponsablesPanel(false)
                setDefaultPanel(false)
                setRigsPanel(false) 
                setCategoriasActivoPanel(false) 
                setCategoriasComponentePanel(false)
                setActivosPanel(false)
                setCargosPanel(false)
                setOmcsPanel(false)
                setOmasPanel(true)
              localStorage.setItem('PanelState', JSON.stringify({
                State:'OmasPanel'
              })); 
          }
    }

    function ShowOmcs() {
      if(OmcsPanel){
        ShowDefault()
      }else{
            setComponentesPanel(false)
            setDocumentosPanel(false)    
            setMttosPanel(false)
            setResponsablesPanel(false)
            setDefaultPanel(false)
            setRigsPanel(false) 
            setCategoriasActivoPanel(false) 
            setCategoriasComponentePanel(false)
            setActivosPanel(false)
            setCargosPanel(false)
            setOmasPanel(false)
            setOmcsPanel(true)
          localStorage.setItem('PanelState', JSON.stringify({
            State:'OmcsPanel'
          })); 
      }
    }

    function ShowMantenimientosPreventivos(){
      if(OmasPreventivasPanel){
        setOmasCorrectivasPanel(false)
        setOmasPreventivasPanel(false)
        setOmasDiseñoMejoraPanel(false)
      }else{
        setOmasCorrectivasPanel(false)
        setOmasDiseñoMejoraPanel(false)
        setOmasPreventivasPanel(true)
      }
    }
    
    function ShowMantenimientosCorrectivos(){
      if(OmasCorrectivasPanel){
        setOmasCorrectivasPanel(false)
        setOmasPreventivasPanel(false)
        setOmasDiseñoMejoraPanel(false)
      }else{
        setOmasPreventivasPanel(false)
        setOmasDiseñoMejoraPanel(false)
        setOmasCorrectivasPanel(true)
      }
    }

    function ShowMantenimientosDiseñoMejora(){
      if(OmasDiseñoMejoraPanel){
        setOmasCorrectivasPanel(false)
        setOmasPreventivasPanel(false)
        setOmasDiseñoMejoraPanel(false)
      }else{
        setOmasPreventivasPanel(false)
        setOmasCorrectivasPanel(false)
        setOmasDiseñoMejoraPanel(true)
      }
    }

    function ShowMantenimientosPreventivosComponentes(){
      if(OmcsPreventivasPanel){
        setOmcsCorrectivasPanel(false)
        setOmcsPreventivasPanel(false)
        setOmcsDiseñoMejoraPanel(false)
      }else{
        setOmcsCorrectivasPanel(false)
        setOmcsDiseñoMejoraPanel(false)
        setOmcsPreventivasPanel(true)
      }
    }
    
    function ShowMantenimientosCorrectivosComponentes(){
      if(OmcsCorrectivasPanel){
        setOmcsCorrectivasPanel(false)
        setOmcsPreventivasPanel(false)
        setOmcsDiseñoMejoraPanel(false)
      }else{
        setOmcsPreventivasPanel(false)
        setOmcsDiseñoMejoraPanel(false)
        setOmcsCorrectivasPanel(true)
      }
    }

    function ShowMantenimientosDiseñoMejoraComponentes(){
      if(OmcsDiseñoMejoraPanel){
        setOmcsCorrectivasPanel(false)
        setOmcsPreventivasPanel(false)
        setOmcsDiseñoMejoraPanel(false)
      }else{
        setOmcsPreventivasPanel(false)
        setOmcsCorrectivasPanel(false)
        setOmcsDiseñoMejoraPanel(true)
      }
    }

    function ShowMantenimientosActivos(){
      if(MantenimientosActivo){
        setMantenimientosActivo(false)
        setMantenimientosComponentes(false) 
      }else{ 
        setMantenimientosComponentes(false)
        setMantenimientosActivo(true)
      }
    }

    function ShowMantenimientosComponentes(){
      if(MantenimientosComponentes){
        setMantenimientosActivo(false)
        setMantenimientosComponentes(false) 
      }else{ 
        setMantenimientosActivo(false)
        setMantenimientosComponentes(true)
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
            setMttosPanel(false)
            setOmasPanel(false)
            setOmcsPanel(false) 
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
          setMttosPanel(false)
          setCategoriasActivoPanel(false) 
          setCategoriasComponentePanel(false)
          setActivosPanel(false)
          setOmasPanel(false)
          setOmcsPanel(false) 
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
            setMttosPanel(false)
            setCategoriasActivoPanel(false) 
            setCategoriasComponentePanel(false)
            setActivosPanel(false)
            setOmasPanel(false)
            setOmcsPanel(false)
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
            setMttosPanel(false)
            setCategoriasActivoPanel(false) 
            setCategoriasComponentePanel(false)
            setActivosPanel(false)
            setOmasPanel(false)
            setOmcsPanel(false)
            setDocumentosPanel(false)
            setResponsablesPanel(false)
            setCargosPanel(false)
            setComponentesPanel(true)
            localStorage.setItem('PanelState', JSON.stringify({
                State:'ComponentesPanel'
            }));   
        }
    }   

    function ShowMttos() {
      if(MttosPanel){
          ShowDefault()
      }else{
          setDefaultPanel(false)
          setRigsPanel(false)
          setCategoriasActivoPanel(false) 
          setCategoriasComponentePanel(false)
          setActivosPanel(false)
          setOmasPanel(false)
          setOmcsPanel(false)
          setDocumentosPanel(false)
          setResponsablesPanel(false)
          setCargosPanel(false)
          setComponentesPanel(false)
          setMttosPanel(true)
          localStorage.setItem('PanelState', JSON.stringify({
              State:'MttosPanel'
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
            "id"         : '1123asdas213', 
            "label"      : "Mantenimientos",
            "cantidad"   : Mantenimientos_activos?.length + Mantenimientos_componentes?.length > 0 ? Mantenimientos_activos?.length + Mantenimientos_componentes?.length : '0',
            "Myfunction" : ShowMttos,
            "estado"     : MttosPanel
        },{
            "id"         : '397a23sd34', 
            "label"      : "Mantenimiento Activos",
            "cantidad"   : Omas?.length  > 0 ? Omas?.length  : '0',
            "Myfunction" : ShowOmas,
            "estado"     : OmasPanel
        },{
            "id"         : '397as43d34', 
            "label"      : "Mantenimiento Componentes",
            "cantidad"   : Omcs?.length  > 0 ? Omcs?.length  : '0',
            "Myfunction" : ShowOmcs,
            "estado"     : OmcsPanel
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

    const CategoriasActivoList = [];
    CategoriasActivo.forEach(data => {  
      CategoriasActivoList.push({
        categoria_id : data.categoria_id,
        nombre       : data.nombre,
        taq          : data.taq, 
        activos      : data.activos.length
      });
    });
    
    const CategoriasComponenteList = []; 
    CategoriasComponentes.forEach(data => { 
      CategoriasComponenteList.push({
        categoria_id : data.categoria_id,
        nombre       : data.nombre,
        taq          : data.taq,
        componentes  : data.componentes.length
      }); 
    });

    const ActivosList = [];
    Activos.forEach(data => { 
      ActivosList.push({
        taqActivos    : data.taqActivos,
        categoria_id  : data.categoria_id,
        nombre        : data.nombre, 
        descripcion   : data.descripcion,
        estado        : data.estado,
        serial        : data.serial,
        horasuso      : data.horasuso,
        urlImage      : data.urlImage
      });
    });

    const ComponentesList = [];
    Componentes.forEach(data => { 
      ComponentesList.push({
        taqComponente : data.taqComponente,
        categoria_id  : data.categoria_id,
        nombre        : data.nombre, 
        descripcion   : data.descripcion,
        estado        : data.estado,
        serial        : data.serial,
        horasuso      : data.horasuso,
        urlImage      : data.urlImage
      });
    });

    const RigsList = [];
    Rigs.forEach(data => { 
      RigsList.push({
        taqrig  : data.taqrig,
        nombre  : data.nombre,
      });
    });

    const MttosActivoList = [];
    Mantenimientos_activos.forEach(data => { 
      MttosActivoList.push({
        taqMantenimiento: data.taqMantenimiento,
        Nombre: data.Nombre,
        tipe: data.tipe,
        descripcion: data.descripcion,
      });
    });

    const MttosComponentesList = [];
    Mantenimientos_componentes.forEach(data => { 
      MttosComponentesList.push({
        taqMantenimiento: data.taqMantenimiento,
        Nombre: data.Nombre,
        tipe: data.tipe,
        descripcion: data.descripcion,
      });
    });

    const CargosList = [];
    Cargos.forEach(data => {  
      CargosList.push({
        cargo_id     : data.cargo_id ,
        cargo        : data.cargo,
        descripcion  : data.descripcion,
        responsables : data.responsables.length
      });
    });

    const ResponsablesList = [];
    Responsables.forEach(data => { 
      ResponsablesList.push({
        taqresponsable : data.taqresponsable,
        cargo_id       : data.cargo_id,
        nombre         : data.nombre,
        estado         : data.estado,
        urlImage       : data.urlImage
      });
    });
 
    const OmasList = [];
    Omas.forEach(data => {
      OmasList.push({
        taqom          : data.taqom,
        taqresponsable : data.taqresponsable,
        responsable    : data.responsable.nombre,
        Activo         : data.activos.nombre,
        fechainicio    : data.fechainicio,
        horainicio     : data.horainicio,
        fechafin       : data.fechafin,
        horafin        : data.horafin,
        tipo           : data.tipo,
        prioridad      : data.prioridad,
        estado         : data.estado,
        descripcion    : data.descripcion
      });
    });

    const OmcsList = [];
    Omcs.forEach(data => { 
      OmcsList.push({
        taqom          : data.taqom,
        taqresponsable : data.taqresponsable,
        responsable    : data.responsable.nombre,
        Componente     : data.componente.nombre,
        fechainicio    : data.fechainicio,
        horainicio     : data.horainicio,
        fechafin       : data.fechafin,
        horafin        : data.horafin,
        tipo           : data.tipo,
        prioridad      : data.prioridad,
        estado         : data.estado,
        descripcion    : data.descripcion
      });
    });

    const DocumentosList = [];
    Documentos.forEach(data => { 
      DocumentosList.push({
        taqDoc : data.taqDoc,
        nombre : data.nombre,
        url    : data.url,
      });
    });
        
    useEffect(() => {  
      setCategoriasActivoListFitltradas(CategoriasActivoList) 
    }, [CategoriasActivo])
    
    useEffect(() => {   
      setCategoriasComponenteListFitltradas(CategoriasComponenteList)
    }, [CategoriasComponentes])
    
    useEffect(() => {   
      setActivosFiltrados(ActivosList)
    }, [Activos])
    
    useEffect(() => {   
      setMantenimientosActivosFiltrados(MttosActivoList)
    }, [Mantenimientos_activos])

    useEffect(() => {   
      setMantenimientosComponentesFiltrados(MttosComponentesList)
    }, [Mantenimientos_componentes])

    useEffect(() => {   
      setComponentesFiltrados(ComponentesList)
    }, [Componentes])

    useEffect(() => {   
      setRigsFiltrados(RigsList)
    }, [Rigs])
    
    useEffect(() => {   
      setCargosFiltrados(CargosList)
    }, [Cargos])
    
    useEffect(() => {   
      setResponsablesFiltrados(ResponsablesList)
    }, [Responsables])
          
    useEffect(() => {   
      setDocumentosFiltrados(DocumentosList)
    }, [Documentos])

    useEffect(() => {
      setOmsCorrectivosFiltradas(MantenimientosCorrectivos)
    }, [Omas]);

    useEffect(() => {
      setOmsPreventivosFiltradas(MantenimientosPreventivos)
    }, [Omas]);
    
    useEffect(() => {
      setOmsDiseñoMejoraFiltrados(MantenimientosDiseñoMejora)
    }, [Omas]);

    useEffect(() => {
      setOmcsCorrectivosFiltradas(MantenimientosCorrectivosComponentes)
    }, [Omcs]);  

    useEffect(() => {
      setOmcsPreventivosFiltradas(MantenimientosPreventivosComponentes)
    }, [Omcs]);
    
    useEffect(() => {
      setOmcsDiseñoMejoraFiltrados(MantenimientosDiseñoMejoraComponentes)
    }, [Omcs]);
    
    const [MantenimientosActivosFiltrados, setMantenimientosActivosFiltrados] = useState();
    const FiltroMantenimientosActivos = ( searchTerm ) => {
      const filtered = MttosActivoList.filter((data) => {  
          const taqMantenimiento  = data.taqMantenimiento.toLowerCase();
          const Nombre            = data.Nombre.toLowerCase();
          const tipe              = data.tipe.toLowerCase();
          const descripcion       = data.descripcion.toLowerCase();
          return (
            taqMantenimiento.includes(searchTerm) ||
            Nombre.includes(searchTerm)           || 
            tipe.includes(searchTerm)             ||
            descripcion.includes(searchTerm) 
          );
      });
      setMantenimientosActivosFiltrados(filtered);
    };

    const [MantenimientosComponentesFiltrados, setMantenimientosComponentesFiltrados] = useState();
    const FiltroMantenimientosComponentes = ( searchTerm ) => {
      const filtered = MttosComponentesList.filter((data) => {  
          const taqMantenimiento  = data.taqMantenimiento.toLowerCase();
          const Nombre            = data.Nombre.toLowerCase();
          const tipe              = data.tipe.toLowerCase();
          const descripcion       = data.descripcion.toLowerCase();
          return (
            taqMantenimiento.includes(searchTerm) ||
            Nombre.includes(searchTerm)           || 
            tipe.includes(searchTerm)             ||
            descripcion.includes(searchTerm) 
          );
      });
      setMantenimientosComponentesFiltrados(filtered);
    };

    const [CategoriasActivoListFitltradas, setCategoriasActivoListFitltradas] = useState();
    const FiltroCategoriaActivo = ( searchTerm ) => {
      const filtered = CategoriasActivoList.filter((data) => {  
          const categoria_id = data.categoria_id.toLowerCase();
          const nombre       = data.nombre.toLowerCase();
          const Taq          = data.taq.toLowerCase();
          const componentes  = data.componentes.toLowerCase();
          return (
            categoria_id.includes(searchTerm) ||
            nombre.includes(searchTerm)       || 
            Taq.includes(searchTerm)          ||
            componentes.includes(searchTerm) 
          );
      });
      setCategoriasActivoListFitltradas(filtered);
    };

    const [CategoriasComponenteListFitltradas, setCategoriasComponenteListFitltradas] = useState();
    const FiltroCategoriaComponente = ( searchTerm ) => { 
      const filtered = CategoriasComponenteList.filter((data) => {  
          const categoria_id = data.categoria_id.toLowerCase();
          const nombre       = data.nombre.toLowerCase();
          const Taq          = data.taq.toLowerCase(); 
          const activo       = data.activo.toLowerCase(); 
          return (
            categoria_id.includes(searchTerm) ||
            nombre.includes(searchTerm)       || 
            Taq.includes(searchTerm)          ||
            activo.includes(searchTerm)
          );
      });
      setCategoriasComponenteListFitltradas(filtered);
    };

    const [ActivosFiltrados, setActivosFiltrados] = useState();
    const FiltroActivos = ( searchTerm ) => {
      const filtered = ActivosList.filter((data) => {  
          const taqActivos   = data.taqActivos.toLowerCase();
          const categoria_id = data.categoria_id.toLowerCase();
          const nombre       = data.nombre.toLowerCase(); 
          const descripcion  = data.descripcion.toLowerCase();
          const estado       = data.estado.toLowerCase();
          const serial       = data.serial.toLowerCase();
          const horasuso     = data.horasuso.toLowerCase();
          const urlImage     = data.urlImage.toLowerCase();
          return (
            categoria_id.includes(searchTerm) ||
            nombre.includes(searchTerm)       || 
            taqActivos.includes(searchTerm)   || 
            descripcion.includes(searchTerm)  || 
            estado.includes(searchTerm)       || 
            serial.includes(searchTerm)       || 
            horasuso.includes(searchTerm)     ||
            urlImage.includes(searchTerm) 
          );
      });
      setActivosFiltrados(filtered);
    };

    const [ComponentesFiltrados, setComponentesFiltrados] = useState();
    const FiltroComponentes = ( searchTerm ) => {
      const filtered = ComponentesList.filter((data) => {  
          const taqComponente = data.taqComponente.toLowerCase();
          const categoria_id  = data.categoria_id.toLowerCase();
          const nombre        = data.nombre.toLowerCase(); 
          const descripcion   = data.descripcion.toLowerCase();
          const estado        = data.estado.toLowerCase();
          const serial        = data.serial.toLowerCase();
          const horasuso      = data.horasuso.toLowerCase();
          const urlImage      = data.urlImage.toLowerCase();
          return (
            categoria_id.includes(searchTerm)  ||
            nombre.includes(searchTerm)        || 
            taqComponente.includes(searchTerm) || 
            descripcion.includes(searchTerm)   || 
            estado.includes(searchTerm)        || 
            serial.includes(searchTerm)        || 
            horasuso.includes(searchTerm)      ||            
            urlImage.includes(searchTerm)
          );
      });
      setComponentesFiltrados(filtered);
    };

    const [RigsFiltrados, setRigsFiltrados] = useState();
    const FiltroRigs = ( searchTerm ) => {
      const filtered = RigsList.filter((data) => {
          const taqrig  = data.taqrig.toLowerCase();
          const nombre  = data.nombre.toLowerCase();
          return (
            taqrig.includes(searchTerm)   ||
            nombre.includes(searchTerm)    
          );
      });
      setRigsFiltrados(filtered);
    };

    const [CargosFiltrados, setCargosFiltrados] = useState();
    const FiltroCargos = ( searchTerm ) => {
      const filtered = CargosList.filter((data) => {
          const taqrig  = data.taqrig.toLowerCase();
          const nombre  = data.nombre.toLowerCase();
          const responsables = data.responsables.toLowerCase();
          return (
            taqrig.includes(searchTerm)       ||
            nombre.includes(searchTerm)       ||
            responsables.includes(searchTerm)    
          );
      });
      setCargosFiltrados(filtered);
    };

    const [ResponsablesFiltrados, setResponsablesFiltrados] = useState();
    const FiltroResponsable = ( searchTerm ) => {
      const filtered = ResponsablesList.filter((data) => {
          const taqresponsable = data.taqresponsable.toLowerCase();
          const cargo_id       = data.cargo_id.toLowerCase();
          const nombre         = data.nombre.toLowerCase();
          const estado         = data.estado.toLowerCase();
          const urlImage       = data.urlImage.toLowerCase();
          return (
            taqresponsable.includes(searchTerm) ||
            nombre.includes(searchTerm)         ||
            cargo_id.includes(searchTerm)       ||
            estado.includes(searchTerm)         ||
            urlImage.includes(searchTerm)
          );
      });
      setResponsablesFiltrados(filtered);
    };

    const [DocumentosFiltrados, setDocumentosFiltrados] = useState();
    const FiltroDocumentos = ( searchTerm ) => {
      const filtered = DocumentosList.filter((data) => { 
          const taqDoc = data.taqDoc.toLowerCase();
          const nombre = data.nombre.toLowerCase();
          const url    = data.url.toLowerCase();
          return (
            taqDoc.includes(searchTerm) ||
            nombre.includes(searchTerm) ||
            url.includes(searchTerm)       
          );
      });
      setDocumentosFiltrados(filtered);
    };

    
  const MantenimientosPreventivos = OmasList.filter(
    (data) => data.tipo === "MTTO PREVENTIVO"
  );

  const [OmsPreventivosFiltradas, setOmsPreventivosFiltradas] = useState();
  const FiltroOmsPreventivos = ( searchTerm ) => {
    const filtered = MantenimientosPreventivos.filter((data) => { 
        const taqom          = data.taqom.toLowerCase(); 
        const taqresponsable = data.taqresponsable.toLowerCase();
        const responsable    = data.responsable.nombre.toLowerCase();
        const taqActivos     = data.taqActivos.toLowerCase();
        const fechainicio    = data.fechainicio.toLowerCase();
        const horainicio     = data.horainicio.toLowerCase();
        const fechafin       = data.fechafin.toLowerCase();
        const horafin        = data.horafin.toLowerCase();
        const tipo           = data.tipo.toLowerCase();
        const prioridad      = data.prioridad.toLowerCase();
        const estado         = data.estado.toLowerCase();
        const descripcion    = data.descripcion.toLowerCase();
        return (
          taqom.includes(searchTerm)           ||
          taqresponsable.includes(searchTerm)  ||
          responsable.includes(searchTerm)     ||
          taqActivos.includes(searchTerm)      ||
          fechainicio.includes(searchTerm)     ||
          horainicio.includes(searchTerm)      ||
          fechafin.includes(searchTerm)        ||
          horafin.includes(searchTerm)         ||
          tipo.includes(searchTerm)            ||
          prioridad.includes(searchTerm)       ||
          estado.includes(searchTerm)          ||
          descripcion.includes(searchTerm)
        );
    });
    setOmsPreventivosFiltradas(filtered);
  };

  const MantenimientosCorrectivos = OmasList.filter(
    (data) => data.tipo === "MTTO CORRECTIVO"
  );

  const [OmsCorrectivosFiltradas, setOmsCorrectivosFiltradas] = useState();
  const FiltroOmsCorrectivos = ( searchTerm ) => {
    const filtered = MantenimientosCorrectivos.filter((data) => { 
        const taqom          = data.taqom.toLowerCase(); 
        const taqresponsable = data.taqresponsable.toLowerCase();
        const responsable    = data.responsable.nombre.toLowerCase();
        const taqActivos     = data.taqActivos.toLowerCase();
        const fechainicio    = data.fechainicio.toLowerCase();
        const horainicio     = data.horainicio.toLowerCase();
        const fechafin       = data.fechafin.toLowerCase();
        const horafin        = data.horafin.toLowerCase();
        const tipo           = data.tipo.toLowerCase();
        const prioridad      = data.prioridad.toLowerCase();
        const estado         = data.estado.toLowerCase();
        const descripcion    = data.descripcion.toLowerCase();
        return (
          taqom.includes(searchTerm)           ||
          taqresponsable.includes(searchTerm)  ||
          responsable.includes(searchTerm)     ||
          taqActivos.includes(searchTerm)      ||
          fechainicio.includes(searchTerm)     ||
          horainicio.includes(searchTerm)      ||
          fechafin.includes(searchTerm)        ||
          horafin.includes(searchTerm)         ||
          tipo.includes(searchTerm)            ||
          prioridad.includes(searchTerm)       ||
          estado.includes(searchTerm)          ||
          descripcion.includes(searchTerm)
        );
    });
    setOmsCorrectivosFiltradas(filtered);
  };

  const MantenimientosDiseñoMejora = OmasList.filter(
    (data) => data.tipo === "MTTO DISEÑO O MEJORA"
  );

  const [OmsDiseñoMejoraFiltrados, setOmsDiseñoMejoraFiltrados] = useState();
  const FiltroDiseñoMejora = ( searchTerm ) => {
    const filtered = MantenimientosDiseñoMejora.filter((data) => { 
        const taqom          = data.taqom.toLowerCase(); 
        const taqresponsable = data.taqresponsable.toLowerCase();
        const responsable    = data.responsable.nombre.toLowerCase();
        const taqActivos     = data.taqActivos.toLowerCase();
        const fechainicio    = data.fechainicio.toLowerCase();
        const horainicio     = data.horainicio.toLowerCase();
        const fechafin       = data.fechafin.toLowerCase();
        const horafin        = data.horafin.toLowerCase();
        const tipo           = data.tipo.toLowerCase();
        const prioridad      = data.prioridad.toLowerCase();
        const estado         = data.estado.toLowerCase();
        const descripcion    = data.descripcion.toLowerCase();
        return (
          taqom.includes(searchTerm)           ||
          taqresponsable.includes(searchTerm)  ||
          responsable.includes(searchTerm)     ||
          taqActivos.includes(searchTerm)      ||
          fechainicio.includes(searchTerm)     ||
          horainicio.includes(searchTerm)      ||
          fechafin.includes(searchTerm)        ||
          horafin.includes(searchTerm)         ||
          tipo.includes(searchTerm)            ||
          prioridad.includes(searchTerm)       ||
          estado.includes(searchTerm)          ||
          descripcion.includes(searchTerm)
        );
    });
    setOmsDiseñoMejoraFiltrados(filtered);
  };
  
  const MantenimientosPreventivosComponentes = OmcsList.filter(
    (data) => data.tipo === "MTTO PREVENTIVO"
  );

  const [OmcsPreventivosFiltradas, setOmcsPreventivosFiltradas] = useState();
  const FiltroOmcsPreventivos = ( searchTerm ) => {
    const filtered = MantenimientosPreventivosComponentes.filter((data) => { 
        const taqom          = data.taqom.toLowerCase(); 
        const taqresponsable = data.taqresponsable.toLowerCase();
        const responsable    = data.responsable.nombre.toLowerCase();
        const Componente     = data.Componente.toLowerCase();
        const fechainicio    = data.fechainicio.toLowerCase();
        const horainicio     = data.horainicio.toLowerCase();
        const fechafin       = data.fechafin.toLowerCase();
        const horafin        = data.horafin.toLowerCase();
        const tipo           = data.tipo.toLowerCase();
        const prioridad      = data.prioridad.toLowerCase();
        const estado         = data.estado.toLowerCase();
        const descripcion    = data.descripcion.toLowerCase();
        return (
          taqom.includes(searchTerm)           ||
          taqresponsable.includes(searchTerm)  ||
          responsable.includes(searchTerm)     ||
          Componente.includes(searchTerm)      ||
          fechainicio.includes(searchTerm)     ||
          horainicio.includes(searchTerm)      ||
          fechafin.includes(searchTerm)        ||
          horafin.includes(searchTerm)         ||
          tipo.includes(searchTerm)            ||
          prioridad.includes(searchTerm)       ||
          estado.includes(searchTerm)          ||
          descripcion.includes(searchTerm)
        );
    });
    setOmcsPreventivosFiltradas(filtered);
  };

  const MantenimientosCorrectivosComponentes = OmcsList.filter(
    (data) => data.tipo === "MTTO CORRECTIVO"
  );

  const [OmcsCorrectivosFiltradas, setOmcsCorrectivosFiltradas] = useState();
  const FiltroOmcsCorrectivos = ( searchTerm ) => {
    const filtered = MantenimientosCorrectivosComponentes.filter((data) => { 
        const taqom          = data.taqom.toLowerCase(); 
        const taqresponsable = data.taqresponsable.toLowerCase();
        const responsable    = data.responsable.nombre.toLowerCase();
        const Componente     = data.Componente.toLowerCase();
        const fechainicio    = data.fechainicio.toLowerCase();
        const horainicio     = data.horainicio.toLowerCase();
        const fechafin       = data.fechafin.toLowerCase();
        const horafin        = data.horafin.toLowerCase();
        const tipo           = data.tipo.toLowerCase();
        const prioridad      = data.prioridad.toLowerCase();
        const estado         = data.estado.toLowerCase();
        const descripcion    = data.descripcion.toLowerCase();
        return (
          taqom.includes(searchTerm)           ||
          taqresponsable.includes(searchTerm)  ||
          responsable.includes(searchTerm)     ||
          Componente.includes(searchTerm)      ||
          fechainicio.includes(searchTerm)     ||
          horainicio.includes(searchTerm)      ||
          fechafin.includes(searchTerm)        ||
          horafin.includes(searchTerm)         ||
          tipo.includes(searchTerm)            ||
          prioridad.includes(searchTerm)       ||
          estado.includes(searchTerm)          ||
          descripcion.includes(searchTerm)
        );
    });
    setOmcsCorrectivosFiltradas(filtered);
  };

  const MantenimientosDiseñoMejoraComponentes = OmcsList.filter(
    (data) => data.tipo === "MTTO DISEÑO O MEJORA"
  );

  const [OmcsDiseñoMejoraFiltrados, setOmcsDiseñoMejoraFiltrados] = useState();
  const FiltroDiseñoMejoraComponentes = ( searchTerm ) => {
    const filtered = MantenimientosDiseñoMejoraComponentes.filter((data) => { 
        const taqom          = data.taqom.toLowerCase(); 
        const taqresponsable = data.taqresponsable.toLowerCase();
        const responsable    = data.responsable.nombre.toLowerCase();
        const Componente     = data.Componente.toLowerCase();
        const fechainicio    = data.fechainicio.toLowerCase();
        const horainicio     = data.horainicio.toLowerCase();
        const fechafin       = data.fechafin.toLowerCase();
        const horafin        = data.horafin.toLowerCase();
        const tipo           = data.tipo.toLowerCase();
        const prioridad      = data.prioridad.toLowerCase();
        const estado         = data.estado.toLowerCase();
        const descripcion    = data.descripcion.toLowerCase();
        return (
          taqom.includes(searchTerm)           ||
          taqresponsable.includes(searchTerm)  ||
          responsable.includes(searchTerm)     ||
          Componente.includes(searchTerm)      ||
          fechainicio.includes(searchTerm)     ||
          horainicio.includes(searchTerm)      ||
          fechafin.includes(searchTerm)        ||
          horafin.includes(searchTerm)         ||
          tipo.includes(searchTerm)            ||
          prioridad.includes(searchTerm)       ||
          estado.includes(searchTerm)          ||
          descripcion.includes(searchTerm)
        );
    });
    setOmcsDiseñoMejoraFiltrados(filtered);
  };
 
  return (
    <main className='w-full h-screen overflow-hidden bg-gray-200 flex flex-col xl:flex-row '>
      <MenuAppbar Buttons = { Buttons } Default = { ShowDefault } /> 
      <div className='w-full xl:w-[80%] h-full overflow-y-auto xl:p-4'> 
        {
          CategoriasActivoPanel ? (
            <div key = {`CategoriaActivoPanel`} className='w-full h-full flex flex-col justify-start items-center justify-items-center gap-2 p-4 overflow-y-auto'>
              <div className='w-full h-auto flex flex-col sm:flex-row justify-center items-center gap-3 px-2 py-1'>
                <SearchInput SearchFunction = { FiltroCategoriaActivo } />
                <div onClick = { () => setShowModal(true) } className='w-full sm:w-auto h-auto text-center flex justify-center items-center px-2 py-1 border border-black hover:border-white rounded-md text-sm bg-green-500 hover:bg-green-800 text-white cursor-pointer duration-700 ease-in-out'>
                  Agregar Nueva Categoria de Activo
                </div> 
              </div>
              <div className={`w-full h-full flex flex-col justify-start items-center gap-2 py-1 px-4  overflow-hidden overflow-y-auto`}>
                { 
                  CategoriasActivoListFitltradas ? (
                    CategoriasActivoListFitltradas.map((data) => (
                      <Link key = { data.categoria_id } href={`categorias/activo/${data.categoria_id}`} className={`w-full h-auto cursor-pointer transition duration-700 ease-in-out px-4 py-2 bg-white font-bold text-black  rounded-md border border-[#385449] flex justify-between items-center gap-2`}>
                        <div className='w-full flex justify-between'>
                            <div>
                                {data.nombre}
                            </div>
                            <div>
                                Activos: { data.activos }
                            </div>
                        </div>
                      </Link> 
                    ))
                  ) : null
                }
              </div>
            </div>
          ) : null
        }
        {
          CategoriasComponentePanel ? (
            <div key = {`CategoriaComponentePanel`} className='w-full h-full flex flex-col justify-start items-center justify-items-center gap-2 p-4 overflow-y-auto'>
              <div className='w-full h-auto flex flex-col sm:flex-row justify-center items-center gap-3 px-2 py-1'>
                <SearchInput SearchFunction = { FiltroCategoriaComponente } />
                <div onClick = { () => setShowModal(true) } className='w-full sm:w-auto h-auto text-center flex justify-center items-center px-2 py-1 border border-black hover:border-white rounded-md text-sm bg-green-500 hover:bg-green-800 text-white cursor-pointer duration-700 ease-in-out'>
                  Agregar Nueva Categoria de Componente
                </div> 
              </div>
              <div className={`w-full h-full flex flex-col justify-start items-center gap-2 py-1 px-4  overflow-hidden overflow-y-auto`}>
                { 
                  CategoriasComponenteListFitltradas ? (
                    CategoriasComponenteListFitltradas.map((data) => (
                      <Link key = { data.categoria_id } href={`/categorias/componente/${data.categoria_id}`} className={`w-full h-auto cursor-pointer transition duration-700 ease-in-out px-4 py-2 bg-white font-bold text-black  rounded-md border border-[#385449] flex justify-between items-center gap-2`}>
                        <div className='w-full flex justify-between'>
                            <div>
                                {data.nombre}
                            </div>
                            <div>
                                Componentes: { data.componentes }
                            </div>
                        </div>
                      </Link> 
                    ))
                  ) : null
                }
              </div>
            </div>
          ) : null
        }
        {
          ActivosPanel ? (
            <div key = {`ActivoPanel`} className='w-full h-full flex flex-col justify-start items-center justify-items-center gap-2 p-4 overflow-y-auto'>
              <div className='w-full h-auto flex flex-col sm:flex-row justify-center items-center gap-3 px-2 py-1'>
                <SearchInput SearchFunction = { FiltroActivos } />
                <div onClick = { () => setShowModal(true) } className='w-full sm:w-auto h-auto text-center flex justify-center items-center px-2 py-1 border border-black hover:border-white rounded-md text-sm bg-green-500 hover:bg-green-800 text-white cursor-pointer duration-700 ease-in-out'>
                  Agregar Nuevo Activo
                </div> 
              </div>
              <div className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6`}>
                { 
                  ActivosFiltrados ? (
                    ActivosFiltrados.map((data) => (
                      <>
                        {
                          data.urlImage != 'default-image.jpg' ? (
                            <CardGeneral
                              link = {`https://gworks.gematech.co/storage/Activos/${data.taqActivos}/${data.urlImage}`}
                              nombre={`${data.serial} ${data.nombre} `}
                              route={`/activo/${data.taqActivos}`}
                              key={data.taqActivos}
                            />
                          ) : (
                            <CardGeneral
                              link = {`https://gworks.gematech.co/storage/default-image.jpg`}
                              nombre={`${data.serial} ${data.nombre} `}
                              route={`/activo/${data.taqActivos}`}
                              key={data.taqActivos}
                            />
                          ) 
                        }
                      </>
                    ))
                  ) : null
                }
              </div>
            </div>
          ) : null
        }
        {
          MttosPanel ? (
            <div key={`MttosPanel`} className='w-full h-full  p-4 flex flex-col justify-start items-center '>
              <div className='w-full h-[70px]  flex justify-between px-4 py-2 gap-3'>
                <div onClick={() => ShowMantenimientosActivos() }  className={`w-1/2 h-full ${ MantenimientosActivo ? 'bg-[#ce1241]' : 'bg-[#385449] ' } border-2 cursor-pointer rounded-sm transition duration-700 ease-in-out hover:scale-105 hover:bg-[#ce1241] flex justify-between px-4 items-center text-white`}>
                  <span> Mantenimientos Activo </span>
                  <span> { Mantenimientos_activos.length } </span>
                </div>
                <div onClick={() => ShowMantenimientosComponentes() }  className={`w-1/2 h-full ${ MantenimientosComponentes ? 'bg-[#ce1241]' : 'bg-[#385449] ' } border-2 cursor-pointer rounded-sm transition duration-700 ease-in-out hover:scale-105 hover:bg-[#ce1241] flex justify-between px-4 items-center text-white`}>
                  <span> Mantenimientos Componentes </span>
                  <span> { Mantenimientos_componentes.length } </span>
                </div>
              </div>
              {
                MantenimientosActivo ? (
                  <div key = {`MantenimientosActivosPanel`} className='w-full h-full flex flex-col justify-start items-center justify-items-center gap-2 p-4 overflow-y-auto'>
                    <div className='w-full h-auto flex flex-col sm:flex-row justify-center items-center gap-3 px-2 py-1'>
                      <SearchInput SearchFunction = { FiltroMantenimientosActivos } />
                      <div onClick = { () => setShowModal(true) } className='w-full sm:w-auto h-auto text-center flex justify-center items-center px-2 py-1 border border-black hover:border-white rounded-md text-sm bg-green-500 hover:bg-green-800 text-white cursor-pointer duration-700 ease-in-out'>
                        Agregar Nuevo
                      </div> 
                    </div>
                    <div className={`w-full h-full flex flex-col justify-start items-center gap-2 py-1 px-4  overflow-hidden overflow-y-auto`}>
                      {
                        MantenimientosActivosFiltrados ? (
                          MantenimientosActivosFiltrados.map((data) => (
                            <Link href={`/mantenimiento/activo/show/${data.taqMantenimiento}`} className='w-full h-auto flex justify-between items-center bg-white border border-black px-4 py-2 cursor-pointer hover:bg-gray-800 hover:text-white transition duration-700 ease-in-out'>
                                <div className='w-full flex justify-between items-center'>
                                    <div className='w-[80%] flex flex-col gap-3'>
                                        <span className='text-red-500 font-semibold'> { data.Nombre } </span>
                                        <span> { data.descripcion } </span>
                                    </div>
                                    <div className='w-[20%]'>
                                        {data.tipe} 
                                    </div>
                                </div>
                            </Link>
                          ))
                        ) : null
                      }
                    </div>
                  </div>
                ) : null
              }
              {
                MantenimientosComponentes ? (
                  <div key = {`MantenimientosComponentesPanel`} className='w-full h-full flex flex-col justify-start items-center justify-items-center gap-2 p-4 overflow-y-auto'>
                    <div className='w-full h-auto flex flex-col sm:flex-row justify-center items-center gap-3 px-2 py-1'>
                      <SearchInput SearchFunction = { FiltroMantenimientosComponentes } />
                      <div onClick = { () => setShowModal(true) } className='w-full sm:w-auto h-auto text-center flex justify-center items-center px-2 py-1 border border-black hover:border-white rounded-md text-sm bg-green-500 hover:bg-green-800 text-white cursor-pointer duration-700 ease-in-out'>
                        Agregar Nuevo
                      </div> 
                    </div>
                    <div className={`w-full h-full flex flex-col justify-start items-center gap-2 py-1 px-4  overflow-hidden overflow-y-auto`}>
                      { 
                        MantenimientosComponentesFiltrados ? (
                          MantenimientosComponentesFiltrados.map((data) => (
                            <Link href={`/mantenimiento/componente/show/${data.taqMantenimiento}`} className='w-full h-auto flex justify-between items-center bg-white border border-black px-4 py-2 cursor-pointer hover:bg-gray-800 hover:text-white transition duration-700 ease-in-out'>
                              <div className='w-full flex justify-between items-center'>
                                  <div className='w-[80%] flex flex-col gap-3'>
                                      <span className='text-red-500 font-semibold'> { data.Nombre } </span>
                                      <span> { data.descripcion } </span>
                                  </div>
                                  <div className='w-[20%]'>
                                      {data.tipe} 
                                  </div>
                              </div>
                            </Link>
                          ))
                        ) : null
                      }
                    </div>
                  </div>
                ) : null
              }
              {
                OmasDiseñoMejoraPanel ? (
                  <div key = {`OmsPreventivaPanel`} className='w-full h-full flex flex-col justify-start items-center justify-items-center gap-2 p-4 overflow-y-auto'>
                    <div className='w-full h-auto flex flex-col sm:flex-row justify-center items-center gap-3 px-2 py-1'>
                      <SearchInput SearchFunction = { FiltroDiseñoMejora } />
                      <div onClick = { () => setShowModal(true) } className='w-full sm:w-auto h-auto text-center flex justify-center items-center px-2 py-1 border border-black hover:border-white rounded-md text-sm bg-green-500 hover:bg-green-800 text-white cursor-pointer duration-700 ease-in-out'>
                        Agregar Nuevo
                      </div> 
                    </div>
                    <div className={`w-full h-full flex flex-col justify-start items-center gap-2 py-1 px-4  overflow-hidden overflow-y-auto`}>
                      { 
                        OmsDiseñoMejoraFiltrados ? (
                          OmsDiseñoMejoraFiltrados.map((data) => (
                            <Link key={data.taqom} href={`/omas/${data.taqom}`} className='w-full h-auto flex  justify-between items-center bg-white border border-black px-4 py-2 cursor-pointer hover:bg-gray-800 hover:text-white transition duration-700 ease-in-out'>
                              <div className='w-full flex flex-col sm:flex-row  justify-between sm:items-center items-start'>
                                  <div className='w-full sm:w-[80%] flex flex-col gap-3'>
                                      <span className={`${data.estado === 'EN PROCESO' ? 'text-red-500' : 'text-green-500' } font-semibold`}> { data.taqom } </span>
                                      <span> { data.descripcion } </span>
                                  </div>
                                  <div className='w-full sm:w-[20%] text-center'>
                                      RESPONSABLE: { data.responsable }
                                  </div>
                              </div>
                            </Link>
                          ))
                        ) : null
                      }
                    </div>
                  </div>
                ) : null
              }
            </div>
          ) : null
        } 
        {
          ComponentesPanel ? (
            <div key = {`ComponentesPanel`} className='w-full h-full flex flex-col justify-start items-center justify-items-center gap-2 p-4 overflow-y-auto'>
              <div className='w-full h-auto flex flex-col sm:flex-row justify-center items-center gap-3 px-2 py-1'>
                <SearchInput SearchFunction = { FiltroComponentes } />
                <div onClick = { () => setShowModal(true) } className='w-full sm:w-auto h-auto text-center flex justify-center items-center px-2 py-1 border border-black hover:border-white rounded-md text-sm bg-green-500 hover:bg-green-800 text-white cursor-pointer duration-700 ease-in-out'>
                  Agregar Nuevo Componente
                </div> 
              </div>
              <div className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6`}>
                { 
                  ComponentesFiltrados ? (
                    ComponentesFiltrados.map((data) => (  
                      <>
                        {
                          data.urlImage != 'default-image.jpg' ? (
                            <CardGeneral
                              link = {`https://gworks.gematech.co/storage/Componentes/${data.taqComponente}/${data.urlImage}`}
                              nombre={`${data.nombre} - SERIAL: ${data.serial}`}
                              route={`/componente/${data.taqComponente}`}
                              key={data.taqComponente}
                            />
                          ) : (
                            <CardGeneral
                              link = {`https://gworks.gematech.co/storage/default-image.jpg`}
                              nombre={`${data.nombre} - SERIAL: ${data.serial}`}
                              route={`/componente/${data.taqComponente}`}
                              key={data.taqComponente}
                            />
                          ) 
                        }
                      </>
                    ))
                  ) : null
                }
              </div>
            </div>
          ) : null
        }
        {
          RigsPanel ? (
            <div key = {`RigsPanel`} className='w-full h-full flex flex-col justify-start items-center justify-items-center gap-2 p-4 overflow-y-auto'>
              <div className='w-full h-auto flex flex-col sm:flex-row justify-center items-center gap-3 px-2 py-1'>
                <SearchInput SearchFunction = { FiltroRigs } />
                <div onClick = { () => setShowModal(true) } className='w-full sm:w-auto h-auto text-center flex justify-center items-center px-2 py-1 border border-black hover:border-white rounded-md text-sm bg-green-500 hover:bg-green-800 text-white cursor-pointer duration-700 ease-in-out'>
                  Agregar Nuevo Rig
                </div> 
              </div>
              <div className={`w-full h-full flex flex-col justify-start items-center gap-2 py-1 px-4  overflow-hidden overflow-y-auto`}>
                { 
                  RigsFiltrados ? (
                    RigsFiltrados.map((data) => (
                      <Link key = { data.taqrig } href={`/rigs/show/${data.taqrig}`} className={`w-full h-auto cursor-pointer transition duration-700 ease-in-out px-4 py-2 bg-white font-bold text-black  rounded-md border border-[#385449] flex justify-between items-center gap-2`}>
                        <div className='w-full flex justify-between'>
                            <div>
                                { data.nombre }
                            </div>
                        </div>
                      </Link>
                    ))
                  ) : null
                }
              </div>
            </div>
          ) : null
        }
        {
          CargosPanel ? (
            <div key = {`CargosPanel`} className='w-full h-full flex flex-col justify-start items-center justify-items-center gap-2 p-4 overflow-y-auto'>
              <div className='w-full h-auto flex flex-col sm:flex-row justify-center items-center gap-3 px-2 py-1'>
                <SearchInput SearchFunction = { FiltroCargos } />
                <div onClick = { () => setShowModal(true) } className='w-full sm:w-auto h-auto text-center flex justify-center items-center px-2 py-1 border border-black hover:border-white rounded-md text-sm bg-green-500 hover:bg-green-800 text-white cursor-pointer duration-700 ease-in-out'>
                  Agregar Nuevo Cargo
                </div> 
              </div>
              <div className={`w-full h-full flex flex-col justify-start items-center gap-2 py-1 px-4  overflow-hidden overflow-y-auto`}>
                { 
                  CargosFiltrados ? (
                    CargosFiltrados.map((data) => (
                      <Link key = { data.cargo_id } href={`/cargo/show/${data.cargo_id}`} className={`w-full h-auto cursor-pointer transition duration-700 ease-in-out px-4 py-2 bg-white font-bold text-black  rounded-md border border-[#385449] flex justify-between items-center gap-2`}>
                        <div className='w-full flex justify-between'>
                            <div>
                                {data.cargo}
                            </div>
                            <div>
                                Responsables: { data.responsables }
                            </div>
                        </div>
                      </Link>
                    ))
                  ) : null
                }
              </div>
            </div>
          ) : null
        }
        {
          ResponsablesPanel ? (
            <div key = {`ResponsablesPanel`} className='w-full h-full flex flex-col justify-start items-center justify-items-center gap-2 p-4 overflow-y-auto'>
              <div className='w-full h-auto flex flex-col sm:flex-row justify-center items-center gap-3 px-2 py-1'>
                <SearchInput SearchFunction = { FiltroResponsable } />
                <div onClick = { () => setShowModal(true) } className='w-full sm:w-auto h-auto text-center flex justify-center items-center px-2 py-1 border border-black hover:border-white rounded-md text-sm bg-green-500 hover:bg-green-800 text-white cursor-pointer duration-700 ease-in-out'>
                  Agregar Nuevo Responsable
                </div> 
              </div>
              <div className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6`}>
                { 
                  ResponsablesFiltrados ? (
                    ResponsablesFiltrados.map((data) => ( 
                      <>
                        {
                          data.urlImage != 'default-image.jpg' ? (
                            <CardGeneral
                              link   = {`https://gworks.gematech.co/storage/Responsables/${data.taqresponsable}/${data.Image}`}
                              nombre = {`${data.nombre}`}
                              route  = {`/responsables/${data.taqresponsable}`}
                              key    = {data.taqresponsable}
                            />
                          ) : (
                            <CardGeneral
                              link = {`https://gworks.gematech.co/storage/default-image.jpg`}
                              nombre = {`${data.nombre}`}
                              route  = {`/responsables/${data.taqresponsable}`}
                              key    = {data.taqresponsable}
                            />
                          ) 
                        }
                      </>
                    ))
                  ) : null
                }
              </div>
            </div>
          ) : null
        }
        {
          OmasPanel ? (
            <div key={`OmasPanel`} className='w-full h-full  p-4 flex flex-col justify-start items-center '>
              <div className='w-full h-[70px]  flex justify-between px-4 py-2 gap-3'>
                <div onClick={() => ShowMantenimientosPreventivos() }  className={`w-1/3 h-full ${ OmasPreventivasPanel ? 'bg-[#ce1241]' : 'bg-[#385449] ' } border-2 cursor-pointer rounded-sm transition duration-700 ease-in-out hover:scale-105 hover:bg-[#ce1241] flex justify-between px-4 items-center text-white`}>
                  <span> Mantenimientos Preventivos </span>
                  <span> { MantenimientosPreventivos.length } </span>
                </div>
                <div onClick={() => ShowMantenimientosCorrectivos() }  className={`w-1/3 h-full ${ OmasCorrectivasPanel ? 'bg-[#ce1241]' : 'bg-[#385449] ' } border-2 cursor-pointer rounded-sm transition duration-700 ease-in-out hover:scale-105 hover:bg-[#ce1241] flex justify-between px-4 items-center text-white`}>
                  <span> Mantenimientos Correctivos </span>
                  <span> { MantenimientosCorrectivos.length } </span>
                </div>
                <div onClick={() => ShowMantenimientosDiseñoMejora() }  className={`w-1/3 h-full ${ OmasDiseñoMejoraPanel ? 'bg-[#ce1241]' : 'bg-[#385449] ' } border-2 cursor-pointer rounded-sm transition duration-700 ease-in-out hover:scale-105 hover:bg-[#ce1241] flex justify-between px-4 items-center text-white`}>
                  <span> Diseño / Mejora </span>
                  <span> { MantenimientosDiseñoMejora.length } </span>
                </div>
              </div>
              {
                OmasPreventivasPanel ? (
                  <div key = {`OmsPreventivaPanel`} className='w-full h-full flex flex-col justify-start items-center justify-items-center gap-2 p-4 overflow-y-auto'>
                    <div className='w-full h-auto flex flex-col sm:flex-row justify-center items-center gap-3 px-2 py-1'>
                      <SearchInput SearchFunction = { FiltroOmsPreventivos } />
                      <div onClick = { () => setShowModal(true) } className='w-full sm:w-auto h-auto text-center flex justify-center items-center px-2 py-1 border border-black hover:border-white rounded-md text-sm bg-green-500 hover:bg-green-800 text-white cursor-pointer duration-700 ease-in-out'>
                        Agregar Nuevo
                      </div> 
                    </div>
                    <div className={`w-full h-full flex flex-col justify-start items-center gap-2 py-1 px-4  overflow-hidden overflow-y-auto`}>
                      { 
                        OmsPreventivosFiltradas ? (
                          OmsPreventivosFiltradas.map((data) => (
                            <Link key={data.taqom} href={`/omas/${data.taqom}`} className='w-full h-auto flex  justify-between items-center bg-white border border-black px-4 py-2 cursor-pointer hover:bg-gray-800 hover:text-white transition duration-700 ease-in-out'>
                              <div className='w-full flex flex-col sm:flex-row  justify-between sm:items-center items-start'>
                                  <div className='w-full sm:w-[80%] flex flex-col gap-3'>
                                      <span className={`${data.estado === 'EN PROCESO' ? 'text-red-500' : 'text-green-500' } font-semibold`}> { data.taqom } </span>
                                      <span> { data.descripcion } </span>
                                  </div>
                                  <div className='w-full sm:w-[20%] text-center'>
                                      RESPONSABLE: { data.responsable }
                                  </div>
                              </div>
                            </Link>
                          ))
                        ) : null
                      }
                    </div>
                  </div>
                ) : null
              }
              {
                OmasCorrectivasPanel ? (
                  <div key = {`OmsCorrectivaPanel`} className='w-full h-full flex flex-col justify-start items-center justify-items-center gap-2 p-4 overflow-y-auto'>
                    <div className='w-full h-auto flex flex-col sm:flex-row justify-center items-center gap-3 px-2 py-1'>
                      <SearchInput SearchFunction = { FiltroOmsCorrectivos } />
                      <div onClick = { () => setShowModal(true) } className='w-full sm:w-auto h-auto text-center flex justify-center items-center px-2 py-1 border border-black hover:border-white rounded-md text-sm bg-green-500 hover:bg-green-800 text-white cursor-pointer duration-700 ease-in-out'>
                        Agregar Nuevo
                      </div> 
                    </div>
                    <div className={`w-full h-full flex flex-col justify-start items-center gap-2 py-1 px-4  overflow-hidden overflow-y-auto`}>
                      { 
                        OmsCorrectivosFiltradas ? (
                          OmsCorrectivosFiltradas.map((data) => (
                            <Link key={data.taqom} href={`/omas/${data.taqom}`} className='w-full h-auto flex  justify-between items-center bg-white border border-black px-4 py-2 cursor-pointer hover:bg-gray-800 hover:text-white transition duration-700 ease-in-out'>
                              <div className='w-full flex flex-col sm:flex-row  justify-between sm:items-center items-start'>
                                  <div className='w-full sm:w-[80%] flex flex-col gap-3'>
                                      <span className={`${data.estado === 'EN PROCESO' ? 'text-red-500' : 'text-green-500' } font-semibold`}> { data.taqom } </span>
                                      <span> { data.descripcion } </span>
                                  </div>
                                  <div className='w-full sm:w-[20%] text-center'>
                                      RESPONSABLE: { data.responsable }
                                  </div>
                              </div>
                            </Link>
                          ))
                        ) : null
                      }
                    </div>
                  </div>
                ) : null
              }
              {
                OmasDiseñoMejoraPanel ? (
                  <div key = {`OmsPreventivaPanel`} className='w-full h-full flex flex-col justify-start items-center justify-items-center gap-2 p-4 overflow-y-auto'>
                    <div className='w-full h-auto flex flex-col sm:flex-row justify-center items-center gap-3 px-2 py-1'>
                      <SearchInput SearchFunction = { FiltroDiseñoMejora } />
                      <div onClick = { () => setShowModal(true) } className='w-full sm:w-auto h-auto text-center flex justify-center items-center px-2 py-1 border border-black hover:border-white rounded-md text-sm bg-green-500 hover:bg-green-800 text-white cursor-pointer duration-700 ease-in-out'>
                        Agregar Nuevo
                      </div> 
                    </div>
                    <div className={`w-full h-full flex flex-col justify-start items-center gap-2 py-1 px-4  overflow-hidden overflow-y-auto`}>
                      { 
                        OmsDiseñoMejoraFiltrados ? (
                          OmsDiseñoMejoraFiltrados.map((data) => (
                            <Link key={data.taqom} href={`/omas/${data.taqom}`} className='w-full h-auto flex  justify-between items-center bg-white border border-black px-4 py-2 cursor-pointer hover:bg-gray-800 hover:text-white transition duration-700 ease-in-out'>
                              <div className='w-full flex flex-col sm:flex-row  justify-between sm:items-center items-start'>
                                  <div className='w-full sm:w-[80%] flex flex-col gap-3'>
                                      <span className={`${data.estado === 'EN PROCESO' ? 'text-red-500' : 'text-green-500' } font-semibold`}> { data.taqom } </span>
                                      <span> { data.descripcion } </span>
                                  </div>
                                  <div className='w-full sm:w-[20%] text-center'>
                                      RESPONSABLE: { data.responsable }
                                  </div>
                              </div>
                            </Link>
                          ))
                        ) : null
                      }
                    </div>
                  </div>
                ) : null
              }
            </div>
          ) : null
        }
        {
          OmcsPanel ? (
            <div key={`OmcsPanel`} className='w-full h-full  p-4 flex flex-col justify-start items-center '>
              <div className='w-full h-[70px]  flex justify-between px-4 py-2 gap-3'>
                <div onClick={() => ShowMantenimientosPreventivosComponentes() }  className={`w-1/3 h-full ${ OmcsPreventivasPanel ? 'bg-[#ce1241]' : 'bg-[#385449] ' } border-2 cursor-pointer rounded-sm transition duration-700 ease-in-out hover:scale-105 hover:bg-[#ce1241] flex justify-between px-4 items-center text-white`}>
                  <span> Mantenimientos Preventivos </span>
                  <span> { MantenimientosPreventivosComponentes.length } </span>
                </div>
                <div onClick={() => ShowMantenimientosCorrectivosComponentes() }  className={`w-1/3 h-full ${ OmcsCorrectivasPanel ? 'bg-[#ce1241]' : 'bg-[#385449] ' } border-2 cursor-pointer rounded-sm transition duration-700 ease-in-out hover:scale-105 hover:bg-[#ce1241] flex justify-between px-4 items-center text-white`}>
                  <span> Mantenimientos Correctivos </span>
                  <span> { MantenimientosCorrectivosComponentes.length } </span>
                </div>
                <div onClick={() => ShowMantenimientosDiseñoMejoraComponentes() }  className={`w-1/3 h-full ${ OmcsDiseñoMejoraPanel ? 'bg-[#ce1241]' : 'bg-[#385449] ' } border-2 cursor-pointer rounded-sm transition duration-700 ease-in-out hover:scale-105 hover:bg-[#ce1241] flex justify-between px-4 items-center text-white`}>
                  <span> Diseño / Mejora </span>
                  <span> { MantenimientosDiseñoMejoraComponentes.length } </span>
                </div>
              </div>
              {
                OmcsPreventivasPanel ? (
                  <div key = {`OmsPreventivaPanel`} className='w-full h-full flex flex-col justify-start items-center justify-items-center gap-2 p-4 overflow-y-auto'>
                    <div className='w-full h-auto flex flex-col sm:flex-row justify-center items-center gap-3 px-2 py-1'>
                      <SearchInput SearchFunction = { FiltroOmcsPreventivos } />
                      <div onClick = { () => setShowModal(true) } className='w-full sm:w-auto h-auto text-center flex justify-center items-center px-2 py-1 border border-black hover:border-white rounded-md text-sm bg-green-500 hover:bg-green-800 text-white cursor-pointer duration-700 ease-in-out'>
                        Agregar Nuevo
                      </div> 
                    </div>
                    <div className={`w-full h-full flex flex-col justify-start items-center gap-2 py-1 px-4  overflow-hidden overflow-y-auto`}>
                      { 
                        OmcsPreventivosFiltradas ? (
                          OmcsPreventivosFiltradas.map((data) => (
                            <Link key={data.taqom} href={`/omcs/${data.taqom}`} className='w-full h-auto flex  justify-between items-center bg-white border border-black px-4 py-2 cursor-pointer hover:bg-gray-800 hover:text-white transition duration-700 ease-in-out'>
                              <div className='w-full flex flex-col sm:flex-row  justify-between sm:items-center items-start'>
                                  <div className='w-full sm:w-[80%] flex flex-col gap-3'>
                                      <span className={`${data.estado === 'EN PROCESO' ? 'text-red-500' : 'text-green-500' } font-semibold`}> { data.taqom } </span>
                                      <span> { data.descripcion } </span>
                                  </div>
                                  <div className='w-full sm:w-[20%] text-center'>
                                      RESPONSABLE: { data.responsable }
                                  </div>
                              </div>
                            </Link>
                          ))
                        ) : null
                      }
                    </div>
                  </div>
                ) : null
              }
              {
                OmcsCorrectivasPanel ? (
                  <div key = {`OmcsCorrectivaPanel`} className='w-full h-full flex flex-col justify-start items-center justify-items-center gap-2 p-4 overflow-y-auto'>
                    <div className='w-full h-auto flex flex-col sm:flex-row justify-center items-center gap-3 px-2 py-1'>
                      <SearchInput SearchFunction = { FiltroOmcsCorrectivos} />
                      <div onClick = { () => setShowModal(true) } className='w-full sm:w-auto h-auto text-center flex justify-center items-center px-2 py-1 border border-black hover:border-white rounded-md text-sm bg-green-500 hover:bg-green-800 text-white cursor-pointer duration-700 ease-in-out'>
                        Agregar Nuevo
                      </div> 
                    </div>
                    <div className={`w-full h-full flex flex-col justify-start items-center gap-2 py-1 px-4  overflow-hidden overflow-y-auto`}>
                      { 
                        OmcsCorrectivosFiltradas ? (
                          OmcsCorrectivosFiltradas.map((data) => (
                            <Link key={data.taqom} href={`/omcs/${data.taqom}`} className='w-full h-auto flex  justify-between items-center bg-white border border-black px-4 py-2 cursor-pointer hover:bg-gray-800 hover:text-white transition duration-700 ease-in-out'>
                              <div className='w-full flex flex-col sm:flex-row  justify-between sm:items-center items-start'>
                                  <div className='w-full sm:w-[80%] flex flex-col gap-3'>
                                      <span className={`${data.estado === 'EN PROCESO' ? 'text-red-500' : 'text-green-500' } font-semibold`}> { data.taqom } </span>
                                      <span> { data.descripcion } </span>
                                  </div>
                                  <div className='w-full sm:w-[20%] text-center'>
                                      RESPONSABLE: { data.responsable }
                                  </div>
                              </div>
                            </Link>
                          ))
                        ) : null
                      }
                    </div>
                  </div>
                ) : null
              }
              {
                OmcsDiseñoMejoraPanel ? (
                  <div key = {`OmsPreventivaPanel`} className='w-full h-full flex flex-col justify-start items-center justify-items-center gap-2 p-4 overflow-y-auto'>
                    <div className='w-full h-auto flex flex-col sm:flex-row justify-center items-center gap-3 px-2 py-1'>
                      <SearchInput SearchFunction = { FiltroDiseñoMejoraComponentes } />
                      <div onClick = { () => setShowModal(true) } className='w-full sm:w-auto h-auto text-center flex justify-center items-center px-2 py-1 border border-black hover:border-white rounded-md text-sm bg-green-500 hover:bg-green-800 text-white cursor-pointer duration-700 ease-in-out'>
                        Agregar Nuevo
                      </div> 
                    </div>
                    <div className={`w-full h-full flex flex-col justify-start items-center gap-2 py-1 px-4  overflow-hidden overflow-y-auto`}>
                      { 
                        OmcsDiseñoMejoraFiltrados ? (
                          OmcsDiseñoMejoraFiltrados.map((data) => (
                            <Link key={data.taqom} href={`/omcs/${data.taqom}`} className='w-full h-auto flex  justify-between items-center bg-white border border-black px-4 py-2 cursor-pointer hover:bg-gray-800 hover:text-white transition duration-700 ease-in-out'>
                              <div className='w-full flex flex-col sm:flex-row  justify-between sm:items-center items-start'>
                                  <div className='w-full sm:w-[80%] flex flex-col gap-3'>
                                      <span className={`${data.estado === 'EN PROCESO' ? 'text-red-500' : 'text-green-500' } font-semibold`}> { data.taqom } </span>
                                      <span> { data.descripcion } </span>
                                  </div>
                                  <div className='w-full sm:w-[20%] text-center'>
                                      RESPONSABLE: { data.responsable }
                                  </div>
                              </div>
                            </Link>
                          ))
                        ) : null
                      }
                    </div>
                  </div>
                ) : null
              }
            </div>
          ) : null
        }
        {
          DocumentosPanel ? (
            <div key = {`DocumentosPanel`} className='w-full h-full flex flex-col justify-start items-center justify-items-center gap-2 p-4 overflow-y-auto'>
              <div className='w-full h-auto flex flex-col sm:flex-row justify-center items-center gap-3 px-2 py-1'>
                <SearchInput SearchFunction = { FiltroDocumentos } />
                <div onClick = { () => setShowModal(true) } className='w-full sm:w-auto h-auto text-center flex justify-center items-center px-2 py-1 border border-black hover:border-white rounded-md text-sm bg-green-500 hover:bg-green-800 text-white cursor-pointer duration-700 ease-in-out'>
                  Agregar Nuevo Documento
                </div> 
              </div>
              <div className={`w-full h-full flex flex-col justify-start items-center gap-2 py-1 px-4  overflow-hidden overflow-y-auto`}>
                { 
                  DocumentosFiltrados ? (
                    DocumentosFiltrados.map((data) => (
                      <div key = { data.taqDoc }  className='w-full h-auto flex flex-col sm:flex-row gap-3 justify-between items-center border bg-white border-black px-4 py-2 cursor-pointer hover:bg-gray-800 hover:text-white transition duration-700 ease-in-out'>
                        <span className='w-[90%] '> { data.nombre } </span>
                        <div className='w-full sm:w-auto h-full flex flex-col sm:flex-row justify-center items-center gap-2'>
                            <div className='w-full sm:w-auto max-h-[40px] h-full px-4 py-2 bg-green-600 hover:bg-green-800 text-white cursor-pointer border hover:border-white '>
                                Ver
                            </div>
                            <div className='w-full sm:w-auto max-h-[40px] h-full px-4 py-2 bg-red-600 hover:bg-red-800 text-white cursor-pointer border hover:border-white '>
                                Eliminar
                            </div>
                        </div>
                      </div>
                    ))
                  ) : null
                }
              </div>
            </div>
          ) : null
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
            <CreateCargo
              Cargos = { Cargos }
              onClose = { () => setShowModal(false) }
            />
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
          MttosPanel  ? (
            <>
              {
                MantenimientosActivo ? (
                  <CreateMantenimientoActivo CategoriasActivos = { CategoriasActivo } onClose = { () => setShowModal(false) } />
                ) : null
              }
              {
                MantenimientosComponentes ? (
                  <CreateMantenimientoComponente CategoriasComponente = { CategoriasComponentes } onClose = { () => setShowModal(false) } />
                ) : null
              }
            </>
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
          OmasPanel ? (
            <>
              {
                OmasPreventivasPanel ? (
                  <CreateOmas Mantenimientos = { Mantenimientos_activos }  Activos = { Activos } Tipe = {` MTTO PREVENTIVO `}  LastOma = {Omas && Omas[0] ? Omas[0].taqom : "0"} Responsables = { Responsables } onClose = { () => setShowModal(false) } key={`8fe4b439accaa0b558`}/>
                ) : null
              }
              {
                OmasCorrectivasPanel ? (
                  <CreateOmas Mantenimientos = { Mantenimientos_activos } Activos = { Activos } Tipe = {` MTTO CORRECTIVO `}  LastOma = {Omas && Omas[0] ? Omas[0].taqom : "0"} Responsables = { Responsables } onClose = { () => setShowModal(false) } key={`8fe4b439accaa0b558`}/>
                ) : null
              }
              {
                OmasDiseñoMejoraPanel ? (
                  <CreateOmas Mantenimientos = { Mantenimientos_activos } Activos = { Activos } Tipe = {` MTTO DISEÑO O MEJORA `}  LastOma = {Omas && Omas[0] ? Omas[0].taqom : "0"} Responsables = { Responsables } onClose = { () => setShowModal(false) } key={`8fe4b439accaa0b558`}/>
                ) : null
              }
            </>
          ) : null 
        }
        {
          OmcsPanel ? (
            <>
              {
                OmcsPreventivasPanel ? (
                  <CreateOmcs Mantenimientos = { Mantenimientos_componentes } Componentes = { Componentes } Tipe = {` MTTO PREVENTIVO `}  LastOmc = {Omcs && Omcs[0] ? Omcs[0].taqom : "0"} Responsables = { Responsables } onClose = { () => setShowModal(false) } key={`8fe4b439accaa0b558`}/>
                ) : null
              }
              {
                OmcsCorrectivasPanel ? (
                  <CreateOmcs Mantenimientos = { Mantenimientos_componentes } Componentes = { Componentes } Tipe = {` MTTO CORRECTIVO `}  LastOmc = {Omcs && Omcs[0] ? Omcs[0].taqom : "0"} Responsables = { Responsables } onClose = { () => setShowModal(false) } key={`8fe4b439accaa0b558`}/>
                ) : null
              }
              {
                OmcsDiseñoMejoraPanel ? (
                  <CreateOmcs Mantenimientos = { Mantenimientos_componentes } Componentes = { Componentes } Tipe = {` MTTO DISEÑO O MEJORA `}  LastOmc = {Omcs && Omcs[0] ? Omcs[0].taqom : "0"} Responsables = { Responsables } onClose = { () => setShowModal(false) } key={`8fe4b439accaa0b558`}/>
                ) : null
              }
            </>
          ) : null 
        }
        {
          DocumentosPanel ? (
            <CreateDocumento route={`/documents/store`} Taq={``} onClose = { () => setShowModal(false) } key={`c53166671f945e794f`}/>
          ) : null 
        }
      </Modal>
    </main>
  )}
  
  export default Dashboard;