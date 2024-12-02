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
        if (detail === key.trim() && count <= 3) {
          details.push([key, value])
          count++
        }
      })
    })

    return details
  }

  return (
    <div className='m-1'>
      <Link to={`/tools/${item._id}`}>
        <div className="border border-gray-300 bg-white rounded-[10px] hover:shadow-lg transition-shadow w-[150px] sm:w-[225px] md:w-[300px] h-[100%] pb-5">
          <div className='flex items-center justify-center rounded-[10px] w-[148px] sm:w-[223px] md:w-[298px] py-4 h-[148px] sm:h-[223px] md:h-[298px] bg-white'>
            <img className="rounded-t-[10px]" src={item.images[0]} alt={item.name} />
          </div>
          <p className="font-semibold text-[14px] sm:text-[18px] md:text-[22px] mt-[10px] tracking-[1px] text-center">{item.name}</p>
          <div className="text-[12px] mb-[10px] text-center">
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
          <p className="tool-grid-item-price text-red-500 text-center text-[13px] sm:text-[16px]">{item.price} € / day</p>
        </div>
      </Link>
    </div>
  );
}

export default ToolCard;