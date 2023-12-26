
const SearchInput = ({ SearchFunction }) => {
  return (
    <input
        onChange = { (e) => SearchFunction(e.target.value.toLowerCase()) }
        className='w-full h-auto focus:outline-none bg-gray-100  border-2 border-grbg-gray-100 text-gray-800 placeholder-gray-800 font-bold rounded-md px-4' 
        placeholder='Buscar...'  
    />
  )
}


export default SearchInput;