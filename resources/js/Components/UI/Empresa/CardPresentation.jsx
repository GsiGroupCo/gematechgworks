
import { router } from '@inertiajs/react'

const EmpresaPresentacion_cart = ({ taqempresa, nombre, urlImage }) => {
  return (
    <a onClick={() => router.get(` empresa/${taqempresa}`)} className="w-full h-[250px] bg-white cursor-pointer hover:scale-105 scale-90 transition duration-700 rounded-md overflow-hidden flex flex-col justify-items-center justify-center items-center border border-black">
      <div className="w-full h-[80%]">
        {/* <Image
          src = {`/${urlImage}`} 
          alt = " activo image "
          width = { 4000 }
          height = { 3000 }
          priority = { false }
          className="w-full h-full object-fill"
        /> */}
      </div>
      <div className=" w-full min-h-[20%] py-2 bg-[#385449]   flex justify-center items-center justify-items-center p-2">
        <h3 className="text-white font-bold text-center"> { nombre } </h3>
      </div>
    </a>
  )
}


export default EmpresaPresentacion_cart;