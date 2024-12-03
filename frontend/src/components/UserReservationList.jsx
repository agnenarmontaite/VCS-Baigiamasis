import { useEffect, useState } from "react"


const UserReservationList = ({reservations}) => {

const [resTool, setResTool] = useState([])

//get tool images
  useEffect(() => {
    fetch('http://localhost:3000/tools')
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data)
        const toolData = data.tools.map(tool => ({
          id: tool._id,
          image: tool.images[0]
        }))
        setResTool(toolData);
      })
      .catch((error) => {
        console.error('Fetch error:', error);
      });
  }, []);
 //click for details
const [expanded, setExpanded] = useState(null)
    
 const handleToggleExpand = (_id) => {
      setExpanded(expanded === _id ? null : _id)
     }

  return (
    <div>
      <ul>
        {reservations.map((reservation) => {
          // Find the matching tool image from resTool
          const matchingTool = resTool.find(tool => tool.id === reservation.product);
          const toolImage = matchingTool ? matchingTool.image : null;

          return (
            <li key={reservation._id}>
              <div
                className="border border-gray-300 bg-white rounded-[10px] hover:shadow-lg transition-shadow m-10 mb-0 p-5 "
                onClick={() => handleToggleExpand(reservation._id)}
              >
                <div className="flex h-[100px]">
                  <img src={toolImage} alt={`Tool ${reservation.tool}`} className="max-w-[100px] max-h-full  mr-10" />
                  <div className="self-center justify-center">
                    <p><strong>Tool:</strong> {reservation.tool}</p>
                    <p><strong>Status:</strong> {reservation.status}</p>
                  </div>
                </div>
              </div>

              {expanded === reservation._id && (
                <div className="border border-gray-300 rounded-[10px] py-4 text-left m-10 mt-0 p-5">
                  <p className="font-semibold text-[10px] sm:text-[12px] md:text-[14px] mt-[10px] tracking-[1px]"><strong>Reservation Id:</strong> {reservation._id}</p>
                  <p className="font-semibold text-[10px] sm:text-[12px] md:text-[14px] mt-[10px] tracking-[1px]"><strong>Date Range:</strong> {new Date(reservation.dateRange.from).toLocaleDateString()} - {new Date(reservation.dateRange.to).toLocaleDateString()}</p>
                  <p className="font-semibold text-[10px] sm:text-[12px] md:text-[14px] mt-[10px] tracking-[1px]"><strong>Quantity:</strong> {reservation.quantity}</p>
                  <p className="font-semibold text-[10px] sm:text-[12px] md:text-[14px] mt-[10px] tracking-[1px]"><strong>Pickup Location:</strong> {reservation.pickupLocation}</p>
                  <p className="font-semibold text-[10px] sm:text-[12px] md:text-[14px] mt-[10px] tracking-[1px]"><strong>Contact Email:</strong> {reservation.contactEmail}</p>
                  <p className="font-semibold text-[10px] sm:text-[12px] md:text-[14px] mt-[10px] tracking-[1px]"><strong>Contact Phone:</strong> {reservation.contactPhone}</p>
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  )
}

export default UserReservationList
