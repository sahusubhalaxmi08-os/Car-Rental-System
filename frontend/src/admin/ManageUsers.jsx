import { useEffect, useState } from "react";
import api from "../services/api";

function ManageUsers() {

  const [users, setUsers] =
    useState([]);

  useEffect(() => {

    const loadUsers = async () => {

      try {

        const response =
          await api.get(
            "/admin/users"
          );

        setUsers(
          response.data.users ||
          response.data
        );

      } catch (error) {

        console.error(error);

      }

    };

    loadUsers();

  }, []);

  return (
    <div className="admin-page">

      <h1>
        Manage Users
      </h1>

      <div className="table-container">

        <table>

          <thead>

            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Role</th>
            </tr>

          </thead>

          <tbody>

            {users.map(
              (user) => (

                <tr key={user._id}>

                  <td>
                    {user.name}
                  </td>

                  <td>
                    {user.email}
                  </td>

                  <td>
                    {user.phone || "-"}
                  </td>

                  <td>
                    {user.role}
                  </td>

                </tr>

              )
            )}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default ManageUsers;