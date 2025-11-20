import NavBar from "../components/NavBar";
import { Outlet } from "react-router-dom";

export default function MainLayout() {
  return (
    <div>
      <NavBar />
      <div style={{ padding: "30px" }}>
        <Outlet />
      </div>
    </div>
  );
}
