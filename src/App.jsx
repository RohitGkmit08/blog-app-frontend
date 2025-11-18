import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminAuthProvider from "./context/AdminAuthProvider";
import RequireAuth from "./components/RequireAuth";

import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";

function App() {
  return (
    <BrowserRouter>
      <AdminAuthProvider>
        <Routes>
          <Route path="/admin/login" element={<AdminLogin />} />

          <Route
            path="/admin/dashboard"
            element={
              <RequireAuth>
                <AdminDashboard />
              </RequireAuth>
            }
          />
          <Route
            path="/admin/blogs/:id"
            element={
              <RequireAuth>
                <BlogDetails />
              </RequireAuth>
            }
/>
        </Routes>
      </AdminAuthProvider>
    </BrowserRouter>
  );
}

export default App;
