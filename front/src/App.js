import styled from "styled-components";
import Home from "pages/Home";
import Register from "pages/Register";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import Login from "pages/Login";
import { useSelector } from "react-redux";
import { useEffect } from "react";

function App() {
  const Main = styled.main``;
  const user = useSelector((state) => state.user.user);
  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  return (
    <Main className="App">
      <Router>
        <Switch>
          <Route path="/register" exact>
            {user ? <Redirect to="/" /> : <Register />}
          </Route>
          <Route path="/login" exact>
            {user ? <Redirect to="/" /> : <Login />}
          </Route>
          <Route path="/" exact>
            {user ? <Home /> : <Redirect to="/login" />}
          </Route>
        </Switch>
      </Router>
    </Main>
  );
}

export default App;
