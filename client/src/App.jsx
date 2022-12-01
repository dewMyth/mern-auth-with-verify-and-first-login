import { useState } from "react";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import Verify from "./components/Verify";
import NotFound from "./components/NotFound";
import { useEffect } from "react";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    setUser(user);
  });

  return (
    <>
      <Router>
        <Routes>
          <Route
            exact
            path="/"
            element={user !== null ? <Home /> : <Navigate to="login" />}
          />
          <Route
            exact
            path="/login"
            element={user !== null ? <Navigate to="/" /> : <Login />}
          />
          <Route
            exact
            path="/register"
            element={user !== null ? <Navigate to="/" /> : <Register />}
          />
          <Route
            path="/verify"
            element={user !== null ? <Navigate to="/" /> : <Verify />}
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
