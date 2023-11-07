
const Caracteristica_target = ({ name, value }) => {
  return (
    value ? (
      <div className="w-full h-auto px-4 py-2 border-2 text-xs border-[#385449] text-[#385449] rounded-md font-bold hover:text-white hover:bg-[#ce1241] transition duration-700 ease-in-out cursor-pointer">
          { name } : { value }
      </div>
    ) : null
  )
}

export default Caracteristica_target;