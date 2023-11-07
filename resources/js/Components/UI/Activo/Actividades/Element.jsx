
const ActividadesElementList = ({ estado, ot }) => {
    return (
        <a href = {`/oms/${ot}`} className='w-full h-auto border transition ease-out duration-700 border-black hover:text-white hover:bg-[#385449] hover:border-white cursor-pointer px-4 py-2 rounded-md flex justify-between items-center justify-items-center text-black font-bold'>
            <div className='flex w-auto gap-3 '>
                <h3 className='hidden lg:block'> OT: </h3>
                <h3> { ot } </h3>
            </div>
            <div className='flex w-auto gap-3'>
                <h3 className='hidden lg:block text-justify'> ESTADO: </h3>
                <h3 className={`${ estado === 'EN PROCESO' ? 'text-[#ce1241]' : 'text-green-500' }`}> { estado } </h3>
            </div>
        </a>
    )
}

export default ActividadesElementList;