import "./App.css";
import { Login } from "./Component/Login";
import { Register } from "./Component/Register";
import { Home } from "./Component/Home";
import { Navbar } from "./Component/Navbar";
import Layout from "./Component/Layout";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ParticlesComponent from "./Component/Partices";

let routers = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Login /> },
      { path: "register", element: <Register /> },
      { path: "home", element: <Home /> },
      { path: "*", element: <Login /> },
    ],
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={routers} />

      <ParticlesComponent />
    </>
  );
}

export default App;
