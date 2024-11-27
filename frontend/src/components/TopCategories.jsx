import { GiCircularSaw, GiDrill } from 'react-icons/gi'
import { MdMoreHoriz, MdPlumbing } from 'react-icons/md'
import { Link } from 'react-router-dom';

const TopCategories = () => {
    return (
        <div className='flex flex-col items-center'>
            <h2 className='text-[26px] sm:text-[32px] lg:text-[48px] p-[40px] text-center'>Browse From Top Categories</h2>
            <div className='flex flex-col md:flex-row md:flex-wrap md:justify-around lg:justify-between lg:w-[90%] items-center gap-[5px] p-[15px] px-[20px] py-[15px] pl-[10px] max-w-[1100px]'>
                <Link to="#drilling-equipment" className="flex w-[100%] justify-center md:w-auto items-center gap-[10px] border border-[#969393] text-[16px] rounded-full pr-[20px] py-[15px] pl-[10px]">
                    <GiDrill className="category-icon text-[22px] rounded-full p-[10px] bg-red-50 text-red-500 box-content" />
                    Drilling equipment
                </Link>
                <Link to="#cutting-equipment" className="flex w-[100%] justify-center md:w-auto items-center gap-[10px] border border-[#969393] text-[16px] rounded-full pr-[20px] py-[15px] pl-[10px]">
                    <GiCircularSaw className='category-icon text-[22px] rounded-full p-[10px] bg-green-50 text-green-500 box-content' /> 
                    Cutting equipment
                </Link>
                <Link to="#plumbing-equipment" className="flex w-[100%] justify-center md:w-auto items-center gap-[10px] border border-[#969393] text-[16px] rounded-full pr-[20px] py-[15px] pl-[10px]">
                    <MdPlumbing className='text-[22px] rounded-full p-[10px] bg-purple-50 text-purple-500 box-content' />
                    Plumbing equipment
                </Link>
                <Link to="#more" className="flex w-[100%] justify-center items-center md:w-auto gap-[10px] border border-[#969393] text-[16px] rounded-full pr-[20px] py-[15px] pl-[10px]">
                    <MdMoreHoriz className='text-[22px] rounded-full p-[10px] bg-orange-50 text-orange-500 box-content' />
                    More
                </Link>
            </div>
        </div>
    );
}

export default TopCategories;
