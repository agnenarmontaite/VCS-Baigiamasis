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
    <main className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-4">Visi produktai</h2>
      <Search />
      <TopCategories />
      <ToolGrid />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((product) => (
          <div key={product._id} className="p-4 border rounded">
            <h3 className="font-bold text-lg">{product.name}</h3>
            <p>{product.description}</p>
            <p className="text-green-600 font-semibold">{product.price} €</p>
          </div>
        ))}
      </div>
    </main>
  );
}

export default Home;
