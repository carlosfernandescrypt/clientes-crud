import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import PrivateRoute from "./components/PrivateRoute";

const App = () => {
  const [authenticated, setAuthenticated] = useState(false);

  return (
    <Router>
      <Routes>
        {/* rotas publicas */}
        <Route
          path="/login"
          element={<Login setAuthenticated={setAuthenticated} />}
        />

        {/* rotas protegidas */}
        <Route
          path="/"
          element={
            <PrivateRoute authenticated={authenticated}>
              <Home />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
