function ToolCard() {
  return (
    <div className="bg-white rounded-lg shadow p-4">
      <img className="w-full h-48 object-cover rounded" src="" alt="Tool" />
      <h3 className="text-lg font-semibold mt-2">Pjūklas</h3>
      <p className="text-gray-600">Lobzikas 3000</p>
      <button className="mt-2 bg-blue-500 text-white px-4 py-2 rounded">Plačiau</button>
    </div>
  );
}

export default ToolCard;
