 
const Actions = ({ Acctions, Acciones, children }) => { 
    return (
        <div className=" w-auto h-auto flex flex-col justify-center items-center justify-items-center gap-3 ">
            {
                Acctions ? (
                    <div className="max-w-[500px] px-4 py-2">
                        {
                            Acciones ? (
                                Acciones.map( (data) => (
                                <button onClick = { data.function } key = { data.id } className = {`  w-full mb-2 transition duration-700 ease-in-out h-auto text-white border-black border-2 font-bold  rounded-md px-4 py-2 ${ data.estate === 1 ? 'bg-green-600 hover:bg-green-800 hover:border-green-800' : 'bg-yellow-700 hover:bg-yellow-800 hover:border-yellow-800' }  hover:text-white hover:border-white   `} >
                                    { data.label }
                                </button>
                                ))
                            ) : null
                        }
                    </div>
                ) : null
            }
            { children }
        </div>
    )
}

export default Actions;
