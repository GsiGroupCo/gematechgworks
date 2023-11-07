import React from 'react'
import SearchInput from './Search'

export default function Panel_general({ FunctionfilterData, children }) {
  return (
    <div className='w-full h-full flex flex-col justify-start items-center justify-items-center gap-2  px-4 py-2 overflow-y-auto'> 
        <div className='w-full'>
          <SearchInput SearchFunction = { FunctionfilterData } />
        </div>
        { children }
    </div>
  )
}
