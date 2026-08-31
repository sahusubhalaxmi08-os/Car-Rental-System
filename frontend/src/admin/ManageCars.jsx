import { useEffect, useState } from "react";
import {
  Link
} from "react-router-dom";
import {
  getCars,
  deleteCar
} from "../services/carService";

function ManageCars() {

  const [cars, setCars] =
    useState([]);

  const loadCars = async () => {

    try {

      const data =
        await getCars();

      setCars(
        Array.isArray(data)
          ? data
          : data.cars || []
      );

    } catch (error) {

      console.error(error);

    }
  };

  useEffect(() => {

    loadCars();

  }, []);

  const handleDelete = async (id) => {

    if (
      !window.confirm(
        "Delete this car?"
      )
    ) {
      return;
    }

    try {

      await deleteCar(id);

      alert("Car deleted");

      loadCars();

    } catch (error) {

      alert(
        error.response?.data?.message ||
        "Delete failed"
      );

    }
  };

  return (
    <div className="admin-page">

      <div className="admin-header">

        <h1>
          Manage Cars
        </h1>

        <Link
          to="/admin/cars/add"
          className="btn"
        >
          + Add Car
        </Link>

      </div>

      <div className="table-container">

        <table>

          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Brand</th>
              <th>Price</th>
              <th>Available</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>

            {cars.map((car) => (

              <tr key={car._id}>

                <td>
                  <img
                    className="table-image"
                    src={
                      car.image ||
                      "https://via.placeholder.com/80"
                    }
                    alt={car.name}
                  />
                </td>

                <td>
                  {car.name}
                </td>

                <td>
                  {car.brand}
                </td>

                <td>
                  ₹{car.pricePerDay}
                </td>

                <td>
                  {car.available
                    ? "Yes"
                    : "No"}
                </td>

                <td>

                  <Link
                    to={`/admin/cars/edit/${car._id}`}
                    className="edit-btn"
                  >
                    Edit
                  </Link>

                  <button
                    className="delete-btn"
                    onClick={() =>
                      handleDelete(
                        car._id
                      )
                    }
                  >
                    Delete
                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default ManageCars;