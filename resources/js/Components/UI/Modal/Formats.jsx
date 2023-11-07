const Formats = ({ Acciones }) => {

    return (
     <div className="w-full h-auto  flex flex-col justify-center items-center justify-items-center gap-3 ">
        {
            Acciones ? (
                <div className="px-4 py-2">
                    {
                        Acciones ? (
                            Acciones.map( (data) => (
                            <button onClick = { () => data.function() } key = { data.id } className = {` w-full mb-2 transition bg-green-500 hover:bg-green-800 duration-700 ease-in-out h-auto text-white border-black border-2 font-bold flex gap-3 justify-center items-center justify-items-center  rounded-md px-4 py-2 hover:text-white hover:border-white   `} >
                                { data.icon }
                                { data.label }
                            </button>
                            ))
                        ) : null
                    }
                </div>
            ) : null
        }
    </div>
  )
}

export default Formats;
