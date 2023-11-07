import { router } from "@inertiajs/react";

const OmElement = ({ id, descripcion }) => {

    return (
        <a onClick={ () => router.get(`/om/${id}`) } className='w-full cursor-pointer h-auto  py-2  font-bold border bg-white  hover:bg-[#385449] text-black hover:text-white rounded-md flex flex-col sm:flex-row justify-start px-4 items-center justify-items-center sm:gap-3 gap-4 transition duration-700 ease-in-out'>
            <div className=' w-full sm:w-[10%] h-full flex justify-start items-center justify-items-center gap-3'>
                <h3> { id } </h3>
            </div>
            <div className='w-full sm:w-[60%] h-full flex justify-start items-center justify-items-center'>
                <h3 className='text-justify'>
                    { descripcion }
                </h3>
            </div>
        </a>
    )
}

export default OmElement;