function ToolCard({item}) {
  return (
    <div className="tool-grid-item">
    <img src={item.image}></img>
    <p id="tool-grid-item-name">{item.name}</p>
    <p id="tool-grid-item-description">{item.description}</p>
    <p id="tool-grid-item-price">{item.price} € </p>
  </div>
  );
}

export default ToolCard;
