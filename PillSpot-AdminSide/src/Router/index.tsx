
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { Toaster } from 'sonner'

import RootPage from "../Pages/RootPage";
import AdminLogin from "../Pages/LoginPage";
import HomePageLayout from "../Pages/AdminHomePage/Layout";
import AdminDashBoard from "../Pages/AdminHomePage/Dashboard/indes";

const router = createBrowserRouter(
  createRoutesFromElements(
  
  <Route path="/" element={<RootPage />}>
    <Route index element={<AdminLogin />} />
    <Route path="/admin-home" element={<HomePageLayout />} >
      <Route path="dashboard" index element={<AdminDashBoard/>} />
    </Route>
    
  </Route>
  
)

);


function Router(){
    return (
      <>
        <Toaster richColors position="top-right" />
        <RouterProvider router={router} />
      </>
    )
}

export default Router ;