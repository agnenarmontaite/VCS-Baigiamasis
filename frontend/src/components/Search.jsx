const Search = () => {
    return (
        <div className='search-section bg-cover bg-center flex items-center justify-center'>
            <div className='search-section-inner text-center flex flex-col'>
                <h1>Discover Your <span className='header-red text-red-500'>Perfect Rental</span></h1>
                <h3>Rent Equipment in Just a Few Clicks</h3>
                <form className='search-section-inputs flex justify-center items-center'>
                    <div className='input-wrapper relative'>
                        <input type="text" placeholder='Search for equipment'></input>
                        <i className="bi bi-search absolute"></i>
                    </div>

                    <div className='select-wrapper relative'>
                        <select>
                            <option value="">Select Category</option>
                            <option>Drilling equipment</option>
                            <option>Cutting equipment</option>
                            <option>Mounting equipment</option>
                            <option>Plumbing equipment</option>
                            <option>Cleaning equipment</option>
                        </select>
                        <i className="bi bi-tools absolute"></i>
                    </div>
                    <div className="search-button-box bg-white">
                        <button type="submit" className="border-0 rounded-full text-white bg-red-500 relative">
                            <i className="bi bi-search"></i>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Search;