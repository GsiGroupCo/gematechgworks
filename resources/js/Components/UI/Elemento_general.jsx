import { Link, router } from '@inertiajs/react'
import React from 'react'

export default function Elemento_general({ children, link }) {
  return (
    <Link href={link} className='w-full h-auto cursor-pointer transition duration-700 ease-in-out px-4 py-2 bg-white font-bold text-black  rounded-md border border-[#385449] flex justify-between items-center gap-2 '>
        { children }
    </Link>
  )
}
