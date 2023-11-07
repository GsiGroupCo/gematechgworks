
const  Formats = ({ 
    Activo
}) => { 

    const Formats = [
    {
        "id"         : "123213",
        "label"      : "Ficha tecnica de activo",
        "estate"     : 1,
        "link"       : `/Download/activo/${Activo}`,
    },{
        "id"         : "31806",
        "label"      : "Ficha general de activo",
        "estate"     : 1,
        "link"       : `/Download/activo/ficha_tecnica/${Activo}`,
    }]

    return (
        <div className="w-auto h-auto flex flex-col justify-center items-center justify-items-center gap-3 ">
            <div className="max-w-[500px] px-4 py-2 flex flex-col ">
                {
                    Formats ? (
                        Formats.map( (data) => (
                        <a href = { ` ${ data.link } ` } key = { data.id } className = {`  w-full mb-2 transition duration-700 ease-in-out h-auto text-white border-black border-2 font-bold  rounded-md px-4 py-2 ${ data.estate === 1 ? 'bg-green-600 hover:bg-green-800 hover:border-green-800' : 'bg-yellow-700 hover:bg-yellow-800 hover:border-yellow-800' }  hover:text-white hover:border-white   `} >
                            { data.label }
                        </a>
                        ))
                    ) : null
                }
            </div>
        </div>
    )
}

export default Formats;
