import { createBrowserRouter } from "react-router-dom";

import Home from "../pages/home/Home";
import AdminDashboard from "../pages/AdminDashboard/AdminDashboard";
import BlogDetails from "../pages/BlogDetails/BlogDetails";
import AdminLogin from "../pages/AdminLogin/AdminLogin";
import UpdateBlog from "../pages/UpdateBlog/UpdateBlog";
import CommentModeration from "../pages/CommentModeration/CommentModeration";
import CreateBlog from "../pages/CreateBlog/CreateBlog";
import MainLayout from "../layouts/MainLayout";
import AdminLayout from "../layouts/AdminLayout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { 
        path: "/", element: <Home /> 
      },
      { 
        path: "/blog/:id", element: <BlogDetails /> 
      },
    ],
  },

  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      { path: "login", element: <AdminLogin /> },
      { path: "dashboard", element: <AdminDashboard /> },
      { path: "blog/create", element: <CreateBlog /> },
      { path: "blog/edit/:id", element: <UpdateBlog /> },
      { path: "comments", element: <CommentModeration /> },
    ],
  },
]);

export default router