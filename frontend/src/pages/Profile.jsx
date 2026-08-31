import { useAuth } from "../context/AuthContext";

function Profile() {

  const { user } =
    useAuth();

  return (
    <div className="profile-page">

      <div className="profile-card">

        <h1>
          My Profile
        </h1>

        <div className="profile-item">
          <strong>Name:</strong>
          <span>
            {user?.name}
          </span>
        </div>

        <div className="profile-item">
          <strong>Email:</strong>
          <span>
            {user?.email}
          </span>
        </div>

        <div className="profile-item">
          <strong>Phone:</strong>
          <span>
            {user?.phone || "Not provided"}
          </span>
        </div>

        <div className="profile-item">
          <strong>Role:</strong>
          <span>
            {user?.role}
          </span>
        </div>

      </div>

    </div>
  );
}

export default Profile;