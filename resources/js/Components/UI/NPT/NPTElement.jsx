
const NPTElement = ({ taqNPT, nombre, score,}) => {
  return (
    <div className='w-full h-[400px] px-4 py-2 flex flex-col justify-start items-start  border-2 border-black text-black font-bold'>
      <div className='w-full h-auto px-4 py-2 border-b border-black'>
        Mantenimiento NPT 
      </div>
      <div className='w-full h-[500px] px-4 py-2'>
        <BarChart scores = { score } />
      </div>
    </div>
  )
}


export default NPTElement;