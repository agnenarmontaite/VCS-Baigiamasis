const Search = () => {
    return (
        <div className='search-section'>
            <div className='search-section-inner'>
                <h1>Discover Your <span className='header-red'>Perfect Rental</span></h1>
                <h3>Rent Equipment in Just a Few Clicks</h3>
                <form className='search-section-inputs'>
                    <div className='input-wrapper'>
                        <input type="text" placeholder='Search for equipment'></input>
                        <i className="bi bi-search"></i>
                    </div>

                    <div className='select-wrapper'>
                        <select>
                            <option value="">Select Category</option>
                            <option>Drilling equipment</option>
                            <option>Cutting equipment</option>
                            <option>Mounting equipment</option>
                            <option>Plumbing equipment</option>
                            <option>Cleaning equipment</option>
                        </select>
                        <i className="bi bi-tools"></i>
                    </div>
                    <div className="search-button-box">
                        <button type="submit">
                            <i className="bi bi-search"></i>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Search;