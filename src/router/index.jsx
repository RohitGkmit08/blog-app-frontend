import { createBrowserRouter } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";
import DashboardLayout from "../layouts/DashboardLayout";
import RequireAuth from "../components/RequireAuth";

import Home from "../pages/Home/Home";
import BlogDetails from "../pages/BlogDetails/BlogDetails";
import ShareIdeas from "../pages/ShareIdeas/ShareIdeas";
import ShareIdeasSuccess from "../pages/ShareIdeas/ShareIdeasSuccess";

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
      { path: "share-ideas", element: <ShareIdeas /> },
      { path: "share-ideas/success", element: <ShareIdeasSuccess /> },
    ],
  },

  { path: "/admin/login", element: <AdminLogin /> },

  {
    path: "/admin/dashboard",
    element: (
      <RequireAuth>
        <DashboardLayout />
      </RequireAuth>
    ),
    children: [
      { index: true, element: <AdminDashboard /> },
      { path: "blogs", element: <AdminBlogs /> },
      { path: "blog/create", element: <CreateBlog /> },
      { path: "blog/edit/:id", element: <UpdateBlog /> },
      { path: "comments/pending", element: <PendingComments /> },
      { path: "comments/approved", element: <ApprovedComments /> },
      { path: "comments/rejected", element: <RejectedComments /> },
      { path: "subscribers", element: <Subscribers /> },
    ],
  },
]);

export default router;
