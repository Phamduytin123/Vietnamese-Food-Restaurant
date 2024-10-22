import React from "react";
import { BrowserRouter } from "react-router-dom";
import AllRoutes from "./views/routes/index";
import { AuthProvider } from "./contexts/AccountContext";
import { useEffect } from "react";
function App() {
  useEffect(() => {
      // Setup local storage

    if (!localStorage.getItem("access_token")) {
      localStorage.removeItem("access_token");
    }
    if (!localStorage.getItem("user_info")) {
      localStorage.removeItem("user_info");
    }
  }, []);
  return (
    <BrowserRouter>
      <AuthProvider>
        <AllRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
