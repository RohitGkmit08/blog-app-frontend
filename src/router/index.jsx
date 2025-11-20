import { createBrowserRouter } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";
import RequireAuth from "../components/RequireAuth";

import Home from "../pages/Home/Home";
import BlogDetails from "../pages/BlogDetails/BlogDetails";

import AdminLogin from "../pages/AdminLogin/AdminLogin";
import AdminDashboard from "../pages/AdminDashboard/AdminDashboard";

import AdminBlogs from "../pages/AdminDashboard/Blogs/AdminBlogs";
import CreateBlog from "../pages/CreateBlog/CreateBlog";
import UpdateBlog from "../pages/UpdateBlog/UpdateBlog";

import PendingComments from "../pages/AdminDashboard/Comments/PendingComments";
import ApprovedComments from "../pages/AdminDashboard/Comments/ApprovedComments";
import RejectedComments from "../pages/AdminDashboard/Comments/RejectedComments";

import Subscribers from "../pages/AdminDashboard/Subscribers/Subscribers";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "blog/:slug", element: <BlogDetails /> },
    ],
  },

  { path: "/admin/login", element: <AdminLogin /> },

  {
    path: "/admin",
    element: (
      <RequireAuth>
        <AdminDashboard />
      </RequireAuth>
    ),
  },

  {
    path: "/admin/blogs",
    element: (
      <RequireAuth>
        <AdminBlogs />
      </RequireAuth>
    ),
  },

  {
    path: "/admin/blog/create",
    element: (
      <RequireAuth>
        <CreateBlog />
      </RequireAuth>
    ),
  },

  {
    path: "/admin/blog/edit/:id",
    element: (
      <RequireAuth>
        <UpdateBlog />
      </RequireAuth>
    ),
  },

  {
    path: "/admin/comments/pending",
    element: (
      <RequireAuth>
        <PendingComments />
      </RequireAuth>
    ),
  },

  {
    path: "/admin/comments/approved",
    element: (
      <RequireAuth>
        <ApprovedComments />
      </RequireAuth>
    ),
  },

  {
    path: "/admin/comments/rejected",
    element: (
      <RequireAuth>
        <RejectedComments />
      </RequireAuth>
    ),
  },

  {
    path: "/admin/subscribers",
    element: (
      <RequireAuth>
        <Subscribers />
      </RequireAuth>
    ),
  },
]);

export default router;
