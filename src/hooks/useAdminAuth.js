import { useContext } from "react";
import AdminAuth from "../context/AdminAuthContext";
import React from 'react'

const useAdminAuth = () => {
  return useContext(AdminAuth);
};

export default useAdminAuth;
