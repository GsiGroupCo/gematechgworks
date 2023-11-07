
import ButtonMenu from './ButtonMenu'
import LogoutIcon from '../Icons/logout'

import { Link, router, useForm } from '@inertiajs/react'
import ActivoIcon from '../Icons/activo'
import MantoIcon from '../Icons/manto'
import UserIcon from '../Icons/user'
import { useState } from 'react'
import Panel_general from './Panel_general'
import Elemento_general from './Elemento_general'
import CardGeneral from './Card_general'
import { useEffect } from 'react'
import Modal from '../Panels/Modals/Modal'
import NewEmpresa from '../forms/Empresa/FormNewEmpresa/FormNewEmpresa'
import NewOm from '../forms/Oms/FormNewOM/FormNewOM'
import NewActivo from '../forms/Activo/FormNewActivo/FormNewActivo'
import BuildIcon from '../Icons/Build'
import ValveIcon from '../Icons/valve'
import PieGraph from '../Icons/PieGraph'
import NewTipeActivo from '../forms/Categorias/TipoActivo/FormNewTipoActivo/FormNewTipoActivo'
import NewTipeComponente from '../forms/Categorias/TipoComponentes/FormNewTipoComponentes/FormNewTipoComponentes'
import NewComponente from '../forms/Componente/FormNewActivo/FormNewComponente'  
import NewMtto from '../forms/Mantenimiento/FormNewMtto/FormNewMtto'
import NewResponsable from '../forms/Responsables/FormNewResponsable/FormNewResponsables'
import PanelDashboard from '../Panels/Dashboard/PanelDashboard'

const Hud =  ({ 
    Activos,
    Componentes,
    Documentos,
    Oms,
    Movimientos_Activos,
    Empresas,
    Tipos_Activo,
    Tipos_Componentes,
    Mantenimientos,
    Responsables,
    Cargos,
    Coordinadores,
    Default,
    Panel_Activos,
    PanelCategorias,
    Panel_Componentes,
    Panel_Empresa,
    Panel_Documentos,
    Panel_Mantenimiento,
    Panel_Oms,
    Panel_Responsables,
    Show_Default,
    ShowEmpresa,
    ShowComponentes,
    ShowCategorias,
    ShowDocumentos,
    ShowMantenimiento,
    ShowOms,
    ShowResponsables,
    Show_Activos,
    status,
    error
}) => {

    const [ShowModalDocs, setShowModalDocs] = useState(false)
    const [DocSelectd, setDocSelectd] = useState({
        taqDoc:"",
        nombre:"",
        url:""
    })

    const { get } = useForm() 

    function ShowModalDoc(data){
        setDocSelectd({
          taqDoc:data.taqDoc,
          nombre:data.nombre,
          url:data.DocURL
        })
        setShowModalDocs(true)
      }

    const Buttons = [{
        "id"         : "453706520",
        "children"   : <PieGraph color='#FFFFFF' width='50px' height='50px'/> ,
        "label"      : "Categorias",
        "cantidad"   : 3,
        "Myfunction" : ShowCategorias,
        "estado"     : PanelCategorias
    },{
        "id"         : "58951",
        "children"   : <ValveIcon color='#FFFFFF' width='50px' height='50px'/> ,
        "label"      : "Activos",
        "cantidad"   : Activos?.length > 0 ? Activos?.length : '0',
        "Myfunction" : Show_Activos,
        "estado"     : Panel_Activos
    },{
        "id"         : '39582',
        "children"   : <ActivoIcon color='#FFFFFF' width='30px' height='30px'/> ,
        "label"      : "Componentes",
        "cantidad"   : Componentes?.length > 0 ? Componentes?.length : '0',
        "Myfunction" : ShowComponentes,
        "estado"     : Panel_Componentes
    },{
        "id"         : '34258',
        "children"   : <BuildIcon color='#FFFFFF' width='50px' height='50px'/> ,
        "label"      : "Empresas",
        "cantidad"   : Empresas?.length > 0 ? Empresas?.length : '0',
        "Myfunction" : ShowEmpresa,
        "estado"     : Panel_Empresa
    },{
        "id"         : '41891',
        "children"   : <UserIcon color='#FFFFFF' width='30px' height='30px'/> ,
        "label"      : "Responsables",
        "cantidad"   : Responsables?.length > 0 ? Responsables?.length : '0',
        "Myfunction" : ShowResponsables,
        "estado"     : Panel_Responsables
    },{
        "id"         : '58122',
        "children"   : <MantoIcon color='#FFFFFF' width='30px' height='30px'/> ,
        "label"      : "Mantenimientos",
        "cantidad"   : Mantenimientos?.length > 0 ? Mantenimientos?.length : '0',
        "Myfunction" : ShowMantenimiento,
        "estado"     : Panel_Mantenimiento
    },{
        "id"         : '397asd34',
        "children"   : <omsIcon color='#FFFFFF' width='35px' height='35px'/> ,
        "label"      : "OT's",
        "cantidad"   : Oms?.length  > 0 ? Oms?.length  : '0',
        "Myfunction" : ShowOms,
        "estado"     : Panel_Oms
    },{
        "id"         : '865115',
        "children"   : <UserIcon color='#FFFFFF' width='30px' height='30px'/> ,
        "label"      : "Documentos",
        "cantidad"   : Documentos?.length,
        "Myfunction" : ShowDocumentos,
        "estado"     : Panel_Documentos
    },{
        "id"         : '742225',
        "children"   : <LogoutIcon color='#FFFFFF' width='30px' height='30px'/> ,
        "label"      : "Salir",
        "Myfunction" : () => router.get(`logout`),
        "estado"     : false
    }]
    
    useEffect(() => {
        setTiposActivosFiltrados(Tipos_Activo)
    }, [Tipos_Activo])   

    const [VisibleActivos, setVisibleActivos] = useState(true)
    const [TiposActivosFiltrados, setTiposActivosFiltrados] = useState();
    const FilterTiposActivo = ( searchTerm ) => {
        const filtered = Tipos_Activo.filter((data) => {
            const id_tipo           =   data.id_tipo.toLowerCase();
            const nombre            =   data.nombre.toLowerCase();
            const taq_activo_base   =   data.taq_activo_base.toLowerCase();
            return ( 
                id_tipo.includes(searchTerm)         ||
                nombre.includes(searchTerm)          ||
                taq_activo_base.includes(searchTerm) 
            );
        });
        setTiposActivosFiltrados(filtered);
    };

    function ShowCategoriaActivos(){
        if(VisibleActivos){
            setVisibleActivos(false)
            setVisibleComponentes(false)
        }else{
            setVisibleComponentes(false)
            setVisibleActivos(true)
        }
    }

    useEffect(() => {
        setTiposComponentesFiltrados(Tipos_Componentes)
    }, [Tipos_Componentes])   

    const [VisibleComponentes, setVisibleComponentes] = useState(false)
    const [TiposComponentesFiltrados, setTiposComponentesFiltrados] = useState();
    const FilterTiposComponentes = ( searchTerm ) => {
        const filtered = Tipos_Componentes.filter((data) => {
            const id_tipo              =  data.id_tipo.toLowerCase();
            const nombre               =  data.nombre.toLowerCase();
            const taq_componente_base  =  data.taq_componente_base.toLowerCase();
            return ( 
                id_tipo.includes(searchTerm)             ||
                nombre.includes(searchTerm)              ||
                taq_componente_base.includes(searchTerm) 
            );
        });
        setTiposComponentesFiltrados(filtered);
    };

    function ShowCategoriaComponentes(){
        if(VisibleComponentes){
            setVisibleActivos(false)
        }else{
            setVisibleActivos(false)
            setVisibleComponentes(true)
        }
    }
   
    const [ActionsModalActivo, setActionsModalActivo] = useState(false);
    const [FormatsModalActivo, setFormatsModalActivo] = useState(false);
    
    const [ActivosFiltrados, setActivosFiltrados] = useState(Activos); 

    const filterActivos = ( searchTerm ) => {
        const filtered = Activos.filter((data) => {
            const taqActivos  =   data.taqActivos.toLowerCase();
            const empresa     =   data.empresa.nombre.toLowerCase();
            const nombre      =   data.nombre.toLowerCase();
            const tipo        =   data.tipo ? data.tipo.nombre.toLowerCase() : '';
            const descripcion =   data.descripcion ? data.descripcion.toLowerCase() : '';
            const serial      =   data.serial ? data.serial.toLowerCase() : '';
            return ( 
                taqActivos.includes(searchTerm)  ||
                tipo.includes(searchTerm)      ||
                nombre.includes(searchTerm)      ||
                empresa.includes(searchTerm)     ||
                descripcion.includes(searchTerm) ||
                serial.includes(searchTerm)       
            );
        });
        setActivosFiltrados(filtered);
    };

    useEffect(() => {
        setEmpresaFiltradas(Empresas)
    }, [Empresas])

    const [EmpresaFiltradas, setEmpresaFiltradas] = useState();
    const [ActionsModalEmpresas, setActionsModalEmpresas] = useState(false);
    const filterEmpresa = ( searchTerm ) => {
        const filtered = Empresas.filter((data) => {
            const taqHer      =   data.taqHer.toLowerCase();
            const nombre      =   data.nombre.toLowerCase();
            const area        =   data.area.toLowerCase();
            const serial      =   data.serial ? data.serial.toLowerCase() : '';
            const horasuso    =   data.horasuso.toLowerCase();
            const urlImage    =   data.urlImage.toLowerCase();
            return ( 
                taqHer.includes(searchTerm)    ||
                nombre.includes(searchTerm)    ||
                area.includes(searchTerm)      ||
                serial.includes(searchTerm)    ||
                horasuso.includes(searchTerm)  ||
                urlImage.includes(searchTerm)    
            );
        });
        setEmpresaFiltradas(filtered);
    };

    useEffect(() => {
        setDocumentosFiltrados(Documentos)
    }, [Documentos])

    const [DocumentosFiltrados, setDocumentosFiltrados] = useState();
    const FilterDocumentos = ( searchTerm ) => {
        const filtered = Documentos.filter((data) => {
            const taqDoc = data.taqDoc.toLowerCase();
            const nombre = data.nombre.toLowerCase();
            const DocURL = data.DocURL.toLowerCase();
            return ( 
                taqDoc.includes(searchTerm)    ||
                nombre.includes(searchTerm)    ||
                DocURL.includes(searchTerm)    
            );
        });
        setDocumentosFiltrados(filtered);
    };

    useEffect(() => {
        setComponentesFiltrados(Componentes)
    }, [Componentes])

    const [ComponentesFiltrados, setComponentesFiltrados] = useState(Componentes);
    const filterComponentes = ( searchTerm ) => {
        const filtered = Componentes.filter((data) => {
            const activo_id   =   data.activo_id.toLowerCase();
            const nombre      =   data.nombre.toLowerCase();
            const descripcion =   data.descripcion ? data.descripcion.toLowerCase() : '';
            const modelo      =   data.modelo.toLowerCase();
            const serial      =   data.serial.toLowerCase();
            const horas_uso   =   data.horas_uso.toLowerCase();
            const urlImage    =   data.urlImage.toLowerCase();
            const created_at  =   data.created_at.toString().toLowerCase();
            const updated_at  =   data.updated_at.toString().toLowerCase();
            return ( 
                activo_id.includes(searchTerm)  ||
                nombre.includes(searchTerm)     ||
                descripcion.includes(searchTerm)||
                modelo.includes(searchTerm)     ||
                serial.includes(searchTerm)     ||
                horas_uso.includes(searchTerm)  ||
                urlImage.includes(searchTerm)   ||
                created_at.includes(searchTerm) ||
                updated_at.includes(searchTerm) 
            );
        });
        setComponentesFiltrados(filtered);
    };

    const [OmsFiltrados, setOmsFiltrados] = useState(Oms);
    const [ActionsModalOts, setActionsModalOts] = useState(false)
    const filterOms = ( searchTerm ) => {
        const filtered  = oms.filter((data) => {
            const taqom          = data.taqot.toLowerCase();
            const taqempresa     = data.taqempresa.toLowerCase();
            const taqresponsable = data.responsable.primernombre.toLowerCase();
            const fechainicio    = data.fechainicio.toLowerCase();
            const horainicio     = data.horainicio.toLowerCase();
            const fechafin       = data.fechafin ? data.fechafin.toLowerCase() : '';
            const horafin        = data.horafin ? data.horafin.toLowerCase() : '';
            const tipo           = data.tipo.toLowerCase();
            const clasot         = data.tipo.toLowerCase();
            const descripcion    = data.descripcion?  data.descripcion.toLowerCase() : '';
            const prioridad      = data.prioridad.toLowerCase();
            const estado         = data.estado.toLowerCase();
            const created_at     = data.created_at.toLowerCase();
            const updated_at     = data.updated_at.toLowerCase();
            return (
                taqom.includes(searchTerm)          ||
                taqempresa.includes(searchTerm)     ||
                taqresponsable.includes(searchTerm) ||
                fechainicio.includes(searchTerm)    ||
                horainicio.includes(searchTerm)     ||
                fechafin.includes(searchTerm)       ||
                tipo.includes(searchTerm)           ||
                clasot.includes(searchTerm)         ||
                descripcion.includes(searchTerm)    ||
                prioridad.includes(searchTerm)      ||
                horafin.includes(searchTerm)        ||
                estado.includes(searchTerm)         ||
                created_at.includes(searchTerm)     ||
                updated_at.includes(searchTerm) 
            );
        });
        setOmsFiltrados(filtered);
    };
 
    const [ResponsablesFiltrados, setResponsablesFiltrados] = useState();
    const [ActionsModalResponsables, setActionsModalResponsables] = useState(false);

    useEffect(() => {
        setResponsablesFiltrados(Responsables)
    }, [Responsables])

    const filterResponsables = ( searchTerm ) => {
        const filtered = Responsables.filter((data) => {
            const taqresponsable   =   data.taqresponsable.toLowerCase();
            const taqempresa       =   data.taqempresa.toLowerCase();
            const primernombre     =   data.primernombre.toLowerCase();
            const primerapellido   =   data.primerapellido.toLowerCase();
            const segundonombre    =   data.segundonombre ? data.segundonombre.toLowerCase() : '' ;
            const segundoapellido  =   data.segundoapellido ? data.segundoapellido.toLowerCase() : '' ;
            const cargo            =   data.id_cargo.toLowerCase();
            const estado           =   data.estado.toLowerCase();
            return (
                taqresponsable.includes(searchTerm)  ||
                taqempresa.includes(searchTerm)      ||
                primernombre.includes(searchTerm)    ||
                primerapellido.includes(searchTerm)  ||
                segundonombre.includes(searchTerm)   ||
                segundoapellido.includes(searchTerm) ||
                cargo.includes(searchTerm)           ||
                estado.includes(searchTerm)
            );
        });
        setResponsablesFiltrados(filtered);
    };

    useEffect(() => {
        setMantenimientosData(Mantenimientos)
    }, [Mantenimientos])

    const [MantenimientosData, setMantenimientosData] = useState();
    const FilterMantenimientos = ( searchTerm ) => {
        const filtered           = Mantenimientos.filter((data) => {
            const taqManto       =   data.taqManto.toLowerCase();
            const Nombre         =   data.Nombre.toLowerCase();
            const tipe           =   data.tipe.toLowerCase();
            const descripcion    =   data.descripcion.toLowerCase();
            return (
                taqManto.includes(searchTerm)    ||
                Nombre.includes(searchTerm)      ||
                tipe.includes(searchTerm)        ||
                descripcion.includes(searchTerm)
            );
        });
        setMantenimientosData(filtered);
    };

    return (
        <div className='w-full h-screen  bg-gray-300    flex  flex-col md:flex-row  justify-center items-start justify-items-center relative overflow-visible '>
            <div className='hidden xl:w-[20%] h-screen  px-4 py-4 xl:flex flex-col justify-between  items-center justify-items-center gap-2 overflow-y-auto'>
                <div onClick = { () => Show_Default() } className=' cursor-pointer w-full h-auto p-4 flex justify-center items-center gap-2 bg-white rounded-md shadow-md shadow-black'>
                    <img src={logo_gema} alt="logo gworks" className='w-[70px] h-[70px] object-cover' loading="lazy" />
                    <span className='text-4xl font-bold text-black'>GEMA</span>
                </div>
                <div className='w-full flex flex-col justify-center items-center gap-1'>
                {
                    Buttons ? (
                        Buttons.map( (data) => (
                            <ButtonMenu 
                                key = { data.id }
                                children = { data.children }
                                label = { data.label }
                                cantidad = { data.cantidad }
                                Myfunction = { data.Myfunction }
                                estado = { data.estado }
                            />
                        ))
                    ) : null
                }
                </div>
                <div className='w-full h-auto p-4 flex justify-center items-center bg-white rounded-md shadow-md shadow-black'>
                    <img src={logo_gworks} alt="logo gworks" className='w-full h-full object-cover' loading="lazy"/>
                </div>
            </div>
            <div className='w-full h-screen flex-col justify-start items-start justify-items-center overflow-visible'>
                {
                    Default ? (
                        <PanelDashboard OmsFinalizadas={`123`} OmsPendientes={`125`} TotalOm={`257`} responsables={Responsables} key={`65465465`}/>
                    )
                    : null
                }
                {
                    PanelCategorias ? (
                        <div className='w-full h-full overflow-hidden'>
                            <div className='w-full h-auto px-4 py-2 flex gap-3'>
                                <div onClick={()=>ShowCategoriaActivos()} className={`w-1/3 h-auto px-4 py-2 flex flex-col md:flex-row justify-between transition duration-700 ease-in-out ${ VisibleActivos ? 'border border-white bg-gray-800 text-white' : 'hover:bg-gray-800 bg-white border hover:border-white border-gray-800 hover:text-white text-gray-800' } font-semibold cursor-pointer rounded-md`}>
                                    <div className='text-center'>
                                        Categorias de Activo
                                    </div>
                                    <div className='text-center'>
                                        { Tipos_Activo.length }
                                    </div>
                                </div> 
                                <div  onClick={()=>ShowCategoriaComponentes()} className={`w-1/3 h-auto px-4 py-2 flex flex-col md:flex-row justify-between transition duration-700 ease-in-out ${ VisibleComponentes ? 'border border-white bg-gray-800 text-white' : 'hover:bg-gray-800 bg-white border hover:border-white border-gray-800 hover:text-white text-gray-800' } font-semibold cursor-pointer rounded-md`}>
                                    <div className='text-center'>
                                        Categorias de Componentes
                                    </div>
                                    <div className='text-center'>
                                        { Tipos_Componentes.length }
                                    </div>
                                </div>
                            </div>
                            {
                                VisibleActivos ? (
                                    <Panel_general FunctionfilterData = { FilterTiposActivo } >
                                        <div className='w-full h-full flex flex-col justify-start items-center gap-3'>
                                        {
                                            TiposActivosFiltrados ? (
                                                TiposActivosFiltrados.map( (data) => (
                                                    <Elemento_general key = { data.id_tipo } link = {`/tipos/activo/${data.id_tipo}`} >
                                                        <div className='w-full flex justify-between'>
                                                            <div>
                                                                {data.nombre}
                                                            </div>
                                                            <div>
                                                                Activos: {data.activos.length}
                                                            </div>
                                                        </div>
                                                    </Elemento_general>
                                                ))
                                            ) : null
                                        }
                                        <div className='w-auto h-autopx-4 py-2 flex justify-center items-center gap-3 absolute bottom-2 right-5'>
                                            <div onClick = { () => setActionsModalActivo(true) } className='w-auto h-auto bg-green-500 hover:bg-green-800 px-4 py-2 rounded-md text-white transition duration-700 ease-in-out cursor-pointer'>
                                                Registrar categoria de activo
                                            </div>
                                        </div>
                                        </div>
                                        <Modal
                                            isVisible = { ActionsModalActivo }
                                            onClose = { () => setActionsModalActivo(false) }
                                            tittle = {`Registrando categoria de activo `} 
                                        >
                                            <NewTipeActivo onClose = {() => setActionsModalActivo(false)}/>
                                        </Modal>
                                    </Panel_general>
                                ) : null
                            }
                            {
                                VisibleComponentes ? (
                                    <Panel_general FunctionfilterData = { FilterTiposComponentes } >
                                        <div className='w-full h-full flex flex-col justify-start items-center gap-3'>
                                        {
                                            TiposComponentesFiltrados ? (
                                                TiposComponentesFiltrados.map( (data) => (
                                                    <Elemento_general link = {`/tipos/componente/${data.id_tipo}`} >
                                                        <div className='w-full flex justify-between'>
                                                            <div>
                                                                {data.nombre}
                                                            </div>
                                                            <div>
                                                                Componentes: {data.componentes.length}
                                                            </div>
                                                        </div>
                                                    </Elemento_general>
                                                ))
                                            ) : null
                                        }
                                        <div className='w-auto h-autopx-4 py-2 flex justify-center items-center gap-3 absolute bottom-2 right-5'>
                                            <div onClick = { () => setActionsModalActivo(true) } className='w-auto h-auto bg-green-500 hover:bg-green-800 px-4 py-2 rounded-md text-white transition duration-700 ease-in-out cursor-pointer'>
                                                Registrar categoria de componente
                                            </div>
                                        </div>
                                        </div>
                                        <Modal
                                            isVisible = { ActionsModalActivo }
                                            onClose = { () => setActionsModalActivo(false) }
                                            tittle = {`Registrando categoria de componente`} 
                                        >
                                            <NewTipeComponente onClose = {() => setActionsModalActivo(false)}/>
                                        </Modal>
                                    </Panel_general>
                                ) : null
                            }
                        </div>
                    )
                    : null
                }                
                {
                    Panel_Activos ? (
                        <div className='w-full h-full  p-4 flex flex-col justify-start items-center '>
                             {
                                Activos ?  (
                                    <Panel_general FunctionfilterData = { filterActivos } >
                                        <div className='w-full h-full grid  grid-cols-1 sm:grid-cols-2  lg:grid-cols-3 xl:grid-cols-4 gap-4'>
                                        {
                                            ActivosFiltrados ? (
                                                ActivosFiltrados.map( (data) => (
                                                    data.urlImage != 'default-image.jpg' ? (
                                                        <CardGeneral
                                                            link = {`https://gematech.co/storage/Activos/${data.taqActivos}/${data.urlImage}`}
                                                            nombre={` ACTIVO: ${data.nombre} - SERIAL: ${data.serial}`}
                                                            route={`/activo/${data.taqActivos}`}
                                                            key={data.taqActivos}
                                                        />
                                                    ) : (
                                                        <CardGeneral
                                                            link = {`https://gematech.co/storage/${data.urlImage}`}
                                                            nombre={` ACTIVO: ${data.nombre} - SERIAL: ${data.serial}`}
                                                            route={`/activo/${data.taqActivos}`}
                                                            key={data.taqActivos}
                                                        />
                                                    )
                                                ))
                                            ) : null
                                        }
                                        <div className='w-auto h-autopx-4 py-2 flex justify-center items-center gap-3 absolute bottom-2 right-5'>
                                            <div onClick = { () => setActionsModalActivo(true) } className='scale-90 hover:scale-110 w-auto h-auto bg-green-500 hover:bg-green-800 px-4 py-2 rounded-md text-white transition duration-700 ease-in-out cursor-pointer hover:border hover:border-white'>
                                                Registrar Activo
                                            </div>
                                            <a href='/Download/activos' className='scale-90 hover:scale-110 w-auto h-auto bg-green-500 hover:bg-green-800 px-4 py-2 rounded-md text-white transition duration-700 ease-in-out cursor-pointer hover:border hover:border-white'>
                                                Descargar Listado Activos
                                            </a>
                                        </div>
                                        </div>
                                        <Modal
                                            isVisible = { ActionsModalActivo }
                                            onClose = { () => setActionsModalActivo(false) }
                                            tittle = {`Registrando Activo`} 
                                        >
                                            <NewActivo onClose = {() => setActionsModalActivo(false)} status = { status } Empresa = { Empresas } Tipos = { Tipos_Activo } />
                                        </Modal> 
                                    </Panel_general>
                                ) : null
                             }
                        </div>
                    )
                    : null
                }
                {
                    Panel_Componentes ? (
                        <Panel_general FunctionfilterData = { filterComponentes } >
                            <div className='w-full h-full grid  grid-cols-1 sm:grid-cols-2  lg:grid-cols-3 xl:grid-cols-4 gap-4'>
                                {
                                    ComponentesFiltrados ? (
                                        ComponentesFiltrados.map( (data) => (
                                            data.urlImage != 'default-image.jpg' ? (
                                                <CardGeneral
                                                    link = {`https://gematech.co/storage/Componentes/${data.taqComponente}/${data.urlImage}`}
                                                     nombre={` ACTIVO: ${data.nombre} - SERIAL: ${data.serial}`}
                                                    route={`/componente/${data.taqComponente}`}
                                                    key={data.taqComponente}
                                                />
                                            ) : (
                                                <CardGeneral
                                                    link = {`https://gematech.co/storage/${data.urlImage}`}
                                                     nombre={` ACTIVO: ${data.nombre} - SERIAL: ${data.serial}`}
                                                    route={`/componente/${data.taqComponente}`}
                                                    key={data.taqComponente}
                                                />
                                            )
                                        ))
                                    ) : null
                                }
                                <div className='w-auto h-autopx-4 py-2 flex justify-center items-center gap-3 absolute bottom-2 right-5'>
                                    <div onClick = { () => setActionsModalActivo(true) } className='w-auto h-auto bg-green-500 hover:bg-green-800 px-4 py-2 rounded-md text-white transition duration-700 ease-in-out cursor-pointer'>
                                        Registrar Componente
                                    </div>
                                    <a href='/Download/componentes' className='w-auto h-auto bg-green-500 hover:bg-green-800 px-4 py-2 rounded-md text-white transition duration-700 ease-in-out cursor-pointer'>
                                        Descargar Listado de Componentes
                                    </a>
                                </div>
                            </div>
                            <Modal
                                isVisible = { ActionsModalActivo }
                                onClose = { () => setActionsModalActivo(false) }
                                tittle = {`Registrando Nuevo Componente`} 
                            >
                                <NewComponente onClose = {() => setActionsModalActivo(false)} Empresa = { Empresas } Tipos = { Tipos_Componentes } />
                            </Modal>
                        </Panel_general>
                    )
                    : null
                }
                {
                    Panel_Empresa ? (
                        <Panel_general FunctionfilterData = { filterEmpresa } >
                            <div className='w-full h-full grid  grid-cols-1 sm:grid-cols-2  lg:grid-cols-3 xl:grid-cols-4 gap-4'>
                                {
                                    EmpresaFiltradas ? (
                                        EmpresaFiltradas.map( (data) => (
                                            data.urlImage != 'default-image.jpg' ? (
                                                <CardGeneral
                                                    link = {`https://gematech.co/storage/Empresas/${data.urlImage}`}
                                                    nombre={data.nombre}
                                                    route={`/ empresa/${data.taqempresa}`}
                                                    key={data.taqempresa}
                                                />
                                            ) : (
                                                <CardGeneral
                                                    link = {`https://gematech.co/storage/${data.urlImage}`}
                                                    nombre={data.nombre}
                                                    route={`/ empresa/${data.taqempresa}`}
                                                    key={data.taqempresa}
                                                />
                                            )
                                        ))
                                    ) : null
                                }
                                <div className='w-auto h-autopx-4 py-2 flex justify-center items-center gap-3 absolute bottom-2 right-5'>
                                    <div onClick = { () => setActionsModalEmpresas(true) } className='w-auto h-auto bg-green-500 hover:bg-green-800 px-4 py-2 rounded-md text-white transition duration-700 ease-in-out cursor-pointer'>
                                        Registrar Empresa
                                    </div>
                                </div>
                            </div>
                            <Modal
                                isVisible = { ActionsModalEmpresas }
                                onClose = { () => setActionsModalEmpresas(false) }
                                tittle = {` Registrar Nueva Empresa`} 
                            >
                                <NewEmpresa onClose = { () => setActionsModalEmpresas(false) }  status = { status } />
                            </Modal>
                        </Panel_general>
                    )
                    : null
                }
                {
                    Panel_Responsables ? (
                        <Panel_general FunctionfilterData = { filterResponsables } >
                            <div className='w-full h-full grid  grid-cols-1 sm:grid-cols-2  lg:grid-cols-3 xl:grid-cols-4 gap-4  overflow-y-auto overflow-x-hidden'>
                            {
                                ResponsablesFiltrados ? (
                                    ResponsablesFiltrados.map( (data) => (
                                        <CardGeneral
                                            link = {`https://gematech.co/storage/${data.urlImage}`}
                                            nombre={`${data.primernombre} ${data.segundonombre ? data.segundonombre : ''} ${data.primerapellido} ${data.segundoapellido ? data.segundoapellido : ''}`}
                                            route={`/responsables/${data.taqresponsable}`}
                                            key={data.taqresponsable}
                                        />
                                    ))
                                ) : null
                            }
                            <div className='w-auto h-autopx-4 py-2 flex justify-center items-center gap-3 absolute bottom-2 right-5'>
                                <div onClick = { () => setActionsModalResponsables(true) } className='w-auto h-auto bg-green-500 hover:bg-green-800 px-4 py-2 rounded-md text-white transition duration-700 ease-in-out cursor-pointer'>
                                    Registrar Responsable
                                </div>
                            </div>
                            </div>
                            <Modal
                                isVisible = { ActionsModalResponsables }
                                onClose = { () => setActionsModalResponsables(false) }
                                tittle = {`Nuevo Responsable`} 
                            >
                                <NewResponsable Cargos = { Cargos } onClose = { () => setActionsModalResponsables(false) } status = { status } />
                            </Modal>
                        </Panel_general>
                    )
                    : null
                }
                {
                    Panel_Oms ? (
                        <Panel_general FunctionfilterData = { filterOms } >
                            <div className='w-full h-full flex flex-col justify-start items-center gap-3'>
                                {
                                    OmsFiltrados ? (
                                        OmsFiltrados.map((data) => (
                                            <Link href={`/oms/${data.taqot}`} className='w-full h-auto flex  justify-between items-center bg-white border border-black px-4 py-2 cursor-pointer hover:bg-gray-800 hover:text-white transition duration-700 ease-in-out'>
                                                <div className='w-full flex flex-col sm:flex-row  justify-between sm:items-center items-start'>
                                                    <div className='w-full sm:w-[80%] flex flex-col gap-3'>
                                                        <span className={`${data.estado === 'EN PROCESO' ? 'text-red-500' : 'text-green-500' } font-semibold`}> { data.taqot } </span>
                                                        <span> { data.descripcion } </span>
                                                    </div>
                                                    <div className='w-full sm:w-[20%]'>
                                                        {data.responsable.primernombre} {data.responsable.primerapellido}
                                                    </div>
                                                </div>
                                            </Link>
                                        ))
                                    ) : null
                                }
                                <div className='w-auto h-autopx-4 py-2 flex justify-center items-center gap-3 absolute bottom-2 right-5'>
                                    <div onClick = { () => setActionsModalOts(true) } className='w-auto h-auto bg-green-500 hover:bg-green-800 px-4 py-2 rounded-md text-white transition duration-700 ease-in-out cursor-pointer'>
                                        Registrar Orden de trabajo
                                    </div>
                                </div>
                            </div>
                            <Modal
                                isVisible = { ActionsModalOts }
                                onClose = { () => setActionsModalOts(false) }
                                tittle = {`Nueva Orden de Trabajo`} 
                            >
                                <NewOm LastOt = { oms[0].taqot } Responsables = { Coordinadores } Empresa = { Empresas } Activos = { Activos } onClose = { () => setActionsModalOts(false) } status={status} />
                            </Modal>
                        </Panel_general>
                    )
                    : null
                }
                {
                    Panel_Mantenimiento ? (
                        <Panel_general FunctionfilterData = { FilterMantenimientos } >
                            <div className='w-full h-full flex flex-col justify-start items-center gap-3'>
                                {
                                    MantenimientosData ? (
                                        MantenimientosData.map((data) => (
                                            <Link href={`/mtto/show/${data.taqManto}`} className='w-full h-auto flex justify-between items-center bg-white border border-black px-4 py-2 cursor-pointer hover:bg-gray-800 hover:text-white transition duration-700 ease-in-out'>
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
                                <div className='w-auto h-autopx-4 py-2 flex justify-center items-center gap-3 absolute bottom-2 right-5'>
                                    <div onClick = { () => setActionsModalOts(true) } className='w-auto h-auto bg-green-500 hover:bg-green-800 px-4 py-2 rounded-md text-white transition duration-700 ease-in-out cursor-pointer'>
                                        Registrar Mantenimiento
                                    </div>
                                </div>
                            </div>
                            <Modal
                                isVisible = { ActionsModalOts }
                                onClose = { () => setActionsModalOts(false) }
                                tittle = {`Nuevo Mantenimiento`} 
                            >
                                <NewMtto onClose = { () => setActionsModalOts(false) }  />
                            </Modal>
                        </Panel_general>
                    )
                    : null
                }
                {
                    Panel_Documentos ? (
                        <Panel_general FunctionfilterData = { FilterDocumentos } >
                            <div className='w-full h-full flex flex-col justify-start items-center gap-3'>
                                {
                                    DocumentosFiltrados ? (
                                        DocumentosFiltrados.map((data) => (
                                            <div key = { data.taqDoc }  className='w-full h-auto flex flex-col sm:flex-row gap-3 justify-between items-center border bg-white border-black px-4 py-2 cursor-pointer hover:bg-gray-800 hover:text-white transition duration-700 ease-in-out'>
                                                <span className='w-[90%] '> { data.nombre } </span>
                                                <div className='w-full sm:w-auto h-full flex flex-col sm:flex-row justify-center items-center gap-2'>
                                                    <div onClick={ () => ShowModalDoc(data) } className='w-full sm:w-auto max-h-[40px] h-full px-4 py-2 bg-green-600 hover:bg-green-800 text-white cursor-pointer border hover:border-white '>
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
                            <div className='w-auto h-autopx-4 py-2 flex justify-center items-center gap-3 absolute bottom-2 right-5'>
                                <div onClick = { () => {} } className='w-auto h-auto bg-green-500 hover:bg-green-800 px-4 py-2 rounded-md text-white transition duration-700 ease-in-out cursor-pointer'>
                                    Subir Documentos
                                </div>
                            </div>
                            </div>
                            <Modal
                                isVisible = { ShowModalDocs }
                                onClose = { () => setShowModalDocs(false) }
                                tittle = { DocSelectd.nombre } 
                            >
                                <div className='w-[900px] h-[800px]'>
                                <embed src={`https://gematech.co/${DocSelectd.url}`} type="application/pdf" className='w-full h-full' />
                                </div>
                            </Modal>
                        </Panel_general>
                    )
                    : null
                }
            </div>
        </div>
    )
}

export default Hud;