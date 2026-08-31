import { useState } from "react";
import {
  useNavigate
} from "react-router-dom";
import {
  addCar
} from "../services/carService";

function AddCar() {

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

  const handleChange = (e) => {

    const { name, value } =
      e.target;

    setFormData({
      ...formData,
      [name]:
        name === "pricePerDay" ||
        name === "year" ||
        name === "seats"
          ? Number(value)
          : value
    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      await addCar(formData);

      alert(
        "Car added successfully"
      );

      navigate("/admin/cars");

    } catch (error) {

      alert(
        error.response?.data?.message ||
        "Unable to add car"
      );

    }
  };

  return (
    <div className="form-page">

      <h1>
        Add New Car
      </h1>

      <form onSubmit={handleSubmit}>

        <input
          name="name"
          placeholder="Car Name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <input
          name="brand"
          placeholder="Brand"
          value={formData.brand}
          onChange={handleChange}
          required
        />

        <input
          name="model"
          placeholder="Model"
          value={formData.model}
          onChange={handleChange}
        />

        <input
          name="year"
          type="number"
          placeholder="Year"
          value={formData.year}
          onChange={handleChange}
        />

        <input
          name="pricePerDay"
          type="number"
          placeholder="Price Per Day"
          value={formData.pricePerDay}
          onChange={handleChange}
          required
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
          placeholder="Seats"
          value={formData.seats}
          onChange={handleChange}
        />

        <input
          name="image"
          placeholder="Image URL"
          value={formData.image}
          onChange={handleChange}
        />

        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
        />

        <button
          type="submit"
          className="btn"
        >
          Add Car
        </button>

      </form>

    </div>
  );
}

export default AddCar;