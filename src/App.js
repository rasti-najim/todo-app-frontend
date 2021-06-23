import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import Home from "./components/Home";
import Register from "./components/Register";
import Login from "./components/Login";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

toast.configure();

function App() {
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const auth_token = localStorage.getItem("auth-token");
    if (auth_token) {
      setIsAuth(true);
    } else {
      setIsAuth(false);
    }
  });

  return (
    <>
      <Router>
        <Switch>
          <Route
            exact
            path="/"
            render={(props) =>
              isAuth ? (
                <Home {...props} setIsAuth={setIsAuth} />
              ) : (
                <Redirect to="/login" />
              )
            }
          />
          <Route
            exact
            path="/login"
            render={(props) =>
              !isAuth ? (
                <Login {...props} setIsAuth={setIsAuth} />
              ) : (
                <Redirect to="/" />
              )
            }
          />
          <Route
            exact
            path="/register"
            render={(props) =>
              !isAuth ? (
                <Register {...props} setIsAuth={setIsAuth} />
              ) : (
                <Redirect to="/" />
              )
            }
          />
        </Switch>
      </Router>
    </>
  );
}

export default App;
