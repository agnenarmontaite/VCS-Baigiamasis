import { Link } from 'react-router-dom';

function ToolCard({ item }) {
  return (
    <div className="w-[30%] my-[30px]">
      <Link to={`/tools/${item._id}`}>
        <div className="border border-gray-100 rounded-[10px] hover:shadow-lg transition-shadow">
          <img src={item.images[0]} alt={item.name} />
          <p className="font-semibold text-[22px] mt-[10px] tracking-[1px] text-center">{item.name}</p>
          <div className="text-[14px] mb-[10px] text-center">
            {Object.entries(item.description).map(([key, value]) => (
              <p key={key}>
                {key}: {value}
              </p>
            ))}
          </div>
          <p id="tool-grid-item-price text-red-500">{item.price} € / day</p>
        </div>
      </Link>
    </div>
  );
}

export default ToolCard;