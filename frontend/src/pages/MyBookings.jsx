import { useEffect, useState } from "react";
import BookingCard from "../components/BookingCard";
import {
  getMyBookings
} from "../services/bookingService";

function MyBookings() {

  const [bookings, setBookings] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const loadBookings = async () => {

    try {

      const data =
        await getMyBookings();

      const list =
        Array.isArray(data)
          ? data
          : data.bookings || [];

      setBookings(list);

    } catch (error) {

      console.error(error);

    } finally {

      setLoading(false);

    }
  };

  useEffect(() => {

    loadBookings();

  }, []);

  if (loading) {
    return (
      <div className="loading">
        Loading bookings...
      </div>
    );
  }

  return (
    <div className="page">

      <h1>
        My Bookings
      </h1>

      {bookings.length === 0 ? (

        <p>
          You don't have any bookings.
        </p>

      ) : (

        <div className="booking-grid">

          {bookings.map((booking) => (

            <BookingCard
              key={booking._id}
              booking={booking}
              refresh={loadBookings}
            />

          ))}

        </div>

      )}

    </div>
  );
}

export default MyBookings;