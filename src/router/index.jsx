import { createBrowserRouter } from "react-router-dom";

import Home from "../pages/home/Home";
import AdminDashboard from "../pages/AdminDashboard/AdminDashboard";
import BlogDetails from "../pages/BlogDetails/BlogDetails";
import AdminLogin from "../pages/AdminLogin/AdminLogin";
import UpdateBlog from "../pages/UpdateBlog/UpdateBlog";
import CommentModeration from "../pages/CommentModeration/CommentModeration";
import CreateBlog from "../pages/CreateBlog/CreateBlog";

const router = createBrowserRouter([
    {path : '/', element:<Home/> },
    {path : '/blog/:id', element:<BlogDetails/>},

    { path: "/admin/login", element: <AdminLogin /> },
  { path: "/admin/dashboard", element: <AdminDashboard /> },
  { path: "/admin/blog/create", element: <CreateBlog /> },
  { path: "/admin/blog/edit/:id", element: <UpdateBlog /> },
  { path: "/admin/comments", element: <CommentModeration /> },
])

export default router