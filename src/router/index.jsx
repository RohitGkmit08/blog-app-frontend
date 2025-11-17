import { createBrowserRouter } from "react-router-dom";

import Home from "../pages/Home/Home";
import BlogDetails from "../pages/BlogDetails/BlogDetails";
import MainLayout from "../layouts/MainLayout";

import AdminLayout from "../layouts/AdminLayout";
import AdminLogin from "../pages/AdminLogin/AdminLogin";
import AdminDashboard from "../pages/AdminDashboard/AdminDashboard";
import CreateBlog from "../pages/CreateBlog/CreateBlog";
import UpdateBlog from "../pages/UpdateBlog/UpdateBlog";
import CommentModeration from "../pages/CommentModeration/CommentModeration";

import RequireAuth from "../components/RequireAuth";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "blog/:id", element: <BlogDetails /> },
    ],
  },

  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      { path: "login", element: <AdminLogin /> },
      {
        path: "dashboard",
        element: (
          <RequireAuth>
            <AdminDashboard />
          </RequireAuth>
        ),
      },
      {
        path: "blog/create",
        element: (
          <RequireAuth>
            <CreateBlog />
          </RequireAuth>
        ),
      },
      {
        path: "blog/edit/:id",
        element: (
          <RequireAuth>
            <UpdateBlog />
          </RequireAuth>
        ),
      },
      {
        path: "comments",
        element: (
          <RequireAuth>
            <CommentModeration />
          </RequireAuth>
        ),
      },
    ],
  },
]);

export default router;
