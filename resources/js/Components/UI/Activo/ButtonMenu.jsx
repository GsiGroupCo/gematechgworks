
const ButtonMenu = (props) => {

    const {  label  , Myfunction, estado } = props

    return (
        <div 
            onClick={ () => Myfunction() } 
            className={`
                cursor-pointer
                bg-[#385449]
                hover:bg-[#ce1241]
                hover:text-white
                shadow-[#385449]
                ${ estado ? ' bg-[#ce1241] scale-110' : '' }    
                hover:scale-110
                transition
                duration-700
                ease-in-out
                w-full
                h-auto
                py-2
                px-2
                md:px-4
                rounded-md
                shadow-md
                flex
                flex-row
                justify-center
                items-center
                justify-items-center
            `}>
            <div className='flex flex-col justify-center items-center justify-items-center '>
                <h3 className='text-white text-center font-bold'> { label } </h3>
            </div>
        </div>
    )
}

export default ButtonMenu;
