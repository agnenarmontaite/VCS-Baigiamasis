import { useState } from 'react';

function ReservationList() {
    return (
        <div className='bg-white rounded-lg shadow'>
            <h3 className='text-xl font-semibold p-4'>Visos rezervacijos:</h3>
            <ul className='mt-4 space-y-4'>
                {ReservationList.map((reservation, index) => (
                    <li key={index} className='border rounded-lg p-4 shadow-md'>
                        <div>
                            <strong>Category:</strong> {reservation.toolType}
                        </div>
                        <div>
                            <strong>Tool:</strong> {reservation.tool}
                        </div>
                        <div>
                            <strong>Reservation Starts:</strong>{' '}
                            {reservation.startDate}
                        </div>
                        <div>
                            <strong>Reservation Ends:</strong>{' '}
                            {reservation.endDate}
                        </div>
                        <div>
                            <strong>Pickup Location:</strong>{' '}
                            {reservation.pickupLocation}
                        </div>
                        <div>
                            <strong>Contact Email:</strong>{' '}
                            {reservation.contactEmail}
                        </div>
                        <div>
                            <strong>Contact Phone:</strong>{' '}
                            {reservation.contactPhone}
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ReservationList;
