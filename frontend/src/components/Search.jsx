const Search = ({ searchCriteria, onSearch }) => {

    return (
        <div className="flex items-center justify-center pt-5">
            <div className="text-center flex flex-col md:w-[90%] lg:w-full max-w-4xl space-y-6">


                <div className="flex flex-col md:flex-row justify-center items-center lg:w-[894px] ">
                    <div className={"w-[100%] md:w-[70%] relative mb-2 md:mb-0 "}>
                        <input
                            type="text"
                            value={searchCriteria.searchText}
                            onChange={(e) => onSearch({ ...searchCriteria, searchText: e.target.value })}
                            placeholder="Search for equipment"
                            className="md:h-[70px] text-[20px] leading-[30px] w-full pl-[50px] pr-[40px] py-[10px] rounded-full md:rounded-[50px] md:border-[1px] shadow-md border-gray-300"
                        />
                        <i className="bi bi-search absolute left-4 top-1/2 -translate-y-1/2 text-[20px] text-gray-400"></i>
                        <button
                            type="button"
                            onClick={() => {
                                onSearch({ searchText: '', category: '' });
                            }}
                            className={`border-0 rounded-full text-white bg-gray-500 absolute w-[25px] h-[25px] md:w-[130px] md:h-[45px] text-[15px] md:text-[20px] right-3 top-[25%] md:top-[20%] flex items-center justify-center transition-all duration-300 transform ${searchCriteria.searchText || searchCriteria.category ? 'translate-x-0 opacity-100 visible' : 'translate-x-full opacity-0 invisible'
                                }`}
                        >
                         <i className="bi bi-x-lg"></i><span className="hidden md:inline-block ml-1 text-[14px] tracking-wide">Clear filters</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Search;
