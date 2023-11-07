import gsi_bg from '../../../../public/img/DSC_0707.jpg';
import LoginForm from "@/Components/forms/Auth/LoginForm/LoginForm";

export default function SignUpPage() {
  return (
    <main className='w-full h-screen  flex justify-center items-center justify-items-center'>
      <LoginForm/>
      <div className='w-[80%] h-full'>
        <img src={gsi_bg} alt="bg-render" className='w-full h-full object-cover' loading="lazy"/>
      </div>
    </main>
  )
}
