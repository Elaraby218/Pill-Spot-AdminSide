
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

import RootPage from "../Pages/RootPage";
import AdminLogin from "../Pages/LoginPage";

const router = createBrowserRouter(
  createRoutesFromElements(
  
  <Route path="/" element={<RootPage />}>
    <Route path="login" element={<AdminLogin/>}/>
  </Route>
  
)

);


function Router(){
    return (
        <RouterProvider router={router} />
    )
}

export default Router ;