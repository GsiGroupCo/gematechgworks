import { FC } from "react";
import { Link, router } from '@inertiajs/react'

const CardGeneral  = ({ 
  route      ,
  link       ,
  nombre     ,
}) => {

  return (
    <Link  href = {route} className=" min-w-[250px] w-auto min-h-[350px] max-h-[350px] h-auto bg-white cursor-pointer hover:scale-95 scale-90 transition duration-700 rounded-md overflow-hidden flex flex-col justify-items-center justify-center items-center border border-black">
      <div className="w-full h-[80%]">
        <img src = {link}  alt = {`imagen de ${nombre}`}  className="w-full h-full object-fill" loading="lazy" />
      </div>
      <div className=" w-full  min-h-[20%] h-auto py-2 bg-[#385449] flex justify-center items-center justify-items-center p-2">
        <h3 className="text-white font-bold text-center"> { nombre } </h3>
      </div>
    </Link>
  )
}

export default CardGeneral;