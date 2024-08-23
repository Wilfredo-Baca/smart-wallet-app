import Metas from "../../pages/metas/Metas";
import Err404 from "../../pages/404/Err404";
import Meta from "../../pages/meta/Meta";
import { getTime } from "../../utils/dateUtils.js";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "../../styles/App.css";
const routers = createBrowserRouter([
	{ path: "/metas", element: <Metas /> },
	{ path: "/metas/:id", element: <Meta /> },
	{ path: "*", element: <Err404 />},
]);
const App = () => {
  const logout = () => {
    sessionStorage.clear();
    window.location.href = "https://node-api-latest.azurewebsites.net/logout";
  }
  const login = () => {
    window.location.href = "https://node-api-latest.azurewebsites.net/auth/login";
  }
  return (
    <div className="container">
      <header>
        <h1 className="title-app">Smart Wallet</h1>
        <p className="time">{getTime()}</p>
        <hr className="hr-line hr-1" />
      </header>
      <main>
        <RouterProvider router={routers} />
      </main>
      <footer>
        <hr className="hr-line hr-2" />
        <p className="footer-text">Smart Wallet - 2024</p>
        <button onClick={logout}>Cerrar Sesión</button>
        <button onClick={login}>Ingresar</button>
      </footer>
    </div>
  );
};

export default App;
