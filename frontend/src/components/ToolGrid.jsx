import { useEffect, useState } from "react";
import ToolCard from "./ToolCard";

function ToolGrid() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/products')
      .then((res) => res.json())
      .then((data) => setProducts(data.products || []))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="most-popular-tools flex flex-col items-center">
      <h2>Most popular tools</h2>
      <div className="tool-grid flex justify-center">
        <div className="tool-grid-inner flex flex-wrap justify-around">
          {products.map((item) => {
            return (<ToolCard item={item} key={item._id}/>)
          })}
        </div>
      </div>
    </div>
  )
}

export default ToolGrid