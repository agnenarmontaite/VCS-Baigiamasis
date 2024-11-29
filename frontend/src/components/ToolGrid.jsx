import { useEffect, useState } from 'react';
import ToolCard from './ToolCard';

function ToolGrid({ searchCriteria = { searchText: '', category: '' } }) {
  const [products, setProducts] = useState([]);
  const [searchResults, setSearchResults] = useState(null);
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

  useEffect(() => {
    handleSearch()
  }, [searchCriteria])

  const handleSearch = () => {
    if (!searchCriteria.category && !searchCriteria.searchText) {
      setSearchResults(null);
      setIsSearchActive(false);
      return;
    }

    setIsSearchActive(true)

    console.log('Search Input:', searchCriteria);

    const filteredProducts = products.filter((product) => {
      const matchesSearch = !searchCriteria.searchText || product.name.toLowerCase().includes(searchCriteria.searchText.toLowerCase());

      const matchesCategory = !searchCriteria.category || product.description['Prekės tipas'] === searchCriteria.category;

      return matchesSearch && matchesCategory;
    });

    console.log('Filtered Results:', filteredProducts);
    console.log('Number of matches:', filteredProducts.length);

    setSearchResults(filteredProducts);
  };

  return (
    <div className="most-popular-tools flex flex-col items-center mt-6 ">
      <h2 className="text-[26px] sm:text-[32px] lg:text-[48px] text-center p-1 md:p-6">{isSearchActive ? `Found ${searchResults.length} results` : 'Most popular tools'}</h2>
      <div className="tool-grid flex justify-center">
        <div className="tool-grid-inner flex flex-wrap justify-around w-[90%]">
          {(searchResults && isSearchActive ? searchResults : products).map((item) => (
            <ToolCard item={item} key={item._id} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default ToolGrid;