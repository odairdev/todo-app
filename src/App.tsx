import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { Header } from "./components/header/Header";
import { Home } from "./pages/home/Home";
import { Signup } from "./pages/signup/Signup";
import { Login } from "./pages/login/Login";
import { AuthContextProvider } from "./context/AuthContext";

function App() {
  return (
    <div className="App">
      <AuthContextProvider>
        {/* @ts-ignore */}
        <BrowserRouter>
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
        </BrowserRouter>
      </AuthContextProvider>
    </div>
  );
}

export default App;
