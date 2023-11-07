
const Presentacion_cart = ({ 
  taqHer  ,
  nombre      ,
  urlImage    ,
}) => {
  return (
    <a href = { `/showherramienta/${taqHer}` } className="w-full h-[450px] cursor-pointer hover:scale-95 scale-90 transition duration-700 rounded-md overflow-hidden flex flex-col justify-items-center justify-center items-center border border-black">
      <div className="w-full h-[80%]">
        {/* <Image
          src = {`/${urlImage}`} 
          alt = " activo image "
          width = { 4000 }
          height = { 3000 }
          priority = { false }
          className="w-full h-full object-cover"
        /> */}
      </div>
      <div className=" w-full min-h-[20%] py-2 bg-[#385449]   flex justify-center items-center justify-items-center p-2">
        <h3 className="text-white font-bold text-center"> { nombre } </h3>
      </div>
    </a>
  )
}


export default Presentacion_cart;