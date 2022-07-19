import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { Header } from "./components/header/Header";
import { Home } from "./pages/home/Home";
import { Signup } from "./pages/signup/Signup";
import { Login } from "./pages/login/Login";
import { AuthContextProvider } from "./context/AuthContext";
import { useAuth } from "./hooks/useAuth";
import { useEffect } from "react";

function App() {
  const { authIsReady } = useAuth();

  useEffect(() => {
    console.log("auth: " + authIsReady);
  }, [authIsReady])

  return (
    <div className="App">
      <AuthContextProvider>
        {/* @ts-ignore */}
        <BrowserRouter>
          {authIsReady && (
            <>
              <Header />
              <Switch>
                <Route path={"/"} exact>
                  <Home />
                </Route>
                <Route path={"/signup"}>
                  <Signup />
                </Route>
                <Route path={"/login"}>
                  <Login />
                </Route>
              </Switch>
            </>
          )}
        </BrowserRouter>
      </AuthContextProvider>
    </div>
  );
}

export default App;
