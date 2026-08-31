import { cancelBooking } from "../services/bookingService";

function BookingCard({ booking, refresh }) {

  const handleCancel = async () => {

    if (
      !window.confirm(
        "Are you sure you want to cancel this booking?"
      )
    ) {
      return;
    }

    try {

      await cancelBooking(booking._id);

      alert("Booking cancelled");

      refresh();

    } catch (error) {

      alert(
        error.response?.data?.message ||
        "Unable to cancel booking"
      );

    }
  };

  return (
    <div className="booking-card">

      <h3>
        {booking.car?.name}
      </h3>

      <p>
        Pickup:{" "}
        {new Date(
          booking.pickupDate
        ).toLocaleDateString()}
      </p>

      <p>
        Return:{" "}
        {new Date(
          booking.returnDate
        ).toLocaleDateString()}
      </p>

      <p>
        Amount: ₹{booking.totalAmount}
      </p>

      <p>
        Status:
        <strong>
          {" "}{booking.status}
        </strong>
      </p>

      {booking.status === "pending" && (
        <button
          className="danger-btn"
          onClick={handleCancel}
        >
          Cancel Booking
        </button>
      )}

    </div>
  );
}

export default BookingCard;