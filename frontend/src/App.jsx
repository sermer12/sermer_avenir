import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Routes from "./components/Routes";
import Formations from "./pages/Formations";
import Contact from "./pages/Contact";
import Actualites from "./pages/Actualites";
import QuiSommesNous from "./pages/QuiSommesNous";
import HomePages from "./pages/HomePages";
import Footer from "./components/Footer";
import Dashboard from "./pages/Dashboard";
import AdminLogin from "./components/AdminLogin";
import PrivateRoute from "./utils/PrivateRoute";
import AddFormation from "./pages/AddFormation";
import EditFormation from "./pages/EditFormation";
import { FormationsContext } from "./context/FormationsContext";
import { useAppState } from "./repository/AppRepository.js";
import EditFooter from "./pages/EditFooter";

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
        path: "Qui-sommes-nous",
        element: <QuiSommesNous />,
      },
      {
        path: "Nos-formations",
        element: <Formations />,
      },
      {
        path: "Nos-actualites",
        element: <Actualites />,
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
            path: "/dashboard",
            element: <AddFormation />,
          },
          {
            path: "editformation",
            element: <EditFormation />,
          },
          {
            path: "editfooter",
            element: <EditFooter />,
          },
        ],
      },
    ],
  },
]);
function App() {
  return (
    <>
      <FormationsContext.Provider value={useAppState()}>
        <RouterProvider router={router} />
        <Footer />
      </FormationsContext.Provider>
    </>
  );
}

export default App;
