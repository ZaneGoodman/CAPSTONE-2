import React from "react";
import "./App.css";
import AuthProvider from "./provider/authProvider";
import Routes from "./routes";
import AuthNav from "./Navs/AuthNav";
import NoAuthNav from "./Navs/NoAuthNav";
function App() {
  return (
    <>
      <AuthProvider
        initalState={{
          token: localStorage.getItem("token"),
          username: localStorage.getItem("username"),
        }}>
        <Routes>
          <NoAuthNav />
          <AuthNav />
        </Routes>
      </AuthProvider>
    </>
  );
}

export default App;
