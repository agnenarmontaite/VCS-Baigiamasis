import { Link } from 'react-router-dom';

function ToolCard({ item }) {

  const detailsToShow = [
    'Galia',
    'Maksimali galia',
    'Kuro tipas',
    'Kuro sąnaudos',
    'Sūkiai per minutę',
    'Smūgiai per minutę',
    'Smūgio energija',
    'Sūkių skaičius tuščia eiga',
    'Svoris',
    'Maksimalus sūkių dažnis per minutę',
    'Grandininio pjūklo tipas',
    'Konteinerio talpa'
  ]

  const cardDetails = () => {
    let details = []
    let count = 1

    detailsToShow.map((detail) => {
      Object.entries(item.description).map(([key, value]) => {
        if (detail === key.trim() && count <=3) {
          details.push([key, value])
          count++
        }
      })
    })

    return details
  }

  return (
    <div className="">
      <Link to={`/tools/${item._id}`}>
        <div className="border border-gray-100 rounded-[10px] hover:shadow-lg transition-shadow w-[300px] h-[100%] pb-5">
          <div className='flex items-center justify-center w-[300px] py-4 lg:w-[300px] lg:h-[300px] bg-white'>
          <img className="" src={item.images[0]} alt={item.name} />
          </div>
          <p className="font-semibold text-[22px] mt-[10px] tracking-[1px] text-center">{item.name}</p>
          <div className="text-[14px] mb-[10px] text-center">
            <div className="flex flex-wrap justify-center my-2 text-gray-500 gap-3">
            {
              cardDetails().map(([key, value]) => (
                <p key={key}>
                  <strong>{key}</strong>: {value}
                </p>
              ))
            }
            </div>
          </div>
          <p className="tool-grid-item-price text-red-500 text-center">{item.price} € / day</p>
        </div>
      </Link>
    </div>
  );
}

export default ToolCard;