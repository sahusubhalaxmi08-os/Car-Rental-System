import { useEffect, useState } from "react";
import CarCard from "../components/CarCard";
import SearchBar from "../components/SearchBar";
import { getCars } from "../services/carService";

function Cars() {

  const [cars, setCars] = useState([]);
  const [filteredCars, setFilteredCars] =
    useState([]);
  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    const loadCars = async () => {

      try {

        const data = await getCars();

        const list = Array.isArray(data)
          ? data
          : data.cars || [];

        setCars(list);
        setFilteredCars(list);

      } catch (error) {

        console.error(error);

      } finally {

        setLoading(false);

      }
    };

    loadCars();

  }, []);

  const handleSearch = (value) => {

    const searchValue =
      value.toLowerCase();

    const result = cars.filter(
      (car) =>
        car.name
          ?.toLowerCase()
          .includes(searchValue) ||
        car.brand
          ?.toLowerCase()
          .includes(searchValue)
    );

    setFilteredCars(result);
  };

  if (loading) {
    return (
      <div className="loading">
        Loading cars...
      </div>
    );
  }

  return (
    <div className="page">

      <h1>Available Cars</h1>

      <SearchBar
        onSearch={handleSearch}
      />

      <div className="car-grid">

        {filteredCars.length > 0 ? (

          filteredCars.map((car) => (
            <CarCard
              key={car._id}
              car={car}
            />
          ))

        ) : (

          <p>
            No cars found.
          </p>

        )}

      </div>

    </div>
  );
}

export default Cars;