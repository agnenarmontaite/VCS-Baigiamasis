import { useEffect, useState } from 'react';
import Search from '../components/Search';
import ToolGrid from '../components/ToolGrid';
import TopCategories from '../components/TopCategories';

function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/products')
      .then((res) => res.json())
      .then((data) => setProducts(data.products || []))
      .catch((err) => console.error(err));
  }, []);

  return (
    <main>
      <h2 className="text-2xl font-bold mb-4"></h2>
      <Search />
      <TopCategories />
      <ToolGrid />
    </main>
  );
}

export default Home;