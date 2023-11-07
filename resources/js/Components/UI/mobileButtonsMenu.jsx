
const MobileButtonMenu = (props) => {

    const { icon , label , cantidad , Myfunction, estado } = props

    return (
        <div className='min-w-[110px] border border-black w-auto h-full hover:scale-150 relative bg-white focus:scale-125 px-2 flex flex-col justify-center items-center justify-items-center gap-1 rounded-md '>
            <img src = { icon } alt="" className='w-[25px] h-auto' loading="lazy"/>
            <h3 className='text-xs font-bold text-black'> { label } </h3>
        </div>
    )
}

export default MobileButtonMenu;
