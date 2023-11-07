import { FC } from 'react'

interface Props{
    tittle:string,
    name:string
}

const CheckBox:FC<Props> = ({ tittle, name }) => {
  return (
    <label className='w-auto cursor-pointer flex justify-start items-center gap-2  hover:border-black  rounded-md px-4 py-2 hover:bg-[#385449] border border-gray-300 hover:text-white text-sm font-bold transition duration-700 ease-in-out'>
    <input type="checkbox" name={name} value={name} className='rounded-full'/>
        { tittle }
    </label>
  )
}

export default CheckBox;