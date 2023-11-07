
import React, { useState, FC } from 'react'
import Calendario from './Calendario';
import Mttos from './Mttos';
import CalendarIcon from '@/Components/Icons/calendar';

const PanelMantenimiento = ({ mantenimientos }) => {

    const [Panel_Mttos, setPanel_Mttos] = useState(true)
    const [Calendar, setCalendar] = useState(false)

    function ShowMttos() {
        if(Panel_Mttos){
            setPanel_Mttos(false)
            setCalendar(true)
        }else{
            setCalendar(false)
            setPanel_Mttos(true)
        }
    }

    function ShowCalendar() {
        if(Calendar){
            setPanel_Mttos(true)
            setCalendar(false)
        }else{
            setPanel_Mttos(false)
            setCalendar(true)
        }
    }

  return (
    <div className='w-full h-full  flex flex-col justify-start items-center p-4 gap-3'>
        <div className='w-auto h-auto  flex justify-center items-center cursor-pointer  bg-white rounded-md shadow shadow-black'>
            <div onClick={ () => ShowMttos() } className={`px-4 py-2 flex justify-center items-center gap-3 bg-[#385449] hover:bg-[#CE1241] text-white font-bold transition duration-700 ease-in-out ${ Panel_Mttos ? 'bg-[#CE1241]' : 'bg-[#385449]' }`}>
                <MantoIcon color='#fff' height='30px' width='30px' />
                Mantenimientos
            </div>
            <div onClick={ () => ShowCalendar() } className = { `px-4 py-2 flex justify-center items-center gap-3 bg-[#385449] hover:bg-[#CE1241] text-white font-bold transition duration-700 ease-in-out ${ Calendar ? 'bg-[#CE1241]' : 'bg-[#385449]' }` }>
                <CalendarIcon color='#fff' height='30px' width='30px' />
                Calendario
            </div>
        </div>
        {
            Panel_Mttos ? (
                <Mttos mantenimientos={ mantenimientos } />
            ) : ''
        }
        {
            Calendar ? (
                <Calendario/>
            ) : ''
        }
    </div>
  )
}

export default PanelMantenimiento;
