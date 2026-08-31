import { useEffect, useState } from "react";
import api from "../services/api";

function ManageBookings() {

  const [bookings, setBookings] =
    useState([]);

  const loadBookings = async () => {

    try {

      const response =
        await api.get(
          "/admin/bookings"
        );

      setBookings(
        response.data.bookings ||
        response.data
      );

    } catch (error) {

      console.error(error);

    }
  };

  useEffect(() => {

    loadBookings();

  }, []);

  const updateStatus = async (
    id,
    status
  ) => {

    try {

      await api.put(
        `/admin/bookings/${id}`,
        { status }
      );

      loadBookings();

    } catch (error) {

      alert(
        error.response?.data?.message ||
        "Unable to update booking"
      );

    }
  };

  return (
    <div className="admin-page">

      <h1>
        Manage Bookings
      </h1>

      <div className="table-container">

        <table>

          <thead>

            <tr>
              <th>User</th>
              <th>Car</th>
              <th>Pickup</th>
              <th>Return</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Action</th>
            </tr>

          </thead>

          <tbody>

            {bookings.map(
              (booking) => (

                <tr key={booking._id}>

                  <td>
                    {booking.user?.name}
                  </td>

                  <td>
                    {booking.car?.name}
                  </td>

                  <td>
                    {new Date(
                      booking.pickupDate
                    ).toLocaleDateString()}
                  </td>

                  <td>
                    {new Date(
                      booking.returnDate
                    ).toLocaleDateString()}
                  </td>

                  <td>
                    ₹{booking.totalAmount}
                  </td>

                  <td>
                    {booking.status}
                  </td>

                  <td>

                    {booking.status ===
                      "pending" && (
                      <>
                        <button
                          className="success-btn"
                          onClick={() =>
                            updateStatus(
                              booking._id,
                              "confirmed"
                            )
                          }
                        >
                          Accept
                        </button>

                        <button
                          className="delete-btn"
                          onClick={() =>
                            updateStatus(
                              booking._id,
                              "cancelled"
                            )
                          }
                        >
                          Reject
                        </button>
                      </>
                    )}

                    {booking.status ===
                      "confirmed" && (
                      <button
                        className="success-btn"
                        onClick={() =>
                          updateStatus(
                            booking._id,
                            "completed"
                          )
                        }
                      >
                        Complete
                      </button>
                    )}

                  </td>

                </tr>

              )
            )}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default ManageBookings;