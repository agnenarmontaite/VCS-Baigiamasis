import { useState } from 'react';
import HomeSearch from '../components/HomeSearch';
import ToolGrid from '../components/ToolGrid';
import TopCategories from '../components/TopCategories';

function Home() {
  const [searchCriteria, setSearchCriteria] = useState({
    searchText: '',
    category: ''
  });
  const [isSearchActive, setIsSearchActive] = useState(false);

  useEffect(() => {
    fetch('http://localhost:3000/tools')
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setProducts(data.tools);
      })
      .catch((error) => {
        console.error('Fetch error:', error);
      });
  }, []);

  const handleSearch = (criteria) => {
    if (!criteria.category && !criteria.searchText) {
      setSearchResults(null);
      setSearchCriteria({ category: '', searchText: '' });
      setIsSearchActive(false);
      return;
    }

    setIsSearchActive(true);
    setSearchCriteria(criteria);

    console.log('Search Input:', criteria);

    const filteredProducts = products.filter((product) => {
      const matchesSearch = !criteria.searchText || product.name.toLowerCase().includes(criteria.searchText.toLowerCase());

      const matchesCategory = !criteria.category || product.description['productType'] === criteria.category;

      return matchesSearch && matchesCategory;
    });

    console.log('Filtered Results:', filteredProducts);
    console.log('Number of matches:', filteredProducts.length);

    setSearchResults(filteredProducts);
  };

  return (
    <main>
      <HomeSearch onSearch={handleSearch} />
      {searchCriteria.searchText || searchCriteria.category ? ('') : (<TopCategories />)}
      <div className='flex flex-col items-center mt-5'>
        <h2 className="text-[26px] sm:text-[32px] lg:text-[48px] p-[40px] text-center">Most popular tools</h2>
        <ToolGrid searchCriteria={searchCriteria} />
      </div>
    </main>
  );
}

export default Home;