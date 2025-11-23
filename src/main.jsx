import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { AdminAuthProvider } from "./context/AdminAuthProvider";

import router from "./router";

// Unregister service worker in development to avoid CSP issues
if (import.meta.env.DEV && 'serviceWorker' in navigator) {
  navigator.serviceWorker.getRegistrations().then((registrations) => {
    registrations.forEach((registration) => {
      registration.unregister();
      console.log('Service worker unregistered for development');
    });
  });
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AdminAuthProvider>
      <RouterProvider router={router} />
    </AdminAuthProvider>
  </React.StrictMode>
);
