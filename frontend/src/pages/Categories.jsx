import GeneratorLogo from '../assets/generatorius.svg?react'
import RotaryHammerLogo from '../assets/perforatorius.svg?react'
import ElectricRouterLogo from '../assets/elektrine-freza.svg?react'
import RouterLogo from '../assets/freza.svg?react'
import TileCuttingMachineLogo from '../assets/plyteliu-pjovimo-stakles.svg?react'
import CircularSawLogo from '../assets/diskinis-pjuklas.svg?react'
import CuttingMachineLogo from '../assets/pjovimo-stakles.svg?react'
import DemolitionHammersLogo from '../assets/atskelimo-plaktukas.svg?react'
import ChainSawsLogo from '../assets/grandininis-pjuklas.svg?react'
import ConstructionVacuumLogo from '../assets/statybinis-dulkiu-siurblys.svg?react'
import ToolGrid from '../components/ToolGrid';
import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import Search from '../components/Search'


const Categories = () => {
    const [searchCriteria, setSearchCriteria] = useState({
        searchText: '',
        category: useSearchParams()[0].get("category") || ''
    });

    const categories = [
        { key: "Generatoriai", title: "Generators", icon: <GeneratorLogo className="w-[100%] h-[100%]" /> },
        { key: "Perforatoriai", title: "Rotary Hammers", icon: <RotaryHammerLogo className="w-[100%] h-[100%]" /> },
        { key: "Elektrinė freza", title: "Electric Routers", icon: <ElectricRouterLogo className="w-[100%] h-[100%]" /> },
        { key: "Freza", title: "Routers", icon: <RouterLogo className="w-[100%] h-[100%]" /> },
        { key: "Plytelių pjovimo staklės", title: "Tile Cutting Machines", icon: <TileCuttingMachineLogo className="w-[100%] h-[100%]" /> },
        { key: "Diskinis pjūklas", title: "Circular Saws", icon: <CircularSawLogo className="w-[100%] h-[100%]" /> },
        { key: "Pjovimo staklės", title: "Cutting Machines", icon: <CuttingMachineLogo className="w-[100%] h-[100%]" /> },
        { key: "Atskėlimo plaktukai", title: "Demolition Hammers", icon: <DemolitionHammersLogo className="w-[100%] h-[100%]" /> },
        { key: "Grandininiai pjūklai", title: "Chain Saws", icon: <ChainSawsLogo className="w-[100%] h-[100%]" /> },
        { key: "Statybinis dulkių siurblys", title: "Construction Vacuums", icon: <ConstructionVacuumLogo className="w-[100%] h-[100%]" /> },
    ]

    const handleSearch = (category) => {
        setSearchCriteria({ ...searchCriteria, category })
    }

    return (
        <div>
            <Search searchCriteria={searchCriteria} onSearch={setSearchCriteria} />
            <div className='flex flex-col items-center'>
                <div
                    className="flex flex-wrap justify-around content-start gap-2 w-[75%] xs:w-[60%] sm:w-[70%] max-w-[900px] mt-3 md:mt-7"
                >
                    {categories.map((item) => (
                        <div key={item.key} onClick={() => handleSearch(item.key)} className={'text-center border flex flex-col items-center w-[120px] lg:w-[155px] mt-1 border-gray-200 bg-white ' + (searchCriteria.category === item.key ? 'shadow-[0_0_8px_2px_rgba(239,68,68,0.5)]' : 'shadow-md')}>
                            <span className="text-gray-500 w-[40px] sm:w-[60px] md:w-[70px] lg:w-[90px] p-1 lg:p-2">{item.icon}</span>
                            <h3 className="text-[12px] lg:text-[20px]">{item.title}</h3>
                        </div>
                    ))}
                </div>
                <ToolGrid searchCriteria={searchCriteria} />
            </div>
        </div>
    )
}

export default Categories;