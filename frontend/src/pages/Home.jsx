import { useEffect, useState } from 'react';
import Search from '../components/Search';
import ToolGrid from '../components/ToolGrid';
import TopCategories from '../components/TopCategories';
import SearchResults from '../components/SearchResults';

function Home() {
  const [searchCriteria, setSearchCriteria] = useState({
    searchText: '',
    category: ''
  });

  const handleSearch = ({ searchText, category }) => {
    setSearchCriteria({ ...searchCriteria, searchText, category });
  }

  return (
    <main>
      <Search onSearch={handleSearch} />
      {searchCriteria.searchText || searchCriteria.category ? ('') : (<TopCategories />)}
      <ToolGrid searchCriteria={searchCriteria} />
    </main>
  );
}

export default Home;