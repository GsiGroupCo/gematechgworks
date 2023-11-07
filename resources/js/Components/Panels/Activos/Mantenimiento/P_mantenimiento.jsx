
import SearchInput from "@/Components/UI/Search";
import { useState } from "react";


const PanelMantenimiento = ({ state }) => { 

  const [Default, setDefault] = useState(true)

  const [Panel_Preventivos, setPanel_Preventivos] = useState(false)
  const [Panel_Correctivos, setPanel_Correctivos] = useState(false)
  const [Panel_Mtto_Horas, setPanel_Mtto_Horas] = useState(false)
  const [Panel_Documentos, setPanel_Documentos] = useState(false)
  const [Panel_Documentos_Eliminados, setPanel_Documentos_Eliminados] = useState(false)

  function ShowPreventivos() {
    if(Panel_Preventivos){
        setDefault(true)
        setPanel_Preventivos(false)
        setPanel_Correctivos(false)
        setPanel_Mtto_Horas(false)
        setPanel_Documentos(false)
        setPanel_Documentos_Eliminados(false)
    }else{
      setDefault(false)
      setPanel_Correctivos(false)
      setPanel_Mtto_Horas(false)
      setPanel_Documentos(false)
      setPanel_Documentos_Eliminados(false)
      setPanel_Preventivos(true)
    }
  }

  function ShowCorrectivos() {
    if(Panel_Correctivos){
        setDefault(true)
        setPanel_Preventivos(false)
        setPanel_Correctivos(false)
        setPanel_Mtto_Horas(false)
        setPanel_Documentos(false)
        setPanel_Documentos_Eliminados(false)
    }else{
      setDefault(false)
      setPanel_Mtto_Horas(false)
      setPanel_Documentos(false)
      setPanel_Documentos_Eliminados(false)
      setPanel_Preventivos(false)
      setPanel_Correctivos(true)
    }
  }

  function ShowHoras() {
    if(Panel_Mtto_Horas){
        setDefault(true)
        setPanel_Preventivos(false)
        setPanel_Correctivos(false)
        setPanel_Mtto_Horas(false)
        setPanel_Documentos(false)
        setPanel_Documentos_Eliminados(false)
    }else{
      setDefault(false)
      setPanel_Documentos(false)
      setPanel_Documentos_Eliminados(false)
      setPanel_Preventivos(false)
      setPanel_Correctivos(false)
      setPanel_Mtto_Horas(true)
    }
  }

  function ShowDocumentos() {
    if(Panel_Documentos){
        setDefault(true)
        setPanel_Preventivos(false)
        setPanel_Correctivos(false)
        setPanel_Mtto_Horas(false)
        setPanel_Documentos(false)
        setPanel_Documentos_Eliminados(false)
    }else{
      setDefault(false)
      setPanel_Documentos_Eliminados(false)
      setPanel_Preventivos(false)
      setPanel_Correctivos(false)
      setPanel_Mtto_Horas(false)
      setPanel_Documentos(true)
    }
  }

  function ShowDocumentosEliminados() {
    if(Panel_Documentos_Eliminados){
        setDefault(true)
        setPanel_Preventivos(false)
        setPanel_Correctivos(false)
        setPanel_Mtto_Horas(false)
        setPanel_Documentos(false)
        setPanel_Documentos_Eliminados(false)
    }else{
      setDefault(false)
      setPanel_Preventivos(false)
      setPanel_Correctivos(false)
      setPanel_Mtto_Horas(false)
      setPanel_Documentos(false)
      setPanel_Documentos_Eliminados(true)
    }
  }

  const [mttoPreventivosFiltrados, setmttoPreventivosFiltrados] = useState(state.mantenimientos_preventivos);

  const filterPreventivos = ( searchTerm ) => {
    const filtered = state.MantenimientoPreventivosData.filter((data) => {
        const taqmttActivo   =   data.taqmttActivo.toLowerCase();
        const taqManto       =   data.taqManto.toLowerCase();
        const actividad      =   data.actividad.toLowerCase();
        const activo_id     =   data.activo_id.toLowerCase() ;
        const taqresponsable =   data.taqresponsable.toLowerCase();
        const area           =   data.area.toLowerCase();
        const cantDocs       =   data.cantDocs.toLowerCase();
        const estado         =   data.estado.toLowerCase();
        const fecha          =   data.fecha.toLowerCase();
        const fechaFin       =   data.fechaFin.toLowerCase();
        const created_at     =   data.created_at.toString().toLowerCase();
        const updated_at     =   data.updated_at.toString().toLowerCase();
        return (
            taqmttActivo.includes(searchTerm) ||
            taqManto.includes(searchTerm) ||
            actividad.includes(searchTerm) ||
            activo_id.includes(searchTerm) ||
            taqresponsable.includes(searchTerm) ||
            area.includes(searchTerm) ||
            cantDocs.includes(searchTerm) ||
            estado.includes(searchTerm) ||
            fecha.includes(searchTerm) ||
            fechaFin.includes(searchTerm) ||
            updated_at.includes(searchTerm) ||
            created_at.includes(searchTerm)
        );
    });
    setmttoPreventivosFiltrados(filtered);
  };


  const [mttoCorrectivosFiltrados, setmttoCorrectivosFiltrados] = useState(state.mantenimientos_correctivos);

  const filterCorrectivos = ( searchTerm ) => {

    const filtered = state.MantenimientoCorrectivosData.filter((data) => {
        const taqmttActivo   =   data.taqmttActivo.toLowerCase();
        const preoperacional =   data.preoperacional.toLowerCase();
        const actividad      =   data.actividad.toLowerCase();
        const activo_id     =   data.activo_id.toLowerCase() ;
        const taqresponsable =   data.taqresponsable.toLowerCase();
        const area           =   data.area.toLowerCase();
        const cantDocs       =   data.cantDocs.toLowerCase();
        const estado         =   data.estado.toLowerCase();
        const fecha          =   data.fecha.toLowerCase();
        const fechaFin       =   data.fechaFin.toLowerCase();
        const created_at     =   data.created_at.toString().toLowerCase();
        const updated_at     =   data.updated_at.toString().toLowerCase();
        return (
            taqmttActivo.includes(searchTerm) ||
            preoperacional.includes(searchTerm) ||
            actividad.includes(searchTerm) ||
            activo_id.includes(searchTerm) ||
            taqresponsable.includes(searchTerm) ||
            area.includes(searchTerm) ||
            cantDocs.includes(searchTerm) ||
            estado.includes(searchTerm) ||
            fecha.includes(searchTerm) ||
            fechaFin.includes(searchTerm) ||
            updated_at.includes(searchTerm) ||
            created_at.includes(searchTerm)
        );
    });
    setmttoCorrectivosFiltrados(filtered); 
  };

  const [mttoHoras, setmttoHoras] = useState(state.mantenimientos_horas);

  const filterHoras = ( searchTerm ) => {
    const filtered = state.mantenimientos_horas.filter((data) => {
        const taqmttActivo   =   data.taqmttActivo.toLowerCase();
        const actividad      =   data.actividad.toLowerCase();
        const activo_id     =   data.activo_id.toLowerCase();
        const area           =   data.area.toLowerCase();
        const preoperacional =   data.preoperacional.toLowerCase();
        const taqresponsable =   data.taqresponsable.toLowerCase();
        const estado         =   data.estado.toLowerCase();
        const fecha          =   data.fecha.toLowerCase();
        const fechaFin       =   data.fechaFin.toLowerCase();
        const created_at     =   data.created_at.toString().toLowerCase();
        const updated_at     =   data.updated_at.toString().toLowerCase();
        return (
            taqmttActivo.includes(searchTerm) ||
            preoperacional.includes(searchTerm) ||
            actividad.includes(searchTerm) ||
            activo_id.includes(searchTerm) ||
            taqresponsable.includes(searchTerm) ||
            area.includes(searchTerm) ||
            estado.includes(searchTerm) ||
            fecha.includes(searchTerm) ||
            fechaFin.includes(searchTerm) ||
            updated_at.includes(searchTerm) ||
            created_at.includes(searchTerm)
        );
    });
    setmttoHoras(filtered);
  };
  

  const [documentos_mtto, setdocumentos_mtto] = useState(state.documentos);

  const filterDocs = ( searchTerm ) => {
    const filtered = state.documentos.filter((data) => {
        const taqmttActivo   =   data.taqmttActivo.toLowerCase();
        const taqManto       =   data.taqManto.toLowerCase();
        const actividad      =   data.actividad.toLowerCase();
        const activo_id     =   data.activo_id.toLowerCase() ;
        const taqresponsable =   data.taqresponsable.toLowerCase();
        const area           =   data.area.toLowerCase();
        const cantDocs       =   data.cantDocs.toLowerCase();
        const estado         =   data.estado.toLowerCase();
        const fecha          =   data.fecha.toLowerCase();
        const fechaFin       =   data.fechaFin.toLowerCase();
        const created_at     =   data.created_at.toString().toLowerCase();
        const updated_at     =   data.updated_at.toString().toLowerCase();
        return (
            taqmttActivo.includes(searchTerm) ||
            taqManto.includes(searchTerm) ||
            actividad.includes(searchTerm) ||
            activo_id.includes(searchTerm) ||
            taqresponsable.includes(searchTerm) ||
            area.includes(searchTerm) ||
            cantDocs.includes(searchTerm) ||
            estado.includes(searchTerm) ||
            fecha.includes(searchTerm) ||
            fechaFin.includes(searchTerm) ||
            updated_at.includes(searchTerm) ||
            created_at.includes(searchTerm)
        );
    });
    setdocumentos_mtto(filtered);
  };

  const [documentos_mtto_eliminados, setdocumentos_mtto_eliminados] = useState(state.documentos_Eliminados);

  const filterDocsEliminados = ( searchTerm ) => {
    const filtered = state.documentos_Eliminados.filter((data) => {
        const taqDeleteRegister   =   data.taqDeleteRegister.toLowerCase();
        const activo_id          =   data.activo_id.toLowerCase();
        const nombreDocumento     =   data.nombreDocumento.toLowerCase();
        const taqDocMttoActivo    =   data.taqDocMttoActivo.toLowerCase() ;
        const taqresponsable      =   data.taqresponsable.toLowerCase();
        const created_at          =   data.created_at.toString().toLowerCase();
        const updated_at          =   data.updated_at.toString().toLowerCase();
        return (
            taqDeleteRegister.includes(searchTerm) ||
            activo_id.includes(searchTerm) ||
            nombreDocumento.includes(searchTerm) ||
            taqDocMttoActivo.includes(searchTerm) ||
            taqresponsable.includes(searchTerm) ||
            updated_at.includes(searchTerm) ||
            created_at.includes(searchTerm)
        );
    });
    setdocumentos_mtto(filtered);
  };

  const Buttons = [{  
      "id"         : 0,
      "label"      : "Preventivos",
      "Myfunction" : ShowPreventivos,
      "estado"     : Panel_Preventivos
  },{
      "id"         : 1,
      "label"      : "Correctivos",
      "Myfunction" : ShowCorrectivos,
      "estado"     : Panel_Correctivos
  },{
      "id"         : 2,
      "label"      : "Mtto Por Horas",
      "Myfunction" : ShowHoras,
      "estado"     : Panel_Mtto_Horas
  },{
      "id"         : 3,
      "label"      : "Documentos",
      "Myfunction" : ShowDocumentos,
      "estado"     : Panel_Documentos
  },{
      "id"         : 4,
      "label"      : "Documentos Eliminadas",
      "Myfunction" : ShowDocumentosEliminados,
      "estado"     : Panel_Documentos_Eliminados
  }]
  
  return (
    <div className='w-full h-full rounded-md   flex justify-start items-center justify-items-center'>
      <div className='w-[150px] px-4 py-2 h-full  flex flex-col  justify-start items-center justify-items-center gap-3 '>
        {
          Buttons ? (
            Buttons.map( (data) => (
              <ButtonMenu
                Myfunction = { data.Myfunction }
                label = { data.label }
                estado = { data.estado }
                key = { data.id } 
              />
            ))
          ) : null
        }
      </div>
      {
        Panel_Preventivos ? (
          <div className='w-full  h-full py-2 px-4   flex flex-col justify-center items-center justify-items-center gap-2 '>
            <SearchInput SearchFunction = { filterDocsEliminados } />
            <div className=' w-full h-full flex flex-col gap-1 justify-start items-center justify-items-center'>
              {
                mttoPreventivosFiltrados ? (
                    mttoPreventivosFiltrados.map( (data) => (
                      <ManttoElement key={data.taqmttActivo}>
                        <>
                          <h3 className='text-justify'>
                            { data.actividad }
                          </h3>
                          <h3 className='text-justify'>
                            { data.fecha }
                          </h3>
                          <div className='flex gap-3'> 
                              <h3 className={`${ data.estado === 'EN PROCESO' ? 'text-[#ce1241]' : 'text-green-500' }`}>
                                { data.estado }
                              </h3>
                          </div>
                        </>
                      </ManttoElement>
                    ))
                ) : null
              }
            </div>
          </div>
        ) : null
      }
      {
        Panel_Correctivos ? (
          <div className='w-full  h-full py-2 px-4   flex flex-col justify-center items-center justify-items-center gap-2  '>
            <SearchInput SearchFunction = { filterCorrectivos } />
            <div className=' w-full h-full flex flex-col gap-1 justify-start items-center justify-items-center'>
              {
                mttoCorrectivosFiltrados ? (
                    mttoCorrectivosFiltrados.map( (data) => (
                        <ManttoElement key={data.taqmttActivo}>
                          <> 
                            <h3 className='lg:w-[60%] text-justify'>
                              { data.actividad }
                            </h3>
                            <h3 className='lg:w-[10%] text-justify'>
                              { data.fecha }
                            </h3>
                            <div className='text-end'> 
                                <h3 className={`${ data.estado === 'EN PROCESO' ? 'text-[#ce1241]' : 'text-green-500' }`}>
                                  { data.estado }
                                </h3>
                            </div>
                          </>
                        </ManttoElement>
                    ))
                ) : null
              }
            </div>
          </div>
        ) : null
      }
      {
        Panel_Mtto_Horas ? (
          <div className='w-full  h-full py-2 px-4   flex flex-col justify-center items-center justify-items-center gap-2 '>
            <SearchInput SearchFunction = { filterHoras } />
            <div className=' w-full h-full flex flex-col gap-1 justify-start items-center justify-items-center'>
              {
                mttoHoras ? (
                    mttoHoras.map( (data) => (
                        <ManttoElement key={data.taqmttActivo}>
                          <>
                            <h3> 
                              { data.taqmttActivo }
                            </h3>
                            <h3 className='text-justify'>
                              { data.actividad }
                            </h3>
                            <h3 className='text-justify'>
                              { data.fecha }
                            </h3>
                            <div className='flex gap-3'> 
                                <h3 className={`${ data.estado === 'EN PROCESO' ? 'text-[#ce1241]' : 'text-green-500' }`}>
                                  { data.estado }
                                </h3>
                            </div>
                          </>
                        </ManttoElement>
                    ))
                ) : null
              }
            </div>
          </div>
        ) : null
      }
      {
        Panel_Documentos ? (
          <div className='w-full  h-full py-2 px-4   flex flex-col justify-center items-center justify-items-center gap-2 '>
            <SearchInput SearchFunction = { filterDocs } />
            <div className=' w-full h-full flex flex-col gap-1 justify-start items-center justify-items-center'>
              {
                documentos_mtto ? (
                    documentos_mtto.map( (data) => (
                        <ManttoElement key={data.taqDocMttoActivo}>
                          <>
                            <h3> 
                              { data.nombre }
                            </h3>
                          </>
                        </ManttoElement>
                    ))
                ) : null
              }
            </div>
          </div>
        ) : null
      }
      {
        Panel_Documentos_Eliminados ? (
          <div className='w-full  h-full py-2 px-4 flex flex-col justify-center items-center justify-items-center gap-2 '>
            <SearchInput SearchFunction = { filterDocsEliminados } />
            <div className=' w-full h-full flex flex-col gap-1 justify-start items-center justify-items-center'>
              {
                documentos_mtto_eliminados ? (
                    documentos_mtto_eliminados.map( (data) => (
                        <ManttoElement 
                          key = { data.taqDeleteRegister }  
                        >
                          <>
                            <h3> 
                              { data.nombre }
                            </h3>
                          </>
                        </ManttoElement>
                    ))
                ) : null
              }
            </div>
          </div>
        ) : null
      }
    </div>
  )
}

export default PanelMantenimiento;
