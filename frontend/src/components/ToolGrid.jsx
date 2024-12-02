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
  }, [searchCriteria, products])

  const handleSearch = () => {
    if ((!searchCriteria.category && !searchCriteria.searchText) || products.length == 0) {
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
    <div className="flex flex-col items-center my-7 w-[90%] max-w-[1600px]">
      {isSearchActive ? <h2 className="text-[20px] text-center p-1 md:p-6">Found {searchResults.length} results</h2> : ''}
      <div className="flex justify-center">
        <div className="flex flex-wrap justify-around content-stretch gap-2">
          {
            (searchResults && isSearchActive ? searchResults : products).map((item) => (
              <ToolCard item={item} key={item._id} />
            ))
          }
        </div>
      </div>
    </div>
  );
}

export default ToolGrid;