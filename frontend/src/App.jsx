import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Routes from "./components/Routes";
import Formations from "./pages/Formations";
import Contact from "./pages/Contact";
import Actualiter from "./pages/Actualiter";
import QuiSommesNous from "./pages/QuiSommesNous";
import HomePages from "./pages/HomePages";
import Footer from "./components/Footer";
import Dashboard from "./pages/Dashboard";
import AdminLogin from "./components/AdminLogin";
import PrivateRoute from "./utils/PrivateRoute";
import AddFormation from "./pages/AddFormation";
import EditFormation from "./pages/EditFormation";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Routes />,
    children: [
      {
        path: "/",
        element: <HomePages />,
      },
      {
        path: "Qui sommes-nous",
        element: <QuiSommesNous />,
      },
      {
        path: "Nos formations",
        element: <Formations />,
      },
      {
        path: "Nos actualites",
        element: <Actualiter />,
      },

      {
        path: "Contact",
        element: <Contact />,
      },
      {
        path: "adminLogin",
        element: <AdminLogin />,
      },
      {
        path: "dashboard",
        element: (
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        ),
        children: [
          {
            path: "addformation",
            element: <AddFormation />,
          },
          {
            path: "editformation",
            element: <EditFormation />,
          },
        ],
      },
    ],
  },
]);
function App() {
  return (
    <>
      <RouterProvider router={router} />
      <Footer />
    </>
  );
}

export default App;
