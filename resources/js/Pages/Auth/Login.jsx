 
import LoginForm from '@/Components/forms/Auth/LoginForm';
import gsi_bg from '../../../../public/img/DSC_0707.jpg';

export default function SignUpPage() {
  return (
    <>
      <main className='w-full h-screen flex justify-center items-center overflow-x-hidden overflow-y-auto'>
        <LoginForm/>
        <div className='w-full h-full md:w-[60%] lg:w-[70%] xl:w-[80%]'>
          <img src={gsi_bg} alt="bg-render" className='w-full h-full object-cover' loading="lazy"/>
        </div>
      </main> 
    </>
  )
}
