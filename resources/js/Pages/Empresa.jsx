import { useState, useEffect } from 'react'
import ActivoIcon from '@/Components/Icons/activo';
import UserIcon from '@/Components/Icons/user';
import EmpresaAppbar from '@/Components/UI/Empresa/Appbar';
import ButtonMenu from '@/Components/UI/ButtonMenu';
import Panel_general from '@/Components/UI/Panel_general';
import { Link } from '@inertiajs/react';
import { Toaster, toast } from 'sonner';

const empresaPage = ({ Empresa, status, error, Responsables, CategoriasActivo, CategoriasHerramienta, Cargos }) => {

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

  const [ModalActions, setModalActions] = useState(false)
  const [Default, setDefault] = useState(true)
  const [Panel_Trabajos, setPanel_Trabajos] = useState(false)
  const [Panel_Activos, setPanel_Activos] = useState(false)
  const [PanelResponsables, setPanelResponsables] = useState(false)
  const [PanelHerramientas, setPanelHerramientas] = useState(false)

  function ShowTrabajos() {
    if(Panel_Trabajos){
        setDefault(true)
        setPanelResponsables(false)
        setPanel_Trabajos(false)
        setPanel_Activos(false)
        setPanelHerramientas(false)
    }else{
      setDefault(true)
      setPanelResponsables(false)
      setPanel_Activos(false)
      setPanelHerramientas(false)
      setPanel_Trabajos(true)
    }
  }

  function ShowActivos() {
    if(Panel_Activos){
        setDefault(true)
        setPanelResponsables(false)
        setPanel_Trabajos(false)
        setPanelHerramientas(false)
        setPanel_Activos(false)
    }else{
      setDefault(true)
      setPanelResponsables(false)
      setPanel_Trabajos(false)
      setPanelHerramientas(false)
      setPanel_Activos(true)
    }
  }

  function ShowResponsables() {
    if(PanelResponsables){
        setDefault(true)
        setPanel_Activos(false)
        setPanelResponsables(false)
        setPanelHerramientas(false)
        setPanel_Trabajos(false)
    }else{
      setDefault(false)
      setPanel_Activos(false)
      setPanel_Trabajos(false)
      setPanelHerramientas(false)
      setPanelResponsables(true)
    }
  }

  function ShowHerramientas() {
    if(PanelHerramientas){
        setDefault(true)
        setPanel_Activos(false)
        setPanelResponsables(false)
        setPanelHerramientas(false)
        setPanel_Trabajos(false)
    }else{
      setDefault(false)
      setPanel_Activos(false)
      setPanelResponsables(false)
      setPanel_Trabajos(false)
      setPanelHerramientas(true)
    }
  }
  
  const Buttons = [{  
    "id"         : '332574324',
    "label"      : "Trabajos",
    "icon"       : <ActivoIcon color='#FFF' height='30px' width='30px'/>,
    "Myfunction" : ShowTrabajos,
    "estado"     : Panel_Trabajos
  }]
 
  const trabajosData = [];
  Empresa.forEach(empresa => {
    empresa.om.forEach(data => {
      trabajosData.push({
        taqom: data.taqot,
        descripcion: data.descripcion,
        responsable: data.responsable.primernombre + ' ' + data.responsable.primerapellido
      });
    });
  });

  useEffect(() => {  
    setTrabajosDataFiltrados(trabajosData)
  }, [Empresa])
  
  const [TrabajosDataFiltrados, setTrabajosDataFiltrados] = useState();
  const FilterTrabajos = ( searchTerm ) => {
    const filtered = trabajosData.filter((data) => {
        consttaqom         = data.taqot.toLowerCase();
        const descripcion   = data.descripcion.toLowerCase();
        const responsable   = data.responsable.toLowerCase();
        return ( descripcion.includes(searchTerm)   || responsable.includes(searchTerm) ||taqom.includes(searchTerm) );
    });
    setTrabajosDataFiltrados(filtered);
  };  

  return (
    <div>
      <EmpresaAppbar
        nombre  = { Empresa[0].nombre }
        link    = {`https://gematech.co/storage/Empresas/${Empresa[0].urlImage}`}
        Empresa = { Empresa }
        Resposanble = { Responsables }
        CategoriasActivo = { CategoriasActivo }
        CategoriasHerramientas = { CategoriasHerramienta }
        Cargos = { Cargos }
      />
      <div className='w-full h-auto  flex justify-center items-center justify-items-center gap-3'>
        <div className='w-full h-full flex justify-center items-start justify-items-center'>
          <div className='flex flex-col justify-center items-center w-full max-w-[300px] h-auto gap-3 p-4'>
            {
              Buttons ? (
                Buttons.map( (data) => (
                  <ButtonMenu
                    Myfunction = { data.Myfunction }
                    label = { data.label }
                    estado = { data.estado }
                    key = { data.id } 
                  >
                    { data.icon }
                  </ButtonMenu>
                ))
              ) : null
            }
          </div>
          <div className='w-full h-full '>
            {
              Default ? (
                <div className='w-full h-full px-4 py-2 flex flex-col justify-start items-center justify-items-center '>
                      
                  </div>
              ) : null
            }
            {
              Panel_Activos ? (
                <Panel_general FunctionfilterData = { FilterActivos } >
                  {
                      ActivosDataFiltrados ? (
                          ActivosDataFiltrados.map( (data) => (
                            <Link href={`/activo/${data.taqActivos}`} key = { data.taqActivos } className='w-full h-auto flex justify-between items-center border border-black px-4 py-2 cursor-pointer hover:bg-gray-800 hover:text-white transition duration-700 ease-in-out'>
                              { data.nombre }
                            </Link>
                          ))
                      ) : null
                  }
                </Panel_general>
              ) : null
            }
            {
              PanelHerramientas ? (
                <Panel_general FunctionfilterData = { FilterHerramientas } >
                  {
                      HerramientasDataFiltrados ? (
                          HerramientasDataFiltrados.map((data) => (
                            <Link href={`/herramienta/${data.taqHer}`} key = { data.taqHer } className='w-full h-auto flex justify-between items-center border border-black px-4 py-2 cursor-pointer hover:bg-gray-800 hover:text-white transition duration-700 ease-in-out'>
                              { data.nombre }
                            </Link>
                          ))
                      ) : null
                  }
                </Panel_general>
              ) : null
            }
            {
              Panel_Trabajos ? (
                <Panel_general FunctionfilterData = { FilterTrabajos } >
                  {
                      TrabajosDataFiltrados ? (
                          TrabajosDataFiltrados.map( (data) => (
                            <div key = { data.taqot } className='w-full h-auto flex justify-between items-center border border-black px-4 py-2 cursor-pointer hover:bg-gray-800 hover:text-white transition duration-700 ease-in-out'>
                              <div className='w-1/2  flex justify-start items-center h-full'>
                                { data.descripcion }
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
              PanelResponsables ? (
                <Panel_general FunctionfilterData = { FilterEmpleados } >
                  {
                      EmpleadosFiltradosData ? (
                          EmpleadosFiltradosData.map( (data) => (
                            <div key = { data.taqresponsable } className='w-full h-auto flex justify-start items-center gap-3 border border-black px-4 py-2 cursor-pointer hover:bg-gray-800 hover:text-white transition duration-700 ease-in-out'>
                              <img loading="lazy" src={`https://gematech.co/storage/${data.urlImage}`} alt="image responsable" className='w-[60px] h-[60px] rounded-full object-cover border border-white' />
                              { data.responsable }
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
    </div>
  )
}

export default empresaPage;
