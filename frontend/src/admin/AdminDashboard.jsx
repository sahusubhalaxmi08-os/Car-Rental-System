import { useEffect, useState } from "react";
import api from "../services/api";

function AdminDashboard() {

  const [stats, setStats] =
    useState({
      users: 0,
      cars: 0,
      bookings: 0,
      payments: 0,
      revenue: 0
    });

  useEffect(() => {

    const loadDashboard = async () => {

      try {

        const response =
          await api.get(
            "/admin/dashboard"
          );

        setStats(
          response.data
        );

      } catch (error) {

        console.error(error);

      }

    };

    loadDashboard();

  }, []);

  return (
    <div className="admin-page">

      <h1>
        Admin Dashboard
      </h1>

      <div className="dashboard-grid">

        <div className="dashboard-card">
          <h3>Users</h3>
          <h2>{stats.users}</h2>
        </div>

        <div className="dashboard-card">
          <h3>Cars</h3>
          <h2>{stats.cars}</h2>
        </div>

        <div className="dashboard-card">
          <h3>Bookings</h3>
          <h2>{stats.bookings}</h2>
        </div>

        <div className="dashboard-card">
          <h3>Payments</h3>
          <h2>{stats.payments}</h2>
        </div>

        <div className="dashboard-card">
          <h3>Revenue</h3>
          <h2>₹{stats.revenue}</h2>
        </div>

      </div>

    </div>
  );
}

export default AdminDashboard;