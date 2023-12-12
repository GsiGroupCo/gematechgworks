
const SearchInput = ({ SearchFunction }) => {
  return (
    <input
        onChange = { (e) => SearchFunction(e.target.value.toLowerCase()) }
        className='w-full h-auto focus:outline-none bg-gray-600  border-2 border-gray-500 text-white placeholder-white font-bold rounded-md px-4' 
        placeholder='Buscar...'  
    />
  )
}


export default SearchInput;