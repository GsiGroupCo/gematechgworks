import CloseIcon from '@/Components/Icons/close';

const Modal = ({ isVisible, onClose, children, tittle }) => {
  
  if( !isVisible )return null;
  
  return (
    <div className="fixed z-20 inset-0 bg-black  bg-opacity-25 backdrop-blur-sm flex justify-center items-center"> 
      <div className='w-auto'>
        <div className='bg-white rounded border-2 border-white  shadow-md'>
          <div className='w-full h-auto bg-[#385449] px-4 py-2 flex justify-between items-center justify-items-center gap-3 text-white font-bold'>
            <div>
              { tittle }
            </div>
            <button onClick={ () => onClose() } className=" w-auto p-1 hover:scale-105 bg-red-500 transition duration-700 ease-in-out flex justify-center items-center justify-items-center rounded-full text-white border border-red-800 hover:bg-red-800 hover:border-white">
              <CloseIcon color='#FFFFFF' height='25px' width='25px'/>
            </button>
          </div>
          { children }
        </div>
      </div>
    </div>
  )
}

export default Modal