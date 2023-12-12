import React, { useEffect, useState } from 'react'
import logo_gema from '../../../../public/img/gema.png'
import logo_gworks from '../../../../public/img/LogoGworks.png'
import ButtonMenu from './MenuButton';

export default function MenuAppbar({ Buttons, Default }) {

    return (
        <div className='w-full h-auto bg-[#385449] xl:bg-transparent xl:w-[20%] xl:h-full flex flex-row xl:flex-col justify-around items-center p-4'>
            <div onClick = { () => Default() }  className=' cursor-pointer w-full h-auto xl:p-4 flex justify-center items-center gap-2 xl:bg-white xl:rounded-md xl:shadow-md shadow-black' >
                <img src={logo_gema} alt="logo gworks" className='w-[50px] xl:w-[70px] xl:h-[70px] object-cover' loading="lazy" />
                <span className='text-4xl font-bold text-white xl:text-black'>GEMA</span>
            </div> 
            <div className=' hidden w-full xl:flex flex-col justify-center items-center gap-1'>
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
            <div className='w-full h-auto p-4 hidden xl:flex justify-center items-center bg-white rounded-md shadow-md shadow-black'>
                <img src={logo_gworks} alt="logo gworks" className='w-full h-full object-cover' loading="lazy"/>
            </div>
        </div>
    )
}
