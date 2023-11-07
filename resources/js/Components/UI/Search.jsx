
const SearchInput = ({ SearchFunction }) => {
  return (
    <input
        onChange = { (e) => SearchFunction(e.target.value.toLowerCase()) }
        className='w-full h-[50px] focus:outline-none bg-gray-300  border-2 border-white font-bold rounded-md  px-4 ' 
        placeholder='Buscar...'  
    />
  )
}


export default SearchInput;