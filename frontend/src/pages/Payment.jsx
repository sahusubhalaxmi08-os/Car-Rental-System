import { useEffect, useState } from "react";
import {
  useNavigate,
  useParams
} from "react-router-dom";
import api from "../services/api";

function Payment() {

  const { id } = useParams();
  const navigate = useNavigate();

  const [booking, setBooking] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const [paying, setPaying] =
    useState(false);

  useEffect(() => {

    const loadBooking = async () => {

      try {

        const response =
          await api.get(
            `/bookings/${id}`
          );

        setBooking(
          response.data.booking ||
          response.data
        );

      } catch (error) {

        console.error(error);

      } finally {

        setLoading(false);

      }
    };

    loadBooking();

  }, [id]);

  const handlePayment = async () => {

    try {

      setPaying(true);

      await api.post("/payments", {
        bookingId: id,
        amount: booking.totalAmount,
        paymentMethod: "Demo Card"
      });

      alert(
        "Payment successful!"
      );

      navigate("/my-bookings");

    } catch (error) {

      alert(
        error.response?.data?.message ||
        "Payment failed"
      );

    } finally {

      setPaying(false);

    }
  };

  if (loading) {
    return (
      <div className="loading">
        Loading payment...
      </div>
    );
  }

  if (!booking) {
    return (
      <div className="page">
        Booking not found
      </div>
    );
  }

  return (
    <div className="payment-page">

      <h1>Payment</h1>

      <div className="payment-card">

        <h3>
          {booking.car?.name}
        </h3>

        <p>
          Total Amount
        </p>

        <h2>
          ₹{booking.totalAmount}
        </h2>

        <button
          className="btn"
          onClick={handlePayment}
          disabled={paying}
        >
          {paying
            ? "Processing..."
            : "Pay Now"}
        </button>

      </div>

    </div>
  );
}

export default Payment;