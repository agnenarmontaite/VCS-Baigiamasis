function ToolCard({item}) {
  return (
    <div className="tool-grid-item">
    <img src={item.image} alt="tool-image"></img>
    <p className="tool-grid-item-name font-semibold">{item.name}</p>
    <p className="tool-grid-item-description">{item.description}</p>
    <p className="tool-grid-item-price">{item.price} € </p>
  </div>
  );
}

export default ToolCard;
