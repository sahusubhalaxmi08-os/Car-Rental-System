import { useEffect, useState } from "react";
import {
  Link,
  useParams
} from "react-router-dom";
import { getCarById } from "../services/carService";

function CarDetails() {

  const { id } = useParams();

  const [car, setCar] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    const loadCar = async () => {

      try {

        const data =
          await getCarById(id);

        setCar(data.car || data);

      } catch (error) {

        console.error(error);

      } finally {

        setLoading(false);

      }
    };

    loadCar();

  }, [id]);

  if (loading) {
    return (
      <div className="loading">
        Loading...
      </div>
    );
  }

  if (!car) {
    return (
      <div className="page">
        <h2>Car not found</h2>
      </div>
    );
  }

  return (
    <div className="details-page">

      <img
        src={
          car.image ||
          "https://via.placeholder.com/600x400"
        }
        alt={car.name}
      />

      <div className="details-content">

        <h1>{car.name}</h1>

        <h3>
          {car.brand}
        </h3>

        <p>
          Fuel: {car.fuelType}
        </p>

        <p>
          Transmission:{" "}
          {car.transmission}
        </p>

        <p>
          Seats: {car.seats}
        </p>

        <p>
          ₹{car.pricePerDay} / day
        </p>

        <p>
          {car.description}
        </p>

        <p>
          Availability:{" "}
          {car.available
            ? "Available"
            : "Not Available"}
        </p>

        {car.available && (
          <Link
            to={`/booking/${car._id}`}
            className="btn"
          >
            Book Now
          </Link>
        )}

      </div>

    </div>
  );
}

export default CarDetails;