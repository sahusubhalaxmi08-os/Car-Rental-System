import { useEffect, useState } from "react";
import {
  useNavigate,
  useParams
} from "react-router-dom";

import {
  getCarById,
  updateCar
} from "../services/carService";

function EditCar() {

  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] =
    useState({
      name: "",
      brand: "",
      model: "",
      year: "",
      pricePerDay: "",
      fuelType: "Petrol",
      transmission: "Manual",
      seats: 5,
      image: "",
      description: "",
      available: true
    });

  useEffect(() => {

    const loadCar = async () => {

      try {

        const data =
          await getCarById(id);

        const car =
          data.car || data;

        setFormData(car);

      } catch (error) {

        console.error(error);

      }

    };

    loadCar();

  }, [id]);

  const handleChange = (e) => {

    const { name, value } =
      e.target;

    setFormData({
      ...formData,
      [name]: value
    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      await updateCar(
        id,
        formData
      );

      alert(
        "Car updated successfully"
      );

      navigate("/admin/cars");

    } catch (error) {

      alert(
        error.response?.data?.message ||
        "Update failed"
      );

    }
  };

  return (
    <div className="form-page">

      <h1>
        Edit Car
      </h1>

      <form onSubmit={handleSubmit}>

        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Car Name"
          required
        />

        <input
          name="brand"
          value={formData.brand}
          onChange={handleChange}
          placeholder="Brand"
          required
        />

        <input
          name="model"
          value={formData.model}
          onChange={handleChange}
          placeholder="Model"
        />

        <input
          name="year"
          value={formData.year}
          onChange={handleChange}
          placeholder="Year"
        />

        <input
          name="pricePerDay"
          type="number"
          value={formData.pricePerDay}
          onChange={handleChange}
          placeholder="Price Per Day"
        />

        <select
          name="fuelType"
          value={formData.fuelType}
          onChange={handleChange}
        >
          <option>Petrol</option>
          <option>Diesel</option>
          <option>Electric</option>
          <option>Hybrid</option>
        </select>

        <select
          name="transmission"
          value={formData.transmission}
          onChange={handleChange}
        >
          <option>Manual</option>
          <option>Automatic</option>
        </select>

        <input
          name="seats"
          type="number"
          value={formData.seats}
          onChange={handleChange}
          placeholder="Seats"
        />

        <input
          name="image"
          value={formData.image}
          onChange={handleChange}
          placeholder="Image URL"
        />

        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Description"
        />

        <button
          className="btn"
          type="submit"
        >
          Update Car
        </button>

      </form>

    </div>
  );
}

export default EditCar;