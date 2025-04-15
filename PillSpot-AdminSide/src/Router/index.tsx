
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

import RootPage from "../Pages/RootPage";

const router = createBrowserRouter(
  createRoutesFromElements(
  
  <Route path="/" element={<RootPage />}>
    
  </Route>)

);


function Router(){
    return (
        <RouterProvider router={router} />
    )
}

export default Router ;