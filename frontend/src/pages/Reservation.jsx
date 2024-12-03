import { useEffect, useState } from "react";
import UserReservationList from "../components/UserReservationList"
import { useAuth } from "../hooks/useAuth"

const Reservation = () => {
 const { user } = useAuth()
  const [reservations, setReservations] = useState([])
  const [error, setError] = useState(null)

  useEffect(() => {
       const fetchReservations = async () => {
      try {
        const response = await fetch('http://localhost:3000/reservations', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${user.token}`
          }
        })
        if (!response.ok) {
          throw new Error('Failed to fetch reservations');
        }
        
        const data = await response.json()
                setReservations(data.reservations)
      } catch (err) {setError(err.message)}
    }
    fetchReservations()
  }, [user.token]);

  return (
    <div className="container m-auto p-10 text-justify">
    <div className="bg-white border border-gray-100 rounded-[10px] shadow-lg transition-shadow overflow-hidden p-5">
    <h1 className="text-[26px] sm:text-[32px] lg:text-[48px] p-[40px] text-center">My reservations</h1>
    {error && <p>{error}</p>}
    <UserReservationList reservations={reservations} />
    </div>
  </div>
  )
}

export default Reservation
