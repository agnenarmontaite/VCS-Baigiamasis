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
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [products, setProducts] = useState('')

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
      <Search onSearch={handleSearch} />
      {searchCriteria.searchText || searchCriteria.category ? ('') : (<TopCategories />)}
      <ToolGrid searchCriteria={searchCriteria} />
    </main>
  );
}

export default Home;