function ToolCard({item}) {
  return (
    <div className="tool-grid-item w-[30%] my-[30px] border border-gray-100 rounded-[10px]">
    <img src={item.image} alt="tool-image"></img>
    <p className="tool-grid-item-name font-semibold text-[22px] mt-[10px] tracking-[2px]">{item.name}</p>
    <p className="tool-grid-item-description text-[18px] mb-[10px] tracking-[2px]">{item.description}</p>
    <p className="tool-grid-item-price text-red-500">{item.price} € </p>
  </div>
  );
}

export default ToolCard;
