import React, { FC } from 'react'

const ActivoCounts = ({ icon, tittle, cant, MyFunction, estado }) =>  {
  return (
    <div onClick={ () => MyFunction() } className={`w-full h-auto px-4 transition duration-700 ease-in-out py-2 cursor-pointer ${estado ? 'bg-[#ce1241] scale-105' : ''} bg-[#385449]  text-white rounded-md font-bold flex justify-center items-center gap-3`}>
        <div className='w-[10%] flex'>
          {icon}
        </div>
        <span className='w-full flex justify-start items-center'> { tittle } { cant } </span>
    </div>
  )
}

export default ActivoCounts;