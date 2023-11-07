import React, { useEffect } from 'react'
import { addMonths, endOfMonth, startOfMonth, format, addDays } from 'date-fns';

const Calendario = () =>  {
  return (
    <div className='w-full h-full p-4 bg-white rounded-md shadow-md shadow-black grid grid-cols-7 '>
        <div className='w-[150px] h-[150px] bg-white shadow shadow-black border border-[#385449] hover:scale-105 flex justify-center items-center gap-1 hover:bg-[#385449] hover:text-white  cursor-pointer transition duration-700 ease-in-out'>
          <div className='w-1/2 h-full p-2 flex justify-start items-start text-6xl'>
            1
          </div>
          <div className='w-1/2 h-full flex flex-col justify-end items-end p-2'>
            <div className='w-auto px-4 py-2 bg-[#CE1241] text-white font-bold rounded-md text-xs'>
              Subrutina
            </div>
          </div>
        </div>
    </div>
  )
}


export default Calendario; 