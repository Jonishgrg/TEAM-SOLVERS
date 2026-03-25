export default function ProfileSection({ username, onLogout }) {
  return (
    <div className="profile-page">
      <div className="profile-card">
        <h1>My Profile</h1>
        <div className="profile-info">
          <p><strong>Username:</strong> {username}</p>
          <p><strong>Member Since:</strong> 2023</p>
          <p><strong>Account Status:</strong> Active</p>
        </div>
        <button onClick={onLogout} className="btn-danger">Logout</button>
      </div>
    </div>
  )
}
