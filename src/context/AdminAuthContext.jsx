/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext } from "react";

const AdminAuth = createContext(null);
export default AdminAuth;

export const useAdminAuth = () => {
  return useContext(AdminAuth);
};
