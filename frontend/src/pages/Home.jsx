import { Link } from "react-router-dom";

function Home() {
  return (
    <div>

      <section className="hero">

        <div className="hero-content">

          <h1>
            Rent Your Dream Car
          </h1>

          <p>
            Find the perfect car for your journey
            at an affordable price.
          </p>

          <Link
            to="/cars"
            className="hero-btn"
          >
            Browse Cars
          </Link>

        </div>

      </section>

      <section className="features">

        <div>
          <h3>🚗 Wide Range</h3>
          <p>
            Choose from many different cars.
          </p>
        </div>

        <div>
          <h3>💰 Affordable Prices</h3>
          <p>
            Best rental prices for your budget.
          </p>
        </div>

        <div>
          <h3>🔐 Secure Booking</h3>
          <p>
            Safe and easy online booking.
          </p>
        </div>

      </section>

    </div>
  );
}

export default Home;