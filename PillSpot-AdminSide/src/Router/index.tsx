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
import Pharmacy from "../Pages/AdminHomePage/Pharmacy";

import AddProduct from "../Pages/addProduct";
import UsersManagementPage from "../Pages/Users Management Page";
import FeedbackPage from "../Pages/AdminHomePage/FeedBackPage";
import ComplaintDetailsPage from "../Pages/AdminHomePage/ComplaintDetailsPage/ComplaintDetailsPage";
import PharmaciesRequests from "../Pages/phamaciesRequests";
import ManageNotify from "../Pages/notificationManagemnt";

const router = createBrowserRouter(
  createRoutesFromElements(
  
  <Route path="/" element={<RootPage />}>
    <Route index element={<AdminLogin />} />
    <Route path="/admin-home" element={<HomePageLayout />} >
      <Route path="dashboard" index element={<AdminDashBoard/>} />
      <Route path="pharmacy" index element={<Pharmacy/>} />
      <Route path="feedback" index element={<FeedbackPage/>} />
      <Route path="feedback/:complaintId" element={<ComplaintDetailsPage/>} />
      <Route path="addproduct" index element={<AddProduct/>} />
      <Route path="pharmacyies-requests" index element={<PharmaciesRequests/>} />
      <Route path="users" index element={<UsersManagementPage/>} />
      <Route path="manage-notification" index element={<ManageNotify/>} />
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