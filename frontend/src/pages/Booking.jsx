import { useEffect, useState } from "react";
import {
  useNavigate,
  useParams
} from "react-router-dom";
import {
  getCarById
} from "../services/carService";
import {
  createBooking
} from "../services/bookingService";

function Booking() {

  const { id } = useParams();
  const navigate = useNavigate();

  const [car, setCar] =
    useState(null);

  const [pickupDate, setPickupDate] =
    useState("");

  const [returnDate, setReturnDate] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  useEffect(() => {

    const loadCar = async () => {

      try {

        const data =
          await getCarById(id);

        setCar(data.car || data);

      } catch (error) {

        console.error(error);

      }

    };

    loadCar();

  }, [id]);

  const calculateDays = () => {

    if (!pickupDate || !returnDate) {
      return 0;
    }

    const start =
      new Date(pickupDate);

    const end =
      new Date(returnDate);

    const difference =
      end - start;

    return Math.ceil(
      difference /
      (1000 * 60 * 60 * 24)
    );
  };

  const days = calculateDays();

  const total =
    days > 0
      ? days * car?.pricePerDay
      : 0;

  const handleSubmit = async (e) => {

    e.preventDefault();

    if (days <= 0) {
      alert(
        "Return date must be after pickup date"
      );
      return;
    }

    try {

      setLoading(true);

      const response =
        await createBooking({
          carId: id,
          pickupDate,
          returnDate,
          totalAmount: total
        });

      const booking =
        response.booking || response;

      navigate(
        `/payment/${booking._id}`
      );

    } catch (error) {

      alert(
        error.response?.data?.message ||
        "Booking failed"
      );

    } finally {

      setLoading(false);

    }
  };

  if (!car) {
    return (
      <div className="loading">
        Loading...
      </div>
    );
  }

  return (
    <div className="form-page">

      <h1>Book {car.name}</h1>

      <form onSubmit={handleSubmit}>

        <label>
          Pickup Date
        </label>

        <input
          type="date"
          value={pickupDate}
          onChange={(e) =>
            setPickupDate(e.target.value)
          }
          required
        />

        <label>
          Return Date
        </label>

        <input
          type="date"
          value={returnDate}
          onChange={(e) =>
            setReturnDate(e.target.value)
          }
          required
        />

        <div className="booking-summary">

          <p>
            Price per day:
            ₹{car.pricePerDay}
          </p>

          <p>
            Rental Days: {days}
          </p>

          <h2>
            Total: ₹{total}
          </h2>

        </div>

        <button
          type="submit"
          className="btn"
          disabled={loading}
        >
          {loading
            ? "Processing..."
            : "Continue to Payment"}
        </button>

      </form>

    </div>
  );
}

export default Booking;