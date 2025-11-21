import { useAdminAuth } from "../../context/useAdminAuth";


export default function AdminDashboard() {
  const { logout } = useAdminAuth();

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <button onClick={logout}>Logout</button>
    </div>
  );
}
