import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <div className="container m-auto p-10 text-center">
        <div className="bg-white border border-gray-100 rounded-[10px] shadow-lg transition-shadow p-10">
        <h2 className="text-[26px] sm:text-[32px] lg:text-[48px] p-[40px] text-center">404</h2>
        <p className="font-bold text-[14px] md:text-[16px] tracking-[2px] pb-4">Oops! The page you are looking for does not exist.</p>
        <button
        className='items-center bg-red-500 text-white rounded-[25px] border border-red-500 hover:border-black ml-2 px-5 py-3 font-medium'
        ><Link to="/">Back to home</Link></button>
        
        </div>
      
    </div>
  )
}

export default NotFound
