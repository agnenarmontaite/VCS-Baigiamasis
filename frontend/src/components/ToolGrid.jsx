function ToolGrid({ products }) {

  return (
    <div className="most-popular-tools">
      <h2>Most popular tools</h2>
      <div className="tool-grid">
        <div className="tool-grid-inner">
          {products.map((item) => {
            return (<div className="tool-grid-item" key={item._id}>
              <img src={item.image}></img>
              <p id="tool-grid-item-name">{item.name}</p>
              <p id="tool-grid-item-description">{item.description}</p>
              <p id="tool-grid-item-price">{item.price} € </p>
            </div>)
          })}
        </div>
      </div>
    </div>
  )
}

export default ToolGrid