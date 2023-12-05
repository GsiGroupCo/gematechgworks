
import { router } from '@inertiajs/react'

const AvatarCart = ({ responsable_id, nombre, urlImage }) => {
  return (
    <a onClick={() => router.get(`responsables/${responsable_id}`)}  className="w-full h-[500px] cursor-pointer hover:scale-105 scale-90 transition duration-700 rounded-md overflow-hidden flex flex-col justify-items-center justify-center items-center border border-black">
      <div className="w-full h-[80%]">
        <img  src = {`https://gworks.gematech.co/storage/users/${urlImage}`} alt = {`imagen de ${nombre}`} className="w-full h-full object-cover" loading="lazy"/>
      </div>
      <div className=" w-full min-h-[20%] py-2  bg-[#385449] flex justify-center items-center justify-items-center p-2">
        <h3 className="text-white font-bold text-center"> { nombre } </h3>
      </div>
    </a>
  )
}

export default AvatarCart;