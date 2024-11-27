import { useEffect, useState } from 'react';
import ToolCard from './ToolCard';

function ToolGrid() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/products')
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products || []);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="most-popular-tools">
      <h2>Most popular tools</h2>
      <div className="tool-grid">
        <div className="tool-grid-inner">
          {products.map((item) => (
            <ToolCard item={item} key={item._id} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default ToolGrid;
