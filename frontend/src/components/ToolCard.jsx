function ToolCard({item}) {
  return (
    <div className="tool-grid-item">
      <img src={item.images[0]} alt={item.name} />
      <p id="tool-grid-item-name font-semibold">{item.name}</p>
      <div id="tool-grid-item-description">
        {Object.entries(item.description).map(([key, value]) => (
          <p key={key}>{key}: {value}</p>
        ))}
      </div>
      <p id="tool-grid-item-price">{item.price} € / day</p>
    </div>
  );
}

export default ToolCard;