import { useEffect, useState } from 'react';
import ToolCard from './ToolCard';

function ToolGrid({ searchCriteria = { searchText: '', category: '' }, limit = '' }) {
  const [products, setProducts] = useState([]);
  const [searchResults, setSearchResults] = useState(null);
  const [isSearchActive, setIsSearchActive] = useState(false);

  useEffect(() => {
    fetch('http://localhost:3000/tools')
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        const tools = data.tools.map((item) => {
          if(item.name && item.description && item.price && item.images) {
            return item
          }
        }).filter( Boolean )

        console.log(tools)

        if (limit) {
          setProducts(tools.slice(0, 8))
        } else {
          setProducts(tools)
        }
      })
      .catch((error) => {
        console.error('Fetch error:', error);
      });
  }, []);

  console.log(products)
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
      const matchesSearch = !searchCriteria.searchText || (product.name || '').toLowerCase().includes(searchCriteria.searchText.toLowerCase());

      const matchesCategory = !searchCriteria.category || (product.description['Prekės tipas'] || '') === searchCriteria.category;

      return matchesSearch && matchesCategory;
    });

    console.log('Filtered Results:', filteredProducts);
    console.log('Number of matches:', filteredProducts.length);

    setSearchResults(filteredProducts);
  };

  return (
    <div className="flex flex-col items-center my-7 w-[90%] max-w-[1500px]">
      {isSearchActive ? <h2 className="text-[20px] text-center p-1 md:p-6">Found {searchResults.length} results</h2> : ''}
      <div className="flex justify-center items-center">
        <div className="flex flex-wrap justify-center content-stretch gap-2">
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