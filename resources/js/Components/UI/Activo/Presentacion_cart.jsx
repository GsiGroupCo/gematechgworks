import { FC } from "react";
import { router } from '@inertiajs/react'

const Presentacion_Cart  = ({ 
  link       ,
  activo_id  ,
  nombre     ,
}) => {
  
  return (
    <a onClick={() => router.get(`activo/${activo_id}`)} className="w-full h-[250px] bg-white cursor-pointer hover:scale-95 scale-90 transition duration-700 rounded-md overflow-hidden flex flex-col justify-items-center justify-center items-center border border-black">
      <div className="w-full h-[80%]">
        <img src = {link}  alt = {`imagen de ${nombre}`}  className="w-full h-full object-cover" loading="lazy"/>
      </div>
      <div className=" w-full  min-h-[20%] h-auto py-2 bg-[#385449] flex justify-center items-center justify-items-center p-2">
        <h3 className="text-white font-bold text-center"> { nombre } </h3>
      </div>
    </a>
  )
}


export default Presentacion_Cart;