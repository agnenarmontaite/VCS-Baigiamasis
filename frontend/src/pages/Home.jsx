import { GiCircularSaw, GiDrill } from 'react-icons/gi'
import { MdMoreHoriz, MdPlumbing } from 'react-icons/md'

function Home() {
  return (
    <main>
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
              <i class="bi bi-tools"></i>
            </div>
            <div className="search-button-box">
              <button type="submit">
                <i className="bi bi-search"></i>
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className='top-categories'>
        <h2>Browse From Top Categories</h2>
        <div className='top-categories-list'>
          <a href="#drilling-equipment"><GiDrill className="category-icon drill-icon" />Drilling equipment</a>
          <a href="#cutting-equipment"> <GiCircularSaw className='category-icon cutting-icon' /> Cutting equipment</a>
          <a href="#plumbing-equipment"> <MdPlumbing className='category-icon plumbing-icon'/> Plumbing equipment</a>
          <a href="#more"> <MdMoreHoriz className='category-icon more-icon'/> More</a>
        </div>
      </div>
    </main>
  );
}

export default Home;
