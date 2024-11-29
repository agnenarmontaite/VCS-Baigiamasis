import React from 'react'

const AboutUs = () => {
  return (
    <div className="container m-auto p-10  text-center">
        <div className="lg:h-[550px] bg-white border border-gray-100 rounded-[10px] shadow-lg transition-shadow overflow-hidden">
            <h1 className='text-[26px] sm:text-[32px] lg:text-[48px] p-[40px] text-center'>About Us</h1>
            <p className="text-[18px] tracking-[2px] p-10 pt-2 pb-2">We are the leaders in the tool rental industry with the experience that is needed to provide the best services. Our team is eager to help you have the best experience picking out the tools needed for your projects.               
            </p>
            <p className="text-[18px] mb-[10px] tracking-[2px] p-10 pt-2">
                With the tools' prices increasing daily and new projects piling up we are here to offer you an alternative to over stuffed garages and sheds. Pick out your tools and hit reserve. It is that easy to have all the equipment you need to build your dream project! 
            </p>
            
            <div className="bg-[url('../src/assets/equipment-photo.jpg')] bg-cover bg-center min-h-[20vh] m-0 p-0"></div>

        </div>
      
    </div>
  )
}


export default AboutUs
