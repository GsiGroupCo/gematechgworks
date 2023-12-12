import React from 'react'

const MenuButton = (props) => {

    const { label , cantidad , Myfunction, estado } = props

    return (
        <div 
            onClick={ () => Myfunction() } 
            className={`
                cursor-pointer
                border-2 
                bg-[#385449] 
                hover:bg-[#ce1241]
                hover:text-white 
                ${ estado ? ' bg-[#ce1241] scale-105' : '' }    
                hover:scale-105
                transition
                duration-700
                ease-in-out
                w-full
                px-4
                py-1
                rounded-md
                shadow-md
                flex
                flex-row
                justify-center
                items-center
                justify-items-center
                gap-3
            `}>
            <div className='flex w-full flex-row justify-between items-center lg:items-start justify-items-center gap-0 px-4 py-2'>
                <h3 className='text-white font-bold'> { label } </h3>
                {
                    cantidad ? (
                        <h3 className='text-white font-bold'> { cantidad } </h3>
                    ) : null
                }
            </div>
        </div>
    )
}

export default MenuButton;
