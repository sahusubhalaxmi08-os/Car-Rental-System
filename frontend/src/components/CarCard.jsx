import { Link } from "react-router-dom";

function CarCard({ car }) {
  return (
    <div className="car-card">

      <img
        src={
          car.image ||
          "https://via.placeholder.com/400x250?text=Car"
        }
        alt={car.name}
      />

      <div className="car-info">

        <h3>{car.name}</h3>

        <p>
          🚘 {car.brand}
        </p>

        <p>
          ⛽ {car.fuelType}
        </p>

        <p>
          ⚙️ {car.transmission}
        </p>

        <h4>
          ₹{car.pricePerDay} / day
        </h4>

        <Link
          to={`/cars/${car._id}`}
          className="btn"
        >
          View Details
        </Link>

      </div>

    </div>
  );
}

export default CarCard;