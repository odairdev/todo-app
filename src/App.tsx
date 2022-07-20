import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Header } from "./components/header/Header";
import { Home } from "./pages/home/Home";
import { Signup } from "./pages/signup/Signup";
import { Login } from "./pages/login/Login";
import { useAuth } from "./hooks/useAuth";

function App() {
  const { authIsReady, user } = useAuth();

  return (
    <div className="App">
      <BrowserRouter>
        {authIsReady && (
          <>
            <Header />
            <Routes>
              <Route
                path={"/"}
                element={user ? <Home /> : <Navigate replace to={"/login"} />}
              />
              <Route
                path={"/signup"}
                element={user ? <Navigate replace to={"/"} /> : <Signup />}
              />
              <Route
                path={"/login"}
                element={user ? <Navigate replace to={"/"} /> : <Login />}
              />
            </Routes>
          </>
        )}
      </BrowserRouter>
    </div>
  );
}

export default App;
